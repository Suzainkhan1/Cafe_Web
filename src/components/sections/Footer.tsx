const COLS = [
  {
    title: "Navigate",
    links: ["Experience", "Menu", "Reserve", "Events"],
  },
  {
    title: "Info",
    links: ["About Aura", "Sourcing", "Press", "Careers"],
  },
  {
    title: "Connect",
    links: ["Instagram", "Newsletter", "Gift Cards", "Wholesale"],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-[5]"
      style={{ borderTop: "1px solid rgba(245,158,11,0.08)" }}>
      <div className="max-w-6xl mx-auto px-8 md:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-16">
        {/* Brand */}
        <div>
          <div className="mb-3"
            style={{ fontFamily: "'Cormorant Garamond',serif",
                     fontSize: "2.4rem", fontWeight: 300, letterSpacing: "0.1em" }}>
            Aura
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond',serif",
                      fontSize: "0.9rem", fontStyle: "italic",
                      fontWeight: 300, color: "var(--c-muted)", lineHeight: 1.65 }}>
            A futuristic café for the intentional soul. Mumbai's most immersive coffee ritual.
          </p>
        </div>

        {COLS.map(col => (
          <div key={col.title}>
            <div className="mb-6" style={{ fontFamily: "'DM Mono',monospace",
                                           fontSize: "0.56rem", letterSpacing: "0.25em",
                                           textTransform: "uppercase", color: "var(--c-amber)" }}>
              {col.title}
            </div>
            <ul className="space-y-3 list-none">
              {col.links.map(link => (
                <li key={link}>
                  <a href="#"
                    className="transition-colors duration-300 hover:text-coffee-light"
                    style={{ fontFamily: "'Cormorant Garamond',serif",
                             fontSize: "0.92rem", fontWeight: 300,
                             color: "var(--c-muted)", textDecoration: "none" }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto px-8 md:px-12 pb-8 flex flex-col sm:flex-row justify-between items-center gap-3"
        style={{ borderTop: "1px solid rgba(245,158,11,0.05)", paddingTop: "1.5rem" }}>
        <span style={{ fontFamily: "'DM Mono',monospace",
                       fontSize: "0.55rem", letterSpacing: "0.15em",
                       color: "var(--c-dim)" }}>
          © 2024 Aura Coffee — Mumbai
        </span>
        <span style={{ fontFamily: "'DM Mono',monospace",
                       fontSize: "0.55rem", letterSpacing: "0.15em",
                       color: "var(--c-dim)" }}>
          Crafted with obsession
        </span>
      </div>
    </footer>
  );
}