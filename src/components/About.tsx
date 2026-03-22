"use client";

import { ArrowUpRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll(".about-reveal");

      if (prefersReducedMotion) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(items, { opacity: 0, y: 40 });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="about"
      className="snap-section relative w-full bg-[var(--color-bg-primary)] px-16 py-[100px] max-md:px-6 max-md:py-16"
    >
      {/* Section label + accent line */}
      <div className="about-reveal mb-12 flex flex-col gap-4">
        <span className="font-body text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
          02 / ABOUT
        </span>
        <div className="h-px w-[200px] bg-[var(--color-accent)] opacity-30" />
      </div>

      {/* Two-column editorial */}
      <div className="flex gap-20 max-md:flex-col max-md:gap-10">
        {/* Left column — larger intro */}
        <div className="about-reveal flex flex-1 flex-col gap-8 max-md:static" style={{ position: "sticky", top: "120px", alignSelf: "flex-start" }}>
          <h2 className="font-display text-[42px] leading-[1.15] tracking-[-1px] text-[var(--color-text-primary)] max-md:text-[32px]">
            Not just a dev.
            <br />
            A builder from
            <br />
            end to end.
          </h2>
          <p className="font-body text-[20px] leading-[1.8] text-[var(--color-text-dim)] max-md:text-base">
            Developer, designer, and founder of Nimbus. I don&apos;t just
            write code — I study the systems, the design, the business, and the
            user. I build things that work for real people.
          </p>
          <div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-[var(--color-border-light)] bg-[var(--color-grid)] px-7 py-3.5 font-body text-sm font-semibold text-[var(--color-text-primary)] transition-all duration-300 hover:border-[var(--color-accent-border)] hover:shadow-[0_0_24px_#7C5CFC20]"
            >
              Hire Me
              <ArrowUpRight className="h-3.5 w-3.5 text-[var(--color-accent)]" />
            </a>
          </div>
        </div>

        {/* Right column — body text with inline stats */}
        <div className="about-reveal flex flex-1 flex-col gap-6">
          <p className="font-body text-base leading-[1.8] text-[var(--color-text-dim)]">
            With{" "}
            <span className="inline font-display text-[48px] leading-[0.9] tracking-[-1px] text-[var(--color-accent)] align-baseline max-md:text-[36px]">
              4+
            </span>{" "}
            projects currently in the works and{" "}
            <span className="inline font-display text-[48px] leading-[0.9] tracking-[-1px] text-[var(--color-text-primary)] align-baseline max-md:text-[36px]">
              3
            </span>{" "}
            products actively building, I focus on shipping real work — not just
            portfolios.
          </p>
          <p className="font-body text-base leading-[1.8] text-[var(--color-text-dim)]">
            Every project gets the same obsessive attention to detail: performance
            tuning, pixel-perfect design, and code that&apos;s built to last. I work
            directly with founders and small teams who want a partner, not a vendor.
          </p>
          <p className="font-body text-base leading-[1.8] text-[var(--color-text-dim)]">
            Available{" "}
            <span className="inline font-display text-[48px] leading-[0.9] tracking-[-1px] text-[var(--color-text-primary)] align-baseline max-md:text-[36px]">
              24/7
            </span>{" "}
            — always building, always shipping.
          </p>
        </div>
      </div>

      {/* Tech pills — bottom row */}
      <div className="about-reveal mt-16 flex flex-wrap items-center gap-3 max-md:mt-10">
        <span className="font-body text-[10px] font-medium tracking-[2px] text-[var(--color-text-subtle)] mr-2">
          TOOLS
        </span>
        {["Next.js", "React", "Python", "Node.js", "Swift", "Flutter", ".NET", "TypeScript", "Tailwind", "LLMs", "AI Agents", "Figma", "Vercel"].map(
          (tool) => (
            <span
              key={tool}
              className="border border-[var(--color-border)] px-3 py-1.5 font-body text-[12px] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-accent-border)] hover:text-[var(--color-text-secondary)]"
            >
              {tool}
            </span>
          )
        )}
      </div>
    </section>
  );
}
