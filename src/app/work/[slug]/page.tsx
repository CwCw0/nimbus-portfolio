"use client";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CustomCursor from "../../../components/CustomCursor";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { useScrollReveal, useCountUp } from "../../../hooks/useScrollReveal";

const caseStudy = {
  breadcrumb: "Back to Work",
  tags: ["UI/UX Design", "Dashboard", "React"],
  title: "FlowState — Productivity Dashboard Reimagined",
  heroDesc:
    "A complete redesign of FlowState's productivity platform, focusing on clarity, speed, and user delight.",
  challenge:
    "FlowState's existing dashboard was cluttered, slow, and had a 40% user drop-off within the first week. Users couldn't find key features, and the mobile experience was essentially broken. They needed a ground-up redesign that would improve retention and satisfaction.",
  solution:
    "We conducted user interviews, mapped pain points, and redesigned the entire interface with a focus on progressive disclosure and speed. The new dashboard uses a modular card system, real-time data sync, and a mobile-first responsive layout.",
  results: [
    { value: "+240%", label: "User Retention", color: "text-white" },
    { value: "2.1s", label: "Avg. Load Time", color: "text-[var(--color-accent)]" },
    { value: "70%", label: "Feature Discovery", color: "text-white" },
    { value: "4.9", label: "App Store Rating", color: "text-[var(--color-accent)]" },
  ],
  nextProject: { title: "ArcLine — E-Commerce Platform", slug: "arcline" },
};

export default function CaseStudyPage() {
  const resultsRef = useRef<HTMLElement>(null);
  useCountUp(resultsRef, ".count-up");

  return (
    <>
      <CustomCursor />
      <div className="flex w-full flex-col overflow-x-hidden bg-[var(--color-bg-primary)]">
        <Header />

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 px-16 pt-8 max-md:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-inter text-sm text-[var(--color-text-muted)] transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {caseStudy.breadcrumb}
          </Link>
        </div>

        {/* Case Hero */}
        <section className="snap-section w-full px-16 pt-12 pb-[60px] max-md:px-6">
          <div className="flex flex-col gap-6 max-w-[800px]">
            <div className="flex gap-2">
              {caseStudy.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[var(--color-accent-subtle)] px-3 py-1 font-inter text-[11px] font-medium text-[var(--color-accent)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-space-grotesk text-[48px] font-bold leading-[1.1] tracking-[-2px] text-white max-md:text-[32px]">
              {caseStudy.title}
            </h1>
            <p className="font-inter text-lg leading-[1.7] text-[var(--color-text-dim)] max-md:text-base">
              {caseStudy.heroDesc}
            </p>
          </div>
        </section>

        {/* Hero Image */}
        <section className="w-full px-16 pb-[80px] max-md:px-6">
          <div className="flex h-[500px] w-full items-center justify-center bg-gradient-to-br from-[#7C5CFC12] to-[#7C5CFC06] border border-[var(--color-border)] max-md:h-[240px]">
            <span className="font-inter text-sm tracking-[2px] text-[var(--color-text-subtle)]">
              PROJECT IMAGE
            </span>
          </div>
        </section>

        {/* Overview */}
        <section className="snap-section w-full bg-[var(--color-bg-secondary)] px-16 py-[80px] max-md:px-6 max-md:py-16">
          <div className="flex gap-16 max-md:flex-col max-md:gap-10">
            <div className="flex flex-1 flex-col gap-5">
              <span className="font-inter text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
                THE CHALLENGE
              </span>
              <h3 className="font-space-grotesk text-[28px] font-bold tracking-[-1px] text-white">
                Challenge
              </h3>
              <p className="font-inter text-base leading-[1.8] text-[var(--color-text-dim)]">
                {caseStudy.challenge}
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-5">
              <span className="font-inter text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
                THE SOLUTION
              </span>
              <h3 className="font-space-grotesk text-[28px] font-bold tracking-[-1px] text-white">
                Solution
              </h3>
              <p className="font-inter text-base leading-[1.8] text-[var(--color-text-dim)]">
                {caseStudy.solution}
              </p>
            </div>
          </div>
        </section>

        {/* Results */}
        <section ref={resultsRef} className="snap-section w-full px-16 py-[80px] max-md:px-6 max-md:py-16">
          <div className="mb-10 flex flex-col gap-4">
            <span className="font-inter text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
              RESULTS
            </span>
            <h3 className="font-space-grotesk text-[28px] font-bold tracking-[-1px] text-white">
              The impact
            </h3>
          </div>
          <div className="flex gap-5 max-md:grid max-md:grid-cols-2 max-md:gap-4">
            {caseStudy.results.map((r) => (
              <div
                key={r.label}
                className="flex flex-1 flex-col gap-2 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-7"
              >
                <span
                  className={`count-up font-inter text-[40px] font-semibold tracking-[-1px] ${r.color}`}
                  data-target={r.value}
                >
                  {r.value.startsWith("+") ? "+0" : "0"}
                </span>
                <span className="font-inter text-sm text-[var(--color-text-dim)]">
                  {r.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="w-full px-16 pb-[80px] max-md:px-6">
          <div className="flex gap-6 max-md:flex-col">
            <div className="flex flex-1 h-[340px] items-center justify-center bg-gradient-to-br from-[#7C5CFC10] to-[#7C5CFC05] border border-[var(--color-border)]">
              <span className="font-inter text-sm tracking-[2px] text-[var(--color-text-subtle)]">
                GALLERY 1
              </span>
            </div>
            <div className="flex flex-1 h-[340px] items-center justify-center bg-gradient-to-br from-[#7C5CFC10] to-[#7C5CFC05] border border-[var(--color-border)]">
              <span className="font-inter text-sm tracking-[2px] text-[var(--color-text-subtle)]">
                GALLERY 2
              </span>
            </div>
          </div>
        </section>

        {/* Next Project */}
        <section className="w-full border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-16 py-[60px] max-md:px-6">
          <Link
            href={`/work/${caseStudy.nextProject.slug}`}
            className="group flex items-center justify-between"
          >
            <div className="flex flex-col gap-2">
              <span className="font-inter text-[11px] font-medium tracking-[3px] text-[var(--color-text-muted)]">
                NEXT PROJECT
              </span>
              <span className="font-space-grotesk text-[32px] font-bold tracking-[-1px] text-white transition-colors group-hover:text-[var(--color-accent)] max-md:text-2xl">
                {caseStudy.nextProject.title}
              </span>
            </div>
            <ArrowRight className="h-6 w-6 text-[var(--color-text-muted)] transition-all group-hover:translate-x-2 group-hover:text-[var(--color-accent)]" />
          </Link>
        </section>

        <Footer />
      </div>
    </>
  );
}
