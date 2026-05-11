"use client";

interface MenuItemProps {
  num: string;
  icon: string;
  name: string;
  desc: string;
  price: string;
  tag: string | null;
}

export default function MenuItem({ num, icon, name, desc, price, tag }: MenuItemProps) {
  return (
    <div
      className="relative group cursor-pointer overflow-hidden h-full"
      style={{
        background: "linear-gradient(145deg, rgba(28,16,8,0.9), rgba(13,8,4,0.95))",
        border: "1px solid rgba(245,158,11,0.07)",
        padding: "2.5rem",
        transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.borderColor = "rgba(245,158,11,0.22)";
        el.style.transform   = "translateY(-4px)";
        el.style.boxShadow   = "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(245,158,11,0.07)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.borderColor = "rgba(245,158,11,0.07)";
        el.style.transform   = "translateY(0)";
        el.style.boxShadow   = "none";
      }}
    >
      {/* Radial glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(245,158,11,0.07), transparent 50%)" }}
      />

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, var(--c-amber), transparent)" }}
      />

      {/* Tag badge */}
      {tag && (
        <span
          className="absolute top-5 right-5 text-coffee-dark bg-coffee-accent px-2 py-1"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.48rem", letterSpacing: "0.12em", textTransform: "uppercase",
          }}
        >
          {tag}
        </span>
      )}

      {/* Number */}
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.52rem", letterSpacing: "0.2em",
          color: "var(--c-amber)", opacity: 0.6, marginBottom: "1.2rem",
        }}
      >
        {num}
      </div>

      {/* Icon */}
      <span className="block text-3xl mb-4">{icon}</span>

      {/* Name */}
      <h3
        className="mb-3"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem", fontWeight: 300 }}
      >
        {name}
      </h3>

      {/* Description */}
      <p
        className="mb-5 leading-relaxed"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.88rem", fontStyle: "italic",
          fontWeight: 300, color: "var(--c-muted)",
        }}
      >
        {desc}
      </p>

      {/* Price */}
      <span
        style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "var(--c-amber)" }}
      >
        {price}
      </span>
    </div>
  );
}