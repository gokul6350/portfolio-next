'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);
  const particleCount = 1000;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;
    }
    return positions;
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.0001;
      meshRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#9333ea"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function RotatingOrbits() {
  const orbitRef = useRef<THREE.Group>(null);
  const orbitRef2 = useRef<THREE.Group>(null);

  useFrame(() => {
    if (orbitRef.current) {
      orbitRef.current.rotation.z += 0.0005;
    }
    if (orbitRef2.current) {
      orbitRef2.current.rotation.z -= 0.0003;
      orbitRef2.current.rotation.x += 0.0001;
    }
  });

  return (
    <>
      <group ref={orbitRef}>
        <mesh position={[15, 0, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={0.8}
          />
        </mesh>
        <mesh position={[-15, 0, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="#9333ea"
            emissive="#9333ea"
            emissiveIntensity={0.6}
          />
        </mesh>
        <mesh position={[0, 15, 0]}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.7}
          />
        </mesh>
      </group>

      <group ref={orbitRef2}>
        <mesh position={[25, 10, 0]}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial
            color="#ec4899"
            emissive="#ec4899"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* Orbit lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={64}
            array={
              new Float32Array(
                Array.from({ length: 64 }).flatMap((_, i) => {
                  const angle = (i / 64) * Math.PI * 2;
                  return [Math.cos(angle) * 15, Math.sin(angle) * 15, 0];
                })
              )
            }
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#9333ea" transparent opacity={0.3} />
      </lineSegments>
    </>
  );
}

export function AnimatedBackground() {
  return (
    <Canvas
      className="fixed inset-0 -z-10"
      camera={{ position: [0, 0, 40], fov: 75 }}
    >
      <color attach="background" args={['#1a0d2e']} />
      
      <ambientLight intensity={0.3} color="#9333ea" />
      <pointLight position={[20, 20, 20]} intensity={1} color="#00d4ff" />
      <pointLight position={[-20, -20, 20]} intensity={0.8} color="#9333ea" />

      <ParticleField />
      <RotatingOrbits />
    </Canvas>
  );
}
