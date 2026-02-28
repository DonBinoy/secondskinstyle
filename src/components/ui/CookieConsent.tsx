'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import { Cookie, X, ShieldCheck } from 'lucide-react';

export default function CookieConsent() {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Delay showing to not overwhelm immediate load
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:bottom-8 z-[99999] md:max-w-md w-auto"
                >
                    <div className="relative overflow-hidden bg-black/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        {/* Background Decorative Element */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00]/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10 flex flex-col gap-6">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                        <Cookie className="w-5 h-5 text-[#ccff00]" />
                                    </div>
                                    <h3 className="text-lg font-black uppercase tracking-tighter text-white">
                                        {t('cookies.title')}
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <p className="text-sm font-medium leading-relaxed text-white/60">
                                {t('cookies.description')}
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-3">
                                <button
                                    onClick={handleAccept}
                                    className="w-full sm:flex-1 py-4 px-6 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#ccff00] transition-colors"
                                >
                                    {t('cookies.accept')}
                                </button>
                                <button
                                    onClick={handleDecline}
                                    className="w-full sm:flex-1 py-4 px-6 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-white/10 transition-colors"
                                >
                                    {t('cookies.decline')}
                                </button>
                            </div>

                            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                                <ShieldCheck className="w-3 h-3 text-[#ccff00]/60" />
                                <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">
                                    Encrypted Consent Management Protocol
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
