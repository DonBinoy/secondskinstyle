'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import MagneticButton from './ui/MagneticButton';

function TiltCard({ children }: { children: React.ReactNode }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const xPct = (clientX - left) / width - 0.5;
        const yPct = (clientY - top) / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="relative w-full h-[600px] perspective-1000"
        >
            {children}
        </motion.div>
    );
}

export default function BrandStory() {
    return (
        <section className="w-full py-32 bg-zinc-950 text-white overflow-hidden">
            <div className="max-w-[1920px] mx-auto px-6 md:px-12 transition-colors duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Text Side */}
                    <div className="flex flex-col gap-10">
                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none"
                        >
                            Engineered <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-600">
                                To Adapt.
                            </span>
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6 text-lg text-zinc-400 font-light max-w-xl"
                        >
                            <p>
                                Every stitch is a commitment to performance. Our <span className="text-white font-bold">SecondSkinStyle™</span> fabric technology responds to your body's movement, creating a zero-distraction environment for your training.
                            </p>
                            <p>
                                Born in the gym, bred for the streets. We don't just make clothes; we engineer armor for the modern athlete.
                            </p>
                        </motion.div>

                        <MagneticButton
                            className="self-start px-10 py-4 border border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                        >
                            Our Technology
                        </MagneticButton>
                    </div>

                    {/* 3D Visual Side */}
                    <div className="flex items-center justify-center">
                        <TiltCard>
                            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                                <Image
                                    src="https://images.unsplash.com/photo-1544216717-3fbfcd4b93fb?q=80&w=1894&auto=format&fit=crop"
                                    alt="Athlete training"
                                    fill
                                    className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-10 left-10 transform translate-z-20">
                                    <h3 className="text-3xl font-bold uppercase italic tracking-wider">
                                        Motion <br /> Captured
                                    </h3>
                                </div>
                            </div>
                        </TiltCard>
                    </div>
                </div>
            </div>
        </section>
    );
}
