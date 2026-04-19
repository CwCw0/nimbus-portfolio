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
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rowRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const imageContainer = imageContainerRef.current;
    if (!section || !imageContainer) return;

    const isMobile = window.innerWidth < 769;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cleanups: (() => void)[] = [];

    // --- Scroll entrance animations ---
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      const header = section.querySelector(".cs-header");
      if (header) {
        gsap.fromTo(
          header,
          { autoAlpha: 0, x: -60 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: header, start: "top 85%", once: true },
          }
        );
      }

      const rows = section.querySelectorAll(".cs-row");
      rows.forEach((row) => {
        const line = row.querySelector(".cs-line");
        const content = row.querySelector(".cs-row-inner");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 90%", once: true },
        });

        if (line) {
          tl.fromTo(
            line,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.8, ease: "power3.inOut" }
          );
        }

        if (content) {
          tl.fromTo(
            content,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
            "-=0.4"
          );
        }
      });

      if (isMobile) {
        const cards = section.querySelectorAll(".cs-mobile-card");
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { autoAlpha: 0, y: 40 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 85%", once: true },
            }
          );
        });
      }
    }, section);

    cleanups.push(() => ctx.revert());

    // --- Desktop: single mousemove handler for cursor-following images ---
    // This avoids all mouseenter/mouseleave race conditions.
    if (!isMobile && !prefersReducedMotion) {
      const xTo = gsap.quickTo(imageContainer, "x", {
        duration: 0.35,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(imageContainer, "y", {
        duration: 0.35,
        ease: "power3.out",
      });

      let activeIndex = -1;
      let isOverList = false;
      const listArea = section.querySelector(".cs-list") as HTMLElement | null;

      const showImage = (index: number) => {
        if (index === activeIndex) return;

        // Hide all images instantly
        imageRefs.current.forEach((ref) => {
          if (ref) gsap.set(ref, { clipPath: "inset(0% 0% 100% 0%)", scale: 0.9 });
        });

        activeIndex = index;

        // Show container
        gsap.set(imageContainer, { autoAlpha: 1 });

        // Reveal the correct image
        const img = imageRefs.current[index];
        if (img) {
          gsap.fromTo(
            img,
            { clipPath: "inset(0% 0% 100% 0%)", scale: 0.9 },
            { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 0.4, ease: "power3.out" }
          );
        }
      };

      const hideAll = () => {
        if (activeIndex < 0) return;
        const prevImg = imageRefs.current[activeIndex];
        if (prevImg) {
          gsap.to(prevImg, {
            clipPath: "inset(0% 0% 100% 0%)",
            scale: 0.9,
            duration: 0.25,
            ease: "power3.in",
          });
        }
        gsap.to(imageContainer, { autoAlpha: 0, duration: 0.2 });
        activeIndex = -1;
      };

      const onMouseMove = (e: MouseEvent) => {
        if (!listArea) return;

        // Track cursor position
        xTo(e.clientX - 160);
        yTo(e.clientY - 100);

        // Determine which row the cursor is over using bounding rects
        let foundIndex = -1;
        for (let i = 0; i < rowRefs.current.length; i++) {
          const row = rowRefs.current[i];
          if (!row) continue;
          const rect = row.getBoundingClientRect();
          if (e.clientY >= rect.top && e.clientY <= rect.bottom &&
              e.clientX >= rect.left && e.clientX <= rect.right) {
            foundIndex = i;
            break;
          }
        }

        if (foundIndex >= 0 && studies[foundIndex]?.image) {
          isOverList = true;
          showImage(foundIndex);
        } else if (isOverList) {
          isOverList = false;
          hideAll();
        }
      };

      const onMouseLeave = () => {
        isOverList = false;
        hideAll();
      };

      // Attach to the list container, not individual rows
      if (listArea) {
        listArea.addEventListener("mousemove", onMouseMove);
        listArea.addEventListener("mouseleave", onMouseLeave);
        cleanups.push(() => {
          listArea.removeEventListener("mousemove", onMouseMove);
          listArea.removeEventListener("mouseleave", onMouseLeave);
        });
      }
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full bg-(--color-bg-primary) px-16 py-32 max-md:px-6 max-md:py-20"
    >
      {/* Floating cursor-following image — desktop only */}
      <div
        ref={imageContainerRef}
        className="pointer-events-none fixed left-0 top-0 z-30 max-md:hidden"
        style={{ visibility: "hidden", willChange: "transform" }}
      >
        {studies.map((s, i) =>
          s.image ? (
            <div
              key={s.slug}
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
              className="absolute left-0 top-0 overflow-hidden"
              style={{
                width: "320px",
                height: "200px",
                clipPath: "inset(0% 0% 100% 0%)",
                willChange: "clip-path, transform",
              }}
            >
              <Image
                src={s.image}
                alt={s.title}
                fill
                className="object-cover"
                sizes="320px"
              />
            </div>
          ) : (
            <div
              key={s.slug}
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
            />
          )
        )}
      </div>

      {/* Section header */}
      <div className="cs-header mb-20 max-md:mb-12">
        <span className="font-body text-[11px] font-medium tracking-[3px] text-(--color-accent)">
          SELECTED WORK
        </span>
        <h2
          className="mt-4 font-display tracking-[-2px] text-(--color-text-primary)"
          style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
        >
          Case Studies
        </h2>
      </div>

      {/* Desktop — editorial list rows */}
      <div className="cs-list mx-auto max-w-300 max-md:hidden">
        {studies.map((s, i) => (
          <Link
            key={s.slug}
            href={`/work/${s.slug}`}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            className="cs-row group relative block"
            data-cursor="view"
          >
            {/* Top line */}
            <div
              className="cs-line h-px w-full bg-(--color-border)"
              style={{ transformOrigin: "left" }}
            />

            {/* Row content */}
            <div className="cs-row-inner flex items-center gap-8 py-10 md:py-12">
              <span className="w-16 shrink-0 font-body text-sm tracking-[2px] text-(--color-text-subtle) transition-colors duration-300 group-hover:text-(--color-accent)">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3
                className="flex-1 font-display tracking-[-1px] text-(--color-text-primary) transition-all duration-500 group-hover:translate-x-4 group-hover:text-(--color-accent)"
                style={{ fontSize: "clamp(28px, 4vw, 56px)", lineHeight: 1.1 }}
              >
                {s.title}
              </h3>

              <div className="flex items-center gap-4 max-lg:hidden">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-[11px] tracking-[1px] text-(--color-text-muted) transition-colors duration-300 group-hover:text-(--color-text-secondary)"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {s.status === "in-development" && (
                <span className="bg-amber-500/15 border border-amber-500/25 px-3 py-1 font-body text-[9px] font-semibold tracking-[1px] text-amber-400 max-lg:hidden">
                  IN DEV
                </span>
              )}

              <div className="ml-4 flex h-12 w-12 shrink-0 items-center justify-center border border-(--color-border) transition-all duration-300 group-hover:border-(--color-accent) group-hover:bg-(--color-accent)">
                <ArrowRight className="h-4 w-4 text-(--color-text-muted) transition-all duration-300 group-hover:-rotate-45 group-hover:text-white" />
              </div>
            </div>

            {i === studies.length - 1 && (
              <div className="h-px w-full bg-(--color-border)" />
            )}
          </Link>
        ))}
      </div>

      {/* Mobile — compact cards */}
      <div className="hidden flex-col gap-8 max-md:flex">
        {studies.map((s, i) => (
          <Link
            key={s.slug}
            href={`/work/${s.slug}`}
            className="cs-mobile-card group flex flex-col overflow-hidden border border-(--color-border) transition-colors duration-300"
          >
            <div className="relative h-48 w-full overflow-hidden">
              {s.image ? (
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="100vw"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#7C5CFC12] to-[#7C5CFC06]">
                  <span className="font-body text-sm tracking-[2px] text-(--color-text-subtle)">
                    {s.title}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-[#0A0A0F] via-transparent to-transparent" />
              {s.status === "in-development" && (
                <span className="absolute top-3 right-3 bg-amber-500/15 border border-amber-500/25 px-2.5 py-1 font-body text-[9px] font-semibold tracking-[1px] text-amber-400">
                  IN DEV
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 p-6">
              <div className="flex items-center gap-3">
                <span className="font-body text-xs tracking-[2px] text-(--color-text-subtle)">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex gap-2">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-body text-[10px] text-(--color-accent-secondary)"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="font-display text-2xl tracking-[-1px] text-(--color-text-primary)">
                {s.title}
              </h3>
              <p className="font-body text-sm leading-[1.6] text-(--color-text-dim)">
                {s.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* View all CTA */}
      <div className="mt-20 flex justify-center max-md:mt-12">
        <Link
          href="/work"
          data-magnetic
          className="group flex items-center gap-3 border border-(--color-border) px-10 py-4 font-body text-sm font-medium text-(--color-text-secondary) transition-all duration-300 hover:border-(--color-accent-border) hover:text-(--color-text-primary)"
        >
          View All Projects
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
