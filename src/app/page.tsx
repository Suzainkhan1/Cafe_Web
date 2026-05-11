import Cursor         from "@/components/ui/Cursor";
import AmbientCanvas  from "@/components/canvas/AmbientCanvas";
import BeansCanvas    from "@/components/canvas/BeansCanvas";
import Navbar         from "@/components/ui/Navbar";
import Hero           from "@/components/sections/Hero";
import MarqueeBand    from "@/components/ui/MarqueeBand";
import Atmosphere     from "@/components/sections/Atmosphere";
import GlowDivider    from "@/components/ui/GlowDivider";
import MenuPreview     from "@/components/sections/MenuPreview";
import HowItWorks     from "@/components/sections/HowItWorks";
import Ambience       from "@/components/sections/Ambience";
import CTA            from "@/components/sections/CTA";
import Footer         from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-coffee-dark text-white overflow-x-hidden">
      {/* Global overlays — fixed, always on top */}
      <Cursor />
      <AmbientCanvas />
      <BeansCanvas />

      {/* Page content */}
      <Navbar />
      <Hero />
      <MarqueeBand />
      <Atmosphere />
      <GlowDivider />
      <MenuPreview />
      <GlowDivider />
      <HowItWorks />
      <GlowDivider />
      <Ambience />
      <CTA />
      <Footer />
    </main>
  );
}