'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Share2, Calendar, Tag, Play, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

const JOURNAL_DATA: Record<string, any> = {
    'endurance': {
        id: 'endurance',
        type: 'video',
        src: '/video/Endurance.mp4',
        categoryKey: 'mediaGrid.categories.campaign',
        date: 'FEB 2024',
        titleKey: 'mediaGrid.items.endurance',
        subtitleKey: 'mediaGrid.items.pushBeyond',
        descriptionKey: 'mediaGrid.descriptions.endurance'
    },
    'focus': {
        id: 'focus',
        type: 'image',
        src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop',
        categoryKey: 'mediaGrid.categories.story',
        date: 'JAN 2024',
        titleKey: 'mediaGrid.items.focus',
        subtitleKey: 'mediaGrid.items.innerStrength',
        descriptionKey: 'mediaGrid.descriptions.focus'
    },
    'power': {
        id: 'power',
        type: 'video',
        src: '/video/Power.mp4',
        categoryKey: 'mediaGrid.categories.editorial',
        date: 'MAR 2024',
        titleKey: 'mediaGrid.items.power',
        subtitleKey: 'mediaGrid.items.rawEnergy',
        descriptionKey: 'mediaGrid.descriptions.power'
    },
    'urban-flow': {
        id: 'urbanFlow',
        type: 'video',
        src: '/video/sports.mp4',
        categoryKey: 'mediaGrid.categories.campaign',
        date: 'APR 2024',
        titleKey: 'mediaGrid.items.urbanFlow',
        subtitleKey: 'mediaGrid.items.cityRhythm',
        descriptionKey: 'mediaGrid.descriptions.urbanFlow'
    },
    'precision': {
        id: 'precision',
        type: 'image',
        src: '/image/precision.jpg',
        categoryKey: 'mediaGrid.categories.story',
        date: 'MAY 2024',
        titleKey: 'mediaGrid.items.precision',
        subtitleKey: 'mediaGrid.items.everyDetail',
        descriptionKey: 'mediaGrid.descriptions.precision'
    },
    'motion': {
        id: 'motion',
        type: 'video',
        src: '/video/motion.mp4',
        categoryKey: 'mediaGrid.categories.editorial',
        date: 'JUN 2024',
        titleKey: 'mediaGrid.items.motion',
        subtitleKey: 'mediaGrid.items.unstoppable',
        descriptionKey: 'mediaGrid.descriptions.motion'
    },
    'style': {
        id: 'style',
        type: 'image',
        src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
        categoryKey: 'mediaGrid.categories.campaign',
        date: 'JUL 2024',
        titleKey: 'mediaGrid.items.style',
        subtitleKey: 'mediaGrid.items.futureReady',
        descriptionKey: 'mediaGrid.descriptions.style'
    }
};

export default function JournalPage() {
    const params = useParams();
    const router = useRouter();
    const { t } = useLanguage();
    const id = params.id as string;
    const data = JOURNAL_DATA[id];
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!data) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center space-y-6">
                    <h1 className="text-4xl font-black uppercase tracking-tighter italic">Source Not Found</h1>
                    <p className="text-white/40 text-sm tracking-widest uppercase">The requested journal entry has been redacted or moved.</p>
                    <Link href="/" className="inline-block px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full">Return Home</Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-[#ccff00] selection:text-black">
            <Navbar solid />

            {/* Cinematic Hero Section */}
            <section className="relative h-[85vh] md:h-screen w-full overflow-hidden flex items-end">
                <div className="absolute inset-0 z-0">
                    {data.type === 'video' ? (
                        <video
                            ref={videoRef}
                            src={data.src}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover opacity-60 scale-105"
                        />
                    ) : (
                        <div
                            className="w-full h-full bg-cover bg-center opacity-60 scale-105"
                            style={{ backgroundImage: `url(${data.src})` }}
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-12 pb-16 md:pb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-4xl"
                    >
                        <div className="flex items-center gap-4 mb-8 text-[#ccff00]">
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="w-12 h-[1px] bg-[#ccff00] origin-left"
                            />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Protocol {data.id.toUpperCase()}</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase italic leading-[0.85] tracking-tighter mb-8 mix-blend-difference break-words">
                            {t(data.titleKey)}
                        </h1>

                        <div className="flex flex-wrap items-center gap-8 text-white/40">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#ccff00]" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">{data.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Tag className="w-4 h-4 text-[#ccff00]" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">{t(data.categoryKey)}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Vertical Text Decoration */}
                <div className="absolute top-1/2 right-12 -translate-y-1/2 hidden lg:block opacity-10">
                    <span className="text-[15vh] font-black uppercase italic tracking-tighter vertical-text text-transparent border-text">
                        SECONDSKIN
                    </span>
                </div>
            </section>

            {/* Content Section */}
            <section className="relative z-20 py-24 md:py-40 px-6 md:px-12">
                <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
                    {/* Left Column: Philosophical Lead-in */}
                    <div className="lg:col-span-8 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <span className="text-[#ccff00] text-[10px] font-black uppercase tracking-[0.3em] block">Journal Entry // 01</span>
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase italic leading-[0.95]">
                                {t(data.subtitleKey)}
                            </h2>
                            <div className="w-24 h-1 bg-[#ccff00]" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/5 border-l border-[#ccff00] p-8 md:p-12 rounded-r-3xl backdrop-blur-xl"
                        >
                            <p className="text-2xl md:text-4xl font-medium leading-tight tracking-tight text-white italic">
                                "{t(data.descriptionKey)}"
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="prose prose-invert max-w-none space-y-8"
                        >
                            <p className="text-white/60 text-lg leading-relaxed font-medium font-inter">
                                At SecondSkinStyle, we believe that high-performance gear is more than just fabric. It's a catalyst for the human spirit. Our research and development focuses on the intersection of biomechanics and psychological state, ensuring that when you wear our gear, you transition into a state of pure focus.
                            </p>
                            <p className="text-white/60 text-lg leading-relaxed font-medium font-inter">
                                Every stitch in the {t(data.titleKey)} collection has been tested under extreme conditions. We don't just measure durability in hours, but in the intensity of the struggle. This is for those who find comfort in the uncomfortable.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right Column: Actions & Details */}
                    <div className="lg:col-span-4 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 space-y-8 sticky top-32"
                        >
                            <div className="space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#ccff00]">Action Panel</span>
                                <h3 className="text-2xl font-bold uppercase tracking-tighter italic">Experience {t(data.titleKey)}</h3>
                            </div>

                            <div className="space-y-4">
                                <Link
                                    href="/shop"
                                    className="w-full py-5 px-6 bg-[#ccff00] text-black font-black uppercase tracking-widest text-xs flex items-center justify-between rounded-2xl group transition-all hover:shadow-[0_0_40px_rgba(204,255,0,0.2)]"
                                >
                                    Shop Collection
                                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                                <button className="w-full py-5 px-6 border border-white/10 text-white font-black uppercase tracking-widest text-xs flex items-center justify-between rounded-2xl hover:bg-white/5 transition-all">
                                    Share Protocol
                                    <Share2 className="w-4 h-4 opacity-40" />
                                </button>
                            </div>

                            <div className="pt-8 border-t border-white/5 space-y-4">
                                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/30">
                                    <span>Latency Status</span>
                                    <span className="text-[#ccff00]">Optimal</span>
                                </div>
                                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/30">
                                    <span>Signal Strength</span>
                                    <span>98.4%</span>
                                </div>
                                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "98.4%" }}
                                        transition={{ duration: 2, ease: "easeOut" }}
                                        className="h-full bg-[#ccff00]"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Navigation Footer */}
            <section className="py-24 border-t border-white/5 bg-white/[0.01]">
                <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <Link
                        href="/"
                        className="flex items-center gap-4 group"
                    >
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#ccff00] transition-all group-hover:border-[#ccff00] group-hover:text-black">
                            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest">Abort & Return</span>
                    </Link>

                    <div className="flex gap-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-20">SYSTEM ACCESS — SECONDSKIN</span>
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx>{`
                .vertical-text {
                    writing-mode: vertical-rl;
                    padding: 0;
                    margin: 0;
                }
                .border-text {
                    -webkit-text-stroke: 1px rgba(255,255,255,0.2);
                }
            `}</style>
        </main>
    );
}
