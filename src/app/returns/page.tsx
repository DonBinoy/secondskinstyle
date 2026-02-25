'use client';

import InfoLayout from '@/components/InfoLayout';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Mail, Hash, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function ReturnsPage() {
    const { t } = useLanguage();

    return (
        <InfoLayout
            title={t('info.returns.title')}
            subtitle="POLICIES / REVERSE"
            watermark="REVERSE"
        >
            <div className="flex flex-col gap-40">
                {/* Headline */}
                <div className="max-w-3xl">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight uppercase leading-[0.85] italic mb-12">
                        Your satisfaction is our primary metric.
                    </h2>
                    <div className="h-[2px] w-24 bg-[#ccff00]" />
                </div>

                {/* High-Impact Policy Row */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        t('info.returns.policy1'),
                        t('info.returns.policy2'),
                        t('info.returns.policy3'),
                        t('info.returns.policy4'),
                    ].map((policy, i) => (
                        <div key={i} className="flex flex-col gap-6 p-10 bg-neutral-50 border border-neutral-100 hover:border-black transition-all duration-500 group">
                            <span className="text-6xl font-black text-neutral-200 group-hover:text-black transition-colors font-mono italic">0{i + 1}</span>
                            <p className="text-xl font-bold tracking-tight text-neutral-900 uppercase leading-[1.1]">
                                {policy}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Timeline Process */}
                <section className="flex flex-col gap-32">
                    <div className="flex justify-between items-end border-b border-black pb-12">
                        <h3 className="text-4xl md:text-[6rem] font-bold tracking-tighter uppercase leading-none">The Path<br />Back</h3>
                        <div className="flex flex-col items-end gap-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral-400">Status</span>
                            <span className="text-sm font-bold uppercase tracking-widest text-black">Active Process</span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-12 lg:gap-24 relative">
                        {[
                            { step: t('info.returns.registerStep1'), icon: Mail, label: "01 / INITIATE" },
                            { step: t('info.returns.registerStep2'), icon: Hash, label: "02 / IDENTIFY" },
                            { step: t('info.returns.registerStep3'), icon: MessageSquare, label: "03 / SPECIFY" },
                            { step: t('info.returns.registerNote'), icon: ArrowRight, label: "04 / RESPOND", full: true }
                        ].map((item, i) => (
                            <div key={i} className={cn("flex-1 group relative", item.full && "md:flex-[1.5]")}>
                                <div className="absolute top-10 left-0 w-full h-[1px] bg-neutral-100 -z-10 group-hover:bg-black transition-colors hidden md:block" />
                                <div className="flex flex-col gap-10">
                                    <div className="w-20 h-20 rounded-full bg-white border border-neutral-100 flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-500 z-10 shadow-sm">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400 group-hover:text-black transition-colors">{item.label}</span>
                                        <p className={cn("text-xl lg:text-3xl font-bold tracking-tight text-neutral-900 uppercase leading-[0.9]", item.full && "italic text-neutral-400 group-hover:text-black transition-colors")}>
                                            {item.step}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </InfoLayout>
    );
}
