'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import MagneticButton from './ui/MagneticButton';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
    const { t } = useLanguage();
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.playsInline = true;
            videoRef.current.play().catch(error => {
                console.warn("Video play failed:", error);
            });
        }
    }, []);

    return (
        <section className="relative w-full h-[90vh] overflow-hidden bg-black">
            {/* ... Background Video ... */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="object-cover w-full h-full opacity-90"
                >
                    <source src="/video/Herosection.mp4" type="video/mp4" />
                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
                        <span className="text-white">Video Placeholder</span>
                    </div>
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col items-start justify-end w-full h-full px-8 pb-32 md:px-16 max-w-[1920px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-2xl text-left"
                >
                    <h2 className="mb-4 text-xl font-bold tracking-widest text-white uppercase md:text-2xl">
                        {t('hero.collection')}
                    </h2>
                    <h1 className="mb-8 text-5xl font-black tracking-tight text-white md:text-7xl lg:text-8xl">
                        {t('hero.title').split(' ').map((word: string, i: number) => (
                            <span key={i} className="block">{word}</span>
                        ))}
                    </h1>
                    <div className="flex gap-4">
                        <Link href="/men">
                            <MagneticButton className="px-8 py-4 text-sm font-bold tracking-wider text-black uppercase bg-white hover:bg-neutral-200">
                                {t('hero.shopMen')}
                            </MagneticButton>
                        </Link>
                        <Link href="/women">
                            <MagneticButton className="px-8 py-4 text-sm font-bold tracking-wider text-white uppercase border border-white hover:bg-white hover:text-black">
                                {t('hero.shopWomen')}
                            </MagneticButton>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
