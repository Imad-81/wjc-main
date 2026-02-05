"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, ContactShadows, Float } from "@react-three/drei"
import { Suspense, useRef } from "react"
import type * as THREE from "three"

function ToriiGateModel() {
  const groupRef = useRef<THREE.Group>(null)

  // Gentle rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3
    }
  })

  const vermilionColor = "#c73e1d"
  const weatheredVermilion = "#a83520"
  const darkWood = "#5c3317"

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={groupRef} position={[0, -1.5, 0]}>
        {/* Left Pillar with weathered details */}
        <mesh position={[-2.5, 1.8, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.22, 0.25, 3.6, 32]} />
          <meshStandardMaterial color={vermilionColor} roughness={0.8} metalness={0.1} normalScale={[0.5, 0.5]} />
        </mesh>

        {/* Right Pillar */}
        <mesh position={[2.5, 1.8, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.22, 0.25, 3.6, 32]} />
          <meshStandardMaterial color={vermilionColor} roughness={0.8} metalness={0.1} normalScale={[0.5, 0.5]} />
        </mesh>

        {/* Top Kasagi (curved top beam) with authentic curve */}
        <group position={[0, 3.8, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[6, 0.35, 0.5]} />
            <meshStandardMaterial color={weatheredVermilion} roughness={0.75} metalness={0.05} />
          </mesh>
          {/* Curved upward ends */}
          <mesh position={[-2.8, 0.15, 0]} rotation={[0, 0, 0.2]} castShadow>
            <boxGeometry args={[0.6, 0.3, 0.5]} />
            <meshStandardMaterial color={weatheredVermilion} roughness={0.75} />
          </mesh>
          <mesh position={[2.8, 0.15, 0]} rotation={[0, 0, -0.2]} castShadow>
            <boxGeometry args={[0.6, 0.3, 0.5]} />
            <meshStandardMaterial color={weatheredVermilion} roughness={0.75} />
          </mesh>
        </group>

        {/* Nuki (lower horizontal beam) */}
        <mesh position={[0, 2.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.2, 0.28, 0.4]} />
          <meshStandardMaterial color={vermilionColor} roughness={0.8} metalness={0.1} />
        </mesh>

        {/* Decorative caps on pillars */}
        <mesh position={[-2.5, 3.8, 0]} castShadow>
          <cylinderGeometry args={[0.28, 0.22, 0.35, 32]} />
          <meshStandardMaterial color={darkWood} roughness={0.6} metalness={0.2} />
        </mesh>
        <mesh position={[2.5, 3.8, 0]} castShadow>
          <cylinderGeometry args={[0.28, 0.22, 0.35, 32]} />
          <meshStandardMaterial color={darkWood} roughness={0.6} metalness={0.2} />
        </mesh>

        {/* Base stones for authenticity */}
        <mesh position={[-2.5, 0, 0]} receiveShadow>
          <boxGeometry args={[0.8, 0.3, 0.8]} />
          <meshStandardMaterial color="#6b7280" roughness={0.95} metalness={0} />
        </mesh>
        <mesh position={[2.5, 0, 0]} receiveShadow>
          <boxGeometry args={[0.8, 0.3, 0.8]} />
          <meshStandardMaterial color="#6b7280" roughness={0.95} metalness={0} />
        </mesh>

        {/* Additional architectural details - supporting brackets */}
        <mesh position={[-2.3, 3.2, 0.15]} rotation={[0.3, 0, 0]} castShadow>
          <boxGeometry args={[0.15, 0.6, 0.15]} />
          <meshStandardMaterial color={darkWood} roughness={0.7} />
        </mesh>
        <mesh position={[2.3, 3.2, 0.15]} rotation={[0.3, 0, 0]} castShadow>
          <boxGeometry args={[0.15, 0.6, 0.15]} />
          <meshStandardMaterial color={darkWood} roughness={0.7} />
        </mesh>
      </group>
    </Float>
  )
}

export default function ToriiGate3D() {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <Canvas camera={{ position: [0, 2, 10], fov: 45 }} shadows gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow shadow-mapSize={[2048, 2048]} />
          <directionalLight position={[-5, 5, -5]} intensity={0.3} />
          <spotLight position={[0, 8, 0]} intensity={0.5} angle={0.6} penumbra={1} castShadow />

          <Environment preset="dawn" />

          {/* Fog for atmosphere */}
          <fog attach="fog" args={["#ffc0cb", 8, 20]} />

          <ToriiGateModel />

          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={15} blur={2} far={4} />
        </Suspense>
      </Canvas>
    </div>
  )
}
