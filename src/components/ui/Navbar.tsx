"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-12 py-6 transition-all duration-500"
      style={scrolled ? {
        background: "rgba(10,6,4,0.75)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(245,158,11,0.08)",
      } : {}}
    >
      {/* Logo */}
      <a
        href="#"
        className="relative font-display text-[1.75rem] font-light tracking-[0.15em] text-coffee-light no-underline"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Aura
        <span className="absolute top-1 -right-3 text-[0.4rem] text-coffee-accent">●</span>
      </a>

      {/* Links */}
      <ul className="hidden md:flex gap-10 list-none">
        {[
          { label: "Experience", href: "#atmosphere" },
          { label: "Menu",       href: "#menu" },
          { label: "Ritual",     href: "#process" },
          { label: "Ambience",   href: "#ambience" },
        ].map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="relative font-mono text-[0.65rem] tracking-[0.2em] uppercase text-[var(--c-muted)] no-underline transition-colors duration-300 hover:text-coffee-light group"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {label}
              <span
                className="absolute -bottom-1 left-0 right-0 h-px bg-coffee-accent scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
              />
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-coffee-dark bg-coffee-accent px-5 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(245,158,11,0.4)] relative overflow-hidden group"
        style={{ fontFamily: "'DM Mono', monospace", clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)" }}
      >
        <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-400" />
        Reserve Table
      </button>
    </nav>
  );
}