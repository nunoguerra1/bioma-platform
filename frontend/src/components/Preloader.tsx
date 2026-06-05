'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 2500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    const leftSide = {
        initial: { x: 0 },
        exit: {
            x: '-100%',
            transition: { duration: 1.2, ease: [0.85, 0, 0.15, 1] }
        }
    };

    const rightSide = {
        initial: { x: 0 },
        exit: {
            x: '100%',
            transition: { duration: 1.2, ease: [0.85, 0, 0.15, 1] }
        }
    };

    return (
        <motion.div className="fixed inset-0 z-50 flex overflow-hidden pointer-events-none">
            <motion.div
                variants={leftSide}
                initial="initial"
                exit="exit"
                className="w-1/2 h-full bg-bioma-moss flex items-center justify-end relative pointer-events-auto"
            >
                <svg className="w-32 h-64 text-bioma-dark fill-current translate-x-16" viewBox="0 0 100 200">
                    <path d="M100,0 C44.8,0 0,44.8 0,100 C0,155.2 44.8,200 100,200 Z" />
                </svg>
            </motion.div>

            <motion.div
                variants={rightSide}
                initial="initial"
                exit="exit"
                className="w-1/2 h-full bg-bioma-moss flex items-center justify-start relative pointer-events-auto"
            >
                <svg className="w-32 h-64 text-bioma-dark fill-current -translate-x-16" viewBox="0 0 100 200">
                    <path d="M0,0 C55.2,0 100,44.8 100,100 C100,155.2 55.2,200 0,200 Z" />
                </svg>
            </motion.div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 2, times: [0, 0.2, 0.8, 1] }}
                    className="font-title text-bioma-sand text-sm tracking-[0.4em] uppercase"
                >
                    Carregando Ecossistema...
                </motion.p>
            </div>
        </motion.div>
    );
}