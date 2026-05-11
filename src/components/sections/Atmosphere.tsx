"use client";

import { useEffect, useRef } from "react";
import RevealWrapper from "@/components/ui/RevealWrapper";

const CARDS = [
  { tag: "Signature", name: "Obsidian Espresso",   price: "₹ 480" },
  { tag: "Reserve",   name: "Amber Cold Brew",      price: "₹ 620" },
  { tag: "Seasonal",  name: "Yirgacheffe Pour Over", price: "₹ 540" },
];

const STATS = [
  { number: "12",  suffix: "",  label: "Origin Countries" },
  { number: "48",  suffix: "h", label: "Cold Brew Steep"  },
  { number: "93",  suffix: "°", label: "Extraction Temp"  },
];

export default function Atmosphere() {
  const statsRef = useRef<HTMLDivElement>(null);
  const cardRef  = useRef<HTMLDivElement>(null);

  // Counter animation
  useEffect(() => {
    const container = statsRef.current;
    if (!container) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      container.querySelectorAll<HTMLSpanElement>("[data-count]").forEach(el => {
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix ?? "";
        let start = 0;
        const t0 = performance.now();
        function tick(now: number) {
          const p = Math.min((now - t0) / 1800, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(start + (target - start) * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
      obs.disconnect();
    }, { threshold: 0.5 });
    obs.observe(container);
    return () => obs.disconnect();
  }, []);

  // Mouse parallax on card stack
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    function onMove(e: MouseEvent) {
      const r  = el!.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) / r.width;
      const dy = (e.clientY - (r.top  + r.height / 2)) / r.height;
      el!.querySelectorAll<HTMLDivElement>("[data-depth]").forEach(c => {
        const d = Number(c.dataset.depth) * 10;
        const base = c.dataset.rotate ?? "0";
        c.style.transform = `translate(${dx * d}px, ${dy * d}px) rotate(${base}deg)`;
      });
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="atmosphere" className="relative z-[5] py-40 overflow-hidden">
      <div className="max-w-6xl mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">

          {/* ── Text ───────────────────────────────── */}
          <div>
            <RevealWrapper>
              <div className="flex items-center gap-3 mb-8"
                style={{ fontFamily: "'DM Mono', monospace",
                         fontSize: "0.6rem", letterSpacing: "0.35em",
                         textTransform: "uppercase", color: "var(--c-amber)" }}>
                <span className="w-6 h-px bg-coffee-accent" />
                The Experience
              </div>
            </RevealWrapper>

            <RevealWrapper delay={0.1}>
              <h2 className="mb-8 leading-[1.1]"
                style={{ fontFamily: "'Cormorant Garamond', serif",
                         fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 300 }}>
                More than a café —<br />
                an <em className="italic text-coffee-accent">atmosphere</em>
              </h2>
            </RevealWrapper>

            <RevealWrapper delay={0.2}>
              <p className="mb-6 leading-[1.85]"
                style={{ fontFamily: "'Cormorant Garamond', serif",
                         fontSize: "1.05rem", fontWeight: 300,
                         color: "var(--c-muted)" }}>
                Every surface, scent, and sound at Aura is designed with obsessive
                precision. We don't just serve coffee — we orchestrate an experience
                where time slows, senses sharpen, and each sip becomes pure presence.
              </p>
            </RevealWrapper>

            <RevealWrapper delay={0.3}>
              <p className="leading-[1.85]"
                style={{ fontFamily: "'Cormorant Garamond', serif",
                         fontSize: "1.05rem", fontWeight: 300,
                         color: "var(--c-muted)" }}>
                Our beans travel from altitude to your cup through a journey we track,
                verify, and celebrate. You taste the story in every complex note.
              </p>
            </RevealWrapper>

            {/* Stats */}
            <div ref={statsRef} className="flex gap-10 mt-10">
              {STATS.map(s => (
                <RevealWrapper key={s.label} delay={0.4}>
                  <div>
                    <span
                      className="block leading-none text-coffee-accent"
                      style={{ fontFamily: "'Cormorant Garamond', serif",
                               fontSize: "3rem", fontWeight: 300 }}
                      data-count={s.number}
                      data-suffix={s.suffix}
                    >
                      {s.number}{s.suffix}
                    </span>
                    <span style={{ fontFamily: "'DM Mono', monospace",
                                   fontSize: "0.55rem", letterSpacing: "0.2em",
                                   textTransform: "uppercase", color: "var(--c-dim)" }}>
                      {s.label}
                    </span>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </div>

          {/* ── Card stack ─────────────────────────── */}
          <RevealWrapper delay={0.2}>
            <div ref={cardRef} className="relative h-[480px]">
              {/* Orbit ring */}
              <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full pointer-events-none"
                style={{ border: "1px solid rgba(245,158,11,0.08)",
                         animation: "rotateSlow 30s linear infinite" }}>
                <div className="absolute w-2 h-2 rounded-full top-[-4px] left-1/2 -translate-x-1/2"
                  style={{ background: "var(--c-amber)", boxShadow: "0 0 12px var(--c-amber)" }} />
              </div>

              {CARDS.map((card, i) => {
                const styles = [
                  { top: 20,  left: 40, width: 280, height: 360, z: 3, rotate: "0"  },
                  { top: 80,  right: 20, width: 240, height: 300, z: 2, rotate: "4"  },
                  { bottom: 0, left: 80, width: 200, height: 240, z: 1, rotate: "-3" },
                ];
                const s = styles[i];
                return (
                  <div
                    key={card.name}
                    data-depth={i + 1}
                    data-rotate={s.rotate}
                    className="absolute rounded-sm overflow-hidden transition-transform duration-500 hover:-translate-y-3 hover:!rotate-0"
                    style={{
                      ...("top"    in s ? { top:    s.top    } : {}),
                      ...("bottom" in s ? { bottom: s.bottom } : {}),
                      ...("left"   in s ? { left:   s.left   } : {}),
                      ...("right"  in s ? { right:  s.right  } : {}),
                      width: s.width, height: s.height, zIndex: s.z,
                      transform: `rotate(${s.rotate}deg)`,
                      background: "linear-gradient(145deg,#1c1008,#0d0804)",
                      border: "1px solid rgba(245,158,11,0.14)",
                      boxShadow: "0 30px 60px rgba(0,0,0,0.55), 0 0 30px rgba(245,158,11,0.06)",
                    }}
                  >
                    <div className="relative w-full h-full flex flex-col justify-end p-6"
                      style={{ background: "radial-gradient(circle at 30% 30%, rgba(245,158,11,0.08), transparent 60%)" }}>
                      <span style={{ fontFamily: "'DM Mono',monospace",
                                     fontSize: "0.52rem", letterSpacing: "0.2em",
                                     textTransform: "uppercase", color: "var(--c-amber)",
                                     marginBottom: "0.4rem" }}>
                        {card.tag}
                      </span>
                      <span style={{ fontFamily: "'Cormorant Garamond',serif",
                                     fontSize: "1.3rem", fontWeight: 300,
                                     color: "var(--c-cream)" }}>
                        {card.name}
                      </span>
                      <span style={{ fontFamily: "'DM Mono',monospace",
                                     fontSize: "0.65rem", color: "var(--c-dim)",
                                     marginTop: "0.3rem" }}>
                        {card.price}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}