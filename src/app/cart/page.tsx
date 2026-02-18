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

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

    return (
        <main className="min-h-screen bg-white selection:bg-black selection:text-white">
            <Navbar solid />

            <div className="max-w-[1600px] mx-auto px-4 md:px-10 pt-40 pb-32">
                {/* Clean Header */}
                <div className="flex flex-col mb-16">
                    <nav className="flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-6">
                        <Link href="/" className="hover:text-black transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3 mx-3 opacity-20" />
                        <span className="text-black">Shopping Cart</span>
                    </nav>
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 border-b border-neutral-100 pb-10">
                        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-none">
                            Your Bag
                        </h1>
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400">
                            {cartCount} {cartCount === 1 ? 'Item' : 'Items'} selected
                        </span>
                    </div>
                </div>

                <div className="flex flex-col xl:flex-row gap-16 items-start">
                    {/* Left: Cart Items List */}
                    <div className="w-full xl:flex-1">
                        <AnimatePresence mode="popLayout">
                            {cart.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="py-32 flex flex-col items-center justify-center text-center border border-neutral-100 bg-neutral-50/50"
                                >
                                    <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-6">
                                        <ShoppingBag className="w-6 h-6 text-neutral-300" />
                                    </div>
                                    <h2 className="text-xl font-semibold tracking-tight text-neutral-400 mb-8">Your bag is currently empty</h2>
                                    <Link href="/" className="group flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] bg-black text-white px-10 py-5 hover:bg-neutral-800 transition-all shadow-xl">
                                        Shop Collections <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </motion.div>
                            ) : (
                                <div className="flex flex-col border-t border-neutral-100">
                                    {cart.map((item) => (
                                        <motion.div
                                            key={`${item.id}-${item.size}-${item.color}`}
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            className="py-12 flex flex-col md:flex-row gap-12 items-start md:items-center border-b border-neutral-100 group"
                                        >
                                            {/* Product Image */}
                                            <div className="relative w-full md:w-44 h-56 bg-neutral-50 shrink-0 overflow-hidden border border-neutral-100">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                                />
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-1 min-w-0 h-full flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start mb-6">
                                                        <h3 className="text-3xl font-semibold tracking-tight leading-none group-hover:text-neutral-700 transition-colors">
                                                            {item.name}
                                                        </h3>
                                                        <p className="font-bold text-2xl tracking-tighter">
                                                            {item.currency}{item.price.toFixed(2)}
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-8 text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-300 mb-10">
                                                        <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-black rounded-full" /> COLOR: <span className="text-black">{item.color}</span></span>
                                                        <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-black rounded-full" /> SIZE: <span className="text-black">{item.size}</span></span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center border border-neutral-200 h-14 px-6 gap-10">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                                                            className="p-1 hover:text-neutral-400 transition-colors"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="font-bold text-lg w-6 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                                                            className="p-1 hover:text-neutral-400 transition-colors"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>

                                                    {/* Remove Action */}
                                                    <button
                                                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                                                        className="flex items-center gap-3 text-neutral-300 hover:text-black transition-all group/remove"
                                                    >
                                                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-0 group-hover/remove:opacity-100 transition-opacity">Delete item</span>
                                                        <div className="w-12 h-12 rounded-full border border-neutral-100 flex items-center justify-center group-hover/remove:border-black transition-all">
                                                            <Trash2 className="w-5 h-5" />
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
                    <div className="w-full xl:w-[450px]">
                        <div className="sticky top-40">
                            <div className="bg-black text-white p-12 md:p-16 relative overflow-hidden shadow-2xl">
                                {/* Subtle Background Accents */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

                                <h2 className="text-2xl font-semibold tracking-tight mb-12 relative z-10 border-b border-white/10 pb-6">
                                    Order Summary
                                </h2>

                                <div className="space-y-8 mb-16 relative z-10">
                                    <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-[0.3em] opacity-40">
                                        <span>Merchandise Subtotal</span>
                                        <span className="text-sm">€{cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-[0.3em] opacity-40">
                                        <span>Shipping & Handling</span>
                                        <span className="text-sm text-[#ccff00]">Complimentary</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-[0.3em] opacity-40">
                                        <span>Estimated Sales Tax</span>
                                        <span className="text-sm">€{(cartTotal * 0.2).toFixed(2)}</span>
                                    </div>

                                    <div className="pt-10 border-t border-white/20 flex justify-between items-baseline">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">Total Amount</span>
                                        <span className="text-5xl font-bold tracking-tighter">
                                            €{cartTotal.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    disabled={cart.length === 0}
                                    className="w-full bg-white text-black h-20 font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-[#ccff00] transition-all duration-500 flex items-center justify-center gap-4 disabled:opacity-10 disabled:grayscale disabled:cursor-not-allowed group relative z-10 shadow-xl"
                                >
                                    Proceed to Checkout
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                                </button>

                                <div className="mt-12 flex flex-col gap-6 relative z-10 opacity-30">
                                    <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest">
                                        <ShieldCheck className="w-4 h-4" /> Secure SSL payment encrypted
                                    </div>
                                    <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest">
                                        <Truck className="w-4 h-4" /> Priority express transit included
                                    </div>
                                    <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest">
                                        <RefreshCw className="w-4 h-4" /> 30-day satisfaction guarantee
                                    </div>
                                </div>
                            </div>

                            {/* Promotional/Help section */}
                            <div className="mt-8 p-10 border border-neutral-100 flex flex-col gap-6 bg-neutral-50/30">
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em]">Need Assistance?</h4>
                                <p className="text-[10px] text-neutral-400 leading-loose font-bold uppercase tracking-widest">
                                    Our concierge team is available to help with your selection. <br />
                                    <Link href="#" className="text-black border-b border-black pb-0.5 mt-4 inline-block hover:opacity-50 transition-opacity">Contact Support</Link>
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
