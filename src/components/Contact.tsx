"use client";

import { Mail, MapPin, Timer, ArrowRight, ChevronDown } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="snap-section w-full bg-[var(--color-bg-primary)] px-16 py-[100px] max-md:px-6 max-md:py-16"
    >
      {/* Header */}
      <div className="mb-14 flex flex-col gap-4">
        <span className="font-poppins text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
          GET IN TOUCH
        </span>
        <h2 className="font-poppins text-[40px] font-semibold tracking-[-1px] text-white max-md:text-[28px]">
          Let&apos;s Build Something Together
        </h2>
        <p className="w-[600px] font-poppins text-base text-[var(--color-text-muted)] max-md:w-full">
          Have a project in mind? Fill out the form below and I&apos;ll get back
          to you within 24 hours.
        </p>
      </div>

      {/* Body */}
      <div className="flex w-full gap-12 max-md:flex-col max-md:gap-8">
        {/* Info */}
        <div className="flex w-[360px] flex-col gap-8 max-md:w-full">
          <div className="flex items-center gap-4">
            <Mail className="h-5 w-5 text-[var(--color-accent)]" />
            <span className="font-poppins text-[15px] text-[var(--color-text-secondary)]">
              hello@nimbus.dev
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

          {/* Social */}
          <div className="flex gap-4 pt-6">
            {["twitter", "linkedin", "github", "dribbble"].map((social) => (
              <div
                key={social}
                className="flex h-10 w-10 items-center justify-center border border-[var(--color-border)] bg-[var(--color-bg-card)] transition-all duration-200 hover:border-[var(--color-accent-border)]"
              >
                <span className="font-inter text-xs font-medium capitalize text-[var(--color-text-muted)]">
                  {social.charAt(0).toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-1 flex-col gap-6 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-10 max-md:p-6">
          {/* Name row */}
          <div className="flex gap-4 max-md:flex-col">
            <div className="flex flex-1 flex-col gap-2">
              <label className="font-poppins text-xs font-medium text-[var(--color-text-secondary)]">
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
                className="h-11 border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-4 font-poppins text-sm text-white placeholder:text-[var(--color-text-subtle)] focus:border-[var(--color-accent-border)] focus:outline-none"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <label className="font-poppins text-xs font-medium text-[var(--color-text-secondary)]">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Doe"
                className="h-11 border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-4 font-poppins text-sm text-white placeholder:text-[var(--color-text-subtle)] focus:border-[var(--color-accent-border)] focus:outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="font-poppins text-xs font-medium text-[var(--color-text-secondary)]">
              Email Address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="h-11 border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-4 font-poppins text-sm text-white placeholder:text-[var(--color-text-subtle)] focus:border-[var(--color-accent-border)] focus:outline-none"
            />
          </div>

          {/* Project row */}
          <div className="flex gap-4 max-md:flex-col">
            <div className="flex flex-1 flex-col gap-2">
              <label className="font-poppins text-xs font-medium text-[var(--color-text-secondary)]">
                Project Type
              </label>
              <div className="relative">
                <select className="h-11 w-full appearance-none border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-4 pr-10 font-poppins text-sm text-[var(--color-text-subtle)] focus:border-[var(--color-accent-border)] focus:outline-none">
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
              <label className="font-poppins text-xs font-medium text-[var(--color-text-secondary)]">
                Budget Range
              </label>
              <div className="relative">
                <select className="h-11 w-full appearance-none border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-4 pr-10 font-poppins text-sm text-[var(--color-text-subtle)] focus:border-[var(--color-accent-border)] focus:outline-none">
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

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label className="font-poppins text-xs font-medium text-[var(--color-text-secondary)]">
              Project Details
            </label>
            <textarea
              rows={5}
              placeholder="Tell me about your project..."
              className="border border-[var(--color-border)] bg-[var(--color-bg-primary)] p-4 font-poppins text-sm text-white placeholder:text-[var(--color-text-subtle)] focus:border-[var(--color-accent-border)] focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button className="flex h-[52px] w-full items-center justify-center gap-2.5 bg-gradient-to-b from-[var(--color-accent)] to-[#6B4FE0] font-poppins text-[15px] font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_24px_#7C5CFC20]">
            Send Message
            <ArrowRight className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>
    </section>
  );
}
