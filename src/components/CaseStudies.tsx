"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { allCaseStudies } from "../data/caseStudies";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const studies = allCaseStudies.map((s) => ({
  tags: [s.category, ...s.tags.slice(0, 1)],
  title: s.shortTitle,
  desc: s.desc,
  slug: s.slug,
  image: s.heroImage || "",
  status: s.status,
}));

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 769;

    const ctx = gsap.context(() => {
      // Each card reveals with a dramatic clip + scale + parallax
      const cards = section.querySelectorAll(".cs-card");
      cards.forEach((card) => {
        const img = card.querySelector(".cs-img") as HTMLElement;
        const content = card.querySelector(".cs-content") as HTMLElement;

        // Image parallax — desktop only (skip on mobile for performance)
        if (img && !isMobile) {
          gsap.fromTo(
            img,
            { yPercent: 8 },
            {
              yPercent: -8,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        // Card entrance — scale up from 0.92, fade in
        gsap.fromTo(
          card,
          { scale: 0.92, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          }
        );

        // Content slides up
        if (content) {
          gsap.fromTo(
            content,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 70%",
                once: true,
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full bg-[var(--color-bg-secondary)] px-16 py-32 max-md:px-6 max-md:py-16"
    >
      {/* Section Header */}
      <div className="mb-20 flex flex-col items-center gap-4 text-center max-md:mb-12 max-md:items-start max-md:text-left">
        <span className="font-body text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
          04 / FEATURED WORK
        </span>
        <h2
          className="font-display tracking-[-1px] text-[var(--color-text-primary)]"
          style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
        >
          Case Studies
        </h2>
        <div className="mt-1 h-px w-[80px] bg-[var(--color-accent)] opacity-30" />
      </div>

      {/* Project Cards — dramatic vertical showcase */}
      <div className="mx-auto flex max-w-[1200px] flex-col gap-24 max-md:gap-12">
        {studies.map((s, i) => (
          <Link
            key={s.slug}
            href={`/work/${s.slug}`}
            className="cs-card group relative flex flex-col overflow-hidden"
            data-cursor="view"
          >
            {/* Image container with overflow for parallax */}
            <div className="relative w-full overflow-hidden" style={{ height: "clamp(280px, 50vh, 560px)" }}>
              <div className="cs-img absolute inset-[-16%] h-[132%] w-[132%] max-md:inset-0 max-md:h-full max-md:w-full">
                {s.image ? (
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#7C5CFC12] to-[#7C5CFC06]">
                    <span className="font-body text-sm tracking-[2px] text-[var(--color-text-subtle)]">
                      {s.title}
                    </span>
                  </div>
                )}
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F40] to-transparent" />

              {/* Status badge */}
              {s.status === "in-development" && (
                <span className="absolute top-5 right-5 bg-amber-500/15 border border-amber-500/25 px-3 py-1.5 font-body text-[10px] font-semibold tracking-[1px] text-amber-400">
                  IN DEVELOPMENT
                </span>
              )}

              {/* Accent line draw on hover */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[var(--color-accent)] transition-all duration-500 group-hover:w-full" />
            </div>

            {/* Content overlay below image */}
            <div className="cs-content flex items-end justify-between border border-t-0 border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 transition-colors duration-300 group-hover:border-[var(--color-accent-border)] max-md:flex-col max-md:items-start max-md:gap-4 max-md:p-6">
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[var(--color-accent-secondary-subtle)] px-2.5 py-1 font-body text-[10px] font-medium text-[var(--color-accent-secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3
                  className="font-display tracking-[-1px] text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-accent)]"
                  style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
                >
                  {s.title}
                </h3>
                <p className="max-w-[500px] font-body text-sm leading-[1.6] text-[var(--color-text-dim)]">
                  {s.desc}
                </p>
              </div>

              {/* Project number + arrow */}
              <div className="flex items-center gap-6 max-md:mt-2">
                <span
                  className="font-display text-[var(--color-accent)] opacity-15"
                  style={{ fontSize: "clamp(48px, 5vw, 80px)", lineHeight: 1 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex shrink-0 items-center gap-2 font-body text-sm font-medium text-[var(--color-accent)] transition-all group-hover:gap-3">
                  View
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View all CTA */}
      <div className="mt-24 flex justify-center max-md:mt-12">
        <Link
          href="/work"
          className="group flex items-center gap-3 border border-[var(--color-border)] px-10 py-4 font-body text-sm font-medium text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-accent-border)] hover:text-[var(--color-text-primary)]"
        >
          View All Projects
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
