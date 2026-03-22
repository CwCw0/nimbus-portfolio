"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

type CurtainState = "entering" | "exiting" | null;

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const [curtainState, setCurtainState] = useState<CurtainState>(null);
  const [contentEnter, setContentEnter] = useState(false);

  useEffect(() => {
    if (prevPathname.current === pathname) return;

    prevPathname.current = pathname;

    // Show curtain entering
    setCurtainState("entering");
    setContentEnter(false);

    // After 400ms, switch curtain to exiting
    const exitTimer = setTimeout(() => {
      setCurtainState("exiting");
      setContentEnter(true);
    }, 400);

    // After 800ms total, remove curtain entirely
    const removeTimer = setTimeout(() => {
      setCurtainState(null);
    }, 800);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [pathname]);

  return (
    <>
      {/* Page transition curtain overlay */}
      {curtainState && (
        <div
          className={`page-transition-curtain ${curtainState}`}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0A0A0F",
          }}
        >
          {/* Small Nimbus logo pulsing in center */}
          <div
            className="flex items-center gap-2"
            style={{
              animation: "pulse 0.8s ease-in-out infinite",
            }}
          >
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
      <div className={contentEnter ? "page-content-enter" : ""}>
        {children}
      </div>
    </>
  );
}
