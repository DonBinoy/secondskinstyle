'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Newsletter() {
    return (
        <section className="w-full py-12 md:py-16 bg-neutral-950 text-white border-t border-neutral-900">
            <div className="max-w-[1920px] mx-auto px-4 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">

                {/* Left Side: Compact Header */}
                <div className="w-full md:w-auto text-center md:text-left">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white mb-2"
                    >
                        New Drops
                    </motion.h2>
                    <p className="text-neutral-500 text-sm font-medium tracking-wide uppercase">
                        Sign up for early access to exclusive launches.
                    </p>
                </div>

                {/* Right Side: Simple Inline Form */}
                <div className="w-full md:flex-1 max-w-xl">
                    <motion.form
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="relative flex items-center"
                    >
                        <input
                            type="email"
                            placeholder="ENTER YOUR EMAIL"
                            className="w-full bg-transparent border-b border-neutral-800 text-white py-3 pr-12 focus:outline-none focus:border-white transition-colors placeholder:text-neutral-600 font-bold tracking-wider text-sm uppercase"
                        />
                        <button className="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:text-neutral-400 transition-colors uppercase font-bold tracking-widest text-xs flex items-center gap-2 group">
                            Subscribe
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
