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
    }, 2500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const orbitalDots = [0, 120, 240];

  const particles = [
    { size: 2, top: "12%", left: "18%", opacity: 0.3, delay: "0s" },
    { size: 3, top: "25%", left: "78%", opacity: 0.2, delay: "0.5s" },
    { size: 2, top: "68%", left: "85%", opacity: 0.25, delay: "1s" },
    { size: 4, top: "82%", left: "12%", opacity: 0.15, delay: "1.5s" },
    { size: 3, top: "45%", left: "92%", opacity: 0.2, delay: "2s" },
    { size: 2, top: "90%", left: "55%", opacity: 0.3, delay: "0.8s" },
    { size: 4, top: "8%", left: "60%", opacity: 0.15, delay: "1.2s" },
    { size: 3, top: "55%", left: "5%", opacity: 0.2, delay: "1.8s" },
  ];

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        exiting ? "loading-exit" : ""
      }`}
      style={{
        backgroundColor: "#0C0B10",
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
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #7C5CFC12 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="animate-float absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: "#7C5CFC",
            top: p.top,
            left: p.left,
            opacity: p.opacity,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* Concentric rings */}
      <div className="relative flex items-center justify-center">
        {/* Outer ring — 200px */}
        <div
          className="loading-orbital absolute rounded-full"
          style={{
            width: 200,
            height: 200,
            border: "1px solid #7C5CFC12",
          }}
        >
          {/* Orbital dots */}
          {orbitalDots.map((deg, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                backgroundColor: "#7C5CFC",
                top: "50%",
                left: "50%",
                transform: `rotate(${deg}deg) translateX(100px) translate(-50%, -50%)`,
              }}
            />
          ))}
        </div>

        {/* Middle ring — 140px */}
        <div
          className="absolute rounded-full"
          style={{
            width: 140,
            height: 140,
            border: "1px solid #7C5CFC18",
          }}
        />

        {/* Inner ring — 80px */}
        <div
          className="absolute rounded-full"
          style={{
            width: 80,
            height: 80,
            border: "1px solid #7C5CFC10",
          }}
        />

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
              className="font-inter text-white"
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

      {/* Progress bar & status text */}
      <div className="absolute bottom-24 flex flex-col items-center gap-4">
        <div
          className="overflow-hidden rounded-full"
          style={{
            width: 240,
            height: 3,
            backgroundColor: "#1A1820",
          }}
        >
          <div
            className="loading-progress h-full rounded-full"
            style={{
              background: "linear-gradient(to right, #7C5CFC, #A78BFA)",
            }}
          />
        </div>
        <span
          className="font-inter uppercase"
          style={{
            fontSize: 12,
            color: "#4A4852",
            letterSpacing: 2,
          }}
        >
          Loading experience...
        </span>
      </div>
    </div>
  );
}
