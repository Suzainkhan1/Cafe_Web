import RevealWrapper from "@/components/ui/RevealWrapper";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section id="cta" className="relative z-[5] py-40 text-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(245,158,11,0.05) 0%, transparent 60%)" }} />

      <div className="max-w-4xl mx-auto px-8">
        <RevealWrapper>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif",
                       fontSize: "clamp(3rem,7vw,6rem)",
                       fontWeight: 300, lineHeight: 1, marginBottom: "1.5rem" }}>
            <em className="italic text-coffee-accent">Reserve</em><br />
            your moment
          </h2>
        </RevealWrapper>

        <RevealWrapper delay={0.1}>
          <p className="max-w-md mx-auto mb-14 leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond',serif",
                     fontSize: "1.1rem", fontStyle: "italic",
                     fontWeight: 300, color: "var(--c-muted)" }}>
            Tables fill early. Don't leave the best seat to chance.
          </p>
        </RevealWrapper>

        <RevealWrapper delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button variant="primary" size="lg">Book a Table</Button>
            <Button variant="ghost"   size="lg">Order for Delivery</Button>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}