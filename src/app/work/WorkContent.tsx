"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CustomCursor from "../../components/CustomCursor";
import SmoothScroll from "../../components/SmoothScroll";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { allCaseStudies } from "../../data/caseStudies";

gsap.registerPlugin(ScrollTrigger);

export default function WorkContent() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cleanups: (() => void)[] = [];

    // Hero heading split
    const heading = headingRef.current;
    if (heading) {
      const split = new SplitType(heading, { types: "chars" });
      if (prefersReducedMotion) {
        gsap.set(split.chars || [], { opacity: 1, y: 0 });
      } else {
        gsap.set(split.chars || [], { opacity: 0, y: 50 });
        gsap.to(split.chars || [], {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.02,
          ease: "power3.out",
          delay: 0.3,
        });
      }
      cleanups.push(() => split.revert());
    }

    // Hero subtext
    const hero = heroRef.current;
    if (hero && !prefersReducedMotion) {
      const subs = hero.querySelectorAll(".hero-fade");
      gsap.set(subs, { opacity: 0, y: 30 });
      gsap.to(subs, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.6,
      });
    }

    // Grid cards stagger
    const gridEl = gridRef.current;
    if (gridEl && !prefersReducedMotion) {
      const ctx = gsap.context(() => {
        const cards = gridEl.querySelectorAll(".work-card");
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50, scale: 0.95 },
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
    <>
      <CustomCursor />
      <SmoothScroll>
      <main id="main-content" className="flex w-full flex-col overflow-x-hidden bg-[var(--color-bg-primary)]">
        <Header />

        {/* Hero — Full viewport */}
        <section
          ref={heroRef}
          className="relative flex min-h-screen w-full flex-col items-center justify-center px-16 pt-24 pb-20 max-md:px-6 max-md:pt-20 max-md:pb-12"
        >
          <span
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[var(--color-text-primary)]"
            style={{ fontSize: "clamp(100px, 18vw, 300px)", opacity: 0.02, letterSpacing: "0.1em" }}
          >
            WORK
          </span>

          <div className="relative z-10 flex flex-col items-center gap-8 text-center">
            <span className="hero-fade font-body text-[11px] font-medium tracking-[4px] text-[var(--color-accent)]">
              WORK
            </span>
            <h1
              ref={headingRef}
              className="font-display tracking-[-2px] text-[var(--color-text-primary)]"
              style={{ fontSize: "clamp(36px, 7vw, 110px)", lineHeight: 1.05 }}
            >
              Selected work.
            </h1>
            <p className="hero-fade max-w-[600px] font-body text-lg leading-[1.7] text-[var(--color-text-dim)] max-md:text-base">
              A collection of work spanning web apps, landing pages, SaaS platforms, and more. Each project is a story of solving real problems with design and code.
            </p>
          </div>
        </section>

        {/* Projects Grid — dramatic cards */}
        <section ref={gridRef} className="w-full px-16 pb-32 max-md:px-6 max-md:pb-16">
          <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-8 max-md:grid-cols-1">
            {allCaseStudies.map((study, i) => (
              <Link
                key={study.slug}
                href={`/work/${study.slug}`}
                className="work-card group relative flex flex-col overflow-hidden border border-[var(--color-border)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-border)] hover:shadow-[0_0_30px_#7C5CFC10]"
              >
                <div className="relative overflow-hidden bg-[var(--color-bg-card)]" style={{ height: "clamp(220px, 30vh, 340px)" }}>
                  {study.heroImage ? (
                    <Image
                      src={study.heroImage}
                      alt={study.shortTitle}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="font-body text-sm tracking-[2px] text-[var(--color-text-subtle)]">
                        {study.shortTitle}
                      </span>
                    </div>
                  )}
                  {study.status === "in-development" && (
                    <span className="absolute top-3 right-3 bg-amber-500/15 border border-amber-500/25 px-2.5 py-1 font-body text-[10px] font-semibold tracking-[1px] text-amber-400">
                      IN DEVELOPMENT
                    </span>
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F80] to-transparent" />
                  {/* Project number */}
                  <span
                    className="absolute bottom-4 right-5 font-display text-[var(--color-accent)] opacity-15"
                    style={{ fontSize: "clamp(36px, 4vw, 64px)", lineHeight: 1 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-col gap-3 p-7 max-md:p-5">
                  <div className="flex gap-2 flex-wrap">
                    {study.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-[var(--color-accent-subtle)] px-2.5 py-1 font-body text-[10px] font-medium text-[var(--color-accent)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2
                    className="font-display tracking-[-0.5px] text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors"
                    style={{ fontSize: "clamp(20px, 2vw, 28px)" }}
                  >
                    {study.shortTitle}
                  </h2>
                  <p className="font-body text-[13px] leading-[1.6] text-[var(--color-text-dim)]">
                    {study.desc}
                  </p>
                  <span className="flex items-center gap-2 font-body text-sm font-medium text-[var(--color-accent)] transition-all group-hover:gap-3">
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
      </SmoothScroll>
    </>
  );
}
