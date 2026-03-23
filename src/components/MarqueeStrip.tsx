"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MarqueeStrip() {
  const words = ["DESIGN", "DEVELOP", "DEPLOY", "AUTOMATE", "SCALE"];
  const containerRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const tracks = el.querySelectorAll(".marquee-skew-track");

    const ctx = gsap.context(() => {
      // Scroll-velocity skew only (no animationDuration mutation — causes layout thrash)
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const skew = gsap.utils.clamp(-5, 5, self.getVelocity() / 300);
          gsap.to(tracks, {
            skewX: skew,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex w-full flex-col gap-3 overflow-hidden py-12 max-md:py-6 max-md:gap-1"
      style={{
        background: "linear-gradient(180deg, #7C5CFC08 0%, transparent 50%, #7C5CFC05 100%)",
      }}
    >
      {/* Top row — filled text, scrolls left */}
      <div
        ref={track1Ref}
        className="marquee-track marquee-skew-track flex items-center gap-16 whitespace-nowrap max-md:gap-8"
      >
        {[...words, ...words, ...words, ...words].map((word, i) => (
          <div key={`filled-${i}`} className="flex items-center gap-16 max-md:gap-8">
            <span
              className="font-display text-[var(--color-accent)] opacity-20 max-md:text-[32px] max-md:tracking-[4px]"
              style={{
                fontSize: "clamp(48px, 5.5vw, 90px)",
                letterSpacing: "0.12em",
              }}
            >
              {word}
            </span>
            <span className="text-[var(--color-accent)] opacity-20 font-body text-xs">|</span>
          </div>
        ))}
      </div>

      {/* Bottom row — outlined/stroke text, scrolls right */}
      <div
        ref={track2Ref}
        className="marquee-track-reverse marquee-skew-track flex items-center gap-16 whitespace-nowrap max-md:gap-8"
      >
        {[...words, ...words, ...words, ...words].map((word, i) => (
          <div key={`outlined-${i}`} className="flex items-center gap-16 max-md:gap-8">
            <span
              className="font-display max-md:text-[32px] max-md:tracking-[4px]"
              style={{
                fontSize: "clamp(48px, 5.5vw, 90px)",
                letterSpacing: "0.12em",
                color: "transparent",
                WebkitTextStroke: "1px var(--color-accent)",
                opacity: 0.12,
              }}
            >
              {word}
            </span>
            <span className="text-[var(--color-accent)] opacity-15 font-body text-xs">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
