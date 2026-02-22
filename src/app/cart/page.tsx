'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck, Truck, RefreshCw, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-white selection:bg-black selection:text-white">
            <Navbar solid />

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-40 pb-32">
                {/* Simplified Header */}
                <div className="flex flex-col mb-16 border-b border-neutral-100 pb-12">
                    <nav className="flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-6">
                        <Link href="/" className="hover:text-black transition-colors">{t('cart.home')}</Link>
                        <ChevronRight className="w-3 h-3 mx-3 opacity-20" />
                        <span className="text-black">{t('cart.title')}</span>
                    </nav>
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6">
                        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
                            {t('cart.title')}
                        </h1>
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                            {cartCount} {cartCount === 1 ? t('cart.item') : t('cart.items')} {t('cart.setCheckout')}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col xl:flex-row gap-16 items-start">
                    {/* Left: Cart Items List */}
                    <div className="w-full xl:flex-1">
                        <AnimatePresence mode="popLayout">
                            {cart.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="py-40 flex flex-col items-start justify-center text-left"
                                >
                                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-200 mb-10 leading-none">
                                        {t('cart.emptyInventory').split('. ').map((line: string, i: number) => (
                                            <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
                                        ))}
                                    </h2>
                                    <Link href="/shop" className="group flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.3em] bg-black text-white px-12 py-6 hover:bg-neutral-800 transition-all shadow-2xl">
                                        {t('cart.beginJourney')} <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                                    </Link>
                                </motion.div>
                            ) : (
                                <div className="flex flex-col">
                                    {cart.map((item, i) => (
                                        <motion.div
                                            key={`${item.id}-${item.size}-${item.color}`}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.98 }}
                                            className="py-8 md:py-12 flex flex-row gap-6 md:gap-12 items-center border-b border-neutral-100 group"
                                        >
                                            {/* Compact Product Image */}
                                            <div className="relative w-24 h-32 md:w-48 md:h-64 bg-neutral-50 shrink-0 overflow-hidden rounded-sm border border-neutral-100">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                                />
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-1 min-w-0 h-full flex flex-col justify-between py-1">
                                                <div className="flex flex-col gap-3 md:gap-6">
                                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                                                        <h3 className="text-lg md:text-2xl font-bold tracking-tight text-neutral-900 line-clamp-1">
                                                            {item.name}
                                                        </h3>
                                                        <p className="font-bold text-base md:text-xl tracking-tight">
                                                            {item.currency}{item.price.toFixed(2)}
                                                        </p>
                                                    </div>

                                                    <div className="flex gap-6 md:gap-10 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                                                        <div className="flex flex-row md:flex-col gap-2 md:gap-1.5 items-center md:items-start">
                                                            <span className="opacity-50">Color</span>
                                                            <span className="text-black">{item.color}</span>
                                                        </div>
                                                        <div className="flex flex-row md:flex-col gap-2 md:gap-1.5 items-center md:items-start">
                                                            <span className="opacity-50">Size</span>
                                                            <span className="text-black">{item.size}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mt-4 md:mt-auto md:pt-10">
                                                    {/* Compact Quantity Selector */}
                                                    <div className="flex items-center border border-neutral-200 h-10 md:h-12 bg-white rounded-full px-1 md:px-2">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                                                            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-neutral-50 rounded-full transition-colors"
                                                        >
                                                            <Minus className="w-2.5 h-2.5 md:w-3 md:h-3" />
                                                        </button>
                                                        <span className="w-8 md:w-12 text-center font-bold text-xs md:text-sm">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                                                            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-neutral-50 rounded-full transition-colors"
                                                        >
                                                            <Plus className="w-2.5 h-2.5 md:w-3 md:h-3" />
                                                        </button>
                                                    </div>

                                                    {/* Compact Remove Button */}
                                                    <button
                                                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                                                        className="flex items-center gap-2 md:gap-3 text-neutral-300 hover:text-black transition-all group/remove"
                                                    >
                                                        <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover/remove:opacity-100 transition-opacity hidden sm:block">Remove</span>
                                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-neutral-100 flex items-center justify-center group-hover/remove:bg-neutral-50 group-hover/remove:border-black transition-all">
                                                            <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right: Elegant Order Summary */}
                    <div className="w-full xl:w-[420px]">
                        <div className="sticky top-40">
                            <div className="bg-white border border-neutral-100 p-6 md:p-12 shadow-sm">
                                <h2 className="text-xl font-bold tracking-tight mb-8 md:mb-10 pb-6 border-b border-neutral-100">
                                    {t('cart.summary')}
                                </h2>

                                <div className="space-y-4 md:space-y-6 mb-10 md:mb-12">
                                    <div className="flex justify-between items-start text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                                        <span className="shrink-0">{t('cart.subtotal')}</span>
                                        <span className="text-sm text-black ml-4">€{cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-start text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                                        <span className="shrink-0">{t('cart.shipping')}</span>
                                        <span className="text-xs md:text-sm text-[#00a651] ml-4 text-right">{t('cart.shipping_note')}</span>
                                    </div>
                                    <div className="flex justify-between items-start text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                                        <span className="shrink-0">{t('cart.taxes')}</span>
                                        <span className="text-sm text-black ml-4">€{(cartTotal * 0.2).toFixed(2)}</span>
                                    </div>

                                    <div className="pt-6 md:pt-8 border-t border-neutral-100 flex justify-between items-baseline">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">{t('cart.total')}</span>
                                        <span className="text-3xl md:text-4xl font-bold tracking-tighter">
                                            €{cartTotal.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    disabled={cart.length === 0}
                                    className="w-full bg-black text-white h-14 md:h-16 font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-neutral-800 transition-all flex items-center justify-center gap-4 disabled:opacity-30 disabled:cursor-not-allowed group"
                                >
                                    Proceed to Checkout
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>

                                <div className="mt-8 md:mt-10 flex flex-col gap-4 md:gap-5 pt-8 md:pt-10 border-t border-neutral-50">
                                    {[
                                        { icon: ShieldCheck, text: "Secure encypted payments" },
                                        { icon: Truck, text: "Priority express logistics" },
                                        { icon: RefreshCw, text: "30-Day satisfaction period" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-300">
                                            <item.icon className="w-4 h-4 shrink-0" /> <span className="line-clamp-1">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Minimal Assistance */}
                            <div className="mt-6 p-8 bg-neutral-50/50 border border-neutral-100 rounded-sm">
                                <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-900 mb-3">Questions?</h4>
                                <p className="text-[10px] text-neutral-400 leading-relaxed font-medium uppercase tracking-[0.1em]">
                                    Our support team is available mon-fri. <br />
                                    <Link href="#" className="text-black border-b border-black pb-0.5 mt-2 inline-block hover:opacity-50 transition-all font-bold">Contact Concierge</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
