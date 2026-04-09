"use client";

import { ArrowUpRight, ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const split = new SplitType(heading, { types: "words" });

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(split.words || [], { y: 0, opacity: 1 });
        return;
      }

      // Wrap each word in overflow-hidden
      split.words?.forEach((word) => {
        const wrapper = document.createElement("span");
        wrapper.style.display = "inline-block";
        wrapper.style.overflow = "hidden";
        wrapper.style.verticalAlign = "top";
        word.parentNode?.insertBefore(wrapper, word);
        wrapper.appendChild(word);
      });

      // Set initial states
      gsap.set(split.words || [], { y: "100%", opacity: 0 });
      if (subtextRef.current) gsap.set(subtextRef.current, { opacity: 0, y: 40 });
      if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 0, y: 30 });
      if (scrollIndicatorRef.current) gsap.set(scrollIndicatorRef.current, { opacity: 0 });

      // Word-by-word reveal timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(split.words || [], {
        y: "0%",
        opacity: 1,
        duration: 0.9,
        stagger: 0.06,
        ease: "power3.out",
      });

      tl.to(
        subtextRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

      tl.to(
        ctaRef.current,
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.4"
      );

      tl.to(
        scrollIndicatorRef.current,
        { opacity: 1, duration: 0.6 },
        "-=0.2"
      );

      // Parallax on scroll — desktop only
      ScrollTrigger.matchMedia({
        "(min-width: 769px)": () => {
          if (headingRef.current) {
            gsap.to(headingRef.current, {
              yPercent: -20,
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
              yPercent: -35,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          }

          // Scroll indicator fades out
          if (scrollIndicatorRef.current) {
            gsap.to(scrollIndicatorRef.current, {
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "20% top",
                scrub: true,
              },
            });
          }
        },
      });
    }, section);

    return () => {
      split.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex h-[100vh] w-full items-center justify-center overflow-hidden bg-[var(--color-bg-primary)]"
    >
      {/* Grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] grain-shift"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Subtle corner marks */}
      <div className="pointer-events-none absolute inset-0 max-md:hidden">
        <div className="absolute left-16 top-24 h-12 w-px bg-[var(--color-accent)] opacity-[0.08]" />
        <div className="absolute left-16 top-24 h-px w-12 bg-[var(--color-accent)] opacity-[0.08]" />
        <div className="absolute right-16 top-24 h-12 w-px bg-[var(--color-accent)] opacity-[0.08]" />
        <div className="absolute right-16 top-24 h-px w-12 bg-[var(--color-accent)] opacity-[0.08]" style={{ transform: "translateX(-100%)" }} />
        <div className="absolute left-16 bottom-24 h-12 w-px bg-[var(--color-accent)] opacity-[0.08]" style={{ transform: "translateY(-100%)" }} />
        <div className="absolute left-16 bottom-24 h-px w-12 bg-[var(--color-accent)] opacity-[0.08]" />
        <div className="absolute right-16 bottom-24 h-12 w-px bg-[var(--color-accent)] opacity-[0.08]" style={{ transform: "translateY(-100%)" }} />
        <div className="absolute right-16 bottom-24 h-px w-12 bg-[var(--color-accent)] opacity-[0.08]" style={{ transform: "translateX(-100%)" }} />
      </div>

      {/* Ghost watermark behind */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none max-md:hidden"
        aria-hidden="true"
      >
        <span
          className="font-display text-[var(--color-text-primary)]"
          style={{
            fontSize: "clamp(120px, 20vw, 320px)",
            opacity: 0.02,
            letterSpacing: "0.1em",
            lineHeight: 1,
          }}
        >
          NIMBUS
        </span>
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center max-md:gap-8">
        <h1
          ref={headingRef}
          className="font-display text-[var(--color-text-primary)] max-md:max-w-[90vw]"
          style={{
            fontSize: "clamp(42px, 10vw, 160px)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          Built with{" "}
          <span className="text-[var(--color-accent)]">intention.</span>
        </h1>

        <p
          ref={subtextRef}
          className="max-w-[560px] font-body text-lg leading-[1.7] text-[var(--color-text-dim)] max-md:text-base max-md:max-w-[400px]"
        >
          A creative studio for businesses that want more than a template.
          Design, development, and AI — built with precision.
        </p>

        <div ref={ctaRef} className="flex items-center gap-6 max-md:flex-col max-md:gap-4 max-md:w-full">
          <a
            href="https://calendly.com/heyitsnimbus/30min"
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="flex items-center gap-3 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)] px-9 py-4 font-body text-[15px] font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_#7C5CFC25] max-md:w-full max-md:justify-center"
          >
            Start a Project
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="#work"
            className="group flex items-center gap-2 font-body text-[15px] text-[var(--color-text-muted)] transition-all duration-300 hover:text-[var(--color-text-primary)]"
          >
            View Work
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-body text-[10px] font-medium tracking-[3px] text-[var(--color-text-subtle)]">
          SCROLL
        </span>
        <ChevronDown className="h-4 w-4 text-[var(--color-text-subtle)] animate-bounce" style={{ animationDuration: "2s" }} />
      </div>
    </section>
  );
}
