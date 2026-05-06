"use client";

/**
 * HERO — "Built with intention."
 *
 * Signature animation: "intention." assembles from scattered letter positions,
 * each character pulling into place with magnetic precision. The animation
 * IS the message — letters arriving with purpose, finding their exact spot.
 *
 * The period lands last with a subtle pulse — the final punctuation of
 * a deliberate statement.
 *
 * Scroll behavior: lines drift apart at different speeds (parallax),
 * creating depth as you leave the hero.
 */

import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([line1Ref.current, line2Ref.current], { autoAlpha: 1 });
        gsap.set([subtextRef.current, ctaRef.current, scrollLineRef.current], {
          autoAlpha: 1,
          y: 0,
        });
        return;
      }

      // ── Initial states ──
      gsap.set(line1Ref.current, { y: 40, autoAlpha: 0 });
      gsap.set(subtextRef.current, { autoAlpha: 0, y: 30 });
      gsap.set(ctaRef.current, { autoAlpha: 0, y: 20 });
      gsap.set(scrollLineRef.current, { autoAlpha: 0 });
      if (accentLineRef.current) gsap.set(accentLineRef.current, { scaleX: 0 });

      // Orb: start invisible, bloom in
      if (orbRef.current) {
        gsap.set(orbRef.current, { scale: 0.4, autoAlpha: 0 });
      }

      // ── Split "intention." into chars for assembly animation ──
      const line2El = line2Ref.current;
      let split: SplitType | null = null;

      if (line2El) {
        gsap.set(line2El, { autoAlpha: 1 });
        split = new SplitType(line2El, { types: "chars" });
        const chars = split.chars || [];

        // Scatter each character to a unique random position
        chars.forEach((char, i) => {
          const angle = (i / chars.length) * Math.PI * 2 + Math.random() * 0.5;
          const distance = 60 + Math.random() * 100;
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance + (Math.random() - 0.5) * 40;
          const rotation = (Math.random() - 0.5) * 40;

          gsap.set(char, {
            x,
            y,
            rotation,
            opacity: 0,
            scale: 0.6 + Math.random() * 0.4,
            filter: "blur(4px)",
          });
        });
      }

      // ── Entrance timeline ──
      const tl = gsap.timeline({ delay: 0.4 });

      // 1. "Built with" — clean slide up
      tl.to(line1Ref.current, {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: "power3.out",
      });

      // 2. Orb blooms behind "intention"
      if (orbRef.current) {
        tl.to(
          orbRef.current,
          { scale: 1, autoAlpha: 1, duration: 1.2, ease: "power2.out" },
          "-=0.3"
        );
      }

      // 3. "intention." — letters assemble from scattered positions
      if (split?.chars) {
        const chars = split.chars;

        // All chars pull to origin simultaneously but with stagger
        chars.forEach((char, i) => {
          const isPeriod = char.textContent === ".";
          const delay = isPeriod ? chars.length * 0.035 + 0.15 : i * 0.035;

          tl.to(
            char,
            {
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: isPeriod ? 0.6 : 0.8,
              ease: isPeriod ? "back.out(3)" : "power3.out",
            },
            `-=0.7${i > 0 ? "" : ""}` // overlap with orb bloom
          ).add(() => {}, `-=${0.8 - delay}`);
        });

        // Stagger the chars properly
        tl.addLabel("assembleStart", "-=0.7");
        chars.forEach((char, i) => {
          const isPeriod = char.textContent === ".";
          tl.to(
            char,
            {
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: isPeriod ? 0.5 : 0.7,
              ease: isPeriod ? "back.out(4)" : "power3.out",
            },
            `assembleStart+=${i * 0.04}`
          );
        });
      }

      // 4. Accent line draws
      if (accentLineRef.current) {
        tl.to(
          accentLineRef.current,
          { scaleX: 1, duration: 0.7, ease: "power2.inOut" },
          "-=0.3"
        );
      }

      // 5. Subtext + CTA
      tl.to(
        subtextRef.current,
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.3"
      );

      tl.to(
        ctaRef.current,
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );

      // 6. Scroll line
      tl.to(scrollLineRef.current, { autoAlpha: 1, duration: 0.5 }, "-=0.2");

      // ── Orb breathing (continuous, after entrance) ──
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          scale: 1.08,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 2.5,
        });
      }

      // ── Scroll-driven parallax ──
      ScrollTrigger.matchMedia({
        "(min-width: 769px)": () => {
          if (line1Ref.current) {
            gsap.to(line1Ref.current, {
              yPercent: -30,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          }

          if (line2Ref.current) {
            gsap.to(line2Ref.current, {
              yPercent: -10,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          }

          if (subtextRef.current) {
            gsap.to(subtextRef.current, {
              yPercent: 20,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          }

          if (scrollLineRef.current) {
            gsap.to(scrollLineRef.current, {
              autoAlpha: 0,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "20% top",
                scrub: true,
              },
            });
          }

          // Orb drifts up on scroll (slower than text)
          if (orbRef.current) {
            gsap.to(orbRef.current, {
              yPercent: -40,
              scale: 0.7,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          }
        },
      });
    }, section);

    cleanups.push(() => ctx.revert());

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-(--color-bg-primary)"
    >
      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] grain-shift"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Ambient orb — breathes behind "intention" */}
      <div
        ref={orbRef}
        className="pointer-events-none absolute"
        aria-hidden="true"
        style={{
          width: "clamp(300px, 40vw, 600px)",
          height: "clamp(300px, 40vw, 600px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,92,252,0.12) 0%, rgba(94,234,212,0.04) 50%, transparent 70%)",
          filter: "blur(60px)",
          willChange: "transform, opacity",
        }}
      />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center max-md:gap-6">
        {/* Heading — two lines for independent scroll parallax */}
        <h1 className="flex flex-col items-center gap-2 font-display text-(--color-text-primary) max-md:max-w-[90vw]">
          <span
            ref={line1Ref}
            className="block"
            style={{
              fontSize: "clamp(42px, 10vw, 140px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              willChange: "transform, opacity",
            }}
          >
            Built with
          </span>
          <span
            ref={line2Ref}
            className="block text-(--color-accent)"
            style={{
              fontSize: "clamp(48px, 12vw, 180px)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              fontStyle: "italic",
              willChange: "transform, opacity",
            }}
          >
            intention.
          </span>
        </h1>

        {/* Accent line */}
        <div
          ref={accentLineRef}
          className="h-px bg-(--color-accent) opacity-30"
          style={{
            width: "clamp(120px, 20vw, 300px)",
            transformOrigin: "center",
          }}
        />

        <p
          ref={subtextRef}
          className="max-w-130 font-body text-lg leading-[1.7] text-(--color-text-dim) max-md:text-base max-md:max-w-100"
        >
          For businesses that want more than a template.
          Design, development, and AI; built with precision.
        </p>

        <div
          ref={ctaRef}
          className="flex items-center gap-6 max-md:flex-col max-md:gap-4 max-md:w-full"
        >
          <a
            href="https://calendly.com/heyitsnimbus/30min"
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="flex items-center gap-3 bg-(--color-accent-warm) px-9 py-4 font-body text-[15px] font-semibold text-[#1a1400] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(245,194,107,0.25)] max-md:w-full max-md:justify-center"
          >
            Start a Project
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="#work"
            className="group flex items-center gap-2 font-body text-[15px] text-(--color-text-muted) transition-all duration-300 hover:text-(--color-text-primary)"
          >
            View Work
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Scroll indicator — minimal vertical line */}
      <div
        ref={scrollLineRef}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <div
          className="h-12 w-px bg-linear-to-b from-(--color-accent) to-transparent opacity-40"
          style={{ animation: "float 3s ease-in-out infinite" }}
        />
      </div>
    </section>
  );
}
