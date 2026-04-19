"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

export default function PageLoader() {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const tintRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const dotFlareRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const topHalfRef = useRef<HTMLSpanElement>(null);
  const bottomHalfRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const curtain1Ref = useRef<HTMLDivElement>(null);
  const curtain2Ref = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!sessionStorage.getItem("nfs-intro-v7")) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;

    const overlay = overlayRef.current;
    const flash = flashRef.current;
    const tint = tintRef.current;
    const dot = dotRef.current;
    const dotFlare = dotFlareRef.current;
    const word = wordRef.current;
    const topHalf = topHalfRef.current;
    const bottomHalf = bottomHalfRef.current;
    const line = lineRef.current;
    const sub = subRef.current;
    const counter = counterRef.current;
    const curtain1 = curtain1Ref.current;
    const curtain2 = curtain2Ref.current;
    const tagline = taglineRef.current;
    if (
      !overlay || !flash || !tint || !dot || !dotFlare ||
      !word || !topHalf || !bottomHalf || !line || !sub ||
      !counter || !curtain1 || !curtain2 || !tagline
    ) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      sessionStorage.setItem("nfs-intro-v7", "1");
      setVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const split = new SplitType(word, { types: "chars" });
    const wordH = word.getBoundingClientRect().height;
    const splitDist = Math.max(wordH * 0.32, 24);

    // Initial states
    gsap.set(dot, { scale: 0, opacity: 0 });
    gsap.set(split.chars || [], { opacity: 0, y: 20 });
    gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(topHalf, { opacity: 0 });
    gsap.set(bottomHalf, { opacity: 0 });
    gsap.set(flash, { opacity: 0 });
    gsap.set(tint, { opacity: 0 });
    gsap.set(dotFlare, { opacity: 0 });
    gsap.set(sub, { opacity: 0, xPercent: -50, yPercent: -50, y: 10 });
    gsap.set(counter, { opacity: 0 });
    gsap.set(tagline, { opacity: 0, y: 10 });
    gsap.set(curtain1, { yPercent: 0 });
    gsap.set(curtain2, { yPercent: 0 });

    const onDone = () => {
      document.body.style.overflow = "";
      sessionStorage.setItem("nfs-intro-v7", "1");
      setVisible(false);
    };

    const tl = gsap.timeline({ defaults: { force3D: true } });

    // 0 ▸ Counter fades in and starts counting
    tl.to(counter, { opacity: 0.4, duration: 0.3 });

    // Counter counts from 00 to 100 while the rest plays
    const counterObj = { val: 0 };
    tl.to(counterObj, {
      val: 100,
      duration: 2.2,
      ease: "power2.in",
      onUpdate: () => {
        counter.textContent = String(Math.floor(counterObj.val)).padStart(2, "0");
      },
    }, "<");

    // 1 ▸ Violet dot — snaps in
    tl.to(dot, {
      scale: 1,
      opacity: 1,
      duration: 0.18,
      ease: "back.out(3.5)",
    }, 0.15);

    // 2 ▸ NIMBUS chars — rise with stagger
    tl.to(
      split.chars || [],
      {
        opacity: 1,
        y: 0,
        duration: 0.35,
        stagger: 0.03,
        ease: "power3.out",
      },
      "-=0.05"
    );

    // Tagline — "Built with intention." appears below
    tl.to(tagline, {
      opacity: 0.3,
      y: 0,
      duration: 0.4,
      ease: "power3.out",
    }, "-=0.15");

    // 3 ▸ Blade — draws left → right across NIMBUS center
    tl.to(
      line,
      { scaleX: 1, duration: 0.3, ease: "power2.inOut" },
      "-=0.1"
    );

    // ── 4 ▸ THE STRIKE — impact frame + split ──────────────────

    tl.call(() => {
      gsap.set(word, { visibility: "hidden" });
      gsap.set([topHalf, bottomHalf], { opacity: 1 });
    });

    tl.addLabel("strike");

    // Impact flash
    tl.to(flash, { opacity: 1, duration: 0.06, ease: "power4.in" }, "strike");
    tl.to(flash, { opacity: 0, duration: 0.3, ease: "power2.out" }, "strike+=0.06");

    // Dot flare
    tl.to(dotFlare, { opacity: 1, duration: 0.06, ease: "power4.in" }, "strike");
    tl.to(dotFlare, { opacity: 0, duration: 0.4, ease: "power2.out" }, "strike+=0.06");

    // Dot pulse
    tl.to(dot, { scale: 1.6, duration: 0.06, ease: "power4.in" }, "strike");
    tl.to(dot, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" }, "strike+=0.06");

    // Halves split
    tl.to(topHalf, { y: -splitDist, duration: 0.35, ease: "power3.inOut" }, "strike");
    tl.to(bottomHalf, { y: splitDist, duration: 0.35, ease: "power3.inOut" }, "strike");

    // Background tint
    tl.to(tint, { opacity: 1, duration: 0.4, ease: "power1.inOut" }, "strike");

    // Blade fades
    tl.to(line, { opacity: 0, duration: 0.2, ease: "power1.out" }, "strike+=0.08");

    // Halves dim
    tl.to([topHalf, bottomHalf], { opacity: 0.35, duration: 0.3, ease: "power2.out" }, "strike+=0.15");

    // Counter fades out at strike
    tl.to(counter, { opacity: 0, duration: 0.2 }, "strike+=0.1");

    // Tagline fades at strike
    tl.to(tagline, { opacity: 0, duration: 0.2 }, "strike+=0.05");

    // 5 ▸ FORMA STUDIO — rises into the gap
    tl.to(sub, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, "strike+=0.22");

    // ── 6 ▸ Multi-layer curtain exit ───────────────────────────

    // Curtain 1 (accent) lifts first
    tl.to(curtain1, {
      yPercent: -100,
      duration: 0.6,
      ease: "power3.inOut",
    }, "+=0.4");

    // Curtain 2 (base/overlay) lifts slightly behind
    tl.to(overlay, {
      yPercent: -100,
      duration: 0.7,
      ease: "expo.inOut",
      onComplete: onDone,
    }, "-=0.45");

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
    <>
      {/* Accent curtain — lifts first to reveal content */}
      <div
        ref={curtain1Ref}
        aria-hidden="true"
        className="fixed inset-0 z-[199] pointer-events-none"
        style={{
          background: "linear-gradient(180deg, var(--color-accent) 0%, #5B3FD4 100%)",
          willChange: "transform",
        }}
      />

      {/* Main overlay */}
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
            opacity: 0,
            willChange: "opacity",
          }}
        />

        {/* Background tint */}
        <div
          ref={tintRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: "#0F0D19",
            opacity: 0,
            willChange: "opacity",
          }}
        />

        {/* Counter — top right */}
        <span
          ref={counterRef}
          className="absolute top-8 right-12 font-body text-[13px] tracking-[3px] text-(--color-text-primary) max-md:right-6 max-md:top-6"
          style={{ opacity: 0, fontVariantNumeric: "tabular-nums" }}
        >
          00
        </span>

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
                opacity: 0,
                willChange: "opacity",
              }}
            />
          </div>

          {/* NIMBUS zone */}
          <div className="relative">
            <span
              ref={wordRef}
              className="font-display select-none"
              style={wordmarkStyle}
            >
              NIMBUS
            </span>

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

            {/* Blade line */}
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

            {/* FORMA STUDIO */}
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
                willChange: "transform, opacity",
              }}
            >
              FORMA STUDIO
            </span>
          </div>

          {/* Tagline — appears briefly before the strike */}
          <span
            ref={taglineRef}
            className="font-body text-[12px] tracking-[4px] text-(--color-text-muted) select-none"
            style={{ opacity: 0, willChange: "transform, opacity" }}
          >
            BUILT WITH INTENTION
          </span>
        </div>
      </div>
    </>
  );
}
