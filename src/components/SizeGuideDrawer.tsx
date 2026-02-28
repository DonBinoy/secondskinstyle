'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SizeGuideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    category?: string;
    subcategory?: string;
    gender?: string;
}

const MEASUREMENTS = {
    cm: {
        chest: { xs: '79-84', s: '84-89', m: '89-95', l: '95-102', xl: '102-109' },
        waist: { xs: '63-68', s: '68-73', m: '73-79', l: '79-86', xl: '86-93' },
        arm: { xs: '76', s: '78', m: '80', l: '82', xl: '84' }
    },
    in: {
        chest: { xs: '31-33', s: '33-35', m: '35-37.5', l: '37.5-40', xl: '40-43' },
        waist: { xs: '25-27', s: '27-29', m: '29-31', l: '31-34', xl: '34-37' },
        arm: { xs: '30', s: '30.5', m: '31.5', l: '32', xl: '33' }
    }
};

const TANKTOP_MEASUREMENTS: Record<string, Array<{ size: string; height: string; chest: string; front: string; back?: string }>> = {
    Men: [
        { size: 'XS', height: '165', chest: '92', front: '62', back: '65.5' },
        { size: 'S', height: '170', chest: '96', front: '64', back: '67.5' },
        { size: 'M', height: '175', chest: '100', front: '66', back: '69.5' },
        { size: 'L', height: '180', chest: '104', front: '68', back: '71.5' },
        { size: 'XL', height: '185', chest: '108', front: '70', back: '73.5' },
    ],
    Women: [
        { size: 'XS', height: '155', chest: '82', front: '59' },
        { size: 'S', height: '160', chest: '86', front: '60' },
        { size: 'M', height: '165', chest: '90', front: '61' },
        { size: 'L', height: '170', chest: '94', front: '62' },
        { size: 'XL', height: '175', chest: '98', front: '63' },
    ]
};

const ROUNDNECK_MEASUREMENTS: Record<string, Array<{ size: string; height: string; chest: string; front: string; shoulder: string; sleeve: string }>> = {
    Men: [
        { size: 'XS', height: '165', chest: '92', front: '66', shoulder: '42', sleeve: '20' },
        { size: 'S', height: '170', chest: '96', front: '67.5', shoulder: '43', sleeve: '20.5' },
        { size: 'M', height: '175', chest: '100', front: '69', shoulder: '44', sleeve: '21' },
        { size: 'L', height: '180', chest: '104', front: '70.5', shoulder: '45', sleeve: '21.5' },
        { size: 'XL', height: '185', chest: '108', front: '72', shoulder: '46', sleeve: '22' },
    ],
    Women: [
        { size: 'XS', height: '155', chest: '86', front: '61', shoulder: '37', sleeve: '17.5' },
        { size: 'S', height: '160', chest: '90', front: '62.5', shoulder: '38', sleeve: '18' },
        { size: 'M', height: '165', chest: '94', front: '64', shoulder: '39', sleeve: '18.5' },
        { size: 'L', height: '170', chest: '98', front: '65.5', shoulder: '40', sleeve: '19' },
        { size: 'XL', height: '175', chest: '102', front: '67', shoulder: '41', sleeve: '19.5' },
    ]
};

const guideSteps = [
    {
        number: 1,
        title: "Chest",
        description: "Keep your arms relaxed by your sides and measure around the fullest part of your bust, just under your arms."
    },
    {
        number: 2,
        title: "Waist",
        description: "Measure around the narrowest part of your waist."
    },
    {
        number: 3,
        title: "Hips",
        description: "Standing with feet hip-width apart, measure around the widest part of your hips."
    }
];

export default function SizeGuideDrawer({ isOpen, onClose, category, subcategory, gender }: SizeGuideDrawerProps) {
    const [unit, setUnit] = useState<'cm' | 'in'>('cm');

    // Lock body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        };
    }, [isOpen]);

    const isTanktop = subcategory?.toLowerCase() === 'tanktop';
    const isRoundneck = subcategory?.toLowerCase() === 'roundneck';
    const isSpecialized = isTanktop || isRoundneck;

    const tanktopData = isTanktop ? (TANKTOP_MEASUREMENTS[gender as keyof typeof TANKTOP_MEASUREMENTS] || []) : [];
    const roundneckData = isRoundneck ? (ROUNDNECK_MEASUREMENTS[gender as keyof typeof ROUNDNECK_MEASUREMENTS] || []) : [];
    const fallbackData = MEASUREMENTS[unit];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] touch-none"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-[500px] bg-white z-[101] shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-8 border-b border-neutral-100">
                            <div>
                                <h2 className="text-2xl font-bold uppercase tracking-tighter">Size Guide</h2>
                                {isSpecialized && (
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#ccff00] bg-black px-2 py-0.5 rounded mt-1 inline-block">
                                        {gender} {subcategory} (XS-XL)
                                    </p>
                                )}
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-8 hide-scrollbar" data-lenis-prevent>
                            <div className="mb-8">
                                <p className="text-sm font-medium text-neutral-600 leading-relaxed italic">
                                    {isSpecialized
                                        ? `Engineered for aerodynamic efficiency and weightless performance. Our ${subcategory}s feature a precision fit tailored for movement.`
                                        : "Regular fit with ergonomic articulation for layering and hydration-vest compatibility. Go with your usual size for natural motion and weather-tight comfort."}
                                </p>
                            </div>

                            {!isSpecialized && (
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-bold text-sm uppercase tracking-widest text-black/50">Your Body Measurements</h3>
                                    <div className="flex items-center border border-black rounded-full p-1 gap-1">
                                        <button
                                            onClick={() => setUnit('cm')}
                                            className={cn(
                                                "w-12 h-7 rounded-full text-[10px] font-black uppercase tracking-wider transition-all",
                                                unit === 'cm' ? "bg-black text-white" : "text-black hover:bg-neutral-100"
                                            )}
                                        >
                                            CM
                                        </button>
                                        <button
                                            onClick={() => setUnit('in')}
                                            className={cn(
                                                "w-12 h-7 rounded-full text-[10px] font-black uppercase tracking-wider transition-all",
                                                unit === 'in' ? "bg-black text-white" : "text-black hover:bg-neutral-100"
                                            )}
                                        >
                                            IN
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Table */}
                            <div className="border border-neutral-200 rounded-2xl overflow-hidden mb-12">
                                <table className="w-full text-center text-sm">
                                    <thead className="bg-black text-white">
                                        <tr className="font-black uppercase tracking-widest text-[9px]">
                                            <th className="py-4 px-2">Size (EU)</th>
                                            {isTanktop ? (
                                                <>
                                                    <th className="py-4 px-2">Height (cm)</th>
                                                    <th className="py-4 px-2">Chest (cm)</th>
                                                    <th className="py-4 px-2">Front L (cm)</th>
                                                    {gender === 'Men' && <th className="py-4 px-2">Back L (cm)</th>}
                                                </>
                                            ) : isRoundneck ? (
                                                <>
                                                    <th className="py-4 px-2">Height (cm)</th>
                                                    <th className="py-4 px-2">Chest (cm)</th>
                                                    <th className="py-4 px-2">Front L (cm)</th>
                                                    <th className="py-4 px-2">Shoulder (cm)</th>
                                                    <th className="py-4 px-2">Sleeve (cm)</th>
                                                </>
                                            ) : (
                                                <>
                                                    <th className="py-4 px-2">Chest</th>
                                                    <th className="py-4 px-2">Waist</th>
                                                    <th className="py-4 px-2">Arm Length</th>
                                                </>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-100">
                                        {isTanktop ? (
                                            tanktopData.map((row) => (
                                                <tr key={row.size} className="hover:bg-neutral-50 transition-colors">
                                                    <td className="py-4 px-2 font-bold uppercase">{row.size}</td>
                                                    <td className="py-4 px-2">{row.height}</td>
                                                    <td className="py-4 px-2">{row.chest}</td>
                                                    <td className="py-4 px-2">{row.front}</td>
                                                    {gender === 'Men' && <td className="py-4 px-2">{row.back}</td>}
                                                </tr>
                                            ))
                                        ) : isRoundneck ? (
                                            roundneckData.map((row) => (
                                                <tr key={row.size} className="hover:bg-neutral-50 transition-colors">
                                                    <td className="py-4 px-2 font-bold uppercase">{row.size}</td>
                                                    <td className="py-4 px-2">{row.height}</td>
                                                    <td className="py-4 px-2">{row.chest}</td>
                                                    <td className="py-4 px-2">{row.front}</td>
                                                    <td className="py-4 px-2">{row.shoulder}</td>
                                                    <td className="py-4 px-2">{row.sleeve}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            (Object.keys(fallbackData.chest) as Array<keyof typeof fallbackData.chest>).map((size) => (
                                                <tr key={size} className="hover:bg-neutral-50 transition-colors">
                                                    <td className="py-4 px-2 font-bold uppercase">{size}</td>
                                                    <td className="py-4 px-2">{fallbackData.chest[size]}</td>
                                                    <td className="py-4 px-2">{fallbackData.waist[size]}</td>
                                                    <td className="py-4 px-2">{fallbackData.arm[size]}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Image fallback - only show for generic or keep as reference */}
                            {!isTanktop && (
                                <div className="w-full aspect-[3/4] relative bg-neutral-50 rounded-xl overflow-hidden mb-12">
                                    <Image
                                        src="/image/product/size-guide.jpg"
                                        alt="Size Guide Measurement Diagram"
                                        fill
                                        className="object-contain p-4 mix-blend-multiply"
                                    />
                                </div>
                            )}

                            {/* Instructions */}
                            <div className="space-y-8 mb-12">
                                <h3 className="font-black text-lg uppercase tracking-tighter mb-6 italic">How to Measure</h3>
                                {guideSteps.map((step) => (
                                    <div key={step.number} className="flex gap-6 items-start">
                                        <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center shrink-0 font-bold text-sm bg-black text-white">
                                            {step.number}
                                        </div>
                                        <div>
                                            <h4 className="font-black uppercase tracking-widest text-xs mb-2 italic">{step.title}</h4>
                                            <p className="text-sm text-neutral-500 font-light leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
