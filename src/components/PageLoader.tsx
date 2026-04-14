"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

export default function PageLoader() {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const topHalfRef = useRef<HTMLSpanElement>(null);
  const bottomHalfRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!sessionStorage.getItem("nfs-intro-v6")) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;

    const overlay = overlayRef.current;
    const dot = dotRef.current;
    const word = wordRef.current;
    const topHalf = topHalfRef.current;
    const bottomHalf = bottomHalfRef.current;
    const line = lineRef.current;
    const sub = subRef.current;
    if (!overlay || !dot || !word || !topHalf || !bottomHalf || !line || !sub)
      return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      sessionStorage.setItem("nfs-intro-v6", "1");
      setVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const split = new SplitType(word, { types: "chars" });

    // Responsive split distance — enough gap for FORMA STUDIO to breathe
    const wordH = word.getBoundingClientRect().height;
    const splitDist = Math.max(wordH * 0.32, 24);

    // ── Initial states ───────────────────────────────────────────────────
    gsap.set(dot, { scale: 0, opacity: 0 });
    gsap.set(split.chars || [], { opacity: 0, y: 20, filter: "blur(6px)" });
    gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(topHalf, { opacity: 0 });
    gsap.set(bottomHalf, { opacity: 0 });
    gsap.set(sub, { opacity: 0, xPercent: -50, yPercent: -50, y: 10 });

    const onDone = () => {
      document.body.style.overflow = "";
      sessionStorage.setItem("nfs-intro-v6", "1");
      setVisible(false);
    };

    const tl = gsap.timeline();

    // 1 ▸ Violet dot — snaps in with authority
    tl.to(dot, {
      scale: 1,
      opacity: 1,
      duration: 0.18,
      ease: "back.out(3.5)",
    });

    // 2 ▸ NIMBUS chars — rise and sharpen, tight stagger
    tl.to(
      split.chars || [],
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.3,
        stagger: 0.025,
        ease: "power3.out",
      },
      "-=0.05"
    );

    // 3 ▸ Blade — draws left → right across NIMBUS center
    tl.to(
      line,
      {
        scaleX: 1,
        duration: 0.25,
        ease: "power2.inOut",
      },
      "-=0.06"
    );

    // 4 ▸ THE STRIKE — swap original for clones, split apart
    tl.call(() => {
      gsap.set(word, { visibility: "hidden" });
      gsap.set([topHalf, bottomHalf], { opacity: 1 });
    });

    // Top half slides up
    tl.to(topHalf, {
      y: -splitDist,
      duration: 0.32,
      ease: "power3.inOut",
    });

    // Bottom half slides down (simultaneous)
    tl.to(
      bottomHalf,
      {
        y: splitDist,
        duration: 0.32,
        ease: "power3.inOut",
      },
      "<"
    );

    // Blade fades out as gap opens — clears the way for FORMA STUDIO
    tl.to(
      line,
      {
        opacity: 0,
        duration: 0.2,
        ease: "power1.out",
      },
      "<+=0.08"
    );

    // 5 ▸ FORMA STUDIO — rises into the gap
    tl.to(
      sub,
      {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: "power2.out",
      },
      "-=0.12"
    );

    // ── Hold: the strike stands ──────────────────────────────────────────

    // 6 ▸ Curtain lifts — everything exits upward together
    tl.to(
      overlay,
      {
        yPercent: -100,
        duration: 0.7,
        ease: "expo.inOut",
        onComplete: onDone,
      },
      "+=0.38"
    );

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
  };

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-200 flex items-center justify-center"
      style={{ background: "#0A0A0F" }}
    >
      <div
        className="flex flex-col items-center"
        style={{ gap: "clamp(8px, 1.2vh, 14px)" }}
      >
        {/* Violet dot — logomark */}
        <div
          ref={dotRef}
          className="rounded-full"
          style={{
            width: "clamp(8px, 0.65vw, 10px)",
            height: "clamp(8px, 0.65vw, 10px)",
            background: "#7C5CFC",
            boxShadow:
              "0 0 14px 5px rgba(124,92,252,0.45), 0 0 32px 12px rgba(124,92,252,0.18)",
          }}
        />

        {/* NIMBUS zone — original + split clones + blade + subtitle */}
        <div className="relative">
          {/* Original wordmark — SplitType target, hidden after the strike */}
          <span
            ref={wordRef}
            className="font-display select-none"
            style={wordmarkStyle}
          >
            NIMBUS
          </span>

          {/* Top half clone — clips to upper half, slides up */}
          <span
            ref={topHalfRef}
            className="font-display select-none absolute inset-0"
            style={{
              ...wordmarkStyle,
              clipPath: "inset(0 0 50% 0)",
              opacity: 0,
            }}
          >
            NIMBUS
          </span>

          {/* Bottom half clone — clips to lower half, slides down */}
          <span
            ref={bottomHalfRef}
            className="font-display select-none absolute inset-0"
            style={{
              ...wordmarkStyle,
              clipPath: "inset(50% 0 0 0)",
              opacity: 0,
            }}
          >
            NIMBUS
          </span>

          {/* Blade line — vertical center of NIMBUS, draws then stays */}
          <div
            ref={lineRef}
            className="absolute left-0 right-0"
            style={{
              top: "50%",
              transform: "translateY(-50%)",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent 0%, #7C5CFC 25%, #A78BFA 60%, transparent 100%)",
            }}
          />

          {/* FORMA STUDIO — positioned at NIMBUS center, rises into the split gap */}
          <span
            ref={subRef}
            className="font-body select-none absolute left-1/2"
            style={{
              top: "50%",
              fontSize: "clamp(10px, 1.1vw, 14px)",
              fontWeight: 600,
              letterSpacing: "5.5px",
              textTransform: "uppercase",
              color: "rgba(167,139,250,0.6)",
              whiteSpace: "nowrap",
            }}
          >
            FORMA STUDIO
          </span>
        </div>
      </div>
    </div>
  );
}
