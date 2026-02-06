"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CustomCursor from "../../components/CustomCursor";
import { Check, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const services = [
  {
    title: "Web Design & Development",
    desc: "Custom websites built with modern frameworks, optimized for performance, SEO, and conversion. From single landing pages to full-scale web applications.",
    price: "Starting at $3,000",
    features: [
      "Custom design tailored to your brand",
      "Mobile-first, fully responsive",
      "SEO-optimized from the ground up",
      "Performance-tuned (Core Web Vitals)",
      "CMS integration if needed",
    ],
  },
  {
    title: "Brand Identity & Strategy",
    desc: "A cohesive visual identity system that tells your brand story. From logo design to full brand guidelines, everything you need to stand out.",
    price: "Starting at $2,000",
    features: [
      "Logo design + variations",
      "Color palette & typography system",
      "Brand guidelines document",
      "Social media templates",
      "Business card & stationery design",
    ],
  },
  {
    title: "AI Tools & Automation",
    desc: "Custom AI-powered chatbots, content tools, and automation workflows that help you scale operations and improve customer experience.",
    price: "Starting at $5,000",
    featured: true,
    features: [
      "Custom AI chatbot development",
      "Workflow automation (Zapier, Make)",
      "AI-powered content tools",
      "Integration with existing systems",
    ],
  },
];

export default function ServicesPage() {
  const servicesRef = useRef<HTMLElement>(null);
  useScrollReveal(servicesRef, ".service-block", 200);

  return (
    <>
      <CustomCursor />
      <div className="flex w-full flex-col overflow-x-hidden bg-[var(--color-bg-primary)]">
        <Header />

        {/* Services Hero */}
        <section className="snap-section relative w-full px-16 pt-[100px] pb-[80px] max-md:px-6 max-md:pt-16 max-md:pb-12">
          <div className="flex flex-col gap-6 max-w-[900px]">
            <span className="font-inter text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
              SERVICES
            </span>
            <h1 className="font-space-grotesk text-[64px] font-bold leading-[1.05] tracking-[-2px] text-white max-md:text-[36px]">
              Everything you need.<br />One developer.
            </h1>
            <p className="w-[600px] font-inter text-lg leading-[1.7] text-[var(--color-text-dim)] max-md:w-full max-md:text-base">
              End-to-end digital solutions — from design to development to deployment.
              No agency overhead, no communication gaps. Just focused expertise.
            </p>
          </div>
        </section>

        {/* Service Blocks */}
        <section ref={servicesRef} className="w-full px-16 pb-[100px] max-md:px-6 max-md:pb-16">
          <div className="flex flex-col gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className={`service-block flex gap-16 border p-12 opacity-0 transition-all duration-300 max-md:flex-col max-md:gap-8 max-md:p-6 ${
                  service.featured
                    ? "border-[var(--color-accent-border)] bg-gradient-to-r from-[var(--color-bg-card-alt)] to-[var(--color-bg-card)]"
                    : "border-[var(--color-border)] bg-[var(--color-bg-card)]"
                }`}
              >
                <div className="flex flex-1 flex-col gap-6">
                  {service.featured && (
                    <div className="w-fit bg-[#7C5CFC18] px-3 py-1">
                      <span className="font-inter text-[10px] font-medium tracking-[2px] text-[var(--color-accent)]">
                        FEATURED
                      </span>
                    </div>
                  )}
                  <h3 className="font-space-grotesk text-[32px] font-bold tracking-[-1px] text-white max-md:text-2xl">
                    {service.title}
                  </h3>
                  <p className="font-inter text-base leading-[1.7] text-[var(--color-text-dim)]">
                    {service.desc}
                  </p>
                  <span className="font-inter text-lg font-semibold text-[var(--color-accent)]">
                    {service.price}
                  </span>
                </div>
                <div className="flex w-[380px] flex-col gap-5 max-md:w-full">
                  <span className="font-inter text-xs font-semibold tracking-[1px] text-white">
                    WHAT&apos;S INCLUDED
                  </span>
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <Check className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                      <span className="font-inter text-sm text-[var(--color-text-secondary)]">
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="snap-section relative w-full bg-[var(--color-bg-secondary)] px-16 py-[100px] max-md:px-6 max-md:py-16">
          <div className="pointer-events-none absolute left-[420px] top-[50px] h-[300px] w-[500px] rounded-full opacity-80" style={{ background: "radial-gradient(circle, #7C5CFC12 0%, transparent 100%)" }} />
          <div className="relative z-10 flex flex-col items-center gap-8">
            <h2 className="font-space-grotesk text-[48px] font-bold tracking-[-2px] text-white text-center max-md:text-3xl">
              Not sure which service you need?
            </h2>
            <p className="w-[500px] text-center font-inter text-lg text-[var(--color-text-dim)] max-md:w-full max-md:text-base">
              Book a free discovery call. We&apos;ll figure out the best approach together.
            </p>
            <div className="flex items-center gap-4 max-md:flex-col">
              <a href="/contact" className="flex items-center gap-2.5 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)] px-9 py-[18px] font-inter text-base font-semibold text-[#0A0A0B] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_24px_#7C5CFC20]">
                Book a Call
                <ArrowUpRight className="h-[18px] w-[18px]" />
              </a>
              <a href="mailto:heyitsnimbus@gmail.com" className="flex items-center gap-2.5 border border-[var(--color-border-light)] px-9 py-[18px] font-inter text-sm tracking-[0.5px] text-[var(--color-text-secondary)] transition-all duration-300 hover:border-[var(--color-accent-border)] hover:text-white">
                heyitsnimbus@gmail.com
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
