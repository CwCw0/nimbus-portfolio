"use client";

/**
 * ScrollVelocity — Adds scroll-speed-based distortion to the page.
 *
 * Attaches to elements with [data-velocity] attribute and applies
 * skewY proportional to scroll speed. The page feels like it has
 * physics: scroll fast and things stretch, slow down and they settle.
 *
 * Mount once in the page layout. Affects all [data-velocity] elements.
 * Optional data-velocity-strength="0.5" to control intensity per element.
 */

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollVelocity() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 769;
    if (isMobile) return;

    // Track scroll velocity globally
    let currentSkew = 0;

    const velocityTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        // Clamp velocity to a reasonable skew range (-4 to 4 degrees)
        const targetSkew = gsap.utils.clamp(-4, 4, velocity / 400);

        // Smooth interpolation toward target
        currentSkew += (targetSkew - currentSkew) * 0.15;

        // Apply to all velocity-aware elements
        const elements = document.querySelectorAll("[data-velocity]");
        elements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          const strength = parseFloat(htmlEl.dataset.velocityStrength || "1");
          const skew = currentSkew * strength;

          gsap.set(htmlEl, {
            skewY: skew,
            force3D: true,
          });
        });
      },
    });

    // Also run a rAF loop to smoothly decay the skew when not scrolling
    let frame: number;
    const decay = () => {
      currentSkew *= 0.92; // Exponential decay
      if (Math.abs(currentSkew) > 0.01) {
        const elements = document.querySelectorAll("[data-velocity]");
        elements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          const strength = parseFloat(htmlEl.dataset.velocityStrength || "1");
          gsap.set(htmlEl, { skewY: currentSkew * strength, force3D: true });
        });
      }
      frame = requestAnimationFrame(decay);
    };
    frame = requestAnimationFrame(decay);

    return () => {
      velocityTrigger.kill();
      cancelAnimationFrame(frame);
      // Reset all elements
      document.querySelectorAll("[data-velocity]").forEach((el) => {
        gsap.set(el, { skewY: 0 });
      });
    };
  }, []);

  return null;
}
