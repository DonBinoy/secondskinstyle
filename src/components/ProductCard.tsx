'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ProductCardProps {
    name: string;
    price: string;
    originalPrice?: string;
    discount?: string;
    image?: string;
    className?: string;
    tag?: string; // e.g. "NEW"
}

export default function ProductCard({ name, price, originalPrice, discount, image, tag, className }: ProductCardProps) {
    return (
        <div className={cn("flex flex-col group cursor-pointer", className)}>
            {/* Image Container */}
            <div className="relative w-full aspect-[4/5] bg-neutral-100 mb-4 overflow-hidden">
                {/* Badges */}
                <div className="absolute left-2 bottom-2 z-10 flex flex-col gap-2">
                    {tag && (
                        <span className="px-2 py-1 text-xs font-bold tracking-wider text-black uppercase bg-white">
                            {tag}
                        </span>
                    )}
                    {discount && (
                        <span className="px-2 py-1 text-xs font-bold tracking-wider text-white uppercase bg-red-600">
                            {discount}
                        </span>
                    )}
                </div>

                {/* Heart Icon (Wishlist) */}
                <button className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-white/50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-neutral-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </button>

                {/* Image */}
                {image ? (
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 bg-neutral-200" />
                )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-1">
                <h3 className="text-base font-medium text-neutral-800 group-hover:underline decoration-1 underline-offset-4">
                    {name}
                </h3>
                <p className="text-sm text-neutral-500">
                    Carmine Red
                </p>
                <div className="flex items-center gap-3 mt-1">
                    <p className="text-base font-semibold text-black">
                        {price}
                    </p>
                    {originalPrice && (
                        <p className="text-sm font-normal text-neutral-400 line-through">
                            {originalPrice}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
