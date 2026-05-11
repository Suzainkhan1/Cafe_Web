"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function CoffeeBeans({ count = 40 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Generate random data for beans
  const beans = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 20, // Spread across X
        (Math.random() - 0.5) * 20, // Spread across Y
        (Math.random() - 0.5) * 15 - 5 // Spread across Z (mostly behind)
      );
      const rotation = new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const scale = 0.15 + Math.random() * 0.15;
      
      const speed = 0.05 + Math.random() * 0.05;
      const rotationSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      );

      temp.push({ position, rotation, scale, speed, rotationSpeed });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    beans.forEach((bean, i) => {
      // Gentle floating motion
      const t = time * bean.speed;
      
      dummy.position.copy(bean.position);
      dummy.position.y += Math.sin(t + i) * 2;
      dummy.position.x += Math.cos(t * 0.8 + i) * 1;

      // Gentle rotation
      dummy.rotation.x = bean.rotation.x + time * bean.rotationSpeed.x;
      dummy.rotation.y = bean.rotation.y + time * bean.rotationSpeed.y;
      dummy.rotation.z = bean.rotation.z + time * bean.rotationSpeed.z;

      dummy.scale.set(bean.scale, bean.scale, bean.scale);
      dummy.updateMatrix();
      
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} castShadow receiveShadow>
      {/* We use a capsule to mimic a stylized coffee bean */}
      <capsuleGeometry args={[0.3, 0.5, 4, 16]} />
      <meshStandardMaterial 
        color="#3d1f00" 
        roughness={0.7}
        metalness={0.1}
      />
    </instancedMesh>
  );
}
