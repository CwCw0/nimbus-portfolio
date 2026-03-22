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
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;

    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    setShowOverlay(true);

    const tl = gsap.timeline({
      onComplete: () => setShowOverlay(false),
    });

    // Exit: content fades slightly
    tl.to(content, {
      opacity: 0.3,
      scale: 0.98,
      duration: 0.3,
      ease: "power2.in",
    });

    // Overlay: circle expands from center
    tl.fromTo(
      overlay,
      { clipPath: "circle(0% at 50% 50%)" },
      {
        clipPath: "circle(150% at 50% 50%)",
        duration: 0.8,
        ease: "power4.inOut",
      },
      "-=0.1"
    );

    // Enter: content fades back in
    tl.to(
      content,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      },
      "-=0.3"
    );

    // Hide overlay at the end
    tl.set(overlay, { clipPath: "circle(0% at 50% 50%)" });
  }, [pathname]);

  return (
    <>
      {/* Circular clip-path overlay */}
      {showOverlay && (
        <div
          ref={overlayRef}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            backgroundColor: "#0A0A0F",
            clipPath: "circle(0% at 50% 50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="rounded-full"
              style={{
                width: 10,
                height: 10,
                backgroundColor: "#7C5CFC",
              }}
            />
            <span
              className="font-body text-[var(--color-text-primary)]"
              style={{
                fontSize: 18,
                letterSpacing: 6,
              }}
            >
              NIMBUS
            </span>
          </div>
        </div>
      )}

      {/* Page content wrapper */}
      <div ref={contentRef}>{children}</div>
    </>
  );
}
