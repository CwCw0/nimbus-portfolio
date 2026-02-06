"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import MarqueeStrip from "../components/MarqueeStrip";
import Services from "../components/Services";
import TechStack from "../components/TechStack";
import CaseStudies from "../components/CaseStudies";
import About from "../components/About";
import Process from "../components/Process";
import SocialProof from "../components/SocialProof";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Pricing from "../components/Pricing";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";
import LoadingScreen from "../components/LoadingScreen";
import ScrollToTop from "../components/ScrollToTop";

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
      <div className="flex w-full flex-col overflow-x-hidden bg-[var(--color-bg-primary)]">
        <Header />
        <Hero />
        <MarqueeStrip />
        <Services />
        <TechStack />
        <CaseStudies />
        <About />
        <Process />
        <SocialProof />
        <FAQ />
        <Contact />
        <Pricing />
        <FinalCTA />
        <Footer />
      </div>
    </>
  );
}
