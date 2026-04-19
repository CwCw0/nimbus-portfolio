"use client";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CustomCursor from "../../../components/CustomCursor";
import SmoothScroll from "../../../components/SmoothScroll";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import type { CaseStudy } from "../../../data/caseStudies";

gsap.registerPlugin(ScrollTrigger);

/** Split a text field on \n\n to get individual paragraphs */
function toParagraphs(text: string): string[] {
  return text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
}

const defaultStudy = {
  tags: ["UI/UX Design", "Dashboard", "React"],
  title: "Project Coming Soon",
  heroDesc: "This case study is currently being written.",
  challenge: "Details coming soon.",
  challengePoints: undefined as string[] | undefined,
  solution: "Details coming soon.",
  solutionHighlights: undefined as string[] | undefined,
  results: [] as { value: string; label: string; color: string }[],
};

export default function CaseStudyContent({
  caseStudy,
  nextProject,
}: {
  caseStudy: CaseStudy | null;
  nextProject: { title: string; slug: string };
}) {
  const study = caseStudy || defaultStudy;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLElement>(null);
  const resultsRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);

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
        gsap.set(split.chars || [], { opacity: 0, y: 40 });
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

    // Hero subtext fade
    const hero = heroRef.current;
    if (hero && !prefersReducedMotion) {
      const subs = hero.querySelectorAll(".hero-fade");
      gsap.set(subs, { opacity: 0, y: 30 });
      gsap.to(subs, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.5,
      });
    }

    // Hero image — scale down on scroll entrance for cinematic feel
    const heroImg = heroImgRef.current;
    if (heroImg && !prefersReducedMotion) {
      gsap.fromTo(
        heroImg,
        { scale: 1.08 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: heroImg,
            start: "top 80%",
            end: "bottom 30%",
            scrub: true,
          },
        }
      );
    }

    // Overview reveal
    const overview = overviewRef.current;
    if (overview && !prefersReducedMotion) {
      const ctx = gsap.context(() => {
        const cols = overview.querySelectorAll(".overview-col");
        gsap.set(cols, { opacity: 0, y: 40 });
        gsap.to(cols, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: overview,
            start: "top 75%",
            once: true,
          },
        });
      }, overview);
      cleanups.push(() => ctx.revert());
    }

    // Results count-up
    const results = resultsRef.current;
    if (results && !prefersReducedMotion) {
      const ctx = gsap.context(() => {
        const cards = results.querySelectorAll(".result-card");
        gsap.set(cards, { opacity: 0, y: 40 });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: results,
            start: "top 80%",
            once: true,
          },
        });

        // Count-up
        const stats = results.querySelectorAll(".count-up");
        stats.forEach((stat) => {
          const el = stat as HTMLElement;
          const target = el.dataset.target || "0";
          const isPlus = target.startsWith("+");
          const isPercent = target.includes("%");
          const num = parseInt(target.replace(/[^0-9]/g, ""), 10);

          gsap.fromTo(
            { val: 0 },
            { val: 0 },
            {
              val: num,
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                once: true,
              },
              onUpdate: function () {
                const current = Math.round(this.targets()[0].val);
                el.textContent = (isPlus ? "+" : "") + current + (isPercent ? "%" : "");
              },
            }
          );
        });
      }, results);
      cleanups.push(() => ctx.revert());
    }

    // Gallery reveal
    const gallery = galleryRef.current;
    if (gallery && !prefersReducedMotion) {
      const ctx = gsap.context(() => {
        const items = gallery.querySelectorAll(".gallery-item");
        items.forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0, scale: 0.96 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                once: true,
              },
            }
          );
        });
      }, gallery);
      cleanups.push(() => ctx.revert());
    }

    return () => cleanups.forEach((fn) => fn());
  }, [study.title]);

  const challengeParas = toParagraphs(study.challenge);
  const solutionParas = toParagraphs(study.solution);

  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <main
          id="main-content"
          className="flex w-full flex-col overflow-x-hidden bg-[var(--color-bg-primary)]"
        >
          <Header />

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 px-16 pt-28 max-md:px-6 max-md:pt-24">
            <Link
              href="/work"
              className="flex items-center gap-2 font-body text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Work
            </Link>
          </div>

          {/* Hero */}
          <section
            ref={heroRef}
            className="relative flex w-full flex-col items-center justify-center px-16 pt-14 pb-10 max-md:px-6 max-md:pt-10"
          >
            <div className="flex flex-col items-center gap-5 text-center max-w-[960px]">
              <div className="hero-fade flex gap-2 flex-wrap items-center justify-center">
                {caseStudy?.status === "in-development" && (
                  <span className="bg-amber-500/15 border border-amber-500/25 px-3 py-1 font-body text-[11px] font-semibold tracking-[1px] text-amber-400">
                    IN DEVELOPMENT
                  </span>
                )}
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[var(--color-accent-subtle)] px-3 py-1 font-body text-[11px] font-medium text-[var(--color-accent)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1
                ref={headingRef}
                className="font-display tracking-[-2px] text-[var(--color-text-primary)]"
                style={{ fontSize: "clamp(32px, 5.5vw, 76px)", lineHeight: 1.1 }}
              >
                {study.title}
              </h1>
              <p className="hero-fade max-w-[580px] font-body text-[17px] leading-[1.75] text-[var(--color-text-dim)] max-md:text-base">
                {study.heroDesc}
              </p>
            </div>
          </section>

          {/* In Development Banner */}
          {caseStudy?.status === "in-development" && (
            <section className="w-full px-16 pb-6 max-md:px-6">
              <div className="mx-auto max-w-[1000px] flex items-center gap-3 border border-amber-500/20 bg-amber-500/5 px-5 py-3">
                <span className="h-2 w-2 shrink-0 rounded-full bg-amber-400 animate-pulse" />
                <p className="font-body text-sm text-amber-300/90">
                  This project is actively in progress — features and design are being built and improved continuously.
                </p>
              </div>
            </section>
          )}

          {/* Hero Image */}
          <section className="w-full px-16 pb-20 max-md:px-6 max-md:pb-12">
            <div className="mx-auto max-w-[1200px] relative w-full overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-card)]">
              {caseStudy?.heroImage ? (
                <div
                  ref={heroImgRef}
                  className="relative"
                  style={{ height: "clamp(260px, 48vh, 540px)" }}
                >
                  <Image
                    src={caseStudy.heroImage}
                    alt={study.title}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              ) : (
                <div
                  className="flex w-full items-center justify-center bg-gradient-to-br from-[#7C5CFC12] to-[#7C5CFC06]"
                  style={{ height: "clamp(260px, 48vh, 540px)" }}
                >
                  <span className="font-body text-sm tracking-[2px] text-[var(--color-text-subtle)]">
                    PROJECT IMAGE
                  </span>
                </div>
              )}
              {caseStudy?.liveUrl && (
                <a
                  href={caseStudy.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 flex items-center gap-2 border border-[var(--color-accent-border)] bg-[var(--color-bg-primary)]/90 backdrop-blur-sm px-5 py-2.5 font-body text-[13px] font-medium text-[var(--color-accent)] transition-all hover:bg-[var(--color-accent-subtle)]"
                >
                  View Live Site
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </section>

          {/* Overview — Challenge / Solution */}
          <section
            ref={overviewRef}
            className="w-full bg-[#0D0C14] px-16 py-24 max-md:px-6 max-md:py-16"
          >
            <div className="mx-auto flex max-w-[1000px] gap-16 max-lg:gap-12 max-md:flex-col max-md:gap-14">
              {/* Challenge */}
              <div className="overview-col flex flex-1 flex-col gap-6">
                <span className="font-body text-[11px] font-semibold tracking-[3px] text-[var(--color-accent)]">
                  THE CHALLENGE
                </span>

                {/* Lead paragraph — slightly larger */}
                {challengeParas[0] && (
                  <p className="font-body text-[17px] font-medium leading-[1.75] text-[var(--color-text-primary)] max-md:text-base">
                    {challengeParas[0]}
                  </p>
                )}

                {/* Remaining paragraphs */}
                {challengeParas.slice(1).map((para, i) => (
                  <p
                    key={i}
                    className="font-body text-[15px] leading-[1.8] text-[var(--color-text-dim)]"
                  >
                    {para}
                  </p>
                ))}

                {/* Optional bullet points */}
                {study.challengePoints && study.challengePoints.length > 0 && (
                  <ul className="mt-2 flex flex-col gap-3 border-t border-[var(--color-border)] pt-5">
                    {study.challengePoints.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 font-body text-[13px] leading-[1.6] text-[var(--color-text-dim)]"
                      >
                        <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)] opacity-60" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Divider — vertical on desktop, horizontal on mobile */}
              <div className="shrink-0 max-md:hidden w-px bg-[var(--color-border)]" />
              <div className="hidden max-md:block h-px w-full bg-[var(--color-border)]" />

              {/* Solution */}
              <div className="overview-col flex flex-1 flex-col gap-6">
                <span className="font-body text-[11px] font-semibold tracking-[3px] text-[var(--color-accent)]">
                  THE SOLUTION
                </span>

                {/* Lead paragraph */}
                {solutionParas[0] && (
                  <p className="font-body text-[17px] font-medium leading-[1.75] text-[var(--color-text-primary)] max-md:text-base">
                    {solutionParas[0]}
                  </p>
                )}

                {/* Remaining paragraphs */}
                {solutionParas.slice(1).map((para, i) => (
                  <p
                    key={i}
                    className="font-body text-[15px] leading-[1.8] text-[var(--color-text-dim)]"
                  >
                    {para}
                  </p>
                ))}

                {/* Optional bullet highlights */}
                {study.solutionHighlights && study.solutionHighlights.length > 0 && (
                  <ul className="mt-2 flex flex-col gap-3 border-t border-[var(--color-border)] pt-5">
                    {study.solutionHighlights.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 font-body text-[13px] leading-[1.6] text-[var(--color-text-dim)]"
                      >
                        <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>

          {/* Results */}
          {study.results.length > 0 && (
            <section
              ref={resultsRef}
              className="w-full px-16 py-24 max-md:px-6 max-md:py-16"
            >
              <div className="mx-auto max-w-[1000px]">
                <div className="mb-10 flex flex-col gap-2">
                  <span className="font-body text-[11px] font-semibold tracking-[3px] text-[var(--color-accent)]">
                    RESULTS
                  </span>
                  <h2
                    className="font-display tracking-[-1px] text-[var(--color-text-primary)]"
                    style={{ fontSize: "clamp(22px, 2.8vw, 34px)" }}
                  >
                    The impact
                  </h2>
                </div>
                <div className="grid gap-5 max-md:grid-cols-2"
                  style={{ gridTemplateColumns: `repeat(${Math.min(study.results.length, 4)}, minmax(0, 1fr))` }}
                >
                  {study.results.map((r) => (
                    <div
                      key={r.label}
                      className="result-card flex flex-col gap-2 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-7 max-md:p-5"
                    >
                      <span
                        className={`count-up font-display tracking-[-1px] ${r.color}`}
                        data-target={r.value}
                        style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
                      >
                        {r.value.startsWith("+") ? "+0" : isNaN(Number(r.value.replace(/[^0-9]/g, ""))) ? r.value : "0"}
                      </span>
                      <span className="font-body text-sm text-[var(--color-text-dim)]">
                        {r.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Gallery */}
          <section
            ref={galleryRef}
            className="w-full px-16 pb-24 max-md:px-6 max-md:pb-12"
          >
            <div className="mx-auto max-w-[1200px]">
              {caseStudy?.gallery && caseStudy.gallery.length > 0 ? (
                <div className="flex flex-col gap-5">
                  <div className="flex gap-5 max-md:flex-col">
                    {caseStudy.gallery.slice(0, 2).map((src, i) => (
                      <div
                        key={i}
                        className="gallery-item relative flex-1 overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-card)]"
                        style={{ height: "clamp(220px, 33vh, 380px)" }}
                      >
                        <Image
                          src={src}
                          alt={`${study.title} screenshot ${i + 1}`}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                    ))}
                  </div>
                  {caseStudy.gallery.length > 2 && (
                    <div className="flex gap-5 max-md:flex-col">
                      {caseStudy.gallery.slice(2, 4).map((src, i) => (
                        <div
                          key={i}
                          className="gallery-item relative flex-1 overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-card)]"
                          style={{ height: "clamp(220px, 33vh, 380px)" }}
                        >
                          <Image
                            src={src}
                            alt={`${study.title} screenshot ${i + 3}`}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {caseStudy.gallery.length > 4 && (
                    <div className="flex gap-5 max-md:flex-col">
                      {caseStudy.gallery.slice(4).map((src, i) => (
                        <div
                          key={i}
                          className={`gallery-item relative overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-card)] ${
                            caseStudy.gallery!.slice(4).length === 1
                              ? "w-full"
                              : "flex-1"
                          }`}
                          style={{ height: "clamp(220px, 33vh, 380px)" }}
                        >
                          <Image
                            src={src}
                            alt={`${study.title} screenshot ${i + 5}`}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-5 max-md:flex-col">
                  <div
                    className="gallery-item flex flex-1 items-center justify-center bg-gradient-to-br from-[#7C5CFC10] to-[#7C5CFC05] border border-[var(--color-border)]"
                    style={{ height: "clamp(220px, 33vh, 380px)" }}
                  >
                    <span className="font-body text-sm tracking-[2px] text-[var(--color-text-subtle)]">
                      GALLERY 1
                    </span>
                  </div>
                  <div
                    className="gallery-item flex flex-1 items-center justify-center bg-gradient-to-br from-[#7C5CFC10] to-[#7C5CFC05] border border-[var(--color-border)]"
                    style={{ height: "clamp(220px, 33vh, 380px)" }}
                  >
                    <span className="font-body text-sm tracking-[2px] text-[var(--color-text-subtle)]">
                      GALLERY 2
                    </span>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Next Project */}
          <section className="w-full border-t border-[var(--color-border)] bg-[#0D0C14] px-16 py-20 max-md:px-6 max-md:py-12">
            <Link
              href={`/work/${nextProject.slug}`}
              className="group mx-auto flex max-w-[1000px] items-center justify-between gap-8"
            >
              <div className="flex flex-col gap-2">
                <span className="font-body text-[11px] font-medium tracking-[3px] text-[var(--color-text-muted)]">
                  NEXT PROJECT
                </span>
                <span
                  className="font-display tracking-[-1px] text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-accent)]"
                  style={{ fontSize: "clamp(24px, 3.5vw, 44px)" }}
                >
                  {nextProject.title}
                </span>
              </div>
              <ArrowRight className="h-7 w-7 shrink-0 text-[var(--color-text-muted)] transition-all group-hover:translate-x-2 group-hover:text-[var(--color-accent)]" />
            </Link>
          </section>

          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
