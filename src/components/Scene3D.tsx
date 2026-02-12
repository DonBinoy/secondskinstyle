'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, ContactShadows, Text, Sparkles, PerspectiveCamera } from '@react-three/drei';
import { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';

function LiquidMetal() {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (meshRef.current) {
            // Complex organic rotation
            meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.2;
            meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.2;
            meshRef.current.rotation.z = Math.cos(time * 0.1) * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1.5} floatingRange={[-0.2, 0.2]}>
            <mesh
                ref={meshRef}
                scale={hovered ? 2.2 : 2}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                {/* Icosahedron gives a nice techy/organic base when distorted */}
                <sphereGeometry args={[1, 64, 64]} />
                <MeshDistortMaterial
                    color="#1a1a1a" // Dark metallic base
                    envMapIntensity={2.5}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    metalness={0.9} // Very metallic
                    roughness={0.2} // Glossy but not perfect mirror
                    distort={0.5} // Significant liquid distortion
                    speed={2} // Fast flowing liquid
                />
            </mesh>
            {/* Secondary accent shape for "layering" */}
            <mesh scale={2.5} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1, 0.02, 16, 100]} />
                <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
            </mesh>
        </Float>
    );
}

function FloatingStandard() {
    const { mouse, viewport } = useThree();
    const textRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (textRef.current) {
            const x = (mouse.x * viewport.width) / 4;
            const y = (mouse.y * viewport.height) / 4;
            textRef.current.lookAt(x, y, 10);
        }
    })

    return (
        <group ref={textRef}>
            {/* Using HTML overlay in Scene3D for better typography control */}
        </group>
    )
}

function SceneLighting() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#444" />
            {/* Vibrant rim lights for premium feel */}
            <pointLight position={[5, 0, 5]} intensity={2} color="#ffffff" distance={10} />
            <pointLight position={[-5, 0, 5]} intensity={2} color="#cccccc" distance={10} />
        </>
    )
}

export default function Scene3D() {
    return (
        <div className="w-full h-[80vh] relative bg-neutral-950 overflow-hidden flex items-center justify-center">

            {/* Premium Content Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none mix-blend-difference px-4">
                <div className="text-center space-y-6">
                    <span className="inline-block py-1 px-3 border border-white/20 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-4 backdrop-blur-md">
                        The Innovation
                    </span>
                    <h2 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white leading-[0.85] drop-shadow-2xl">
                        Liquid <br /> Motion
                    </h2>
                    <p className="max-w-md mx-auto text-sm md:text-base font-medium text-neutral-400 leading-relaxed tracking-wide mt-8">
                        Experience the fabric that moves with you. Engineered at the molecular level for zero restriction and absolute fluidity.
                    </p>
                </div>
            </div>

            {/* Bottom Brand Strip */}
            <div className="absolute bottom-12 left-0 w-full px-8 md:px-16 flex justify-between items-end z-10 opacity-50 relative pointer-events-none">
                <div className="hidden md:block">
                    <p className="text-xs font-mono text-white">FIG. 03 — FLUID DYNAMICS</p>
                </div>
                <div className="h-[1px] flex-1 bg-white/20 mx-8 hidden md:block" />
                <div>
                    <p className="text-xs font-mono text-white">SECONDSKIN™ TECH</p>
                </div>
            </div>


            <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping }}>
                <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={35} />
                <SceneLighting />
                <Environment preset="studio" />

                <group position={[0, 0, 0]}>
                    <LiquidMetal />
                </group>

                {/* Atmospheric Particles */}
                <Sparkles
                    count={150}
                    scale={10}
                    size={2}
                    speed={0.4}
                    opacity={0.5}
                    color="#ffffff"
                    noise={0.1}
                />
            </Canvas>

            {/* Grain Overlay */}
            <div className="absolute inset-0 z-20 opacity-[0.04] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: 'url("https://t3.ftcdn.net/jpg/03/75/17/80/360_F_375178028_jJ7Kda7sE1r83h4aG8X7j9p8w0.jpg")' }}
            />
        </div>
    );
}
