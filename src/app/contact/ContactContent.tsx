"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CustomCursor from "../../components/CustomCursor";
import SmoothScroll from "../../components/SmoothScroll";
import { Mail, MapPin, Clock, ArrowRight, Send, Github, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "xjgebdwg";

export default function ContactPage() {
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cleanups: (() => void)[] = [];

    // Hero heading split
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
          duration: 0.5,
          stagger: 0.02,
          ease: "power3.out",
          delay: 0.3,
        });
      }
      cleanups.push(() => split.revert());
    }

    // Hero subtext
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
        delay: 0.5,
      });
    }

    // Form reveal
    const formEl = formRef.current;
    if (formEl && !prefersReducedMotion) {
      const ctx = gsap.context(() => {
        const items = formEl.querySelectorAll(".form-reveal");
        gsap.set(items, { opacity: 0, y: 40 });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formEl,
            start: "top 80%",
            once: true,
          },
        });
      }, formEl);
      cleanups.push(() => ctx.revert());
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return;

    // Validate email format
    const email = String(data.get("email") || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitState("error");
      setTimeout(() => setSubmitState("idle"), 4000);
      return;
    }

    // Validate required fields aren't empty or excessively long
    const name = String(data.get("name") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || name.length > 200 || !message || message.length > 5000) {
      setSubmitState("error");
      setTimeout(() => setSubmitState("idle"), 4000);
      return;
    }

    setSubmitState("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSubmitState("sent");
        form.reset();
        setTimeout(() => setSubmitState("idle"), 4000);
      } else {
        setSubmitState("error");
        setTimeout(() => setSubmitState("idle"), 4000);
      }
    } catch {
      setSubmitState("error");
      setTimeout(() => setSubmitState("idle"), 4000);
    }
  };

  return (
    <>
      <CustomCursor />
      <SmoothScroll>
      <main id="main-content" className="flex w-full flex-col overflow-x-hidden bg-[var(--color-bg-primary)]">
        <Header />

        {/* Hero — Full viewport, massive heading */}
        <section
          ref={heroRef}
          className="relative flex min-h-screen w-full flex-col items-center justify-center px-16 pt-24 pb-20 max-md:px-6 max-md:pt-20 max-md:pb-12"
        >
          <span
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[var(--color-text-primary)]"
            style={{ fontSize: "clamp(80px, 16vw, 260px)", opacity: 0.02, letterSpacing: "0.1em" }}
          >
            CONTACT
          </span>

          <div className="relative z-10 flex flex-col items-center gap-8 text-center">
            <span className="hero-fade font-body text-[11px] font-medium tracking-[4px] text-[var(--color-accent)]">
              CONTACT
            </span>
            <h1
              ref={headingRef}
              className="font-display tracking-[-2px] text-[var(--color-text-primary)]"
              style={{ fontSize: "clamp(32px, 7vw, 110px)", lineHeight: 1.05 }}
            >
              Let&apos;s talk.
            </h1>
            <p className="hero-fade max-w-[550px] font-body text-lg leading-[1.7] text-[var(--color-text-dim)] max-md:text-base">
              Have a project in mind? Fill out the form below and I&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </section>

        {/* Contact Content — Centered form + sidebar */}
        <section ref={formRef} className="w-full px-16 pb-32 max-md:px-6 max-md:pb-16">
          <div className="mx-auto flex max-w-[1100px] gap-12 max-lg:flex-col">
            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="form-reveal flex flex-1 flex-col gap-6 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-10 max-md:p-6"
            >
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />

              <div className="flex gap-4 max-md:flex-col">
                <div className="flex flex-1 flex-col gap-2">
                  <label htmlFor="contact-name" className="font-body text-xs font-medium text-[var(--color-text-secondary)]">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="h-12 border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-4 font-body text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-subtle)] focus:border-[var(--color-accent-border)] focus:outline-none transition-all"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <label htmlFor="contact-email" className="font-body text-xs font-medium text-[var(--color-text-secondary)]">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="h-12 border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-4 font-body text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-subtle)] focus:border-[var(--color-accent-border)] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-subject" className="font-body text-xs font-medium text-[var(--color-text-secondary)]">
                  Subject
                </label>
                <div className="relative">
                  <select id="contact-subject" name="subject" className="h-12 w-full appearance-none border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-4 font-body text-sm text-[var(--color-text-subtle)] focus:border-[var(--color-accent-border)] focus:outline-none transition-all">
                    <option>Select a subject...</option>
                    <option>Website Design & Development</option>
                    <option>Visual Design</option>
                    <option>AI, LLMs & Agents</option>
                    <option>SEO & Growth</option>
                    <option>Other</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-subtle)]" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-budget" className="font-body text-xs font-medium text-[var(--color-text-secondary)]">
                  Budget Range
                </label>
                <div className="relative">
                  <select id="contact-budget" name="budget" className="h-12 w-full appearance-none border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-4 font-body text-sm text-[var(--color-text-subtle)] focus:border-[var(--color-accent-border)] focus:outline-none transition-all">
                    <option>Select range...</option>
                    <option>RM 1,000 – RM 3,000</option>
                    <option>RM 3,000 – RM 6,000</option>
                    <option>RM 6,000 – RM 12,000</option>
                    <option>RM 12,000+</option>
                    <option>$1k – $3k (USD)</option>
                    <option>$3k – $5k (USD)</option>
                    <option>$5k – $10k (USD)</option>
                    <option>$10k+ (USD)</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-subtle)]" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="font-body text-xs font-medium text-[var(--color-text-secondary)]">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={6}
                  name="message"
                  required
                  placeholder="Tell me about your project..."
                  className="border border-[var(--color-border)] bg-[var(--color-bg-primary)] p-4 font-body text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-subtle)] focus:border-[var(--color-accent-border)] focus:outline-none resize-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={submitState !== "idle"}
                className={`flex h-[56px] w-full items-center justify-center gap-2.5 font-body text-[15px] font-semibold text-white transition-all duration-300 ${
                  submitState === "sent"
                    ? "bg-emerald-500"
                    : submitState === "error"
                    ? "bg-red-500"
                    : "bg-gradient-to-b from-[var(--color-accent)] to-[#5B3FCC] hover:scale-[1.02] hover:shadow-[0_0_24px_#7C5CFC20]"
                } disabled:cursor-not-allowed`}
              >
                {submitState === "idle" && (
                  <>
                    Send Message
                    <Send className="h-[18px] w-[18px]" />
                  </>
                )}
                {submitState === "sending" && (
                  <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white submit-spinner" />
                )}
                {submitState === "sent" && "Message Sent \u2713"}
                {submitState === "error" && "Something went wrong \u2014 try again"}
              </button>
            </form>

            {/* Sidebar */}
            <div className="form-reveal flex w-[360px] flex-col gap-6 max-lg:w-full">
              <div className="flex flex-col gap-6 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8">
                <span className="font-body text-xs font-semibold tracking-[1px] text-[var(--color-text-primary)]">
                  DETAILS
                </span>
                <div className="flex flex-col gap-5">
                  {[
                    { icon: Mail, label: "Email", value: "heyitsnimbus@gmail.com" },
                    { icon: MapPin, label: "Location", value: "Remote — Worldwide" },
                    { icon: Clock, label: "Response", value: "Within 24 hours" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center bg-[#7C5CFC15]">
                        <item.icon className="h-[18px] w-[18px] text-[var(--color-accent)]" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-body text-[11px] text-[var(--color-text-subtle)]">{item.label}</span>
                        <span className="font-body text-sm text-[var(--color-text-secondary)]">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-5 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8">
                <span className="font-body text-xs font-semibold tracking-[1px] text-[var(--color-text-primary)]">
                  SOCIAL
                </span>
                <a
                  href="https://github.com/CwCw0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 transition-colors"
                >
                  <Github className="h-4 w-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]" />
                  <div className="flex flex-col">
                    <span className="font-body text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]">
                      GitHub
                    </span>
                    <span className="font-body text-xs text-[var(--color-text-subtle)]">
                      CwCw0
                    </span>
                  </div>
                  <ArrowRight className="ml-auto h-3.5 w-3.5 text-[var(--color-text-faint)] transition-all group-hover:translate-x-1 group-hover:text-[var(--color-accent)]" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
      </SmoothScroll>
    </>
  );
}
