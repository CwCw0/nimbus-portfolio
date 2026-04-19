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
          <CaseStudies />
          <About />
          <Process />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
