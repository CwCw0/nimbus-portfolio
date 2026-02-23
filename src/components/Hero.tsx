"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.querySelectorAll(".hero-animate").forEach((child, i) => {
      (child as HTMLElement).style.animationDelay = `${i * 80}ms`;
      child.classList.add("animate-fade-in-up");
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="snap-section relative h-[820px] max-md:h-auto max-md:min-h-screen w-full overflow-hidden bg-[var(--color-bg-primary)]"
    >
      {/* Fluid Abstract BG - static fallback */}
      <div className="pointer-events-none absolute inset-0 max-md:hidden">
        <div className="absolute left-[400px] top-[50px] h-[650px] w-[900px] rounded-full opacity-40" style={{ background: "radial-gradient(circle, #7C5CFC0A 0%, #7C5CFC04 50%, transparent 100%)" }} />
        <div className="absolute left-[850px] top-[150px] h-[420px] w-[460px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, #7C5CFC30 0%, #7C5CFC18 50%, transparent 100%)" }} />
        <div className="absolute left-[920px] top-[230px] h-[300px] w-[340px] rotate-[15deg] rounded-full opacity-35" style={{ background: "radial-gradient(circle, #7C5CFC20 0%, #7C5CFC0C 50%, transparent 100%)" }} />
        <div className="absolute left-[1050px] top-[330px] h-[120px] w-[140px] rounded-full opacity-50" style={{ background: "radial-gradient(circle, #7C5CFC30 0%, #7C5CFC10 40%, transparent 100%)" }} />
        <div className="absolute left-[200px] top-[500px] h-[240px] w-[280px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #7C5CFC0C 0%, #7C5CFC05 50%, transparent 100%)" }} />
        <div className="absolute left-[480px] top-0 h-full w-px bg-[var(--color-accent)] opacity-[0.03]" />
        <div className="absolute left-[960px] top-0 h-full w-px bg-[var(--color-accent)] opacity-[0.03]" />
        <div className="absolute left-0 top-[270px] h-px w-full bg-[var(--color-accent)] opacity-[0.03]" />
        <div className="absolute left-0 top-[540px] h-px w-full bg-[var(--color-accent)] opacity-[0.03]" />
        {[
          { x: 850, y: 180, s: 3, o: 0.6 },
          { x: 1100, y: 250, s: 2, o: 0.4 },
          { x: 780, y: 420, s: 4, o: 0.3 },
          { x: 1200, y: 380, s: 2, o: 0.5, color: "#A78BFA" },
          { x: 950, y: 520, s: 3, o: 0.25 },
          { x: 700, y: 280, s: 2, o: 0.35, color: "#A78BFA" },
          { x: 200, y: 450, s: 3, o: 0.15 },
          { x: 1150, y: 160, s: 2, o: 0.45 },
          { x: 650, y: 150, s: 3, o: 0.2 },
        ].map((p, i) => (
          <div key={i} className="animate-float absolute rounded-full" style={{ left: p.x, top: p.y, width: p.s, height: p.s, background: p.color || "#7C5CFC", opacity: p.o, animationDelay: `${i * 0.5}s` }} />
        ))}
      </div>

      <div className="relative z-10 flex h-full w-full flex-col items-center gap-10 px-16 pb-10 pt-[100px] max-md:px-6 max-md:pt-20 max-md:pb-16 max-md:gap-8">
        <div className="hero-animate flex items-center gap-2 rounded-full border border-[var(--color-border-light)] px-5 py-2">
          <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          <span className="font-inter text-[11px] tracking-[1px] text-[var(--color-text-muted)]">Available for projects &amp; contracts</span>
        </div>

        <div className="flex flex-col items-center gap-6">
          <h1 className="hero-animate font-space-grotesk text-center text-[72px] font-bold leading-[1.05] tracking-[-2.5px] text-white max-md:text-[40px] max-md:tracking-[-1.5px]">
            For Builders,
            <br />
            By Builders.
          </h1>
          <p className="hero-animate w-[600px] text-center font-inter text-base leading-[1.6] text-[var(--color-text-dim)] max-md:w-full max-md:text-sm">
            A creative studio for businesses that want more than a template.
            <br />
            Design, development, and AI — built with precision, launched with purpose.
          </p>
        </div>

        <div className="hero-animate flex items-center gap-4 max-md:flex-col max-md:w-full">
          <a href="/contact" className="flex items-center gap-2.5 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)] px-8 py-4 font-inter text-[15px] font-semibold text-[#0A0A0B] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_24px_#7C5CFC20] max-md:w-full max-md:justify-center">
            Start a Project
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a href="#work" className="flex items-center gap-2.5 border border-[var(--color-border-light)] px-8 py-4 font-inter text-[15px] font-medium text-[var(--color-text-secondary)] transition-all duration-300 hover:border-[var(--color-accent-border)] hover:text-white max-md:w-full max-md:justify-center">
            View Work
          </a>
        </div>

        <div className="hero-animate flex w-full items-center gap-9 pt-10 max-md:hidden">
          <span className="font-inter text-[10px] font-medium tracking-[2px] text-[var(--color-text-subtle)]">Built with</span>
          <div className="h-4 w-px bg-[#2A2A2E]" />
          {["NEXT.JS", "REACT", "TYPESCRIPT", "TAILWIND", "NODE.JS"].map((tech) => (
            <span key={tech} className="font-inter text-[11px] font-semibold tracking-[3px] text-[var(--color-text-subtle)]">{tech}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
