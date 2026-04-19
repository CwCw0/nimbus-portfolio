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
    detail: "Strategy · Research · Direction",
  },
  {
    num: "02",
    title: "Design & Build",
    desc: "I design and develop your solution iteratively, keeping you in the loop with regular checkpoints.",
    detail: "UI/UX · Code · Iteration",
  },
  {
    num: "03",
    title: "Launch & Grow",
    desc: "I launch your project, monitor performance, and iterate. I stay available for ongoing support and optimizations.",
    detail: "Deploy · Measure · Scale",
  },
];

export default function Process() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isMobile = window.innerWidth < 769;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // Header entrance
      const header = el.querySelector(".process-header");
      if (header) {
        gsap.fromTo(
          header,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: header, start: "top 85%", once: true },
          }
        );
      }

      if (isMobile) {
        // Mobile — staggered card reveals
        const mobileCards = el.querySelectorAll(".process-card-mobile");
        mobileCards.forEach((card) => {
          gsap.fromTo(
            card,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 85%", once: true },
            }
          );
        });
        return;
      }

      // Desktop — stacking cards with scroll pinning
      const cards = el.querySelectorAll<HTMLElement>(".process-card");
      const stackContainer = el.querySelector(".process-stack");

      if (!stackContainer || cards.length === 0) return;

      cards.forEach((card, i) => {
        // Each card pins and stacks behind the next
        ScrollTrigger.create({
          trigger: card,
          start: () => `top-=${i * 20} 20%`,
          end: "bottom top",
          pin: i < cards.length - 1,
          pinSpacing: i < cards.length - 1,
          onEnter: () => {
            gsap.to(card, {
              scale: 1,
              autoAlpha: 1,
              duration: 0.5,
              ease: "power3.out",
            });
          },
          onLeave: () => {
            if (i < cards.length - 1) {
              gsap.to(card, {
                scale: 0.92 - i * 0.02,
                duration: 0.4,
                ease: "power2.inOut",
              });
            }
          },
          onEnterBack: () => {
            gsap.to(card, {
              scale: 1,
              autoAlpha: 1,
              duration: 0.4,
              ease: "power3.out",
            });
          },
        });

        // Content reveal within each card
        const inner = card.querySelector(".process-card-inner");
        if (inner) {
          gsap.fromTo(
            inner,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 60%",
                once: true,
              },
            }
          );
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full bg-(--color-bg-primary) px-16 py-32 max-md:px-6 max-md:py-20"
    >
      {/* Header */}
      <div className="process-header mb-24 max-md:mb-12">
        <span className="font-body text-[11px] font-medium tracking-[3px] text-(--color-accent)">
          HOW IT WORKS
        </span>
        <h2
          className="mt-4 font-display tracking-[-2px] text-(--color-text-primary)"
          style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
        >
          Three steps.
          <br />
          <span className="text-(--color-text-muted)">Zero fluff.</span>
        </h2>
      </div>

      {/* Desktop — stacking cards */}
      <div className="process-stack mx-auto max-w-250 max-md:hidden">
        {steps.map((s, i) => {
          // Each card gets progressively deeper bg for visual depth
          const bgShades = [
            "var(--color-bg-card)",
            "var(--color-bg-card-alt)",
            "var(--color-bg-elevated)",
          ];

          return (
            <div
              key={s.num}
              className="process-card relative mb-8"
              style={{ willChange: "transform" }}
            >
              <div
                className="process-card-inner relative flex min-h-[320px] flex-col justify-between border border-(--color-border) p-12 md:p-16"
                style={{ background: bgShades[i] }}
              >
                {/* Top row — number + detail */}
                <div className="flex items-start justify-between">
                  <span
                    className="font-display text-(--color-accent)"
                    style={{
                      fontSize: "clamp(60px, 8vw, 120px)",
                      lineHeight: 0.85,
                      opacity: 0.1,
                    }}
                  >
                    {s.num}
                  </span>
                  <span className="font-body text-[11px] tracking-[2px] text-(--color-text-subtle)">
                    {s.detail}
                  </span>
                </div>

                {/* Bottom — title + desc */}
                <div className="mt-auto max-w-150">
                  <h3
                    className="font-display tracking-[-1px] text-(--color-text-primary)"
                    style={{
                      fontSize: "clamp(28px, 3.5vw, 48px)",
                      lineHeight: 1.1,
                    }}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-4 font-body text-base leading-[1.7] text-(--color-text-dim)">
                    {s.desc}
                  </p>
                </div>

                {/* Subtle accent line at bottom */}
                <div
                  className="absolute bottom-0 left-0 h-px bg-(--color-accent)"
                  style={{
                    width: `${((i + 1) / steps.length) * 100}%`,
                    opacity: 0.2,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile — simple stacked cards */}
      <div className="hidden max-md:flex flex-col gap-6">
        {steps.map((s) => (
          <div
            key={s.num}
            className="process-card-mobile border border-(--color-border) bg-(--color-bg-card) p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-display text-5xl text-(--color-accent) opacity-15 leading-none">
                {s.num}
              </span>
              <span className="font-body text-[10px] tracking-[2px] text-(--color-text-subtle)">
                {s.detail}
              </span>
            </div>
            <h3 className="font-body text-xl font-semibold text-(--color-text-primary)">
              {s.title}
            </h3>
            <p className="mt-3 font-body text-sm leading-[1.7] text-(--color-text-dim)">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
