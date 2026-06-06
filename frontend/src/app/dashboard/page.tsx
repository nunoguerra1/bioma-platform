'use client';

import { motion, AnimatePresence, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

// Interface para garantir que o TypeScript entende os dados que vêm do banco
interface Planta {
    id: string;
    titulo: string;
    status: string;
    vitalidade: number;
    imagem: string;
}

export default function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [plantas, setPlantas] = useState<Planta[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [tituloNovaPlanta, setTituloNovaPlanta] = useState("");

    const activePlanta = plantas.find(p => p.id === activeId);

    useEffect(() => {
        async function carregarPlantas() {
            try {
                const resposta = await fetch('http://localhost:3333/plantas');
                if (!resposta.ok) throw new Error("Erro na rede");

                const dados = await resposta.json();
                setPlantas(dados);

                if (dados.length > 0) {
                    setActiveId(dados[0].id);
                }
            } catch (erro) {
                console.error("Erro ao buscar plantas do backend:", erro);
            } finally {
                setIsLoading(false);
            }
        }

        carregarPlantas();
    }, []);

    const handleCriarPlanta = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!tituloNovaPlanta.trim()) return;

        const novaPlanta = {
            titulo: tituloNovaPlanta,
            status: "Aclimatizar",
            vitalidade: 100,
            imagem: "https://images.unsplash.com/photo-1597054942004-98ce4f526b77?q=80&w=1200&auto=format&fit=crop"
        };

        try {
            const resposta = await fetch('http://localhost:3333/plantas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novaPlanta),
            });

            if (!resposta.ok) throw new Error("Falha ao criar");

            const plantaCriada = await resposta.json();

            setPlantas((prev) => [...prev, plantaCriada]);
            setActiveId(plantaCriada.id);
            setIsModalOpen(false);
            setTituloNovaPlanta("");

        } catch (erro) {
            console.error("Erro ao salvar planta:", erro);
        }
    };

    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                carousel.scrollLeft += e.deltaY;
            }
        };

        carousel.addEventListener('wheel', handleWheel, { passive: false });
        return () => carousel.removeEventListener('wheel', handleWheel);
    }, [plantas]);

    const { scrollXProgress, scrollX } = useScroll({ container: carouselRef });
    const scrollVelocity = useVelocity(scrollX);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const skewX = useTransform(smoothVelocity, [-1000, 1000], [-8, 8]);

    return (
        <main className="relative min-h-screen bg-bioma-dark overflow-x-hidden flex flex-col items-center py-12">

            <AnimatePresence mode="wait">
                {activePlanta && (
                    <motion.div
                        key={activeId}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.15, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none"
                        style={{
                            backgroundImage: `url(${activePlanta.imagem})`,
                            filter: 'blur(30px) saturate(150%)'
                        }}
                    />
                )}
            </AnimatePresence>
            <div className="fixed inset-0 bg-gradient-to-b from-bioma-dark/80 via-transparent to-bioma-dark/90 z-0 pointer-events-none" />

            <Link
                href="/"
                className="fixed top-8 left-8 z-50 px-4 py-2 text-[10px] tracking-[0.2em] uppercase text-bioma-water/50 hover:text-bioma-leaf border border-transparent hover:border-bioma-leaf/30 rounded-full bg-bioma-dark/50 backdrop-blur-md transition-all duration-300"
            >
                ← Retornar
            </Link>

            <div className="w-full z-10 relative flex flex-col h-full mt-12 mb-20 px-8">

                <header className="mb-12 flex flex-col md:flex-row justify-between items-end border-b border-bioma-moss/30 pb-6 max-w-7xl mx-auto w-full">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                        <span className="text-xs tracking-[0.3em] uppercase text-bioma-leaf font-sans">Ecossistema</span>
                        <h1 className="font-title text-4xl md:text-5xl text-bioma-water font-light mt-2">Visão Geral.</h1>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }}>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-6 py-3 bg-transparent border border-bioma-leaf/50 text-bioma-leaf text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-bioma-leaf hover:text-bioma-dark transition-all duration-300 rounded shadow-[0_0_15px_rgba(163,184,153,0)] hover:shadow-[0_0_20px_rgba(163,184,153,0.3)]"
                        >
                            + Adicionar Espécime
                        </button>
                    </motion.div>
                </header>

                {isLoading ? (
                    <div className="w-full h-[65vh] flex items-center justify-center">
                        <p className="text-bioma-leaf/50 tracking-[0.2em] uppercase text-xs animate-pulse">Sincronizando com o ecossistema...</p>
                    </div>
                ) : plantas.length === 0 ? (
                    <div className="w-full h-[65vh] flex items-center justify-center border border-dashed border-bioma-moss/30 rounded-2xl max-w-7xl mx-auto">
                        <p className="text-bioma-water/50 tracking-[0.1em] uppercase text-xs">Nenhuma espécime catalogada. Adicione sua primeira planta.</p>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="relative w-full"
                    >
                        <div
                            ref={carouselRef}
                            className="flex flex-row items-center w-full h-[65vh] gap-6 overflow-x-auto px-4 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                        >
                            {plantas.map((planta, index) => {
                                const isActive = activeId === planta.id;

                                return (
                                    <motion.div
                                        key={planta.id}
                                        layout
                                        onClick={() => setActiveId(planta.id)}
                                        className={`relative h-full rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-end shrink-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'w-[85vw] md:w-[700px] shadow-2xl shadow-black/80' : 'w-[45vw] md:w-[200px] hover:w-[220px]'
                                            }`}
                                    >
                                        <motion.div style={{ skewX }} className="absolute inset-0 w-full h-full origin-bottom">
                                            <motion.div layout className="absolute inset-0 w-full h-full bg-bioma-dark">
                                                <div
                                                    className="w-full h-full bg-cover bg-center transition-all duration-700"
                                                    style={{
                                                        backgroundImage: `url(${planta.imagem})`,
                                                        filter: isActive ? 'grayscale(0%) brightness(100%)' : 'grayscale(100%) brightness(40%)'
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-bioma-dark/90 via-bioma-dark/20 to-transparent" />
                                            </motion.div>

                                            <div className="relative z-10 w-full h-full flex flex-col justify-end p-6">
                                                {isActive ? (
                                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="flex flex-col gap-4">
                                                        <div className="flex items-center gap-4">
                                                            <span className="px-3 py-1 bg-bioma-dark/50 backdrop-blur-md border border-bioma-moss/50 rounded-full text-[10px] uppercase tracking-widest text-bioma-leaf">{planta.status}</span>
                                                            <span className="text-[10px] text-bioma-water/50 uppercase tracking-widest">ID: #00{index + 1}</span>
                                                        </div>
                                                        <h2 className="font-title text-4xl md:text-6xl text-bioma-water font-light whitespace-nowrap overflow-hidden text-ellipsis">{planta.titulo}</h2>

                                                        <div className="w-full max-w-sm mt-4 p-4 bg-bioma-dark/60 backdrop-blur-xl border border-bioma-moss/30 rounded-xl">
                                                            <div className="flex justify-between text-xs text-bioma-water/70 mb-2 font-sans tracking-wide">
                                                                <span>Índice de Vitalidade</span>
                                                                <span className="text-bioma-leaf">{planta.vitalidade}%</span>
                                                            </div>
                                                            <div className="w-full bg-bioma-dark h-1.5 rounded-full overflow-hidden">
                                                                <motion.div initial={{ width: 0 }} animate={{ width: `${planta.vitalidade}%` }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-gradient-to-r from-bioma-moss to-bioma-leaf" />
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ) : (
                                                    <div className="w-full h-full flex items-end justify-center pb-8 opacity-50 hover:opacity-100 transition-opacity">
                                                        <span className="font-title text-xl text-bioma-water tracking-widest whitespace-nowrap" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                                                            {planta.titulo}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="absolute -bottom-8 left-4 right-4 h-[2px] bg-bioma-moss/20 rounded-full overflow-hidden max-w-7xl mx-auto">
                            <motion.div
                                className="h-full bg-bioma-leaf shadow-[0_0_10px_rgba(163,184,153,0.8)] origin-left"
                                style={{ scaleX: scrollXProgress }}
                            />
                        </div>
                    </motion.div>
                )}
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-bioma-dark/90 backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.95, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 20, opacity: 0 }} className="w-full max-w-lg bg-bioma-dark/50 border border-bioma-leaf/20 rounded-2xl p-8 relative shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-bioma-water/50 hover:text-bioma-leaf text-xl transition-colors">✕</button>
                            <span className="text-[10px] tracking-[0.3em] uppercase text-bioma-leaf mb-2 block">Catalogação</span>
                            <h2 className="font-title text-3xl text-bioma-water font-light mb-8">Nova Planta</h2>

                            <form className="flex flex-col gap-6" onSubmit={handleCriarPlanta}>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-bioma-water/60">Nome da Espécie</label>
                                    <input
                                        type="text"
                                        required
                                        value={tituloNovaPlanta}
                                        onChange={(e) => setTituloNovaPlanta(e.target.value)}
                                        className="bg-transparent border-b border-bioma-moss/50 text-bioma-water p-2 focus:outline-none focus:border-bioma-leaf"
                                        placeholder="ex: Ficus Elastica"
                                    />
                                </div>
                                <button type="submit" className="mt-6 w-full py-4 bg-bioma-water text-bioma-dark uppercase tracking-[0.2em] text-xs font-bold hover:bg-bioma-leaf transition-colors rounded">
                                    Confirmar Inserção
                                </button>
                            </form>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}