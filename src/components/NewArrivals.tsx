'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

import Link from 'next/link';
import { PRODUCTS } from '@/data/products';

const NEW_ARRIVALS = [
    PRODUCTS.find(p => p.id === 'voltmesh-performance-tee')!,
    PRODUCTS.find(p => p.id === 'pulse-seamless-tank')!,
    PRODUCTS.find(p => p.id === 'aeroskort')!,
    PRODUCTS.find(p => p.id === 'flexshort-pro')!
].filter(Boolean); // Safety check

export default function NewArrivals() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleItems, setVisibleItems] = useState(1);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const handleResize = () => {
            // Match specific large screen layout with 2 items
            // To match "separate line", we must render dividers.
            setVisibleItems(window.innerWidth >= 1024 ? 2 : 1);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % NEW_ARRIVALS.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + NEW_ARRIVALS.length) % NEW_ARRIVALS.length);
    };

    if (!isMounted) return <div className="h-[600px] w-full bg-white" />;

    return (
        <section className="w-full py-24 bg-white text-black overflow-hidden select-none">
            <div className="max-w-[1920px] mx-auto">
                <div className="mb-12 px-8 md:px-16 flex justify-between items-end">
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
                        New Arrivals
                    </h2>
                    <Link href="/shop" className="text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors pb-1 border-b border-transparent hover:border-black">
                        View All
                    </Link>
                </div>

                <div className="relative border-y border-neutral-100">
                    <motion.div
                        className="flex"
                        animate={{ x: `-${currentIndex * (100 / visibleItems)}%` }}
                        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                    >
                        {NEW_ARRIVALS.map((product, index) => (
                            <div
                                key={product.id}
                                className={cn(
                                    "flex-shrink-0 relative",
                                    "border-r border-neutral-100"
                                )}
                                style={{ width: `${100 / visibleItems}%` }}
                            >
                                <div className="flex flex-col md:flex-row h-full min-h-[400px] items-center p-8 md:p-16 gap-8 md:gap-12 group hover:bg-neutral-50/30 transition-colors duration-500">

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
                                    <div className="w-full md:w-1/2 flex flex-col justify-center text-left h-full">
                                        <div className="mb-auto mt-4">
                                            <h3 className="text-xl md:text-2xl font-normal text-neutral-800 mb-1 tracking-tight">
                                                {product.name}
                                            </h3>
                                            <p className="text-lg md:text-xl text-neutral-800 font-normal">
                                                {product.currency} {product.price.toFixed(2)}
                                            </p>
                                        </div>

                                        <div className="mt-8 md:mt-auto">
                                            <p className="text-neutral-500 text-sm leading-relaxed max-w-[280px]">
                                                {product.description}
                                            </p>
                                            <Link href={`/product/${product.id}`} className="inline-block mt-6 px-6 py-2 border border-black text-black text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors duration-300">
                                                Buy Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Navigation centered bottom, matching the image's beige circular buttons */}
                <div className="flex justify-center items-center gap-4 mt-16">
                    <button
                        onClick={prevSlide}
                        className="w-12 h-12 rounded-full bg-[#EAEAEA] flex items-center justify-center hover:bg-[#D4D4D4] transition-colors"
                        aria-label="Previous"
                    >
                        <ChevronLeft className="w-5 h-5 text-neutral-600" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="w-12 h-12 rounded-full bg-[#EAEAEA] flex items-center justify-center hover:bg-[#D4D4D4] transition-colors"
                        aria-label="Next"
                    >
                        <ChevronRight className="w-5 h-5 text-neutral-600" />
                    </button>
                </div>
            </div>
        </section>
    );
}
