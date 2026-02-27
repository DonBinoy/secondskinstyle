'use client';

import { Facebook, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="w-full bg-neutral-900 text-white pt-20 pb-8">
            <div className="max-w-[1920px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-20">
                    {/* Brand Column */}
                    <div className="flex flex-col gap-6 col-span-2 md:col-span-2 lg:col-span-2">
                        <h2 className="text-3xl font-semibold tracking-tighter">SecondSkinStyle</h2>
                        <p className="text-zinc-400 max-w-sm text-sm leading-relaxed">
                            {t('footer.tagline')}
                        </p>
                        <div className="flex gap-4 mt-2">
                            {[Instagram, Facebook, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-white hover:text-black transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Shop Column */}
                    <div className="col-span-1">
                        <h3 className="text-base font-bold uppercase tracking-wide mb-6">{t('footer.shop')}</h3>
                        <ul className="flex flex-col gap-3">
                            {["Shorts", "Tanktop", "Roundneck"].map(link => (
                                <li key={link}>
                                    <Link href={`/shop?subcategory=${link.toLowerCase()}`} className="text-sm text-zinc-400 hover:text-white transition-colors">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help Column */}
                    <div className="col-span-1">
                        <h3 className="text-base font-bold uppercase tracking-wide mb-6">{t('footer.help')}</h3>
                        <ul className="flex flex-col gap-3">
                            {[
                                { label: t('footer.links.faq'), href: '/faq' },
                                { label: t('footer.links.delivery'), href: '/delivery' },
                                { label: t('footer.links.returnPolicy'), href: '/returns' },
                                { label: t('footer.links.registerReturn'), href: '/returns' },
                                { label: t('footer.links.customOrders'), href: '/custom-orders' },
                                { label: t('footer.links.contactUs'), href: '/contact' }
                            ].map((item, i) => (
                                <li key={i}>
                                    <Link href={item.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-zinc-500">
                        © 2026 SecondSkinStyle Ltd. {t('footer.rights')}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap justify-center md:justify-end">
                        {/* Visa */}
                        <div className="w-12 h-7 bg-white rounded flex items-center justify-center px-1">
                            <svg viewBox="0 0 780 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                <rect width="780" height="500" rx="40" fill="white" />
                                <path d="M293.2 348.7l33.4-195.7h53.4l-33.4 195.7h-53.4zM543.7 158.2c-10.6-3.9-27.2-8.1-47.9-8.1-52.8 0-90 26.5-90.3 64.4-.3 28 26.6 43.6 46.9 52.9 20.8 9.5 27.8 15.6 27.7 24.1-.1 13-16.6 19-32 19-21.4 0-32.8-2.9-50.4-10.1l-6.9-3.1-7.5 43.5c12.5 5.4 35.6 10.1 59.6 10.3 56.3 0 92.8-26.2 93.2-66.8.2-22.2-14-39.2-44.8-53.2-18.7-9-30.1-15-30-24.2.1-8.1 9.7-16.8 30.6-16.8 17.4-.3 30.1 3.5 39.9 7.4l4.8 2.2 7.1-41.5zM650.9 153h-41.3c-12.8 0-22.3 3.5-27.9 16.1l-79.3 179h56c0 0 9.2-24 11.2-29.3 6.1 0 60.6.1 68.4.1 1.6 6.8 6.5 29.2 6.5 29.2h49.5l-43.1-195.1zm-65.6 127.4c4.4-11.2 21.2-54.5 21.2-54.5-.3.5 4.4-11.3 7.1-18.6l3.6 16.8s10.2 46.6 12.3 56.3h-44.2zM214.3 153l-52.4 133.7-5.6-27.1c-9.7-31.1-40-64.8-73.8-81.6l47.8 170.4h56.5l84.1-195.4h-56.6z" fill="#1A1F71" />
                                <path d="M131.1 153H45.4l-.7 4.1c66.7 16.1 110.8 54.9 129.2 101.5l-18.6-89.2c-3.2-12.3-12.5-16-23.2-16.4z" fill="#F9A533" />
                            </svg>
                        </div>
                        {/* Mastercard */}
                        <div className="w-12 h-7 bg-white rounded flex items-center justify-center px-1">
                            <svg viewBox="0 0 131.39 86.9" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                <rect width="131.39" height="86.9" rx="8" fill="white" />
                                <circle cx="49.39" cy="43.45" r="29.5" fill="#EB001B" />
                                <circle cx="82" cy="43.45" r="29.5" fill="#F79E1B" />
                                <path d="M65.7 19.7a29.5 29.5 0 0 1 0 47.5 29.5 29.5 0 0 1 0-47.5z" fill="#FF5F00" />
                            </svg>
                        </div>
                        {/* Amex */}
                        <div className="w-12 h-7 bg-[#2557D6] rounded flex items-center justify-center px-1">
                            <svg viewBox="0 0 48 16" xmlns="http://www.w3.org/2000/svg" className="w-full">
                                <text x="50%" y="12" textAnchor="middle" fill="white" fontSize="10" fontFamily="Arial" fontWeight="bold">AMEX</text>
                            </svg>
                        </div>
                        {/* Discover */}
                        <div className="w-12 h-7 bg-white rounded flex items-center justify-center overflow-hidden px-1">
                            <svg viewBox="0 0 780 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                <rect width="780" height="500" rx="40" fill="white" />
                                <path d="M0 0h780v180H0z" fill="white" />
                                <circle cx="490" cy="250" r="168" fill="#F76F20" />
                                <path d="M120 180h70c70 0 110 38 110 98s-40 98-110 98H120V180zm50 155h22c38 0 58-22 58-57s-20-57-58-57h-22v114z" fill="#231F20" />
                                <path d="M340 180h50v196h-50zM430 180h50l34 135 34-135h50l-58 196h-52zM645 180h-50v196h50v-80l60 80h62l-72-92 68-104h-60l-58 84V180z" fill="#231F20" />
                            </svg>
                        </div>
                        {/* PayPal */}
                        <div className="w-12 h-7 bg-white rounded flex items-center justify-center px-1">
                            <svg viewBox="0 0 124 33" xmlns="http://www.w3.org/2000/svg" className="w-full">
                                <path d="M46.2 6.9h-8.8c-.6 0-1.1.4-1.2 1l-3.5 22.3c-.1.4.2.8.7.8h4.2c.6 0 1.1-.4 1.2-1l.9-5.9c.1-.6.6-1 1.2-1h2.8c5.7 0 9-2.8 9.9-8.2.4-2.4 0-4.2-1-5.5-1.2-1.4-3.3-2.1-6.4-2.1v-.4z" fill="#003087" />
                                <path d="M47 15.1c-.5 3.1-2.8 3.1-5.1 3.1h-1.3l.9-5.7c.1-.4.4-.6.7-.6h.6c1.6 0 3 0 3.8.9.5.5.6 1.3.4 2.3zM67.5 15h-4.2c-.4 0-.7.3-.7.6l-.2 1-.3-.4c-.8-1.2-2.6-1.6-4.5-1.6-4.2 0-7.8 3.2-8.5 7.6-.4 2.2.1 4.3 1.4 5.8 1.1 1.4 2.8 1.9 4.7 1.9 3.4 0 5.3-2.2 5.3-2.2l-.2 1c-.1.4.2.8.7.8h3.8c.6 0 1.1-.4 1.2-1l2.3-14.7c.2-.4-.1-.8-.8-.8zm-5.9 7.4c-.4 2.1-2 3.5-4.2 3.5-1.1 0-1.9-.4-2.5-1-.5-.7-.7-1.6-.5-2.6.3-2.1 2-3.5 4.2-3.5 1.1 0 1.9.3 2.4 1 .6.6.8 1.5.6 2.6z" fill="#003087" />
                                <path d="M86 15h-4.3c-.4 0-.8.2-1 .6l-6 8.9-2.5-8.5c-.2-.5-.6-.9-1.2-.9h-4.2c-.5 0-.8.5-.6 1l4.8 14.1-4.5 6.3c-.3.5 0 1.1.6 1.1H71c.4 0 .8-.2 1-.6L86.6 16c.3-.5 0-1-.6-1z" fill="#003087" />
                                <path d="M99.7 6.9H91c-.6 0-1.1.4-1.2 1l-3.5 22.3c-.1.4.2.8.7.8h4.5c.4 0 .8-.3.8-.7l1-6.2c.1-.6.6-1 1.2-1h2.8c5.7 0 9-2.8 9.9-8.2.4-2.4 0-4.2-1.1-5.5-1.1-1.4-3.2-2.1-6.4-2.1v-.4z" fill="#009CDE" />
                                <path d="M100.5 15.1c-.5 3.1-2.8 3.1-5.1 3.1h-1.3l.9-5.7c.1-.4.4-.6.7-.6h.6c1.6 0 3 0 3.8.9.5.5.6 1.3.4 2.3zM121 15h-4.2c-.4 0-.7.3-.7.6l-.2 1-.3-.4c-.8-1.2-2.6-1.6-4.5-1.6-4.2 0-7.8 3.2-8.5 7.6-.4 2.2.1 4.3 1.4 5.8 1.1 1.4 2.8 1.9 4.7 1.9 3.4 0 5.3-2.2 5.3-2.2l-.2 1c-.1.4.2.8.7.8h3.8c.6 0 1.1-.4 1.2-1l2.3-14.7c.1-.4-.2-.8-.8-.8zm-5.9 7.4c-.4 2.1-2 3.5-4.2 3.5-1.1 0-1.9-.4-2.5-1-.5-.7-.7-1.6-.5-2.6.3-2.1 2-3.5 4.2-3.5 1.1 0 1.9.3 2.4 1 .6.6.8 1.5.6 2.6z" fill="#009CDE" />
                                <path d="M124 7.3l-3.6 22.9c-.1.4.2.8.7.8h3.6c.6 0 1.1-.4 1.2-1L129.4 7c.1-.4-.2-.8-.7-.8h-4c-.3 0-.6.5-.7 1.1z" fill="#009CDE" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
