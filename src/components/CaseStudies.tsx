"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { useScrollReveal } from "../hooks/useScrollReveal";
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
  const ref = useRef<HTMLElement>(null);
  const featuredImgRef = useRef<HTMLDivElement>(null);
  useScrollReveal(ref, ".case-card", 120);

  const featured = studies[0];
  const rest = studies.slice(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Featured image parallax
      if (featuredImgRef.current) {
        const img = featuredImgRef.current.querySelector("img");
        if (img) {
          gsap.to(img, {
            yPercent: -15,
            ease: "none",
            scrollTrigger: {
              trigger: featuredImgRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }

      // Sub-cards subtle rotateX on scroll
      const subCards = el.querySelectorAll(".case-sub-card");
      subCards.forEach((card) => {
        gsap.from(card, {
          rotateX: 8,
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="work"
      className="snap-section w-full bg-[var(--color-bg-secondary)] px-16 py-[100px] max-md:px-6 max-md:py-16"
      style={{ perspective: "1000px" }}
    >
      {/* Header with extending line */}
      <div className="mb-14 flex items-end gap-6">
        <div className="flex shrink-0 flex-col gap-4">
          <span className="font-body text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
            FEATURED WORK
          </span>
          <h2 className="font-display text-[40px] tracking-[-1px] text-[var(--color-text-primary)]">
            Case Studies
          </h2>
        </div>
        <div className="mb-3 h-px flex-1 bg-[var(--color-border)] max-md:hidden" />
      </div>

      {/* Featured — full-width hero card */}
      <Link href={`/work/${featured.slug}`} className="case-card group relative block w-full" data-cursor="view">
        <div ref={featuredImgRef} className="relative h-[500px] w-full overflow-hidden max-md:h-[300px]">
          <Image
            src={featured.image}
            alt={featured.title}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            style={{ willChange: "transform" }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F80] to-transparent" />
          {/* Content over image */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-10 max-md:flex-col max-md:items-start max-md:gap-4 max-md:p-6">
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[var(--color-accent-secondary-subtle)] px-2.5 py-1 font-body text-[10px] font-medium text-[var(--color-accent-secondary)]"
                  >
                    {tag}
                  </span>
                ))}
                {featured.status === "in-development" && (
                  <span className="bg-amber-500/15 border border-amber-500/25 px-2.5 py-1 font-body text-[10px] font-semibold tracking-[1px] text-amber-400">
                    IN DEV
                  </span>
                )}
              </div>
              <h3 className="font-display text-[36px] tracking-[-1px] text-[var(--color-text-primary)] max-md:text-[24px]">
                {featured.title}
              </h3>
              <p className="max-w-[500px] font-body text-sm leading-[1.5] text-[var(--color-text-secondary)] max-md:text-[13px]">
                {featured.desc}
              </p>
            </div>
            <span className="flex items-center gap-2 font-body text-sm font-medium text-[var(--color-accent)] transition-all group-hover:gap-3">
              View Case Study
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
          {/* Accent line draw-in on hover */}
          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[var(--color-accent)] transition-all duration-500 group-hover:w-full" />
        </div>
      </Link>

      {/* Remaining — 3 staggered offset cards */}
      <div className="mt-6 grid grid-cols-3 gap-6 max-md:grid-cols-1 max-md:gap-6">
        {rest.map((s, i) => (
          <Link
            key={s.slug}
            href={`/work/${s.slug}`}
            className="case-card case-sub-card group relative flex flex-col"
            data-cursor="view"
            style={{ marginTop: i === 1 ? "40px" : "0", transformStyle: "preserve-3d" }}
          >
            <div className="relative h-[220px] overflow-hidden bg-[var(--color-bg-card)] max-md:h-[200px]">
              <Image
                src={s.image}
                alt={s.title}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {s.status === "in-development" && (
                <span className="absolute top-3 right-3 bg-amber-500/15 border border-amber-500/25 px-2.5 py-1 font-body text-[10px] font-semibold tracking-[1px] text-amber-400">
                  IN DEV
                </span>
              )}
              {/* Accent line draw-in */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[var(--color-accent)] transition-all duration-500 group-hover:w-full" />
            </div>
            <div className="flex flex-col gap-3 border border-t-0 border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 transition-colors duration-300 group-hover:border-[var(--color-accent-border)]">
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
              <h3 className="font-body text-lg font-semibold text-[var(--color-text-primary)]">
                {s.title}
              </h3>
              <p className="font-body text-[13px] leading-[1.5] text-[var(--color-text-dim)]">
                {s.desc}
              </p>
              <span className="flex items-center gap-2 font-body text-sm font-medium text-[var(--color-accent)] transition-all group-hover:gap-3">
                View Case Study
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/work" className="flex items-center gap-2 border border-[var(--color-border)] px-6 py-3 font-body text-sm font-medium text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-accent-border)] hover:text-[var(--color-text-primary)]">
          View All Projects
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
