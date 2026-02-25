'use client';

import { useState, use, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Star, ArrowRight, Truck, ShieldCheck, RefreshCw, Box, Image as ImageIcon, ChevronRight, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PRODUCTS } from '@/data/products';
import ModelViewer from '@/components/ModelViewer';
import SizeGuideDrawer from '@/components/SizeGuideDrawer';
import ProductFeatures from '@/components/ProductFeatures';
import LifestyleGrid from '@/components/LifestyleGrid';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

const getColorClass = (color: string) => {
    const map: Record<string, string> = {
        "Black": "bg-black",
        "White": "bg-white border border-neutral-200",
        "Navy": "bg-blue-900",
        "Grey": "bg-neutral-500",
        "Red": "bg-red-600",
        "Pink": "bg-pink-500",
        "Green": "bg-green-600",
        "Neon Green": "bg-[#ccff00]",
        "Lavender": "bg-purple-300",
        "Mint": "bg-teal-200",
        "Graphite": "bg-neutral-700",
        "Midnight Blue": "bg-[#191970]",
        "Blue": "bg-blue-600"
    };
    return map[color] || "bg-black";
};

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { t } = useLanguage();
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) {
        return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
    }

    // States
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || '');
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [show3D, setShow3D] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showSizeGuide, setShowSizeGuide] = useState(false);

    const { addToCart } = useCart();
    const router = useRouter();

    // Get recommended products (2 items)
    const recommendedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 2);

    const handleQuantity = (type: 'inc' | 'dec') => {
        if (type === 'dec' && quantity > 1) setQuantity(q => q - 1);
        if (type === 'inc') setQuantity(q => q + 1);
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            const error = document.getElementById('size-error');
            if (error) error.classList.remove('hidden');
            return;
        }

        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            currency: product.currency || '$',
            image: product.image,
            size: selectedSize,
            color: selectedColor,
            quantity: quantity
        });

        setShowPopup(true);
    };

    const handleBuyNow = () => {
        if (!selectedSize) {
            const error = document.getElementById('size-error');
            if (error) error.classList.remove('hidden');
            return;
        }

        handleAddToCart();
        router.push('/cart');
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar solid />

            <div className="max-w-[1920px] mx-auto px-4 md:px-10 pt-32 pb-10 md:pt-32 md:pb-20">
                {/* Top Breadcrumbs */}
                <nav className="flex items-center text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6 md:mb-12 overflow-hidden whitespace-nowrap">
                    <Link href="/" className="hover:text-black transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3 mx-2 opacity-30" />
                    <Link href="#" className="hover:text-black transition-colors">{product.category}</Link>
                    <ChevronRight className="w-3 h-3 mx-2 opacity-30" />
                    <span className="text-black">{product.name}</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
                    {/* Left: Image Gallery */}
                    <div className="w-full lg:w-3/5 flex flex-col gap-20">
                        {/* 1. Main Image */}
                        <div className="relative w-[95%] lg:w-[85%] mx-auto aspect-square bg-neutral-100 overflow-hidden group">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Product Details - Mobile Only */}
                        <div className="lg:hidden flex flex-col gap-6 px-4 py-4">
                            <div className="border-b border-neutral-100 pb-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex text-black">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-3 h-3 fill-black" />
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">128 Reviews</span>
                                </div>
                                <h1 className="text-3xl font-medium text-black mb-3 leading-tight tracking-tight">
                                    {product.name}
                                </h1>
                                <p className="text-2xl font-medium text-neutral-900 tracking-tight">
                                    {product.price.toFixed(2)} {product.currency}
                                </p>
                            </div>

                            {/* Size Selector Mobile */}
                            {product.sizes && (
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">{t('product.size')}</span>
                                        <button onClick={() => setShowSizeGuide(true)} className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 underline">{t('product.sizeGuide')}</button>
                                    </div>
                                    <div className="grid grid-cols-5 gap-2">
                                        {product.sizes.map((size) => (
                                            <button
                                                key={`mobile-${size}`}
                                                onClick={() => { setSelectedSize(size); document.getElementById('size-error-mobile')?.classList.add('hidden'); }}
                                                className={cn("h-12 border flex items-center justify-center text-[10px] font-bold transition-all duration-300", selectedSize === size ? "border-black bg-black text-white" : "border-neutral-100 text-black")}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-red-500 text-[9px] mt-3 font-bold uppercase tracking-widest hidden" id="size-error-mobile">{t('product.selectSizeError')}</p>
                                </div>
                            )}

                            <div className="flex flex-col gap-4">
                                <div className="flex gap-4">
                                    <div className="flex items-center border border-neutral-100 bg-white px-4 h-16 w-32 justify-between">
                                        <button onClick={() => handleQuantity('dec')} className="p-2 hover:opacity-50 transition-opacity"><Minus className="w-4 h-4" /></button>
                                        <span className="font-bold text-lg">{quantity}</span>
                                        <button onClick={() => handleQuantity('inc')} className="p-2 hover:opacity-50 transition-opacity"><Plus className="w-4 h-4" /></button>
                                    </div>
                                    <button
                                        onClick={() => { if (!selectedSize) { document.getElementById('size-error-mobile')?.classList.remove('hidden'); return; } handleAddToCart(); }}
                                        className="flex-1 h-16 bg-black text-white font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all active:scale-[0.98]"
                                    >
                                        {t('product.addToCart')}
                                    </button>
                                </div>
                                <button
                                    onClick={() => { if (!selectedSize) { document.getElementById('size-error-mobile')?.classList.remove('hidden'); return; } handleBuyNow(); }}
                                    className="w-full bg-neutral-100 hover:bg-neutral-200 text-black h-16 font-bold uppercase tracking-widest text-[11px] transition-all active:scale-[0.98]"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>

                        {/* 2. Description */}
                        <div className="flex flex-col gap-6 px-4 md:px-0 max-w-2xl">
                            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">{t('product.designNote')}</h3>
                            <p className="text-neutral-900 leading-relaxed font-light text-xl md:text-2xl">
                                "{product.description}"
                            </p>
                        </div>

                        {/* 3. Media Slider (1 Video, 2 Images) */}
                        <div className="flex flex-row gap-4 lg:gap-2 h-[60vh] lg:h-[80vh] min-h-[400px] lg:min-h-[500px] overflow-x-auto lg:overflow-hidden snap-x snap-mandatory hide-scrollbar pb-4 lg:pb-0 px-4 lg:px-0">
                            {product.video && (
                                <div className="relative flex-none w-[85vw] lg:flex-1 bg-neutral-100 snap-center rounded-sm overflow-hidden">
                                    <video src={product.video} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
                                </div>
                            )}
                            <div className="relative flex-none w-[85vw] lg:flex-1 bg-neutral-50 snap-center rounded-sm overflow-hidden">
                                <Image src={product.images?.[0] || product.image} alt="Front" fill className="object-cover" />
                            </div>
                            <div className="relative flex-none w-[85vw] lg:flex-1 bg-neutral-50 snap-center rounded-sm overflow-hidden">
                                <Image src={product.images?.[1] || product.image} alt="Back" fill className="object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Desktop Product Details */}
                    <div className="hidden lg:block w-full lg:w-2/5 lg:pr-10 xl:pr-20">
                        <div className="sticky top-32 flex flex-col gap-8">
                            <div className="border-b border-neutral-100 pb-6">
                                <Link href="#reviews" className="flex items-center gap-2 mb-3 group w-fit">
                                    <div className="flex text-black">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-black" />)}
                                    </div>
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 group-hover:text-black transition-colors">{t('product.reviewsCount')}</span>
                                </Link>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-black mb-3 leading-tight tracking-tight">{product.name}</h1>
                                <p className="text-2xl font-medium text-neutral-900 tracking-tight">{product.price.toFixed(2)} {product.currency}</p>
                                <p className="text-[10px] text-neutral-500 mt-1 font-medium">{t('product.taxesIncluded')}</p>
                            </div>

                            {/* Size Selector */}
                            {product.sizes && (
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">{t('product.size')}</span>
                                        <button onClick={() => setShowSizeGuide(true)} className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-black underline transition-colors">{t('product.sizeGuide')}</button>
                                    </div>
                                    <div className="grid grid-cols-5 gap-2">
                                        {product.sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => { setSelectedSize(size); document.getElementById('size-error')?.classList.add('hidden'); }}
                                                className={cn("h-14 border flex items-center justify-center text-xs font-bold transition-all duration-300", selectedSize === size ? "border-black bg-black text-white" : "border-neutral-100 text-black hover:border-black/30")}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-red-500 text-[10px] mt-4 font-bold uppercase tracking-widest hidden" id="size-error">{t('product.selectSizeError')}</p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex flex-col gap-4 mt-4">
                                <div className="flex gap-4">
                                    <div className="flex items-center border border-neutral-100 bg-white px-6 h-16 w-32 justify-between shadow-sm">
                                        <button onClick={() => handleQuantity('dec')} className="p-2 hover:opacity-50 transition-opacity"><Minus className="w-4 h-4" /></button>
                                        <span className="font-bold text-lg">{quantity}</span>
                                        <button onClick={() => handleQuantity('inc')} className="p-2 hover:opacity-50 transition-opacity"><Plus className="w-4 h-4" /></button>
                                    </div>
                                    <button onClick={handleAddToCart} className="flex-1 h-16 bg-black text-white font-bold uppercase tracking-[0.1em] text-xs hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98]">Add to Bag</button>
                                </div>
                                <button onClick={handleBuyNow} className="w-full bg-neutral-100 hover:bg-neutral-200 text-black h-16 font-bold uppercase tracking-[0.1em] text-xs transition-all duration-300 active:scale-[0.98]">Buy Now</button>
                            </div>

                            {/* Details Accordion */}
                            {product.details && (
                                <div className="border-t border-neutral-100 mt-10">
                                    <details className="group py-6 cursor-pointer" open>
                                        <summary className="flex items-center justify-between font-semibold uppercase tracking-[0.2em] text-[10px] list-none select-none">
                                            Product Details
                                            <Plus className="w-3 h-3 group-open:hidden" /><Minus className="w-3 h-3 hidden group-open:block" />
                                        </summary>
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="overflow-hidden">
                                            <ul className="mt-8 space-y-4 text-neutral-600 text-sm font-light pl-6">
                                                {product.details.map((detail, i) => (
                                                    <li key={i} className="flex items-center gap-4"><span className="w-1 h-1 bg-neutral-300 rounded-full" />{detail}</li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    </details>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Complete the Look Section */}
                <div className="mt-32 border-t border-neutral-100 pt-20">
                    <h3 className="font-bold uppercase tracking-[0.3em] text-[10px] mb-10 flex items-center gap-5">Complete the Look<div className="h-px bg-neutral-100 flex-1" /></h3>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-x-4 gap-y-8">
                        {recommendedProducts.map((rec) => (
                            <Link href={`/product/${rec.id}`} key={rec.id} className="group flex flex-col gap-6">
                                <div className="relative w-full aspect-[3/4] bg-neutral-50 overflow-hidden border border-neutral-100">
                                    <Image src={rec.image} alt={rec.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <div className="bg-white/90 backdrop-blur-sm px-4 py-3 text-[10px] font-black uppercase tracking-widest text-black transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                            View Product
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center text-center gap-1">
                                    <h4 className="font-medium text-sm uppercase tracking-tight group-hover:text-neutral-600 transition-colors">{rec.name}</h4>
                                    <p className="text-neutral-400 text-[9px] font-medium uppercase tracking-[0.2em]">{rec.subcategory}</p>
                                    <p className="font-medium text-sm tracking-tight text-neutral-900">{rec.currency}{rec.price.toFixed(2)}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div> {/* End of main container div */}

            <div className="mt-24">
                <ProductFeatures />
            </div>

            <LifestyleGrid />

            {/* Why this Fabric Video Section */}
            <div className="mt-20 mb-12 text-center">
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter">{t('product.whyFabric')}</h2>
            </div>
            <section className="relative w-full min-h-screen overflow-hidden bg-white flex flex-col lg:flex-row">
                <div className="w-full lg:w-2/5 p-10 md:p-16 lg:p-20 flex flex-col justify-center text-black">
                    <div className="flex flex-col gap-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">{product.category} {product.subcategory}</span>
                        <h2 className="text-4xl md:text-5xl font-medium leading-tight tracking-tighter">
                            {t('product.performanceInnovation')}
                        </h2>
                        <p className="text-base md:text-lg font-normal leading-relaxed text-neutral-800 max-w-md">
                            {t('product.engineeredPeak')}
                        </p>
                        <p className="text-base md:text-lg font-normal leading-relaxed text-neutral-800 max-w-md">
                            {t('product.designedAthletes')}
                        </p>
                    </div>
                </div>
                <div className="w-full lg:w-3/5 relative min-h-[60vh] lg:min-h-full">
                    <video src="/video/promo.mp4" autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
                </div>
            </section>

            {/* Reviews Section */}
            <section id="reviews" className="mt-20 max-w-6xl mx-auto border-y border-neutral-100 py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 font-black text-[150px] text-neutral-50 select-none pointer-events-none uppercase italic leading-none">{t('product.reviews')}</div>
                <div className="text-center mb-32 relative z-10">
                    <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-10 leading-none">{t('product.productReviews')}</h2>
                    <div className="flex flex-col items-center gap-6">
                        <div className="flex text-black gap-1.5">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-7 h-7 fill-black" />)}
                        </div>
                        <div className="flex items-center gap-6">
                            <span className="font-black text-6xl font-mono tracking-tighter italic">4.9</span>
                            <div className="text-left">
                                <div className="text-[10px] font-black uppercase tracking-[0.3em]">{t('product.verifiedScore')}</div>
                                <div className="text-neutral-400 text-[10px] uppercase font-bold tracking-widest mt-1">{t('product.basedOnReviews')}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 w-full overflow-hidden px-4 md:px-0">
                    {/* Desktop Grid / Mobile Auto-Slider */}
                    <div className="hidden md:grid md:grid-cols-3 gap-6">
                        {[
                            {
                                name: "Alex M.",
                                rating: 5,
                                title: "Game Changer",
                                content: "The fit is perfect and the quality is outstanding. I've never felt more confident during my workouts.",
                                date: "Feb 2026"
                            },
                            {
                                name: "Sarah K.",
                                rating: 5,
                                title: "Worth Every Penny",
                                content: "Premium quality that you can feel. Breathable, comfortable, and looks amazing. Highly recommended!",
                                date: "Feb 2026"
                            },
                            {
                                name: "Marcus T.",
                                rating: 5,
                                title: "Best Purchase",
                                content: "I've tried many brands but this is by far the best. The attention to detail is incredible.",
                                date: "Jan 2026"
                            },
                            {
                                name: "Jessica L.",
                                rating: 4,
                                title: "Excellent Quality",
                                content: "Love the design and fit. Only complaint is I wish I bought more colors!",
                                date: "Jan 2026"
                            },
                            {
                                name: "David R.",
                                rating: 5,
                                title: "Top Tier",
                                content: "Professional grade quality. The fabric technology really makes a difference in performance.",
                                date: "Dec 2025"
                            },
                            {
                                name: "Emily W.",
                                rating: 5,
                                title: "Obsessed",
                                content: "These have become my go-to for everything. Gym, running, even casual wear. So versatile!",
                                date: "Dec 2025"
                            }
                        ].map((review, idx) => (
                            <ReviewCard key={idx} review={review} />
                        ))}
                    </div>

                    {/* Mobile Auto-Slider */}
                    <div className="md:hidden">
                        <MobileReviewSlider reviews={[
                            {
                                name: "Alex M.",
                                rating: 5,
                                title: "Game Changer",
                                content: "The fit is perfect and the quality is outstanding. I've never felt more confident during my workouts.",
                                date: "Feb 2026"
                            },
                            {
                                name: "Sarah K.",
                                rating: 5,
                                title: "Worth Every Penny",
                                content: "Premium quality that you can feel. Breathable, comfortable, and looks amazing. Highly recommended!",
                                date: "Feb 2026"
                            },
                            {
                                name: "Marcus T.",
                                rating: 5,
                                title: "Best Purchase",
                                content: "I've tried many brands but this is by far the best. The attention to detail is incredible.",
                                date: "Jan 2026"
                            },
                            {
                                name: "Jessica L.",
                                rating: 4,
                                title: "Excellent Quality",
                                content: "Love the design and fit. Only complaint is I wish I bought more colors!",
                                date: "Jan 2026"
                            }
                        ]} />
                    </div>
                </div>

                <div className="mt-24 text-center">
                    <button className="bg-black text-white px-16 py-7 font-semibold tracking-[0.3em] text-[10px] hover:bg-neutral-800 transition-all duration-500 shadow-2xl">
                        {t('product.showAllReviews')}
                    </button>
                </div>
            </section>

            {/* Ecosystem Navigation */}
            <section className="mt-20 border-t border-neutral-100 pt-16 pb-20">
                <div className="max-w-[1920px] mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-start gap-10">
                    <div className="flex-1 w-full">
                        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-8">{t('product.exploreEcosystem')}</h2>
                        <div className="flex flex-col gap-10 md:flex-row w-full md:gap-32">
                            <div className="flex flex-col gap-4">
                                <span className="text-xs font-medium text-neutral-400">{t('product.categories')}</span>
                                <div className="flex flex-col gap-2">
                                    {['Men', 'Women'].map((cat) => (
                                        <Link key={cat} href="#" className="group flex items-center gap-3">
                                            <span className="text-2xl md:text-3xl font-medium tracking-tight text-neutral-900 group-hover:opacity-50 transition-opacity duration-300">{cat}</span>
                                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-neutral-900" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <span className="text-xs font-medium text-neutral-400">{t('product.subCategories')}</span>
                                <div className="flex flex-col gap-2">
                                    {['Tanktop', 'Roundneck', 'Shorts'].map((sub) => (
                                        <Link key={sub} href="#" className="group flex items-center gap-3">
                                            <span className="text-2xl md:text-3xl font-medium tracking-tight text-neutral-900 group-hover:opacity-50 transition-opacity duration-300">{sub}</span>
                                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-neutral-900" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-xs pt-8 md:text-right">
                        <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-[0.2em] leading-loose">
                            Engineered for movement. The {product.name} integrates seamlessly into your {product.subcategory} rotation within our {product.category} catalog.
                        </p>
                    </div>
                </div>
            </section>

            {/* Add to Cart Popup */}
            <AnimatePresence>
                {showPopup && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowPopup(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[500px] bg-white z-[101] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] p-10 md:p-14 text-center"
                        >
                            <button
                                onClick={() => setShowPopup(false)}
                                className="absolute top-6 right-6 p-2 hover:opacity-40 transition-opacity"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="w-20 h-20 rounded-full border border-green-500 flex items-center justify-center mx-auto mb-10">
                                <Check className="w-8 h-8 text-green-500" />
                            </div>

                            <h2 className="text-3xl font-semibold tracking-tighter mb-4">{t('product.addedToCart')}</h2>
                            <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-12">
                                {quantity}x {product.name} — {selectedSize} / {selectedColor}
                            </p>

                            <div className="flex flex-col gap-4">
                                <button
                                    onClick={() => router.push('/cart')}
                                    className="w-full bg-black text-white h-16 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center gap-3"
                                >
                                    {t('product.proceedToCart')}
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setShowPopup(false)}
                                    className="w-full border border-neutral-100 text-neutral-400 h-16 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-neutral-50 hover:text-black transition-all duration-300"
                                >
                                    {t('product.continueShopping')}
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <Footer />

            <SizeGuideDrawer
                isOpen={showSizeGuide}
                onClose={() => setShowSizeGuide(false)}
            />
        </main >
    );
}

function ReviewCard({ review }: { review: any }) {
    const { t } = useLanguage();
    return (
        <div className="bg-white border border-neutral-100 p-8 hover:shadow-lg transition-shadow duration-300 flex flex-col gap-4 h-full">
            <div className="flex items-center justify-between">
                <div className="flex text-black gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-black" />
                    ))}
                </div>
                <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider">{review.date}</span>
            </div>
            <h3 className="font-bold text-base text-black">{review.title}</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">"{review.content}"</p>
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">
                    {review.name.split(' ')[0][0]}
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-xs text-black">{review.name}</span>
                    <span className="text-[9px] text-green-600 font-semibold uppercase tracking-wide flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> {t('product.verified')}
                    </span>
                </div>
            </div>
        </div>
    );
}

function MobileReviewSlider({ reviews }: { reviews: any[] }) {
    const { t } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => { // Changed useState to useEffect for side effects
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % reviews.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [reviews.length]); // Added reviews.length to dependency array

    return (
        <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                >
                    <ReviewCard review={reviews[currentIndex]} />
                </motion.div>
            </AnimatePresence>
            <div className="flex justify-center gap-2 mt-8">
                {reviews.map((_, i) => (
                    <div
                        key={i}
                        className={cn(
                            "w-1.5 h-1.5 rounded-full transition-all duration-300",
                            currentIndex === i ? "bg-black w-4" : "bg-neutral-200"
                        )}
                    />
                ))}
            </div>
        </div>
    );
}
