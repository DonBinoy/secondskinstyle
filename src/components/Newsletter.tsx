'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Newsletter() {
    return (
        <section className="w-full py-24 bg-zinc-900 border-t border-white/10 overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6"
                >
                    Join the Community
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-zinc-400 text-lg mb-10 font-light"
                >
                    Unlock exclusive content, early access to drops, and 10% off your first order.
                </motion.p>

                <motion.form
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto"
                >
                    <input
                        type="email"
                        placeholder="ENTER YOUR EMAIL"
                        className="flex-1 bg-transparent border-b border-zinc-700 text-white py-4 px-2 focus:outline-none focus:border-white transition-colors placeholder:text-zinc-600 font-bold tracking-wider text-sm uppercase"
                    />
                    <button className="bg-white text-black px-8 py-4 font-black uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 group">
                        Sign Up
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.form>
            </div>
        </section>
    );
}
