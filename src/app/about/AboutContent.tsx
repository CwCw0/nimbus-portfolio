"use client";

import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CustomCursor from "../../components/CustomCursor";
import SmoothScroll from "../../components/SmoothScroll";
import WaterRipple from "../../components/WaterRipple";
import { ArrowUpRight, Code, Palette, Server, Bot } from "lucide-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { products as catalogue, statusLabel } from "../../data/products";

gsap.registerPlugin(ScrollTrigger);

const studioIndex = [...catalogue].sort(
  (a, b) => (a.order ?? 99) - (b.order ?? 99)
);
const liveCount = studioIndex.filter((p) => p.status === "live").length;
const buildCount = studioIndex.filter((p) => p.status === "in-development").length;

const skills = [
  {
    icon: Code,
    title: "Frontend Development",
    stack: "React · Next.js · TypeScript · Tailwind · Swift · Flutter",
    desc: "Building responsive, polished interfaces across web and mobile. I care deeply about motion, hierarchy, and making things feel right.",
  },
  {
    icon: Palette,
    title: "UI/UX & Design",
    stack: "Figma · Editorial Design · Motion",
    desc: "From wireframes to finished design systems — always starting from the user. Design isn't decoration, it's how something works.",
  },
  {
    icon: Server,
    title: "Backend & Systems",
    stack: "Python · Node.js · .NET · Supabase · REST APIs",
    desc: "Full-stack foundations — databases, auth, APIs, and scalable architecture. I build the full system, not just the pretty part.",
  },
  {
    icon: Bot,
    title: "AI, LLMs & Agents",
    stack: "Claude · GPT · LangChain · Tool-use · Automation",
    desc: "Building with large language models, autonomous agents, and AI-powered workflows. Custom chatbots, intelligent pipelines, tool-use integrations.",
  },
];

const values = [
  {
    num: "01",
    title: "Build, Don't Just Code",
    desc: "I think beyond the code. What's the product? Who's the user? What makes it worth building? That's where I start.",
  },
  {
    num: "02",
    title: "Learn Everything",
    desc: "Frontend, backend, design, marketing, business. I don't box myself in. Understanding the full picture makes better products.",
  },
  {
    num: "03",
    title: "Ship & Iterate",
    desc: "I believe in putting work out there, learning from it, and making it better. Progress beats perfection every time.",
  },
  {
    num: "04",
    title: "Stay Curious",
    desc: "From healthtech to gaming to journalling apps — I follow what interests me and build across niches without apology.",
  },
];

const identityRows = [
  { label: "ROLE", value: "Full-Stack Dev & Designer" },
  { label: "LOCATION", value: "Malaysia" },
  { label: "STACK", value: "Next.js · TypeScript · Tailwind" },
  { label: "STATUS", value: "Open to projects" },
  { label: "BUILDING", value: `${buildCount} active in the lab` },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const cleanups: (() => void)[] = [];

    const heading = headingRef.current;
    if (heading) {
      const split = new SplitType(heading, { types: "chars" });
      if (prefersReducedMotion) {
        gsap.set(split.chars || [], { opacity: 1, y: 0 });
      } else {
        gsap.set(split.chars || [], { opacity: 0, y: 50 });
        gsap.to(split.chars || [], {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.02,
          ease: "power3.out",
          delay: 0.3,
        });
      }
      cleanups.push(() => split.revert());
    }

    const hero = heroRef.current;
    if (hero && !prefersReducedMotion) {
      const subs = hero.querySelectorAll(".hero-fade");
      gsap.set(subs, { opacity: 0, y: 30 });
      gsap.to(subs, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.6,
      });
    }

    const story = storyRef.current;
    if (story && !prefersReducedMotion) {
      const ctx = gsap.context(() => {
        const items = story.querySelectorAll(".story-reveal");
        gsap.set(items, { opacity: 0, y: 40 });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: story, start: "top 75%", once: true },
        });
        const stats = story.querySelectorAll(".stat-num");
        stats.forEach((stat) => {
          const el = stat as HTMLElement;
          const target = el.dataset.target || "0";
          const isPlus = target.includes("+");
          const num = parseInt(target.replace(/[^0-9]/g, ""), 10);
          gsap.fromTo(
            el,
            { textContent: "0" },
            {
              textContent: num,
              duration: 1.5,
              ease: "power2.out",
              snap: { textContent: 1 },
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
              onUpdate: function () {
                el.textContent =
                  Math.round(parseFloat(el.textContent || "0")) +
                  (isPlus ? "+" : "");
              },
            }
          );
        });
      }, story);
      cleanups.push(() => ctx.revert());
    }

    const skillsEl = skillsRef.current;
    if (skillsEl && !prefersReducedMotion) {
      const ctx = gsap.context(() => {
        const rows = skillsEl.querySelectorAll(".skill-row");
        gsap.set(rows, { opacity: 0, x: -20 });
        gsap.to(rows, {
          opacity: 1,
          x: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: skillsEl, start: "top 75%", once: true },
        });
      }, skillsEl);
      cleanups.push(() => ctx.revert());
    }

    const valuesEl = valuesRef.current;
    if (valuesEl && !prefersReducedMotion) {
      const ctx = gsap.context(() => {
        const cards = valuesEl.querySelectorAll(".value-card");
        gsap.set(cards, { opacity: 0, y: 40 });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: valuesEl, start: "top 75%", once: true },
        });
      }, valuesEl);
      cleanups.push(() => ctx.revert());
    }

    const productsEl = productsRef.current;
    if (productsEl && !prefersReducedMotion) {
      const ctx = gsap.context(() => {
        const lines = productsEl.querySelectorAll(".studio-line");
        gsap.set(lines, { opacity: 0, y: 30 });
        gsap.to(lines, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: productsEl, start: "top 75%", once: true },
        });
      }, productsEl);
      cleanups.push(() => ctx.revert());
    }

    const ctaEl = ctaRef.current;
    if (ctaEl && !prefersReducedMotion) {
      const ctx = gsap.context(() => {
        gsap.from(ctaEl, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ctaEl, start: "top 80%", once: true },
        });
      }, ctaEl);
      cleanups.push(() => ctx.revert());
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <CustomCursor />
      <WaterRipple />
      <SmoothScroll>
        <main
          id="main-content"
          className="flex w-full flex-col overflow-x-hidden bg-(--color-bg-primary)"
        >
          <Header />

          {/* ── Hero ──────────────────────────────────────────────────── */}
          <section
            ref={heroRef}
            className="relative flex min-h-screen w-full flex-col items-center justify-center px-16 pt-24 pb-20 max-md:px-6 max-md:pt-20 max-md:pb-12"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-(--color-text-primary)"
              style={{ fontSize: "clamp(100px, 18vw, 300px)", opacity: 0.02, letterSpacing: "0.1em" }}
            >
              ABOUT
            </span>
            <div className="relative z-10 flex flex-col items-center gap-8 text-center">
              <span className="hero-fade font-body text-[11px] font-medium tracking-[4px] text-(--color-accent)">
                ABOUT ME
              </span>
              <h1
                ref={headingRef}
                className="font-display tracking-[-2px] text-(--color-text-primary)"
                style={{ fontSize: "clamp(40px, 8vw, 120px)", lineHeight: 1.05 }}
              >
                Not just code.
              </h1>
              <p className="hero-fade max-w-145 font-body text-lg leading-[1.75] text-(--color-text-dim) max-md:text-base">
                Founder of Nimbus Forma Studio. I build websites, visual design,
                and AI tools for clients — and ship my own products when I spot
                gaps worth solving. Code, design, systems, business. I study and
                build all of it.
              </p>
            </div>
          </section>

          {/* ── Story ─────────────────────────────────────────────────── */}
          <section
            ref={storyRef}
            className="w-full bg-[#0D0C14] px-16 py-32 max-md:px-6 max-md:py-16"
          >
            <div className="mx-auto flex max-w-275 gap-20 max-lg:flex-col max-lg:gap-12">

              {/* Narrative */}
              <div className="flex flex-1 flex-col gap-8">
                <span className="story-reveal font-body text-[11px] font-medium tracking-[3px] text-(--color-accent)">
                  MY STORY
                </span>
                <h2
                  className="story-reveal font-display tracking-[-1px] text-(--color-text-primary)"
                  style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
                >
                  How I got here
                </h2>
                <div className="flex flex-col gap-5">
                  <p className="story-reveal font-body text-[15px] leading-[1.85] text-(--color-text-dim)">
                    I picked up coding out of pure curiosity — and it clicked.
                    What started as tinkering with HTML and CSS turned into a
                    deep obsession with building things. The drive to create
                    and connect found a home in tech.
                  </p>
                  <p className="story-reveal font-body text-[15px] leading-[1.85] text-(--color-text-dim)">
                    I&apos;ve always been obsessed with understanding the full
                    picture. Not just how to write code, but what makes a
                    product good, a website effective, and an application worth
                    using. Frontend, backend, UI/UX, marketing, business —
                    because building something great takes all of it.
                  </p>
                  <p className="story-reveal font-body text-[15px] leading-[1.85] text-(--color-text-dim)">
                    Now I&apos;m building across different niches — from
                    healthtech to productivity apps to gaming. Always reading,
                    always shipping, always learning.
                  </p>
                </div>
              </div>

              {/* Identity column */}
              <div className="flex w-90 flex-col gap-4 max-lg:w-full">

                {/* Stats */}
                <div className="story-reveal grid grid-cols-3 gap-3 max-md:gap-2">
                  {[
                    { target: studioIndex.length.toString(), label: "Products", accent: false },
                    { target: buildCount.toString(), label: "In build", accent: true },
                    { target: liveCount.toString(), label: "Live now", accent: false },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="flex flex-col gap-1.5 border border-(--color-border) bg-(--color-bg-card) p-4"
                    >
                      <span
                        className={`stat-num font-display tracking-[-1px] ${s.accent ? "text-(--color-accent)" : "text-(--color-text-primary)"}`}
                        data-target={s.target}
                        style={{ fontSize: "clamp(26px, 2.2vw, 38px)" }}
                      >
                        0
                      </span>
                      <span className="font-body text-[11px] text-(--color-text-dim)">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Editorial identity card */}
                <div className="story-reveal flex flex-col divide-y divide-(--color-border) border border-(--color-border) bg-(--color-bg-card)">
                  {/* Name row */}
                  <div className="flex items-center gap-3.5 px-5 py-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-(--color-accent) to-(--color-accent-light)">
                      <span className="font-body text-sm font-bold text-white">D</span>
                    </div>
                    <div>
                      <span className="block font-body text-[14px] font-semibold text-(--color-text-primary)">
                        Dee
                      </span>
                      <span className="block font-body text-[11px] text-(--color-text-dim)">
                        Founder, Nimbus Forma Studio
                      </span>
                    </div>
                  </div>
                  {/* Data rows */}
                  {identityRows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between gap-4 px-5 py-3"
                    >
                      <span className="font-body text-[10px] tracking-[2px] text-(--color-text-subtle)">
                        {row.label}
                      </span>
                      <span className="font-body text-[12px] text-right text-(--color-text-secondary)">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── Skills — editorial horizontal list ────────────────────── */}
          <section
            ref={skillsRef}
            className="w-full px-16 py-32 max-md:px-6 max-md:py-16"
          >
            <div className="mx-auto max-w-275">
              <div className="mb-14 flex items-end justify-between gap-8 max-md:mb-10 max-md:flex-col max-md:items-start max-md:gap-3">
                <div className="flex flex-col gap-3">
                  <span className="font-body text-[11px] font-medium tracking-[3px] text-(--color-accent)">
                    SKILLS & EXPERTISE
                  </span>
                  <h2
                    className="font-display tracking-[-1px] text-(--color-text-primary)"
                    style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
                  >
                    What I bring to the table
                  </h2>
                </div>
                <span className="shrink-0 font-body text-[11px] tracking-[2px] text-(--color-text-subtle)">
                  {skills.length} DISCIPLINES
                </span>
              </div>

              {/* Horizontal rows — editorial list style */}
              <div className="flex flex-col border-t border-(--color-border)">
                {skills.map((skill, i) => (
                  <div
                    key={skill.title}
                    className="skill-row group flex items-start gap-8 border-b border-(--color-border) py-9 transition-[padding] duration-500 hover:pl-4 max-md:flex-col max-md:gap-4 max-md:py-7"
                  >
                    {/* Index */}
                    <span className="mt-1 shrink-0 font-mono text-[11px] text-(--color-text-subtle) min-w-7">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Icon square */}
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center bg-(--color-accent-subtle) transition-all duration-500 group-hover:bg-(--color-accent)">
                      <skill.icon className="h-4.5 w-4.5 text-(--color-accent) transition-colors duration-500 group-hover:text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col gap-2">
                      <h3 className="font-body text-[15px] font-semibold text-(--color-text-primary)">
                        {skill.title}
                      </h3>
                      <p className="font-body text-[13px] leading-[1.75] text-(--color-text-dim)">
                        {skill.desc}
                      </p>
                    </div>

                    {/* Stack — right, desktop only */}
                    <span className="hidden shrink-0 max-w-52.5 text-right font-body text-[11px] leading-[1.6] text-(--color-text-subtle) lg:block">
                      {skill.stack}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Values ────────────────────────────────────────────────── */}
          <section
            ref={valuesRef}
            className="w-full bg-(--color-bg-secondary) px-16 py-32 max-md:px-6 max-md:py-16"
          >
            <div className="mx-auto max-w-275">
              <div className="mb-14 flex flex-col gap-3 max-md:mb-10">
                <span className="font-body text-[11px] font-medium tracking-[3px] text-(--color-accent)">
                  VALUES
                </span>
                <h2
                  className="font-display tracking-[-1px] text-(--color-text-primary)"
                  style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
                >
                  How I work
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
                {values.map((value) => (
                  <div
                    key={value.num}
                    className="value-card relative flex flex-col gap-5 overflow-hidden border border-(--color-border) bg-(--color-bg-card) p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-(--color-accent-border) max-md:p-6"
                  >
                    {/* Ghost number */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute right-4 top-3 select-none font-display text-(--color-accent)"
                      style={{ fontSize: "clamp(60px, 6vw, 90px)", lineHeight: 1, opacity: 0.055 }}
                    >
                      {value.num}
                    </span>

                    {/* Numbered chip */}
                    <span className="inline-flex w-fit items-center justify-center border border-(--color-accent-border) bg-(--color-accent-subtle) px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[2px] text-(--color-accent)">
                      {value.num}
                    </span>

                    <h3 className="font-body text-[17px] font-semibold text-(--color-text-primary) max-md:text-base">
                      {value.title}
                    </h3>
                    <p className="font-body text-[13px] leading-[1.8] text-(--color-text-dim)">
                      {value.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Studio Catalogue (unchanged) ──────────────────────────── */}
          <section
            ref={productsRef}
            className="relative w-full overflow-hidden bg-[#0B0A14] px-16 py-32 max-md:px-6 max-md:py-20"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-10 top-20 select-none font-display text-(--color-text-primary)"
              style={{ fontSize: "clamp(220px, 28vw, 480px)", opacity: 0.025, letterSpacing: "-0.04em", lineHeight: 0.85 }}
            >
              {studioIndex.length.toString().padStart(2, "0")}
            </span>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: "linear-gradient(var(--color-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)",
                backgroundSize: "72px 72px",
                maskImage: "radial-gradient(ellipse at 20% 20%, black, transparent 70%)",
                WebkitMaskImage: "radial-gradient(ellipse at 20% 20%, black, transparent 70%)",
              }}
            />

            <div className="relative mx-auto max-w-300">
              <div className="mb-20 flex items-end justify-between gap-10 max-md:mb-12 max-md:flex-col max-md:items-start">
                <div className="max-w-160">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-10 bg-(--color-accent)" />
                    <span className="font-body text-[11px] font-medium tracking-[4px] text-(--color-accent)">
                      NIMBUS FORMA STUDIO · INDEX
                    </span>
                  </div>
                  <h2
                    className="mt-6 font-display tracking-[-2px] text-(--color-text-primary)"
                    style={{ fontSize: "clamp(44px, 6vw, 88px)", lineHeight: 0.95 }}
                  >
                    The full catalogue.
                  </h2>
                  <p className="mt-6 font-body text-[15px] leading-[1.8] text-(--color-text-dim) max-md:text-[14px]">
                    Nimbus Forma Studio is a one-person studio. Every product on
                    this list is something I&apos;m building or have shipped — no
                    mockups, no templates, no affiliate filler. Each line is a
                    real thing at a real stage.
                  </p>
                </div>
                <div className="flex flex-col gap-2 font-mono text-[10px] tracking-[2px] text-(--color-text-muted) uppercase">
                  <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-(--color-accent)" />Live</div>
                  <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#F5C26B]" />In build</div>
                  <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-(--color-text-muted)" />Coming soon</div>
                </div>
              </div>

              <div className="flex flex-col border-t border-(--color-border-light)">
                {studioIndex.map((product, i) => {
                  const dotColor =
                    product.status === "live"
                      ? "var(--color-accent)"
                      : product.status === "in-development"
                        ? "#F5C26B"
                        : "var(--color-text-muted)";
                  const accent = product.accent.hex;
                  return (
                    <Link
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      className="studio-line group relative flex items-baseline gap-8 border-b border-(--color-border-light) py-8 transition-[padding] duration-500 ease-out hover:pl-6 max-md:flex-col max-md:items-start max-md:gap-3 max-md:py-6 max-md:hover:pl-2"
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute left-0 top-1/2 h-0 w-0.75 -translate-y-1/2 transition-all duration-500 ease-out group-hover:h-[70%]"
                        style={{ background: accent }}
                      />
                      <span className="font-mono text-[11px] text-(--color-text-muted) min-w-7">
                        {(i + 1).toString().padStart(2, "0")}
                      </span>
                      <span
                        className="font-display italic tracking-[-1.5px] text-(--color-text-primary) transition-colors duration-500 max-md:text-[44px]"
                        style={{ fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 0.95 }}
                      >
                        <span
                          className="transition-colors duration-500 group-hover:text-(--accent-hex)"
                          style={{ ["--accent-hex" as string]: accent }}
                        >
                          {product.name}
                        </span>
                      </span>
                      <span className="hidden font-mono text-[10px] tracking-[2px] text-(--color-text-muted) uppercase lg:inline">
                        · {product.category}
                      </span>
                      <span className="hidden flex-1 md:block" />
                      <span className="hidden max-w-75 font-body text-[12px] leading-[1.6] text-(--color-text-dim) lg:block">
                        {product.tagline}
                      </span>
                      <span className="flex shrink-0 items-center gap-2 font-mono text-[10px] font-semibold tracking-[2px] text-(--color-text-muted) uppercase">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: dotColor }} />
                        {statusLabel(product.status)}
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-(--color-text-muted) transition-all duration-500 group-hover:rotate-45" />
                    </Link>
                  );
                })}
              </div>

              <div className="mt-14 flex items-end justify-between gap-10 max-md:mt-10 max-md:flex-col max-md:items-start max-md:gap-6">
                <p className="max-w-105 font-body text-[13px] leading-[1.7] text-(--color-text-dim)">
                  Every product has its own detail page on the wall —
                  screenshots, progress notes, and the story behind the idea.
                </p>
                <Link
                  href="/products"
                  className="group flex items-center gap-3 border border-(--color-border-light) bg-(--color-bg-card) px-7 py-4 font-body text-[13px] font-medium tracking-[0.5px] text-(--color-text-primary) transition-all duration-300 hover:border-(--color-accent-border) hover:bg-(--color-accent-subtle)"
                >
                  Visit the product wall
                  <ArrowUpRight className="h-4 w-4 text-(--color-accent) transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </section>

          {/* ── CTA ───────────────────────────────────────────────────── */}
          <section
            ref={ctaRef}
            className="relative w-full px-16 py-32 max-md:px-6 max-md:py-16"
          >
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-100 w-150 rounded-full"
              style={{ background: "radial-gradient(circle, #7C5CFC10 0%, transparent 100%)" }}
            />
            <div className="relative z-10 flex flex-col items-center gap-8">
              <h2
                className="text-center font-display tracking-[-2px] text-(--color-text-primary)"
                style={{ fontSize: "clamp(32px, 5vw, 72px)" }}
              >
                Let&apos;s build something.
              </h2>
              <p className="max-w-125 text-center font-body text-lg text-(--color-text-dim) max-md:text-base">
                Always open to collaborating on interesting projects and new
                opportunities.
              </p>
              <a
                href="https://calendly.com/heyitsnimbus/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-linear-to-br from-(--color-accent) to-(--color-accent-light) px-9 py-4.5 font-body text-base font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_24px_#7C5CFC20]"
              >
                Get in Touch
                <ArrowUpRight className="h-4.5 w-4.5" />
              </a>
            </div>
          </section>

          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
