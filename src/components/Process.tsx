"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "I learn about your goals, audience and vision. I research your market and competitors to find the right approach.",
  },
  {
    num: "02",
    title: "Design & Build",
    desc: "I design and develop your solution iteratively, keeping you in the loop with regular checkpoints.",
  },
  {
    num: "03",
    title: "Launch & Grow",
    desc: "I launch your project, monitor performance, and iterate. I stay available for ongoing support and optimizations.",
  },
];

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const line = lineRef.current;
    if (!el || !line) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const circles = el.querySelectorAll(".vt-circle");
      const contents = el.querySelectorAll(".vt-content");
      const numbers = el.querySelectorAll(".vt-number");

      if (prefersReducedMotion) {
        gsap.set([circles, contents, numbers], { opacity: 1, y: 0, scale: 1 });
        gsap.set(line, { scaleY: 1 });
        return;
      }

      // Set initial states
      gsap.set(circles, { scale: 0, opacity: 0 });
      gsap.set(contents, { opacity: 0, x: (i) => (i % 2 === 0 ? -40 : 40) });
      gsap.set(numbers, { opacity: 0 });
      gsap.set(line, { scaleY: 0 });

      // Line draws down as user scrolls
      gsap.to(line, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el.querySelector(".vt-timeline"),
          start: "top 70%",
          end: "bottom 70%",
          scrub: true,
        },
      });

      // Each step reveals as scrolling
      steps.forEach((_, i) => {
        const stepEl = el.querySelector(`.vt-step-${i}`);
        if (!stepEl) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stepEl,
            start: "top 75%",
            once: true,
          },
        });

        tl.to(stepEl.querySelector(".vt-circle"), {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        });

        tl.to(
          stepEl.querySelector(".vt-number"),
          { opacity: 1, duration: 0.4 },
          "-=0.3"
        );

        tl.to(
          stepEl.querySelector(".vt-content"),
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.2"
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full bg-[var(--color-bg-secondary)] px-16 py-32 max-md:px-6 max-md:py-16"
    >
      {/* Header */}
      <div className="mb-24 flex flex-col items-center gap-4 text-center max-md:mb-12 max-md:items-start max-md:text-left">
        <span className="font-body text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
          03 / PROCESS
        </span>
        <h2
          className="font-display tracking-[-1px] text-[var(--color-text-primary)]"
          style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
        >
          How I work
        </h2>
      </div>

      {/* Desktop — Vertical timeline, alternating left/right */}
      <div className="vt-timeline relative mx-auto max-w-[900px] max-md:hidden">
        {/* Central line */}
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--color-border)]">
          <div
            ref={lineRef}
            className="absolute left-0 top-0 h-full w-full bg-[var(--color-accent)] opacity-50"
            style={{ transformOrigin: "top", transform: "scaleY(0)" }}
          />
        </div>

        {steps.map((s, i) => {
          const isLeft = i % 2 === 0;

          return (
            <div
              key={s.num}
              className={`vt-step-${i} relative flex items-center ${
                i < steps.length - 1 ? "mb-32" : ""
              }`}
              style={{ minHeight: "180px" }}
            >
              {/* Left side */}
              <div className={`w-1/2 ${isLeft ? "pr-16 text-right" : ""}`}>
                {isLeft && (
                  <div className="vt-content flex flex-col gap-3">
                    <h3 className="font-body text-xl font-semibold text-[var(--color-text-primary)]">
                      {s.title}
                    </h3>
                    <p className="font-body text-sm leading-[1.7] text-[var(--color-text-dim)]">
                      {s.desc}
                    </p>
                  </div>
                )}
                {!isLeft && (
                  <div className="vt-number flex justify-end">
                    <span
                      className="font-display text-[var(--color-accent)]"
                      style={{
                        fontSize: "clamp(60px, 7vw, 100px)",
                        opacity: 0.12,
                        lineHeight: 1,
                      }}
                    >
                      {s.num}
                    </span>
                  </div>
                )}
              </div>

              {/* Center circle */}
              <div className="absolute left-1/2 flex -translate-x-1/2 items-center justify-center">
                <div className="vt-circle flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg-secondary)]">
                  <span className="font-body text-sm font-semibold text-[var(--color-accent)]">
                    {s.num}
                  </span>
                </div>
              </div>

              {/* Right side */}
              <div className={`w-1/2 ${!isLeft ? "pl-16" : ""}`}>
                {!isLeft && (
                  <div className="vt-content flex flex-col gap-3">
                    <h3 className="font-body text-xl font-semibold text-[var(--color-text-primary)]">
                      {s.title}
                    </h3>
                    <p className="font-body text-sm leading-[1.7] text-[var(--color-text-dim)]">
                      {s.desc}
                    </p>
                  </div>
                )}
                {isLeft && (
                  <div className="vt-number">
                    <span
                      className="font-display text-[var(--color-accent)]"
                      style={{
                        fontSize: "clamp(60px, 7vw, 100px)",
                        opacity: 0.12,
                        lineHeight: 1,
                      }}
                    >
                      {s.num}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile — single column, line on left */}
      <div className="hidden max-md:flex flex-col">
        {steps.map((s, i) => (
          <div key={s.num} className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className="vt-circle flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg-secondary)]">
                <span className="font-body text-xs font-semibold text-[var(--color-accent)]">
                  {s.num}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="mb-2 mt-2 h-full w-px border-l border-dashed border-[var(--color-border)]" />
              )}
            </div>
            <div className="vt-content flex flex-col gap-2 pb-10">
              <h3 className="font-body text-lg font-semibold text-[var(--color-text-primary)]">
                {s.title}
              </h3>
              <p className="font-body text-sm leading-[1.6] text-[var(--color-text-dim)]">
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
