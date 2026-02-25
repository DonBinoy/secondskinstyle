'use client';

import InfoLayout from '@/components/InfoLayout';
import { useLanguage } from '@/context/LanguageContext';
import { Globe, Package, Zap, BarChart3 } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function DeliveryPage() {
    const { t } = useLanguage();

    return (
        <InfoLayout
            title={t('info.delivery.title')}
            subtitle="LOGISTICS / GLOBAL"
            watermark="SHIPPING"
        >
            <div className="flex flex-col gap-40">
                {/* Visual Intro */}
                <div className="relative w-full aspect-[21/9] bg-neutral-900 overflow-hidden group">
                    <Image
                        src="/image/abstract_logistic_texture.png"
                        alt="Logistics"
                        fill
                        className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-[3s] grayscale"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-12 text-white bg-gradient-to-t from-black/80 to-transparent">
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tight uppercase italic leading-[0.8] mb-4">
                            Movement<br />Redefined
                        </h2>
                        <p className="text-zinc-400 text-xs font-black uppercase tracking-[0.5em]">Global Logistics Network</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-20">
                    {/* Left Column: Key Stats */}
                    <div className="lg:col-span-4 flex flex-col gap-16">
                        <section className="flex flex-col gap-6">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#ccff00] bg-black px-3 py-1 w-fit">
                                {t('info.delivery.processing')}
                            </h2>
                            <p className="text-3xl font-bold tracking-tight text-neutral-900 uppercase">
                                {t('info.delivery.processingDesc')}
                            </p>
                        </section>

                        <section className="flex flex-col gap-6">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral-400">
                                {t('info.delivery.fees')}
                            </h2>
                            <p className="text-xl font-medium tracking-tight text-neutral-500 italic max-w-xs">
                                "{t('info.delivery.feesDesc')}"
                            </p>
                        </section>
                    </div>

                    {/* Right Column: Cards */}
                    <div className="lg:col-span-8 grid md:grid-cols-2 gap-8">
                        {[
                            {
                                label: t('info.delivery.shippingTimes'),
                                value: <div className="flex flex-col gap-4 text-2xl font-bold tracking-tight"><span>{t('info.delivery.domestic')}</span><span className="opacity-30">{t('info.delivery.international')}</span></div>,
                                icon: Zap,
                                bg: "bg-neutral-50"
                            },
                            {
                                label: t('info.delivery.tracking'),
                                value: t('info.delivery.trackingDesc'),
                                icon: Package,
                                bg: "bg-white border border-neutral-100"
                            },
                            {
                                label: "Global Reach",
                                value: "Shipping to over 150 nations with carbon-neutral priority logistics.",
                                icon: Globe,
                                bg: "bg-neutral-50"
                            },
                            {
                                label: "Priority Priority",
                                value: "Tracked, insured, and handled with extreme care.",
                                icon: BarChart3,
                                bg: "bg-white border border-neutral-100"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className={cn("p-12 flex flex-col gap-10 group transition-all duration-500", item.bg)}
                            >
                                <item.icon className="w-10 h-10 text-neutral-200 group-hover:text-black transition-colors duration-500" />
                                <div className="flex flex-col gap-4">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400">
                                        {item.label}
                                    </h3>
                                    <div className="text-2xl font-bold tracking-tight text-neutral-900 leading-[1.1] uppercase">
                                        {item.value}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Aesthetic Detail Row */}
                <div className="mt-40 pt-20 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-20 opacity-50">
                    <div className="flex flex-col gap-2">
                        <span className="text-[8px] font-black uppercase tracking-widest">Protocol</span>
                        <span className="text-xs font-bold uppercase tracking-[0.3em]">SECURE_TRANSIT_v2.0</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-px w-32 bg-neutral-200" />
                        <span className="text-[8px] font-black uppercase tracking-widest font-mono">ENCRYPTED_SHIPMENTS</span>
                    </div>
                    <div className="flex flex-col items-end gap-2 text-right">
                        <span className="text-[8px] font-black uppercase tracking-widest">Status</span>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-[0.3em]">Operational</span>
                        </div>
                    </div>
                </div>
            </div>
        </InfoLayout>
    );
}
