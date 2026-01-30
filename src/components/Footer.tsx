'use client';

import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full bg-zinc-950 text-white pt-20 pb-8">
            <div className="max-w-[1920px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand Column */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-3xl font-black uppercase tracking-tighter">SECONDSKIN</h2>
                        <p className="text-zinc-400 max-w-sm text-sm leading-relaxed">
                            Engineered for those who demand more. We exist to unite the conditioning community.
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
                        { title: "Help", links: ["FAQ", "Delivery Information", "Returns Policy", "Make A Return", "Orders"] },
                        { title: "My Account", links: ["Login", "Register", "My Wishlist", "My Orders"] },
                        { title: "Pages", links: ["Gymshark Central", "About Us", "Careers", "Transparency"] }
                    ].map((col) => (
                        <div key={col.title}>
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
                        © 2026 SecondSkinStyle Ltd. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        {['pay_visa', 'pay_mastercard', 'pay_amex', 'pay_paypal'].map((payment) => (
                            <div key={payment} className="w-10 h-6 bg-zinc-800 rounded flex items-center justify-center text-[10px] text-zinc-500">
                                {/* Placeholder for payment icons */}
                                CARD
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
