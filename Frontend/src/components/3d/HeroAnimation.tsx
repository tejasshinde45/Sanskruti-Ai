import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

function SacredGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  // A golden mystical material that looks great across all three themes
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <torusKnotGeometry args={[1.5, 0.4, 256, 64]} />
        <MeshDistortMaterial
          color="#FFD700"
          emissive="#B8860B"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

export default function HeroAnimation() {
  return (
    <div className="w-full h-[480px] md:h-[520px] rounded-xl overflow-hidden bg-black/10 backdrop-blur-sm border border-primary/20 shadow-2xl relative cursor-grab active:cursor-grabbing group">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#FF9933" />
        <pointLight position={[0, 10, 0]} intensity={0.5} color="#00ffff" />

        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={150} scale={10} size={3} speed={0.4} opacity={0.6} color="#ffffff" />

        <SacredGeometry />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
      <div className="absolute inset-x-0 bottom-6 text-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <p className="text-xs text-white/70 tracking-[0.2em] font-light uppercase shadow-black drop-shadow-md">Sacred Geometry - Interact to Rotate</p>
      </div>
    </div>
  );
}
