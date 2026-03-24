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
      className="relative flex min-h-[100vh] w-full items-center overflow-hidden px-16 py-24 max-md:flex-col max-md:items-start max-md:min-h-0 max-md:px-6 max-md:py-16"
      style={{ background: "#0D0C14" }}
    >
      {/* Massive "ABOUT" watermark */}
      <div
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none max-md:hidden"
        aria-hidden="true"
      >
        <span
          className="font-display text-[var(--color-text-primary)] block"
          style={{
            fontSize: "clamp(100px, 14vw, 240px)",
            opacity: 0.025,
            letterSpacing: "0.08em",
            lineHeight: 1,
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            marginLeft: "40px",
          }}
        >
          ABOUT
        </span>
      </div>

      {/* Mobile watermark */}
      <div className="hidden max-md:block about-reveal mb-6">
        <span
          className="font-display text-[var(--color-text-primary)]"
          style={{ fontSize: "64px", opacity: 0.03, letterSpacing: "0.1em", lineHeight: 1 }}
        >
          ABOUT
        </span>
      </div>

      {/* Main two-column layout */}
      <div className="relative z-10 flex w-full gap-0 max-md:flex-col max-md:gap-12">
        {/* Left — intro + CTA */}
        <div className="flex w-1/2 flex-col justify-center pr-16 max-md:w-full max-md:pr-0">
          <div className="about-reveal">
            <span className="font-body text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
              02 / ABOUT
            </span>
          </div>

          <h2 className="about-reveal mt-6 font-display leading-[1.1] tracking-[-2px] text-[var(--color-text-primary)] max-md:text-[32px]" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            Not just a dev.
            <br />
            A builder from
            <br />
            end to end.
          </h2>

          <p className="about-reveal mt-8 font-body text-lg leading-[1.8] text-[var(--color-text-dim)] max-md:text-base">
            Developer, designer, and founder of Nimbus. I don&apos;t just
            write code — I study the systems, the design, the business, and the
            user.
          </p>

          <div className="about-reveal mt-10">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-[var(--color-border-light)] bg-[var(--color-grid)] px-7 py-3.5 font-body text-sm font-semibold text-[var(--color-text-primary)] transition-all duration-300 hover:border-[var(--color-accent-border)] hover:shadow-[0_0_24px_#7C5CFC20]"
            >
              Hire Me
              <ArrowUpRight className="h-3.5 w-3.5 text-[var(--color-accent)]" />
            </a>
          </div>
        </div>

        {/* Vertical divider */}
        <div className="about-reveal w-px self-stretch bg-[var(--color-accent)] opacity-10 max-md:hidden" />

        {/* Right — body text with inline stats */}
        <div className="flex w-1/2 flex-col justify-center gap-8 pl-16 max-md:w-full max-md:pl-0">
          <p className="about-reveal font-body text-base leading-[1.8] text-[var(--color-text-dim)]">
            With{" "}
            <span
              className="inline font-display text-[var(--color-accent)] align-baseline"
              style={{ fontSize: "clamp(36px, 5vw, 80px)", lineHeight: 0.9, letterSpacing: "-0.02em" }}
            >
              4+
            </span>{" "}
            projects currently in the works and{" "}
            <span
              className="inline font-display text-[var(--color-text-primary)] align-baseline"
              style={{ fontSize: "clamp(36px, 5vw, 80px)", lineHeight: 0.9, letterSpacing: "-0.02em" }}
            >
              3
            </span>{" "}
            products actively building, I focus on shipping real work — not just
            portfolios.
          </p>

          <p className="about-reveal font-body text-base leading-[1.8] text-[var(--color-text-dim)]">
            Every project gets the same obsessive attention to detail: performance
            tuning, pixel-perfect design, and code that&apos;s built to last. I work
            directly with founders and small teams who want a partner, not a vendor.
          </p>

          <p className="about-reveal font-body text-base leading-[1.8] text-[var(--color-text-dim)]">
            Available{" "}
            <span
              className="inline font-display text-[var(--color-text-primary)] align-baseline"
              style={{ fontSize: "clamp(36px, 5vw, 80px)", lineHeight: 0.9, letterSpacing: "-0.02em" }}
            >
              24/7
            </span>{" "}
            — always building, always shipping.
          </p>

          {/* Tech pills */}
          <div className="about-reveal mt-4 flex flex-wrap items-center gap-3">
            <span className="mr-2 font-body text-[10px] font-medium tracking-[2px] text-[var(--color-text-subtle)]">
              TOOLS
            </span>
            {["Next.js", "React", "Python", "Node.js", "Swift", "Flutter", ".NET", "TypeScript", "Tailwind", "LLMs", "AI Agents", "Figma", "Vercel"].map(
              (tool) => (
                <span
                  key={tool}
                  className="border border-[var(--color-border)] px-3 py-1.5 font-body text-[12px] text-[var(--color-text-muted)] transition-all hover:border-[var(--color-accent-border)] hover:text-[var(--color-text-secondary)] hover:shadow-[0_0_12px_#7C5CFC10]"
                >
                  {tool}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
