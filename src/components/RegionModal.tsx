'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, ChevronDown, MapPin, Check } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

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
    const [selectedRegion, setSelectedRegion] = useState<Region>(REGIONS[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Initialize from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('selected-region');
        if (saved) {
            const region = REGIONS.find(r => r.id === saved);
            if (region) setSelectedRegion(region);
        }
    }, []);

    // Disable scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            // Check if we need to sync with localStorage again when opening
            const saved = localStorage.getItem('selected-region');
            if (saved) {
                const region = REGIONS.find(r => r.id === saved);
                if (region) setSelectedRegion(region);
            }

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

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.05
            }
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.3, ease: 'easeIn' }
        }
    } as any;

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
        },
    } as any;

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    key="region-modal-overlay"
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
                >
                    {/* Backdrop */}
                    <motion.div
                        key="region-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Panel */}
                    <motion.div
                        key="region-modal-panel"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative w-full max-w-[480px] bg-[#0A0A0A] text-white shadow-2xl flex flex-col border border-white/10 rounded-3xl overflow-hidden z-20"
                        data-lenis-prevent
                    >
                        {/* Cinematic Background Elements */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12">
                                <span className="text-[10vh] font-black uppercase italic leading-none tracking-tighter whitespace-nowrap">SECONDSKIN</span>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#ccff00]/5 to-transparent" />
                        </div>

                        {/* Header */}
                        <div className="flex items-center justify-between p-6 md:p-8 relative z-20 border-b border-white/5 bg-white/[0.02]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                                    <Globe className="w-5 h-5 text-[#ccff00]" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#ccff00]">Network Portal</span>
                                    <span className="text-[7px] font-bold uppercase tracking-widest opacity-30">Selection Protocol</span>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-3 hover:bg-white/10 rounded-full transition-all group active:scale-95 border border-white/5 bg-white/5"
                            >
                                <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-500" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="px-6 md:px-10 py-10 flex flex-col gap-8 relative z-10">
                            <div className="space-y-4">
                                <motion.div variants={itemVariants} className="flex items-center gap-2 text-[#ccff00] text-[9px] font-black uppercase tracking-[0.3em]">
                                    <div className="w-6 h-[1px] bg-[#ccff00]" />
                                    Account Localization
                                </motion.div>
                                <motion.h2
                                    variants={itemVariants}
                                    className="text-3xl md:text-4xl font-bold tracking-tighter uppercase italic leading-[0.9]"
                                >
                                    Select Your <span className="text-[#ccff00]">Region</span>
                                </motion.h2>
                                <motion.p
                                    variants={itemVariants}
                                    className="text-white/40 text-[11px] font-medium leading-relaxed max-w-[280px]"
                                >
                                    Experience localized logistics and regional pricing adaptive to your environment.
                                </motion.p>
                            </div>

                            {/* Dropdown Selector */}
                            <motion.div variants={itemVariants} className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className={cn(
                                        "w-full p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between bg-white/[0.03] active:scale-[0.99]",
                                        isDropdownOpen ? "border-[#ccff00]/50 ring-1 ring-[#ccff00]/20" : "border-white/10 hover:border-white/20"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-xl">
                                            {selectedRegion.flag}
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-xs font-black uppercase tracking-widest">{selectedRegion.name}</h3>
                                            <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">{selectedRegion.currency}</p>
                                        </div>
                                    </div>
                                    <ChevronDown className={cn("w-5 h-5 text-white/20 transition-transform duration-300", isDropdownOpen && "rotate-180 text-[#ccff00]")} />
                                </button>

                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 5, scale: 0.98 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-0 right-0 mt-3 p-2 bg-[#121212] border border-white/10 rounded-2xl shadow-2xl z-50 max-h-[280px] overflow-y-auto custom-scrollbar"
                                        >
                                            {REGIONS.map((region) => (
                                                <button
                                                    key={region.id}
                                                    onClick={() => {
                                                        setSelectedRegion(region);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className={cn(
                                                        "w-full flex items-center justify-between p-4 rounded-xl transition-all group",
                                                        selectedRegion.id === region.id ? "bg-[#ccff00]/10" : "hover:bg-white/5"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-xl">{region.flag}</span>
                                                        <div className="text-left">
                                                            <h4 className={cn(
                                                                "text-[10px] font-black uppercase tracking-wider transition-colors",
                                                                selectedRegion.id === region.id ? "text-[#ccff00]" : "group-hover:text-white text-white/70"
                                                            )}>
                                                                {region.name}
                                                            </h4>
                                                            <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest">
                                                                {region.code} • {region.currency}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {selectedRegion.id === region.id && (
                                                        <Check className="w-4 h-4 text-[#ccff00]" />
                                                    )}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            <motion.button
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    localStorage.setItem('selected-region', selectedRegion.id);
                                    console.log(`Region confirmed: ${selectedRegion.name}`);
                                    onClose();
                                }}
                                className="w-full py-5 rounded-2xl bg-[#ccff00] text-black font-black uppercase tracking-[0.2em] text-xs hover:shadow-[0_0_30px_rgba(204,255,0,0.3)] transition-all"
                            >
                                Confirm Selection
                            </motion.button>
                        </div>

                        {/* Footer */}
                        <div className="px-10 py-8 border-t border-white/5 bg-white/[0.02]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-white/20">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />
                                    <div className="flex flex-col">
                                        <span className="text-[7px] font-black uppercase tracking-[0.2em]">GPS Tracking</span>
                                        <span className="text-[8px] font-bold uppercase tracking-widest opacity-60">Status: Active</span>
                                    </div>
                                </div>
                                <span className="text-[8px] font-black uppercase tracking-[0.3em] opacity-10">SECNDSKIN™</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.05);
                    border-radius: 100px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(204,255,0,0.2);
                }
            `}</style>
        </AnimatePresence>
    );
}
