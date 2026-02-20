'use client';

import { useRef, useState, MouseEvent, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Play } from 'lucide-react';

// Varied Bento Grid Items
const MEDIA_ITEMS = [
    {
        id: 1,
        type: 'video',
        src: '/video/sports.mp4',
        className: 'col-span-1 md:col-span-2 md:row-span-2',
        title: 'Endurance',
        subtitle: 'Push Beyond'
    },
    {
        id: 2,
        type: 'image',
        src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop',
        className: 'col-span-1 md:col-span-1 md:row-span-1',
        title: 'Focus',
        subtitle: 'Inner Strength'
    },
    {
        id: 3,
        type: 'video',
        src: '/video/sports.mp4',
        className: 'col-span-1 md:col-span-1 md:row-span-1',
        title: 'Power',
        subtitle: 'Raw Energy'
    },
    {
        id: 4,
        type: 'video',
        src: '/video/sports.mp4',
        className: 'col-span-1 md:col-span-2 md:row-span-1',
        title: 'Urban Flow',
        subtitle: 'City Rhythm'
    },
    {
        id: 5,
        type: 'image',
        src: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop',
        className: 'col-span-1 md:col-span-1 md:row-span-2',
        title: 'Precision',
        subtitle: 'Every Detail'
    },
    {
        id: 6,
        type: 'video',
        src: '/video/sports.mp4',
        className: 'col-span-1 md:col-span-1 md:row-span-1',
        title: 'Motion',
        subtitle: 'Unstoppable'
    },
    {
        id: 7,
        type: 'image',
        src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
        className: 'col-span-1 md:col-span-1 md:row-span-1',
        title: 'Style',
        subtitle: 'Future Ready'
    }
];

export default function MediaGrid() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isDesktop, setIsDesktop] = useState(false);

    // Smooth cursor spring
    const springConfig = { damping: 20, stiffness: 300 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const checkDevice = () => {
            setIsDesktop(window.innerWidth > 1024);
        };
        checkDevice();
        window.addEventListener('resize', checkDevice);

        const moveCursor = (e: globalThis.MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', moveCursor);
        return () => {
            window.removeEventListener('resize', checkDevice);
            window.removeEventListener('mousemove', moveCursor);
        };
    }, [mouseX, mouseY]);

    return (
        <section className={cn("w-full py-24 bg-white text-black overflow-hidden relative", isDesktop && "cursor-none")}>
            {/* Fluid Cursor - Only visible on desktop */}
            {isDesktop && (
                <motion.div
                    ref={cursorRef}
                    className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
                    style={{
                        x: cursorX,
                        y: cursorY,
                        translateX: '-50%',
                        translateY: '-50%'
                    }}
                >
                    <AnimatePresence mode='wait'>
                        {hoveredIndex !== null ? (
                            <motion.div
                                key="active"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 3, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="w-full h-full bg-white rounded-full flex items-center justify-center"
                            >
                                {/* Tiny label inside cursor? Or simple dot */}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="idle"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="w-full h-full bg-white rounded-full"
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
            )}

            {/* Background noise */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'url("https://t3.ftcdn.net/jpg/03/75/17/80/360_F_375178028_jJ7Kda7sE1r83h4aG8X7j9p8w0.jpg")' }}
            />

            <div className="max-w-[1920px] mx-auto px-4 md:px-8 relative z-10">
                <div className="mb-24 flex flex-col md:flex-row justify-between items-end border-b border-black/10 pb-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-9xl font-bold tracking-tighter text-black"
                    >
                        Journal
                    </motion.h2>
                    <motion.div className="flex items-center gap-4 mt-4 md:mt-0 opacity-60">
                        <p className="text-sm font-medium uppercase tracking-widest text-neutral-400">
                            Stories & Campaigns
                        </p>
                    </motion.div>
                </div>

                <div
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-4 auto-rows-[350px]"
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    {MEDIA_ITEMS.map((item, i) => (
                        <FocusCard
                            key={item.id}
                            item={item}
                            index={i}
                            hoveredIndex={hoveredIndex}
                            setHoveredIndex={setHoveredIndex}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FocusCard({ item, index, hoveredIndex, setHoveredIndex }: any) {
    const isHovered = hoveredIndex === index;
    const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            className={cn(
                "relative overflow-hidden group rounded-sm transition-all duration-700 ease-out",
                item.className,
                isDimmed ? "opacity-30 blur-[2px] scale-95 grayscale" : "opacity-100 scale-100 grayscale-0"
            )}
            onMouseEnter={() => setHoveredIndex(index)}
        >
            {/* Visual Media with Zoom on Hover */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className={cn(
                    "w-full h-full transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]",
                    isHovered ? "scale-110" : "scale-100"
                )}>
                    {item.type === 'video' ? (
                        <video
                            className="w-full h-full object-cover"
                            src={item.src}
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    ) : (
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${item.src})` }}
                        />
                    )}
                </div>
                {/* Overlay */}
                <div className={cn(
                    "absolute inset-0 bg-black/20 transition-colors duration-500",
                    isHovered ? "bg-black/0" : "bg-black/20"
                )} />
            </div>

            {/* Content Reveal - Slide Up */}
            <div className="absolute bottom-0 left-0 p-8 w-full z-20 flex flex-col justify-end h-full pointer-events-none">
                <div className="overflow-hidden">
                    <motion.h3
                        className="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-white mix-blend-difference"
                        initial={{ y: "100%" }}
                        animate={{ y: isHovered ? 0 : "100%" }}
                        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                    >
                        {item.title}
                    </motion.h3>
                </div>
                <div className="overflow-hidden mt-2">
                    <motion.p
                        className="text-xs font-bold uppercase tracking-widest text-white/90 mix-blend-difference flex items-center gap-2"
                        initial={{ y: "100%" }}
                        animate={{ y: isHovered ? 0 : "100%" }}
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
                    >
                        {item.subtitle}
                        <ArrowUpRight className="w-4 h-4" />
                    </motion.p>
                </div>

                {/* Default Title (visible when idle) */}
                <div className={cn(
                    "absolute bottom-8 left-8 transition-opacity duration-300 md:hidden",
                    isHovered ? "opacity-0" : "opacity-100"
                )}>
                    <h3 className="text-2xl font-bold uppercase tracking-tight text-white">{item.title}</h3>
                </div>
            </div>

            {/* View Button Indicator Centered */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none mix-blend-difference"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
                transition={{ duration: 0.3 }}
            >
                <span className="text-sm font-bold uppercase tracking-widest text-white">View</span>
            </motion.div>

        </motion.div>
    );
}
