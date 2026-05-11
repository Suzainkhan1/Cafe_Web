import RevealWrapper  from "@/components/ui/RevealWrapper";
import AmbiencePanel  from "@/components/ui/AmbiencePanel";

const ROW_1_PANELS = [
  { icon: "🎵", title: "Curated Sound",   body: "Ambient jazz, lo-fi textures, and curated silence. The perfect frequency for focus or conversation." },
  { icon: "🌿", title: "Living Interior", body: "Biophilic design, warm concrete, aged brass. A space designed to breathe and evolve with the seasons." },
];

const ROW_2_PANELS = [
  { icon: "📱", title: "Smart Ordering",  body: "Order at your pace, from your seat. No queues, no friction. Just you and the moment." },
  { icon: "🕯",  title: "Evening Mode",   body: "After 6pm, Aura transforms. Candlelit corners, a cocktail menu, and a mood that lingers long after last orders." },
  { icon: "🗺",  title: "Provenance Map", body: "Scan your cup to trace your bean's journey from farm coordinates to your table." },
];

export default function Ambience() {
  return (
    <section id="ambience" className="relative z-[5] py-32 overflow-hidden">
      {/* Decorative background — no events, stays on server */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent, rgba(245,158,11,0.03) 50%, transparent)" }}
      />

      <div className="max-w-6xl mx-auto px-8 md:px-12">

        {/* ── Row 1: panel | quote | panel ───────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px mb-px">

          <RevealWrapper delay={0}>
            <AmbiencePanel {...ROW_1_PANELS[0]} />
          </RevealWrapper>

          {/* Centre quote — no hover events, stays in server component */}
          <RevealWrapper delay={0.1}>
            <div
              className="flex flex-col justify-center items-center text-center p-16 h-full"
              style={{
                background: "linear-gradient(145deg, rgba(30,18,8,0.9), rgba(15,9,4,0.95))",
                border: "1px solid rgba(245,158,11,0.07)",
              }}
            >
              <blockquote
                className="relative leading-relaxed mb-5"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.2rem, 2.5vw, 1.75rem)",
                  fontWeight: 300, fontStyle: "italic",
                }}
              >
                {/* Decorative open-quote */}
                <span
                  className="absolute -top-4 -left-2 leading-none pointer-events-none"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "5rem", color: "var(--c-amber)", opacity: 0.15,
                  }}
                >
                  &ldquo;
                </span>
                Coffee is not just a drink. It is a ritual, a pause, a presence shared between people.
              </blockquote>

              <cite
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.55rem", letterSpacing: "0.2em",
                  textTransform: "uppercase", color: "var(--c-amber)", fontStyle: "normal",
                }}
              >
                — Aura Philosophy
              </cite>
            </div>
          </RevealWrapper>

          <RevealWrapper delay={0.2}>
            <AmbiencePanel {...ROW_1_PANELS[1]} />
          </RevealWrapper>
        </div>

        {/* ── Row 2: three panels ─────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px">
          {ROW_2_PANELS.map((panel, i) => (
            <RevealWrapper key={panel.title} delay={i * 0.1}>
              <AmbiencePanel {...panel} />
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}