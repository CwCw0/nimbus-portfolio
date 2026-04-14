"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

// Height the strike bar expands to — must comfortably contain FORMA STUDIO text
const BAR_HEIGHT = 54;

export default function PageLoader() {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const dotRingRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const formaRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!sessionStorage.getItem("nfs-intro-v4")) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;

    const overlay = overlayRef.current;
    const dot = dotRef.current;
    const dotRing = dotRingRef.current;
    const word = wordRef.current;
    const bar = barRef.current;
    const forma = formaRef.current;
    if (!overlay || !dot || !dotRing || !word || !bar || !forma) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      sessionStorage.setItem("nfs-intro-v4", "1");
      setVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const split = new SplitType(word, { types: "chars" });

    // ── Initial states ──────────────────────────────────────────────────────
    gsap.set(dot, { scale: 0, opacity: 0 });
    gsap.set(dotRing, { scale: 0.3, opacity: 0 });
    gsap.set(split.chars || [], { opacity: 0, y: 22, filter: "blur(8px)" });
    gsap.set(bar, { scaleX: 0, height: 2, marginTop: -1 });
    gsap.set(forma, { opacity: 0 });

    const onDone = () => {
      document.body.style.overflow = "";
      sessionStorage.setItem("nfs-intro-v4", "1");
      setVisible(false);
    };

    const tl = gsap.timeline();

    // 1. Violet dot blooms in
    tl.to(dot, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "back.out(2.2)",
    });

    // 2. Ring expands outward — aura bloom
    tl.to(
      dotRing,
      {
        scale: 3.2,
        opacity: 0,
        duration: 0.85,
        ease: "power2.out",
      },
      "<0.05"
    );

    // 3. NIMBUS chars stagger in — blur clears as they rise
    tl.to(
      split.chars || [],
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.55,
        stagger: 0.045,
        ease: "power3.out",
      },
      "-=0.5"
    );

    // 4. Strike line draws left → right across NIMBUS
    tl.to(
      bar,
      {
        scaleX: 1,
        duration: 0.6,
        ease: "power2.inOut",
        transformOrigin: "left center",
      },
      "+=0.18"
    );

    // 5. Strike expands vertically — overflow:hidden reveals FORMA STUDIO
    tl.to(
      bar,
      {
        height: BAR_HEIGHT,
        marginTop: -(BAR_HEIGHT / 2),
        boxShadow:
          "0 0 40px 8px rgba(124,92,252,0.12), 0 0 80px 24px rgba(124,92,252,0.05)",
        duration: 0.52,
        ease: "power3.out",
      },
      "+=0.04"
    );

    // 6. FORMA STUDIO brightens in (was already visible, now pops)
    tl.to(
      forma,
      { opacity: 1, duration: 0.3, ease: "power2.out" },
      "-=0.25"
    );

    // 7. Colour exchange — NIMBUS blurs out, dot blooms away
    tl.to(
      split.chars || [],
      {
        opacity: 0,
        filter: "blur(6px)",
        y: -6,
        duration: 0.4,
        ease: "power2.in",
      },
      "+=0.2"
    );
    tl.to(
      dot,
      { scale: 1.9, opacity: 0, duration: 0.4, ease: "power2.in" },
      "<0.05"
    );

    // 8. Brief hold with FORMA STUDIO standing alone
    // (implicit — nothing added, ~0.35s gap)

    // 9. Retract: bar collapses vertically → FORMA STUDIO clips away
    tl.to(
      bar,
      {
        height: 2,
        marginTop: -1,
        boxShadow: "none",
        duration: 0.45,
        ease: "power3.in",
      },
      "+=0.35"
    );

    // 10. Line retracts right → left
    tl.to(
      bar,
      {
        scaleX: 0,
        duration: 0.45,
        ease: "power2.inOut",
        transformOrigin: "right center",
      },
      "+=0.04"
    );

    // 11. Overlay fades — page is revealed
    tl.to(
      overlay,
      {
        opacity: 0,
        duration: 0.6,
        ease: "power1.inOut",
        onComplete: onDone,
      },
      "-=0.2"
    );

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
      style={{ background: "#0A0A0F" }}
    >
      <div
        className="flex flex-col items-center"
        style={{ gap: "clamp(10px, 1.8vh, 18px)" }}
      >
        {/* Violet dot — logo mark, with aura ring */}
        <div className="relative flex items-center justify-center">
          {/* Expanding ring bloom */}
          <div
            ref={dotRingRef}
            className="absolute rounded-full"
            style={{
              width: "clamp(8px, 0.8vw, 11px)",
              height: "clamp(8px, 0.8vw, 11px)",
              background: "rgba(124,92,252,0.5)",
              pointerEvents: "none",
            }}
          />
          {/* Core dot */}
          <div
            ref={dotRef}
            className="rounded-full"
            style={{
              width: "clamp(8px, 0.8vw, 11px)",
              height: "clamp(8px, 0.8vw, 11px)",
              background: "#7C5CFC",
              boxShadow:
                "0 0 12px 4px rgba(124,92,252,0.35), 0 0 28px 10px rgba(124,92,252,0.12)",
            }}
          />
        </div>

        {/* Wordmark + expanding bar */}
        <div className="relative">
          <span
            ref={wordRef}
            className="font-display"
            style={{
              fontSize: "clamp(48px, 9vw, 128px)",
              letterSpacing: "0.15em",
              lineHeight: 1,
              display: "block",
              color: "#E8E4FF",
            }}
          >
            NIMBUS
          </span>

          {/*
            The bar: starts as a 2px violet line drawn left→right.
            Height expands to reveal FORMA STUDIO through overflow:hidden clip.
            Then retracts in reverse — cinematic bookend.
          */}
          <div
            ref={barRef}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "50%",
              height: 2,
              marginTop: -1,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(124,92,252,0.65) 20%, rgba(167,139,250,0.8) 50%, rgba(124,92,252,0.65) 80%, transparent 100%)",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transformOrigin: "left center",
            }}
          >
            {/* FORMA STUDIO — revealed as bar height grows */}
            <span
              ref={formaRef}
              className="font-body"
              style={{
                whiteSpace: "nowrap",
                fontSize: "clamp(9px, 0.95vw, 13px)",
                fontWeight: 700,
                letterSpacing: "5px",
                textTransform: "uppercase",
                color: "#F0ECFF",
                userSelect: "none",
                opacity: 0,
              }}
            >
              FORMA STUDIO
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
