"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "relative overflow-hidden font-mono uppercase tracking-[0.2em] transition-all duration-300 cursor-none group";
  const clip = "clip-path-[polygon(8px_0%,100%_0%,calc(100%-8px)_100%,0%_100%)]";

  const sizes = {
    md: "text-[0.65rem] px-5 py-2.5",
    lg: "text-[0.68rem] px-8 py-4",
  };

  const variants = {
    primary: `text-coffee-dark bg-gradient-to-br from-coffee-accent to-coffee-orange
      hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(245,158,11,0.4)]`,
    ghost: `text-coffee-light border border-white/20 backdrop-blur-md
      hover:border-coffee-accent hover:text-coffee-accent
      hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]`,
  };

  return (
    <button
      {...props}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      style={{ fontFamily: "'DM Mono', monospace",
               clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)" }}
    >
      {/* Shine sweep */}
      <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-400 pointer-events-none" />
      {children}
    </button>
  );
}