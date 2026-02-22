'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

const LIFESTYLE_ITEMS = [
    {
        type: 'video',
        src: '/video/product.mp4',
        title: 'Movement Redefined',
        label: 'Campaign Film',
        id: '01'
    },
    {
        type: 'image',
        src: '/image/product/product1.jpg',
        title: 'Urban Utility',
        label: 'Style Edit',
        id: '02'
    },
    {
        type: 'text',
        content: '"Designed for the modern athlete who demands both aesthetic precision and technical superiority."',
        id: '03'
    },
    {
        type: 'image',
        src: '/image/product/product2.jpg',
        title: 'Technical Edge',
        label: 'Limited Edition',
        id: '04'
    }
];

export default function LifestyleGrid() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % LIFESTYLE_ITEMS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [isPaused]);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % LIFESTYLE_ITEMS.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + LIFESTYLE_ITEMS.length) % LIFESTYLE_ITEMS.length);

    const currentItem = LIFESTYLE_ITEMS[currentIndex];

    return (
        <section
            className="bg-white py-20 px-4 md:px-10 max-w-[1920px] mx-auto overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Desktop View: Bento Grid */}
            <div className="hidden md:grid grid-cols-12 gap-8 auto-rows-[400px]">
                {/* 01: Large Video - 8 Cols */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="col-span-8 row-span-2 relative rounded-[40px] overflow-hidden group shadow-xl"
                >
                    <video
                        src={LIFESTYLE_ITEMS[0].src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-10 left-10 text-white">
                        <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 mb-4 w-fit">
                            <Play className="w-3 h-3 fill-current" /> {LIFESTYLE_ITEMS[0].label}
                        </span>
                        <h3 className="text-6xl font-black uppercase tracking-tighter leading-[0.9]">
                            {LIFESTYLE_ITEMS[0].title?.split(' ').map((word, i) => (
                                <span key={i} className="block">{word}</span>
                            ))}
                        </h3>
                    </div>
                </motion.div>

                {/* 02: Vertical Image - 4 Cols */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="col-span-4 row-span-2 relative rounded-[40px] overflow-hidden group shadow-xl"
                >
                    <Image
                        src={LIFESTYLE_ITEMS[1].src!}
                        alt={LIFESTYLE_ITEMS[1].title!}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute bottom-10 left-10 text-white">
                        <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 block w-fit">
                            {LIFESTYLE_ITEMS[1].label}
                        </span>
                        <h3 className="text-4xl font-black uppercase tracking-tighter leading-none">
                            {LIFESTYLE_ITEMS[1].title}
                        </h3>
                    </div>
                </motion.div>

                {/* 03: Text Block - 4 Cols */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="col-span-4 bg-neutral-50 rounded-[40px] p-12 flex flex-col justify-between border border-neutral-100 relative overflow-hidden group"
                >
                    <span className="text-[120px] font-black text-neutral-100 absolute -top-4 -right-4 select-none group-hover:text-neutral-200 transition-colors duration-500">
                        {LIFESTYLE_ITEMS[2].id}
                    </span>
                    <div className="relative z-10 space-y-4">
                        <div className="w-8 h-1 bg-black group-hover:w-16 transition-all duration-500" />
                    </div>
                    <p className="text-2xl font-medium leading-tight tracking-tight text-neutral-900 italic relative z-10">
                        {LIFESTYLE_ITEMS[2].content}
                    </p>
                </motion.div>

                {/* 04: Horizontal Image - 8 Cols */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="col-span-8 relative rounded-[40px] overflow-hidden group shadow-xl"
                >
                    <Image
                        src={LIFESTYLE_ITEMS[3].src!}
                        alt={LIFESTYLE_ITEMS[3].title!}
                        fill
                        className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute top-10 right-10">
                        <span className="bg-black text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
                            {LIFESTYLE_ITEMS[3].label}
                        </span>
                    </div>
                    <div className="absolute bottom-10 left-10 text-white">
                        <h3 className="text-5xl font-black uppercase tracking-tighter leading-none">
                            {LIFESTYLE_ITEMS[3].title}
                        </h3>
                    </div>
                </motion.div>
            </div>

            {/* Mobile View: Auto-sliding Carousel */}
            <div className="md:hidden relative h-[600px] w-full rounded-[40px] overflow-hidden bg-neutral-50 shadow-2xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute inset-0"
                    >
                        {currentItem.type === 'video' && (
                            <div className="relative w-full h-full">
                                <video
                                    src={currentItem.src}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover grayscale brightness-75"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute bottom-10 left-8 text-white max-w-[80%]">
                                    <motion.span
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 mb-4 w-fit"
                                    >
                                        <Play className="w-3 h-3 fill-current" /> {currentItem.label}
                                    </motion.span>
                                    <motion.h3
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="text-4xl font-black tracking-tighter uppercase leading-[0.9]"
                                    >
                                        {currentItem.title?.split(' ').map((word, i) => (
                                            <span key={i} className="block">{word}</span>
                                        ))}
                                    </motion.h3>
                                </div>
                            </div>
                        )}

                        {currentItem.type === 'image' && (
                            <div className="relative w-full h-full">
                                <Image
                                    src={currentItem.src!}
                                    alt={currentItem.title || ''}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute bottom-10 left-8 text-white">
                                    <motion.span
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 block w-fit"
                                    >
                                        {currentItem.label}
                                    </motion.span>
                                    <motion.h3
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="text-4xl font-black tracking-tighter uppercase leading-[0.9]"
                                    >
                                        {currentItem.title}
                                    </motion.h3>
                                </div>
                            </div>
                        )}

                        {currentItem.type === 'text' && (
                            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-white">
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-[120px] font-black text-neutral-50 absolute inset-0 flex items-center justify-center select-none"
                                >
                                    {currentItem.id}
                                </motion.span>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-2xl font-medium leading-tight tracking-tight text-neutral-900 relative z-10 italic"
                                >
                                    {currentItem.content}
                                </motion.p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Progress Indicators (Mobile) */}
                <div className="absolute top-8 left-8 flex gap-2 z-20">
                    {LIFESTYLE_ITEMS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className="group relative h-1 w-8 bg-black/10 overflow-hidden rounded-full"
                        >
                            <motion.div
                                initial={false}
                                animate={{
                                    width: currentIndex === i ? "100%" : "0%"
                                }}
                                transition={{ duration: currentIndex === i ? 5 : 0.4, ease: "linear" }}
                                className="absolute inset-0 bg-black"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

