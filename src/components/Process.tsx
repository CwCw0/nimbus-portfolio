"use client";

import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We talk about your goals, audience and vision. I research your market and competitors.",
  },
  {
    num: "02",
    title: "Design & Build",
    desc: "I design and develop your solution iteratively, keeping you in the loop with regular checkpoints.",
  },
  {
    num: "03",
    title: "Launch & Grow",
    desc: "We go live, monitor performance, and iterate. I stay available for ongoing support and optimizations.",
  },
];

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref, ".process-step", 200);

  return (
    <section
      ref={ref}
      className="snap-section relative h-[480px] max-md:h-auto max-md:py-16 w-full bg-[var(--color-bg-secondary)]"
    >
      {/* Decorative */}
      <div
        className="max-md:hidden pointer-events-none absolute left-[500px] top-[50px] h-[440px] w-[440px] rounded-full"
        style={{
          background: "radial-gradient(circle, #7C5CFC08 0%, transparent 100%)",
        }}
      />
      <div className="max-md:hidden absolute left-[480px] top-0 h-[480px] w-px bg-[var(--color-grid)] opacity-[0.12]" />
      <div className="max-md:hidden absolute left-[960px] top-0 h-[480px] w-px bg-[var(--color-grid)] opacity-[0.12]" />
      <span className="max-md:hidden absolute left-[485px] top-[175px] font-poppins text-sm font-extralight text-[#7C5CFC20]">
        +
      </span>
      <span className="max-md:hidden absolute left-[965px] top-[175px] font-poppins text-sm font-extralight text-[#7C5CFC20]">
        +
      </span>

      {/* Content */}
      <div className="relative z-10 px-16 max-md:px-6">
        {/* Header */}
        <div className="flex w-full flex-col items-center gap-4 pt-[60px]">
          <span className="font-inter text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
            03 / PROCESS
          </span>
          <h2 className="font-space-grotesk text-5xl font-bold tracking-[-1px] text-white">
            How it works
          </h2>
          <p className="text-center font-inter text-base text-[var(--color-text-dim)]">
            A streamlined process designed to get you from idea to launch with
            zero friction.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-[130px] max-md:mt-10 flex max-md:flex-col gap-6">
          {steps.map((s) => (
            <div
              key={s.num}
              className="process-step flex flex-1 flex-col gap-6 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 opacity-0 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-border)]"
            >
              <span className="font-inter text-[56px] max-md:text-[40px] font-extralight leading-none text-[#1F1F23]">
                {s.num}
              </span>
              <h3 className="font-inter text-lg font-semibold text-white">
                {s.title}
              </h3>
              <p className="font-inter text-sm leading-[1.6] text-[var(--color-text-dim)]">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
