'use client';

import { useRef, useEffect } from 'react';

interface AmbientWavesProps {
  lineCount?: number;
  className?: string;
}

// Per-line speed multiplier — creates the "drifting at different rates" feel
// Indices map to the wave's position in the line array
const SPEED_TIERS = [0.4, 1.0, 0.6, 1.4, 0.8, 0.3, 1.2, 0.5, 1.6, 0.7, 1.0, 0.45, 0.9, 1.3, 0.55];

export default function AmbientWaves({ lineCount = 18, className }: AmbientWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const isMobile = window.innerWidth < 900;
    const samples = isMobile ? 60 : 100;
    const count = isMobile ? Math.min(lineCount, 9) : lineCount;

    // Cache dimensions — only update on resize
    let w = window.innerWidth;
    let h = window.innerHeight;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    };
    window.addEventListener('resize', debouncedResize);

    // Cache theme — check once, update on attribute change
    let isLight = document.body.getAttribute('data-theme') === 'light';
    const observer = new MutationObserver(() => {
      isLight = document.body.getAttribute('data-theme') === 'light';
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });

    // Pre-compute line properties (never changes per line)
    // Opacity tiers: ghost (0.03), subtle (0.06), visible (0.10), accent (0.15)
    // Colour tiers: neutral-violet, violet (#7C5CFC), light-violet (#A78BFA)
    type LineTier = 'ghost' | 'subtle' | 'mid' | 'accent';
    const TIERS: LineTier[] = [
      'ghost', 'subtle', 'ghost', 'mid', 'subtle',
      'accent', 'ghost', 'mid', 'subtle', 'ghost',
      'mid', 'subtle', 'accent', 'ghost', 'mid',
      'subtle', 'ghost', 'mid',
    ];
    const COLOUR_ROLES = [
      'neutral', 'violet', 'neutral', 'light', 'violet',
      'light', 'neutral', 'violet', 'light', 'neutral',
      'violet', 'neutral', 'light', 'violet', 'neutral',
      'violet', 'light', 'violet',
    ];

    const lines = Array.from({ length: count }, (_, i) => {
      const norm = count === 1 ? 0.5 : i / (count - 1);
      const edgeBias = 0.5 + Math.sign(norm - 0.5) * Math.pow(Math.abs(norm - 0.5) * 2, 0.6) * 0.5;
      const edgeFactor = Math.abs(norm - 0.5) * 2;
      const tier = TIERS[i % TIERS.length];
      const colourRole = COLOUR_ROLES[i % COLOUR_ROLES.length];
      const speedMult = SPEED_TIERS[i % SPEED_TIERS.length];

      // Base opacity per tier
      const baseAlpha =
        tier === 'ghost'  ? 0.03 :
        tier === 'subtle' ? 0.06 :
        tier === 'mid'    ? 0.10 :
        /* accent */        0.15;

      // Stroke width — lighter lines are thinner, accent lines slightly bolder
      const lineWidth =
        tier === 'ghost'  ? 0.3 + edgeFactor * 0.2 :
        tier === 'subtle' ? 0.5 + edgeFactor * 0.3 :
        tier === 'mid'    ? 0.8 + edgeFactor * 0.4 :
        /* accent */        1.0 + edgeFactor * 0.4;

      return {
        edgeBias,
        edgeFactor,
        colourRole,
        baseAlpha,
        lineWidth,
        speedMult,
        phase1: i * 0.7,
        phase2: i * 1.3,
        phase3: i * 0.4,
      };
    });

    // Each line has its own time offset so they drift independently
    const lineTime = lines.map(() => 0);
    let rafId: number = 0;
    let lastTs = 0;

    function draw(ts: number) {
      const dt = Math.min((ts - lastTs) / 1000, 0.05); // seconds, capped
      lastTs = ts;

      ctx!.clearRect(0, 0, w, h);

      const amplitude = h * 0.22;

      for (let i = 0; i < lines.length; i++) {
        const l = lines[i];

        // Advance each line's private time at its own speed
        lineTime[i] += dt * 0.5 * l.speedMult;
        const t = lineTime[i];

        const baseY = l.edgeBias * h;

        // Colour
        let r: number, g: number, b: number;
        if (l.colourRole === 'violet') {
          r = 124; g = 92; b = 252;  // #7C5CFC
        } else if (l.colourRole === 'light') {
          r = 167; g = 139; b = 250; // #A78BFA
        } else {
          // neutral — blue-violet midtone
          r = 148; g = 139; b = 200;
        }

        let alpha = l.baseAlpha + l.edgeFactor * 0.08;
        if (isLight) {
          // In light mode, dampen everything significantly
          alpha *= 0.5;
        }

        // Build path
        ctx!.beginPath();
        for (let s = 0; s <= samples; s++) {
          const xNorm = s / samples;
          const sx = xNorm * w;
          const wave =
            Math.sin(xNorm * 6.28 + t + l.phase1) * 0.5 +
            Math.sin(xNorm * 11.6 + t * 0.7 + l.phase2) * 0.3 +
            Math.sin(xNorm * 4.08 + t * 1.3 + l.phase3) * 0.2;
          const sy = baseY + wave * amplitude;

          if (s === 0) ctx!.moveTo(sx, sy);
          else ctx!.lineTo(sx, sy);
        }

        ctx!.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx!.lineWidth = l.lineWidth;
        ctx!.stroke();
      }

      rafId = requestAnimationFrame(draw);
    }

    if (prefersReducedMotion) {
      // Render once static at t = 0
      ctx!.clearRect(0, 0, w, h);
      const amplitude = h * 0.22;
      for (let i = 0; i < lines.length; i++) {
        const l = lines[i];
        const baseY = l.edgeBias * h;
        let r: number, g: number, b: number;
        if (l.colourRole === 'violet') { r = 124; g = 92; b = 252; }
        else if (l.colourRole === 'light') { r = 167; g = 139; b = 250; }
        else { r = 148; g = 139; b = 200; }
        const alpha = l.baseAlpha + l.edgeFactor * 0.08;
        ctx!.beginPath();
        for (let s = 0; s <= samples; s++) {
          const xNorm = s / samples;
          const wave =
            Math.sin(xNorm * 6.28 + l.phase1) * 0.5 +
            Math.sin(xNorm * 11.6 + l.phase2) * 0.3 +
            Math.sin(xNorm * 4.08 + l.phase3) * 0.2;
          const sy = baseY + wave * amplitude;
          if (s === 0) ctx!.moveTo(xNorm * w, sy);
          else ctx!.lineTo(xNorm * w, sy);
        }
        ctx!.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx!.lineWidth = l.lineWidth;
        ctx!.stroke();
      }
    } else {
      rafId = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener('resize', debouncedResize);
    };
  }, [lineCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`ambient-waves${className ? ` ${className}` : ''}`}
    />
  );
}
