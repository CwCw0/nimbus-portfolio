"use client";

import { useState, useEffect } from "react";
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
import LoadingScreen from "../components/LoadingScreen";
import ScrollToTop from "../components/ScrollToTop";
import SmoothScroll from "../components/SmoothScroll";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("nimbus-loaded")) {
      setLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
    sessionStorage.setItem("nimbus-loaded", "true");
  };

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <CustomCursor />
      <ScrollToTop />
      <SmoothScroll>
        <main id="main-content" className="flex w-full flex-col overflow-x-hidden bg-[var(--color-bg-primary)]">
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
