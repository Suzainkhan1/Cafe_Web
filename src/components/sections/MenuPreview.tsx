import RevealWrapper from "@/components/ui/RevealWrapper";
import MenuItem      from "@/components/ui/MenuItem";

const MENU_ITEMS = [
  { num: "01", icon: "☕", name: "Obsidian Espresso",  desc: "Dark fruit, rich cacao, a whisper of smoke. Pulled at precisely 9 bars.",                         price: "₹ 480", tag: "Signature" },
  { num: "02", icon: "🧊", name: "Amber Cold Brew",    desc: "48-hour steep. Silky, caramel-touched, hauntingly smooth at any temperature.",                   price: "₹ 620", tag: "Reserve"   },
  { num: "03", icon: "🌊", name: "Nitro Cascade",      desc: "Nitrogen-infused cascade pour. Creamy without cream. A theatre of texture.",                     price: "₹ 580", tag: null        },
  { num: "04", icon: "🫖", name: "Yirgacheffe Pour",   desc: "Ethiopian single-origin, light roast. Jasmine, lemon zest, bergamot.",                           price: "₹ 540", tag: "Seasonal"  },
  { num: "05", icon: "🌙", name: "Moonlight Cortado",  desc: "Equal parts espresso and warm oat milk. Balance, precision, restraint.",                         price: "₹ 420", tag: null        },
  { num: "06", icon: "✨", name: "Aura Reserve Blend", desc: "Master roaster's private selection. Available in limited quantities each morning.",               price: "₹ 780", tag: "Limited"   },
];

export default function MenuPreview() {
  return (
    <section id="menu" className="relative z-[5] py-32 overflow-hidden">
      {/* Background glow — purely decorative, no events */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(245,158,11,0.03) 0%, transparent 60%)" }}
      />

      <div className="max-w-6xl mx-auto px-8 md:px-12">

        {/* ── Header ─────────────────────────────── */}
        <div className="text-center mb-20">
          <RevealWrapper>
            <div
              className="flex items-center justify-center gap-3 mb-6"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.6rem", letterSpacing: "0.35em",
                textTransform: "uppercase", color: "var(--c-amber)",
              }}
            >
              <span className="w-6 h-px bg-coffee-accent" />
              The Menu
              <span className="w-6 h-px bg-coffee-accent" />
            </div>
          </RevealWrapper>

          <RevealWrapper delay={0.1}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 300, lineHeight: 1.1,
              }}
            >
              Crafted with <em className="italic text-coffee-accent">intention</em>
            </h2>
          </RevealWrapper>
        </div>

        {/* ── Grid ───────────────────────────────── */}
        {/*
          MenuItem is a "use client" component that owns its own hover state.
          RevealWrapper is also "use client" (IntersectionObserver).
          This parent stays a Server Component — no event props passed server→client.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px">
          {MENU_ITEMS.map((item, i) => (
            <RevealWrapper key={item.name} delay={i * 0.08}>
              <MenuItem {...item} />
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}