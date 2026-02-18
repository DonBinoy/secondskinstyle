'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';

export default function LifestyleGrid() {
    return (
        <section className="bg-white py-32 px-4 md:px-10 max-w-[1920px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 auto-rows-[300px] md:auto-rows-[400px]">

                {/* Large Video Item - Spans 8 cols */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="md:col-span-8 row-span-1 md:row-span-2 relative rounded-3xl overflow-hidden group"
                >
                    <video
                        src="/video/product.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute bottom-8 left-8 text-white">
                        <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 mb-4 w-fit">
                            <Play className="w-3 h-3 fill-current" /> Campaign Film
                        </span>
                        <h3 className="text-4xl md:text-6xl font-semibold tracking-tighter">Movement<br />Redefined</h3>
                    </div>
                </motion.div>

                {/* Vertical Image - Spans 4 cols */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="md:col-span-4 row-span-1 md:row-span-2 relative rounded-3xl overflow-hidden bg-neutral-100 group"
                >
                    <Image
                        src="/image/product/product1.jpg"
                        alt="Lifestyle Shot 1"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h3 className="text-white text-3xl font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center mix-blend-difference">
                            Urban<br />Utility
                        </h3>
                    </div>
                </motion.div>

                {/* Text Block - Spans 4 cols */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="md:col-span-4 bg-neutral-50 rounded-3xl p-10 flex flex-col justify-between"
                >
                    <span className="text-6xl font-bold text-neutral-200">01</span>
                    <p className="text-lg font-medium leading-relaxed italic text-neutral-800">
                        "Designed for the modern athlete who demands both aesthetic precision and technical superiority."
                    </p>
                </motion.div>

                {/* Horizontal Image - Spans 8 cols */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="md:col-span-8 relative rounded-3xl overflow-hidden bg-neutral-100 group"
                >
                    <Image
                        src="/image/product/product2.jpg"
                        alt="Lifestyle Shot 2"
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-8 right-8">
                        <span className="bg-black text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">
                            Limited Edition
                        </span>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
