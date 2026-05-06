"use client";

import { ArrowUpRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const heading = headingRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // Heading — character stagger reveal
      if (heading) {
        const split = new SplitType(heading, { types: "chars,words" });
        gsap.set(split.chars || [], { autoAlpha: 0, y: 40 });

        gsap.to(split.chars || [], {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.015,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 80%",
            once: true,
          },
        });

        cleanups.push(() => split.revert());
      }

      // Label entrance — slide from left
      const label = el.querySelector(".about-label");
      if (label) {
        gsap.fromTo(
          label,
          { autoAlpha: 0, x: -30 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: label, start: "top 85%", once: true },
          }
        );
      }

      // Body paragraphs — staggered reveal with varied animation
      const paras = el.querySelectorAll(".about-para");
      paras.forEach((p, i) => {
        gsap.fromTo(
          p,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: p,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      // Proof point — fade in with purpose
      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll(".stat-item");
        gsap.fromTo(
          statItems,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // CTA entrance
      const cta = el.querySelector(".about-cta");
      if (cta) {
        gsap.fromTo(
          cta,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: cta, start: "top 85%", once: true },
          }
        );
      }

      // Vertical accent line draw
      const vLine = el.querySelector(".about-vline");
      if (vLine) {
        gsap.fromTo(
          vLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: vLine,
              start: "top 75%",
              once: true,
            },
          }
        );
      }

      // Tech pills — staggered entrance
      const pills = el.querySelectorAll(".tech-pill");
      gsap.fromTo(
        pills,
        { autoAlpha: 0, y: 10 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el.querySelector(".tech-pills"),
            start: "top 85%",
            once: true,
          },
        }
      );
      // Parallax depth — stats column and text column scroll at different rates
      const statsCol = el.querySelector(".about-stats-col");
      const textCol = el.querySelector(".about-text-col");

      if (statsCol && window.innerWidth >= 769) {
        gsap.to(statsCol, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      if (textCol && window.innerWidth >= 769) {
        gsap.to(textCol, {
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // Heading parallax — drifts up slightly faster
      if (heading && window.innerWidth >= 769) {
        gsap.to(heading, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // Staggered exit — elements fade out as section scrolls away
      const exitElements = el.querySelectorAll(
        ".about-cta, .tech-pills, .about-para, .stat-item, .about-label"
      );
      if (exitElements.length > 0) {
        const reversed = Array.from(exitElements).reverse();
        gsap.to(reversed, {
          autoAlpha: 0,
          y: -20,
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "bottom 60%",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, el);

    cleanups.push(() => ctx.revert());

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section
      ref={ref}
      id="about"
      className="relative w-full overflow-hidden px-16 py-32 max-md:px-6 max-md:py-20"
      style={{ background: "var(--color-bg-elevated)" }}
    >
      {/* Asymmetric layout — offset grid */}
      <div className="relative mx-auto max-w-350">
        {/* Top row — label + massive heading */}
        <div className="mb-20 max-md:mb-12">
          <span className="about-label block font-body text-[11px] font-medium tracking-[3px] text-(--color-accent) mb-6">
            ABOUT
          </span>

          <h2
            ref={headingRef}
            className="font-display leading-[1.05] tracking-[-2px] text-(--color-text-primary) max-w-[900px]"
            style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
          >
            Not just a dev. A builder from end to end.
          </h2>
        </div>

        {/* Main content — asymmetric columns */}
        <div className="flex gap-20 max-md:flex-col max-md:gap-12">
          {/* Left column — narrower, stats + CTA (35%) */}
          <div className="about-stats-col flex w-[35%] flex-col gap-12 max-md:w-full">
            {/* Proof point — one real commitment, not vanity numbers */}
            <div ref={statsRef} className="flex flex-col gap-10">
              <div className="stat-item flex flex-col gap-3">
                <span
                  className="block font-display italic text-(--color-accent)"
                  style={{
                    fontSize: "clamp(28px, 3.5vw, 44px)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                  }}
                >
                  One project at a time.
                </span>
                <p className="font-body text-sm leading-[1.7] text-(--color-text-muted)">
                  No juggling ten clients. No junior designers learning on your project. When I take your work on, it gets my full focus until it ships.
                </p>
              </div>

              <div className="stat-item border-t border-(--color-border) pt-8">
                <span className="font-body text-[11px] font-medium tracking-[2px] text-(--color-text-subtle)">
                  WHAT THAT MEANS
                </span>
                <div className="mt-4 flex flex-col gap-3">
                  {["Direct communication, no middlemen", "Weekly progress you can see", "Code you own, fully documented"].map((point) => (
                    <div key={point} className="flex items-center gap-3">
                      <div className="h-1 w-1 rounded-full bg-(--color-accent) shrink-0" />
                      <span className="font-body text-sm text-(--color-text-dim)">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="about-cta">
              <a
                href="#contact"
                data-magnetic
                className="inline-flex items-center gap-2 border border-(--color-border-light) bg-(--color-grid) px-7 py-3.5 font-body text-sm font-semibold text-(--color-text-primary) transition-all duration-300 hover:border-(--color-accent-border) hover:shadow-[0_0_24px_#7C5CFC20]"
              >
                Work With Me
                <ArrowUpRight className="h-3.5 w-3.5 text-(--color-accent)" />
              </a>
            </div>
          </div>

          {/* Vertical accent line */}
          <div
            className="about-vline w-px self-stretch bg-(--color-accent) opacity-10 max-md:hidden"
            style={{ transformOrigin: "top" }}
          />

          {/* Right column — wider, body text (60%) */}
          <div className="about-text-col flex flex-1 flex-col gap-8">
            <p className="about-para font-body text-lg leading-[1.8] text-(--color-text-dim)">
              Developer, designer, and founder of Nimbus Forma Studio. I
              study the systems, the design, the business, and the user
              before writing a single line of code.
            </p>

            <p className="about-para font-body text-base leading-[1.8] text-(--color-text-dim)">
              Every project gets obsessive attention: performance tuning,
              design that communicates, and code built to outlast its
              framework. I work directly with founders and small teams who
              want a partner, not a vendor.
            </p>

            <p className="about-para font-body text-base leading-[1.8] text-(--color-text-dim)">
              One project at a time. Full attention. No split focus,
              no account managers, no handoffs.
            </p>

            {/* Tech pills */}
            <div className="tech-pills mt-4 flex flex-wrap items-center gap-3">
              <span className="mr-2 font-body text-[10px] font-medium tracking-[2px] text-(--color-text-subtle)">
                TOOLS
              </span>
              {[
                "Next.js",
                "React",
                "TypeScript",
                "GSAP",
                "Tailwind",
                "Vercel",
              ].map((tool) => (
                <span
                  key={tool}
                  className="tech-pill border border-(--color-border) px-3 py-1.5 font-body text-[12px] text-(--color-text-muted) transition-all duration-300 hover:border-(--color-accent-secondary) hover:text-(--color-accent-secondary) hover:shadow-[0_0_12px_rgba(94,234,212,0.08)]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
