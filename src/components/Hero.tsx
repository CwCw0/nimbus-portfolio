"use client";

import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);
  const mouseGlowRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const mouseGlow = mouseGlowRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cleanups: (() => void)[] = [];

    // Mouse-reactive ambient glow
    if (mouseGlow && !prefersReducedMotion) {
      const onMove = (e: MouseEvent) => {
        const rect = section.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        mouseGlow.style.opacity = "1";
        mouseGlow.style.background = `radial-gradient(600px circle at ${x}% ${y}%, rgba(124,92,252,0.08) 0%, transparent 70%)`;
      };
      const onLeave = () => {
        mouseGlow.style.opacity = "0";
      };
      section.addEventListener("mousemove", onMove);
      section.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        section.removeEventListener("mousemove", onMove);
        section.removeEventListener("mouseleave", onLeave);
      });
    }

    // Watermark — pool floor refraction. Text shifts like looking through water.
    const watermark = watermarkRef.current;
    if (watermark && !prefersReducedMotion) {
      let mouseX = 0.5; // normalized 0-1
      let mouseY = 0.5;
      let velX = 0;
      let velY = 0;
      let prevMX = 0.5;
      let prevMY = 0.5;
      // Current refraction offset (smoothed)
      let offsetX = 0;
      let offsetY = 0;
      let time = 0;

      const onMove = (e: MouseEvent) => {
        const rect = section.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) / rect.width;
        mouseY = (e.clientY - rect.top) / rect.height;
      };

      section.addEventListener("mousemove", onMove);
      cleanups.push(() => section.removeEventListener("mousemove", onMove));

      const animate = () => {
        time += 0.016;

        // Velocity of cursor (how fast the "water" is being disturbed)
        velX += (mouseX - prevMX) * 8;
        velY += (mouseY - prevMY) * 8;
        prevMX = mouseX;
        prevMY = mouseY;

        // Dampen velocity
        velX *= 0.92;
        velY *= 0.92;

        // Add gentle sine oscillation (water is never perfectly still)
        const ambientX = Math.sin(time * 1.2) * 0.3;
        const ambientY = Math.cos(time * 0.9) * 0.2;

        // Smoothly approach target offset
        const targetX = velX * 15 + ambientX;
        const targetY = velY * 12 + ambientY;
        offsetX += (targetX - offsetX) * 0.08;
        offsetY += (targetY - offsetY) * 0.08;

        // Apply as transform — like light refracting through water surface
        const disturbance = Math.sqrt(velX * velX + velY * velY);
        const blur = Math.min(3, disturbance * 4);
        const scaleShift = 1 + Math.sin(time * 1.5) * 0.003 * (1 + disturbance * 2);

        watermark.style.transform =
          `translate(${offsetX}px, ${offsetY}px) scale(${scaleShift})`;
        watermark.style.filter = blur > 0.1 ? `blur(${blur}px)` : "none";

        frame = requestAnimationFrame(animate);
      };

      let frame = requestAnimationFrame(animate);
      cleanups.push(() => cancelAnimationFrame(frame));
    }

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([line1Ref.current, line2Ref.current], { y: 0, autoAlpha: 1 });
        gsap.set([subtextRef.current, ctaRef.current, scrollLineRef.current], {
          autoAlpha: 1,
          y: 0,
        });
        return;
      }

      // Initial states — hide everything
      gsap.set(line1Ref.current, { y: 60, autoAlpha: 0 });
      gsap.set(line2Ref.current, { y: 80, autoAlpha: 0, scale: 0.95 });
      gsap.set(subtextRef.current, { autoAlpha: 0, y: 40 });
      gsap.set(ctaRef.current, { autoAlpha: 0, y: 30 });
      gsap.set(scrollLineRef.current, { autoAlpha: 0 });
      if (accentLineRef.current) gsap.set(accentLineRef.current, { scaleX: 0 });

      // Entrance timeline
      const tl = gsap.timeline({ delay: 0.3 });

      // Line 1 — "Built with" slides up
      tl.to(line1Ref.current, {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power3.out",
      });

      // Line 2 — "intention." scales in with emphasis
      tl.to(
        line2Ref.current,
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.6"
      );

      // Accent line draws under heading
      if (accentLineRef.current) {
        tl.to(
          accentLineRef.current,
          { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
          "-=0.5"
        );
      }

      // Subtext + CTA
      tl.to(
        subtextRef.current,
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

      tl.to(
        ctaRef.current,
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.4"
      );

      // Scroll line
      tl.to(scrollLineRef.current, { autoAlpha: 1, duration: 0.6 }, "-=0.2");

      // --- Scroll-driven parallax: lines drift apart, content parallaxes ---
      ScrollTrigger.matchMedia({
        "(min-width: 769px)": () => {
          // Line 1 — drifts up with parallax (stays visible)
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

          // Line 2 — drifts slower, creating spread
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

          // Subtext drifts down relatively
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

          // Scroll indicator fades out
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
      {/* Mouse-reactive ambient glow */}
      <div
        ref={mouseGlowRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ opacity: 0, transition: "opacity 0.4s ease" }}
      />

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

      {/* Ghost watermark — pool floor refraction via cursor-driven transforms */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none max-md:hidden"
        aria-hidden="true"
      >
        <span
          ref={watermarkRef}
          className="font-display text-(--color-text-primary)"
          style={{
            fontSize: "clamp(120px, 20vw, 320px)",
            opacity: 0.06,
            letterSpacing: "0.1em",
            lineHeight: 1,
            willChange: "transform, filter",
          }}
        >
          NIMBUS
        </span>
      </div>

      {/* Corner marks */}
      <div className="pointer-events-none absolute inset-0 max-md:hidden" aria-hidden="true">
        <div className="absolute left-16 top-24 h-12 w-px bg-(--color-accent) opacity-[0.08]" />
        <div className="absolute left-16 top-24 h-px w-12 bg-(--color-accent) opacity-[0.08]" />
        <div className="absolute right-16 top-24 h-12 w-px bg-(--color-accent) opacity-[0.08]" />
        <div className="absolute right-16 top-24 h-px w-12 bg-(--color-accent) opacity-[0.08]" style={{ transform: "translateX(-100%)" }} />
        <div className="absolute left-16 bottom-24 h-12 w-px bg-(--color-accent) opacity-[0.08]" style={{ transform: "translateY(-100%)" }} />
        <div className="absolute left-16 bottom-24 h-px w-12 bg-(--color-accent) opacity-[0.08]" />
        <div className="absolute right-16 bottom-24 h-12 w-px bg-(--color-accent) opacity-[0.08]" style={{ transform: "translateY(-100%)" }} />
        <div className="absolute right-16 bottom-24 h-px w-12 bg-(--color-accent) opacity-[0.08]" style={{ transform: "translateX(-100%)" }} />
      </div>

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
          A creative studio for businesses that want more than a template.
          Design, development, and AI — built with precision.
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
