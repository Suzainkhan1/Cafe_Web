export default function GlowDivider() {
  return (
    <div className="relative w-full h-px" style={{
      background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.25), rgba(234,88,12,0.18), transparent)",
    }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-5"
        style={{
          background: "radial-gradient(ellipse, rgba(245,158,11,0.35), transparent)",
          filter: "blur(8px)",
        }}
      />
    </div>
  );
}