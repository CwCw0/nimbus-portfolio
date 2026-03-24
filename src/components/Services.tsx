"use client";

import {
  Globe,
  Palette,
  Layers,
  Search,
  Bot,
} from "lucide-react";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    icon: Globe,
    title: "Website Creation",
    desc: "High-performance, conversion-focused websites built with modern tech stacks. From landing pages to full platforms.",
  },
  {
    num: "02",
    icon: Palette,
    title: "Branding",
    desc: "Visual identity systems that tell your story. Logos, color palettes, typography and brand guidelines.",
  },
  {
    num: "03",
    icon: Layers,
    title: "UI/UX Design",
    desc: "Intuitive interfaces designed for real users. Research-driven, pixel-perfect, and built for conversion.",
  },
  {
    num: "04",
    icon: Search,
    title: "SEO Optimization",
    desc: "Data-driven SEO strategies that drive organic traffic. Technical audits, content optimization and rank tracking.",
  },
  {
    num: "05",
    icon: Bot,
    title: "AI, LLMs & Agents",
    desc: "Custom AI agents, LLM-powered tools, chatbots and automation workflows that scale your business while you sleep.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const numWatermarkRef = useRef<HTMLSpanElement>(null);
  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const isMobile = window.innerWidth < 769;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isMobile || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const totalServices = services.length;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: pin,
        pinSpacing: false,
        snap: {
          snapTo: 1 / totalServices,
          duration: { min: 0.25, max: 0.6 },
          delay: 0.1,
          ease: "power1.inOut",
        },
        onUpdate: (self) => {
          const progress = self.progress;
          const serviceIndex = Math.min(
            Math.floor(progress * totalServices),
            totalServices - 1
          );

          // Update progress bar (cheap DOM write)
          if (progressRef.current) {
            progressRef.current.style.height = `${progress * 100}%`;
          }

          // Only animate content swap when index changes
          if (serviceIndex !== currentIndexRef.current && !isAnimatingRef.current) {
            currentIndexRef.current = serviceIndex;
            const service = services[serviceIndex];
            isAnimatingRef.current = true;

            // Update counter + watermark immediately (no animation needed)
            if (counterRef.current) counterRef.current.textContent = service.num;
            if (numWatermarkRef.current) numWatermarkRef.current.textContent = service.num;

            // Kill any in-flight tweens before starting new ones
            if (titleRef.current) gsap.killTweensOf(titleRef.current);
            if (descRef.current) gsap.killTweensOf(descRef.current);
            if (iconRef.current) gsap.killTweensOf(iconRef.current);

            // Crossfade title
            const tl = gsap.timeline({
              onComplete: () => { isAnimatingRef.current = false; },
            });

            tl.to(titleRef.current, { opacity: 0, y: -15, duration: 0.15 });
            tl.to(descRef.current, { opacity: 0, y: 10, duration: 0.15 }, "<");

            tl.call(() => {
              if (titleRef.current) titleRef.current.textContent = service.title;
              if (descRef.current) descRef.current.textContent = service.desc;
              if (iconRef.current) iconRef.current.setAttribute("data-icon", service.num);
            });

            tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.25, ease: "power3.out" });
            tl.to(descRef.current, { opacity: 1, y: 0, duration: 0.25, ease: "power3.out" }, "<0.05");
            tl.fromTo(iconRef.current, { scale: 0.85, opacity: 0.5 }, { scale: 1, opacity: 1, duration: 0.25, ease: "power2.out" }, "<");
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const firstService = services[0];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full max-md:!h-auto"
      style={{ height: `${services.length * 100}vh` }}
    >
      {/* Pinned viewport */}
      <div
        ref={pinRef}
        className="flex h-[100vh] w-full items-center bg-[var(--color-bg-primary)] max-md:h-auto"
      >
        {/* Desktop — pinned showcase */}
        <div className="relative flex h-full w-full max-md:hidden">
          {/* Left side — counter + progress bar */}
          <div className="flex w-[120px] flex-col items-center justify-center gap-8 border-r border-[var(--color-border)]">
            <div className="relative h-[200px] w-px bg-[var(--color-border)]">
              <div
                ref={progressRef}
                className="absolute top-0 left-0 w-full bg-[var(--color-accent)]"
                style={{ height: "0%", willChange: "height" }}
              />
            </div>
            <span
              ref={counterRef}
              className="font-body text-sm font-semibold tracking-[2px] text-[var(--color-accent)]"
            >
              {firstService.num}
            </span>
          </div>

          {/* Center content */}
          <div className="relative flex flex-1 flex-col items-start justify-center px-20">
            <span className="mb-6 font-body text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
              SERVICES
            </span>

            <span
              ref={numWatermarkRef}
              className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 select-none font-display text-[var(--color-text-primary)]"
              style={{
                fontSize: "clamp(100px, 12vw, 200px)",
                opacity: 0.03,
                lineHeight: 1,
              }}
            >
              {firstService.num}
            </span>

            <div
              ref={iconRef}
              data-icon={firstService.num}
              className="mb-8 flex h-16 w-16 items-center justify-center bg-[var(--color-accent-subtle)]"
              style={{ willChange: "transform, opacity" }}
            >
              <ServiceIcon num={firstService.num} />
            </div>

            <h3
              ref={titleRef}
              className="font-display text-[var(--color-text-primary)]"
              style={{
                fontSize: "clamp(36px, 4.5vw, 72px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                willChange: "transform, opacity",
              }}
            >
              {firstService.title}
            </h3>

            <p
              ref={descRef}
              className="mt-6 max-w-[500px] font-body text-lg leading-[1.7] text-[var(--color-text-dim)]"
              style={{ willChange: "transform, opacity" }}
            >
              {firstService.desc}
            </p>

            <Link
              href="/services"
              className="mt-10 flex items-center gap-2 font-body text-sm font-medium text-[var(--color-accent)] transition-all hover:gap-3"
            >
              View All Services
              <span className="text-sm">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Mobile — stacked cards (no pinning) */}
        <div className="hidden w-full flex-col gap-6 px-6 py-16 max-md:flex">
          <div className="mb-8 flex flex-col gap-4">
            <span className="font-body text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
              SERVICES
            </span>
            <h2 className="font-display text-[32px] tracking-[-1px] text-[var(--color-text-primary)]">
              What I do
            </h2>
            <div className="h-px w-[120px] bg-[var(--color-accent)] opacity-30" />
          </div>
          {services.map((s) => (
            <Link
              key={s.num}
              href="/services"
              className="group flex flex-col gap-4 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-7 transition-all hover:border-[var(--color-accent-border)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center bg-[var(--color-accent-subtle)]">
                  <ServiceIcon num={s.num} />
                </div>
                <span className="font-display text-[48px] leading-none text-[var(--color-text-primary)] opacity-[0.04]">
                  {s.num}
                </span>
              </div>
              <h3 className="font-body text-lg font-semibold text-[var(--color-text-primary)]">
                {s.title}
              </h3>
              <p className="font-body text-sm leading-[1.6] text-[var(--color-text-dim)]">
                {s.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceIcon({ num }: { num: string }) {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    "01": Globe,
    "02": Palette,
    "03": Layers,
    "04": Search,
    "05": Bot,
  };
  const Icon = icons[num] || Globe;
  return <Icon className="h-6 w-6 text-[var(--color-accent)]" />;
}
