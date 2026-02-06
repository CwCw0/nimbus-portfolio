"use client";

import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { useCountUp } from "../hooks/useScrollReveal";

const stats = [
  { num: "4+", label: "Projects currently in the works", color: "text-white" },
  { num: "100%", label: "Self-taught", color: "text-[var(--color-accent)]" },
  { num: "24/7", label: "Always building", color: "text-white" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  useCountUp(ref, ".count-up");

  return (
    <section
      ref={ref}
      id="about"
      className="snap-section relative h-[420px] w-full bg-[var(--color-bg-primary)] max-md:h-auto max-md:py-16"
    >
      {/* Decorative */}
      <div
        className="pointer-events-none absolute left-[550px] top-[-40px] h-[400px] w-[400px] rounded-full max-md:hidden"
        style={{
          background: "radial-gradient(circle, #7C5CFC0A 0%, transparent 100%)",
        }}
      />
      <div className="absolute left-[660px] top-0 h-[420px] w-px bg-[var(--color-grid)] opacity-15 max-md:hidden" />
      <span className="absolute left-[665px] top-[50px] font-poppins text-base font-extralight text-[#7C5CFC25] max-md:hidden">
        +
      </span>

      {/* Content */}
      <div className="relative z-10 flex h-full w-full max-md:flex-col max-md:h-auto">
        {/* Left */}
        <div className="flex w-[560px] flex-col gap-8 px-16 py-[60px] max-md:w-full max-md:px-6 max-md:py-0">
          <span className="font-inter text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
            02 / ABOUT
          </span>
          <h2 className="font-space-grotesk text-[42px] font-bold leading-[1.15] tracking-[-1px] text-white max-md:text-[32px]">
            Not just a dev.
            <br />
            A builder from
            <br />
            end to end.
          </h2>
          <p className="font-inter text-base leading-[1.7] text-[var(--color-text-dim)]">
            Self-taught developer and builder. I don&apos;t just
            write code — I study the systems, the design, the business, and the
            user. I build things that work for real people.
          </p>
          <div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-[var(--color-border-light)] bg-[var(--color-grid)] px-7 py-3.5 font-inter text-sm font-semibold text-white transition-all duration-300 hover:border-[var(--color-accent-border)] hover:shadow-[0_0_24px_#7C5CFC20]"
            >
              Hire Me
              <ArrowUpRight className="h-3.5 w-3.5 text-[var(--color-accent)]" />
            </a>
          </div>
        </div>

        {/* Right */}
        <div className="ml-auto flex w-[660px] flex-col gap-5 py-[60px] pr-16 max-md:ml-0 max-md:w-full max-md:py-0 max-md:px-6 max-md:pt-8">
          {/* Top stat */}
          <div className="flex flex-col gap-2 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-7">
            <span
              className="count-up font-inter text-[40px] font-semibold tracking-[-1px] text-white"
              data-target="4+"
            >
              0+
            </span>
            <span className="font-inter text-sm text-[var(--color-text-dim)]">
              Projects currently in the works
            </span>
          </div>
          {/* Bottom row */}
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-1 flex-col gap-2 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-7">
              <span
                className="count-up font-inter text-[40px] font-semibold tracking-[-1px] text-[var(--color-accent)]"
                data-target="100%"
              >
                0%
              </span>
              <span className="font-inter text-sm text-[var(--color-text-dim)]">
                Self-taught
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-2 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-7">
              <span className="font-inter text-[40px] font-semibold tracking-[-1px] text-white">
                24/7
              </span>
              <span className="font-inter text-sm text-[var(--color-text-dim)]">
                Always building
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
