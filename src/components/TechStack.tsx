"use client";

import {
  Code,
  Figma,
  Brain,
  Cloud,
  Database,
  Wind,
  TrendingUp,
  GitBranch,
} from "lucide-react";
import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const techs = [
  { icon: Code, name: "Next.js", sub: "Framework" },
  { icon: Figma, name: "Figma", sub: "Design" },
  { icon: Brain, name: "OpenAI", sub: "AI / LLMs" },
  { icon: Cloud, name: "Vercel", sub: "Hosting" },
  { icon: Database, name: "Supabase", sub: "Backend" },
  { icon: Wind, name: "Tailwind", sub: "Styling" },
  { icon: TrendingUp, name: "Analytics", sub: "SEO / Data" },
  { icon: GitBranch, name: "GitHub", sub: "Version Control" },
];

export default function TechStack() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref, ".tech-item", 80);

  return (
    <section
      ref={ref}
      className="snap-section w-full bg-[var(--color-bg-primary)] px-16 py-20 max-md:px-6 max-md:py-12"
    >
      <div className="mb-10 flex w-full items-center justify-between">
        <span className="font-poppins text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
          TOOLS &amp; TECHNOLOGIES
        </span>
        <div className="h-px flex-1 bg-[var(--color-border)] ml-6" />
      </div>

      <div className="flex w-full justify-between gap-4 max-md:grid max-md:grid-cols-4 max-md:gap-3 max-md:flex-wrap">
        {techs.map((t) => (
          <div
            key={t.name}
            className="tech-item flex flex-1 flex-col items-center gap-3 border border-[var(--color-border)] bg-[var(--color-bg-card)] px-5 py-6 opacity-0 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-border)]"
          >
            <t.icon className="h-6 w-6 text-[var(--color-accent)]" />
            <span className="font-poppins text-[13px] font-medium text-white">
              {t.name}
            </span>
            <span className="font-poppins text-[10px] text-[var(--color-text-subtle)]">
              {t.sub}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
