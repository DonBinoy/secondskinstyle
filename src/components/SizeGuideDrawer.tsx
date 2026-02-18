'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SizeGuideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
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

export default function SizeGuideDrawer({ isOpen, onClose }: SizeGuideDrawerProps) {
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

    const data = MEASUREMENTS[unit];

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
                            <h2 className="text-2xl font-bold uppercase tracking-tighter">Size Guide</h2>
                            <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-8 hide-scrollbar" data-lenis-prevent>
                            <div className="mb-8">
                                <p className="text-sm font-medium text-neutral-600 leading-relaxed italic">
                                    Regular fit with ergonomic articulation for layering and hydration-vest compatibility.
                                    Go with your usual size for natural motion and weather-tight comfort.
                                </p>
                            </div>

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

                            {/* Table */}
                            <div className="border border-neutral-200 rounded-2xl overflow-hidden mb-12">
                                <table className="w-full text-center text-sm">
                                    <thead className="bg-black text-white">
                                        <tr className="font-black uppercase tracking-widest text-[10px]">
                                            <th className="py-4 px-2">Size</th>
                                            <th className="py-4 px-2">Chest</th>
                                            <th className="py-4 px-2">Waist</th>
                                            <th className="py-4 px-2">Arm Length</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-100">
                                        {(Object.keys(data.chest) as Array<keyof typeof data.chest>).map((size) => (
                                            <tr key={size} className="hover:bg-neutral-50 transition-colors">
                                                <td className="py-4 px-2 font-bold uppercase">{size}</td>
                                                <td className="py-4 px-2">{data.chest[size]}</td>
                                                <td className="py-4 px-2">{data.waist[size]}</td>
                                                <td className="py-4 px-2">{data.arm[size]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Image */}
                            <div className="w-full aspect-[3/4] relative bg-neutral-50 rounded-xl overflow-hidden mb-12">
                                <Image
                                    src="/image/product/size-guide.jpg"
                                    alt="Size Guide Measurement Diagram"
                                    fill
                                    className="object-contain p-4 mix-blend-multiply"
                                />
                            </div>

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
