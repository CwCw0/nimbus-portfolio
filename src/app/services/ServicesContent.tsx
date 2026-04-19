"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CustomCursor from "../../components/CustomCursor";
import SmoothScroll from "../../components/SmoothScroll";
import WaterRipple from "../../components/WaterRipple";
import { Check, ArrowUpRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      "Designed directly in code — what you see is the final product",
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
  const servicesRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const cleanups: (() => void)[] = [];

    // Hero entrance
    const hero = heroRef.current;
    if (hero) {
      const ctx = gsap.context(() => {
        const label = hero.querySelector(".hero-label");
        const heading = hero.querySelector(".hero-heading");
        const desc = hero.querySelector(".hero-desc");

        const tl = gsap.timeline({ delay: 0.2 });

        if (label) {
          gsap.set(label, { autoAlpha: 0, x: -20 });
          tl.to(label, { autoAlpha: 1, x: 0, duration: 0.5, ease: "power3.out" });
        }
        if (heading) {
          gsap.set(heading, { autoAlpha: 0, y: 60 });
          tl.to(heading, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.2");
        }
        if (desc) {
          gsap.set(desc, { autoAlpha: 0, y: 30 });
          tl.to(desc, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.3");
        }
      }, hero);
      cleanups.push(() => ctx.revert());
    }

    // Service blocks — line draw + content reveal
    const servicesEl = servicesRef.current;
    if (servicesEl) {
      const ctx = gsap.context(() => {
        const blocks = servicesEl.querySelectorAll(".service-block");
        blocks.forEach((block) => {
          const line = block.querySelector(".service-line");
          const content = block.querySelector(".service-content");
          const features = block.querySelector(".service-features");

          const tl = gsap.timeline({
            scrollTrigger: { trigger: block, start: "top 80%", once: true },
          });

          if (line) {
            gsap.set(line, { scaleX: 0 });
            tl.to(line, { scaleX: 1, duration: 0.6, ease: "power3.inOut" });
          }
          if (content) {
            gsap.set(content, { autoAlpha: 0, y: 40 });
            tl.to(content, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.3");
          }
          if (features) {
            const items = features.querySelectorAll(".feature-item");
            gsap.set(items, { autoAlpha: 0, x: 20 });
            tl.to(
              items,
              { autoAlpha: 1, x: 0, duration: 0.4, stagger: 0.06, ease: "power3.out" },
              "-=0.3"
            );
          }
        });
      }, servicesEl);
      cleanups.push(() => ctx.revert());
    }

    // CTA
    const ctaEl = ctaRef.current;
    if (ctaEl) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ctaEl.querySelector(".cta-inner"),
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: ctaEl, start: "top 80%", once: true },
          }
        );
      }, ctaEl);
      cleanups.push(() => ctx.revert());
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <CustomCursor />
      <WaterRipple />
      <SmoothScroll>
        <div className="flex w-full flex-col overflow-x-hidden bg-(--color-bg-primary)">
          <Header />

          {/* Hero */}
          <section
            ref={heroRef}
            className="relative flex min-h-screen w-full flex-col items-center justify-center px-16 pt-24 pb-20 max-md:px-6 max-md:pt-20 max-md:pb-12"
          >
            <span
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-(--color-text-primary)"
              style={{
                fontSize: "clamp(80px, 16vw, 260px)",
                opacity: 0.02,
                letterSpacing: "0.1em",
              }}
            >
              SERVICES
            </span>

            <div className="relative z-10 flex flex-col items-center gap-8 text-center">
              <span className="hero-label font-body text-[11px] font-medium tracking-[4px] text-(--color-accent)">
                SERVICES
              </span>
              <h1
                className="hero-heading font-display tracking-[-2px] text-(--color-text-primary)"
                style={{
                  fontSize: "clamp(36px, 7vw, 110px)",
                  lineHeight: 1.05,
                }}
              >
                One developer.
              </h1>
              <p className="hero-desc max-w-150 font-body text-lg leading-[1.7] text-(--color-text-dim) max-md:text-base">
                No agency overhead, no handoff delays, no communication gaps.
                One person who owns the work from first pixel to final deploy.
              </p>
            </div>
          </section>

          {/* Service Blocks */}
          <section
            ref={servicesRef}
            className="w-full px-16 pb-32 max-md:px-6 max-md:pb-16"
          >
            <div className="mx-auto flex max-w-250 flex-col gap-0">
              {services.map((service) => (
                <div key={service.num} className="service-block">
                  {/* Horizontal line — draws on scroll */}
                  <div
                    className="service-line h-px w-full bg-(--color-border)"
                    style={{ transformOrigin: "left" }}
                  />

                  <div
                    className={`service-content flex gap-16 py-16 max-lg:flex-col max-lg:gap-8 ${
                      service.featured ? "relative" : ""
                    }`}
                  >
                    {/* Featured glow */}
                    {service.featured && (
                      <div
                        className="pointer-events-none absolute inset-0 opacity-30"
                        style={{
                          background:
                            "radial-gradient(ellipse at 30% 50%, #7C5CFC08, transparent 70%)",
                        }}
                      />
                    )}

                    <div className="flex flex-1 flex-col gap-6">
                      <div className="flex items-center gap-4">
                        <span
                          className="font-display text-(--color-accent) opacity-15"
                          style={{
                            fontSize: "clamp(48px, 5vw, 72px)",
                            lineHeight: 1,
                          }}
                        >
                          {service.num}
                        </span>
                        {service.featured && (
                          <span className="bg-[#7C5CFC18] px-3 py-1 font-body text-[10px] font-medium tracking-[2px] text-(--color-accent)">
                            FEATURED
                          </span>
                        )}
                      </div>
                      <h3
                        className="font-display tracking-[-1px] text-(--color-text-primary)"
                        style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
                      >
                        {service.title}
                      </h3>
                      <p className="font-body text-base leading-[1.7] text-(--color-text-dim)">
                        {service.desc}
                      </p>
                    </div>
                    <div className="service-features flex w-95 flex-col gap-5 max-lg:w-full">
                      <span className="font-body text-xs font-semibold tracking-[1px] text-(--color-text-primary)">
                        WHAT&apos;S INCLUDED
                      </span>
                      {service.features.map((f) => (
                        <div
                          key={f}
                          className="feature-item flex items-center gap-3"
                        >
                          <Check className="h-4 w-4 shrink-0 text-(--color-accent)" />
                          <span className="font-body text-sm text-(--color-text-secondary)">
                            {f}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              {/* Final line */}
              <div className="h-px w-full bg-(--color-border)" />
            </div>
          </section>

          {/* CTA */}
          <section
            ref={ctaRef}
            className="relative w-full bg-[#0D0C14] px-16 py-32 max-md:px-6 max-md:py-16"
          >
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-100 w-150 rounded-full opacity-60"
              style={{
                background:
                  "radial-gradient(circle, #7C5CFC12 0%, transparent 100%)",
              }}
            />
            <div className="cta-inner relative z-10 flex flex-col items-center gap-8">
              <h2
                className="text-center font-display tracking-[-2px] text-(--color-text-primary)"
                style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
              >
                Not sure where to start?
              </h2>
              <p className="max-w-125 text-center font-body text-lg text-(--color-text-dim) max-md:text-base">
                Book a free discovery call and we&apos;ll figure out exactly
                what you need — no pitch, no pressure.
              </p>
              <div className="flex items-center gap-4 max-md:flex-col">
                <a
                  href="https://calendly.com/heyitsnimbus/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-magnetic
                  className="flex items-center gap-2.5 bg-linear-to-br from-(--color-accent) to-(--color-accent-light) px-9 py-4.5 font-body text-base font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_24px_#7C5CFC20]"
                >
                  Book a Call
                  <ArrowUpRight className="h-4.5 w-4.5" />
                </a>
                <a
                  href="mailto:heyitsnimbus@gmail.com"
                  className="flex items-center gap-2.5 border border-(--color-border-light) px-9 py-4.5 font-body text-sm tracking-[0.5px] text-(--color-text-secondary) transition-all duration-300 hover:border-(--color-accent-border) hover:text-(--color-text-primary)"
                >
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
