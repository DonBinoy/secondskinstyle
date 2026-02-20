'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, User, Menu } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

export default function Navbar({ solid = false }: { solid?: boolean }) {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(solid);
    const [hidden, setHidden] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const { cartCount } = useCart();

    // Force scrolled state if solid prop is true
    const isVisibleBg = solid || scrolled;
    const textColor = isVisibleBg ? "text-black" : "text-white";
    const borderColor = isVisibleBg ? "border-neutral-100" : "border-transparent";
    const bgColor = isVisibleBg ? "bg-white/90 backdrop-blur-xl" : "bg-transparent";

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;

        // Hide on scroll down, show on scroll up
        if (latest > previous && latest > 150) {
            setHidden(true);
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

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
                "fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-500",
                bgColor,
                isVisibleBg ? "border-b shadow-sm" : "",
                borderColor
            )}
        >
            {/* Left: Mobile Menu & Logo */}
            <div className="flex items-center gap-6">
                <button className="lg:hidden p-2 -ml-2">
                    <Menu className={cn("w-6 h-6", textColor)} />
                </button>
                <Link href="/" className={cn("text-xl md:text-2xl font-semibold tracking-[-0.05em] leading-none", textColor)}>
                    SecondSkin<span className="text-neutral-300">Style</span>
                </Link>
            </div>

            {/* Center: Links (Desktop) */}
            <div className={cn("hidden lg:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.3em]", textColor)}>
                {[
                    {
                        label: 'Men',
                        href: '/men',
                        dropdown: [
                            { label: 'Tanktop', href: '/men/performance' },
                            { label: 'Roundneck', href: '/men/training' },
                            { label: 'Shorts', href: '/men/shorts' }
                        ]
                    },
                    {
                        label: 'Women',
                        href: '/women',
                        dropdown: [
                            { label: 'Tanktop', href: '/women/seamless' },
                            { label: 'Roundneck', href: '/women/training' },
                            { label: 'Shorts', href: '/women/shorts' },
                            { label: 'Skirts', href: '/women/skirts' }
                        ]
                    },
                    { label: 'Shop All', href: '/shop' },
                    { label: 'Business', href: '/business' }
                ].map((item) => (
                    <div
                        key={item.label}
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
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                                >
                                    <div className="bg-white/95 backdrop-blur-md border border-neutral-100 shadow-xl p-6 min-w-[200px] flex flex-col gap-4 text-black">
                                        {item.dropdown.map((sub) => (
                                            <Link
                                                key={sub.label}
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
            <div className={cn("flex items-center gap-3 md:gap-5", textColor)}>
                <button className="p-2 hover:opacity-40 transition-opacity">
                    <Search className="w-5 h-5 stroke-[1.5]" />
                </button>
                <Link href="/cart" className="p-2 hover:opacity-40 transition-opacity relative group">
                    <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-[10px] flex items-center justify-center rounded-full font-bold tracking-tighter shadow-xl ring-2 ring-white group-hover:scale-110 transition-transform">
                            {cartCount}
                        </span>
                    )}
                </Link>
                <button className="lg:hover:opacity-40 transition-opacity p-2">
                    <User className="w-5 h-5 stroke-[1.5]" />
                </button>
            </div>
        </motion.nav>
    );
}
