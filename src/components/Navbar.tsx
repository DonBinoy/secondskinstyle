'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, User, Menu, X, ChevronRight, Globe } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/data/translations';
import Image from 'next/image';
import RegionModal from './RegionModal';

export default function Navbar({ solid = false }: { solid?: boolean }) {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(solid);
    const [hidden, setHidden] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartCount } = useCart();
    const { language, setLanguage, t } = useLanguage();
    const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);

    const NAV_ITEMS = [
        {
            label: t('nav.men'),
            href: '/men',
            dropdown: [
                { label: 'Tanktop', href: '/men/tanktop' },
                { label: 'Roundneck', href: '/men/roundneck' },
                { label: 'Shorts', href: '/men/shorts' }
            ]
        },
        {
            label: t('nav.women'),
            href: '/women',
            dropdown: [
                { label: 'Tanktop', href: '/women/tanktop' },
                { label: 'Roundneck', href: '/women/roundneck' },
                { label: 'Shorts', href: '/women/shorts' }
            ]
        },
        { label: t('nav.shopAll'), href: '/shop' },
        { label: t('nav.aboutUs'), href: '/about-us' },
        { label: 'My Orders', href: '/orders' },
        { label: t('nav.business'), href: '/business' }
    ];

    // Force scrolled state if solid prop is true
    const isVisibleBg = solid || scrolled;
    const textColor = (isVisibleBg || isMenuOpen) ? "text-black" : "text-white";
    const borderColor = isVisibleBg ? "border-neutral-100" : "border-transparent";
    const bgColor = isVisibleBg ? "bg-white/90 backdrop-blur-xl" : "bg-transparent";

    // Disable scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;

        // Hide on scroll down, show on scroll up
        if (latest > previous && latest > 150) {
            if (!isMenuOpen) setHidden(true);
        } else {
            setHidden(false);
        }

        // Handle background transition
        if (latest > 50) {
            setScrolled(true);
        } else {
            setScrolled(solid);
        }
    });

    // Auto-Region Detection (Privacy Compliant)
    useEffect(() => {
        const checkRegion = async () => {
            const savedRegion = localStorage.getItem('selected-region');
            const cookieConsent = localStorage.getItem('cookie-consent');

            if (savedRegion) return; // Choice already made

            // If no cookie consent choice has been made yet, we wait.
            // Our CookieConsent component shows with a delay, so we check again periodically
            // or we could use a custom event. For simplicity and robustness, let's poll slightly 
            // until a choice is found in localStorage, or just wait for the user to interact.

            if (!cookieConsent) {
                // Wait for the user to engage with the cookie banner
                const interval = setInterval(() => {
                    const latestConsent = localStorage.getItem('cookie-consent');
                    if (latestConsent) {
                        clearInterval(interval);
                        handleConsentChoice(latestConsent);
                    }
                }, 1000);
                return () => clearInterval(interval);
            } else {
                handleConsentChoice(cookieConsent);
            }
        };

        const handleConsentChoice = async (consent: string) => {
            if (consent === 'accepted') {
                try {
                    const response = await fetch('https://ipapi.co/json/');
                    const data = await response.json();
                    const countryCode = data.country_code;

                    let detectedId = 'row';
                    if (countryCode === 'US') detectedId = 'us';
                    else if (countryCode === 'GB') detectedId = 'uk';
                    else if (['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'].includes(countryCode)) detectedId = 'eu';
                    else if (['AE', 'SA', 'QA', 'KW', 'OM', 'BH'].includes(countryCode)) detectedId = 'ae';
                    else if (countryCode === 'CA') detectedId = 'ca';

                    if (detectedId !== 'row') {
                        localStorage.setItem('selected-region', detectedId);
                    } else {
                        setIsRegionModalOpen(true);
                    }
                } catch (error) {
                    setIsRegionModalOpen(true);
                }
            } else {
                // If they declined cookies, we MUST NOT fetch IP.
                // We show the manual modal so they can still select a region safely.
                setIsRegionModalOpen(true);
            }
        };

        checkRegion();
    }, []);

    return (
        <>
            <motion.nav
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                    "fixed top-0 inset-x-0 z-50 flex items-center justify-between gap-2 px-4 md:px-12 py-5 transition-all duration-500",
                    isMenuOpen ? "bg-white border-b" : bgColor,
                    isVisibleBg ? "border-b shadow-sm" : "",
                    borderColor
                )}
            >
                {/* Left: Mobile Menu & Logo */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    <button
                        className="lg:hidden p-2 -ml-2 transition-transform active:scale-95"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6 text-black" />
                        ) : (
                            <Menu className={cn("w-6 h-6", textColor)} />
                        )}
                    </button>
                    <Link href="/" onClick={() => setIsMenuOpen(false)} className={cn("flex items-center gap-0 min-w-0", textColor)}>
                        <Image
                            src="/logosecondskin.svg"
                            alt="SecondSkinStyle Logo"
                            width={48}
                            height={48}
                            className={cn(
                                "w-10 h-10 md:w-12 md:h-12 transition-all duration-300 active:scale-95",
                                isVisibleBg || isMenuOpen ? "brightness-0" : ""
                            )}
                        />
                        <div className="flex flex-col min-w-0 -ml-0 md:-ml-0">
                            <span className="text-sm md:text-lg font-bold tracking-tighter leading-none uppercase italic truncate">
                                SecondSkin<span className="text-neutral-500">Style</span>
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Center: Links (Desktop) */}
                <div className={cn("hidden lg:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.3em]", textColor)}>
                    {NAV_ITEMS.map((item, idx) => (
                        <div
                            key={`nav-desktop-${idx}-${item.label}`}
                            className="relative group py-4"
                            onMouseEnter={() => setActiveDropdown(item.label)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link href={item.href} className="relative z-10 opacity-70 group-hover:opacity-100 transition-all">
                                {item.label}
                                <span className={cn(
                                    "absolute -bottom-1 left-0 w-full h-[1px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left opacity-30",
                                    isVisibleBg ? "bg-black" : "bg-white"
                                )} />
                            </Link>

                            {/* Dropdown */}
                            <AnimatePresence>
                                {activeDropdown === item.label && item.dropdown && (
                                    <motion.div
                                        key={`dropdown-${item.label}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                                    >
                                        <div className="bg-white/95 backdrop-blur-md border border-neutral-100 shadow-xl p-6 min-w-[200px] flex flex-col gap-4 text-black">
                                            {item.dropdown.map((sub, sIdx) => (
                                                <Link
                                                    key={`sub-${sIdx}-${sub.label}`}
                                                    href={sub.href}
                                                    className="opacity-60 hover:opacity-100 transition-opacity hover:translate-x-1 duration-300"
                                                >
                                                    {sub.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Right: Icons */}
                <div className={cn("flex items-center gap-1 md:gap-4 flex-shrink-0", textColor)}>
                    {/* Language Switcher */}
                    <button
                        onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                        className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-full hover:bg-neutral-100 transition-colors group"
                    >
                        <Globe className="w-4 h-4 stroke-[1.5]" />
                        <span className="hidden xs:block text-[10px] font-black uppercase tracking-widest">{language}</span>
                    </button>

                    <button className="p-2 hover:opacity-40 transition-opacity">
                        <Search className="w-5 h-5 stroke-[1.5]" />
                    </button>
                    <Link href="/cart" onClick={() => setIsMenuOpen(false)} className="p-2 hover:opacity-40 transition-opacity relative group">
                        <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-[10px] flex items-center justify-center rounded-full font-bold tracking-tighter shadow-xl ring-2 ring-white group-hover:scale-110 transition-transform">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    <button
                        onClick={() => setIsRegionModalOpen(true)}
                        className="flex items-center justify-center lg:hover:opacity-40 transition-opacity p-2"
                    >
                        <User className="w-5 h-5 stroke-[1.5]" />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        key="mobile-menu-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-white lg:hidden text-black"
                    >
                        <motion.div
                            key="mobile-menu-content"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full pt-32 px-8 overflow-y-auto"
                        >
                            <div className="flex flex-col gap-10">
                                {NAV_ITEMS.map((item, idx) => (
                                    <motion.div
                                        key={`mobile-nav-group-${item.label}-${idx}`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.1 }}
                                        className="flex flex-col gap-6"
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-4xl font-bold uppercase tracking-tighter hover:text-neutral-500 transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                        {item.dropdown && (
                                            <div className="flex flex-col gap-5 pl-1">
                                                {item.dropdown.map((sub, sIdx) => (
                                                    <Link
                                                        key={`mobile-sub-link-${sub.label}-${sIdx}`}
                                                        href={sub.href}
                                                        onClick={() => setIsMenuOpen(false)}
                                                        className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-400 hover:text-black flex items-center justify-between group py-1"
                                                    >
                                                        {sub.label}
                                                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                        <div key={`divider-${idx}`} className="h-[1px] w-full bg-neutral-100" />
                                    </motion.div>
                                ))}

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="pt-10 pb-20 flex flex-col gap-8"
                                >
                                    <div className="flex flex-wrap gap-8">
                                        <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]">
                                            <Search className="w-4 h-4" /> {t('nav.search')}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsRegionModalOpen(true);
                                                setIsMenuOpen(false);
                                            }}
                                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]"
                                        >
                                            <User className="w-4 h-4" /> {t('nav.account')}
                                        </button>
                                        <button
                                            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ccff00] bg-black px-4 py-2 rounded-full"
                                        >
                                            <Globe className="w-4 h-4" /> {language === 'en' ? 'ESPAÑOL' : 'ENGLISH'}
                                        </button>
                                    </div>
                                    <p className="text-neutral-400 text-[10px] font-medium tracking-widest leading-relaxed">
                                        SecondSkinStyle © 2026<br />
                                        {language === 'en' ? 'Premium Performance Apparels' : 'Ropa de Alto Rendimiento Premium'}
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <RegionModal
                isOpen={isRegionModalOpen}
                onClose={() => setIsRegionModalOpen(false)}
            />
        </>
    );
}

