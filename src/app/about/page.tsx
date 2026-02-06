"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CustomCursor from "../../components/CustomCursor";
import { ArrowUpRight, Code, Palette, Server, Bot } from "lucide-react";
import { useRef } from "react";
import { useScrollReveal, useCountUp } from "../../hooks/useScrollReveal";

export default function AboutPage() {
  const skillsRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  useScrollReveal(skillsRef, ".skill-card", 120);
  useScrollReveal(valuesRef, ".value-card", 100);
  useCountUp(statsRef, ".count-up");

  return (
    <>
      <CustomCursor />
      <div className="flex w-full flex-col overflow-x-hidden bg-[var(--color-bg-primary)]">
        <Header />
        
        {/* About Hero */}
        <section className="snap-section relative w-full px-16 pt-[100px] pb-[80px] max-md:px-6 max-md:pt-16 max-md:pb-12">
          <div className="flex flex-col gap-6 max-w-[800px]">
            <span className="font-inter text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
              ABOUT ME
            </span>
            <h1 className="font-space-grotesk text-[56px] font-bold leading-[1.1] tracking-[-2px] text-white max-md:text-[36px]">
              Builder. Developer.<br />Problem solver.
            </h1>
            <p className="w-[600px] font-inter text-lg leading-[1.7] text-[var(--color-text-dim)] max-md:w-full max-md:text-base">
              I&apos;m a contract-based developer and designer building digital products
              that help freelancers, startups, and growing businesses succeed online.
            </p>
          </div>
        </section>

        {/* My Story */}
        <section ref={statsRef} className="snap-section w-full bg-[var(--color-bg-secondary)] px-16 py-[100px] max-md:px-6 max-md:py-16">
          <div className="flex gap-16 max-md:flex-col max-md:gap-10">
            {/* Story text */}
            <div className="flex flex-1 flex-col gap-8">
              <span className="font-inter text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
                MY STORY
              </span>
              <h2 className="font-space-grotesk text-[40px] font-bold tracking-[-1px] text-white max-md:text-3xl">
                From curiosity to craft
              </h2>
              <div className="flex flex-col gap-5">
                <p className="font-inter text-base leading-[1.8] text-[var(--color-text-dim)]">
                  I started building websites in my bedroom at 16, fascinated by the idea that a few lines of code could create something people actually use. That curiosity turned into a career spanning 7+ years of freelance and contract work.
                </p>
                <p className="font-inter text-base leading-[1.8] text-[var(--color-text-dim)]">
                  Today, I work as a part-time contract developer and designer, helping businesses build their digital presence. I specialize in high-performance websites, brand identity systems, and AI-powered tools that actually solve problems.
                </p>
                <p className="font-inter text-base leading-[1.8] text-[var(--color-text-dim)]">
                  I believe in craft over speed, honest communication, and owning the outcome. Every project I take on gets my full attention and expertise.
                </p>
              </div>
            </div>
            {/* Photo + Stats */}
            <div className="flex w-[440px] flex-col gap-6 max-md:w-full">
              {/* Photo placeholder */}
              <div className="flex h-[300px] items-center justify-center rounded-lg bg-gradient-to-br from-[#7C5CFC15] to-[#7C5CFC08] border border-[var(--color-border)]">
                <span className="font-inter text-sm tracking-[2px] text-[var(--color-text-subtle)]">PHOTO</span>
              </div>
              {/* Stats */}
              <div className="flex gap-4">
                <div className="flex flex-1 flex-col gap-1 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
                  <span className="count-up font-inter text-[32px] font-semibold tracking-[-1px] text-white" data-target="50+">0+</span>
                  <span className="font-inter text-xs text-[var(--color-text-dim)]">Projects</span>
                </div>
                <div className="flex flex-1 flex-col gap-1 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
                  <span className="count-up font-inter text-[32px] font-semibold tracking-[-1px] text-[var(--color-accent)]" data-target="7+">0+</span>
                  <span className="font-inter text-xs text-[var(--color-text-dim)]">Years</span>
                </div>
                <div className="flex flex-1 flex-col gap-1 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
                  <span className="count-up font-inter text-[32px] font-semibold tracking-[-1px] text-white" data-target="100%">0%</span>
                  <span className="font-inter text-xs text-[var(--color-text-dim)]">Satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section ref={skillsRef} className="snap-section w-full px-16 py-[100px] max-md:px-6 max-md:py-16">
          <div className="mb-14 flex flex-col gap-4">
            <span className="font-inter text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
              SKILLS & EXPERTISE
            </span>
            <h2 className="font-space-grotesk text-[40px] font-bold tracking-[-1px] text-white max-md:text-3xl">
              What I bring to the table
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
            {[
              { icon: Code, title: "Frontend Development", desc: "React, Next.js, TypeScript, Tailwind CSS. Building fast, accessible, and responsive interfaces." },
              { icon: Palette, title: "UI/UX Design", desc: "Figma, prototyping, design systems. Research-driven design that converts and delights." },
              { icon: Server, title: "Backend & APIs", desc: "Node.js, Supabase, REST/GraphQL. Scalable backends that power your applications." },
              { icon: Bot, title: "AI Integration", desc: "OpenAI, custom chatbots, automation workflows. Intelligent tools that scale your business." },
            ].map((skill) => (
              <div key={skill.title} className="skill-card flex flex-col gap-5 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 opacity-0 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-border)]">
                <div className="flex h-12 w-12 items-center justify-center bg-[var(--color-grid)]">
                  <skill.icon className="h-[22px] w-[22px] text-[var(--color-accent)]" />
                </div>
                <h3 className="font-inter text-lg font-semibold text-white">{skill.title}</h3>
                <p className="font-inter text-sm leading-[1.7] text-[var(--color-text-dim)]">{skill.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section ref={valuesRef} className="snap-section w-full bg-[var(--color-bg-secondary)] px-16 py-[100px] max-md:px-6 max-md:py-16">
          <div className="mb-14 flex flex-col gap-4">
            <span className="font-inter text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
              VALUES
            </span>
            <h2 className="font-space-grotesk text-[40px] font-bold tracking-[-1px] text-white max-md:text-3xl">
              How I work
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
            {[
              { num: "01", title: "Craft Over Speed", desc: "I'd rather ship something polished in 3 weeks than something half-baked in 3 days. Quality compounds." },
              { num: "02", title: "Honest Communication", desc: "No jargon, no hand-waving. I'll tell you what's working, what's not, and what we should do about it." },
              { num: "03", title: "Own the Outcome", desc: "I don't just write code and walk away. I care about the result and stay invested until it works." },
              { num: "04", title: "Always Learning", desc: "The web evolves fast. I stay current with tools, techniques and trends so your project benefits from the latest." },
            ].map((value) => (
              <div key={value.num} className="value-card flex flex-col gap-4 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 opacity-0 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-border)]">
                <span className="font-inter text-[48px] font-extralight leading-none text-[#1F1F23]">{value.num}</span>
                <h3 className="font-inter text-lg font-semibold text-white">{value.title}</h3>
                <p className="font-inter text-sm leading-[1.7] text-[var(--color-text-dim)]">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="snap-section relative w-full px-16 py-[100px] max-md:px-6 max-md:py-16">
          <div className="pointer-events-none absolute left-[420px] top-[50px] h-[300px] w-[500px] rounded-full opacity-80" style={{ background: "radial-gradient(circle, #7C5CFC12 0%, transparent 100%)" }} />
          <div className="relative z-10 flex flex-col items-center gap-8">
            <h2 className="font-space-grotesk text-[48px] font-bold tracking-[-2px] text-white text-center max-md:text-3xl">
              Ready to work together?
            </h2>
            <p className="w-[500px] text-center font-inter text-lg text-[var(--color-text-dim)] max-md:w-full max-md:text-base">
              I&apos;m currently available for part-time contracts and select projects.
            </p>
            <a href="/contact" className="flex items-center gap-2.5 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)] px-9 py-[18px] font-inter text-base font-semibold text-[#0A0A0B] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_24px_#7C5CFC20]">
              Start a Project
              <ArrowUpRight className="h-[18px] w-[18px]" />
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
