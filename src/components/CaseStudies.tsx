"use client";

import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { allCaseStudies } from "../data/caseStudies";

const studies = allCaseStudies.map((s) => ({
  tags: [s.category, ...s.tags.slice(0, 1)],
  title: s.shortTitle,
  desc: s.desc,
  slug: s.slug,
  image: s.heroImage || "",
  status: s.status,
}));

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
      <div className="grid w-full grid-cols-2 gap-6 max-md:grid-cols-1">
        {studies.map((s, i) => (
          <Link key={i} href={`/work/${s.slug}`} className="flex">
            <div className="case-card flex w-full flex-col border border-[var(--color-border)] opacity-0 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-border)] hover:shadow-[0_0_30px_#7C5CFC10]">
              <div className="relative h-[260px] overflow-hidden bg-[var(--color-bg-card)] max-md:h-[200px]">
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-full w-full object-cover object-top"
                />
                {s.status === "in-development" && (
                  <span className="absolute top-3 right-3 bg-amber-500/15 border border-amber-500/25 px-2.5 py-1 font-inter text-[10px] font-semibold tracking-[1px] text-amber-400">
                    IN DEVELOPMENT
                  </span>
                )}
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

      <div className="mt-10 flex justify-center">
        <Link href="/work" className="flex items-center gap-2 border border-[var(--color-border)] px-6 py-3 font-inter text-sm font-medium text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-accent-border)] hover:text-white">
          View All Projects
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
