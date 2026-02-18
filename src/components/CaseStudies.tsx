"use client";

import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
import { useScrollReveal } from "../hooks/useScrollReveal";

const studies = [
  {
    tags: ["Website", "Landing Page"],
    title: "Omnifood",
    desc: "A modern landing page for a premium meal subscription service, featuring responsive design and clean UI.",
    slug: "omnifood",
    image: "/images/omnifood/hero.png",
  },
];

export default function CaseStudies() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref, ".case-card", 150);

  return (
    <section
      ref={ref}
      id="work"
      className="snap-section w-full bg-[var(--color-bg-secondary)] px-16 py-[100px] max-md:px-6 max-md:py-16"
    >
      {/* Header */}
      <div className="mb-14 flex w-full items-end justify-between max-md:flex-col max-md:items-start max-md:gap-6">
        <div className="flex flex-col gap-4">
          <span className="font-poppins text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
            FEATURED WORK
          </span>
          <h2 className="font-poppins text-[40px] font-semibold tracking-[-1px] text-white">
            Case Studies
          </h2>
          <p className="font-poppins text-base text-[var(--color-text-muted)]">
            Selected projects showcasing design, development, and strategy.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="flex w-full gap-6 max-md:flex-col">
        {studies.map((s, i) => (
          <Link key={i} href={`/work/${s.slug}`} className="flex w-full max-w-[600px]">
            <div className="case-card flex w-full flex-col border border-[var(--color-border)] opacity-0 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-border)] hover:shadow-[0_0_30px_#7C5CFC10]">
              <div className="h-[260px] overflow-hidden bg-[#F5F0EB] max-md:h-[200px]">
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="flex flex-col gap-3 p-6">
                <div className="flex gap-2">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[var(--color-accent-subtle)] px-2.5 py-1 font-poppins text-[10px] font-medium text-[var(--color-accent)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-poppins text-xl font-semibold text-white">
                  {s.title}
                </h3>
                <p className="font-poppins text-[13px] leading-[1.5] text-[var(--color-text-dim)]">
                  {s.desc}
                </p>
                <span className="flex items-center gap-2 font-inter text-sm font-medium text-[var(--color-accent)]">
                  View Case Study
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-10 text-center font-inter text-sm text-[var(--color-text-dim)]">
        More projects coming soon.
      </p>
    </section>
  );
}
