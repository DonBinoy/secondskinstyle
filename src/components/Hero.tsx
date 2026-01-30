'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import MagneticButton from './ui/MagneticButton';

export default function Hero() {
    return (
        <section className="relative w-full h-[90vh] overflow-hidden bg-black">
            {/* ... (Video Background code remains the same) ... */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="object-cover w-full h-full opacity-90"
                >
                    <source src="/video/sports.mp4" type="video/mp4" />
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
                        New Collection
                    </h2>
                    <h1 className="mb-8 text-5xl font-black tracking-tight text-white uppercase md:text-7xl lg:text-8xl">
                        Unleash <br /> Your Power
                    </h1>
                    <div className="flex gap-4">
                        <MagneticButton className="px-8 py-4 text-sm font-bold tracking-wider text-black uppercase bg-white hover:bg-neutral-200">
                            Shop Women
                        </MagneticButton>
                        <MagneticButton className="px-8 py-4 text-sm font-bold tracking-wider text-white uppercase border border-white hover:bg-white hover:text-black">
                            Shop Men
                        </MagneticButton>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
