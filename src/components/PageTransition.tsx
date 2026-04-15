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
  const flashRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;

    const flash = flashRef.current;
    const content = contentRef.current;
    if (!flash || !content) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    setShowFlash(true);

    const tl = gsap.timeline({
      onComplete: () => setShowFlash(false),
    });

    // Content fades out quickly
    tl.to(content, {
      opacity: 0,
      duration: 0.15,
      ease: "power2.in",
    });

    // Flash wipe — accent color sweeps across
    tl.fromTo(
      flash,
      { xPercent: -100 },
      {
        xPercent: 0,
        duration: 0.3,
        ease: "power3.inOut",
      },
      "-=0.05"
    );

    // Flash exits the other side
    tl.to(flash, {
      xPercent: 100,
      duration: 0.3,
      ease: "power3.inOut",
    }, "+=0.06");

    // Content fades back in
    tl.to(
      content,
      {
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      },
      "-=0.2"
    );
  }, [pathname]);

  return (
    <>
      {showFlash && (
        <div
          ref={flashRef}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            background:
              "linear-gradient(90deg, var(--color-accent) 0%, var(--color-accent-light) 50%, var(--color-accent) 100%)",
            transform: "translateX(-100%)",
            willChange: "transform",
            pointerEvents: "none",
          }}
        />
      )}
      <div ref={contentRef}>{children}</div>
    </>
  );
}
