"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { labDesigns, labCategories } from "../../data/labDesigns";

gsap.registerPlugin(ScrollTrigger);

export default function LabPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLElement>(null);

  const filtered =
    activeFilter === "All"
      ? labDesigns
      : labDesigns.filter((d) => d.category === activeFilter);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cleanups: (() => void)[] = [];

    const heading = headingRef.current;
    if (heading) {
      const split = new SplitType(heading, { types: "chars" });
      if (prefersReducedMotion) {
        gsap.set(split.chars || [], { opacity: 1, y: 0 });
      } else {
        gsap.set(split.chars || [], { opacity: 0, y: 60 });
        gsap.to(split.chars || [], {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.02,
          ease: "power3.out",
          delay: 0.3,
        });
      }
      cleanups.push(() => split.revert());
    }

    const hero = heroRef.current;
    if (hero && !prefersReducedMotion) {
      const subs = hero.querySelectorAll(".lab-fade");
      gsap.set(subs, { opacity: 0, y: 30 });
      gsap.to(subs, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.5,
      });
    }

    const gridEl = gridRef.current;
    if (gridEl && !prefersReducedMotion) {
      const ctx = gsap.context(() => {
        const cards = gridEl.querySelectorAll(".lab-card");
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                once: true,
              },
            }
          );
        });
      }, gridEl);
      cleanups.push(() => ctx.revert());
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
        <div className="flex w-full flex-col overflow-x-hidden bg-(--color-bg-primary)">

          {/* Hero — Gallery / Exhibition energy */}
          <section
            ref={heroRef}
            className="relative flex min-h-screen w-full flex-col items-center justify-center px-16 pt-24 pb-20 max-md:px-6 max-md:pt-20 max-md:pb-12"
          >
            {/* Crosshair grid accent — lab/experimental feel */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(124,92,252,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,92,252,0.04) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
              }}
            />

            {/* Ghost watermark */}
            <span
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-(--color-text-primary)"
              style={{
                fontSize: "clamp(100px, 20vw, 340px)",
                opacity: 0.015,
                letterSpacing: "0.08em",
              }}
            >
              LAB
            </span>

            <div className="relative z-10 flex flex-col items-center gap-8 text-center">
              <div className="lab-fade flex items-center gap-3">
                <Sparkles className="h-3.5 w-3.5 text-(--color-accent)" />
                <span className="font-body text-[11px] font-medium tracking-[4px] text-(--color-accent)">
                  DESIGN LAB
                </span>
              </div>

              <h1
                ref={headingRef}
                className="max-w-[900px] font-display tracking-[-3px] text-(--color-text-primary)"
                style={{
                  fontSize: "clamp(40px, 6vw, 88px)",
                  lineHeight: 1.02,
                }}
              >
                Where ideas take shape.
              </h1>

              <p className="lab-fade max-w-[560px] font-body text-[15px] leading-[1.75] text-(--color-text-dim)">
                Design concepts, website templates, and visual experiments.
                Everything here is crafted to a standard — not generated from a
                template. Some are for sale. All are for showing what&apos;s possible.
              </p>

              {/* Scroll hint */}
              <div className="lab-fade mt-6 flex flex-col items-center gap-2">
                <span className="font-body text-[10px] tracking-[3px] text-(--color-text-muted)">
                  EXPLORE
                </span>
                <div className="h-10 w-px bg-linear-to-b from-(--color-accent) to-transparent opacity-40" />
              </div>
            </div>
          </section>

          {/* Filter */}
          <section className="w-full px-16 pb-8 max-md:px-6 max-md:overflow-x-auto">
            <div className="mx-auto flex max-w-[1200px] items-center gap-3 max-md:w-max">
              {labCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2.5 font-body text-[12px] font-medium tracking-[1px] transition-all duration-200 ${
                    activeFilter === cat
                      ? "bg-(--color-accent) text-white"
                      : "border border-(--color-border) text-(--color-text-muted) hover:border-(--color-accent-border) hover:text-(--color-text-primary)"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          {/* Designs Grid */}
          <section
            ref={gridRef}
            className="w-full px-16 pb-32 max-md:px-6 max-md:pb-16"
          >
            <div className="mx-auto max-w-[1200px]">
              <div className="mb-10 flex items-center gap-4">
                <span className="font-body text-[10px] font-medium tracking-[4px] text-(--color-text-muted)">
                  {filtered.length} DESIGN{filtered.length !== 1 ? "S" : ""}
                </span>
                <div className="h-px flex-1 bg-(--color-border)" />
              </div>

              <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
                {filtered.map((design) => (
                  <div
                    key={design.slug}
                    className="lab-card group relative flex flex-col border border-(--color-border) bg-(--color-bg-card) transition-all duration-500 hover:border-(--color-accent-border)"
                  >
                    {/* Preview image */}
                    <div
                      className="relative overflow-hidden"
                      style={{ height: "clamp(240px, 30vh, 380px)" }}
                    >
                      <Image
                        src={design.previewImage}
                        alt={design.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Status badge */}
                      {design.status === "coming-soon" && (
                        <div className="absolute top-4 left-4 bg-black/70 px-3 py-1.5 backdrop-blur-sm">
                          <span className="font-body text-[10px] font-medium tracking-[2px] text-white/80">
                            COMING SOON
                          </span>
                        </div>
                      )}


                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-500 group-hover:bg-black/40">
                        <div className="flex items-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                          <span className="font-body text-sm font-medium text-white">
                            View Design
                          </span>
                          <ArrowUpRight className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="flex flex-1 flex-col gap-4 p-7">
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-(--color-accent-subtle) px-2.5 py-0.5 font-body text-[10px] font-medium tracking-[1.5px] text-(--color-accent)">
                          {design.category.toUpperCase()}
                        </span>
                        {design.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="font-body text-[11px] text-(--color-text-muted)"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title + subtitle */}
                      <div>
                        <h3
                          className="font-display italic text-(--color-text-primary) transition-colors group-hover:text-(--color-accent)"
                          style={{
                            fontSize: "clamp(22px, 2.5vw, 32px)",
                            lineHeight: 1.15,
                            letterSpacing: "-0.5px",
                          }}
                        >
                          {design.title}
                        </h3>
                        <p className="mt-1 font-body text-[13px] text-(--color-text-muted)">
                          {design.subtitle}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="font-body text-[13px] leading-[1.65] text-(--color-text-dim)">
                        {design.description.slice(0, 140)}
                        {design.description.length > 140 ? "..." : ""}
                      </p>

                      {/* Stack pills */}
                      <div className="mt-auto flex flex-wrap gap-2 pt-2">
                        {design.stack.map((tech) => (
                          <span
                            key={tech}
                            className="border border-(--color-border) px-2 py-0.5 font-body text-[10px] text-(--color-text-muted)"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="w-full px-16 pb-32 max-md:px-6 max-md:pb-16">
            <div className="mx-auto flex max-w-[800px] flex-col items-center gap-8 text-center">
              <h2
                className="font-display tracking-[-2px] text-(--color-text-primary)"
                style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
              >
                Want something custom?
              </h2>
              <p className="max-w-[500px] font-body text-[15px] leading-[1.75] text-(--color-text-dim)">
                Every template here started as a client conversation. If you
                want something built specifically for your brand — let&apos;s talk.
              </p>
              <Link
                href="/contact"
                className="flex items-center gap-2.5 bg-(--color-accent) px-8 py-4 font-body text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03]"
              >
                Start a Project
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

        </div>
  );
}
