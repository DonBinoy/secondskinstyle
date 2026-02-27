'use client';

import { useRef, useState, MouseEvent, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Play } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function MediaGrid() {
    const { t } = useLanguage();

    // Varied Bento Grid Items
    const MEDIA_ITEMS = [
        {
            id: 1,
            type: 'video',
            src: '/video/Endurance.mp4',
            className: 'col-span-2 row-span-2 md:col-span-2 md:row-span-2',
            title: t('mediaGrid.items.endurance'),
            subtitle: t('mediaGrid.items.pushBeyond'),
            category: t('mediaGrid.categories.campaign'),
            date: 'FEB 2024',
            mobileWidth: '85%'
        },
        {
            id: 2,
            type: 'image',
            src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop',
            className: 'col-span-1 row-span-1 md:col-span-1 md:row-span-1',
            title: t('mediaGrid.items.focus'),
            subtitle: t('mediaGrid.items.innerStrength'),
            category: t('mediaGrid.categories.story'),
            date: 'JAN 2024',
            mobileWidth: '70%'
        },
        {
            id: 3,
            type: 'video',
            src: '/video/Power.mp4',
            className: 'col-span-1 row-span-1 md:col-span-1 md:row-span-1',
            title: t('mediaGrid.items.power'),
            subtitle: t('mediaGrid.items.rawEnergy'),
            category: t('mediaGrid.categories.editorial'),
            date: 'MAR 2024',
            mobileWidth: '75%'
        },
        {
            id: 4,
            type: 'video',
            src: '/video/sports.mp4',
            className: 'col-span-2 row-span-1 md:col-span-2 md:row-span-1',
            title: t('mediaGrid.items.urbanFlow'),
            subtitle: t('mediaGrid.items.cityRhythm'),
            category: t('mediaGrid.categories.campaign'),
            date: 'APR 2024',
            mobileWidth: '95%'
        },
        {
            id: 5,
            type: 'image',
            src: '/image/precision.jpg',
            className: 'col-span-1 row-span-2 md:col-span-1 md:row-span-2',
            title: t('mediaGrid.items.precision'),
            subtitle: t('mediaGrid.items.everyDetail'),
            category: t('mediaGrid.categories.story'),
            date: 'MAY 2024',
            mobileWidth: '80%'
        },
        {
            id: 6,
            type: 'video',
            src: '/video/motion.mp4',
            className: 'col-span-1 row-span-1 md:col-span-1 md:row-span-1',
            title: t('mediaGrid.items.motion'),
            subtitle: t('mediaGrid.items.unstoppable'),
            category: t('mediaGrid.categories.editorial'),
            date: 'JUN 2024',
            mobileWidth: '70%'
        },
        {
            id: 7,
            type: 'image',
            src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
            className: 'col-span-2 row-span-1 md:col-span-1 md:row-span-1',
            title: t('mediaGrid.items.style'),
            subtitle: t('mediaGrid.items.futureReady'),
            category: t('mediaGrid.categories.campaign'),
            date: 'JUL 2024',
            mobileWidth: '90%'
        }
    ];

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isDesktop, setIsDesktop] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Smooth cursor spring
    const springConfig = { damping: 20, stiffness: 300 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        setIsMounted(true);
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
        <section className={cn("w-full py-16 md:py-24 bg-white text-black overflow-hidden relative", isDesktop && "cursor-none")}>
            {/* Fluid Cursor - Only visible on desktop */}
            {/* ... cursor logic remains ... */}
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
                            />
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

            <div className="max-w-[1920px] mx-auto relative z-10">
                <div className="mb-12 md:mb-24 px-6 md:px-8 flex flex-col md:flex-row justify-between items-end border-b border-black/10 pb-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-9xl font-bold tracking-tighter text-black"
                    >
                        {t('mediaGrid.journal')}
                    </motion.h2>
                    <motion.div className="flex items-center gap-4 mt-4 md:mt-0 opacity-60">
                        <p className="text-sm font-medium uppercase tracking-widest text-neutral-400">
                            {t('mediaGrid.stories')}
                        </p>
                    </motion.div>
                </div>

                <div
                    className={cn(
                        "flex md:grid md:grid-cols-4 md:auto-rows-[350px] gap-4 md:gap-4 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory px-6 md:px-8 pb-8 no-scrollbar scroll-smooth",
                        "flex-nowrap md:flex-wrap"
                    )}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    {MEDIA_ITEMS.map((item, i) => (
                        <FocusCard
                            key={item.id}
                            item={item}
                            index={i}
                            hoveredIndex={hoveredIndex}
                            setHoveredIndex={setHoveredIndex}
                            isMounted={isMounted}
                            isDesktop={isDesktop}
                        />
                    ))}
                </div>

                {/* Mobile Scroll Progress Indicator */}
                <div className="md:hidden flex justify-center items-center gap-1.5 mt-2">
                    {MEDIA_ITEMS.map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "h-0.5 transition-all duration-500 rounded-full",
                                i === 0 ? "w-8 bg-black" : "w-1.5 bg-black/10"
                            )}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FocusCard({ item, index, hoveredIndex, setHoveredIndex, isMounted, isDesktop }: any) {
    const { t } = useLanguage();
    const isHovered = hoveredIndex === index;
    const isDimmed = hoveredIndex !== null && hoveredIndex !== index;
    const itemNumber = (index + 1).toString().padStart(2, '0');
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (item.type === 'video' && videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => { });
        }
    }, [item.src]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            className={cn(
                "relative overflow-hidden group rounded-sm transition-all duration-700 ease-out",
                "flex-shrink-0 md:w-auto h-[500px] md:h-auto snap-center md:snap-align-none",
                item.className,
                isDimmed ? "opacity-30 blur-[2px] scale-95 grayscale" : "opacity-100 scale-100 grayscale-0"
            )}
            style={{ width: (isMounted && !isDesktop) ? item.mobileWidth : undefined }}
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
                            ref={videoRef}
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

            {/* Editorial Elements - Top Left Index */}
            <div className="absolute top-6 left-6 z-20 overflow-hidden">
                <span className="text-4xl font-bold tracking-tighter text-white/40 block">
                    {itemNumber}
                </span>
            </div>

            {/* Editorial Elements - Top Right Tag */}
            <div className="absolute top-6 right-6 z-20">
                <div className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                        {item.category}
                    </span>
                </div>
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
                        <span>{item.subtitle}</span>
                        <span className="opacity-40 ml-auto">{item.date}</span>
                        <ArrowUpRight className="w-4 h-4" />
                    </motion.p>
                </div>

                <div className={cn(
                    "transition-opacity duration-300 md:hidden",
                    isHovered ? "opacity-0" : "opacity-100"
                )}>
                    <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-1">{item.title}</h3>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-medium">{t('mediaGrid.readArticle')}</p>
                </div>
            </div>

            {/* View Button Indicator Centered */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none mix-blend-difference"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
                transition={{ duration: 0.3 }}
            >
                <div className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">{t('mediaGrid.view')}</span>
                </div>
            </motion.div>

        </motion.div>
    );
}
