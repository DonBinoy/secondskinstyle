'use client';

import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function ShopAllPage() {
    const { t } = useLanguage();
    return (
        <main className="min-h-screen bg-white">
            <Navbar solid />

            <div className="max-w-[1920px] mx-auto px-6 md:px-12 pt-32 pb-20">
                <div className="mb-16">
                    <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter mb-4">
                        {t('shop.title')}
                    </h1>
                    <p className="text-neutral-500 font-medium tracking-[0.2em] uppercase text-xs">
                        {t('shop.essential')}
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
                    {PRODUCTS.map((product) => (
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
            </div>

            <Footer />
        </main>
    );
}
