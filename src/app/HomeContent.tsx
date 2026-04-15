"use client";

import Header from "../components/Header";
import Hero from "../components/Hero";
import MarqueeStrip from "../components/MarqueeStrip";
import Services from "../components/Services";
import CaseStudies from "../components/CaseStudies";
import About from "../components/About";
import Process from "../components/Process";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";
import ScrollToTop from "../components/ScrollToTop";
import SmoothScroll from "../components/SmoothScroll";
import SectionDivider from "../components/SectionDivider";
import AmbientOrbs from "../components/AmbientOrbs";
import PullQuote from "../components/PullQuote";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <AmbientOrbs />
      <SmoothScroll>
        <main id="main-content" className="flex w-full flex-col overflow-x-hidden bg-(--color-bg-primary)">
          <Header />
          <Hero />
          <MarqueeStrip />
          <Services />
          <SectionDivider
            from="var(--color-bg-primary)"
            to="var(--color-bg-elevated)"
            className="h-32 md:h-60"
          />
          <PullQuote text="We don't just build — we craft." />
          <CaseStudies />
          <SectionDivider
            from="var(--color-bg-elevated)"
            to="#0D0C14"
            className="h-40 md:h-80"
          />
          <PullQuote text="Every pixel earns its place." />
          <About />
          <SectionDivider
            from="#0D0C14"
            to="var(--color-bg-elevated)"
            className="h-32 md:h-60"
          />
          <Process />
          <SectionDivider
            from="var(--color-bg-elevated)"
            to="var(--color-bg-primary)"
            className="h-40 md:h-80"
          />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
