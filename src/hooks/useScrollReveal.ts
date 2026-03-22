"use client";

import { useEffect, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  selector: string,
  staggerMs: number = 120
) {
  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const items = section.querySelectorAll(selector);
      if (!items.length) return;

      if (prefersReducedMotion) {
        // Instant reveal for reduced motion
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(items, { opacity: 0, y: 40 });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: staggerMs / 1000,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [ref, selector, staggerMs]);
}

export function useCountUp(
  ref: RefObject<HTMLElement | null>,
  selector: string
) {
  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const items = section.querySelectorAll(selector);
      if (!items.length) return;

      items.forEach((item) => {
        const el = item as HTMLElement;
        const target = el.dataset.target || "0";
        const suffix = target.replace(/[0-9]/g, "");
        const num = parseInt(target.replace(/[^0-9]/g, ""));
        const obj = { val: 0 };

        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: num,
              duration: 1.2,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = Math.floor(obj.val) + suffix;
              },
            });
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, [ref, selector]);
}
