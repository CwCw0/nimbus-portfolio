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
import AmbientOrbs from "../components/AmbientOrbs";
import WaterRipple from "../components/WaterRipple";
import ScrollRevealText from "../components/ScrollRevealText";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <AmbientOrbs />
      <WaterRipple />
      <SmoothScroll>
        <main id="main-content" className="flex w-full flex-col overflow-x-hidden bg-(--color-bg-primary)">
          <Header />
          <Hero />
          <MarqueeStrip />
          <Services />
          <ScrollRevealText text="We study the problem. We design the system. We build the solution. We measure the result. Every pixel earns its place." />
          <CaseStudies />
          <About />
          <ScrollRevealText text="Fast to respond. Focused when it counts. One developer. Full attention. No compromises." />
          <Process />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
