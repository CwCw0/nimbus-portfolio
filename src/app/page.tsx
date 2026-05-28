import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";
import { MarqueeDesign } from "@/components/sections/MarqueeStrip";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import ChangelogPreview from "@/components/sections/ChangelogPreview";
import VaultPreview from "@/components/sections/VaultPreview";
import About from "@/components/sections/About";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <MarqueeDesign />
      <Services />
      <Work />
      <ChangelogPreview />
      <VaultPreview />
      <About />
      <ContactSection />
    </>
  );
}
