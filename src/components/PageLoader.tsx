"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

/**
 * Fast, sharp page loader. ~2s total.
 * Dot snaps → NIMBUS chars stagger up → hold → blade strike → split →
 * FORMA STUDIO → overlay lifts. No gimmicks, pure confidence.
 */
export default function PageLoader() {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const topHalfRef = useRef<HTMLSpanElement>(null);
  const bottomHalfRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const dotFlareRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sessionStorage.getItem("nfs-intro-v9")) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;

    const overlay = overlayRef.current;
    const word = wordRef.current;
    const topHalf = topHalfRef.current;
    const bottomHalf = bottomHalfRef.current;
    const line = lineRef.current;
    const sub = subRef.current;
    const dot = dotRef.current;
    const dotFlare = dotFlareRef.current;
    const flash = flashRef.current;

    if (!overlay || !word || !topHalf || !bottomHalf || !line || !sub || !dot || !dotFlare || !flash)
      return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      sessionStorage.setItem("nfs-intro-v9", "1");
      setVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const split = new SplitType(word, { types: "chars" });
    const wordH = word.getBoundingClientRect().height;
    const splitDist = Math.max(wordH * 0.32, 24);

    // Initial states
    gsap.set(dot, { scale: 0, autoAlpha: 0 });
    gsap.set(split.chars || [], { y: "100%", autoAlpha: 0 });
    gsap.set(topHalf, { autoAlpha: 0 });
    gsap.set(bottomHalf, { autoAlpha: 0 });
    gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(flash, { autoAlpha: 0 });
    gsap.set(dotFlare, { autoAlpha: 0 });
    gsap.set(sub, { autoAlpha: 0, xPercent: -50, yPercent: -50, y: 8, letterSpacing: "0px" });

    // Wrap chars in overflow-hidden spans
    split.chars?.forEach((char) => {
      const wrapper = document.createElement("span");
      wrapper.style.display = "inline-block";
      wrapper.style.overflow = "hidden";
      wrapper.style.verticalAlign = "top";
      char.parentNode?.insertBefore(wrapper, char);
      wrapper.appendChild(char);
    });

    const onDone = () => {
      document.body.style.overflow = "";
      sessionStorage.setItem("nfs-intro-v9", "1");
      setVisible(false);
    };

    const tl = gsap.timeline({ defaults: { force3D: true } });

    // 1 ▸ Dot snaps in — fast, decisive
    tl.to(dot, {
      scale: 1,
      autoAlpha: 1,
      duration: 0.15,
      ease: "back.out(3)",
    }, 0.2);

    // 2 ▸ NIMBUS chars slide up from below baseline
    tl.to(split.chars || [], {
      y: "0%",
      autoAlpha: 1,
      duration: 0.4,
      stagger: 0.035,
      ease: "power3.out",
    }, 0.35);

    // 3 ▸ Blade draws across center
    tl.to(line, {
      scaleX: 1,
      duration: 0.25,
      ease: "power2.inOut",
    }, "-=0.1");

    // ── STRIKE ──────────────────────────────────────

    tl.call(() => {
      gsap.set(word, { visibility: "hidden" });
      gsap.set([topHalf, bottomHalf], { autoAlpha: 1 });
    });

    tl.addLabel("strike");

    // Flash
    tl.to(flash, { autoAlpha: 1, duration: 0.05, ease: "power4.in" }, "strike");
    tl.to(flash, { autoAlpha: 0, duration: 0.25, ease: "power2.out" }, "strike+=0.05");

    // Dot flare
    tl.to(dotFlare, { autoAlpha: 1, duration: 0.05, ease: "power4.in" }, "strike");
    tl.to(dotFlare, { autoAlpha: 0, duration: 0.4, ease: "power2.out" }, "strike+=0.05");

    // Dot pulse
    tl.to(dot, { scale: 1.5, duration: 0.05, ease: "power4.in" }, "strike");
    tl.to(dot, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.4)" }, "strike+=0.05");

    // Halves split
    tl.to(topHalf, { y: -splitDist, duration: 0.3, ease: "power3.inOut" }, "strike");
    tl.to(bottomHalf, { y: splitDist, duration: 0.3, ease: "power3.inOut" }, "strike");

    // Blade fades
    tl.to(line, { autoAlpha: 0, duration: 0.15 }, "strike+=0.06");

    // Halves dim
    tl.to([topHalf, bottomHalf], { autoAlpha: 0.3, duration: 0.25 }, "strike+=0.12");

    // 4 ▸ FORMA STUDIO — rises with letter-spacing expanding
    tl.to(sub, {
      autoAlpha: 1,
      y: 0,
      letterSpacing: "5.5px",
      duration: 0.3,
      ease: "power2.out",
    }, "strike+=0.18");

    // 5 ▸ Overlay lifts — fast, decisive exit
    tl.to(overlay, {
      yPercent: -100,
      duration: 0.6,
      ease: "expo.inOut",
      onComplete: onDone,
    }, "+=0.3");

    return () => {
      split.revert();
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  const wordmarkStyle: React.CSSProperties = {
    fontSize: "clamp(54px, 9.5vw, 136px)",
    letterSpacing: "0.13em",
    lineHeight: 1,
    display: "block",
    color: "#FFFFFF",
    fontWeight: 400,
    willChange: "transform, opacity",
  };

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-200 flex items-center justify-center"
      style={{ backgroundColor: "#0A0A0F", willChange: "transform" }}
    >
      {/* Impact flash */}
      <div
        ref={flashRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(124,92,252,0.3) 0%, rgba(167,139,250,0.1) 40%, transparent 70%)",
          willChange: "opacity",
        }}
      />

      <div
        className="flex flex-col items-center"
        style={{ gap: "clamp(8px, 1.2vh, 14px)" }}
      >
        {/* Violet dot */}
        <div
          className="relative"
          style={{
            width: "clamp(8px, 0.65vw, 10px)",
            height: "clamp(8px, 0.65vw, 10px)",
          }}
        >
          <div
            ref={dotRef}
            className="rounded-full w-full h-full"
            style={{
              background: "#7C5CFC",
              boxShadow:
                "0 0 14px 5px rgba(124,92,252,0.45), 0 0 32px 12px rgba(124,92,252,0.18)",
              willChange: "transform, opacity",
            }}
          />
          <div
            ref={dotFlareRef}
            className="absolute inset-0 rounded-full"
            style={{
              background: "#FFFFFF",
              boxShadow:
                "0 0 20px 8px rgba(255,255,255,0.5), 0 0 40px 16px rgba(124,92,252,0.3)",
              willChange: "opacity",
            }}
          />
        </div>

        {/* NIMBUS */}
        <div className="relative">
          <span ref={wordRef} className="font-display select-none" style={wordmarkStyle}>
            NIMBUS
          </span>

          <span
            ref={topHalfRef}
            className="font-display select-none absolute inset-0"
            style={{ ...wordmarkStyle, clipPath: "inset(0 0 50% 0)", opacity: 0 }}
          >
            NIMBUS
          </span>

          <span
            ref={bottomHalfRef}
            className="font-display select-none absolute inset-0"
            style={{ ...wordmarkStyle, clipPath: "inset(50% 0 0 0)", opacity: 0 }}
          >
            NIMBUS
          </span>

          <div
            ref={lineRef}
            className="absolute left-0 right-0"
            style={{
              top: "50%",
              transform: "translateY(-50%)",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent 0%, #7C5CFC 25%, #A78BFA 60%, transparent 100%)",
              willChange: "transform, opacity",
            }}
          />

          <span
            ref={subRef}
            className="font-body select-none absolute left-1/2"
            style={{
              top: "50%",
              fontSize: "clamp(10px, 1.1vw, 14px)",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "rgba(167,139,250,0.6)",
              whiteSpace: "nowrap",
              willChange: "transform, opacity",
            }}
          >
            FORMA STUDIO
          </span>
        </div>
      </div>
    </div>
  );
}
