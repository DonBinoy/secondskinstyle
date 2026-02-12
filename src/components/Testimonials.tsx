'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
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
        review: "17ª Edición 2025 | Finisher Media Maratón Usé SecondSkinStyle en mi media maratón y fue como tener un compañero de rendimiento. El tank top es ligero, transpirable y no se pega al cuerpo — incluso después de 21 km. Sin distracciones, solo enfoque y ritmo. SecondSkinStyle: Confiable el día de la carrera.",
        image: '/image/review/review2.jpg', // Assuming available or fallback to review3
        rating: 5
    },
    {
        id: 3,
        name: 'Eline',
        role: 'Madrid',
        review: "I wore the SecondSkinStyle athletic top for my recent marathon, and it exceeded all expectations. — Eline, Distance Runner",
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
    return (
        <section className="w-full py-32 bg-white text-black overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-neutral-100 via-white to-white" />

            <div className="max-w-[1920px] mx-auto px-4 md:px-12 relative z-10">
                <div className="mb-32 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-black mb-6"
                    >
                        Athlete <span className="text-neutral-400">Stories</span>
                    </motion.h2>
                    <p className="text-black/60 font-light text-lg tracking-wide max-w-2xl mx-auto">
                        Real feedback from athletes who push their limits in SecondSkinStyle.
                    </p>
                </div>

                <div className="flex flex-col gap-32">
                    {REVIEWS.map((review, index) => (
                        <ReviewRow key={review.id} review={review} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ReviewRow({ review, index }: { review: any, index: number }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
                "flex flex-col md:flex-row gap-8 md:gap-24 items-center",
                !isEven && "md:flex-row-reverse"
            )}
        >
            {/* Image Side */}
            <div className="w-full md:w-3/5 relative group">
                <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-neutral-100 border border-black/5">
                    <Image
                        src={review.image}
                        alt={review.name}
                        fill
                        className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                {/* Decorative Elements */}
                <div className={cn(
                    "hidden md:block absolute -top-4 -bottom-4 w-px bg-black/10",
                    isEven ? "-right-12" : "-left-12"
                )} />
            </div>

            {/* Content Side */}
            <div className="w-full md:w-2/5 flex flex-col justify-center">
                <Quote className="w-12 h-12 text-black/20 mb-8" />

                <h3 className="text-3xl md:text-4xl font-light leading-tight text-black/90 mb-8 italic">
                    "{review.review}"
                </h3>

                <div className="flex flex-col gap-4 border-l-2 border-black/10 pl-6">
                    <div>
                        <h4 className="text-xl font-bold uppercase tracking-wider text-black">
                            {review.name}
                        </h4>
                        <p className="text-sm text-neutral-500 font-bold uppercase tracking-widest mt-1">
                            {review.role}
                        </p>
                    </div>

                    <div className="flex gap-1 text-black">
                        {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-black" />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
