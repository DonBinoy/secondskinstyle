'use client';

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion, useScroll, useTransform } from 'framer-motion';

interface InfoLayoutProps {
    title: string;
    subtitle?: string;
    watermark?: string;
    children: React.ReactNode;
}

export default function InfoLayout({ title, subtitle, watermark, children }: InfoLayoutProps) {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 300], [0.5, 0.1]);

    return (
        <main className="min-h-screen bg-white selection:bg-black selection:text-white relative overflow-hidden">
            <Navbar solid />

            {/* Cinematic Noise/Grain Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[99] opacity-[0.03] mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            {/* Parallax Background Watermark */}
            {watermark && (
                <motion.div
                    style={{ y: y1, opacity }}
                    className="absolute top-20 right-[-5%] font-black text-[25vw] text-neutral-100 select-none pointer-events-none uppercase italic leading-none whitespace-nowrap z-0"
                >
                    {watermark}
                </motion.div>
            )}

            <div className="max-w-[1920px] mx-auto px-6 md:px-12 pt-48 pb-32 relative z-10">
                <div className="flex flex-col xl:flex-row gap-20 xl:gap-32">
                    {/* Left Side: Sticky Editorial Title */}
                    <header className="xl:w-1/3 xl:sticky xl:top-48 h-fit z-20">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="flex flex-col gap-8">
                                <div className="flex items-center gap-4 group">
                                    <div className="h-[2px] w-12 bg-black origin-left scale-x-100 group-hover:scale-x-150 transition-transform duration-700" />
                                    <p className="text-neutral-400 text-[10px] font-black uppercase tracking-[0.5em]">
                                        {subtitle || "SUPPORT CENTER"}
                                    </p>
                                </div>

                                <h1 className="text-7xl md:text-8xl 2xl:text-9xl font-bold tracking-tighter text-neutral-900 uppercase leading-[0.85] italic">
                                    {title}
                                </h1>

                                <div className="mt-6 flex gap-8 text-[9px] font-bold text-neutral-300 uppercase tracking-widest leading-none">
                                    <div className="flex flex-col gap-2">
                                        <span>SEC.</span>
                                        <span className="text-neutral-900 font-mono">01</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span>EST.</span>
                                        <span className="text-neutral-900 font-mono">2026</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span>LOC.</span>
                                        <span className="text-neutral-900 font-mono">NY_USA</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </header>

                    {/* Right Side: Content Area */}
                    <div className="xl:w-2/3 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="max-w-4xl"
                        >
                            {children}
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
