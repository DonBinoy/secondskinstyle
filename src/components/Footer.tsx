'use client';

import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

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
                            {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-white hover:text-black transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    {[
                        { title: t('footer.shop'), links: ["Shorts", "Tops", "Pants", "Headwear", "Accessories"] },
                        { title: t('footer.help'), links: ["FAQ", "Delivery", "Return Policy", "Register A Return", "Contact Us", "Payment Options"] }
                    ].map((col) => (
                        <div key={col.title} className="col-span-1">
                            <h3 className="text-base font-bold uppercase tracking-wide mb-6">{col.title}</h3>
                            <ul className="flex flex-col gap-3">
                                {col.links.map(link => (
                                    <li key={link}>
                                        <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-zinc-500">
                        © 2026 SecondSkinStyle Ltd. {t('footer.rights')}
                    </p>
                    <div className="flex gap-4">
                        {['pay_visa', 'pay_mastercard', 'pay_amex', 'pay_paypal'].map((payment) => (
                            <div key={payment} className="w-10 h-6 bg-zinc-800 rounded flex items-center justify-center text-[10px] text-zinc-500">
                                {/* Placeholder for payment icons */}
                                CARDs
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
