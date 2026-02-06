"use client";

import { useEffect, RefObject } from "react";

export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  selector: string,
  staggerMs: number = 120
) {
  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = section.querySelectorAll(selector);
            items.forEach((item, i) => {
              const el = item as HTMLElement;
              el.style.animationDelay = `${i * staggerMs}ms`;
              el.classList.add("animate-fade-in-up");
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [ref, selector, staggerMs]);
}

export function useCountUp(
  ref: RefObject<HTMLElement | null>,
  selector: string
) {
  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = section.querySelectorAll(selector);
            items.forEach((item) => {
              const el = item as HTMLElement;
              const target = el.dataset.target || "0";
              const suffix = target.replace(/[0-9]/g, "");
              const num = parseInt(target.replace(/[^0-9]/g, ""));
              let current = 0;
              const duration = 1200;
              const step = num / (duration / 16);
              const timer = setInterval(() => {
                current += step;
                if (current >= num) {
                  current = num;
                  clearInterval(timer);
                }
                el.textContent = Math.floor(current) + suffix;
              }, 16);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [ref, selector]);
}
