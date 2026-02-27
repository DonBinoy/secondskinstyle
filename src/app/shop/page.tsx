'use client';

import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { Suspense } from 'react';

function ShopContent() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const subcategoryFilter = searchParams.get('subcategory');

    const filteredProducts = subcategoryFilter
        ? PRODUCTS.filter(p => p.subcategory?.toLowerCase() === subcategoryFilter.toLowerCase())
        : PRODUCTS;

    return (
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 pt-32 pb-20">
            <div className="mb-16">
                <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter mb-4 uppercase">
                    {subcategoryFilter ? subcategoryFilter : t('shop.title')}
                </h1>
                <p className="text-neutral-500 font-medium tracking-[0.2em] uppercase text-xs">
                    {subcategoryFilter ? `Shop our latest ${subcategoryFilter} collection` : t('shop.essential')}
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
                {filteredProducts.map((product) => (
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

            {filteredProducts.length === 0 && (
                <div className="py-20 text-center">
                    <p className="text-neutral-400">No products found for this category.</p>
                </div>
            )}
        </div>
    );
}

export default function ShopAllPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar solid />
            <Suspense fallback={<div className="pt-32 px-12 text-black">Loading...</div>}>
                <ShopContent />
            </Suspense>
            <Footer />
        </main>
    );
}
