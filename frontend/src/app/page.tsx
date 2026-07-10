'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Preloader from '@/components/Preloader';
import Galeria from '@/components/Galeria';
import Footer from '@/components/Footer';
import Link from 'next/link';

function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const phrase = "Casas respiram. Cidades sufocam. O Bioma nasce para restabelecer o cordão umbilical entre a arquitetura moderna e a inteligência silenciosa da natureza interna.";
  const words = phrase.split(" ");

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full bg-bioma-dark flex flex-col justify-center px-8 md:px-16 py-32 relative z-20 border-t border-bioma-moss/30"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-16 items-center">

        <div className="md:col-span-7 flex flex-wrap gap-x-3 gap-y-2">
          <div className="w-full mb-6">
            <span className="text-xs tracking-[0.3em] uppercase text-bioma-leaf font-sans">
              01 / O Manifesto
            </span>
          </div>
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);

            return (
              <motion.span
                key={i}
                style={{ opacity }}
                className="font-title text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-bioma-water tracking-wide"
              >
                {word}
              </motion.span>
            );
          })}
        </div>

        <div className="md:col-span-5 w-full relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 w-full h-full overflow-hidden rounded">
            <motion.div
              style={{ y: yParallax }}
              className="absolute top-[-20%] left-[-10%] w-[120%] h-[140%]"
            >
              <Image
                src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1200&auto=format&fit=crop"
                alt="Textura de folhas e natureza"
                fill
                className="object-cover opacity-80"
              />
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('@bioma:token');
    const userString = localStorage.getItem('@bioma:user');

    if (token && userString) {
      setIsLoggedIn(true);
      const user = JSON.parse(userString);
      setUserName(user.nome.split(' ')[0]);
    }
  }, []);

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
                  className="flex gap-8 text-xs tracking-[0.2em] uppercase font-sans text-bioma-water/70 items-center"
                >
                  <a href="#galeria" className="hover:text-bioma-leaf transition-colors duration-300 hidden md:inline-block">Explorar</a>
                  <a href="#curadoria" className="hover:text-bioma-leaf transition-colors duration-300 hidden md:inline-block">O Ecossistema</a>

                  {isLoggedIn ? (
                    <Link
                      href="/dashboard"
                      className="px-5 py-2 border border-bioma-leaf bg-bioma-leaf text-bioma-dark hover:bg-transparent hover:text-bioma-leaf transition-all duration-300 rounded shadow-[0_0_20px_rgba(163,184,153,0.3)] font-bold"
                    >
                      {userName} →
                    </Link>
                  ) : (
                    <Link
                      href="/auth"
                      className="px-5 py-2 border border-bioma-moss/50 text-bioma-leaf hover:bg-bioma-moss/20 hover:border-bioma-leaf transition-all duration-300 rounded"
                    >
                      Entrar
                    </Link>
                  )}

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

        {!isLoading && (
          <>
            <Manifesto />
            <Galeria />
            <Footer />
          </>
        )}
      </div>
    </>
  );
}