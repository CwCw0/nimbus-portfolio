"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * "The Mist Parts" — Nimbus literally means cloud.
 * Dense fog layers drift across the screen, slowly part to reveal NIMBUS,
 * blade strike splits the word, FORMA STUDIO rises, clouds rush out.
 */
export default function PageLoader() {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const mistLayersRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const topHalfRef = useRef<HTMLSpanElement>(null);
  const bottomHalfRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const dotFlareRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!sessionStorage.getItem("nfs-intro-v8")) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;

    const overlay = overlayRef.current;
    const mistLayers = mistLayersRef.current;
    const word = wordRef.current;
    const topHalf = topHalfRef.current;
    const bottomHalf = bottomHalfRef.current;
    const line = lineRef.current;
    const sub = subRef.current;
    const dot = dotRef.current;
    const dotFlare = dotFlareRef.current;
    const flash = flashRef.current;
    const counter = counterRef.current;

    if (
      !overlay || !mistLayers || !word || !topHalf || !bottomHalf ||
      !line || !sub || !dot || !dotFlare || !flash || !counter
    ) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      sessionStorage.setItem("nfs-intro-v8", "1");
      setVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const wordH = word.getBoundingClientRect().height;
    const splitDist = Math.max(wordH * 0.32, 24);

    // Get all mist cloud layers
    const clouds = mistLayers.querySelectorAll<HTMLElement>(".mist-cloud");
    const leftClouds = mistLayers.querySelectorAll<HTMLElement>(".mist-left");
    const rightClouds = mistLayers.querySelectorAll<HTMLElement>(".mist-right");
    const wisps = mistLayers.querySelectorAll<HTMLElement>(".mist-wisp");

    // Initial states
    gsap.set(word, { autoAlpha: 0.6 }); // NIMBUS is there, hidden behind mist
    gsap.set(dot, { scale: 0, autoAlpha: 0 });
    gsap.set(topHalf, { autoAlpha: 0 });
    gsap.set(bottomHalf, { autoAlpha: 0 });
    gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(flash, { autoAlpha: 0 });
    gsap.set(dotFlare, { autoAlpha: 0 });
    gsap.set(sub, { autoAlpha: 0, xPercent: -50, yPercent: -50, y: 10 });
    gsap.set(counter, { autoAlpha: 0 });

    // Clouds start drifting slowly
    clouds.forEach((cloud, i) => {
      gsap.set(cloud, { x: (i % 2 === 0 ? -1 : 1) * (20 + i * 10) });
      gsap.to(cloud, {
        x: `+=${(i % 2 === 0 ? 1 : -1) * 30}`,
        duration: 4 + i * 0.5,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    });

    const onDone = () => {
      document.body.style.overflow = "";
      sessionStorage.setItem("nfs-intro-v8", "1");
      setVisible(false);
    };

    const tl = gsap.timeline({ defaults: { force3D: true } });

    // 0 ▸ Counter fades in through the mist
    tl.to(counter, { autoAlpha: 0.3, duration: 0.4 });

    const counterObj = { val: 0 };
    tl.to(counterObj, {
      val: 100,
      duration: 2.8,
      ease: "power2.in",
      onUpdate: () => {
        counter.textContent = String(Math.floor(counterObj.val)).padStart(2, "0");
      },
    }, "<");

    // 1 ▸ Dot appears through the fog
    tl.to(dot, {
      scale: 1,
      autoAlpha: 1,
      duration: 0.3,
      ease: "back.out(2)",
    }, 0.3);

    // 2 ▸ THE MIST PARTS — clouds drift apart, revealing NIMBUS underneath
    // Left clouds drift left
    tl.to(leftClouds, {
      xPercent: -120,
      autoAlpha: 0,
      duration: 1.8,
      stagger: 0.1,
      ease: "power2.inOut",
    }, 0.8);

    // Right clouds drift right
    tl.to(rightClouds, {
      xPercent: 120,
      autoAlpha: 0,
      duration: 1.8,
      stagger: 0.1,
      ease: "power2.inOut",
    }, 0.8);

    // NIMBUS becomes fully visible as clouds clear
    tl.to(word, {
      autoAlpha: 1,
      duration: 1.2,
      ease: "power2.out",
    }, 1.2);

    // Counter fades
    tl.to(counter, { autoAlpha: 0, duration: 0.3 }, 2.2);

    // 3 ▸ Last wisps sweep across the text and dissipate
    tl.to(wisps, {
      xPercent: 200,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power2.in",
    }, 2.0);

    // 4 ▸ Blade draws across — clean line
    tl.to(line, {
      scaleX: 1,
      duration: 0.3,
      ease: "power2.inOut",
    }, 2.8);

    // ── 5 ▸ STRIKE ─────────────────────────────────────

    tl.call(() => {
      gsap.set(word, { visibility: "hidden" });
      gsap.set([topHalf, bottomHalf], { autoAlpha: 1 });
    });

    tl.addLabel("strike");

    // Impact flash
    tl.to(flash, { autoAlpha: 1, duration: 0.06, ease: "power4.in" }, "strike");
    tl.to(flash, { autoAlpha: 0, duration: 0.3, ease: "power2.out" }, "strike+=0.06");

    // Dot flare
    tl.to(dotFlare, { autoAlpha: 1, duration: 0.06, ease: "power4.in" }, "strike");
    tl.to(dotFlare, { autoAlpha: 0, duration: 0.5, ease: "power2.out" }, "strike+=0.06");

    // Dot pulse
    tl.to(dot, { scale: 1.6, duration: 0.06, ease: "power4.in" }, "strike");
    tl.to(dot, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" }, "strike+=0.06");

    // Halves split
    tl.to(topHalf, { y: -splitDist, duration: 0.35, ease: "power3.inOut" }, "strike");
    tl.to(bottomHalf, { y: splitDist, duration: 0.35, ease: "power3.inOut" }, "strike");

    // Blade fades
    tl.to(line, { autoAlpha: 0, duration: 0.2, ease: "power1.out" }, "strike+=0.08");

    // Halves dim
    tl.to([topHalf, bottomHalf], { autoAlpha: 0.35, duration: 0.3, ease: "power2.out" }, "strike+=0.15");

    // 6 ▸ FORMA STUDIO rises into the gap
    tl.to(sub, {
      autoAlpha: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    }, "strike+=0.22");

    // ── 7 ▸ EXIT — clouds rush outward, overlay lifts ──

    // Brief hold
    tl.to({}, { duration: 0.4 });

    // Overlay lifts with cinematic ease
    tl.to(overlay, {
      yPercent: -100,
      duration: 0.8,
      ease: "expo.inOut",
      onComplete: onDone,
    });

    return () => {
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

      {/* ═══ MIST / CLOUD LAYERS ═══ */}
      <div ref={mistLayersRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep background clouds — slow, large, faint */}
        <div
          className="mist-cloud mist-left absolute"
          style={{
            width: "120%", height: "100%", left: "-10%", top: "0",
            background: "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(124,92,252,0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="mist-cloud mist-right absolute"
          style={{
            width: "120%", height: "100%", right: "-10%", top: "0",
            background: "radial-gradient(ellipse 70% 50% at 70% 45%, rgba(94,234,212,0.04) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        {/* Mid-layer clouds — the main fog */}
        <div
          className="mist-cloud mist-left absolute"
          style={{
            width: "70%", height: "80%", left: "-5%", top: "10%",
            background: "radial-gradient(ellipse at 40% 50%, rgba(200,200,220,0.12) 0%, rgba(124,92,252,0.04) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="mist-cloud mist-right absolute"
          style={{
            width: "70%", height: "80%", right: "-5%", top: "10%",
            background: "radial-gradient(ellipse at 60% 50%, rgba(200,200,220,0.12) 0%, rgba(124,92,252,0.04) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Dense center fog — covers NIMBUS directly */}
        <div
          className="mist-cloud mist-left absolute"
          style={{
            width: "55%", height: "50%", left: "0%", top: "25%",
            background: "radial-gradient(ellipse at 60% 50%, rgba(180,180,200,0.18) 0%, rgba(124,92,252,0.06) 50%, transparent 80%)",
            filter: "blur(30px)",
          }}
        />
        <div
          className="mist-cloud mist-right absolute"
          style={{
            width: "55%", height: "50%", right: "0%", top: "25%",
            background: "radial-gradient(ellipse at 40% 50%, rgba(180,180,200,0.18) 0%, rgba(124,92,252,0.06) 50%, transparent 80%)",
            filter: "blur(30px)",
          }}
        />

        {/* Fine wisps — last to leave, sweep across text */}
        <div
          className="mist-wisp absolute"
          style={{
            width: "40%", height: "20%", left: "20%", top: "40%",
            background: "linear-gradient(90deg, transparent, rgba(200,200,220,0.1) 30%, rgba(200,200,220,0.06) 70%, transparent)",
            filter: "blur(20px)",
          }}
        />
        <div
          className="mist-wisp absolute"
          style={{
            width: "30%", height: "15%", left: "35%", top: "45%",
            background: "linear-gradient(90deg, transparent, rgba(124,92,252,0.08) 40%, rgba(167,139,250,0.04) 70%, transparent)",
            filter: "blur(16px)",
          }}
        />
      </div>

      {/* Counter — top right, ghostly through the mist */}
      <span
        ref={counterRef}
        className="absolute top-8 right-12 font-body text-[13px] tracking-[3px] text-(--color-text-primary) max-md:right-6 max-md:top-6"
        style={{ opacity: 0, fontVariantNumeric: "tabular-nums" }}
      >
        00
      </span>

      {/* Center content */}
      <div
        className="relative z-10 flex flex-col items-center"
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
          {/* Original wordmark — hidden behind mist, revealed as clouds part */}
          <span
            ref={wordRef}
            className="font-display select-none"
            style={wordmarkStyle}
          >
            NIMBUS
          </span>

          {/* Top half */}
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

          {/* Bottom half */}
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
      </div>
    </div>
  );
}
