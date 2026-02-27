'use client';

import InfoLayout from '@/components/InfoLayout';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight } from 'lucide-react';

export default function CustomOrdersPage() {
    const { t } = useLanguage();

    return (
        <InfoLayout
            title={t('info.custom.title')}
            subtitle="BESPOKE / IDENTITY"
            watermark="TEAMS"
        >
            <div className="flex flex-col gap-32">
                <div className="flex flex-col gap-16">
                    <h2 className="text-6xl md:text-9xl font-black tracking-tighter italic opacity-5 leading-none">UNIFORMITY</h2>

                    <div className="flex flex-col gap-10">
                        <p className="text-4xl md:text-7xl font-bold tracking-tight text-neutral-900 leading-[0.85] uppercase italic">
                            {t('info.custom.desc1')}
                        </p>
                        <p className="text-xl md:text-2xl text-neutral-500 font-light leading-relaxed max-w-2xl border-l-2 border-neutral-100 pl-8">
                            {t('info.custom.desc2')}
                        </p>
                    </div>
                </div>

                <div className="mt-20 pt-20 border-t border-neutral-100 flex flex-col gap-10">
                    <div className="flex items-center gap-6">
                        <div className="h-px w-20 bg-neutral-900" />
                        <p className="text-xs font-black uppercase tracking-[0.4em] text-neutral-400">
                            {t('info.custom.contact')}
                        </p>
                    </div>

                    <a
                        href={`mailto:${t('info.custom.email')}`}
                        className="group flex flex-row items-center gap-3 sm:gap-6 md:gap-12 w-fit max-w-full"
                    >
                        <span className="text-[5.5vw] sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-black hover:bg-black hover:text-white transition-all duration-500 px-2 sm:px-4 py-2 whitespace-nowrap italic shrink min-w-0">
                            {t('info.custom.email')}
                        </span>
                        <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full border border-black flex-shrink-0 flex items-center justify-center group-hover:bg-[#ccff00] group-hover:border-[#ccff00] transition-all duration-500">
                            <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6" />
                        </div>
                    </a>
                </div>

                {/* Aesthetic Detail Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {['Team Identity', 'Premium Quality', 'Bulk Advantage', 'Fast Lead-Times'].map((detail, i) => (
                        <div key={i} className="flex flex-col gap-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#ccff00] bg-black px-2 py-0.5 w-fit">Benefit {i + 1}</span>
                            <span className="text-lg font-bold uppercase tracking-tight">{detail}</span>
                        </div>
                    ))}
                </div>
            </div>
        </InfoLayout>
    );
}
