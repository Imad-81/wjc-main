'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useEffect } from 'react';
import { Mesh, MeshStandardMaterial } from 'three';

function Model() {
  const { scene } = useGLTF('model/model.glb');

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        // Example: Change color to Vermilion (traditional Torii color)
        // You can change 'red' to any hex code or color name
        if (mesh.material) {
          (mesh.material as MeshStandardMaterial).color.set('#ff4500'); // OrangeRed
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={1.3} position={[0, 0.2, 0]} />;
}

export default function TorriGate() {
  return (
    <div className='w-full h-full '>
      <Canvas
        camera={{ position: [0, 0, 2], fov: 80 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}
