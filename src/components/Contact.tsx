"use client";

import { ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "xjgebdwg";

export default function Contact() {
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const heading = headingRef.current;
    if (!el || !heading) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const split = new SplitType(heading, { types: "chars" });

    const ctx = gsap.context(() => {
      const formItems = el.querySelectorAll(".contact-reveal");

      if (prefersReducedMotion) {
        gsap.set(split.chars || [], { opacity: 1, y: 0 });
        gsap.set(formItems, { opacity: 1, y: 0 });
        return;
      }

      // Character reveal on heading
      gsap.set(split.chars || [], { opacity: 0, y: 30 });

      gsap.to(split.chars || [], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.02,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
          once: true,
        },
      });

      // Form elements fade in
      gsap.set(formItems, { opacity: 0, y: 40 });
      gsap.to(formItems, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el.querySelector(".contact-form-area"),
          start: "top 80%",
          once: true,
        },
      });
    }, el);

    return () => {
      split.revert();
      ctx.revert();
    };
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
      className="relative flex min-h-[100vh] w-full flex-col items-center justify-center bg-[var(--color-bg-primary)] px-16 py-24 max-md:min-h-0 max-md:justify-start max-md:px-6 max-md:py-16"
    >
      {/* Massive heading */}
      <h2
        ref={headingRef}
        className="mb-16 text-center font-display tracking-[-2px] text-[var(--color-text-primary)] max-md:mb-10"
        style={{
          fontSize: "clamp(32px, 7vw, 110px)",
          lineHeight: 1.1,
        }}
      >
        Let&apos;s Work Together
      </h2>

      {/* Centered form */}
      <div className="contact-form-area w-full max-w-[700px]">
        <form
          onSubmit={handleSubmit}
          className={`contact-reveal flex flex-col gap-10 transition-colors duration-500 ${
            submitState === "sent" ? "bg-emerald-500/[0.03]" : ""
          }`}
        >
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />

          <div className="flex gap-8 max-md:flex-col max-md:gap-10">
            <div className="float-field flex-1">
              <input id="ct-name" type="text" name="name" required placeholder=" " />
              <label htmlFor="ct-name">Name</label>
            </div>
            <div className="float-field flex-1">
              <input id="ct-email" type="email" name="email" required placeholder=" " />
              <label htmlFor="ct-email">Email</label>
            </div>
          </div>

          <div className="flex gap-8 max-md:flex-col max-md:gap-10">
            <div className="float-field flex-1">
              <select id="ct-project" name="subject" className="appearance-none" defaultValue="">
                <option value="" disabled>Select type...</option>
                <option>Website</option>
                <option>Branding</option>
                <option>UI/UX</option>
                <option>SEO</option>
                <option>AI / LLM Agents</option>
              </select>
              <label htmlFor="ct-project">Project Type</label>
            </div>
            <div className="float-field flex-1">
              <select id="ct-budget" name="budget" className="appearance-none" defaultValue="">
                <option value="" disabled>Select range...</option>
                <option>$1k - $3k</option>
                <option>$3k - $5k</option>
                <option>$5k - $10k</option>
                <option>$10k+</option>
              </select>
              <label htmlFor="ct-budget">Budget Range</label>
            </div>
          </div>

          <div className="float-field">
            <textarea id="ct-message" rows={4} name="message" required placeholder=" " style={{ resize: "none" }} />
            <label htmlFor="ct-message">Project Details</label>
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

        {/* Contact details row below form */}
        <div className="contact-reveal mt-16 flex items-center justify-between border-t border-[var(--color-border)] pt-8 max-md:flex-col max-md:items-start max-md:gap-6">
          <a
            href="mailto:heyitsnimbus@gmail.com"
            className="font-body text-[13px] text-[var(--color-text-dim)] transition-colors hover:text-[var(--color-accent)]"
          >
            heyitsnimbus@gmail.com
          </a>
          <span className="font-body text-[13px] text-[var(--color-text-dim)]">
            Remote — Available Worldwide
          </span>
          <a
            href="https://github.com/CwCw0"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[13px] text-[var(--color-text-dim)] transition-colors hover:text-[var(--color-accent)]"
          >
            GitHub &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
