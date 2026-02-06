"use client";

import { ArrowRight, Image as ImageIcon } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
import { useScrollReveal } from "../hooks/useScrollReveal";

const studies = [
  {
    tags: ["Website", "Landing Page"],
    title: "Omnifood",
    desc: "A modern landing page for a premium meal subscription service, featuring responsive design and clean UI.",
    slug: "omnifood",
  },
  {
    tags: ["UI/UX", "SaaS"],
    title: "Project Name",
    desc: "Brief description of the project scope, goals, and outcome delivered.",
    slug: "",
  },
  {
    tags: ["AI Tools", "Chatbot"],
    title: "Project Name",
    desc: "Brief description of the project scope, goals, and outcome delivered.",
    slug: "",
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
        <button className="flex items-center gap-2 border border-[var(--color-border)] px-6 py-3 font-poppins text-[13px] font-medium text-[var(--color-text-secondary)] transition-all duration-300 hover:border-[var(--color-accent-border)] hover:text-white max-md:w-full max-md:justify-center">
          View All
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Grid */}
      <div className="flex w-full gap-6 max-md:flex-col">
        {studies.map((s, i) => {
          const card = (
            <div
              className="case-card flex flex-1 flex-col border border-[var(--color-border)] opacity-0 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-border)] hover:shadow-[0_0_30px_#7C5CFC10]"
            >
              {/* Placeholder image */}
              <div className="flex h-[260px] items-center justify-center bg-[var(--color-bg-card)] max-md:h-[200px]">
                <div className="flex flex-col items-center gap-3">
                  <ImageIcon className="h-8 w-8 text-[var(--color-border-light)]" />
                  <span className="font-poppins text-xs font-medium tracking-[2px] text-[var(--color-border-light)]">
                    {s.slug ? "VIEW PROJECT" : "Coming Soon"}
                  </span>
                </div>
              </div>
              {/* Info */}
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
              </div>
            </div>
          );

          return s.slug ? (
            <Link key={i} href={`/work/${s.slug}`} className="flex flex-1">
              {card}
            </Link>
          ) : (
            <div key={i} className="flex flex-1">{card}</div>
          );
        })}
      </div>
    </section>
  );
}
