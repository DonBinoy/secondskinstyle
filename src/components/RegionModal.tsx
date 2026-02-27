'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, ChevronRight, MapPin } from 'lucide-react';
import { useEffect } from 'react';

interface Region {
    id: string;
    name: string;
    code: string;
    currency: string;
    flag: string;
}

const REGIONS: Region[] = [
    { id: 'us', name: 'United States', code: 'USA', currency: 'USD ($)', flag: '🇺🇸' },
    { id: 'uk', name: 'United Kingdom', code: 'UK', currency: 'GBP (£)', flag: '🇬🇧' },
    { id: 'eu', name: 'Europe', code: 'EU', currency: 'EUR (€)', flag: '🇪🇺' },
    { id: 'ae', name: 'Middle East', code: 'UAE', currency: 'AED', flag: '🇦🇪' },
    { id: 'ca', name: 'Canada', code: 'CAN', currency: 'CAD ($)', flag: '🇨🇦' },
    { id: 'row', name: 'Global', code: 'INT', currency: 'International Shipping', flag: '🌐' },
];

interface RegionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RegionModal({ isOpen, onClose }: RegionModalProps) {
    // Disable scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollBarWidth}px`;
            document.documentElement.style.overflow = 'hidden';
            document.documentElement.classList.add('lenis-stopped');
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            document.documentElement.style.overflow = '';
            document.documentElement.classList.remove('lenis-stopped');
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            document.documentElement.style.overflow = '';
            document.documentElement.classList.remove('lenis-stopped');
        };
    }, [isOpen]);

    // Trap scroll and wheel events
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (isOpen) {
                const target = e.target as HTMLElement;
                const isInsideModal = target.closest('[data-lenis-prevent]');
                if (!isInsideModal) {
                    e.preventDefault();
                }
            }
        };

        if (isOpen) {
            window.addEventListener('wheel', handleWheel, { passive: false });
            window.addEventListener('touchmove', handleWheel as any, { passive: false });
        }
        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchmove', handleWheel as any);
        };
    }, [isOpen]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.4, ease: "easeInOut" }
        }
    } as any;

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        },
    } as any;

    const overlayVariants = {
        hidden: { x: '100%', opacity: 0.5 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
        },
        exit: {
            x: '100%',
            opacity: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
    } as any;

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    key="region-modal-overlay"
                    className="fixed inset-0 z-[100] flex justify-end overflow-hidden pointer-events-auto"
                    data-lenis-prevent
                >
                    {/* Backdrop */}
                    <motion.div
                        key="region-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-xl"
                    />

                    {/* Main Side Panel */}
                    <motion.div
                        key="region-modal-panel"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative w-full md:w-[500px] h-screen bg-[#050505] text-white shadow-2xl flex flex-col border-l border-white/5 overflow-y-auto custom-scrollbar z-20 pointer-events-auto"
                    >
                        {/* Cinematic Background Elements */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-[0.02] rotate-90 origin-right translate-x-10">
                                <span className="text-[15vh] font-black uppercase italic leading-none tracking-tighter whitespace-nowrap">SECONDSKIN</span>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#ccff00]/5 to-transparent" />
                        </div>

                        {/* Top Bar - Sticky */}
                        <div className="flex items-center justify-between p-6 md:p-8 relative z-20 sticky top-0 bg-[#050505]/95 backdrop-blur-xl border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                                    <Globe className="w-5 h-5 text-[#ccff00]" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#ccff00]">Network Portal</span>
                                    <span className="text-[7px] font-bold uppercase tracking-widest opacity-30">v4.0 Protocol</span>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-3 hover:bg-white/10 rounded-full transition-all group active:scale-95 border border-white/5 bg-white/5"
                            >
                                <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-500" />
                            </button>
                        </div>

                        {/* Content Area */}
                        <motion.div
                            variants={containerVariants}
                            className="flex-1 px-6 md:px-10 flex flex-col gap-8 relative z-10 py-10"
                        >
                            {/* Heading */}
                            <div className="space-y-4">
                                <motion.div variants={itemVariants} className="flex items-center gap-2 text-[#ccff00] text-[9px] font-black uppercase tracking-[0.3em]">
                                    <div className="w-6 h-[1px] bg-[#ccff00]" />
                                    Region Selection
                                </motion.div>
                                <motion.h2
                                    variants={itemVariants}
                                    className="text-4xl md:text-5xl font-bold tracking-tighter uppercase italic leading-[0.85] mix-blend-exclusion"
                                >
                                    Select Your <span className="text-[#ccff00]">Zone</span>
                                </motion.h2>
                                <motion.p
                                    variants={itemVariants}
                                    className="text-white/40 text-xs font-medium max-w-xs leading-relaxed border-l border-white/10 pl-4"
                                >
                                    Localized logistics and regional pricing adaptive to your environment.
                                </motion.p>
                            </div>

                            {/* Regions Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {REGIONS.map((region) => (
                                    <motion.button
                                        key={region.id}
                                        variants={itemVariants}
                                        whileHover={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(204,255,0,0.3)", y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            console.log(`Region set: ${region.name}`);
                                            onClose();
                                        }}
                                        className="group text-left p-5 rounded-2xl border border-white/5 bg-white/[0.015] transition-all duration-300 flex flex-col gap-5 relative overflow-hidden"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-xl group-hover:scale-105 transition-transform duration-300">
                                                {region.flag}
                                            </div>
                                            <span className="text-[8px] font-black text-white/20 group-hover:text-[#ccff00] transition-colors tracking-widest uppercase">{region.code}</span>
                                        </div>
                                        <div className="flex items-end justify-between">
                                            <div className="space-y-0.5">
                                                <h3 className="text-[10px] font-black uppercase tracking-[0.15em] group-hover:text-[#ccff00] transition-colors">{region.name}</h3>
                                                <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest">{region.currency}</p>
                                            </div>
                                            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#ccff00] transition-colors group-hover:text-black duration-300">
                                                <ChevronRight className="w-3 h-3" />
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Enhanced Footer */}
                        <div className="p-6 md:p-10 border-t border-white/5 bg-black/60 backdrop-blur-md relative z-20">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-3 text-white/30">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />
                                    <div className="flex flex-col">
                                        <span className="text-[7px] font-black uppercase tracking-[0.2em]">GPS Tracking</span>
                                        <span className="text-[8px] font-bold uppercase tracking-widest text-white/50">Detected: North America</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center sm:items-end opacity-20">
                                    <span className="text-[8px] font-black uppercase tracking-[0.3em]">SECNDSKIN™</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #050505;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.05);
                    border-radius: 100px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(204,255,0,0.2);
                }
                @media (max-width: 768px) {
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 0px;
                    }
                }
            `}</style>
        </AnimatePresence>
    );
}
