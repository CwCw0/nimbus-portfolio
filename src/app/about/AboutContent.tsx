"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CustomCursor from "../../components/CustomCursor";
import SmoothScroll from "../../components/SmoothScroll";
import { ArrowUpRight, Code, Palette, Server, Bot, HeartPulse, CheckSquare, Gamepad2 } from "lucide-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: "Pulse",
    desc: "Health & wellness dashboard aggregating wearable data from Apple Watch, Fitbit, Garmin, and Oura Ring into one calm, actionable view.",
    href: "https://pulse-khaki-nine.vercel.app",
    accent: "#E91E8C",
    accentDim: "#E91E8C14",
    icon: HeartPulse,
    tags: ["Next.js", "Recharts", "Healthtech"],
  },
  {
    name: "Kōji",
    desc: "Keyboard-first productivity platform — Brain Dump, kanban, notes, focus timer. Built around how you actually think, not how productivity gurus say you should.",
    href: "https://koji-seven.vercel.app",
    accent: "#7C5CFC",
    accentDim: "#7C5CFC14",
    icon: CheckSquare,
    tags: ["Next.js", "localStorage", "Productivity"],
  },
  {
    name: "Voidframe",
    desc: "Gaming community platform with real-time chat, squad management, events, and tournament tooling. Built for how gamers actually coordinate.",
    href: "https://voidframe-three.vercel.app",
    accent: "#7C3AED",
    accentDim: "#7C3AED14",
    icon: Gamepad2,
    tags: ["Next.js", "TypeScript", "Gaming"],
  },
];

const skills = [
  { icon: Code, title: "Frontend Development", desc: "HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind, Swift, Flutter. Building responsive, polished interfaces across web and mobile." },
  { icon: Palette, title: "UI/UX & Design", desc: "Studying what makes products intuitive. From wireframes to finished designs — always thinking about the user." },
  { icon: Server, title: "Backend & Systems", desc: "Python, Node.js, .NET, databases, APIs. Full-stack development with solid foundations and scalable architecture." },
  { icon: Bot, title: "AI, LLMs & Agents", desc: "Building with large language models, autonomous agents, and AI-powered automation. Custom chatbots, intelligent workflows, and tool-use integrations." },
];

const values = [
  { num: "01", title: "Build, Don't Just Code", desc: "I think beyond the code. What's the product? Who's the user? What makes it worth building? That's where I start." },
  { num: "02", title: "Learn Everything", desc: "Frontend, backend, design, marketing, business. I don't box myself in. Understanding the full picture makes better products." },
  { num: "03", title: "Ship & Iterate", desc: "I believe in putting work out there, learning from it, and making it better. Progress beats perfection." },
  { num: "04", title: "Stay Curious", desc: "From healthtech to gaming to journalling apps — I follow what interests me and build across niches." },
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

    // Hero heading split reveal
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

    // Hero subtext fade
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

    // Story section reveal
    const story = storyRef.current;
    if (story && !prefersReducedMotion) {
      const ctx = gsap.context(() => {
        const items = story.querySelectorAll(".story-reveal");
        gsap.set(items, { opacity: 0, y: 40 });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: story,
            start: "top 75%",
            once: true,
          },
        });

        // Count-up for stat numbers
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
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                once: true,
              },
              onUpdate: function () {
                el.textContent = Math.round(parseFloat(el.textContent || "0")) + (isPlus ? "+" : "");
              },
            }
          );
        });
      }, story);
      cleanups.push(() => ctx.revert());
    }

    // Skills cards stagger
    const skillsEl = skillsRef.current;
    if (skillsEl && !prefersReducedMotion) {
      const ctx = gsap.context(() => {
        const cards = skillsEl.querySelectorAll(".skill-card");
        gsap.set(cards, { opacity: 0, y: 50 });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillsEl,
            start: "top 75%",
            once: true,
          },
        });
      }, skillsEl);
      cleanups.push(() => ctx.revert());
    }

    // Values cards stagger
    const valuesEl = valuesRef.current;
    if (valuesEl && !prefersReducedMotion) {
      const ctx = gsap.context(() => {
        const cards = valuesEl.querySelectorAll(".value-card");
        gsap.set(cards, { opacity: 0, y: 50 });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: valuesEl,
            start: "top 75%",
            once: true,
          },
        });
      }, valuesEl);
      cleanups.push(() => ctx.revert());
    }

    // Products stagger
    const productsEl = productsRef.current;
    if (productsEl && !prefersReducedMotion) {
      const ctx = gsap.context(() => {
        const cards = productsEl.querySelectorAll(".product-card");
        gsap.set(cards, { opacity: 0, y: 50 });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: productsEl,
            start: "top 75%",
            once: true,
          },
        });
      }, productsEl);
      cleanups.push(() => ctx.revert());
    }

    // CTA reveal
    const ctaEl = ctaRef.current;
    if (ctaEl && !prefersReducedMotion) {
      const ctx = gsap.context(() => {
        gsap.from(ctaEl, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaEl,
            start: "top 80%",
            once: true,
          },
        });
      }, ctaEl);
      cleanups.push(() => ctx.revert());
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <CustomCursor />
      <SmoothScroll>
      <main id="main-content" className="flex w-full flex-col overflow-x-hidden bg-[var(--color-bg-primary)]">
        <Header />

        {/* Hero — Full viewport, monumental */}
        <section
          ref={heroRef}
          className="relative flex min-h-screen w-full flex-col items-center justify-center px-16 pt-24 pb-20 max-md:px-6 max-md:pt-20 max-md:pb-12"
        >
          {/* Ghost watermark */}
          <span
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[var(--color-text-primary)]"
            style={{ fontSize: "clamp(100px, 18vw, 300px)", opacity: 0.02, letterSpacing: "0.1em" }}
          >
            ABOUT
          </span>

          <div className="relative z-10 flex flex-col items-center gap-8 text-center">
            <span className="hero-fade font-body text-[11px] font-medium tracking-[4px] text-[var(--color-accent)]">
              ABOUT ME
            </span>
            <h1
              ref={headingRef}
              className="font-display tracking-[-2px] text-[var(--color-text-primary)]"
              style={{ fontSize: "clamp(40px, 8vw, 120px)", lineHeight: 1.05 }}
            >
              Not just code.
            </h1>
            <p
              className="hero-fade max-w-[600px] font-body text-lg leading-[1.7] text-[var(--color-text-dim)] max-md:text-base"
            >
              Founder of Nimbus. I build websites, branding, and AI tools for clients — and ship my own products when I spot gaps worth solving. Code, design, systems, business. I study and build all of it.
            </p>
          </div>
        </section>

        {/* Story — Dramatic split layout */}
        <section ref={storyRef} className="w-full bg-[#0D0C14] px-16 py-32 max-md:px-6 max-md:py-16">
          <div className="mx-auto flex max-w-[1100px] gap-20 max-md:flex-col max-md:gap-10">
            {/* Story text */}
            <div className="flex flex-1 flex-col gap-8">
              <span className="story-reveal font-body text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
                MY STORY
              </span>
              <h2
                className="story-reveal font-display tracking-[-1px] text-[var(--color-text-primary)]"
                style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
              >
                How I got here
              </h2>
              <div className="flex flex-col gap-5">
                <p className="story-reveal font-body text-base leading-[1.8] text-[var(--color-text-dim)]">
                  I picked up coding out of pure curiosity — and it clicked. What started as tinkering with HTML and CSS turned into a deep obsession with building things. The drive to create and connect found a home in tech.
                </p>
                <p className="story-reveal font-body text-base leading-[1.8] text-[var(--color-text-dim)]">
                  I&apos;ve always been obsessed with understanding the full picture. Not just how to write code, but what makes a product good, a website effective, and an application worth using. I study frontend, backend, UI/UX, marketing, and business — because building something great takes all of it.
                </p>
                <p className="story-reveal font-body text-base leading-[1.8] text-[var(--color-text-dim)]">
                  Now I&apos;m building across different niches — from healthtech to productivity apps to gaming. Always reading, always shipping, always learning.
                </p>
              </div>
            </div>

            {/* Avatar + Stats */}
            <div className="flex w-[400px] flex-col gap-6 max-md:w-full">
              <div className="story-reveal flex h-[280px] items-center justify-center overflow-hidden border border-[var(--color-border)] bg-gradient-to-br from-[#7C5CFC15] to-[#7C5CFC05] relative">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #7C5CFC 1px, transparent 0)", backgroundSize: "24px 24px" }} />
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)]">
                  <span className="font-display text-[42px] text-white">D</span>
                </div>
              </div>

              {/* Stats — large numbers */}
              <div className="story-reveal flex gap-4">
                <div className="flex flex-1 flex-col gap-1 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
                  <span
                    className="stat-num font-display tracking-[-1px] text-[var(--color-text-primary)]"
                    data-target="4+"
                    style={{ fontSize: "clamp(32px, 3vw, 48px)" }}
                  >
                    0+
                  </span>
                  <span className="font-body text-xs text-[var(--color-text-dim)]">Projects</span>
                </div>
                <div className="flex flex-1 flex-col gap-1 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
                  <span
                    className="stat-num font-display tracking-[-1px] text-[var(--color-accent)]"
                    data-target="3"
                    style={{ fontSize: "clamp(32px, 3vw, 48px)" }}
                  >
                    0
                  </span>
                  <span className="font-body text-xs text-[var(--color-text-dim)]">Products building</span>
                </div>
                <div className="flex flex-1 flex-col gap-1 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
                  <span
                    className="font-display tracking-[-1px] text-[var(--color-text-primary)]"
                    style={{ fontSize: "clamp(32px, 3vw, 48px)" }}
                  >
                    24/7
                  </span>
                  <span className="font-body text-xs text-[var(--color-text-dim)]">Building</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section ref={skillsRef} className="w-full px-16 py-32 max-md:px-6 max-md:py-16">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-16 flex flex-col items-center gap-4 text-center max-md:mb-10 max-md:items-start max-md:text-left">
              <span className="font-body text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
                SKILLS & EXPERTISE
              </span>
              <h2
                className="font-display tracking-[-1px] text-[var(--color-text-primary)]"
                style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
              >
                What I bring to the table
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
              {skills.map((skill) => (
                <div key={skill.title} className="skill-card flex flex-col gap-5 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-border)]">
                  <div className="flex h-12 w-12 items-center justify-center bg-[var(--color-grid)]">
                    <skill.icon className="h-[22px] w-[22px] text-[var(--color-accent)]" />
                  </div>
                  <h3 className="font-body text-lg font-semibold text-[var(--color-text-primary)]">{skill.title}</h3>
                  <p className="font-body text-sm leading-[1.7] text-[var(--color-text-dim)]">{skill.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section ref={valuesRef} className="w-full bg-[var(--color-bg-secondary)] px-16 py-32 max-md:px-6 max-md:py-16">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-16 flex flex-col items-center gap-4 text-center max-md:mb-10 max-md:items-start max-md:text-left">
              <span className="font-body text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
                VALUES
              </span>
              <h2
                className="font-display tracking-[-1px] text-[var(--color-text-primary)]"
                style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
              >
                How I work
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
              {values.map((value) => (
                <div key={value.num} className="value-card flex flex-col gap-4 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-border)]">
                  <span
                    className="font-display text-[var(--color-accent)] opacity-10"
                    style={{ fontSize: "clamp(48px, 5vw, 72px)", lineHeight: 1 }}
                  >
                    {value.num}
                  </span>
                  <h3 className="font-body text-lg font-semibold text-[var(--color-text-primary)]">{value.title}</h3>
                  <p className="font-body text-sm leading-[1.7] text-[var(--color-text-dim)]">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Studio */}
        <section ref={productsRef} className="w-full px-16 py-32 max-md:px-6 max-md:py-16">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-16 flex flex-col items-center gap-4 text-center max-md:mb-10 max-md:items-start max-md:text-left">
              <span className="font-body text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
                THE STUDIO
              </span>
              <h2
                className="font-display tracking-[-1px] text-[var(--color-text-primary)]"
                style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
              >
                What I&apos;m building
              </h2>
              <p className="max-w-[600px] font-body text-base leading-[1.8] text-[var(--color-text-dim)]">
                Alongside client work, I build my own products — not because someone paid me to, but because I saw gaps worth solving. Not mockups, not templates. Full products, built from scratch.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-1">
              {products.map((product) => (
                <a
                  key={product.name}
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="product-card group flex flex-col border border-[var(--color-border)] bg-[var(--color-bg-card)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-border)] hover:shadow-[0_0_30px_#7C5CFC10]"
                >
                  <div
                    className="relative flex h-[140px] items-center justify-center overflow-hidden"
                    style={{ background: `radial-gradient(ellipse at 50% 80%, ${product.accentDim} 0%, transparent 70%), var(--color-bg-primary)` }}
                  >
                    <div
                      className="absolute inset-0 opacity-[0.03]"
                      style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "20px 20px" }}
                    />
                    <div className="relative flex flex-col items-center gap-3">
                      <div
                        className="flex h-12 w-12 items-center justify-center"
                        style={{ background: product.accentDim, border: `1px solid ${product.accent}30` }}
                      >
                        <product.icon className="h-6 w-6" style={{ color: product.accent }} />
                      </div>
                      <span className="font-display text-base text-[var(--color-text-primary)]">{product.name}</span>
                    </div>
                    <span className="absolute top-3 right-3 border border-amber-500/25 bg-amber-500/15 px-2.5 py-1 font-body text-[10px] font-semibold tracking-[1px] text-amber-400">
                      IN DEVELOPMENT
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-5">
                    <p className="font-body text-[13px] leading-[1.7] text-[var(--color-text-dim)]">{product.desc}</p>
                    <div className="mt-auto flex flex-wrap gap-1.5 border-t border-[var(--color-border)] pt-4">
                      {product.tags.map((tag) => (
                        <span key={tag} className="bg-[var(--color-accent-subtle)] px-2 py-0.5 font-body text-[10px] font-medium text-[var(--color-accent)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="flex items-center gap-1.5 font-body text-xs font-medium text-[var(--color-accent)] transition-all group-hover:gap-2.5">
                      Explore preview
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section ref={ctaRef} className="relative w-full px-16 py-32 max-md:px-6 max-md:py-16">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full opacity-60" style={{ background: "radial-gradient(circle, #7C5CFC12 0%, transparent 100%)" }} />
          <div className="relative z-10 flex flex-col items-center gap-8">
            <h2
              className="font-display tracking-[-2px] text-[var(--color-text-primary)] text-center"
              style={{ fontSize: "clamp(32px, 5vw, 72px)" }}
            >
              Let&apos;s build something.
            </h2>
            <p className="max-w-[500px] text-center font-body text-lg text-[var(--color-text-dim)] max-md:text-base">
              Always open to collaborating on interesting projects and new opportunities.
            </p>
            <a href="https://calendly.com/heyitsnimbus/30min" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)] px-9 py-[18px] font-body text-base font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_24px_#7C5CFC20]">
              Get in Touch
              <ArrowUpRight className="h-[18px] w-[18px]" />
            </a>
          </div>
        </section>

        <Footer />
      </main>
      </SmoothScroll>
    </>
  );
}
