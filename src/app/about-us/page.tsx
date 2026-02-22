'use client';

import { motion } from 'framer-motion';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrandStory from "@/components/BrandStory";
import Editorial from "@/components/Editorial";
import Newsletter from "@/components/Newsletter";
import Marquee from "@/components/Marquee";
import { ArrowDown, Cpu, Zap, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function AboutUs() {
    return (
        <main className="flex flex-col min-h-screen bg-black text-white selection:bg-white selection:text-black">
            <Navbar solid={false} />

            {/* Cinematic Hero Section */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover grayscale opacity-40"
                    >
                        <source src="/video/sports.mp4" type="video/mp4" />
                    </video>
                </div>

                <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="text-zinc-500 font-bold tracking-[0.4em] uppercase mb-8 block text-xs md:text-sm">
                            Behind the skin
                        </span>
                        <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.85] text-white uppercase italic">
                            Absolute <br /> Evolution
                        </h1>
                        <p className="mt-12 text-zinc-400 text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed">
                            We don't just design apparel. We engineer the bridge between human potential and physical reality.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                    >
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">Explore our DNA</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-800 to-transparent" />
                    </motion.div>
                </div>
            </section>

            {/* The Philosophy Grid */}
            <section className="py-32 px-6 md:px-12 bg-zinc-950 border-y border-white/5">
                <div className="max-w-[1920px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
                        {[
                            {
                                icon: Cpu,
                                title: "Engineering First",
                                desc: "Every garment begins in the lab, not the studio. We prioritize molecular structure over trend cycles."
                            },
                            {
                                icon: Zap,
                                title: "Zero Distortion",
                                desc: "True performance is the absence of distraction. Our SecondSkin™ tech vanishes when the intensity rises."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Obsessive Quality",
                                desc: "Durability is a core performance metric. Our gear is built to outlast your strongest sessions."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col gap-6"
                            >
                                <div className="p-4 w-fit bg-zinc-900 rounded-2xl border border-white/10">
                                    <item.icon className="w-6 h-6 text-zinc-400" />
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-white">{item.title}</h3>
                                <p className="text-zinc-500 leading-relaxed font-light">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Immersive Brand Story Integration */}
            <div className="bg-zinc-950">
                <BrandStory />
            </div>

            <Editorial />

            <Marquee />

            <Newsletter />
            <Footer />
        </main>
    );
}
