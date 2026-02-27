'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const BRAND_NAME = "SecondSkinStyle";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [statusIndex, setStatusIndex] = useState(0);

    const loadingStatuses = [
        "INITIALIZING CORE...",
        "SYNCING ASSETS...",
        "OPTIMIZING TEXTURES...",
        "UNLEASHING POWER..."
    ];

    useEffect(() => {
        // Organic progress bar simulation
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Random jumpy progress for organic feel
                const increment = Math.random() > 0.8 ? Math.random() * 15 : Math.random() * 5;
                return Math.min(prev + increment, 100);
            });
        }, 120);

        // Rotate through statuses
        const statusInterval = setInterval(() => {
            setStatusIndex((prev) => (prev + 1) % loadingStatuses.length);
        }, 600);

        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.cursor = 'default';
            window.scrollTo(0, 0);
        }, 3500);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
            clearInterval(statusInterval);
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
                    }}
                    className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black overflow-hidden"
                >
                    {/* Cinematic Scanning Line */}
                    <motion.div
                        initial={{ top: "-10%" }}
                        animate={{ top: "110%" }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-[30vh] bg-gradient-to-b from-transparent via-white/[0.03] to-transparent z-0 pointer-events-none"
                    />

                    <div className="flex flex-col items-center gap-16 w-full max-w-md relative z-10 px-6">
                        {/* Logo with Enhanced Effects */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            className="relative"
                        >
                            <Image
                                src="/logosecondskin.svg"
                                alt="Logo"
                                width={160}
                                height={160}
                                className="w-28 h-28 md:w-40 md:h-40 brightness-150 transition-all duration-300 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                                priority
                            />

                            {/* Orbital Pulse */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.4],
                                    opacity: [0.2, 0]
                                }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                                className="absolute inset-0 rounded-full border border-white/30 -z-10"
                            />
                            <motion.div
                                animate={{
                                    scale: [1, 1.8],
                                    opacity: [0.1, 0]
                                }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                                className="absolute inset-0 rounded-full border border-white/20 -z-10"
                            />
                        </motion.div>

                        {/* Staggered Branding */}
                        <div className="flex flex-col items-center text-center">
                            <div className="flex overflow-hidden">
                                {BRAND_NAME.split('').map((char, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ y: 80, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            duration: 1,
                                            ease: [0.16, 1, 0.3, 1],
                                            delay: 0.4 + (i * 0.04)
                                        }}
                                        className="text-white text-4xl md:text-6xl font-black tracking-tighter uppercase italic inline-block"
                                    >
                                        {char === ' ' ? '\u00A0' : char}
                                    </motion.span>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, letterSpacing: "0.2em" }}
                                animate={{ opacity: 0.5, letterSpacing: "0.5em" }}
                                transition={{ delay: 1.2, duration: 1.5 }}
                                className="mt-6"
                            >
                                <span className="text-white text-[9px] md:text-[11px] uppercase font-bold whitespace-nowrap">
                                    ESTABLISHED // MMXXVI
                                </span>
                            </motion.div>
                        </div>

                        {/* High-Tech Progress Section */}
                        <div className="w-full flex flex-col gap-6 mt-4">
                            <div className="flex justify-between items-end border-b border-white/10 pb-2">
                                <motion.span
                                    key={statusIndex}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-white/40 text-[9px] font-mono tracking-widest uppercase"
                                >
                                    {loadingStatuses[statusIndex]}
                                </motion.span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-white text-2xl font-black tracking-tighter tabular-nums">
                                        {Math.round(progress)}
                                    </span>
                                    <span className="text-white/30 text-[10px] font-bold">%</span>
                                </div>
                            </div>

                            <div className="h-[2px] w-full bg-white/5 relative">
                                <motion.div
                                    className="absolute top-0 left-0 h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ ease: "easeOut" }}
                                />

                                {/* Scanning pulse on the bar */}
                                <motion.div
                                    className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                    animate={{
                                        left: ["-10%", "110%"]
                                    }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Background UI Grid Detail */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
