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
              Not just a developer.<br />A builder.
            </h1>
            <p className="w-[600px] font-inter text-lg leading-[1.7] text-[var(--color-text-dim)] max-md:w-full max-md:text-base">
              Self-taught developer. Founder of Nimbus. I study the full picture —
              code, design, systems, product, and business — because I don&apos;t just want
              to write code. I want to build things that matter.
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
                How I got here
              </h2>
              <div className="flex flex-col gap-5">
                <p className="font-inter text-base leading-[1.8] text-[var(--color-text-dim)]">
                  I picked up coding out of pure curiosity — and it clicked. What started as tinkering with HTML and CSS turned into a deep obsession with building things. The drive to create and connect found a home in tech.
                </p>
                <p className="font-inter text-base leading-[1.8] text-[var(--color-text-dim)]">
                  I&apos;ve always been obsessed with understanding the full picture. Not just how to write code, but what makes a product good, a website effective, and an application worth using. I study frontend, backend, UI/UX, marketing, and business — because building something great takes all of it.
                </p>
                <p className="font-inter text-base leading-[1.8] text-[var(--color-text-dim)]">
                  Now I&apos;m building across different niches — from healthtech to productivity apps to gaming. Always reading, always shipping, always learning.
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
                  <span className="count-up font-inter text-[32px] font-semibold tracking-[-1px] text-white" data-target="4+">0+</span>
                  <span className="font-inter text-xs text-[var(--color-text-dim)]">Projects</span>
                </div>
                <div className="flex flex-1 flex-col gap-1 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
                  <span className="count-up font-inter text-[32px] font-semibold tracking-[-1px] text-[var(--color-accent)]" data-target="100%">0%</span>
                  <span className="font-inter text-xs text-[var(--color-text-dim)]">Self-taught</span>
                </div>
                <div className="flex flex-1 flex-col gap-1 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
                  <span className="font-inter text-[32px] font-semibold tracking-[-1px] text-white">24/7</span>
                  <span className="font-inter text-xs text-[var(--color-text-dim)]">Building</span>
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
              { icon: Code, title: "Frontend Development", desc: "HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind CSS. Building responsive, polished interfaces." },
              { icon: Palette, title: "UI/UX & Design", desc: "Studying what makes products intuitive. From wireframes to finished designs — always thinking about the user." },
              { icon: Server, title: "Backend & Systems", desc: "Node.js, databases, APIs. Learning the full stack because great products need solid foundations." },
              { icon: Bot, title: "AI & Emerging Tech", desc: "Exploring AI tools and integrations. Building smarter applications that go beyond the basics." },
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
              { num: "01", title: "Build, Don't Just Code", desc: "I think beyond the code. What's the product? Who's the user? What makes it worth building? That's where I start." },
              { num: "02", title: "Learn Everything", desc: "Frontend, backend, design, marketing, business. I don't box myself in. Understanding the full picture makes better products." },
              { num: "03", title: "Ship & Iterate", desc: "I believe in putting work out there, learning from it, and making it better. Progress beats perfection." },
              { num: "04", title: "Stay Curious", desc: "From healthtech to gaming to journalling apps — I follow what interests me and build across niches." },
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
              Let&apos;s build something.
            </h2>
            <p className="w-[500px] text-center font-inter text-lg text-[var(--color-text-dim)] max-md:w-full max-md:text-base">
              Always open to collaborating on interesting projects and new opportunities.
            </p>
            <a href="/contact" className="flex items-center gap-2.5 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)] px-9 py-[18px] font-inter text-base font-semibold text-[#0A0A0B] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_24px_#7C5CFC20]">
              Get in Touch
              <ArrowUpRight className="h-[18px] w-[18px]" />
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
