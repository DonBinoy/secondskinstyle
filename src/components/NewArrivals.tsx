'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';

const NEW_ARRIVALS = [
    PRODUCTS.find(p => p.id === 'aero-edge-tank-top')!,
    PRODUCTS.find(p => p.id === 'aero-stride-tank-top')!,
    PRODUCTS.find(p => p.id === 'aero-v-tank-top')!,
    PRODUCTS.find(p => p.id === 'aero-core-round-neck')!,
    PRODUCTS.find(p => p.id === 'aero-pulse-tank-top')!,
    PRODUCTS.find(p => p.id === 'aero-drift-round-neck')!,
].filter(Boolean); // Safety check

export default function NewArrivals() {
    const { t } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleItems, setVisibleItems] = useState(1);
    const [isMounted, setIsMounted] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const handleResize = () => {
            // 1.25 visible items means 80% of one product and 20% of the next
            setVisibleItems(window.innerWidth >= 1024 ? 2 : 1.25);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto-slide effect
    useEffect(() => {
        if (!isMounted || isPaused) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % NEW_ARRIVALS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [isMounted, isPaused, currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % NEW_ARRIVALS.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + NEW_ARRIVALS.length) % NEW_ARRIVALS.length);
    };

    const isDesktop = isMounted && window.innerWidth >= 1024;

    if (!isMounted) return <div className="h-[600px] w-full bg-white" />;

    return (
        <section
            className="w-full py-16 md:py-24 bg-white text-black overflow-hidden select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="max-w-[1920px] mx-auto">
                <div className="mb-8 md:mb-12 px-6 md:px-16 flex justify-between items-end">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        {t('home.newArrivals')}
                    </h2>
                    <Link href="/shop" className="text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors pb-1 border-b border-transparent hover:border-black">
                        {t('home.viewAll')}
                    </Link>
                </div>

                <div className="relative group/carousel w-full">
                    <div className={cn(
                        "relative border-y border-neutral-100",
                        !isDesktop ? "overflow-x-auto snap-x snap-mandatory no-scrollbar flex" : "overflow-hidden"
                    )}>
                        <motion.div
                            className="flex w-full"
                            animate={isDesktop ? { x: `-${currentIndex * (100 / visibleItems)}%` } : { x: 0 }}
                            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                        >
                            {NEW_ARRIVALS.map((product, index) => (
                                <div
                                    key={product.id}
                                    className={cn(
                                        "flex-shrink-0 relative border-r border-neutral-100",
                                        !isDesktop ? "w-[80vw] snap-center first:ml-6" : ""
                                    )}
                                    style={isDesktop ? { width: `${100 / visibleItems}%` } : {}}
                                >
                                    <Link href={`/product/${product.id}`} className="block h-full group">
                                        <div className="flex flex-col md:flex-row h-full min-h-[400px] items-center p-6 md:p-16 gap-4 md:gap-12 group-hover:bg-neutral-50/30 transition-colors duration-500">

                                            {/* Image Side - Left */}
                                            <div className="w-full md:w-1/2 flex items-center justify-center">
                                                <motion.div
                                                    className="relative w-full aspect-[4/5] max-w-[280px]"
                                                    whileHover={{ scale: 1.05 }}
                                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                                >
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        className="object-contain"
                                                    />
                                                </motion.div>
                                            </div>

                                            {/* Content Side - Right */}
                                            <div className="w-full md:w-1/2 flex flex-col justify-start text-left h-full py-4 md:py-0">
                                                <div className="mb-1">
                                                    <h3 className="text-xl md:text-2xl font-normal text-neutral-800 tracking-tight">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-lg md:text-xl text-neutral-800 font-normal">
                                                        {product.currency} {product.price.toFixed(2)}
                                                    </p>
                                                </div>

                                                <div className="mt-1">
                                                    <p className="text-neutral-500 text-sm leading-relaxed max-w-[280px] mb-4">
                                                        {product.description}
                                                    </p>
                                                    <div className="inline-block px-6 py-2 border border-black text-black text-sm font-bold uppercase tracking-wider group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                                        {t('home.buyNow')}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Navigation Buttons - Tablet/Desktop only */}
                    {isDesktop && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/60 backdrop-blur-md border border-black/5 flex items-center justify-center hover:bg-white hover:border-black/10 transition-all z-20 opacity-0 group-hover/carousel:opacity-100"
                                aria-label="Previous"
                            >
                                <ChevronLeft className="w-5 h-5 text-black" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/60 backdrop-blur-md border border-black/5 flex items-center justify-center hover:bg-white hover:border-black/10 transition-all z-20 opacity-0 group-hover/carousel:opacity-100"
                                aria-label="Next"
                            >
                                <ChevronRight className="w-5 h-5 text-black" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
