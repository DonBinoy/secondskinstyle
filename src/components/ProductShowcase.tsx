'use client';

import { motion, type Easing } from 'framer-motion';
import ProductCard from './ProductCard';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] as Easing
        }
    }
};

export default function ProductShowcase() {
    return (
        <section className="w-full py-24 px-4 md:px-8 bg-white">
            <div className="max-w-[1920px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex items-end justify-between mb-10"
                >
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 leading-none">
                        Womens <br /> New Releases
                    </h2>
                    <a href="#" className="hidden md:block text-sm font-bold uppercase tracking-widest text-neutral-900 border-b-2 border-neutral-900 pb-1 hover:text-neutral-600 hover:border-neutral-600 transition-all">
                        View All Products
                    </a>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-8 lg:grid-cols-4"
                >
                    {PRODUCTS.map((product) => (
                        <motion.div key={product.id} variants={itemVariants}>
                            <Link href={`/product/${product.id}`}>
                                <ProductCard
                                    name={product.name}
                                    price={`${product.currency}${product.price.toFixed(2)}`}
                                    originalPrice={product.originalPrice ? `${product.currency}${product.originalPrice.toFixed(2)}` : undefined}
                                    discount={product.discount}
                                    tag={product.tag}
                                    image={product.image}
                                />
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-12 flex justify-center md:hidden">
                    <a href="#" className="px-8 py-3 bg-black text-white text-sm font-bold uppercase tracking-wider">
                        View All
                    </a>
                </div>
            </div>
        </section>
    );
}
