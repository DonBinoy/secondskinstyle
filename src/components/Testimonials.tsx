'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const REVIEWS = [
    {
        id: 1,
        name: 'Frank',
        role: 'New York',
        review: "Thirsty Grapes Team Our SecondSkinStyle jerseys delivered! Lightweight, breathable, and bold — kept us cool and looking sharp on and off the field. Total win.",
        image: '/image/review/review1.jpg',
        rating: 5
    },
    {
        id: 2,
        name: 'Alvaro',
        role: 'Spain',
        review: "17ª Edición 2025 | Finisher Media Maratón Usé SecondSkinStyle en mi media maratón y fue como tener un compañero de rendimiento. El tank top es ligero, transpirable y no se pega al cuerpo — incluso después de 21 km. Sin distracciones, solo enfoque y ritmo.",
        image: '/image/review/review2.jpg',
        rating: 5
    },
    {
        id: 3,
        name: 'Eline',
        role: 'Madrid',
        review: "I wore the SecondSkinStyle athletic top for my recent marathon, and it exceeded all expectations.",
        image: '/image/review/review3.jpg',
        rating: 5
    },
    {
        id: 4,
        name: 'National Team',
        role: 'India',
        review: "Winning mindset meets performance wear. SecondSkinStyle jerseys deliver premium fabric, athletic fit, and unbeatable comfort — built for champions!",
        image: '/image/review/review4.jpg',
        rating: 5
    },
    {
        id: 5,
        name: 'Bre',
        role: 'Texas',
        review: "Excellent fabric with premium quality and vibrant DTF prints. I highly recommend SecondSkinStyle for their outstanding craftsmanship and service!",
        image: '/image/review/review5.jpg',
        rating: 5
    }
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = useCallback((newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = REVIEWS.length - 1;
            if (nextIndex >= REVIEWS.length) nextIndex = 0;
            return nextIndex;
        });
    }, []);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const timer = setInterval(() => {
            paginate(1);
        }, 8000); // Slower interval for premium feel
        return () => clearInterval(timer);
    }, [isAutoPlaying, paginate]);

    const activeReview = REVIEWS[currentIndex];

    return (
        <section className="w-full py-24 bg-stone-50 text-black overflow-hidden relative">
            <div className="max-w-[1920px] mx-auto px-4 md:px-12 relative z-10">
                <div className="mb-12 md:mb-20 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-8xl font-semibold tracking-tighter text-black mb-4"
                    >
                        Athlete <span className="text-neutral-400">Stories</span>
                    </motion.h2>
                </div>

                <div
                    className="max-w-5xl mx-auto py-8 md:py-16"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    {/* IMAGE STAGE - Taller Aspect Ratio */}
                    <div className="relative w-full aspect-[4/3] md:aspect-[16/9] mb-2 group rounded-2xl overflow-hidden shadow-2xl bg-neutral-100">
                        <AnimatePresence initial={false} custom={direction} mode="popLayout">
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.4 }
                                }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <Image
                                    src={activeReview.image}
                                    alt={activeReview.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                {/* Bottom Bar Overlay - Metadata ON the photo */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-between text-white">
                                    <div>
                                        <div className="flex gap-1 mb-2">
                                            {[...Array(activeReview.rating)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-white text-white" />
                                            ))}
                                        </div>
                                        <h4 className="text-lg font-bold uppercase tracking-wider text-white">
                                            {activeReview.name}
                                        </h4>
                                        <p className="text-xs text-white/80 font-bold uppercase tracking-widest mt-1">
                                            {activeReview.role}
                                        </p>
                                    </div>
                                    <Quote className="w-8 h-8 text-white/40" />
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Buttons - On sides of Image */}
                        <button
                            className="absolute top-1/2 -translate-y-1/2 left-4 z-20 p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100"
                            onClick={() => paginate(-1)}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            className="absolute top-1/2 -translate-y-1/2 right-4 z-20 p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100"
                            onClick={() => paginate(1)}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    {/* TEXT CONTENT - Below Image, Smaller & Elegant */}
                    <div className="relative min-h-[120px] mb-8 text-center px-4 md:px-20">
                        <AnimatePresence initial={false} custom={direction} mode="popLayout">
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={{
                                    enter: { opacity: 0, y: 20 },
                                    center: { opacity: 1, y: 0 },
                                    exit: { opacity: 0, y: -20 }
                                }}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <p className="text-xl md:text-2xl font-normal leading-relaxed text-neutral-800">
                                    "{activeReview.review}"
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Simple Indicators */}
                    <div className="flex justify-center items-center gap-3 z-20">
                        {REVIEWS.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setDirection(idx > currentIndex ? 1 : -1);
                                    setCurrentIndex(idx);
                                }}
                                className={cn(
                                    "h-1.5 rounded-full transition-all duration-300",
                                    idx === currentIndex
                                        ? "bg-black w-8"
                                        : "bg-neutral-300 w-1.5 hover:bg-neutral-400"
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
