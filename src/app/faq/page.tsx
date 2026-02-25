'use client';

import InfoLayout from '@/components/InfoLayout';
import { useLanguage } from '@/context/LanguageContext';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function FAQPage() {
    const { t } = useLanguage();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        { q: t('info.faq.q1'), a: t('info.faq.a1') },
        { q: t('info.faq.q2'), a: t('info.faq.a2') },
        { q: t('info.faq.q3'), a: t('info.faq.a3') },
        { q: t('info.faq.q4'), a: t('info.faq.a4') },
        { q: t('info.faq.q5'), a: t('info.faq.a5') },
    ];

    return (
        <InfoLayout
            title={t('info.faq.title')}
            subtitle="GUIDANCE / KNOWLEDGE"
            watermark="QUERIES"
        >
            <div className="flex flex-col gap-4 mb-32">
                <p className="text-4xl md:text-5xl font-medium tracking-tighter text-neutral-900 leading-tight border-b border-black pb-20 mb-20 max-w-2xl">
                    Find clarity in the details of performance.
                </p>

                <div className="flex flex-col border-t border-neutral-100">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border-b border-neutral-100 overflow-hidden group">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full py-12 flex items-center justify-between text-left transition-all duration-500 hover:bg-neutral-50/50 px-4 md:px-8"
                            >
                                <div className="flex items-start gap-12">
                                    <span className="text-[10px] font-black text-neutral-200 mt-2 font-mono group-hover:text-black transition-colors">{i < 9 ? `0${i + 1}` : i + 1}</span>
                                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 uppercase leading-[1]">
                                        {faq.q}
                                    </h3>
                                </div>
                                <motion.div
                                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                                    className="p-3 rounded-full border border-neutral-100 group-hover:border-black transition-all"
                                >
                                    <Plus className={cn("w-4 h-4 transition-all", openIndex === i ? "hidden" : "block")} />
                                    <Minus className={cn("w-4 h-4 transition-all", openIndex === i ? "block" : "hidden")} />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <div className="pb-16 pl-16 md:pl-28 pr-8 max-w-3xl">
                                            <p className="text-xl md:text-2xl text-neutral-500 leading-relaxed font-light italic border-l-2 border-[#ccff00] pl-8">
                                                "{faq.a}"
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Ultra-high-impact Contact CTA */}
                <div className="mt-40 relative group overflow-hidden bg-black p-20 md:p-32">
                    <div className="absolute top-0 right-0 p-12 opacity-10 font-black text-[150px] text-white italic select-none pointer-events-none uppercase">SUPPORT</div>
                    <div className="relative z-10 flex flex-col md:flex-row items-end justify-between gap-16">
                        <div className="flex flex-col gap-6">
                            <h4 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-[0.85] uppercase">
                                Still seeking<br />answers?
                            </h4>
                            <p className="text-neutral-400 text-xs font-black uppercase tracking-[0.4em]">Our support specialists are standing by.</p>
                        </div>
                        <a href="/contact" className="group flex items-center gap-8 bg-white text-black px-12 py-8 font-black uppercase tracking-widest text-[10px] hover:bg-[#ccff00] transition-colors relative overflow-hidden">
                            <span>Connect with specialized agents</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                        </a>
                    </div>
                </div>
            </div>
        </InfoLayout>
    );
}
