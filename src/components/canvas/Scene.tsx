"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, Sparkles } from "@react-three/drei";
import CoffeeCup from "./CoffeeCup";
import CoffeeBeans from "./CoffeeBeans";
import { Suspense } from "react";

export default function Scene() {
  return (
    <div className="absolute inset-0 -z-10 w-full h-full">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} color="#ffe0b2" />
          <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={1.5} color="#ffffff" castShadow />
          <spotLight position={[-10, -10, -10]} angle={0.3} penumbra={1} intensity={1} color="#f59e0b" />
          <pointLight position={[0, -2, 5]} intensity={0.5} color="#ea580c" />
          
          <CoffeeCup />
          <CoffeeBeans count={50} />
          
          {/* Richer floating particles for the "aura" effect */}
          <Sparkles 
            count={150} 
            scale={12} 
            size={5} 
            speed={0.3} 
            opacity={0.4} 
            color="#f59e0b" 
          />
          
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.4} 
            scale={20} 
            blur={2} 
            far={10} 
            color="#ff9900"
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
