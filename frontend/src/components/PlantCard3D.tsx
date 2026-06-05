'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

interface PlantCardProps {
    title: string;
    status: string;
    health: number;
    image: string;
}

export default function PlantCard3D({ title, status, health, image }: PlantCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative w-full h-[400px] rounded-xl cursor-pointer group perspective-1000"
        >
            <motion.div
                className="absolute inset-0 w-full h-full rounded-xl border border-bioma-leaf/20 bg-bioma-moss/10 backdrop-blur-md overflow-hidden flex flex-col shadow-2xl shadow-black/50"
                style={{ transform: "translateZ(50px)" }}
            >

                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ backgroundImage: `url(${image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bioma-dark via-bioma-dark/80 to-transparent" />

                <div className="relative z-10 flex flex-col justify-end h-full p-6 text-left">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-bioma-leaf font-sans mb-2">
                        Status: {status}
                    </span>
                    <h3 className="font-title text-3xl font-light text-bioma-water mb-4">
                        {title}
                    </h3>

                    <div className="w-full bg-bioma-dark/50 h-1 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${health}%` }}
                            transition={{ duration: 1.5, delay: 0.2 }}
                            className="h-full bg-bioma-leaf shadow-[0_0_10px_rgba(163,184,153,0.8)]"
                        />
                    </div>
                    <span className="text-[10px] text-bioma-water/50 mt-2 text-right">
                        Vitalidade: {health}%
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );
}