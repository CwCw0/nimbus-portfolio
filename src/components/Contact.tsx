"use client";

import { ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "xjgebdwg";

export default function Contact() {
  const [submitState, setSubmitState] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const heading = headingRef.current;
    if (!el || !heading) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cleanups: (() => void)[] = [];

    const split = new SplitType(heading, { types: "chars" });
    cleanups.push(() => split.revert());

    const ctx = gsap.context(() => {
      const formItems = el.querySelectorAll(".contact-reveal");

      if (prefersReducedMotion) {
        gsap.set(split.chars || [], { autoAlpha: 1, y: 0 });
        gsap.set(formItems, { autoAlpha: 1, y: 0 });
        return;
      }

      // Character reveal — each char clips up from below
      gsap.set(split.chars || [], { autoAlpha: 0, y: 50, rotateX: -40 });

      gsap.to(split.chars || [], {
        autoAlpha: 1,
        y: 0,
        rotateX: 0,
        duration: 0.6,
        stagger: 0.02,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
          once: true,
        },
      });

      // Accent line draws on
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Form elements — staggered clip reveal
      gsap.set(formItems, { autoAlpha: 0, y: 40 });
      gsap.to(formItems, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el.querySelector(".contact-form-area"),
          start: "top 80%",
          once: true,
        },
      });
    }, el);

    cleanups.push(() => ctx.revert());

    return () => cleanups.forEach((fn) => fn());
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return;

    const email = String(data.get("email") || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitState("error");
      setTimeout(() => setSubmitState("idle"), 4000);
      return;
    }

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
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-(--color-bg-primary) px-16 py-32 max-md:min-h-0 max-md:justify-start max-md:px-6 max-md:py-20"
    >
      {/* Massive heading — viewport-aware */}
      <h2
        ref={headingRef}
        className="mb-6 text-center font-display tracking-[-3px] text-(--color-text-primary) max-md:mb-8 max-md:tracking-[-1px]"
        style={{
          fontSize: "clamp(36px, 8vw, 130px)",
          lineHeight: 1.05,
          perspective: "600px",
        }}
      >
        Let&apos;s Work
        <br />
        <span className="italic text-(--color-accent)">Together</span>
      </h2>

      {/* Accent line */}
      <div
        ref={lineRef}
        className="mb-16 h-px w-40 bg-(--color-accent) opacity-30 max-md:mb-10"
        style={{ transformOrigin: "center" }}
      />

      {/* Form */}
      <div className="contact-form-area w-full max-w-175">
        <form
          onSubmit={handleSubmit}
          className={`contact-reveal flex flex-col gap-10 transition-colors duration-500 ${
            submitState === "sent" ? "bg-emerald-500/[0.03]" : ""
          }`}
        >
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />

          <div className="flex gap-8 max-md:flex-col max-md:gap-10">
            <div className="float-field flex-1">
              <input
                id="ct-name"
                type="text"
                name="name"
                required
                placeholder=" "
              />
              <label htmlFor="ct-name">Name</label>
            </div>
            <div className="float-field flex-1">
              <input
                id="ct-email"
                type="email"
                name="email"
                required
                placeholder=" "
              />
              <label htmlFor="ct-email">Email</label>
            </div>
          </div>

          <div className="flex gap-8 max-md:flex-col max-md:gap-10">
            <div className="float-field flex-1">
              <select
                id="ct-project"
                name="subject"
                className="appearance-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Select type...
                </option>
                <option>Website Design & Development</option>
                <option>Visual Design</option>
                <option>UI/UX Design</option>
                <option>SEO & Growth</option>
                <option>AI, LLMs & Agents</option>
                <option>Other</option>
              </select>
              <label htmlFor="ct-project">Project Type</label>
            </div>
            <div className="float-field flex-1">
              <select
                id="ct-budget"
                name="budget"
                className="appearance-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Select range...
                </option>
                <option>$1k - $3k</option>
                <option>$3k - $5k</option>
                <option>$5k - $10k</option>
                <option>$10k+</option>
              </select>
              <label htmlFor="ct-budget">Budget Range</label>
            </div>
          </div>

          <div className="float-field">
            <textarea
              id="ct-message"
              rows={4}
              name="message"
              required
              placeholder=" "
              style={{ resize: "none" }}
            />
            <label htmlFor="ct-message">Project Details</label>
          </div>

          <button
            type="submit"
            disabled={submitState !== "idle"}
            className={`flex h-14 w-full items-center justify-between px-6 font-body text-[15px] font-semibold transition-all duration-300 ${
              submitState === "sent"
                ? "bg-emerald-500 text-white"
                : submitState === "error"
                  ? "bg-red-500 text-white"
                  : "bg-(--color-accent-warm) text-[#1a1400] hover:scale-[1.01] hover:shadow-[0_0_24px_rgba(245,194,107,0.25)]"
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
            {submitState === "sent" && (
              <span className="mx-auto">Message Sent &#x2713;</span>
            )}
            {submitState === "error" && (
              <span className="mx-auto">
                Something went wrong — try again
              </span>
            )}
          </button>
        </form>

        {/* Contact details */}
        <div className="contact-reveal mt-16 flex items-center justify-between border-t border-(--color-border) pt-8 max-md:flex-col max-md:items-start max-md:gap-6">
          <a
            href="mailto:heyitsnimbus@gmail.com"
            className="font-body text-[13px] text-(--color-text-dim) transition-colors hover:text-(--color-accent)"
          >
            heyitsnimbus@gmail.com
          </a>
          <span className="font-body text-[13px] text-(--color-text-dim)">
            Remote — Available Worldwide
          </span>
          <a
            href="https://github.com/CwCw0"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[13px] text-(--color-text-dim) transition-colors hover:text-(--color-accent)"
          >
            GitHub &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
