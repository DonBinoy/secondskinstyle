'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.cursor = 'default';
            window.scrollTo(0, 0);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-black"
                >
                    <div className="relative overflow-hidden">
                        <motion.div
                            initial={{ y: 0 }}
                            exit={{ y: "-100%" }}
                            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                            className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter"
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                className="block"
                            >
                                SecondSkinStyle
                            </motion.span>
                        </motion.div>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1.5, ease: "circInOut" }}
                            className="absolute bottom-0 left-0 w-full h-1 bg-white origin-left"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
