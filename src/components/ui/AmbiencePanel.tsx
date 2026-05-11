"use client";

import { ReactNode } from "react";

interface AmbiencePanelProps {
  icon: string;
  title: string;
  body: string;
}

export default function AmbiencePanel({ icon, title, body }: AmbiencePanelProps) {
  return (
    <div
      className="relative p-10 overflow-hidden group transition-all duration-400 h-full"
      style={{
        background: "linear-gradient(145deg, rgba(28,16,8,0.7), rgba(10,6,4,0.85))",
        border: "1px solid rgba(245,158,11,0.07)",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,158,11,0.18)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,158,11,0.07)";
      }}
    >
      {/* Top glow streak on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-50 transition-opacity duration-400 pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, var(--c-amber), transparent)" }}
      />

      <span className="block text-3xl mb-4">{icon}</span>

      <h3
        className="mb-2"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 300 }}
      >
        {title}
      </h3>

      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.88rem", fontStyle: "italic",
          fontWeight: 300, color: "var(--c-muted)", lineHeight: 1.65,
        }}
      >
        {body}
      </p>
    </div>
  );
}