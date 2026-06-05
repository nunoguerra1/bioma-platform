'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ["start end", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

    return (
        <motion.footer
            ref={footerRef}
            style={{ opacity }}
            className="relative w-full h-[80vh] bg-bioma-dark flex flex-col items-center justify-between pt-32 pb-12 overflow-hidden border-t border-bioma-moss/20 z-10"
        >
            <motion.div style={{ y }} className="flex flex-col items-center text-center px-8 z-20">
                <span className="text-xs tracking-[0.4em] uppercase text-bioma-leaf font-sans mb-8">
                    Pronto para respirar?
                </span>

                <h2 className="font-title text-5xl md:text-8xl font-light text-bioma-water tracking-tight hover:text-bioma-leaf transition-colors duration-700 cursor-default">
                    Inicie seu Ecossistema.
                </h2>

                <Link
                    href="/dashboard"
                    className="mt-16 px-8 py-4 bg-transparent border border-bioma-moss text-bioma-leaf text-xs uppercase tracking-[0.2em] hover:bg-bioma-moss/30 hover:border-bioma-leaf transition-all duration-500 rounded inline-block"
                >
                    Acessar Meu Painel
                </Link>
            </motion.div>

            <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.2em] uppercase text-bioma-water/40 font-sans z-20 px-8">
                <span>© 2026 Bioma. Todos os direitos reservados.</span>
                <div className="flex gap-8 mt-4 md:mt-0">
                    <a href="#" className="hover:text-bioma-leaf transition-colors">Instagram</a>
                    <a href="#" className="hover:text-bioma-leaf transition-colors">Manifesto</a>
                    <a href="#" className="hover:text-bioma-leaf transition-colors">Termos</a>
                </div>
            </div>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100vw] h-[50vh] bg-bioma-moss/10 blur-[150px] -z-10 rounded-t-full pointer-events-none" />
        </motion.footer>
    );
}