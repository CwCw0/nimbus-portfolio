"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import SplitType from "split-type";

/**
 * Minimal intro. ~1.5s total.
 * nmbs. bounces up letter by letter — the period lands last with a hop —
 * brief beat, overlay lifts. No slash, no gimmicks.
 */
export default function PageLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 769;
    // Brand intro belongs to the homepage. A buyer deep-linking a case study
    // gets the proof immediately, not a title card.
    if (pathname === "/" && !isMobile && !sessionStorage.getItem("nfs-intro-v11")) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;

    const overlay = overlayRef.current;
    const word = wordRef.current;
    if (!overlay || !word) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      sessionStorage.setItem("nfs-intro-v11", "1");
      setVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const split = new SplitType(word, { types: "chars" });
    const chars = split.chars || [];
    const dot = chars[chars.length - 1];
    const letters = chars.slice(0, -1);

    // Wrap chars in overflow-hidden spans so they rise from below the baseline
    chars.forEach((char) => {
      const wrapper = document.createElement("span");
      wrapper.style.display = "inline-block";
      wrapper.style.overflow = "hidden";
      wrapper.style.verticalAlign = "top";
      char.parentNode?.insertBefore(wrapper, char);
      wrapper.appendChild(char);
    });

    gsap.set(chars, { y: "115%" });

    const onDone = () => {
      document.body.style.overflow = "";
      sessionStorage.setItem("nfs-intro-v11", "1");
      setVisible(false);
    };

    const tl = gsap.timeline({ defaults: { force3D: true } });

    // 1 ▸ letters bounce up from below the baseline
    tl.to(letters, {
      y: "0%",
      duration: 0.5,
      stagger: 0.06,
      ease: "back.out(1.8)",
    }, 0.15);

    // 2 ▸ the period lands last, harder bounce
    tl.to(dot, {
      y: "0%",
      duration: 0.55,
      ease: "back.out(3.2)",
    }, "-=0.25");

    // 3 ▸ ...and does a little hop. fun, then done.
    tl.to(dot, {
      y: "-14%",
      duration: 0.13,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    }, "+=0.1");

    // 4 ▸ overlay lifts — clean exit
    tl.to(overlay, {
      yPercent: -100,
      duration: 0.55,
      ease: "expo.inOut",
      onComplete: onDone,
    }, "+=0.2");

    return () => {
      split.revert();
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-200 flex items-center justify-center"
      style={{ backgroundColor: "#0A0A0A", willChange: "transform" }}
    >
      <span
        ref={wordRef}
        className="font-display select-none"
        style={{
          fontSize: "clamp(56px, 10vw, 150px)",
          fontWeight: 620,
          letterSpacing: "-0.015em",
          lineHeight: 1,
          color: "#F5F0E4",
          willChange: "transform",
        }}
      >
        nmbs.
      </span>
    </div>
  );
}
