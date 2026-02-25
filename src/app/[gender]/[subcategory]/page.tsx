'use client';

import { use } from 'react';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function FilteredListingPage({ params }: { params: Promise<{ gender: string; subcategory: string }> }) {
    const { gender, subcategory } = use(params);

    const capitalizedGender = gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();

    const products = PRODUCTS.filter(p =>
        p.gender?.toLowerCase() === gender.toLowerCase() &&
        p.subcategory?.toLowerCase() === subcategory.toLowerCase()
    );

    return (
        <main className="min-h-screen bg-white">
            <Navbar solid />

            <div className="max-w-[1920px] mx-auto px-6 md:px-12 pt-36 md:pt-32 pb-20">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-8">
                    <Link href="/" className="hover:text-black transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3 opacity-30" />
                    <Link href={`/${gender}`} className="hover:text-black transition-colors">{capitalizedGender}</Link>
                    <ChevronRight className="w-3 h-3 opacity-30" />
                    <span className="text-black">{subcategory}</span>
                </nav>

                <div className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-2 uppercase">
                        {capitalizedGender}'s {subcategory}
                    </h1>
                    <p className="text-neutral-500 font-medium tracking-[0.2em] uppercase text-xs">
                        {products.length} Products Found
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
                    {products.map((product) => (
                        <Link key={product.id} href={`/product/${product.id}`}>
                            <ProductCard
                                name={product.name}
                                price={`${product.currency}${product.price.toFixed(2)}`}
                                originalPrice={product.originalPrice ? `${product.currency}${product.originalPrice.toFixed(2)}` : undefined}
                                discount={product.discount}
                                image={product.image}
                                tag={product.tag}
                            />
                        </Link>
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-neutral-400 font-light text-lg">No products found in this category.</p>
                        <Link href="/shop" className="inline-block mt-6 text-xs font-black uppercase tracking-widest border-b border-black pb-1">
                            Browse All Products
                        </Link>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
