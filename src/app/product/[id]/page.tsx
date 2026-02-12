'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Star, ArrowRight, Truck, ShieldCheck, RefreshCw, Box, Image as ImageIcon, ChevronRight, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PRODUCTS } from '@/data/products';
import ModelViewer from '@/components/ModelViewer';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

    const { addToCart } = useCart();
    const router = useRouter();

    // Get recommended products (3 items)
    const recommendedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

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

            <div className="max-w-[1920px] mx-auto px-4 md:px-10 pt-32 pb-20">

                {/* Top Breadcrumbs */}
                <nav className="flex items-center text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-12 overflow-hidden whitespace-nowrap">
                    <Link href="/" className="hover:text-black transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3 mx-2 opacity-30" />
                    <Link href="#" className="hover:text-black transition-colors">{product.category}</Link>
                    <ChevronRight className="w-3 h-3 mx-2 opacity-30" />
                    <span className="text-black">{product.name}</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">

                    {/* Left: Image Gallery */}
                    <div className="w-full lg:w-3/5">
                        <div className="flex flex-col-reverse lg:flex-row gap-4 h-[calc(100vh-200px)] min-h-[500px] sticky top-32">
                            {/* Thumbnails */}
                            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 hide-scrollbar w-full lg:w-24 shrink-0">
                                {(product.images || [product.image]).map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => { setActiveImage(idx); setShow3D(false); }}
                                        className={cn(
                                            "relative w-20 h-24 lg:w-24 lg:h-32 border transition-all duration-300 shrink-0",
                                            activeImage === idx && !show3D
                                                ? "border-black opacity-100"
                                                : "border-transparent opacity-60 hover:opacity-100"
                                        )}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${product.name} view ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Main Display Area */}
                            <div className="relative flex-1 bg-neutral-50 overflow-hidden group">
                                <AnimatePresence mode="wait">
                                    {show3D ? (
                                        <motion.div
                                            key="3d-model"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="w-full h-full"
                                        >
                                            <ModelViewer modelUrl={product.modelEmbedUrl} />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="image"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="relative w-full h-full"
                                        >
                                            <Image
                                                src={(product.images || [product.image])[activeImage]}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                                priority
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Toggle Button */}
                                {product.modelEmbedUrl && (
                                    <button
                                        onClick={() => setShow3D(!show3D)}
                                        className="absolute top-4 right-4 z-20 bg-white shadow-xl p-3 rounded-full hover:bg-black hover:text-white transition-all duration-300 group/btn"
                                    >
                                        {show3D ? (
                                            <ImageIcon className="w-5 h-5" />
                                        ) : (
                                            <Box className="w-5 h-5" />
                                        )}
                                        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black text-white text-[10px] uppercase font-bold px-3 py-1.5 rounded tracking-widest opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                            {show3D ? "Show Product" : "View in 3D"}
                                        </span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right: Product Details */}
                    <div className="w-full lg:w-2/5">
                        <div className="sticky top-32 flex flex-col gap-10">

                            {/* Header */}
                            <div className="border-b border-neutral-100 pb-10">
                                <Link href="#reviews" className="flex items-center gap-2 mb-4 group w-fit">
                                    <div className="flex text-black">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-3.5 h-3.5 fill-black" />
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-hover:text-black transition-colors">128 Reviews</span>
                                </Link>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-black mb-6 leading-none italic">
                                    {product.name}
                                </h1>
                                <p className="text-3xl font-bold text-black font-mono tracking-tighter">
                                    {product.currency}{product.price.toFixed(2)}
                                </p>
                            </div>

                            {/* Description */}
                            <div className="flex flex-col gap-4">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Design Note</h3>
                                <p className="text-neutral-600 leading-relaxed font-light text-xl italic max-w-lg">
                                    "{product.description}"
                                </p>
                            </div>

                            {/* Color Selector */}
                            {product.colors && (
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black mb-6 block">
                                        Select Color <span className="text-neutral-300 font-normal ml-3">— {selectedColor}</span>
                                    </span>
                                    <div className="flex gap-5">
                                        {product.colors.map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={cn(
                                                    "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                                                    selectedColor === color
                                                        ? "ring-1 ring-offset-4 ring-black scale-110"
                                                        : "hover:scale-105"
                                                )}
                                                title={color}
                                            >
                                                <span className={cn("w-full h-full rounded-full border border-black/5", getColorClass(color))} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Size Selector */}
                            {product.sizes && (
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black">Select Size</span>
                                        <button className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-black underline transition-colors">
                                            Size Guide
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-5 gap-2">
                                        {product.sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => { setSelectedSize(size); document.getElementById('size-error')?.classList.add('hidden'); }}
                                                className={cn(
                                                    "h-16 border flex items-center justify-center text-xs font-black transition-all duration-300",
                                                    selectedSize === size
                                                        ? "border-black bg-black text-white"
                                                        : "border-neutral-100 text-black hover:border-black/30"
                                                )}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-red-500 text-[10px] mt-3 font-bold uppercase tracking-widest hidden" id="size-error">Please select a size</p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex flex-col gap-4 mt-4">
                                <div className="flex gap-4">
                                    <div className="flex items-center border border-neutral-100 px-6 h-18 w-40 justify-between">
                                        <button onClick={() => handleQuantity('dec')} className="p-2 hover:opacity-50 transition-opacity">
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="font-bold text-xl font-mono">{quantity}</span>
                                        <button onClick={() => handleQuantity('inc')} className="p-2 hover:opacity-50 transition-opacity">
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <button
                                        onClick={handleAddToCart}
                                        className="flex-1 h-18 bg-black text-white font-black uppercase tracking-[0.2em] text-[10px] hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                                <button
                                    onClick={handleBuyNow}
                                    className="w-full border border-black text-black h-18 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-black hover:text-white transition-all duration-500"
                                >
                                    Buy Now
                                </button>
                            </div>

                            {/* Details Accordion */}
                            {product.details && (
                                <div className="border-t border-neutral-100 mt-10">
                                    <details className="group py-6 cursor-pointer" open>
                                        <summary className="flex items-center justify-between font-black uppercase tracking-[0.3em] text-[10px] list-none select-none">
                                            Product Details
                                            <Plus className="w-3 h-3 group-open:hidden" />
                                            <Minus className="w-3 h-3 hidden group-open:block" />
                                        </summary>
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            className="overflow-hidden"
                                        >
                                            <ul className="mt-8 space-y-4 text-neutral-500 text-sm font-light pl-6">
                                                {product.details.map((detail, i) => (
                                                    <li key={i} className="flex items-center gap-4">
                                                        <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                                                        {detail}
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    </details>
                                </div>
                            )}

                            {/* "Complete the Look" Area */}
                            <div className="mt-16 border-t border-black pt-16">
                                <h3 className="font-black uppercase tracking-[0.3em] text-[10px] mb-10 flex items-center gap-5 italic">
                                    Complete the Look
                                    <div className="h-px bg-neutral-100 flex-1" />
                                </h3>
                                <div className="flex flex-col gap-8">
                                    {recommendedProducts.map((rec) => (
                                        <Link href={`/product/${rec.id}`} key={rec.id} className="group flex gap-8 items-center">
                                            <div className="relative w-28 h-36 bg-neutral-50 shrink-0 overflow-hidden border border-neutral-100">
                                                <Image
                                                    src={rec.image}
                                                    alt={rec.name}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <h4 className="font-black text-sm uppercase tracking-tight group-hover:text-neutral-600 transition-colors">
                                                    {rec.name}
                                                </h4>
                                                <p className="text-neutral-400 text-[10px] font-bold mt-2 uppercase tracking-widest italic">
                                                    {rec.category} / {rec.subcategory}
                                                </p>
                                                <div className="flex items-center justify-between mt-6">
                                                    <p className="font-bold text-lg font-mono tracking-tighter">{rec.currency}{rec.price.toFixed(2)}</p>
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black border-b border-black pb-1 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">View Product</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Section Separation */}
                <div className="mt-40 h-32 border-l border-neutral-100 ml-1/2 hidden lg:block" />

                {/* Reviews Section */}
                <section id="reviews" className="mt-32 max-w-6xl mx-auto border-y border-neutral-100 py-32 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 font-black text-[150px] text-neutral-50 select-none pointer-events-none uppercase italic leading-none">Reviews</div>

                    <div className="text-center mb-32 relative z-10">
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-10 italic leading-none">Product Reviews</h2>
                        <div className="flex flex-col items-center gap-6">
                            <div className="flex text-black gap-1.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-7 h-7 fill-black" />
                                ))}
                            </div>
                            <div className="flex items-center gap-6">
                                <span className="font-black text-6xl font-mono tracking-tighter italic">4.9</span>
                                <div className="text-left">
                                    <div className="text-[10px] font-black uppercase tracking-[0.3em]">Verified Score</div>
                                    <div className="text-neutral-400 text-[10px] uppercase font-bold tracking-widest mt-1">Based on 128 community reviews</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-px bg-neutral-100 border border-neutral-100 relative z-10">
                        {[
                            {
                                name: "Alex M.",
                                rating: 5,
                                title: "ELITE QUALITY",
                                content: "Unmatched performance. The fit is surgical and the material feels like a second skin. Worth every penny.",
                                date: "Feb 2026"
                            },
                            {
                                name: "Sarah K.",
                                rating: 5,
                                title: "PURE COMFORT",
                                content: "A significant investment but the quality is undeniable. Breathable, durable, and stylish. Perfect for training.",
                                date: "Jan 2026"
                            }
                        ].map((review, idx) => (
                            <div key={idx} className="bg-white p-16 hover:bg-neutral-50/50 transition-colors duration-500">
                                <div className="flex flex-col gap-6 mb-12">
                                    <div className="flex text-black gap-1">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} className="w-3.5 h-3.5 fill-black" />
                                        ))}
                                    </div>
                                    <span className="text-[10px] text-neutral-300 font-bold uppercase tracking-[0.3em]">{review.date}</span>
                                </div>
                                <h3 className="font-black text-sm uppercase tracking-[0.3em] mb-4 italic text-neutral-700">{review.title}</h3>
                                <p className="text-neutral-500 font-light leading-relaxed mb-12 text-xl italic leading-relaxed">"{review.content}"</p>
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 border border-black flex items-center justify-center font-black text-sm italic">
                                        {review.name.split(' ')[0][0]}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-black text-[10px] uppercase tracking-[0.3em]">{review.name}</span>
                                        <span className="text-[8px] text-green-600 font-black uppercase tracking-widest flex items-center gap-2">
                                            <ShieldCheck className="w-2.5 h-2.5" /> Verified Purchase
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-24 text-center">
                        <button className="bg-black text-white px-16 py-7 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-neutral-800 transition-all duration-500 shadow-2xl italic">
                            Show All Reviews
                        </button>
                    </div>
                </section>

                {/* Ecosystem Navigation */}
                <section className="mt-40 border-t border-neutral-100 pt-32">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-20">
                        <div className="flex-1">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral-300 mb-12">Explore Ecosystem</h2>
                            <div className="flex flex-wrap gap-12 md:gap-24">
                                <div className="flex flex-col gap-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Main Range</span>
                                    <Link href="#" className="group flex items-center gap-4">
                                        <span className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic group-hover:translate-x-3 transition-transform duration-500">{product.category}</span>
                                        <ArrowRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                    </Link>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Collection</span>
                                    <Link href="#" className="group flex items-center gap-4">
                                        <span className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic group-hover:translate-x-3 transition-transform duration-500">{product.subcategory}</span>
                                        <ArrowRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="max-w-xs pt-10">
                            <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-[0.4em] leading-loose italic">
                                Engineered for movement. The {product.name} integrates seamlessly into your {product.subcategory} rotation within our {product.category} catalog.
                            </p>
                        </div>
                    </div>
                </section>

            </div>

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

                            <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-4">Added to Cart</h2>
                            <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-12">
                                {quantity}x {product.name} — {selectedSize} / {selectedColor}
                            </p>

                            <div className="flex flex-col gap-4">
                                <button
                                    onClick={() => router.push('/cart')}
                                    className="w-full bg-black text-white h-16 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center gap-3"
                                >
                                    Proceed to Cart
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setShowPopup(false)}
                                    className="w-full border border-neutral-100 text-neutral-400 h-16 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-neutral-50 hover:text-black transition-all duration-300"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <Footer />
        </main>
    );
}
