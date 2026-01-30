'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Editorial() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

    return (
        <section ref={sectionRef} className="relative w-full h-[85vh] overflow-hidden my-24 flex items-center justify-center">
            {/* Parallax Background */}
            <motion.div
                style={{ scale, y }}
                className="absolute inset-0 z-0"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop")' }}
                />
                <div className="absolute inset-0 bg-black/30" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mix-blend-overlay">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-white/80 font-bold tracking-[0.4em] uppercase mb-6 block text-sm md:text-base"
                >
                    The Collection
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-none mb-10"
                >
                    Defy <br /> Limits
                </motion.h2>
                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest hover:bg-neutral-200 transition-all transform hover:scale-105"
                >
                    Explore Now
                </motion.button>
            </div>
        </section>
    );
}
