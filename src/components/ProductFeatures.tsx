'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Truck, ShieldCheck, RefreshCw, Layers, Wind, Droplets } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ProductFeatures() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('usage');

    const TABS = [
        { id: 'usage', label: t('features.tabs.usage') },
        { id: 'details', label: t('features.tabs.details') },
        { id: 'care', label: t('features.tabs.care') },
        { id: 'fabric', label: t('features.tabs.fabric') },
        { id: 'fit', label: t('features.tabs.fit') },
    ];

    return (
        <section className="bg-[#171717] text-white py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
            <div className="max-w-[1920px] mx-auto">

                {/* Header */}
                <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-center mb-24">{t('features.title')}</h2>

                <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">

                    {/* Left: Navigation (Vertical Tabs) */}
                    <div className="lg:w-1/4 flex flex-col gap-6">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "text-left text-lg md:text-xl font-bold uppercase tracking-tight transition-colors duration-300 py-2",
                                    activeTab === tab.id ? "text-white" : "text-neutral-600 hover:text-neutral-400"
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Right: Content Area */}
                    <div className="lg:w-3/4 min-h-[400px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="h-full"
                            >
                                {activeTab === 'usage' && <UsageContent />}
                                {activeTab === 'details' && <DetailsContent />}
                                {activeTab === 'care' && <CareContent />}
                                {activeTab === 'fabric' && <FabricContent />}
                                {activeTab === 'fit' && <FitContent />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}

// --- Content Components ---

function UsageContent() {
    const { t } = useLanguage();
    return (
        <div className="space-y-16">

            {/* Race Type Progress Bar */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#ccff00]">{t('features.raceType')}</h3>
                <div className="relative h-1 bg-neutral-800 w-full rounded-full overflow-hidden">
                    {/* The bar fills up to "Full Marathon" range */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '75%' }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="absolute top-0 left-0 h-full bg-[#ccff00]"
                    />
                </div>
                <div className="flex justify-between text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
                    <span>{t('features.usageLabels.middleDistance')}</span>
                    <span>5km – 10km</span>
                    <span>{t('features.usageLabels.halfMarathon')}</span>
                    <span className="text-right">{t('features.usageLabels.ultra')}</span>
                </div>
            </div>

            {/* Terrain Progress Bar */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#ccff00]">{t('features.terrain')}</h3>
                <div className="relative h-1 bg-neutral-800 w-full rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '60%' }}
                        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                        className="absolute top-0 left-0 h-full bg-[#ccff00]"
                    />
                </div>
                <div className="flex justify-between text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
                    <span>{t('features.terrainLabels.road')}</span>
                    <span className="text-center">{t('features.terrainLabels.track')}</span>
                    <span className="text-right">{t('features.terrainLabels.trail')}</span>
                </div>
            </div>

            <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800">
                    <Wind className="w-8 h-8 text-[#ccff00] mb-4" />
                    <h4 className="font-bold uppercase tracking-wider mb-2">{t('features.highlights.aerodynamic')}</h4>
                    <p className="text-neutral-400 text-sm leading-relaxed">{t('features.highlights.aerodynamicDesc')}</p>
                </div>
                <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800">
                    <Droplets className="w-8 h-8 text-[#ccff00] mb-4" />
                    <h4 className="font-bold uppercase tracking-wider mb-2">{t('features.highlights.moisture')}</h4>
                    <p className="text-neutral-400 text-sm leading-relaxed">{t('features.highlights.moistureDesc')}</p>
                </div>
            </div>
        </div>
    );
}

function DetailsContent() {
    const { t } = useLanguage();
    return (
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {[
                { label: t('features.specs.weight'), value: "85g (Size M)" },
                { label: t('features.specs.material'), value: t('features.specs.materialValue') },
                { label: t('features.specs.origin'), value: t('features.specs.originValue') },
                { label: t('features.specs.technology'), value: "VoltMesh™ Active Cooling" },
                { label: t('features.specs.seams'), value: t('features.specs.seamsValue') },
                { label: t('features.specs.visibility'), value: t('features.specs.visibilityValue') }
            ].map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-neutral-800 pb-4 group hover:border-[#ccff00]/50 transition-colors">
                    <span className="text-neutral-500 font-bold uppercase tracking-widest text-xs">{item.label}</span>
                    <span className="text-white font-medium">{item.value}</span>
                </div>
            ))}
        </div>
    );
}

function CareContent() {
    const { t } = useLanguage();
    return (
        <div className="space-y-8">
            <p className="text-xl text-neutral-300 font-light leading-relaxed max-w-2xl">
                {t('features.care.intro')}
            </p>
            <ul className="space-y-4">
                {[
                    t('features.care.cold'),
                    t('features.care.bleach'),
                    t('features.care.dry'),
                    t('features.care.iron'),
                    t('features.care.colors')
                ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-neutral-400">
                        <span className="w-1.5 h-1.5 bg-[#ccff00] rounded-full" />
                        <span className="uppercase tracking-wider font-bold text-xs">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function FabricContent() {
    const { t } = useLanguage();
    return (
        <div className="flex flex-col gap-8">
            <div className="aspect-video w-full bg-neutral-800 rounded-xl overflow-hidden relative group">
                <Image
                    src="/image/product/product1.jpg"
                    alt="Fabric Macro"
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold uppercase tracking-widest z-10">
                    {t('features.fabric.macro')}
                </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                <div>
                    <h4 className="text-[#ccff00] font-bold uppercase tracking-widest text-sm mb-2">{t('features.fabric.composition')}</h4>
                    <p className="text-neutral-400 text-sm">{t('features.fabric.compositionValue')}</p>
                </div>
                <div>
                    <h4 className="text-[#ccff00] font-bold uppercase tracking-widest text-sm mb-2">{t('features.fabric.structure')}</h4>
                    <p className="text-neutral-400 text-sm">{t('features.fabric.structureValue')}</p>
                </div>
                <div>
                    <h4 className="text-[#ccff00] font-bold uppercase tracking-widest text-sm mb-2">{t('features.fabric.sustainability')}</h4>
                    <p className="text-neutral-400 text-sm">{t('features.fabric.sustainabilityValue')}</p>
                </div>
            </div>
        </div>
    );
}

function FitContent() {
    const { t } = useLanguage();
    return (
        <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
                <h3 className="text-3xl font-bold uppercase tracking-tight">{t('product.athleticContour')}</h3>
                <p className="text-neutral-400 leading-relaxed font-light">
                    {t('product.engineeredPeak')}
                </p>
                <div className="pt-8 space-y-6">
                    <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">{t('features.fitScale')}</span>
                        <span className="text-[#ccff00] text-sm font-bold uppercase tracking-widest">{t('product.athleticContour')}</span>
                    </div>
                    <div className="relative h-1 bg-neutral-800 w-full rounded-full">
                        {/* Progress Bar Background */}
                        <div className="absolute inset-0 flex justify-between px-1">
                            {['Tight', 'Athletic', 'Relaxed', 'Oversized'].map((label) => (
                                <div key={label} className="flex flex-col items-center -translate-y-1">
                                    <div className={cn(
                                        "w-3 h-3 rounded-full border-2 border-[#171717] transition-all duration-500",
                                        label === 'Athletic' ? "bg-[#ccff00] scale-125" : "bg-neutral-600"
                                    )} />
                                    <span className={cn(
                                        "text-[9px] font-bold uppercase tracking-widest mt-4 transition-colors duration-500",
                                        label === 'Athletic' ? "text-white" : "text-neutral-500"
                                    )}>{t(`product.${label.toLowerCase()}`)}</span>
                                </div>
                            ))}
                        </div>
                        {/* Active Indicator Line */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '33.33%' }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="absolute top-0 left-0 h-full bg-[#ccff00]/30 rounded-full"
                        />
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/3 aspect-[3/4] bg-neutral-800 rounded-2xl relative overflow-hidden">
                <Image
                    src="/image/product/product2.jpg"
                    alt="Fit Silhouette"
                    fill
                    className="object-cover opacity-80"
                />
            </div>
        </div>
    );
}
