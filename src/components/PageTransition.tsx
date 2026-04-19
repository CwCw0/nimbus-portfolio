"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showLayers, setShowLayers] = useState(false);

  useEffect(() => {
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;

    const layer1 = layer1Ref.current;
    const layer2 = layer2Ref.current;
    const content = contentRef.current;
    if (!layer1 || !layer2 || !content) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    setShowLayers(true);

    const tl = gsap.timeline({
      onComplete: () => setShowLayers(false),
    });

    // Content fades out
    tl.to(content, {
      autoAlpha: 0,
      scale: 0.98,
      duration: 0.15,
      ease: "power2.in",
    });

    // Layer 1 (dark) sweeps in first
    tl.fromTo(
      layer1,
      { xPercent: -100 },
      { xPercent: 0, duration: 0.35, ease: "power3.inOut" },
      "-=0.05"
    );

    // Layer 2 (accent) sweeps in slightly behind
    tl.fromTo(
      layer2,
      { xPercent: -100 },
      { xPercent: 0, duration: 0.35, ease: "power3.inOut" },
      "-=0.25"
    );

    // Hold briefly
    tl.to({}, { duration: 0.06 });

    // Layer 2 exits first
    tl.to(layer2, {
      xPercent: 100,
      duration: 0.3,
      ease: "power3.inOut",
    });

    // Layer 1 exits behind
    tl.to(
      layer1,
      { xPercent: 100, duration: 0.35, ease: "power3.inOut" },
      "-=0.2"
    );

    // Content fades back
    tl.to(
      content,
      { autoAlpha: 1, scale: 1, duration: 0.35, ease: "power2.out" },
      "-=0.2"
    );
  }, [pathname]);

  return (
    <>
      {showLayers && (
        <>
          {/* Layer 1 — deep dark */}
          <div
            ref={layer1Ref}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9997,
              background: "var(--color-bg-primary)",
              transform: "translateX(-100%)",
              willChange: "transform",
              pointerEvents: "none",
            }}
          />
          {/* Layer 2 — accent gradient */}
          <div
            ref={layer2Ref}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9998,
              background:
                "linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-light) 100%)",
              transform: "translateX(-100%)",
              willChange: "transform",
              pointerEvents: "none",
            }}
          />
        </>
      )}
      <div ref={contentRef}>{children}</div>
    </>
  );
}
