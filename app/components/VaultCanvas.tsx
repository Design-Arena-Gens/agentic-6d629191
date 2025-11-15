"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function VaultDoor() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.z += delta * 0.05;
  });

  return (
    <group ref={group}>
      {/* Outer ring */}
      <mesh>
        <torusGeometry args={[1.4, 0.08, 24, 200]} />
        <meshStandardMaterial metalness={0.95} roughness={0.2} color="#bfc6d2" />
      </mesh>
      {/* Inner ring */}
      <mesh rotation={[0, 0, Math.PI / 6]}>
        <torusGeometry args={[0.95, 0.06, 24, 200]} />
        <meshStandardMaterial metalness={0.95} roughness={0.25} color="#cdd4df" />
      </mesh>
      {/* Dial */}
      <mesh>
        <cylinderGeometry args={[0.22, 0.22, 0.12, 48]} />
        <meshStandardMaterial metalness={0.9} roughness={0.15} color="#e7ebf3" />
      </mesh>
      {/* Spokes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI) / 3]}> 
          <boxGeometry args={[0.9, 0.03, 0.03]} />
          <meshStandardMaterial metalness={0.95} roughness={0.22} color="#c7cfda" />
        </mesh>
      ))}
    </group>
  );
}

export default function VaultCanvas() {
  return (
    <div style={{ width: "100%", height: 380 }} className="card">
      <Canvas camera={{ position: [0, 0, 4.25], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={0.7} />
        <spotLight position={[-2, 3, 2]} angle={0.2} penumbra={0.5} intensity={0.9} />
        <group position={[0, 0.1, 0]}>
          <VaultDoor />
        </group>
        <ContactShadows opacity={0.5} scale={6} blur={2.2} far={3.2} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
