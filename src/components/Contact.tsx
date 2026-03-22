"use client";

import { ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "xjgebdwg";

export default function Contact() {
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll(".contact-reveal");

      if (prefersReducedMotion) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(items, { opacity: 0, y: 40 });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return;

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
    <section
      ref={sectionRef}
      id="contact"
      className="snap-section w-full bg-[var(--color-bg-primary)] px-16 py-[100px] max-md:px-6 max-md:py-16"
    >
      {/* Header */}
      <div className="contact-reveal mb-16 flex flex-col gap-4 max-md:mb-10">
        <span className="font-body text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
          GET IN TOUCH
        </span>
        <h2 className="font-display text-[40px] tracking-[-1px] text-[var(--color-text-primary)] max-md:text-[28px]">
          Let&apos;s Build Something Together
        </h2>
        <div className="h-px w-[200px] bg-[var(--color-accent)] opacity-30" />
      </div>

      <div className="flex w-full gap-20 max-md:flex-col max-md:gap-12">
        {/* Left — Form with floating labels */}
        <form
          onSubmit={handleSubmit}
          className={`contact-reveal flex flex-1 flex-col gap-10 transition-colors duration-500 ${
            submitState === "sent" ? "bg-emerald-500/[0.03]" : ""
          }`}
        >
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />

          <div className="flex gap-8 max-md:flex-col max-md:gap-10">
            <div className="float-field flex-1">
              <input id="hp-name" type="text" name="name" required placeholder=" " />
              <label htmlFor="hp-name">Name</label>
            </div>
            <div className="float-field flex-1">
              <input id="hp-email" type="email" name="email" required placeholder=" " />
              <label htmlFor="hp-email">Email</label>
            </div>
          </div>

          <div className="flex gap-8 max-md:flex-col max-md:gap-10">
            <div className="float-field flex-1">
              <select id="hp-project" name="subject" className="appearance-none" defaultValue="">
                <option value="" disabled>Select type...</option>
                <option>Website</option>
                <option>Branding</option>
                <option>UI/UX</option>
                <option>SEO</option>
                <option>AI / LLM Agents</option>
              </select>
              <label htmlFor="hp-project" className="has-value">Project Type</label>
            </div>
            <div className="float-field flex-1">
              <select id="hp-budget" name="budget" className="appearance-none" defaultValue="">
                <option value="" disabled>Select range...</option>
                <option>$1k - $3k</option>
                <option>$3k - $5k</option>
                <option>$5k - $10k</option>
                <option>$10k+</option>
              </select>
              <label htmlFor="hp-budget" className="has-value">Budget Range</label>
            </div>
          </div>

          <div className="float-field">
            <textarea id="hp-message" rows={4} name="message" required placeholder=" " style={{ resize: "none" }} />
            <label htmlFor="hp-message">Project Details</label>
          </div>

          <button
            type="submit"
            disabled={submitState !== "idle"}
            className={`flex h-[56px] w-full items-center justify-between px-6 font-body text-[15px] font-semibold transition-all duration-300 ${
              submitState === "sent"
                ? "bg-emerald-500 text-white"
                : submitState === "error"
                ? "bg-red-500 text-white"
                : "bg-gradient-to-b from-[var(--color-accent)] to-[#5B3FCC] text-white hover:scale-[1.01] hover:shadow-[0_0_24px_#7C5CFC20]"
            } disabled:cursor-not-allowed`}
          >
            {submitState === "idle" && (
              <>
                <span>Send Message</span>
                <ArrowRight className="h-[18px] w-[18px]" />
              </>
            )}
            {submitState === "sending" && (
              <div className="mx-auto h-5 w-5 rounded-full border-2 border-white/30 border-t-white submit-spinner" />
            )}
            {submitState === "sent" && <span className="mx-auto">Message Sent &#x2713;</span>}
            {submitState === "error" && <span className="mx-auto">Something went wrong — try again</span>}
          </button>
        </form>

        {/* Right — Contact details */}
        <div className="contact-reveal flex w-[340px] flex-col gap-10 max-md:w-full">
          {[
            { label: "Email", value: "heyitsnimbus@gmail.com", href: "mailto:heyitsnimbus@gmail.com" },
            { label: "Location", value: "Remote — Available Worldwide" },
            { label: "Response", value: "Within 24 hours" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="h-px w-4 bg-[var(--color-accent)]" />
                <span className="font-body text-[11px] font-medium tracking-[2px] text-[var(--color-text-subtle)]">
                  {item.label.toUpperCase()}
                </span>
              </div>
              {item.href ? (
                <a
                  href={item.href}
                  className="pl-7 font-body text-[15px] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
                >
                  {item.value}
                </a>
              ) : (
                <span className="pl-7 font-body text-[15px] text-[var(--color-text-secondary)]">
                  {item.value}
                </span>
              )}
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="h-px w-4 bg-[var(--color-accent)]" />
              <span className="font-body text-[11px] font-medium tracking-[2px] text-[var(--color-text-subtle)]">
                SOCIAL
              </span>
            </div>
            <a
              href="https://github.com/CwCw0"
              target="_blank"
              rel="noopener noreferrer"
              className="pl-7 font-body text-[15px] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
            >
              GitHub &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
