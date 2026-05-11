"use client";

import { useEffect, useRef } from "react";

export default function CoffeeCup() {
  const groupRef = useRef<SVGGElement>(null);
  const steamRef = useRef<SVGGElement>(null);

  useEffect(() => {
    let rafId = 0;
    let t = 0;
    let mx = 0, my = 0, tx = 0, ty = 0;

    function onMouseMove(e: MouseEvent) {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener("mousemove", onMouseMove);

    function animate() {
      t += 0.01;
      tx += (mx * 12 - tx) * 0.06;
      ty += (my *  8 - ty) * 0.06;

      const floatY = Math.sin(t) * 8;
      const floatR = Math.sin(t * 0.7) * 1.5;

      if (groupRef.current) {
        groupRef.current.setAttribute(
          "transform",
          `translate(${250 + tx},${270 + floatY + ty}) rotate(${floatR + tx * 0.3})`
        );
      }
      if (steamRef.current) {
        const o = (0.25 + Math.sin(t * 1.5) * 0.15).toFixed(2);
        steamRef.current.setAttribute("opacity", o);
        steamRef.current.setAttribute("transform", `translate(0,${Math.sin(t * 0.8) * 3})`);
      }

      rafId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <svg
      viewBox="0 0 500 520"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] pointer-events-none select-none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="cupGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(245,158,11,0.18)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <radialGradient id="liquidGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="#2a1008" />
          <stop offset="100%" stopColor="#0d0502" />
        </radialGradient>
        <linearGradient id="cupBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#2e1a0a" />
          <stop offset="100%" stopColor="#0f0804" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="10" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Background radial glow */}
      <ellipse cx="250" cy="270" rx="210" ry="210" fill="url(#cupGlow)" />

      <g ref={groupRef} transform="translate(250,270)">
        {/* Drop shadow */}
        <ellipse cx="0" cy="108" rx="88" ry="14" fill="rgba(0,0,0,0.55)" filter="url(#softGlow)" />

        {/* Cup body */}
        <polygon
          points="-85,-100 85,-100 70,100 -70,100"
          fill="url(#cupBodyGrad)"
          stroke="rgba(245,158,11,0.2)"
          strokeWidth="0.5"
        />

        {/* Rim */}
        <rect x="-87" y="-104" width="174" height="8" rx="2"
          fill="#3a2010" stroke="rgba(245,158,11,0.35)" strokeWidth="0.5" />

        {/* Coffee surface */}
        <ellipse cx="0" cy="-96" rx="83" ry="12" fill="url(#liquidGrad)" />
        <ellipse cx="-20" cy="-100" rx="28" ry="5"
          fill="rgba(245,158,11,0.05)" transform="rotate(-15,-20,-100)" />

        {/* Steam */}
        <g ref={steamRef} opacity="0.3">
          <path d="M-25,-112 Q-35,-140 -25,-165 Q-15,-190 -25,-215"
            fill="none" stroke="rgba(253,248,240,0.6)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M0,-114 Q10,-145 0,-170 Q-10,-195 0,-220"
            fill="none" stroke="rgba(253,248,240,0.5)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M25,-112 Q35,-140 25,-165 Q15,-190 25,-213"
            fill="none" stroke="rgba(253,248,240,0.55)" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Handle */}
        <path d="M72,-40 Q112,-40 112,0 Q112,40 72,40"
          fill="none" stroke="#2e1a0a" strokeWidth="17" strokeLinecap="round" />
        <path d="M72,-40 Q112,-40 112,0 Q112,40 72,40"
          fill="none" stroke="rgba(245,158,11,0.15)" strokeWidth="0.5" strokeLinecap="round" />

        {/* Accent ring */}
        <ellipse cx="0" cy="100" rx="72" ry="6"
          fill="none" stroke="rgba(245,158,11,0.7)" strokeWidth="1" filter="url(#glow)" />

        {/* Sheen */}
        <polygon points="-70,-90 -55,-90 -65,90 -72,90" fill="rgba(255,255,255,0.035)" />

        {/* Saucer */}
        <ellipse cx="0" cy="108" rx="102" ry="11"
          fill="#200e06" stroke="rgba(245,158,11,0.14)" strokeWidth="0.5" />
      </g>
    </svg>
  );
}