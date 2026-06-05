'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const obras = [
    { id: 1, titulo: "Ficus Lyrata", categoria: "Purificação de Ar", imagem: "https://images.unsplash.com/photo-1614594975525-e45190c55d40?q=80&w=800&auto=format&fit=crop" },
    { id: 2, titulo: "Jardim Vertical", categoria: "Design Biofílico", imagem: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800&auto=format&fit=crop" },
    { id: 3, titulo: "Terrário Fechado", categoria: "Ecossistema Autossuficiente", imagem: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=800&auto=format&fit=crop" },
    { id: 4, titulo: "Musgo Preservado", categoria: "Atenuação Acústica", imagem: "https://images.unsplash.com/photo-1629541174601-385ee0712713?q=80&w=800&auto=format&fit=crop" }
];

export default function Galeria() {
    const targetRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
    const imageX = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <section ref={targetRef} className="relative h-[400vh] bg-bioma-dark" id="galeria">

            <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">

                <motion.div style={{ x }} className="flex flex-nowrap w-[400vw] h-full">
                    {obras.map((obra, index) => (

                        <div
                            key={obra.id}
                            className="h-screen w-screen flex-shrink-0 flex flex-col md:flex-row items-center justify-center gap-16 p-8 md:p-24 relative"
                        >
                            <div className="flex-1 max-w-xl flex flex-col gap-6 pl-0 md:pl-12 z-10">
                                <span className="text-xs tracking-[0.3em] uppercase text-bioma-leaf font-sans">
                                    0{index + 2} / {obra.categoria}
                                </span>
                                <h3 className="font-title text-5xl md:text-7xl font-light text-bioma-water whitespace-nowrap">
                                    {obra.titulo}
                                </h3>
                                <p className="font-sans text-bioma-leaf/80 font-light text-xl leading-relaxed mt-4">
                                    Espécime catalogada e perfeitamente adaptável a ecossistemas internos. Reduz VOCs e aumenta a umidade relativa do ambiente.
                                </p>
                            </div>

                            <div className="flex-1 w-full h-[50vh] md:h-[80vh] relative overflow-hidden group rounded-sm">
                                <motion.div
                                    style={{ x: imageX }}
                                    className="absolute inset-[-20%] w-[140%] h-full"
                                >
                                    <div
                                        className="w-full h-full bg-cover bg-center transition-transform duration-[2s] ease-out group-hover:scale-105 opacity-90"
                                        style={{ backgroundImage: `url(${obra.imagem})` }}
                                    />
                                </motion.div>
                                <div className="absolute inset-0 bg-gradient-to-t from-bioma-dark via-transparent to-transparent opacity-80 pointer-events-none" />
                            </div>

                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}