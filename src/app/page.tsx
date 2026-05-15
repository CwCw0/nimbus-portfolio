import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";
import { MarqueeDesign, MarqueeAttention } from "@/components/sections/MarqueeStrip";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import VaultPreview from "@/components/sections/VaultPreview";
import BlogPreview from "@/components/sections/BlogPreview";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <MarqueeDesign />
      <Services />
      <Work />
      <About />
      <MarqueeAttention />
      <Process />
      <VaultPreview />
      <BlogPreview />
      <ContactSection />
    </>
  );
}
