'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ficusImage from '../../public/ficus-lyrata.webp'
import jardimImage from '../../public/jardim-vertical.jpg'
import terrarioImage from '../../public/terrario-fechado.jpg'
import musgoImage from '../../public/musgo-preservado.jpg'

const obras = [
    {
        id: 1,
        titulo: "Ficus Lyrata",
        categoria: "Purificação de Ar",
        descricao: "Espécime botânica majestosa de folhas largas, ideal para filtrar compostos orgânicos voláteis (VOCs) e regular de forma natural a umidade em ecossistemas internos.",
        imagem: ficusImage.src
    },
    {
        id: 2,
        titulo: "Jardim Vertical",
        categoria: "Design Biofílico",
        descricao: "Estrutura viva modular desenvolvida para integrar a natureza à arquitetura urbana. Otimiza o conforto térmico, purifica o fluxo de ar e reconecta o espaço à essência natural.",
        imagem: jardimImage.src
    },
    {
        id: 3,
        titulo: "Terrário Fechado",
        categoria: "Ecossistema Autossuficiente",
        descricao: "Microcosmo biológico isolado que replica os ciclos da água e dos nutrientes de forma autônoma. Uma obra de arte viva que demonstra o equilíbrio perfeito da biosfera em miniatura.",
        imagem: terrarioImage.src
    },
    {
        id: 4,
        titulo: "Musgo Preservado",
        categoria: "Atenuação Acústica",
        descricao: "Painel botânico estabilizado de alta performance que retém a textura e a cor natural sem necessidade de rega ou luz. Excelente para absorção sonora e conforto acústico.",
        imagem: musgoImage.src
    }
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
                                    {String(index + 1).padStart(2, '0')} / {obra.categoria}
                                </span>
                                <h3 className="font-title text-5xl md:text-7xl font-light text-bioma-water whitespace-nowrap">
                                    {obra.titulo}
                                </h3>
                                <p className="font-sans text-bioma-leaf/80 font-light text-xl leading-relaxed mt-4">
                                    {obra.descricao}
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