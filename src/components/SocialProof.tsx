"use client";

import { useRef } from "react";
import { Zap, Shield, MessageSquare } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const reasons = [
  {
    icon: Zap,
    title: "Full-Stack Thinking",
    desc: "I don\u2019t just write code \u2014 I think about the product, the user, and the business. Every project gets the full picture, not just pixels.",
  },
  {
    icon: Shield,
    title: "Transparent Process",
    desc: "No hidden fees, no scope creep, no surprises. You get regular updates, clear timelines, and honest communication from day one.",
  },
  {
    icon: MessageSquare,
    title: "Built to Perform",
    desc: "Every site I build is fast, responsive, and optimized for search. Clean code, modern tech, and real results \u2014 not just a pretty design.",
  },
];

export default function SocialProof() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref, ".testimonial-card", 150);

  return (
    <section
      ref={ref}
      className="snap-section w-full bg-[var(--color-bg-primary)] px-16 max-md:px-6 py-[100px] max-md:py-16"
    >
      {/* Header */}
      <div className="mb-14 flex flex-col items-center gap-4">
        <span className="font-inter text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
          04 / WHY NIMBUS
        </span>
        <h2 className="font-space-grotesk text-5xl max-md:text-3xl font-bold tracking-[-1px] text-white">
          Why work with me
        </h2>
      </div>

      {/* Cards */}
      <div className="flex max-md:flex-col w-full gap-5">
        {reasons.map((r, i) => (
          <div
            key={i}
            className="testimonial-card flex flex-1 flex-col gap-6 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 opacity-0 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-border)]"
          >
            <div className="flex h-12 w-12 items-center justify-center bg-[var(--color-grid)]">
              <r.icon className="h-[22px] w-[22px] text-[var(--color-accent)]" />
            </div>
            <h3 className="font-inter text-xl font-semibold text-white">
              {r.title}
            </h3>
            <p className="font-inter text-sm leading-[1.7] text-[var(--color-text-dim)]">
              {r.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
