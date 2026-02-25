'use client';

import InfoLayout from '@/components/InfoLayout';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

export default function ContactPage() {
    const { t } = useLanguage();

    return (
        <InfoLayout
            title={t('info.contact.title')}
            subtitle="ASSISTANCE / REACH OUT"
            watermark="ASSIST"
        >
            <div className="flex flex-col gap-32">
                <div className="flex flex-col gap-8">
                    <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter opacity-10 leading-none">COMMUNICATE</h2>
                    <p className="text-3xl md:text-5xl font-medium tracking-tight text-neutral-900 leading-tight">
                        Our specialized concierge team is ready to assist with high-performance precision.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-32">
                    <section className="flex flex-col gap-20">
                        <div className="flex flex-col gap-6 group">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400 group-hover:text-black transition-colors">
                                {t('info.contact.location')}
                            </h2>
                            <p className="text-3xl font-bold tracking-tight text-neutral-900 leading-tight uppercase">
                                {t('info.contact.locationDesc')}
                            </p>
                        </div>

                        <div className="flex flex-col gap-6 group">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400 group-hover:text-black transition-colors">
                                {t('info.contact.email')}
                            </h2>
                            <a
                                href="mailto:support@secondskinstyle.com"
                                className="text-3xl md:text-5xl font-black tracking-tight text-black hover:opacity-50 transition-opacity break-all underline decoration-4 underline-offset-12"
                            >
                                support@secondskinstyle.com
                            </a>
                        </div>
                    </section>

                    <section className="flex flex-col justify-end p-16 bg-neutral-900 text-white rounded-sm min-h-[400px] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8">
                            <ArrowUpRight className="w-12 h-12 text-neutral-800 group-hover:text-[#ccff00] transition-colors duration-500" />
                        </div>
                        <div className="flex flex-col gap-8 relative z-10">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500">
                                {t('info.contact.responseTime')}
                            </h2>
                            <p className="text-4xl md:text-5xl font-bold tracking-tight leading-[0.9]">
                                {t('info.contact.responseDesc')}
                            </p>
                            <div className="h-2 w-24 bg-[#ccff00] shadow-[0_0_30px_#ccff0080]" />
                        </div>

                        {/* Background subtle text */}
                        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -rotate-90 select-none pointer-events-none text-white opacity-[0.02] font-black text-[150px] leading-none">
                            24/48
                        </div>
                    </section>
                </div>
            </div>
        </InfoLayout>
    );
}
