"use client";

import { useEffect, RefObject } from "react";
import { gsap } from "gsap";

export function useMagnetic(ref: RefObject<HTMLElement | null>, strength: number = 0.3) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Desktop only
    if (window.innerWidth < 769) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      // Only activate within proximity
      const distance = Math.sqrt(distX * distX + distY * distY);
      const threshold = Math.max(rect.width, rect.height) * 1.5;

      if (distance < threshold) {
        gsap.to(el, {
          x: distX * strength,
          y: distY * strength,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, strength]);
}
