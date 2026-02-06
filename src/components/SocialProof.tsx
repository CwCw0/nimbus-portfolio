"use client";

import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const testimonials = [
  {
    quote:
      "\u201CNimbus transformed our brand from forgettable to unforgettable. The website alone doubled our inbound leads within 3 months.\u201D",
    name: "Sarah Rodriguez",
    role: "Founder, Flowstate",
    initials: "SR",
  },
  {
    quote:
      "\u201CThe AI chatbot Nimbus built handles 70% of our support tickets. It paid for itself in the first week. Best investment we made.\u201D",
    name: "Marcus Kim",
    role: "CEO, Arcline Studios",
    initials: "MK",
  },
  {
    quote:
      "\u201CAs a freelancer, I needed someone who got it. Nimbus delivered a site and SEO strategy that tripled my organic traffic in 6 months.\u201D",
    name: "Jamie Lee",
    role: "Freelance Consultant",
    initials: "JL",
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
          04 / TESTIMONIALS
        </span>
        <h2 className="font-space-grotesk text-5xl max-md:text-3xl font-bold tracking-[-1px] text-white">
          What clients say
        </h2>
      </div>

      {/* Cards */}
      <div className="flex max-md:flex-col w-full gap-5">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="testimonial-card flex flex-1 flex-col gap-6 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 opacity-0 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-border)]"
          >
            <p className="font-inter text-base leading-[1.7] text-[var(--color-text-secondary)]">
              {t.quote}
            </p>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-grid)]">
                <span className="font-inter text-xs font-semibold text-[var(--color-accent)]">
                  {t.initials}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-inter text-sm font-semibold text-white">
                  {t.name}
                </span>
                <span className="font-inter text-xs text-[var(--color-text-dim)]">
                  {t.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
