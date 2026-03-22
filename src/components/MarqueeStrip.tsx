"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MarqueeStrip() {
  const words = ["DESIGN", "DEVELOP", "DEPLOY", "AUTOMATE", "SCALE"];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const tracks = el.querySelectorAll(".marquee-skew-track");

    const ctx = gsap.context(() => {
      // Scroll-velocity skew: faster scroll = more tilt
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const skew = self.getVelocity() / 300;
          const clamped = gsap.utils.clamp(-5, 5, skew);
          gsap.to(tracks, {
            skewX: clamped,
            duration: 0.3,
            ease: "power2.out",
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex w-full flex-col gap-2 overflow-hidden py-6 max-md:py-4 max-md:gap-1">
      {/* Top row — filled text, scrolls left */}
      <div className="marquee-track marquee-skew-track flex items-center gap-12 whitespace-nowrap max-md:gap-6">
        {[...words, ...words, ...words, ...words].map((word, i) => (
          <div key={`filled-${i}`} className="flex items-center gap-12 max-md:gap-6">
            <span className="font-display text-[48px] tracking-[6px] text-[var(--color-accent)] opacity-20 max-md:text-[28px] max-md:tracking-[3px]">
              {word}
            </span>
            <span className="text-[var(--color-accent)] opacity-30 text-sm">&#x25C6;</span>
          </div>
        ))}
      </div>

      {/* Bottom row — outlined/stroke text, scrolls right */}
      <div className="marquee-track-reverse marquee-skew-track flex items-center gap-12 whitespace-nowrap max-md:gap-6">
        {[...words, ...words, ...words, ...words].map((word, i) => (
          <div key={`outlined-${i}`} className="flex items-center gap-12 max-md:gap-6">
            <span
              className="font-display text-[48px] tracking-[6px] max-md:text-[28px] max-md:tracking-[3px]"
              style={{
                color: "transparent",
                WebkitTextStroke: "1px var(--color-accent)",
                opacity: 0.15,
              }}
            >
              {word}
            </span>
            <span className="text-[var(--color-accent)] opacity-20 text-sm">&#x25C6;</span>
          </div>
        ))}
      </div>
    </div>
  );
}
