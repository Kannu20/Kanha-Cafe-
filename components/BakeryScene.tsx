// 'use client';

// import { useRef, useMemo } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { Float, Sphere, Torus, Box, Cylinder } from '@react-three/drei';
// import * as THREE from 'three';

// function FloatingParticles() {
//   const meshRef = useRef<THREE.InstancedMesh>(null);
//   const count = 80;

//   const dummy = useMemo(() => new THREE.Object3D(), []);
//   const positions = useMemo(() => {
//     return Array.from({ length: count }, () => ({
//       x: (Math.random() - 0.5) * 20,
//       y: (Math.random() - 0.5) * 20,
//       z: (Math.random() - 0.5) * 10,
//       speed: 0.2 + Math.random() * 0.6,
//       offset: Math.random() * Math.PI * 2,
//       scale: 0.03 + Math.random() * 0.08,
//     }));
//   }, []);

//   useFrame(({ clock }) => {
//     if (!meshRef.current) return;
//     const t = clock.getElapsedTime();
//     positions.forEach((p, i) => {
//       dummy.position.set(
//         p.x + Math.sin(t * p.speed + p.offset) * 0.5,
//         p.y + Math.cos(t * p.speed * 0.7 + p.offset) * 0.8,
//         p.z
//       );
//       const s = p.scale * (1 + Math.sin(t + p.offset) * 0.2);
//       dummy.scale.setScalar(s);
//       dummy.rotation.z = t * p.speed;
//       dummy.updateMatrix();
//       meshRef.current!.setMatrixAt(i, dummy.matrix);
//     });
//     meshRef.current.instanceMatrix.needsUpdate = true;
//   });

//   return (
//     <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
//       <sphereGeometry args={[1, 8, 8]} />
//       <meshStandardMaterial color="#e5a24a" roughness={0.3} metalness={0.1} transparent opacity={0.6} />
//     </instancedMesh>
//   );
// }

// function FloatingDonut({ position }: { position: [number, number, number] }) {
//   const ref = useRef<THREE.Mesh>(null);
//   useFrame(({ clock }) => {
//     if (!ref.current) return;
//     ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
//     ref.current.rotation.y += 0.008;
//   });
//   return (
//     <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
//       <Torus ref={ref} position={position} args={[0.5, 0.2, 16, 32]}>
//         <meshStandardMaterial color="#c46e1f" roughness={0.4} metalness={0.15} />
//       </Torus>
//     </Float>
//   );
// }

// function FloatingCake({ position }: { position: [number, number, number] }) {
//   const ref = useRef<THREE.Group>(null);
//   useFrame(({ clock }) => {
//     if (!ref.current) return;
//     ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.4) * 0.4;
//   });
//   return (
//     <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1}>
//       <group ref={ref} position={position}>
//         <Cylinder args={[0.4, 0.4, 0.5, 16]} position={[0, 0, 0]}>
//           <meshStandardMaterial color="#8b5e3c" roughness={0.6} />
//         </Cylinder>
//         <Cylinder args={[0.45, 0.45, 0.1, 16]} position={[0, 0.3, 0]}>
//           <meshStandardMaterial color="#f5ddb0" roughness={0.4} />
//         </Cylinder>
//         <Sphere args={[0.08, 8, 8]} position={[0, 0.42, 0]}>
//           <meshStandardMaterial color="#dc8a2a" roughness={0.2} metalness={0.3} />
//         </Sphere>
//       </group>
//     </Float>
//   );
// }

// function FloatingStar({ position }: { position: [number, number, number] }) {
//   const ref = useRef<THREE.Mesh>(null);
//   useFrame(({ clock }) => {
//     if (!ref.current) return;
//     ref.current.rotation.z += 0.015;
//     ref.current.rotation.y = clock.getElapsedTime() * 0.5;
//   });
//   return (
//     <Float speed={2} rotationIntensity={1} floatIntensity={1.2}>
//       <Box ref={ref} position={position} args={[0.25, 0.25, 0.1]}>
//         <meshStandardMaterial color="#fdf6ec" roughness={0.3} metalness={0.4} transparent opacity={0.8} />
//       </Box>
//     </Float>
//   );
// }

// export default function BakeryScene() {
//   return (
//     <Canvas
//       camera={{ position: [0, 0, 8], fov: 60 }}
//       style={{ position: 'absolute', inset: 0 }}
//       gl={{ antialias: true, alpha: true }}
//     >
//       <ambientLight intensity={0.6} />
//       <directionalLight position={[5, 5, 5]} intensity={1.2} color="#faefd8" />
//       <directionalLight position={[-5, -3, 0]} intensity={0.4} color="#c46e1f" />
//       <pointLight position={[0, 0, 5]} intensity={0.8} color="#e5a24a" />

//       <FloatingParticles />

//       <FloatingDonut position={[-3, 1, -1]} />
//       <FloatingDonut position={[3.5, -0.5, -2]} />
//       <FloatingDonut position={[-1.5, -2, -1]} />

//       <FloatingCake position={[2, 1.5, -1]} />
//       <FloatingCake position={[-3.5, -1, -2]} />

//       <FloatingStar position={[1, -1.5, 0]} />
//       <FloatingStar position={[-2, 2, -1]} />
//       <FloatingStar position={[3.5, 2, -2]} />
//     </Canvas>
//   );
// }

'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Torus, Cylinder, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Performance: detect mobile / low-end device ─── */
function useIsLowEnd() {
  const [lowEnd, setLowEnd] = useState(false);
  useEffect(() => {
    const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const cores  = navigator.hardwareConcurrency ?? 4;
    setLowEnd(mobile || cores <= 2);
  }, []);
  return lowEnd;
}

/* ─── Instanced floating particles ─── */
function FloatingParticles({ count = 60 }) {
  const ref   = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const pts = useMemo(() =>
    Array.from({ length: count }, () => ({
      x:      (Math.random() - 0.5) * 22,
      y:      (Math.random() - 0.5) * 22,
      z:      (Math.random() - 0.5) * 10,
      speed:  0.15 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
      scale:  0.025 + Math.random() * 0.065,
    })), [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    pts.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * p.speed + p.offset) * 0.6,
        p.y + Math.cos(t * p.speed * 0.7 + p.offset) * 0.9,
        p.z,
      );
      const s = p.scale * (1 + Math.sin(t + p.offset) * 0.25);
      dummy.scale.setScalar(s);
      dummy.rotation.z = t * p.speed;
      dummy.updateMatrix();
      ref.current?.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color="#e5a24a"
        roughness={0.3}
        metalness={0.15}
        transparent
        opacity={0.55}
      />
    </instancedMesh>
  );
}

/* ─── Floating donut / torus ─── */
function FloatingDonut({ position, color = '#c46e1f', scale = 1 }: { position: [number, number, number], color?: string, scale?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = Math.sin(t * 0.45) * 0.35;
    ref.current.rotation.y += 0.007;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.9}>
      <Torus ref={ref} position={position} args={[0.5 * scale, 0.18 * scale, 16, 32]}>
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.2} />
      </Torus>
    </Float>
  );
}

/* ─── Mini layered cake ─── */
function FloatingCake({ position }: { position: [number, number, number] }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.38) * 0.45;
  });
  return (
    <Float speed={1.1} rotationIntensity={0.25} floatIntensity={1.1}>
      <group ref={group} position={position}>
        {/* Base tier */}
        <Cylinder args={[0.42, 0.44, 0.48, 18]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#8b5e3c" roughness={0.6} />
        </Cylinder>
        {/* Frosting rim */}
        <Cylinder args={[0.46, 0.46, 0.09, 18]} position={[0, 0.28, 0]}>
          <meshStandardMaterial color="#f5ddb0" roughness={0.4} />
        </Cylinder>
        {/* Top tier */}
        <Cylinder args={[0.28, 0.3, 0.32, 18]} position={[0, 0.48, 0]}>
          <meshStandardMaterial color="#a67c52" roughness={0.6} />
        </Cylinder>
        {/* Cherry on top */}
        <Sphere args={[0.09, 10, 10]} position={[0, 0.72, 0]}>
          <meshStandardMaterial color="#dc2626" roughness={0.2} metalness={0.3} />
        </Sphere>
      </group>
    </Float>
  );
}

/* ─── Glowing star diamond ─── */
function FloatingStar({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z += 0.012;
    ref.current.rotation.y  = clock.getElapsedTime() * 0.55;
  });
  return (
    <Float speed={2.2} rotationIntensity={1.1} floatIntensity={1.3}>
      <Box ref={ref} position={position} args={[0.22, 0.22, 0.09]}>
        <meshStandardMaterial
          color="#fdf0d5"
          roughness={0.2}
          metalness={0.55}
          transparent
          opacity={0.85}
        />
      </Box>
    </Float>
  );
}

/* ─── Warm ambient ring ─── */
function AmbientRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z  = clock.getElapsedTime() * 0.06;
    ref.current.rotation.x  = Math.sin(clock.getElapsedTime() * 0.1) * 0.15;
  });
  return (
    <Torus ref={ref} args={[4.5, 0.06, 8, 120]} position={[0, 0, -3]} rotation={[0.4, 0, 0]}>
      <meshStandardMaterial color="#d4a853" roughness={0.2} metalness={0.6} transparent opacity={0.25} />
    </Torus>
  );
}

/* ─── Scene Lights ─── */
function Lights() {
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[5, 5, 5]}   intensity={1.3} color="#faefd8" />
      <directionalLight position={[-5, -3, 0]}  intensity={0.45} color="#c46e1f" />
      <pointLight       position={[0, 0, 5]}    intensity={0.9}  color="#e5a24a" />
      <pointLight       position={[3, -2, 2]}   intensity={0.4}  color="#f9c06a" />
    </>
  );
}

/* ─── Main exported component ─── */
export default function BakeryScene() {
  const lowEnd = useIsLowEnd();
  const particleCount = lowEnd ? 30 : 65;

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 58 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      gl={{
        antialias:       !lowEnd,   // disable on mobile for performance
        alpha:           true,
        powerPreference: 'high-performance',
        stencil:         false,
        depth:           true,
      }}
      dpr={lowEnd ? [1, 1] : [1, 1.5]}   // cap pixel ratio on mobile
      frameloop="always"
      performance={{ min: 0.5 }}          // allow Three.js to drop frames on slow devices
    >
      <Lights />

      <FloatingParticles count={particleCount} />

      {/* Donuts */}
      <FloatingDonut position={[-3.2, 1.2, -1]}    color="#c46e1f" scale={1}    />
      <FloatingDonut position={[3.6, -0.6, -2]}    color="#8b5e3c" scale={0.85} />
      <FloatingDonut position={[-1.8, -2.2, -1.2]} color="#d4a853" scale={0.7}  />

      {/* Cakes — skip on low-end to save draw calls */}
      {!lowEnd && <FloatingCake position={[2.2, 1.8, -1]}    />}
      {!lowEnd && <FloatingCake position={[-3.8, -1.2, -2]}  />}

      {/* Stars */}
      <FloatingStar position={[1.2, -1.8, 0]}   />
      <FloatingStar position={[-2.2, 2.2, -1]}  />
      {!lowEnd && <FloatingStar position={[3.8, 2.2, -2]} />}

      {/* Ambient ring */}
      {!lowEnd && <AmbientRing />}
    </Canvas>
  );
}