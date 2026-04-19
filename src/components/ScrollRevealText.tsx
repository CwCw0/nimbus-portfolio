"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Full-viewport section where each word transitions from dim to bright
 * as the user scrolls through it — like reading through fog.
 */
export default function ScrollRevealText({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || wordsRef.current.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      wordsRef.current.forEach((w) => {
        w.style.opacity = "1";
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Each word lights up based on scroll progress through the section
      wordsRef.current.forEach((word, i) => {
        gsap.fromTo(
          word,
          { opacity: 0.12 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: () =>
                `top+=${(i / wordsRef.current.length) * 70}% 60%`,
              end: () =>
                `top+=${((i + 1) / wordsRef.current.length) * 70 + 10}% 40%`,
              scrub: true,
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const words = text.split(" ");

  return (
    <div
      ref={containerRef}
      className="relative flex w-full items-center justify-center px-16 py-40 md:py-60 max-md:px-6"
    >
      <p
        className="max-w-225 text-center font-display leading-[1.35] text-(--color-text-primary)"
        style={{ fontSize: "clamp(24px, 3.5vw, 48px)" }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) wordsRef.current[i] = el;
            }}
            className="inline-block mr-[0.3em]"
            style={{ opacity: 0.12, willChange: "opacity" }}
          >
            {word}
          </span>
        ))}
      </p>
    </div>
  );
}
