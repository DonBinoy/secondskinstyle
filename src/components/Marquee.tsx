'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Marquee() {
    const { t } = useLanguage();
    const marqueeText = t('marquee.text');

    return (
        <div className="relative w-full py-4 bg-black overflow-hidden border-y border-zinc-900">
            <div className="flex whitespace-nowrap">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20,
                    }}
                    className="flex items-center"
                >
                    {[...Array(4)].map((_, i) => (
                        <span key={i} className="text-white text-sm font-bold tracking-[0.2em] uppercase mx-4">
                            {marqueeText}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
