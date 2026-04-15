"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function PullQuote({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    if (!container || !textEl) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const split = new SplitType(textEl, { types: "words" });

    gsap.set(split.words || [], { opacity: 0, y: 12 });

    gsap.to(split.words || [], {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.04,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        once: true,
      },
    });

    return () => {
      split.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex w-full flex-col items-center py-16 md:py-32 px-6"
    >
      <div
        className="mb-8 h-px w-20 bg-(--color-accent) opacity-30"
      />
      <p
        ref={textRef}
        className="max-w-[800px] text-center font-display italic leading-[1.3] text-(--color-text-secondary)"
        style={{ fontSize: "clamp(24px, 3.5vw, 48px)" }}
      >
        {text}
      </p>
    </div>
  );
}
