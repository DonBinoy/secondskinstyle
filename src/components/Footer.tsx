'use client';

import { Facebook, Instagram, Youtube, ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from './ui/MagneticButton';
import { useRef } from 'react';

export default function Footer() {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const backdropX = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    const socialLinks = [
        { Icon: Instagram, href: '#', label: 'Instagram' },
        { Icon: Facebook, href: '#', label: 'Facebook' },
        { Icon: Youtube, href: '#', label: 'Youtube' }
    ];

    const shopLinks = ["Shorts", "Tanktop", "Roundneck"];
    const helpLinks = [
        { label: t('footer.links.faq'), href: '/faq' },
        { label: t('footer.links.delivery'), href: '/delivery' },
        { label: t('footer.links.returnPolicy'), href: '/returns' },
        { label: t('footer.links.registerReturn'), href: '/returns' },
        { label: t('footer.links.customOrders'), href: '/custom-orders' },
        { label: t('footer.links.contactUs'), href: '/contact' }
    ];


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] as any }
        }
    };

    return (
        <footer ref={containerRef} className="relative w-full bg-black text-white pt-40 pb-20 overflow-hidden">
            {/* Cinematic Noise Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[100]">
                <svg className="h-full w-full">
                    <filter id="noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                        <feColorMatrix type="saturate" values="0" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noise)" />
                </svg>
            </div>

            {/* Drifting Background Cinematic Text */}
            <motion.div
                style={{ x: backdropX }}
                className="absolute top-0 left-[-20%] w-[140%] select-none pointer-events-none opacity-[0.05] overflow-hidden whitespace-nowrap z-0"
            >
                <span className="text-[30vw] font-black uppercase tracking-tighter leading-none italic block">
                    SECONDSKIN SECONDSKIN
                </span>
            </motion.div>

            <div className="max-w-[1920px] mx-auto px-6 md:px-24 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-2 lg:grid-cols-12 gap-y-16 gap-x-8 lg:gap-12 mb-40"
                >
                    {/* Brand Area */}
                    <div className="col-span-2 lg:col-span-5 space-y-16">
                        <motion.div variants={itemVariants} className="space-y-8">
                            <h2 className="text-3xl md:text-6xl font-black tracking-tighter leading-none whitespace-nowrap">
                                SECONDSKIN <span className="text-neutral-500 italic">STYLE.</span>
                            </h2>
                            <p className="text-neutral-500 max-w-md text-sm font-light leading-relaxed uppercase tracking-[0.2em]">
                                {t('footer.tagline') || "Redefining the boundary between performance and skin."}
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-8 pt-8">
                            <div className="flex gap-4">
                                {socialLinks.map((social, i) => (
                                    <MagneticButton
                                        key={i}
                                        className="w-16 h-16 bg-neutral-900/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all border border-neutral-800"
                                    >
                                        <social.Icon size={24} />
                                    </MagneticButton>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="col-span-1 lg:col-span-3 lg:col-start-7">
                        <motion.h3 variants={itemVariants} className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.3em] lg:tracking-[0.4em] text-neutral-600 mb-8 lg:mb-12">
                            COLLECTIONS
                        </motion.h3>
                        <ul className="space-y-4 lg:space-y-6">
                            {shopLinks.map((link) => (
                                <motion.li key={link} variants={itemVariants}>
                                    <Link
                                        href={`/shop?subcategory=${link.toLowerCase()}`}
                                        className="group flex items-center gap-2 lg:gap-4 text-xl lg:text-2xl font-medium text-neutral-400 hover:text-white transition-all duration-500"
                                    >
                                        <span className="h-px w-0 group-hover:w-6 lg:group-hover:w-8 bg-white transition-all duration-500" />
                                        {link}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-1 lg:col-span-3">
                        <motion.h3 variants={itemVariants} className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.3em] lg:tracking-[0.4em] text-neutral-600 mb-8 lg:mb-12">
                            INFORMATION
                        </motion.h3>
                        <div className="grid grid-cols-1 gap-y-2 lg:gap-y-4">
                            {helpLinks.slice(0, 6).map((item, i) => (
                                <motion.div key={i} variants={itemVariants}>
                                    <Link
                                        href={item.href}
                                        className="text-xs lg:text-sm font-medium text-neutral-500 hover:text-white transition-all flex items-center justify-between group py-2 lg:py-3 border-b border-neutral-900"
                                    >
                                        {item.label}
                                        <ArrowUpRight className="w-2.5 h-2.5 lg:w-3 lg:h-3 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12 mt-24 pb-12 border-t border-neutral-900 pt-12">
                    <div className="flex flex-col gap-4 text-center md:text-left">
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-neutral-700">
                            © 2026 SecondSkinStyle Ltd. — All rights reserved.
                        </p>
                        <div className="flex justify-center md:justify-start gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                            <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
                        </div>
                    </div>

                    {/* Payment Assets */}
                    <div className="flex items-center gap-6 opacity-100 transition-all duration-1000">
                        {/* Visa */}
                        <div className="w-12 h-7 bg-white rounded-sm flex items-center justify-center px-2 border border-neutral-800 transition-all">
                            <svg viewBox="0 0 780 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                <path d="M293.2 348.7l33.4-195.7h53.4l-33.4 195.7h-53.4zM543.7 158.2c-10.6-3.9-27.2-8.1-47.9-8.1-52.8 0-90 26.5-90.3 64.4-.3 28 26.6 43.6 46.9 52.9 20.8 9.5 27.8 15.6 27.7 24.1-.1 13-16.6 19-32 19-21.4 0-32.8-2.9-50.4-10.1l-6.9-3.1-7.5 43.5c12.5 5.4 35.6 10.1 59.6 10.3 56.3 0 92.8-26.2 93.2-66.8.2-22.2-14-39.2-44.8-53.2-18.7-9-30.1-15-30-24.2.1-8.1 9.7-16.8 30.6-16.8 17.4-.3 30.1 3.5 39.9 7.4l4.8 2.2 7.1-41.5zM650.9 153h-41.3c-12.8 0-22.3 3.5-27.9 16.1l-79.3 179h56c0 0 9.2-24 11.2-29.3 6.1 0 60.6.1 68.4.1 1.6 6.8 6.5 29.2 6.5 29.2h49.5l-43.1-195.1zm-65.6 127.4c4.4-11.2 21.2-54.5 21.2-54.5-.3.5 4.4-11.3 7.1-18.6l3.6 16.8s10.2 46.6 12.3 56.3h-44.2zM214.3 153l-52.4 133.7-5.6-27.1c-9.7-31.1-40-64.8-73.8-81.6l47.8 170.4h56.5l84.1-195.4h-56.6z" fill="#1A1F71" />
                                <path d="M131.1 153H45.4l-.7 4.1c66.7 16.1 110.8 54.9 129.2 101.5l-18.6-89.2c-3.2-12.3-12.5-16-23.2-16.4z" fill="#F9A533" />
                            </svg>
                        </div>
                        {/* Mastercard */}
                        <div className="w-12 h-7 bg-white rounded-sm flex items-center justify-center px-1 border border-neutral-800 transition-all">
                            <svg viewBox="0 0 131.39 86.9" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                <circle cx="49.39" cy="43.45" r="29.5" fill="#EB001B" />
                                <circle cx="82" cy="43.45" r="29.5" fill="#F79E1B" />
                                <path d="M65.7 19.7a29.5 29.5 0 0 1 0 47.5 29.5 29.5 0 0 1 0-47.5z" fill="#FF5F00" />
                            </svg>
                        </div>
                        {/* Amex */}
                        <div className="w-12 h-7 bg-[#2557D6] rounded-sm flex items-center justify-center p-0.5 border border-neutral-800 transition-all">
                            <span className="text-[10px] font-black text-white leading-none tracking-tighter">AMEX</span>
                        </div>
                        {/* PayPal */}
                        <div className="w-12 h-7 bg-white rounded-sm flex items-center justify-center p-0.5 border border-neutral-800 transition-all">
                            <span className="text-[10px] font-black text-[#003087] leading-none italic tracking-tighter">PayPal</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
