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
    title: "AI Tools & Chatbots",
    desc: "Custom AI chatbots, automation workflows and intelligent tools that scale your business while you sleep.",
    featured: true,
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef, ".service-card", 120);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="snap-section w-full px-16 py-[100px] max-md:px-6 max-md:py-16"
    >
      {/* Header */}
      <div className="mb-14 flex w-full items-end justify-between max-md:flex-col max-md:items-start max-md:gap-4">
        <div className="flex flex-col gap-4">
          <span className="font-inter text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
            01 / SERVICES
          </span>
          <h2 className="font-space-grotesk text-5xl font-bold tracking-[-1px] text-white">
            What we do
          </h2>
        </div>
        <p className="w-[400px] text-right font-inter text-base leading-[1.6] text-[var(--color-text-dim)] max-md:w-full max-md:text-left">
          End-to-end digital solutions tailored for
          <br />
          freelancers, startups and growing businesses.
        </p>
      </div>

      {/* Cards grid */}
      <div className="flex flex-col gap-5">
        {/* Row 1 */}
        <div className="flex gap-5 max-md:flex-col">
          {services.slice(0, 3).map((s) => (
            <ServiceCard key={s.num} {...s} />
          ))}
        </div>
        {/* Row 2 */}
        <div className="flex gap-5 max-md:flex-col">
          {services.slice(3).map((s) => (
            <ServiceCard key={s.num} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  num,
  icon: Icon,
  title,
  desc,
  featured,
}: {
  num: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`service-card group relative flex flex-1 flex-col justify-between gap-6 overflow-hidden border p-9 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:shadow-[0_0_30px_#7C5CFC10] ${
        featured
          ? "border-[var(--color-accent-border)] bg-gradient-to-b from-[var(--color-bg-card-alt)] to-[var(--color-bg-card)]"
          : "border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-accent-border)]"
      }`}
    >
      <span className="font-poppins text-[72px] font-extralight leading-none text-[#1A1A1D] max-md:text-[48px]">
        {num}
      </span>

      <div
        className={`flex h-12 w-12 items-center justify-center ${
          featured
            ? "bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)]"
            : "bg-[var(--color-grid)]"
        }`}
      >
        <Icon
          className={`h-[22px] w-[22px] ${
            featured ? "text-[#0C0B10]" : "text-[var(--color-accent)]"
          }`}
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <h3 className="font-inter text-xl font-semibold text-white">{title}</h3>
        <p className="font-inter text-sm leading-[1.6] text-[var(--color-text-dim)]">
          {desc}
        </p>
      </div>

      <ArrowUpRight
        className={`h-[18px] w-[18px] transition-all duration-300 group-hover:rotate-45 ${
          featured
            ? "text-[var(--color-accent)]"
            : "text-[#3A3A3E] group-hover:text-[var(--color-accent)]"
        }`}
      />
    </div>
  );
}
