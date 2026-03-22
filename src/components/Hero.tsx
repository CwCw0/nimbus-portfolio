"use client";

import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.querySelectorAll(".hero-line").forEach((line, i) => {
      (line as HTMLElement).style.animationDelay = `${200 + i * 150}ms`;
      line.classList.add("clip-reveal");
    });
    el.querySelectorAll(".hero-fade").forEach((child, i) => {
      (child as HTMLElement).style.animationDelay = `${700 + i * 120}ms`;
      child.classList.add("drift-up");
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="snap-section relative min-h-[820px] max-md:min-h-[100svh] w-full overflow-hidden bg-[var(--color-bg-primary)]"
    >
      {/* Grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Subtle grid lines */}
      <div className="pointer-events-none absolute inset-0 max-md:hidden">
        <div className="absolute left-[64px] top-0 h-full w-px bg-[var(--color-accent)] opacity-[0.04]" />
        <div className="absolute right-[64px] top-0 h-full w-px bg-[var(--color-accent)] opacity-[0.04]" />
        <div className="absolute left-0 top-[50%] h-px w-full bg-[var(--color-accent)] opacity-[0.03]" />
      </div>

      {/* Vertical NIMBUS watermark — right side */}
      <div
        className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 max-md:hidden"
        style={{
          writingMode: "vertical-rl",
          fontSize: "120px",
          fontWeight: 400,
          letterSpacing: "16px",
          opacity: 0.03,
          color: "var(--color-text-primary)",
          fontFamily: "var(--font-display), 'Instrument Serif', serif",
        }}
      >
        NIMBUS
      </div>

      {/* Main content — left-heavy */}
      <div className="relative z-10 flex h-full min-h-[820px] max-md:min-h-[100svh] w-full flex-col justify-center px-16 max-md:px-6">
        <div className="flex max-w-[900px] flex-col gap-10 max-md:gap-8">
          {/* Stepped heading */}
          <div className="flex flex-col gap-0">
            <h1 className="hero-line font-display text-[96px] leading-[1.0] tracking-[-3px] text-[var(--color-text-primary)] max-md:text-[48px] max-md:tracking-[-2px]">
              For Builders,
            </h1>
            <h1
              className="hero-line font-display text-[96px] leading-[1.0] tracking-[-3px] text-[var(--color-accent)] max-md:text-[48px] max-md:tracking-[-2px] max-md:pl-0"
              style={{ paddingLeft: "80px" }}
            >
              By Builders.
            </h1>
          </div>

          {/* Subtext */}
          <p className="hero-fade max-w-[520px] font-body text-lg leading-[1.7] text-[var(--color-text-dim)] max-md:text-base">
            A creative studio for businesses that want more than a template.
            Design, development, and AI — built with precision, launched with purpose.
          </p>

          {/* CTAs — asymmetric */}
          <div className="hero-fade flex items-center gap-6 max-md:flex-col max-md:items-start max-md:gap-4 max-md:w-full">
            <a
              href="https://calendly.com/heyitsnimbus/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)] px-9 py-4 font-body text-[15px] font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_#7C5CFC25] max-md:w-full max-md:justify-center"
            >
              Start a Project
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#work"
              className="group flex items-center gap-2 font-body text-[15px] text-[var(--color-text-muted)] transition-all duration-300 hover:text-[var(--color-text-primary)]"
            >
              View Work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Full-width tech strip — bottom edge */}
        <div className="hero-fade absolute bottom-0 left-0 right-0 flex items-center border-t border-[var(--color-border)] max-md:hidden">
          <span className="shrink-0 px-8 font-body text-[10px] font-medium tracking-[2px] text-[var(--color-text-subtle)]">
            BUILT WITH
          </span>
          {["NEXT.JS", "REACT", "PYTHON", "NODE.JS", "SWIFT", "FLUTTER", ".NET", "LLMs & AGENTS"].map((tech) => (
            <span
              key={tech}
              className="flex h-14 items-center border-l border-[var(--color-border)] px-8 font-body text-[11px] font-semibold tracking-[3px] text-[var(--color-text-subtle)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
