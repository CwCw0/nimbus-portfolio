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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const circles = el.querySelectorAll(".timeline-circle");
      const connectors = el.querySelectorAll(".timeline-connector");
      const texts = el.querySelectorAll(".timeline-text");

      if (prefersReducedMotion) {
        gsap.set([circles, connectors, texts], { opacity: 1, y: 0 });
        gsap.set(connectors, { scaleX: 1 });
        return;
      }

      // Set initial states
      gsap.set(circles, { opacity: 0, scale: 0.5 });
      gsap.set(texts, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          once: true,
        },
      });

      // Circles pop in
      tl.to(circles, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.7)",
      });

      // Connectors draw in (overlapping with circles)
      tl.to(
        connectors,
        {
          scaleX: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.inOut",
        },
        "-=0.4"
      );

      // Text fades in
      tl.to(
        texts,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.3"
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="snap-section relative w-full bg-[var(--color-bg-secondary)] px-16 py-[100px] max-md:px-6 max-md:py-16"
    >
      {/* Header */}
      <div className="mb-20 flex flex-col items-center gap-4 max-md:mb-12 max-md:items-start">
        <span className="font-body text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
          03 / PROCESS
        </span>
        <h2 className="font-display text-5xl tracking-[-1px] text-[var(--color-text-primary)] max-md:text-[32px]">
          How I work
        </h2>
      </div>

      {/* Desktop — Horizontal Timeline */}
      <div className="relative max-md:hidden">
        {/* Grounding line */}
        <div className="absolute left-0 right-0 top-[24px] h-px bg-[var(--color-border)]" />

        <div className="relative flex justify-between">
          {steps.map((s, i) => (
            <div key={s.num} className="relative flex flex-col items-center" style={{ width: "30%" }}>
              {/* Circle */}
              <div className="timeline-circle relative z-10 flex h-[48px] w-[48px] items-center justify-center rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg-secondary)] transition-all duration-300 hover:bg-[var(--color-accent)] group">
                <span className="font-body text-sm font-semibold text-[var(--color-accent)] transition-colors group-hover:text-white" style={{ cursor: "default" }}>
                  {s.num}
                </span>
              </div>

              {/* Connector line to next step */}
              {i < steps.length - 1 && (
                <div
                  className="timeline-connector absolute top-[23px] h-[2px] bg-[var(--color-border)]"
                  style={{
                    left: "calc(50% + 28px)",
                    width: "calc(100% + 44px)",
                    transformOrigin: "left",
                    transform: "scaleX(0)",
                  }}
                >
                  {/* Diamond midpoint */}
                  <span
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] text-[var(--color-accent)] opacity-50"
                  >
                    &#x25C6;
                  </span>
                </div>
              )}

              {/* Text below */}
              <div className="timeline-text mt-8 flex flex-col items-center gap-3 text-center">
                <h3 className="font-body text-lg font-semibold text-[var(--color-text-primary)]">
                  {s.title}
                </h3>
                <p className="max-w-[280px] font-body text-sm leading-[1.6] text-[var(--color-text-dim)]">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile — Vertical Timeline */}
      <div className="hidden max-md:flex flex-col">
        {steps.map((s, i) => (
          <div key={s.num} className="flex gap-6">
            {/* Left: circle + vertical line */}
            <div className="flex flex-col items-center">
              <div className="timeline-circle flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg-secondary)]">
                <span className="font-body text-xs font-semibold text-[var(--color-accent)]">
                  {s.num}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="mt-2 mb-2 h-full w-px border-l border-dashed border-[var(--color-border)]" />
              )}
            </div>
            {/* Right: text */}
            <div className="timeline-text flex flex-col gap-2 pb-10">
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
