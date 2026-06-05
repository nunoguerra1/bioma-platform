'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import Preloader from '@/components/Preloader';

function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.2, 1, 0.2]);

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full bg-bioma-dark flex flex-col justify-center px-8 md:px-16 py-32 relative z-20 border-t border-bioma-moss/30"
    >
      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

        <div className="md:col-span-8">
          <span className="text-xs tracking-[0.3em] uppercase text-bioma-leaf block mb-6 font-sans">
            01 / O Manifesto
          </span>
          <motion.h2
            style={{ opacity: textOpacity }}
            className="font-title text-3xl md:text-5xl font-light leading-relaxed text-bioma-water tracking-wide"
          >
            Casas respiram. Cidades sufocam. O Bioma nasce para restabelecer o cordão umbilical entre a arquitetura moderna e a inteligência silenciosa da natureza interna.
          </motion.h2>
        </div>

        <motion.div
          style={{ y: yParallax }}
          className="md:col-span-4 w-full aspect-[3/4] bg-bioma-moss/20 rounded border border-bioma-moss/40 relative overflow-hidden flex items-center justify-center group"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bioma-dark/80 z-10" />
          <div className="w-full h-[1px] bg-bioma-leaf/20 absolute top-1/4 left-0 group-hover:bg-bioma-leaf/50 transition-colors duration-500" />
          <div className="w-[1px] h-full bg-bioma-leaf/20 absolute top-0 left-1/3 group-hover:bg-bioma-leaf/50 transition-colors duration-500" />

          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-bioma-leaf/60 z-20">
            [ design biofílico ]
          </span>
        </motion.div>

      </div>
    </section>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const titleWords = "BIOMA".split("");
  const subtitleText = "Arquitetura biofílica e ecossistemas internos curados para espaços urbanos.";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 140 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.215, 0.610, 0.355, 1] }
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut", delay: 1.2 }
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className="w-full min-h-screen bg-bioma-dark">
        <main className="relative min-h-screen w-full flex flex-col justify-between p-8 md:p-16 z-10 overflow-hidden">

          <div className="absolute inset-0 -z-10 pointer-events-none opacity-30 mix-blend-screen overflow-hidden">
            <div
              className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-bioma-moss to-transparent blur-[120px] animate-pulse"
              style={{ willChange: 'transform, opacity', animationDuration: '8s' }}
            />
            <div
              className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-bioma-river to-transparent blur-[140px] animate-pulse"
              style={{ willChange: 'transform, opacity', animationDuration: '12s' }}
            />
          </div>

          <header className="w-full flex justify-between items-center z-20">
            {!isLoading && (
              <>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="font-title text-xl tracking-wider text-bioma-leaf"
                >
                  b .
                </motion.span>
                <motion.nav
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex gap-8 text-xs tracking-[0.2em] uppercase font-sans text-bioma-water/70"
                >
                  <a href="#galeria" className="hover:text-bioma-leaf transition-colors duration-300">Explorar</a>
                  <a href="#curadoria" className="hover:text-bioma-leaf transition-colors duration-300">O Ecossistema</a>
                </motion.nav>
              </>
            )}
          </header>

          <div className="flex flex-col items-start my-auto max-w-5xl">
            {!isLoading && (
              <>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex overflow-hidden mb-4"
                >
                  {titleWords.map((letter, idx) => (
                    <motion.h1
                      key={idx}
                      variants={letterVariants}
                      className="font-title text-[15vw] md:text-[12vw] font-light leading-none tracking-tight text-bioma-water select-none"
                    >
                      {letter}
                    </motion.h1>
                  ))}
                </motion.div>

                <motion.p
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  className="font-sans text-lg md:text-2xl font-light text-bioma-leaf max-w-xl leading-relaxed tracking-wide"
                >
                  {subtitleText}
                </motion.p>
              </>
            )}
          </div>

          <footer className="w-full flex justify-between items-end">
            {!isLoading && (
              <>
                <motion.div
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-[10px] tracking-[0.2em] uppercase text-bioma-water/40 font-sans"
                >
                  © 2026 — Bioma Platform
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="text-[10px] tracking-[0.3em] uppercase text-bioma-leaf font-sans writing-mode-vertical">
                    Scroll
                  </span>
                  <div className="w-[1px] h-12 bg-bioma-leaf/30 relative overflow-hidden">
                    <motion.div
                      animate={{ y: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-0 left-0 w-full h-1/2 bg-bioma-water"
                    />
                  </div>
                </motion.div>
              </>
            )}
          </footer>
        </main>

        {!isLoading && <Manifesto />}
      </div>
    </>
  );
}