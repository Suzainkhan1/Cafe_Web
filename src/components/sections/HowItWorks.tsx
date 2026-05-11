"use client";

import { useEffect, useRef } from "react";
import RevealWrapper from "@/components/ui/RevealWrapper";

const STEPS = [
  { num: "01", title: "Source",  body: "Direct relationships with farms across Ethiopia, Colombia, and Japan. We visit, we taste, we commit." },
  { num: "02", title: "Roast",   body: "Small-batch roasting on-site, timed to the bean's unique moisture profile. Never bulk processed." },
  { num: "03", title: "Dial",    body: "Grind size, pressure, temperature — calibrated every morning for the day's atmospheric conditions." },
  { num: "04", title: "Pour",    body: "Into your hands. A ritual from earth to cup. This is where science becomes ceremony." },
];

export default function HowItWorks() {
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = stepsRef.current;
    if (!container) return;
    const steps = container.querySelectorAll<HTMLDivElement>("[data-step]");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const i = Number((e.target as HTMLElement).dataset.step);
          setTimeout(() => (e.target as HTMLElement).classList.add("visible"), i * 150);
        }
      });
    }, { threshold: 0.2 });
    steps.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="process" className="relative z-[5] py-40 overflow-hidden">
      <div className="max-w-6xl mx-auto px-8 md:px-12">

        {/* Header */}
        <div className="text-center mb-24">
          <RevealWrapper>
            <div className="flex items-center justify-center gap-3 mb-6"
              style={{ fontFamily: "'DM Mono',monospace",
                       fontSize: "0.6rem", letterSpacing: "0.35em",
                       textTransform: "uppercase", color: "var(--c-amber)" }}>
              <span className="w-6 h-px bg-coffee-accent" />
              The Ritual
              <span className="w-6 h-px bg-coffee-accent" />
            </div>
          </RevealWrapper>
          <RevealWrapper delay={0.1}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif",
                         fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 300 }}>
              How we craft <em className="italic text-coffee-accent">your cup</em>
            </h2>
          </RevealWrapper>
        </div>

        {/* Timeline */}
        <div ref={stepsRef} className="relative grid grid-cols-1 md:grid-cols-4 gap-0">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)" }} />

          {STEPS.map((step, i) => (
            <div
              key={step.num}
              data-step={i}
              className="reveal px-8 flex flex-col items-center text-center"
            >
              {/* Dot */}
              <div
                className="relative w-24 h-24 rounded-full flex items-center justify-center mb-8 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-shadow duration-400"
                style={{
                  background: "linear-gradient(145deg, rgba(28,16,8,0.8), rgba(10,6,4,0.9))",
                  border: "1px solid rgba(245,158,11,0.2)",
                }}
              >
                <span style={{ fontFamily: "'DM Mono',monospace",
                               fontSize: "0.65rem", color: "var(--c-amber)" }}>
                  {step.num}
                </span>
              </div>

              <h3 className="mb-3" style={{ fontFamily: "'Cormorant Garamond',serif",
                                            fontSize: "1.2rem", fontWeight: 300 }}>
                {step.title}
              </h3>
              <p style={{ fontFamily: "'Cormorant Garamond',serif",
                          fontSize: "0.88rem", fontStyle: "italic",
                          fontWeight: 300, color: "var(--c-muted)", lineHeight: 1.7 }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}