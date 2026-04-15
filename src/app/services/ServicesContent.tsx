"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CustomCursor from "../../components/CustomCursor";
import SmoothScroll from "../../components/SmoothScroll";
import { Check, ArrowUpRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    title: "Web Design & Development",
    desc: "Custom websites built with modern frameworks, optimized for performance, SEO, and conversion. From single landing pages to full-scale web applications.",
    features: [
      "Custom design tailored to your brand",
      "Mobile-first, fully responsive",
      "SEO-optimized from the ground up",
      "Performance-tuned (Core Web Vitals)",
      "CMS integration if needed",
    ],
  },
  {
    num: "02",
    title: "Visual Design",
    desc: "Colour systems, typography, and component design that give your product a look built with intent — not picked from a template.",
    features: [
      "Design language & colour system",
      "Typography scale & component library",
      "Responsive UI across all breakpoints",
      "Motion & micro-interaction design",
      "Figma handoff-ready files",
    ],
  },
  {
    num: "03",
    title: "AI, LLMs & Agents",
    desc: "Custom AI agents, LLM-powered tools, chatbots, and automation workflows that help you scale operations and deliver intelligent customer experiences.",
    featured: true,
    features: [
      "Custom LLM agent development",
      "AI chatbot & assistant integration",
      "Workflow automation (Zapier, Make, custom)",
      "Tool-use & function-calling pipelines",
    ],
  },
];

export default function ServicesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cleanups: (() => void)[] = [];

    // Hero heading split
    const heading = headingRef.current;
    if (heading) {
      const split = new SplitType(heading, { types: "chars" });
      if (prefersReducedMotion) {
        gsap.set(split.chars || [], { opacity: 1, y: 0 });
      } else {
        gsap.set(split.chars || [], { opacity: 0, y: 50 });
        gsap.to(split.chars || [], {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.02,
          ease: "power3.out",
          delay: 0.3,
        });
      }
      cleanups.push(() => split.revert());
    }

    // Hero subtext
    const hero = heroRef.current;
    if (hero && !prefersReducedMotion) {
      const subs = hero.querySelectorAll(".hero-fade");
      gsap.set(subs, { opacity: 0, y: 30 });
      gsap.to(subs, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.6,
      });
    }

    // Service blocks stagger reveal
    const servicesEl = servicesRef.current;
    if (servicesEl && !prefersReducedMotion) {
      const ctx = gsap.context(() => {
        const blocks = servicesEl.querySelectorAll(".service-block");
        blocks.forEach((block, i) => {
          gsap.fromTo(
            block,
            { opacity: 0, y: 60, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: block,
                start: "top 80%",
                once: true,
              },
              delay: i * 0.05,
            }
          );
        });
      }, servicesEl);
      cleanups.push(() => ctx.revert());
    }

    // CTA reveal
    const ctaEl = ctaRef.current;
    if (ctaEl && !prefersReducedMotion) {
      const ctx = gsap.context(() => {
        gsap.from(ctaEl, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaEl,
            start: "top 80%",
            once: true,
          },
        });
      }, ctaEl);
      cleanups.push(() => ctx.revert());
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <CustomCursor />
      <SmoothScroll>
      <div className="flex w-full flex-col overflow-x-hidden bg-[var(--color-bg-primary)]">
        <Header />

        {/* Hero — Full viewport, monumental */}
        <section
          ref={heroRef}
          className="relative flex min-h-screen w-full flex-col items-center justify-center px-16 pt-24 pb-20 max-md:px-6 max-md:pt-20 max-md:pb-12"
        >
          {/* Ghost watermark */}
          <span
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[var(--color-text-primary)]"
            style={{ fontSize: "clamp(80px, 16vw, 260px)", opacity: 0.02, letterSpacing: "0.1em" }}
          >
            SERVICES
          </span>

          <div className="relative z-10 flex flex-col items-center gap-8 text-center">
            <span className="hero-fade font-body text-[11px] font-medium tracking-[4px] text-[var(--color-accent)]">
              SERVICES
            </span>
            <h1
              ref={headingRef}
              className="font-display tracking-[-2px] text-[var(--color-text-primary)]"
              style={{ fontSize: "clamp(36px, 7vw, 110px)", lineHeight: 1.05 }}
            >
              One developer.
            </h1>
            <p className="hero-fade max-w-[600px] font-body text-lg leading-[1.7] text-[var(--color-text-dim)] max-md:text-base">
              No agency overhead, no handoff delays, no communication gaps.
              One person who owns the work from first pixel to final deploy.
            </p>
          </div>
        </section>

        {/* Service Blocks — stacked, dramatic */}
        <section ref={servicesRef} className="w-full px-16 pb-32 max-md:px-6 max-md:pb-16">
          <div className="mx-auto flex max-w-[1000px] flex-col gap-12">
            {services.map((service) => (
              <div
                key={service.num}
                className={`service-block flex gap-16 border p-12 max-lg:flex-col max-lg:gap-8 max-md:p-6 ${
                  service.featured
                    ? "border-[var(--color-accent-border)] bg-gradient-to-r from-[var(--color-bg-card-alt)] to-[var(--color-bg-card)]"
                    : "border-[var(--color-border)] bg-[var(--color-bg-card)]"
                }`}
              >
                <div className="flex flex-1 flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <span
                      className="font-display text-[var(--color-accent)] opacity-15"
                      style={{ fontSize: "clamp(48px, 5vw, 72px)", lineHeight: 1 }}
                    >
                      {service.num}
                    </span>
                    {service.featured && (
                      <span className="bg-[#7C5CFC18] px-3 py-1 font-body text-[10px] font-medium tracking-[2px] text-[var(--color-accent)]">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <h3
                    className="font-display tracking-[-1px] text-[var(--color-text-primary)]"
                    style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
                  >
                    {service.title}
                  </h3>
                  <p className="font-body text-base leading-[1.7] text-[var(--color-text-dim)]">
                    {service.desc}
                  </p>
                </div>
                <div className="flex w-[380px] flex-col gap-5 max-lg:w-full">
                  <span className="font-body text-xs font-semibold tracking-[1px] text-[var(--color-text-primary)]">
                    WHAT&apos;S INCLUDED
                  </span>
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <Check className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                      <span className="font-body text-sm text-[var(--color-text-secondary)]">
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
        <section ref={ctaRef} className="relative w-full bg-[#0D0C14] px-16 py-32 max-md:px-6 max-md:py-16">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full opacity-60" style={{ background: "radial-gradient(circle, #7C5CFC12 0%, transparent 100%)" }} />
          <div className="relative z-10 flex flex-col items-center gap-8">
            <h2
              className="font-display tracking-[-2px] text-[var(--color-text-primary)] text-center"
              style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
            >
              Not sure where to start?
            </h2>
            <p className="max-w-[500px] text-center font-body text-lg text-[var(--color-text-dim)] max-md:text-base">
              Book a free discovery call and we&apos;ll figure out exactly what you need — no pitch, no pressure.
            </p>
            <div className="flex items-center gap-4 max-md:flex-col">
              <a href="https://calendly.com/heyitsnimbus/30min" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)] px-9 py-[18px] font-body text-base font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_24px_#7C5CFC20]">
                Book a Call
                <ArrowUpRight className="h-[18px] w-[18px]" />
              </a>
              <a href="mailto:heyitsnimbus@gmail.com" className="flex items-center gap-2.5 border border-[var(--color-border-light)] px-9 py-[18px] font-body text-sm tracking-[0.5px] text-[var(--color-text-secondary)] transition-all duration-300 hover:border-[var(--color-accent-border)] hover:text-[var(--color-text-primary)]">
                heyitsnimbus@gmail.com
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
      </SmoothScroll>
    </>
  );
}
