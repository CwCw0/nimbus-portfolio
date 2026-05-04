"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CustomCursor from "../../components/CustomCursor";
import SmoothScroll from "../../components/SmoothScroll";
import WaterRipple from "../../components/WaterRipple";
import { ArrowRight, ArrowUpRight, Sparkles, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { allCaseStudies } from "../../data/caseStudies";
import { labDesigns, labCategories } from "../../data/labDesigns";

gsap.registerPlugin(ScrollTrigger);

export default function WorkContent() {
  const [view, setView] = useState<"cases" | "lab">("cases");
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLElement>(null);
  const labGridRef = useRef<HTMLElement>(null);
  const [labFilter, setLabFilter] = useState("All");

  const filteredDesigns =
    labFilter === "All"
      ? labDesigns
      : labDesigns.filter((d) => d.category === labFilter);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const cleanups: (() => void)[] = [];

    // Hero entrance
    const hero = heroRef.current;
    if (hero) {
      const ctx = gsap.context(() => {
        const label = hero.querySelector(".hero-label");
        const heading = hero.querySelector(".hero-heading");
        const desc = hero.querySelector(".hero-desc");
        const line = hero.querySelector(".hero-line");

        const tl = gsap.timeline({ delay: 0.2 });

        if (label) {
          gsap.set(label, { autoAlpha: 0, x: -20 });
          tl.to(label, { autoAlpha: 1, x: 0, duration: 0.5, ease: "power3.out" });
        }

        if (heading) {
          gsap.set(heading, { autoAlpha: 0, y: 60 });
          tl.to(heading, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.2");
        }

        if (line) {
          gsap.set(line, { scaleX: 0 });
          tl.to(line, { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, "-=0.4");
        }

        if (desc) {
          gsap.set(desc, { autoAlpha: 0, y: 30 });
          tl.to(desc, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.3");
        }
      }, hero);
      cleanups.push(() => ctx.revert());
    }

    // Grid cards
    const gridEl = gridRef.current;
    if (gridEl && view === "cases") {
      const ctx = gsap.context(() => {
        const cards = gridEl.querySelectorAll(".work-card");
        cards.forEach((card) => {
          const img = card.querySelector(".work-card-img");
          const content = card.querySelector(".work-card-content");

          const tl = gsap.timeline({
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
          });

          if (img) {
            gsap.set(img, { clipPath: "inset(100% 0 0 0)" });
            tl.to(img, {
              clipPath: "inset(0% 0 0 0)",
              duration: 0.8,
              ease: "power3.inOut",
            });
          }

          if (content) {
            gsap.set(content, { autoAlpha: 0, y: 30 });
            tl.to(
              content,
              { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
              "-=0.3"
            );
          }
        });
      }, gridEl);
      cleanups.push(() => ctx.revert());
    }

    // Lab cards
    const labEl = labGridRef.current;
    if (labEl && view === "lab") {
      const ctx = gsap.context(() => {
        const cards = labEl.querySelectorAll(".lab-card");
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
              scrollTrigger: { trigger: card, start: "top 85%", once: true },
            }
          );
        });
      }, labEl);
      cleanups.push(() => ctx.revert());
    }

    return () => cleanups.forEach((fn) => fn());
  }, [view]);

  return (
    <>
      <CustomCursor />
      <WaterRipple />
      <SmoothScroll>
        <main
          id="main-content"
          className="flex w-full flex-col overflow-x-hidden bg-(--color-bg-primary)"
        >
          <Header />

          {/* Hero */}
          <section
            ref={heroRef}
            className="relative flex min-h-screen w-full flex-col items-center justify-center px-16 pt-24 pb-20 max-md:px-6 max-md:pt-20 max-md:pb-12"
          >
            <span
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-(--color-text-primary)"
              style={{
                fontSize: "clamp(100px, 18vw, 300px)",
                opacity: 0.02,
                letterSpacing: "0.1em",
              }}
            >
              {view === "cases" ? "WORK" : "LAB"}
            </span>

            <div className="relative z-10 flex flex-col items-center gap-6 text-center">
              <span className="hero-label font-body text-[11px] font-medium tracking-[4px] text-(--color-accent)">
                {view === "cases" ? "SELECTED WORK" : "DESIGN LAB"}
              </span>
              <h1
                className="hero-heading font-display tracking-[-2px] text-(--color-text-primary)"
                style={{
                  fontSize: "clamp(36px, 7vw, 110px)",
                  lineHeight: 1.05,
                }}
              >
                {view === "cases" ? "Selected work." : "Where ideas take shape."}
              </h1>
              <div
                className="hero-line h-px w-24 bg-(--color-accent) opacity-30"
                style={{ transformOrigin: "center" }}
              />
              <p className="hero-desc max-w-150 font-body text-lg leading-[1.7] text-(--color-text-dim) max-md:text-base">
                {view === "cases"
                  ? "A collection of work spanning web apps, landing pages, SaaS platforms, and more. Each project is a story of solving real problems with design and code."
                  : "Design concepts, website templates, and visual experiments. Everything here is crafted to a standard — not generated from a template."}
              </p>
            </div>
          </section>

          {/* View Toggle */}
          <section className="w-full px-16 pb-10 max-md:px-6">
            <div className="mx-auto flex max-w-300 items-center gap-0">
              <button
                onClick={() => setView("cases")}
                className={`flex-1 border-b-2 py-4 font-body text-sm font-medium tracking-[1px] transition-all duration-300 ${
                  view === "cases"
                    ? "border-(--color-accent) text-(--color-text-primary)"
                    : "border-(--color-border) text-(--color-text-muted) hover:text-(--color-text-secondary)"
                }`}
              >
                Case Studies
              </button>
              <button
                onClick={() => setView("lab")}
                className={`flex-1 flex items-center justify-center gap-2 border-b-2 py-4 font-body text-sm font-medium tracking-[1px] transition-all duration-300 ${
                  view === "lab"
                    ? "border-(--color-accent) text-(--color-text-primary)"
                    : "border-(--color-border) text-(--color-text-muted) hover:text-(--color-text-secondary)"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Design Lab
              </button>
            </div>
          </section>

          {/* Case Studies View */}
          {view === "cases" && (
            <section
              ref={gridRef}
              className="w-full px-16 pb-32 max-md:px-6 max-md:pb-16"
            >
              <div className="mx-auto grid max-w-300 grid-cols-2 gap-8 max-md:grid-cols-1">
                {allCaseStudies.map((study, i) => (
                  <Link
                    key={study.slug}
                    href={`/work/${study.slug}`}
                    className="work-card group relative flex flex-col overflow-hidden border border-(--color-border) transition-all duration-300 hover:-translate-y-1 hover:border-(--color-accent-border) hover:shadow-[0_0_30px_#7C5CFC10]"
                    data-cursor="view"
                  >
                    <div
                      className="work-card-img relative overflow-hidden bg-(--color-bg-card)"
                      style={{ height: "clamp(220px, 30vh, 340px)" }}
                    >
                      {study.heroImage ? (
                        <Image
                          src={study.heroImage}
                          alt={study.shortTitle}
                          fill
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span className="font-body text-sm tracking-[2px] text-(--color-text-subtle)">
                            {study.shortTitle}
                          </span>
                        </div>
                      )}
                      {study.status === "in-development" && (
                        <span className="absolute top-3 right-3 bg-amber-500/15 border border-amber-500/25 px-2.5 py-1 font-body text-[10px] font-semibold tracking-[1px] text-amber-400">
                          IN DEVELOPMENT
                        </span>
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-[#0A0A0F80] to-transparent" />
                      <span
                        className="absolute bottom-4 right-5 font-display text-(--color-accent) opacity-15"
                        style={{ fontSize: "clamp(36px, 4vw, 64px)", lineHeight: 1 }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="work-card-content flex flex-col gap-3 p-7 max-md:p-5">
                      <div className="flex flex-wrap gap-2">
                        {study.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="bg-(--color-accent-subtle) px-2.5 py-1 font-body text-[10px] font-medium text-(--color-accent)"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2
                        className="font-display tracking-[-0.5px] text-(--color-text-primary) transition-colors group-hover:text-(--color-accent)"
                        style={{ fontSize: "clamp(20px, 2vw, 28px)" }}
                      >
                        {study.shortTitle}
                      </h2>
                      <p className="font-body text-[13px] leading-[1.6] text-(--color-text-dim)">
                        {study.desc}
                      </p>
                      <span className="flex items-center gap-2 font-body text-sm font-medium text-(--color-accent) transition-all group-hover:gap-3">
                        View Case Study
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Design Lab View */}
          {view === "lab" && (
            <>
              {/* Lab filter */}
              <section className="w-full px-16 pb-8 max-md:px-6 max-md:overflow-x-auto">
                <div className="mx-auto flex max-w-300 items-center gap-3 max-md:w-max">
                  {labCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setLabFilter(cat)}
                      className={`px-5 py-2.5 font-body text-[12px] font-medium tracking-[1px] transition-all duration-200 ${
                        labFilter === cat
                          ? "bg-(--color-accent) text-white"
                          : "border border-(--color-border) text-(--color-text-muted) hover:border-(--color-accent-border) hover:text-(--color-text-primary)"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </section>

              {/* Lab grid */}
              <section
                ref={labGridRef}
                className="w-full px-16 pb-32 max-md:px-6 max-md:pb-16"
              >
                <div className="mx-auto max-w-300">
                  <div className="mb-10 flex items-center gap-4">
                    <span className="font-body text-[10px] font-medium tracking-[4px] text-(--color-text-muted)">
                      {filteredDesigns.length} DESIGN{filteredDesigns.length !== 1 ? "S" : ""}
                    </span>
                    <div className="h-px flex-1 bg-(--color-border)" />
                  </div>

                  <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
                    {filteredDesigns.map((design) => (
                      <div
                        key={design.slug}
                        className="lab-card group relative flex flex-col border border-(--color-border) bg-(--color-bg-card) transition-all duration-500 hover:border-(--color-accent-border) hover:-translate-y-1 hover:shadow-[0_0_40px_#7C5CFC10]"
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

                          {design.status === "coming-soon" && (
                            <div className="absolute top-4 left-4 bg-black/70 px-3 py-1.5 backdrop-blur-sm">
                              <span className="font-body text-[10px] font-medium tracking-[2px] text-white/80">
                                COMING SOON
                              </span>
                            </div>
                          )}

                          {design.price && (
                            <div className="absolute top-4 right-4 bg-(--color-accent) px-3 py-1.5">
                              <span className="font-body text-[11px] font-semibold text-white">
                                {design.price}
                              </span>
                            </div>
                          )}

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

                          <p className="font-body text-[13px] leading-[1.65] text-(--color-text-dim)">
                            {design.description.slice(0, 140)}
                            {design.description.length > 140 ? "..." : ""}
                          </p>

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

              {/* Lab CTA */}
              <section className="w-full px-16 pb-32 max-md:px-6 max-md:pb-16">
                <div className="mx-auto flex max-w-200 flex-col items-center gap-8 text-center">
                  <h2
                    className="font-display tracking-[-2px] text-(--color-text-primary)"
                    style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
                  >
                    Want something custom?
                  </h2>
                  <p className="max-w-125 font-body text-[15px] leading-[1.75] text-(--color-text-dim)">
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
            </>
          )}

          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
