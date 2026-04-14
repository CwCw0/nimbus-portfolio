"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

export default function PageLoader() {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!sessionStorage.getItem("nfs-intro-v5")) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;

    const overlay = overlayRef.current;
    const dot = dotRef.current;
    const word = wordRef.current;
    const line = lineRef.current;
    const sub = subRef.current;
    if (!overlay || !dot || !word || !line || !sub) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      sessionStorage.setItem("nfs-intro-v5", "1");
      setVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const split = new SplitType(word, { types: "chars" });

    // ── Initial states ─────────────────────────────────────────────────────
    gsap.set(dot,            { scale: 0, opacity: 0 });
    gsap.set(split.chars || [], { opacity: 0, y: 20, filter: "blur(6px)" });
    gsap.set(line,           { scaleX: 0, transformOrigin: "left center" });
    gsap.set(sub,            { opacity: 0, y: 6 });

    const onDone = () => {
      document.body.style.overflow = "";
      sessionStorage.setItem("nfs-intro-v5", "1");
      setVisible(false);
    };

    const tl = gsap.timeline();

    // 1. Violet dot — snaps in with authority
    tl.to(dot, {
      scale: 1,
      opacity: 1,
      duration: 0.18,
      ease: "back.out(3.5)",
    });

    // 2. NIMBUS chars — rise and sharpen, tight stagger
    tl.to(split.chars || [], {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.35,
      stagger: 0.025,
      ease: "power3.out",
    }, "-=0.05");

    // 3. Thin accent line — draws crisply left to right
    tl.to(line, {
      scaleX: 1,
      duration: 0.3,
      ease: "power2.inOut",
    }, "-=0.08");

    // 4. FORMA STUDIO — lifts in below the line
    tl.to(sub, {
      opacity: 1,
      y: 0,
      duration: 0.28,
      ease: "power2.out",
    }, "-=0.08");

    // ── Hold: brand stands alone ───────────────────────────────────────────

    // 5. Exit — curtain lifts up, revealing the page from below
    //    expo.inOut: starts measured, accelerates, lands decisively
    tl.to(overlay, {
      yPercent: -100,
      duration: 0.72,
      ease: "expo.inOut",
      onComplete: onDone,
    }, "+=0.52");

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
      className="fixed inset-0 z-[200] flex items-center justify-center"
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
            width:  "clamp(8px, 0.65vw, 10px)",
            height: "clamp(8px, 0.65vw, 10px)",
            background: "#7C5CFC",
            boxShadow: "0 0 14px 5px rgba(124,92,252,0.45), 0 0 32px 12px rgba(124,92,252,0.18)",
          }}
        />

        {/* NIMBUS wordmark */}
        <span
          ref={wordRef}
          className="font-display select-none"
          style={{
            fontSize: "clamp(54px, 9.5vw, 136px)",
            letterSpacing: "0.13em",
            lineHeight: 1,
            display: "block",
            color: "#FFFFFF",
            fontWeight: 400,
          }}
        >
          NIMBUS
        </span>

        {/* Accent line — 1px, violet gradient, draws left → right */}
        <div
          ref={lineRef}
          style={{
            width: "100%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, #7C5CFC 25%, #A78BFA 60%, transparent 100%)",
          }}
        />

        {/* Studio mark */}
        <span
          ref={subRef}
          className="font-body select-none"
          style={{
            fontSize: "clamp(7px, 0.78vw, 10px)",
            fontWeight: 600,
            letterSpacing: "4.5px",
            textTransform: "uppercase",
            color: "rgba(167,139,250,0.45)",
          }}
        >
          FORMA STUDIO
        </span>
      </div>
    </div>
  );
}
