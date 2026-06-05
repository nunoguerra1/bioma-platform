'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import PlantCard3D from '@/components/PlantCard3D';

const minhasPlantas = [
    { id: 1, title: "Monstera Deliciosa", status: "Precisa de Rega", health: 45, image: "https://images.unsplash.com/photo-1592525413155-22445c55beea?q=80&w=600&auto=format&fit=crop" },
    { id: 2, title: "Ficus Lyrata", status: "Saudável", health: 90, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d40?q=80&w=600&auto=format&fit=crop" },
    { id: 3, title: "Calathea Orbifolia", status: "Aclimatizar", health: 70, image: "https://images.unsplash.com/photo-1620127807580-55e100ec5a06?q=80&w=600&auto=format&fit=crop" },
];

export default function Dashboard() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <main
            onMouseMove={handleMouseMove}
            className="relative min-h-screen bg-bioma-dark overflow-hidden flex flex-col items-center justify-center py-20 px-8"
        >

            <motion.div
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(163, 184, 153, 0.08),
              transparent 80%
            )
          `,
                }}
            />

            <div className="w-full max-w-6xl z-10 relative">
                <header className="mb-16 flex flex-col md:flex-row justify-between items-end border-b border-bioma-moss/30 pb-8">
                    <div>
                        <span className="text-xs tracking-[0.3em] uppercase text-bioma-leaf font-sans">
                            Ecossistema Pessoal
                        </span>
                        <h1 className="font-title text-4xl md:text-5xl text-bioma-water font-light mt-4">
                            Bem-vindo, Nuno.
                        </h1>
                    </div>
                    <div className="mt-8 md:mt-0 text-right">
                        <span className="block text-xs uppercase tracking-[0.2em] text-bioma-water/50">
                            Qualidade do Ar Interno
                        </span>
                        <span className="font-title text-2xl text-bioma-leaf">Excepcional</span>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-[1200px]">
                    {minhasPlantas.map((planta) => (
                        <PlantCard3D
                            key={planta.id}
                            title={planta.title}
                            status={planta.status}
                            health={planta.health}
                            image={planta.image}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}