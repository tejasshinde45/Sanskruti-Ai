import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Sparkles, MeshDistortMaterial, Html } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function PremiumOm() {
    const groupRef = useRef<THREE.Group>(null);
    const auraRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.15;
            groupRef.current.rotation.z += delta * 0.05;
        }
        if (auraRef.current) {
            auraRef.current.rotation.y -= delta * 0.2;
            auraRef.current.rotation.x += delta * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <group ref={groupRef}>
                {/* Core Glowing Orb */}
                <mesh scale={0.8}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <MeshDistortMaterial
                        color="#FF9933"
                        emissive="#FF4500"
                        emissiveIntensity={2}
                        roughness={0.2}
                        metalness={0.8}
                        distort={0.4}
                        speed={4}
                        transparent
                        opacity={0.8}
                    />
                </mesh>

                {/* Golden Torus Ring */}
                <mesh ref={auraRef} rotation={[Math.PI / 3, 0, 0]}>
                    <torusGeometry args={[2.5, 0.05, 32, 100]} />
                    <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={1.5} wireframe />
                </mesh>

                {/* Energy Ring */}
                <mesh rotation={[0, Math.PI / 4, 0]}>
                    <torusGeometry args={[3, 0.02, 16, 100]} />
                    <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1} />
                </mesh>

                {/* Sacred Text Overlay - Flawlessly crisp */}
                <Html center transform sprite zIndexRange={[100, 0]}>
                    <div className="select-none pointer-events-none">
                        <h1
                            className="text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFE259] to-[#FFA751]"
                            style={{
                                textShadow: '0 0 40px rgba(255, 167, 81, 0.8), 0 0 80px rgba(255, 153, 51, 0.6)',
                                fontFamily: '"Tiro Devanagari Sanskrit", serif',
                                lineHeight: 1
                            }}
                        >
                            ॐ
                        </h1>
                    </div>
                </Html>

                {/* Dense Particle Storm */}
                <Sparkles count={150} scale={6} size={3} speed={0.8} opacity={0.6} color="#FFE259" />
                <Sparkles count={50} scale={4} size={5} speed={1.2} opacity={0.8} color="#FF4500" />
            </group>
        </Float>
    );
}

export default function OmAnimation() {
    return (
        <div className="w-full h-full min-h-[400px] rounded-[2rem] overflow-hidden relative cursor-grab active:cursor-grabbing group shadow-[0_0_50px_rgba(255,153,51,0.15)] border border-primary/20 bg-black/40 backdrop-blur-sm">
            <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 5, 5]} intensity={2} color="#FFE259" />
                <pointLight position={[-5, -5, -5]} intensity={1} color="#FF9933" />
                <pointLight position={[0, 0, 0]} intensity={2} color="#FFA751" distance={5} />

                <Stars radius={100} depth={50} count={2500} factor={4} saturation={1} fade speed={1} />

                <PremiumOm />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={1}
                    maxPolarAngle={Math.PI / 2 + 0.3}
                    minPolarAngle={Math.PI / 2 - 0.3}
                />
            </Canvas>

            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none opacity-60"></div>

            <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                <p className="text-sm text-primary font-bold uppercase tracking-[0.3em] bg-background/80 backdrop-blur-md py-2 px-6 rounded-full inline-block border border-primary/30 shadow-[0_0_20px_rgba(255,153,51,0.3)]">
                    Interact with the Divine
                </p>
            </div>
        </div>
    );
}
