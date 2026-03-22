"use client";

import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 600);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 900);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        exiting ? "loading-exit" : ""
      }`}
      style={{
        backgroundColor: "#0A0A0F",
        zIndex: 9999,
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div
          style={{
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #7C5CFC10 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Center content */}
      <div className="loading-breathe flex flex-col items-center gap-3 z-10">
        <div className="flex items-center gap-3">
          <div
            className="rounded-full"
            style={{
              width: 14,
              height: 14,
              backgroundColor: "#7C5CFC",
            }}
          />
          <span
            className="font-body text-[var(--color-text-primary)]"
            style={{
              fontSize: 28,
              letterSpacing: 10,
            }}
          >
            NIMBUS
          </span>
        </div>
      </div>
    </div>
  );
}
