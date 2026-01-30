'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { ShoppingBag, Search, User, Menu } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Navbar() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }

        if (latest > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={cn(
                "fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300",
                scrolled ? "bg-white/80 backdrop-blur-md border-b border-zinc-100" : "bg-transparent text-white"
            )}
        >
            {/* Left: Mobile Menu & Logo */}
            <div className="flex items-center gap-4">
                <button className="lg:hidden p-2">
                    <Menu className={cn("w-6 h-6", scrolled ? "text-black" : "text-white")} />
                </button>
                <Link href="/" className={cn("text-2xl font-black tracking-tighter uppercase", scrolled ? "text-black" : "text-white")}>
                    SECONDSKINSTYLE
                </Link>
            </div>

            {/* Center: Links (Desktop) */}
            <div className={cn("hidden lg:flex items-center gap-8 font-medium text-sm tracking-wide uppercase", scrolled ? "text-black" : "text-white/90")}>
                {['Women', 'Men', 'Accessories', 'New Arrivals', 'Community'].map((link) => (
                    <Link key={link} href="#" className="relative group overflow-hidden">
                        <span className="relative z-10">{link}</span>
                        <span className={cn("absolute bottom-0 left-0 w-full h-[1px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left", scrolled ? "bg-black" : "bg-white")} />
                    </Link>
                ))}
            </div>

            {/* Right: Icons */}
            <div className={cn("flex items-center gap-4", scrolled ? "text-black" : "text-white")}>
                <button className="p-2 hover:opacity-70 transition-opacity">
                    <Search className="w-5 h-5" />
                </button>
                <button className="hidden sm:block p-2 hover:opacity-70 transition-opacity">
                    <User className="w-5 h-5" />
                </button>
                <button className="p-2 hover:opacity-70 transition-opacity relative">
                    <ShoppingBag className="w-5 h-5" />
                    <span className="absolute top-1 right-0 w-2 h-2 bg-red-500 rounded-full" />
                </button>
            </div>
        </motion.nav>
    );
}
