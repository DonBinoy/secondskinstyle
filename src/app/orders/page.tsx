'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, PackageOpen } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function OrdersPage() {
    const { orders } = useCart();
    const { language } = useLanguage();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <main className="min-h-screen bg-white selection:bg-black selection:text-white">
            <Navbar solid />

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-48 md:pt-40 pb-32 tracking-[0.02em]">
                {/* Header Section */}
                <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12 border-b-2 border-neutral-100 pb-16">
                    <div className="flex flex-col gap-6">
                        <nav className="flex items-center text-[10px] font-medium tracking-[0.1em] text-neutral-400">
                            <Link href="/" className="hover:text-black transition-colors underline-offset-4 hover:underline">Home</Link>
                            <ChevronRight className="w-3 h-3 mx-3 opacity-20" />
                            <span className="text-black">My Orders</span>
                        </nav>
                        <h1 className="text-6xl md:text-9xl font-bold tracking-tight text-neutral-900 leading-tight">
                            ORDERS
                        </h1>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2 text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                        <span>Total Orders</span>
                        <div className="flex items-center gap-4 text-black italic">
                            <span className="text-5xl font-black leading-none">{orders.length}</span>
                        </div>
                    </div>
                </header>

                {orders.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-60 flex flex-col items-center justify-center text-center max-w-xl mx-auto"
                    >
                        <div className="relative w-32 h-32 mb-12 text-neutral-200">
                            <PackageOpen className="w-full h-full stroke-[1px]" />
                        </div>
                        <p className="text-lg font-medium text-neutral-500 mb-12">
                            You haven't placed any orders yet.
                        </p>
                        <Link href="/shop" className="group flex items-center justify-center gap-6 text-sm font-bold bg-black text-white px-12 py-5 hover:bg-neutral-800 transition-all">
                            Start Shopping <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                        </Link>
                    </motion.div>
                ) : (
                    <div className="flex flex-col gap-24">
                        {orders.map((order, orderIdx) => (
                            <motion.section
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: orderIdx * 0.05, duration: 0.8 }}
                                className="group flex flex-col"
                            >
                                {/* Order Metadata Bar */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 pb-6 border-b border-neutral-100 group-hover:border-black transition-colors duration-500">
                                    <div className="flex flex-wrap items-center gap-x-12 gap-y-4">
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Order ID</span>
                                            <span className="text-base font-bold font-mono text-neutral-900">{order.id}</span>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Date</span>
                                            <span className="text-sm font-semibold text-neutral-900">{formatDate(order.date)}</span>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Status</span>
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-2 h-2 rounded-full bg-black group-hover:bg-[#ccff00] transition-colors shadow-sm" />
                                                <span className="text-xs font-bold capitalize">{order.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start md:items-end gap-1.5">
                                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Total</span>
                                        <span className="text-4xl font-black text-neutral-900 tracking-tight">€{order.total.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Items List */}
                                <div className="flex flex-col gap-2">
                                    {order.items.map((item) => (
                                        <div
                                            key={`${item.id}-${item.size}-${item.color}`}
                                            className="grid grid-cols-1 md:grid-cols-12 items-center gap-10 p-8 bg-neutral-50/50 hover:bg-neutral-100 transition-all duration-300"
                                        >
                                            {/* Product Preview */}
                                            <div className="md:col-span-2 relative aspect-[4/5] bg-white overflow-hidden shadow-sm group/img rounded-sm">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover/img:scale-110"
                                                />
                                            </div>

                                            {/* Name */}
                                            <div className="md:col-span-4 flex flex-col gap-1.5">
                                                <span className="text-[9px] font-bold text-neutral-300 uppercase tracking-widest">Product</span>
                                                <h3 className="text-xl font-bold tracking-tight text-neutral-900 truncate">
                                                    {item.name}
                                                </h3>
                                            </div>

                                            {/* Details */}
                                            <div className="md:col-span-4 flex flex-col gap-2">
                                                <span className="text-[9px] font-bold text-neutral-300 uppercase tracking-widest">Details</span>
                                                <div className="flex gap-10 text-[11px] font-semibold text-neutral-900">
                                                    <div className="flex flex-col">
                                                        <span className="text-[9px] text-neutral-400 uppercase tracking-widest mb-1">Size</span>
                                                        <span>{item.size}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[9px] text-neutral-400 uppercase tracking-widest mb-1">Color</span>
                                                        <span className="capitalize">{item.color}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[9px] text-neutral-400 uppercase tracking-widest mb-1">Quantity</span>
                                                        <span>{item.quantity}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Unit Price */}
                                            <div className="md:col-span-2 flex flex-col items-start md:items-end gap-1.5">
                                                <span className="text-[9px] font-bold text-neutral-300 uppercase tracking-widest">Price</span>
                                                <span className="text-lg font-black text-neutral-900 underline underline-offset-4 decoration-neutral-200 decoration-2">
                                                    €{item.price.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        ))}
                    </div>
                )}

                {/* Simplified Assistance Footer */}
                <footer className="mt-32 pt-24 border-t border-neutral-100 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="text-center md:text-left">
                        <h4 className="text-sm font-bold text-neutral-900 mb-2 uppercase tracking-widest">Need help with an order?</h4>
                        <p className="text-xs text-neutral-400 font-medium">
                            If you have any questions regarding your purchase, please contact our support team.
                        </p>
                    </div>
                    <Link href="#" className="flex items-center gap-4 text-xs font-black uppercase tracking-widest bg-black text-white px-10 py-5 hover:bg-neutral-800 transition-all">
                        Contact Support <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </footer>
            </div>

            <Footer />
        </main>
    );
}
