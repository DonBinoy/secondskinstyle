'use client';

import { use } from 'react';
import { PRODUCTS } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import CustomLink from 'next/link';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function CategoryLandingPage({ params }: { params: Promise<{ gender: string }> }) {
    const { gender } = use(params);
    const { t } = useLanguage();
    const capitalizedGender = gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();

    // Filter subcategories for this gender
    const subcategories = Array.from(new Set(
        PRODUCTS.filter(p => p.gender === capitalizedGender)
            .map(p => p.subcategory)
    )).filter(Boolean);

    // Mock images for subcategories (using existing ones or placeholders)
    const subcategoryImages: Record<string, string> = {
        'Tanktop': '/image/airpulseseamless.png',
        'Roundneck': '/image/trainingtee.png',
        'Shorts': '/image/flexshort.png',
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar solid />

            <div className="max-w-[1920px] mx-auto px-6 md:px-12 pt-32 pb-20">
                <div className="mb-16">
                    <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter mb-4">
                        {gender.toLowerCase() === 'men' ? t('nav.men') : t('nav.women')}
                    </h1>
                    <p className="text-neutral-500 font-medium tracking-[0.2em] uppercase text-xs">
                        {t('category.select')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {subcategories.map((sub) => (
                        <CustomLink
                            key={sub}
                            href={`/${gender.toLowerCase()}/${sub.toLowerCase()}`}
                            className="group relative aspect-[4/5] overflow-hidden bg-neutral-100 flex items-center justify-center"
                        >
                            <Image
                                src={subcategoryImages[sub] || '/image/product/product1.jpg'}
                                alt={sub}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                            <div className="relative z-10 text-center">
                                <h2 className="text-3xl font-bold text-white uppercase tracking-tighter mb-2">
                                    {sub}
                                </h2>
                                <span className="text-white/80 text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                                    {t('category.viewProducts')} <ChevronRight className="w-3 h-3" />
                                </span>
                            </div>
                        </CustomLink>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
