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

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <SmoothScroll>
        <main id="main-content" className="flex w-full flex-col overflow-x-hidden bg-[var(--color-bg-primary)]">
          <Header />
          <Hero />
          <MarqueeStrip />
          <Services />
          <div className="h-[15rem] bg-[var(--color-bg-primary)]" />
          <CaseStudies />
          <div className="h-[20rem] bg-[var(--color-bg-secondary)]" />
          <About />
          <div className="h-[15rem]" style={{ background: "linear-gradient(#0D0C14, var(--color-bg-secondary))" }} />
          <Process />
          <div className="h-[20rem] bg-[var(--color-bg-secondary)]" />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
