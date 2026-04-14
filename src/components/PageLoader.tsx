"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

export default function PageLoader() {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const formaRef = useRef<HTMLSpanElement>(null);

  // Gate: only show once per session
  useEffect(() => {
    if (!sessionStorage.getItem("nfs-intro-seen")) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;

    const overlay = overlayRef.current;
    const dot = dotRef.current;
    const word = wordRef.current;
    const line = lineRef.current;
    const forma = formaRef.current;
    if (!overlay || !dot || !word || !line || !forma) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      sessionStorage.setItem("nfs-intro-seen", "1");
      setVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const split = new SplitType(word, { types: "chars" });
    gsap.set(dot, { scale: 0, opacity: 0 });
    gsap.set(split.chars || [], { opacity: 0, y: 28 });
    gsap.set(line, { scaleX: 0 });
    gsap.set(forma, { opacity: 0, y: 10 });

    const tl = gsap.timeline({
      onComplete: () => {
        // Hold, then curtain lifts upward revealing the page
        gsap.to(overlay, {
          yPercent: -100,
          duration: 0.9,
          ease: "power3.inOut",
          delay: 0.5,
          onComplete: () => {
            document.body.style.overflow = "";
            sessionStorage.setItem("nfs-intro-seen", "1");
            setVisible(false);
          },
        });
      },
    });

    // 1. Violet dot pulses in
    tl.to(dot, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2.5)" });

    // 2. NIMBUS chars stagger up
    tl.to(
      split.chars || [],
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.045, ease: "power3.out" },
      "+=0.08"
    );

    // 3. Strikethrough draws left → right
    tl.to(line, { scaleX: 1, duration: 0.65, ease: "power2.inOut" }, "+=0.2");

    // 4. Forma Studio rises in (overlaps line draw end)
    tl.to(
      forma,
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
      "-=0.3"
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
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "#0A0A0F" }}
    >
      <div className="flex flex-col items-center" style={{ gap: "clamp(10px, 1.8vh, 18px)" }}>
        {/* Violet dot — logo mark */}
        <div
          ref={dotRef}
          className="rounded-full"
          style={{
            width: "clamp(8px, 0.8vw, 11px)",
            height: "clamp(8px, 0.8vw, 11px)",
            background: "#7C5CFC",
            boxShadow: "0 0 28px 8px rgba(124,92,252,0.4)",
          }}
        />

        {/* NIMBUS wordmark */}
        <div className="relative">
          <span
            ref={wordRef}
            className="font-display"
            style={{
              fontSize: "clamp(48px, 9vw, 128px)",
              letterSpacing: "0.15em",
              lineHeight: 1,
              display: "block",
              color: "#EEEDF5",
            }}
          >
            NIMBUS
          </span>

          {/* Strikethrough — violet gradient */}
          <span
            ref={lineRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "50%",
              marginTop: "-1px",
              height: "2px",
              background:
                "linear-gradient(90deg, #7C5CFC 0%, #A78BFA 50%, #7C5CFC 100%)",
              opacity: 0.65,
              transformOrigin: "left center",
              transform: "scaleX(0)",
              pointerEvents: "none",
              filter: "blur(0.4px)",
            }}
          />
        </div>

        {/* Forma Studio */}
        <span
          ref={formaRef}
          className="font-body"
          style={{
            fontSize: "clamp(9px, 1vw, 14px)",
            letterSpacing: "0.45em",
            fontWeight: 600,
            textTransform: "uppercase",
            color: "#EEEDF5",
            opacity: 0,
          }}
        >
          Forma Studio
        </span>
      </div>
    </div>
  );
}
