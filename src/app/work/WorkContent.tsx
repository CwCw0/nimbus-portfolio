"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CustomCursor from "../../components/CustomCursor";
import SmoothScroll from "../../components/SmoothScroll";
import WaterRipple from "../../components/WaterRipple";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { allCaseStudies } from "../../data/caseStudies";

gsap.registerPlugin(ScrollTrigger);

export default function WorkContent() {
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLElement>(null);

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

    // Grid cards — varied entrance per card
    const gridEl = gridRef.current;
    if (gridEl) {
      const ctx = gsap.context(() => {
        const cards = gridEl.querySelectorAll(".work-card");
        cards.forEach((card, i) => {
          const img = card.querySelector(".work-card-img");
          const content = card.querySelector(".work-card-content");

          const tl = gsap.timeline({
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
          });

          // Image clip-reveals from bottom
          if (img) {
            gsap.set(img, { clipPath: "inset(100% 0 0 0)" });
            tl.to(img, {
              clipPath: "inset(0% 0 0 0)",
              duration: 0.8,
              ease: "power3.inOut",
            });
          }

          // Content fades up
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

    return () => cleanups.forEach((fn) => fn());
  }, []);

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
              WORK
            </span>

            <div className="relative z-10 flex flex-col items-center gap-6 text-center">
              <span className="hero-label font-body text-[11px] font-medium tracking-[4px] text-(--color-accent)">
                SELECTED WORK
              </span>
              <h1
                className="hero-heading font-display tracking-[-2px] text-(--color-text-primary)"
                style={{
                  fontSize: "clamp(36px, 7vw, 110px)",
                  lineHeight: 1.05,
                }}
              >
                Selected work.
              </h1>
              <div
                className="hero-line h-px w-24 bg-(--color-accent) opacity-30"
                style={{ transformOrigin: "center" }}
              />
              <p className="hero-desc max-w-150 font-body text-lg leading-[1.7] text-(--color-text-dim) max-md:text-base">
                A collection of work spanning web apps, landing pages, SaaS
                platforms, and more. Each project is a story of solving real
                problems with design and code.
              </p>
            </div>
          </section>

          {/* Projects Grid */}
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
                      style={{
                        fontSize: "clamp(36px, 4vw, 64px)",
                        lineHeight: 1,
                      }}
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

          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
