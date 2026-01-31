'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const CATEGORIES = [
    {
        id: 1,
        name: 'Women',
        image: '/image/women.png',
        link: '/women',
        description: 'Empower Your Movement'
    },
    {
        id: 2,
        name: 'Men',
        image: '/image/man.png',
        link: '/men',
        description: 'Forged for Performance'
    },
    {
        id: 3,
        name: 'Accessories',
        image: '/image/bag.png', // Keep external if no local image
        link: '/accessories',
        description: 'Essential Gear'
    },
];

export default function CategoryGrid() {
    return (
        <section className="w-full py-0 bg-white border-t border-black">
            <div className="py-12 px-6 md:px-12 border-b border-black flex flex-col items-center justify-center text-center">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black mb-2">
                    Shop By Category
                </h2>
                <div className="h-1 w-20 bg-black my-4" />
                <p className="text-neutral-500 text-sm font-bold tracking-[0.2em] uppercase">
                    Define Your Look
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 w-full min-h-[90vh]">
                {CATEGORIES.map((cat, index) => (
                    <Link href={cat.link} key={cat.id} className="relative group overflow-hidden block border-r border-black last:border-r-0 border-b md:border-b-0">
                        {/* Image Layer */}
                        <div className="absolute inset-0 z-0">
                            <Image
                                src={cat.image}
                                alt={cat.name}
                                fill
                                className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                        </div>

                        {/* Content Overlay */}
                        <div className="relative z-10 w-full h-full flex flex-col justify-between p-8 md:p-12">
                            {/* Top Content */}
                            <div className="flex justify-between items-start opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                <span className="text-white text-xs font-bold tracking-[0.2em] uppercase border border-white/30 px-3 py-1 backdrop-blur-sm">
                                    0{index + 1}
                                </span>
                                <ArrowUpRight className="text-white w-6 h-6" />
                            </div>

                            {/* Bottom Content */}
                            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-5xl md:text-7xl font-oswald font-bold text-white uppercase tracking-tighter mix-blend-difference mb-2">
                                    {cat.name}
                                </h3>
                                <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500">
                                    <p className="text-white/90 font-light tracking-wide text-lg pt-4 border-t border-white/50">
                                        {cat.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Hover Overlay Gradient */}
                        <div className="absolute inset-0 z-[5] bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    </Link>
                ))}
            </div>
        </section>
    );
}
