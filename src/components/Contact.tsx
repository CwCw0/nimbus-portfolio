"use client";

import { Mail, MapPin, Timer, ArrowRight, ChevronDown, Send } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const FORMSPREE_ID = "xjgebdwg";

export default function Contact() {
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitState("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
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
    <section
      id="contact"
      className="snap-section w-full bg-[var(--color-bg-primary)] px-16 py-[100px] max-md:px-6 max-md:py-16"
    >
      <div className="mb-14 flex flex-col gap-4">
        <span className="font-poppins text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
          GET IN TOUCH
        </span>
        <h2 className="font-poppins text-[40px] font-semibold tracking-[-1px] text-white max-md:text-[28px]">
          Let&apos;s Build Something Together
        </h2>
        <p className="w-[600px] font-poppins text-base text-[var(--color-text-muted)] max-md:w-full">
          Have a project in mind? Fill out the form below and I&apos;ll get back to you within 24 hours.
        </p>
      </div>

      <div className="flex w-full gap-12 max-md:flex-col max-md:gap-8">
        <div className="flex w-[360px] flex-col gap-8 max-md:w-full">
          <div className="flex items-center gap-4">
            <Mail className="h-5 w-5 text-[var(--color-accent)]" />
            <span className="font-poppins text-[15px] text-[var(--color-text-secondary)]">
              heyitsnimbus@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-4">
            <MapPin className="h-5 w-5 text-[var(--color-accent)]" />
            <span className="font-poppins text-[15px] text-[var(--color-text-secondary)]">
              Remote — Available Worldwide
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Timer className="h-5 w-5 text-[var(--color-accent)]" />
            <span className="font-poppins text-[15px] text-[var(--color-text-secondary)]">
              Response within 24 hours
            </span>
          </div>

          <div className="flex gap-4 pt-6">
            <Link href="https://github.com/CwCw0" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center border border-[var(--color-border)] bg-[var(--color-bg-card)] transition-all duration-200 hover:border-[var(--color-accent-border)]">
              <span className="font-inter text-xs font-medium text-[var(--color-text-muted)]">G</span>
            </Link>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-6 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-10 max-md:p-6"
        >
          <div className="flex gap-4 max-md:flex-col">
            <div className="flex flex-1 flex-col gap-2">
              <label htmlFor="hp-name" className="font-poppins text-xs font-medium text-[var(--color-text-secondary)]">Name</label>
              <input id="hp-name" type="text" name="name" required placeholder="Your name" className="h-11 border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-4 font-poppins text-sm text-white placeholder:text-[var(--color-text-subtle)] focus:border-[var(--color-accent-border)] focus:outline-none" />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <label htmlFor="hp-email" className="font-poppins text-xs font-medium text-[var(--color-text-secondary)]">Email</label>
              <input id="hp-email" type="email" name="email" required placeholder="you@example.com" className="h-11 border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-4 font-poppins text-sm text-white placeholder:text-[var(--color-text-subtle)] focus:border-[var(--color-accent-border)] focus:outline-none" />
            </div>
          </div>

          <div className="flex gap-4 max-md:flex-col">
            <div className="flex flex-1 flex-col gap-2">
              <label htmlFor="hp-project" className="font-poppins text-xs font-medium text-[var(--color-text-secondary)]">Project Type</label>
              <div className="relative">
                <select id="hp-project" name="subject" className="h-11 w-full appearance-none border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-4 pr-10 font-poppins text-sm text-[var(--color-text-subtle)] focus:border-[var(--color-accent-border)] focus:outline-none">
                  <option>Select type...</option>
                  <option>Website</option>
                  <option>Branding</option>
                  <option>UI/UX</option>
                  <option>SEO</option>
                  <option>AI Tools</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-subtle)]" />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <label htmlFor="hp-budget" className="font-poppins text-xs font-medium text-[var(--color-text-secondary)]">Budget Range</label>
              <div className="relative">
                <select id="hp-budget" name="budget" className="h-11 w-full appearance-none border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-4 pr-10 font-poppins text-sm text-[var(--color-text-subtle)] focus:border-[var(--color-accent-border)] focus:outline-none">
                  <option>Select range...</option>
                  <option>$1k - $3k</option>
                  <option>$3k - $5k</option>
                  <option>$5k - $10k</option>
                  <option>$10k+</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-subtle)]" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="hp-message" className="font-poppins text-xs font-medium text-[var(--color-text-secondary)]">Project Details</label>
            <textarea id="hp-message" rows={5} name="message" required placeholder="Tell me about your project..." className="border border-[var(--color-border)] bg-[var(--color-bg-primary)] p-4 font-poppins text-sm text-white placeholder:text-[var(--color-text-subtle)] focus:border-[var(--color-accent-border)] focus:outline-none resize-none" />
          </div>

          <button
            type="submit"
            disabled={submitState !== "idle"}
            className={`flex h-[52px] w-full items-center justify-center gap-2.5 font-poppins text-[15px] font-semibold text-white transition-all duration-300 ${
              submitState === "sent"
                ? "bg-emerald-500"
                : submitState === "error"
                ? "bg-red-500"
                : "bg-gradient-to-b from-[var(--color-accent)] to-[#6B4FE0] hover:scale-[1.03] hover:shadow-[0_0_24px_#7C5CFC20]"
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
      </div>
    </section>
  );
}
