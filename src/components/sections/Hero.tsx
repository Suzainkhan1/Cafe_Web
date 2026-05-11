"use client";

import { useEffect, useRef } from "react";
import CoffeeCup from "@/components/canvas/CoffeeCup";
import Button    from "@/components/ui/Button";

const STREAKS = [
  { width: "60%", top: "30%", duration: "7s",  delay: "0s"  },
  { width: "40%", top: "60%", duration: "11s", delay: "3s"  },
  { width: "50%", top: "75%", duration: "9s",  delay: "6s"  },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax cup on scroll
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current?.querySelector<SVGElement>("svg");
      if (el) el.style.transform =
        `translate(-50%, calc(-50% + ${window.scrollY * 0.12}px))`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      {/* ── Ambient glow orbs ─────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute rounded-full"
          style={{
            width: 600, height: 600, top: "8%", left: "12%",
            background: "radial-gradient(circle, rgba(245,158,11,0.18) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "blob 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500, bottom: "5%", right: "8%",
            background: "radial-gradient(circle, rgba(234,88,12,0.14) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "blob2 22s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 280, height: 280, top: "50%", left: "50%",
            background: "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)",
            filter: "blur(60px)",
            animation: "pulseGlow 6s ease-in-out infinite",
          }}
        />
      </div>

      {/* ── Light streaks ─────────────────────────── */}
      {STREAKS.map((s, i) => (
        <div
          key={i}
          className="absolute h-px -left-[10%] pointer-events-none"
          style={{
            width: s.width, top: s.top,
            background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.4), transparent)",
            animation: `streakMove ${s.duration} ${s.delay} linear infinite`,
          }}
        />
      ))}

      {/* ── Animated SVG Cup ──────────────────────── */}
      <CoffeeCup />

      {/* ── Hero Content ──────────────────────────── */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20 pointer-events-none">

        {/* Eyebrow */}
        <div
          className="flex items-center justify-center gap-4 mb-8"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.6rem", letterSpacing: "0.35em",
            textTransform: "uppercase", color: "var(--c-amber)",
            animation: "fadeUp 1s 0.2s ease forwards", opacity: 0,
          }}
        >
          <span className="w-10 h-px bg-gradient-to-r from-transparent to-coffee-accent" />
          Est. 2024 — Mumbai, India
          <span className="w-10 h-px bg-gradient-to-l from-transparent to-coffee-accent" />
        </div>

        {/* Title */}
        <h1
          className="mb-8 leading-[0.9] tracking-tight"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(4rem,10vw,9rem)",
            fontWeight: 300,
            animation: "fadeUp 1.2s 0.4s ease forwards", opacity: 0,
          }}
        >
          Where Coffee<br />
          Becomes{" "}
          <span
            className="italic"
            style={{
              background: "linear-gradient(135deg, #f59e0b, #ea580c)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Art
          </span>
        </h1>

        {/* Sub */}
        <p
          className="max-w-md mx-auto mb-14 leading-relaxed"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1rem,2vw,1.25rem)",
            fontWeight: 300, fontStyle: "italic",
            color: "var(--c-muted)",
            animation: "fadeUp 1s 0.6s ease forwards", opacity: 0,
          }}
        >
          A sanctuary for those who taste with intention.
          Futuristic ritual, ancient craft.
        </p>

        {/* Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-5 justify-center items-center pointer-events-auto"
          style={{ animation: "fadeUp 1s 0.8s ease forwards", opacity: 0 }}
        >
          <Button variant="primary" size="lg">Order Now</Button>
          <Button variant="ghost"   size="lg">Explore Menu</Button>
        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────── */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ animation: "fadeIn 1s 1.5s ease forwards", opacity: 0 }}
      >
        <div className="w-px h-14" style={{
          background: "linear-gradient(to bottom, transparent, var(--c-amber), transparent)",
          animation: "scrollPulse 2s ease-in-out infinite",
        }} />
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.5rem", letterSpacing: "0.3em",
          textTransform: "uppercase", color: "var(--c-dim)",
          writingMode: "vertical-rl", transform: "rotate(180deg)",
        }}>Scroll</span>
      </div>
    </section>
  );
}