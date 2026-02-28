'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductImageSliderProps {
    images: string | string[];
    alt: string;
    fill?: boolean;
    className?: string;
    sizes?: string;
    priority?: boolean;
    showArrows?: boolean;
}

export default function ProductImageSlider({
    images,
    alt,
    fill = true,
    className,
    sizes,
    priority = false,
    showArrows = true
}: ProductImageSliderProps) {
    const imageList = Array.isArray(images) ? images : [images];
    const [currentIndex, setCurrentIndex] = useState(0);

    const hasMultiple = imageList.length > 1;

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % imageList.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
    };

    return (
        <div className={cn("relative w-full h-full group/slider", className)}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full p-2"
                >
                    <Image
                        src={imageList[currentIndex]}
                        alt={`${alt} - Image ${currentIndex + 1}`}
                        fill={fill}
                        sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                        className="object-contain transition-all duration-700 ease-out"
                        priority={priority}
                    />
                </motion.div>
            </AnimatePresence>

            {hasMultiple && showArrows && (
                <>
                    {/* Minimalist Navigation Arrows */}
                    <button
                        onClick={prevImage}
                        className="absolute left-1 top-1/2 -translate-y-1/2 z-30 p-2 text-black transition-all hover:scale-110 active:scale-95 group/arrow"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="w-6 h-6 stroke-[1.5px]" />
                        <div className="absolute inset-0 bg-black/5 rounded-full scale-0 group-hover/arrow:scale-100 transition-transform duration-300" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-1 top-1/2 -translate-y-1/2 z-30 p-2 text-black transition-all hover:scale-110 active:scale-95 group/arrow"
                        aria-label="Next image"
                    >
                        <ChevronRight className="w-6 h-6 stroke-[1.5px]" />
                        <div className="absolute inset-0 bg-black/5 rounded-full scale-0 group-hover/arrow:scale-100 transition-transform duration-300" />
                    </button>
                </>
            )}
        </div>
    );
}
