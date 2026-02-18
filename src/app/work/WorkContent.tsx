"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CustomCursor from "../../components/CustomCursor";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { allCaseStudies } from "../../data/caseStudies";

export default function WorkContent() {
  const gridRef = useRef<HTMLElement>(null);
  useScrollReveal(gridRef, ".work-card", 120);

  return (
    <>
      <CustomCursor />
      <main id="main-content" className="flex w-full flex-col overflow-x-hidden bg-[var(--color-bg-primary)]">
        <Header />

        {/* Work Hero */}
        <section className="snap-section w-full px-16 pt-[100px] pb-[60px] max-md:px-6 max-md:pt-16 max-md:pb-8">
          <div className="flex flex-col gap-6 max-w-[800px]">
            <span className="font-inter text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
              WORK
            </span>
            <h1 className="font-space-grotesk text-[52px] font-bold leading-[1.1] tracking-[-2px] text-white max-md:text-[32px]">
              Selected projects &amp; case studies.
            </h1>
            <p className="max-w-[600px] font-inter text-lg leading-[1.7] text-[var(--color-text-dim)] max-md:text-base">
              A collection of work spanning web apps, landing pages, SaaS platforms, and more. Each project is a story of solving real problems with design and code.
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section ref={gridRef} className="w-full px-16 pb-[100px] max-md:px-6 max-md:pb-16">
          <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
            {allCaseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/work/${study.slug}`}
                className="work-card group flex flex-col border border-[var(--color-border)] opacity-0 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-border)] hover:shadow-[0_0_30px_#7C5CFC10]"
              >
                <div className="h-[280px] overflow-hidden bg-[var(--color-bg-card)] max-md:h-[200px]">
                  {study.heroImage ? (
                    <img
                      src={study.heroImage}
                      alt={study.shortTitle}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="font-inter text-sm tracking-[2px] text-[var(--color-text-subtle)]">
                        {study.shortTitle}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-3 p-6">
                  <div className="flex gap-2 flex-wrap">
                    {study.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-[var(--color-accent-subtle)] px-2.5 py-1 font-inter text-[10px] font-medium text-[var(--color-accent)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-space-grotesk text-xl font-bold text-white group-hover:text-[var(--color-accent)] transition-colors">
                    {study.shortTitle}
                  </h2>
                  <p className="font-inter text-[13px] leading-[1.6] text-[var(--color-text-dim)]">
                    {study.desc}
                  </p>
                  <span className="flex items-center gap-2 font-inter text-sm font-medium text-[var(--color-accent)] transition-all group-hover:gap-3">
                    View Case Study
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
