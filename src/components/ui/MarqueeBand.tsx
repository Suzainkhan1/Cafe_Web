const ITEMS = [
  "Specialty Roast", "Single Origin", "Cold Brew",
  "Nitro Pour", "Pour Over Ritual", "Barista Crafted",
  "Seasonal Menu", "Aura Reserve",
];

export default function MarqueeBand() {
  // Duplicate for seamless loop
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div
      className="relative z-10 overflow-hidden py-4"
      style={{
        background: "linear-gradient(90deg, var(--c-dark), rgba(245,158,11,0.05), var(--c-dark))",
        borderTop:    "1px solid rgba(245,158,11,0.08)",
        borderBottom: "1px solid rgba(245,158,11,0.08)",
      }}
    >
      <div
        className="flex w-max"
        style={{ animation: "marqueeScroll 25s linear infinite" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-12 px-12"
            style={{ fontFamily: "'DM Mono', monospace",
                     fontSize: "0.62rem", letterSpacing: "0.22em",
                     textTransform: "uppercase", color: "var(--c-amber)",
                     whiteSpace: "nowrap" }}
          >
            {item}
            <span className="w-1 h-1 rounded-full bg-coffee-accent opacity-40" />
          </span>
        ))}
      </div>
    </div>
  );
}