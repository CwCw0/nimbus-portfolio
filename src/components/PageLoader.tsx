"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

export default function PageLoader() {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
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
    const flash = flashRef.current;
    const dot = dotRef.current;
    const word = wordRef.current;
    const topHalf = topHalfRef.current;
    const bottomHalf = bottomHalfRef.current;
    const line = lineRef.current;
    const sub = subRef.current;
    if (
      !overlay ||
      !flash ||
      !dot ||
      !word ||
      !topHalf ||
      !bottomHalf ||
      !line ||
      !sub
    )
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
    gsap.set(flash, { opacity: 0 });
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

    // ── 4 ▸ THE STRIKE — impact frame + split ───────────────────────────

    // Swap original for clones (instant)
    tl.call(() => {
      gsap.set(word, { visibility: "hidden" });
      gsap.set([topHalf, bottomHalf], { opacity: 1 });
    });

    tl.addLabel("strike");

    // Impact flash — violet radial burst from center
    tl.to(
      flash,
      { opacity: 1, duration: 0.06, ease: "power4.in" },
      "strike"
    );
    tl.to(
      flash,
      { opacity: 0, duration: 0.25, ease: "power2.out" },
      "strike+=0.06"
    );

    // Dot flares white-hot at impact, then fades back to violet
    tl.to(
      dot,
      { scale: 1.5, background: "#FFFFFF", duration: 0.06, ease: "power4.in" },
      "strike"
    );
    tl.to(
      dot,
      { scale: 1, background: "#7C5CFC", duration: 0.4, ease: "power2.out" },
      "strike+=0.06"
    );

    // Top half slides up
    tl.to(
      topHalf,
      { y: -splitDist, duration: 0.32, ease: "power3.inOut" },
      "strike"
    );

    // Bottom half slides down
    tl.to(
      bottomHalf,
      { y: splitDist, duration: 0.32, ease: "power3.inOut" },
      "strike"
    );

    // Background shifts to violet-tinged dark — aftermath tone
    tl.to(
      overlay,
      { backgroundColor: "#0F0D19", duration: 0.4, ease: "power1.inOut" },
      "strike"
    );

    // Blade fades out — clears the way
    tl.to(
      line,
      { opacity: 0, duration: 0.2, ease: "power1.out" },
      "strike+=0.08"
    );

    // NIMBUS halves dim — aftermath, FORMA STUDIO becomes focal
    tl.to(
      [topHalf, bottomHalf],
      { opacity: 0.4, duration: 0.3, ease: "power2.out" },
      "strike+=0.15"
    );

    // 5 ▸ FORMA STUDIO — rises into the gap
    tl.to(
      sub,
      { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
      "strike+=0.22"
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
      style={{ backgroundColor: "#0A0A0F" }}
    >
      {/* Impact flash — radial violet burst at strike moment */}
      <div
        ref={flashRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(124,92,252,0.25) 0%, rgba(167,139,250,0.08) 40%, transparent 70%)",
          opacity: 0,
        }}
      />

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

          {/* Blade line — vertical center of NIMBUS, draws then fades */}
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
