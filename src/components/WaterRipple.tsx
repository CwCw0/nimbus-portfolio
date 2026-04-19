"use client";

import { useEffect, useRef } from "react";

/*
  Interactive water surface simulation.
  When you move the cursor it drags through the surface — continuous wake trail,
  not just point drops. Faster movement = bigger disturbance.
  Low-res (256²) with CSS upscale = natural soft-focus blur.
  Purple crests / teal troughs on the dark background.
*/

const RES = 256;
const DAMPING = 0.955; // Faster fade — ripples don't linger too long

export default function WaterRipple() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth < 769;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isMobile || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    canvas.width = RES;
    canvas.height = RES;

    const size = RES * RES;
    let curr = new Float32Array(size);
    let prev = new Float32Array(size);

    const imageData = ctx.createImageData(RES, RES);
    const px = imageData.data;

    // ---- add disturbance at normalized coords ----
    const disturb = (nx: number, ny: number, radius: number, strength: number) => {
      const cx = Math.floor(nx * RES);
      const cy = Math.floor(ny * RES);
      const r = Math.ceil(radius);
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > radius) continue;
          const ix = cx + dx;
          const iy = cy + dy;
          if (ix < 1 || ix >= RES - 1 || iy < 1 || iy >= RES - 1) continue;
          curr[iy * RES + ix] += (1 - dist / radius) * strength;
        }
      }
    };

    // ---- wave propagation ----
    const propagate = () => {
      for (let y = 1; y < RES - 1; y++) {
        for (let x = 1; x < RES - 1; x++) {
          const i = y * RES + x;
          prev[i] =
            ((curr[i - 1] + curr[i + 1] + curr[i - RES] + curr[i + RES]) / 2 -
              prev[i]) *
            DAMPING;
        }
      }
      const tmp = curr;
      curr = prev;
      prev = tmp;
    };

    // ---- render heightmap to pixels ----
    const render = () => {
      for (let i = 0; i < size; i++) {
        const v = curr[i];
        const abs = Math.min(255, Math.abs(v) * 0.35);

        if (abs < 1) {
          px[i * 4 + 3] = 0;
          continue;
        }

        // Subtle purple on crests, subtle teal on troughs
        if (v > 0) {
          px[i * 4] = 124;
          px[i * 4 + 1] = 92;
          px[i * 4 + 2] = 252;
        } else {
          px[i * 4] = 94;
          px[i * 4 + 1] = 234;
          px[i * 4 + 2] = 212;
        }
        // Very low alpha — atmospheric, not distracting
        px[i * 4 + 3] = Math.min(18, abs * 0.07);
      }
      ctx.putImageData(imageData, 0, 0);
    };

    // ---- mouse state ----
    let mouseX = -1;
    let mouseY = -1;
    let prevMX = -1;
    let prevMY = -1;
    let isOnPage = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth;
      mouseY = e.clientY / window.innerHeight;
      isOnPage = true;
    };

    const onMouseLeave = () => {
      isOnPage = false;
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    // ---- animation loop (throttled to ~30fps for performance) ----
    let animId: number;
    let frame = 0;
    let lastTime = 0;
    const FRAME_INTERVAL = 1000 / 30; // 30fps

    const animate = (now: number) => {
      animId = requestAnimationFrame(animate);

      if (now - lastTime < FRAME_INTERVAL) return;
      lastTime = now;
      // --- Cursor trail: interpolate between prev and current mouse pos ---
      if (isOnPage && mouseX >= 0 && prevMX >= 0) {
        const dx = mouseX - prevMX;
        const dy = mouseY - prevMY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0.001) {
          // Speed-reactive but gentle
          const speed = Math.min(dist * 50, 1);
          const radius = 3 + speed * 4; // 3-7 pixel radius
          const strength = 80 + speed * 250; // 80-330 strength (subtle)

          // Interpolate points along the movement path — continuous trail
          const steps = Math.max(1, Math.floor(dist * RES * 0.5));
          for (let s = 0; s <= steps; s++) {
            const t = s / steps;
            const ix = prevMX + dx * t;
            const iy = prevMY + dy * t;
            disturb(ix, iy, radius, strength / (steps + 1));
          }
        }
      }
      prevMX = mouseX;
      prevMY = mouseY;

      // Rare ambient ripples — barely noticeable life
      if (frame % 300 === 0) {
        disturb(0.2 + Math.random() * 0.6, 0.2 + Math.random() * 0.6, 3, 35);
      }

      propagate();
      render();

      frame++;
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        width: "100vw",
        height: "100vh",
        imageRendering: "auto",
        mixBlendMode: "screen",
      }}
      aria-hidden="true"
    />
  );
}
