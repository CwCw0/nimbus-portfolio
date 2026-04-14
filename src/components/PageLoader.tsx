"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

// Height the strike bar expands to — must be enough to comfortably contain FORMA STUDIO text
const BAR_HEIGHT = 52;

export default function PageLoader() {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const formaRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!sessionStorage.getItem("nfs-intro-v2")) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;

    const overlay = overlayRef.current;
    const dot = dotRef.current;
    const word = wordRef.current;
    const bar = barRef.current;
    const forma = formaRef.current;
    if (!overlay || !dot || !word || !bar || !forma) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      sessionStorage.setItem("nfs-intro-v2", "1");
      setVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const split = new SplitType(word, { types: "chars" });

    // Initial states
    gsap.set(dot, { scale: 0, opacity: 0 });
    gsap.set(split.chars || [], { opacity: 0, y: 28 });
    // Bar: starts as invisible 2px line (scaleX: 0 so it draws left→right)
    // FORMA STUDIO is already opacity:1 inside — overflow:hidden clips it until bar expands
    gsap.set(bar, { scaleX: 0, height: 2, marginTop: -1 });

    const onDone = () => {
      document.body.style.overflow = "";
      sessionStorage.setItem("nfs-intro-v2", "1");
      setVisible(false);
    };

    const tl = gsap.timeline();

    // 1. Violet dot pulses in
    tl.to(dot, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2.5)" });

    // 2. NIMBUS chars stagger up
    tl.to(
      split.chars || [],
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: "power3.out" },
      "+=0.06"
    );

    // 3. Strike line draws left → right across NIMBUS (bar at 2px, scaleX 0→1)
    tl.to(
      bar,
      { scaleX: 1, duration: 0.55, ease: "power2.inOut", transformOrigin: "left center" },
      "+=0.2"
    );

    // 4. Strike expands vertically — the line grows into a bar
    //    overflow:hidden reveals FORMA STUDIO naturally as height grows
    tl.to(
      bar,
      {
        height: BAR_HEIGHT,
        marginTop: -(BAR_HEIGHT / 2),
        duration: 0.5,
        ease: "power3.out",
      },
      "+=0.03"
    );

    // 5. Colour exchange: NIMBUS fades out (struck through, replaced), dot fades
    tl.to(
      split.chars || [],
      { opacity: 0, duration: 0.38, ease: "power2.in" },
      "+=0.12"
    );
    tl.to(dot, { opacity: 0, duration: 0.28 }, "<0.06");

    // 6. FORMA STUDIO stands alone in the bar — brief hold
    // (implicit hold, nothing added here)

    // 7. Fade out: bar fades → overlay fades → page reveals
    tl.to(bar, { opacity: 0, duration: 0.5, ease: "power2.in" }, "+=0.42");
    tl.to(
      overlay,
      { opacity: 0, duration: 0.55, ease: "power1.inOut", onComplete: onDone },
      "-=0.12"
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

        {/* Wordmark container — bar is absolutely positioned inside */}
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

          {/*
            The bar: starts as a 2px violet strikethrough line.
            scaleX draws it left→right, then height expands to reveal FORMA STUDIO.
            overflow:hidden clips the text — it emerges naturally as the bar grows.
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
                "linear-gradient(90deg, #5A3FD4 0%, #7C5CFC 35%, #A78BFA 50%, #7C5CFC 65%, #5A3FD4 100%)",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transformOrigin: "left center",
            }}
          >
            {/* FORMA STUDIO — always opaque, revealed by the bar's overflow clip */}
            <span
              ref={formaRef}
              className="font-body"
              style={{
                whiteSpace: "nowrap",
                fontSize: "clamp(9px, 1vw, 13px)",
                fontWeight: 700,
                letterSpacing: "5px",
                textTransform: "uppercase",
                color: "#EEEDF5",
                userSelect: "none",
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
