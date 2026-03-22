"use client";

import {
  Globe,
  Palette,
  Layers,
  Search,
  Bot,
  ArrowUpRight,
} from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
import { useScrollReveal } from "../hooks/useScrollReveal";

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
    featured: true,
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef, ".bento-card", 100);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="snap-section w-full px-16 py-[100px] max-md:px-6 max-md:py-16"
    >
      {/* Header — left-aligned with accent line */}
      <div className="mb-14 flex flex-col gap-4">
        <span className="font-body text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
          01 / SERVICES
        </span>
        <div className="flex items-end justify-between max-md:flex-col max-md:items-start max-md:gap-4">
          <h2 className="font-display text-5xl tracking-[-1px] text-[var(--color-text-primary)]">
            What I do
          </h2>
          <p className="w-[400px] text-right font-body text-base leading-[1.6] text-[var(--color-text-dim)] max-md:w-full max-md:text-left">
            End-to-end digital solutions tailored for
            freelancers, startups and growing businesses.
          </p>
        </div>
        <div className="mt-2 h-px w-[200px] bg-[var(--color-accent)] opacity-30" />
      </div>

      {/* Bento Grid */}
      <div
        className="grid gap-5 max-md:flex max-md:flex-col"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "auto auto",
          gridTemplateAreas: `
            "a a b"
            "c d e"
          `,
        }}
      >
        {services.map((s, i) => {
          const areas = ["a", "b", "c", "d", "e"];
          return (
            <BentoCard
              key={s.num}
              {...s}
              area={areas[i]}
              index={i}
            />
          );
        })}
      </div>
    </section>
  );
}

function BentoCard({
  num,
  icon: Icon,
  title,
  desc,
  featured,
  area,
  index,
}: {
  num: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  featured?: boolean;
  area: string;
  index: number;
}) {
  const isLarge = area === "a";
  const isTall = area === "b";

  return (
    <Link
      href="/services"
      className={`bento-card group relative flex flex-col justify-between overflow-hidden border p-9 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] max-md:p-7 ${
        featured
          ? "border-[var(--color-accent-border)] bg-gradient-to-br from-[var(--color-accent)] to-[#5B3FCC] hover:shadow-[0_0_40px_#7C5CFC20]"
          : "border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-accent-border)]"
      } ${isLarge ? "hover:shadow-[0_0_40px_#7C5CFC10]" : ""} ${
        isTall ? "" : "hover:-translate-y-1"
      }`}
      style={{
        gridArea: area,
        minHeight: isTall ? "100%" : isLarge ? "280px" : "260px",
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Watermark number */}
      <span
        className={`absolute right-6 top-4 font-display text-[120px] leading-none max-md:text-[80px] ${
          featured ? "text-white opacity-[0.08]" : "text-[#1A1826] opacity-100"
        }`}
      >
        {num}
      </span>

      <div
        className={`flex h-12 w-12 items-center justify-center ${
          featured
            ? "bg-white/10"
            : "bg-[var(--color-grid)]"
        }`}
      >
        <Icon
          className={`h-[22px] w-[22px] ${
            featured ? "text-white" : "text-[var(--color-accent)]"
          }`}
        />
      </div>

      <div className="relative z-10 mt-auto flex flex-col gap-2.5">
        <h3
          className={`font-body text-xl font-semibold ${
            featured ? "text-white" : "text-[var(--color-text-primary)]"
          }`}
        >
          {title}
        </h3>
        <p
          className={`font-body text-sm leading-[1.6] ${
            featured ? "text-white opacity-70" : "text-[var(--color-text-dim)]"
          } ${isLarge ? "max-w-[400px]" : ""}`}
        >
          {desc}
        </p>
      </div>

      <ArrowUpRight
        className={`absolute bottom-8 right-8 h-[18px] w-[18px] transition-all duration-300 group-hover:rotate-45 max-md:bottom-6 max-md:right-6 ${
          featured
            ? "text-white"
            : "text-[var(--color-text-faint)] group-hover:text-[var(--color-accent)]"
        }`}
      />
    </Link>
  );
}
