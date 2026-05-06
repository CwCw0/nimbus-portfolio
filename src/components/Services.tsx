"use client";

/**
 * SERVICES — Bento grid with sliding hover highlight
 *
 * Inspired by Aceternity's card-hover-effect + bento grid patterns.
 * Custom-built for Nimbus design tokens.
 *
 * Layout: 2-column bento where the first and last items span full width.
 * Interaction: A translucent highlight div slides to whichever card is hovered
 * (Framer Motion layoutId), creating a fluid "spotlight" effect.
 * Animation: Each card reveals on scroll with staggered clip-path.
 * Icons draw themselves with SVG stroke-dashoffset on scroll.
 *
 * NO scroll hijacking. All services visible at once.
 */

import {
  Globe,
  Palette,
  Layers,
  Search,
  Bot,
} from "lucide-react";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    icon: Globe,
    title: "Website Creation",
    desc: "High-performance, conversion-focused websites built with modern stacks. From landing pages to full platforms.",
    tags: ["Next.js", "React", "Vercel"],
    size: "wide" as const,
  },
  {
    num: "02",
    icon: Palette,
    title: "Visual Design",
    desc: "Colour systems, typography, and component design built with intent — not picked from a template.",
    tags: ["Figma", "Design Systems", "Brand"],
    size: "normal" as const,
  },
  {
    num: "03",
    icon: Layers,
    title: "UI/UX Design",
    desc: "Intuitive interfaces designed for real users. Research-driven, pixel-perfect, built for conversion.",
    tags: ["Prototyping", "User Research", "Wireframes"],
    size: "normal" as const,
  },
  {
    num: "04",
    icon: Search,
    title: "SEO Optimization",
    desc: "Data-driven SEO strategies that drive organic traffic. Technical audits, content optimization and rank tracking.",
    tags: ["Technical SEO", "Analytics", "Content"],
    size: "normal" as const,
  },
  {
    num: "05",
    icon: Bot,
    title: "AI, LLMs & Agents",
    desc: "Custom AI agents, LLM-powered tools, chatbots and automation workflows that scale your business.",
    tags: ["GPT", "Claude", "Automation"],
    size: "wide" as const,
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // Header entrance
      const header = section.querySelector(".svc-header");
      if (header) {
        gsap.fromTo(
          header,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: header, start: "top 85%", once: true },
          }
        );
      }

      // Cards stagger reveal with clip-path
      const cards = grid.querySelectorAll(".svc-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            clipPath: "inset(100% 0 0 0)",
            opacity: 0,
          },
          {
            clipPath: "inset(0% 0 0 0)",
            opacity: 1,
            duration: 0.8,
            ease: "power3.inOut",
            delay: i * 0.1,
            scrollTrigger: { trigger: card, start: "top 90%", once: true },
          }
        );
      });

      // Icon SVGs — draw stroke on scroll
      const icons = grid.querySelectorAll(".svc-icon svg");
      icons.forEach((svg) => {
        const paths = svg.querySelectorAll("path, circle, polyline, line, rect");
        paths.forEach((path) => {
          const p = path as SVGGeometryElement;
          if (p.getTotalLength) {
            const length = p.getTotalLength();
            gsap.set(p, { strokeDasharray: length, strokeDashoffset: length });
            gsap.to(p, {
              strokeDashoffset: 0,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: { trigger: svg, start: "top 85%", once: true },
            });
          }
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full px-16 py-32 max-md:px-6 max-md:py-20"
    >
      {/* Header */}
      <div className="svc-header mx-auto mb-16 max-w-300 max-md:mb-10">
        <span className="block font-body text-[11px] font-medium tracking-[3px] text-(--color-accent) mb-4">
          SERVICES
        </span>
        <h2
          className="font-display leading-[1.05] tracking-[-2px] text-(--color-text-primary) max-w-150"
          style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
        >
          What I build.
        </h2>
        <div className="mt-4 h-px w-24 bg-(--color-accent) opacity-30" />
      </div>

      {/* Bento Grid */}
      <div
        ref={gridRef}
        className="mx-auto grid max-w-300 gap-4 max-md:grid-cols-1"
        style={{
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        {services.map((service, i) => {
          const Icon = service.icon;
          const isHovered = hoveredIndex === i;

          return (
            <div
              key={service.num}
              className="svc-card group relative overflow-hidden"
              style={{
                gridColumn: service.size === "wide" ? "span 2" : undefined,
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Hover highlight — slides behind content */}
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={{
                  opacity: isHovered ? 1 : 0,
                  background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(124,92,252,0.06), transparent 60%)",
                }}
              />

              {/* Gradient border effect */}
              <div
                className="absolute inset-0 rounded-none transition-opacity duration-300"
                style={{
                  opacity: isHovered ? 1 : 0,
                  background: `linear-gradient(135deg, rgba(124,92,252,0.15), rgba(94,234,212,0.1))`,
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                  padding: 1,
                }}
              />

              {/* Card content */}
              <div
                className="relative flex h-full flex-col gap-5 border border-(--color-border) bg-(--color-bg-card) p-8 transition-all duration-300 max-md:p-6"
                style={{
                  borderColor: isHovered ? "rgba(124,92,252,0.2)" : undefined,
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                  if (rect) {
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    e.currentTarget.parentElement?.style.setProperty("--mouse-x", `${x}%`);
                    e.currentTarget.parentElement?.style.setProperty("--mouse-y", `${y}%`);
                  }
                }}
              >
                {/* Top row: number + icon */}
                <div className="flex items-center justify-between">
                  <div
                    className="svc-icon flex h-12 w-12 items-center justify-center border border-(--color-border) transition-all duration-300"
                    style={{
                      borderColor: isHovered ? "var(--color-accent)" : undefined,
                      boxShadow: isHovered ? "0 0 20px rgba(124,92,252,0.15)" : "none",
                    }}
                  >
                    <Icon
                      className="h-5 w-5 transition-colors duration-300"
                      style={{ color: isHovered ? "var(--color-accent)" : "var(--color-text-muted)" }}
                    />
                  </div>
                  <span
                    className="font-display leading-none text-(--color-text-primary) transition-opacity duration-300"
                    style={{
                      fontSize: "clamp(48px, 6vw, 72px)",
                      opacity: isHovered ? 0.06 : 0.025,
                    }}
                  >
                    {service.num}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-display tracking-[-1px] text-(--color-text-primary) transition-colors duration-300"
                  style={{
                    fontSize: "clamp(24px, 3vw, 36px)",
                    lineHeight: 1.1,
                    color: isHovered ? "var(--color-accent)" : undefined,
                  }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p className="font-body text-[15px] leading-[1.7] text-(--color-text-dim) max-w-125">
                  {service.desc}
                </p>

                {/* Tags */}
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-body text-[11px] tracking-[0.5px] px-2.5 py-1 border border-(--color-border) text-(--color-text-muted) transition-all duration-300"
                      style={{
                        borderColor: isHovered ? "rgba(124,92,252,0.15)" : undefined,
                        color: isHovered ? "var(--color-accent-secondary)" : undefined,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View All CTA */}
      <div className="mx-auto mt-12 max-w-300 flex justify-center">
        <Link
          href="/services"
          className="flex items-center gap-2 font-body text-sm font-medium text-(--color-accent) transition-all hover:gap-3"
        >
          View All Services
          <span className="text-sm">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
