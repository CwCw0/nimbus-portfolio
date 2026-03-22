"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  const stableOnComplete = useCallback(onComplete, [onComplete]);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const container = containerRef.current;
    const counter = counterRef.current;
    const progress = progressRef.current;
    const brand = brandRef.current;

    if (!container || !counter || !progress || !brand) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Show NIMBUS for 0.5s then instant cut
      gsap.set(counter, { display: "none" });
      gsap.set(progress, { display: "none" });
      gsap.set(brand, { opacity: 1 });
      const letters = brand.querySelectorAll(".brand-letter");
      gsap.set(letters, { opacity: 1, y: 0 });
      setTimeout(() => stableOnComplete(), 500);
      return;
    }

    const tl = gsap.timeline();
    const counterObj = { val: 0 };

    // Phase 1: Counter (0→100) with progress bar — 2s
    tl.to(counterObj, {
      val: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        const v = Math.floor(counterObj.val);
        counter.textContent = String(v).padStart(3, "0");
        progress.style.width = `${v}%`;
      },
    });

    // Phase 2: Counter fades, brand reveals — 0.8s
    tl.to(
      [counter, progress.parentElement],
      {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in",
      },
      "+=0.1"
    );

    tl.set(brand, { opacity: 1 });

    const letters = brand.querySelectorAll(".brand-letter");
    tl.from(letters, {
      y: 40,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: "power3.out",
    });

    tl.to({}, { duration: 0.3 }); // brief hold

    // Phase 3: Clip-path wipe exit — 0.8s
    tl.to(container, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.8,
      ease: "power4.inOut",
      onComplete: () => stableOnComplete(),
    });

    return () => {
      tl.kill();
    };
  }, [stableOnComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center"
      style={{
        backgroundColor: "#0A0A0F",
        zIndex: 9999,
        clipPath: "inset(0 0 0 0)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div
          style={{
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #7C5CFC08 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Counter */}
      <span
        ref={counterRef}
        className="font-display text-[120px] leading-none tracking-[-4px] text-[var(--color-text-primary)] max-md:text-[72px]"
        style={{ opacity: 0.15 }}
      >
        000
      </span>

      {/* Progress bar */}
      <div className="absolute bottom-[40%] left-1/2 -translate-x-1/2 w-[200px] h-px bg-[var(--color-border)] max-md:w-[140px]">
        <div
          ref={progressRef}
          className="h-full bg-[var(--color-accent)]"
          style={{ width: "0%" }}
        />
      </div>

      {/* Brand — hidden initially, revealed in phase 2 */}
      <div
        ref={brandRef}
        className="absolute flex items-center gap-3"
        style={{ opacity: 0 }}
      >
        <div
          className="brand-letter rounded-full"
          style={{
            width: 14,
            height: 14,
            backgroundColor: "#7C5CFC",
          }}
        />
        {"NIMBUS".split("").map((char, i) => (
          <span
            key={i}
            className="brand-letter font-body text-[var(--color-text-primary)]"
            style={{
              fontSize: 28,
              letterSpacing: 10,
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
