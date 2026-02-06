"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CustomCursor from "../../components/CustomCursor";
import { Mail, MapPin, Clock, ArrowRight, Send, Twitter, Linkedin, Github, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState("sending");
    setTimeout(() => setSubmitState("sent"), 2000);
    setTimeout(() => setSubmitState("idle"), 4000);
  };

  return (
    <>
      <CustomCursor />
      <div className="flex w-full flex-col overflow-x-hidden bg-[var(--color-bg-primary)]">
        <Header />

        {/* Contact Hero */}
        <section className="snap-section w-full px-16 pt-[100px] pb-[60px] max-md:px-6 max-md:pt-16 max-md:pb-8">
          <div className="flex flex-col gap-6 max-w-[800px]">
            <span className="font-inter text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
              CONTACT
            </span>
            <h1 className="font-space-grotesk text-[52px] font-bold leading-[1.1] tracking-[-2px] text-white max-md:text-[32px]">
              Let&apos;s build something great together.
            </h1>
            <p className="w-[600px] font-inter text-lg leading-[1.7] text-[var(--color-text-dim)] max-md:w-full max-md:text-base">
              Have a project in mind? Fill out the form below and I&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="w-full px-16 pb-[100px] max-md:px-6 max-md:pb-16">
          <div className="flex gap-12 max-md:flex-col">
            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-1 flex-col gap-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-10 max-md:p-6 max-md:rounded-xl"
            >
              <div className="flex gap-4 max-md:flex-col">
                <div className="flex flex-1 flex-col gap-2">
                  <label className="font-poppins text-xs font-medium text-[var(--color-text-secondary)]">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="h-12 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-4 font-poppins text-sm text-white placeholder:text-[var(--color-text-subtle)] focus:border-[var(--color-accent-border)] focus:outline-none focus:ring-4 focus:ring-[#7C5CFC15] transition-all"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <label className="font-poppins text-xs font-medium text-[var(--color-text-secondary)]">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="h-12 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-4 font-poppins text-sm text-white placeholder:text-[var(--color-text-subtle)] focus:border-[var(--color-accent-border)] focus:outline-none focus:ring-4 focus:ring-[#7C5CFC15] transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-poppins text-xs font-medium text-[var(--color-text-secondary)]">
                  Subject
                </label>
                <div className="relative">
                  <select className="h-12 w-full appearance-none rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-4 font-poppins text-sm text-[var(--color-text-subtle)] focus:border-[var(--color-accent-border)] focus:outline-none focus:ring-4 focus:ring-[#7C5CFC15] transition-all">
                    <option>Select a subject...</option>
                    <option>Website Design & Development</option>
                    <option>Brand Identity</option>
                    <option>AI Tools & Chatbots</option>
                    <option>SEO & Growth</option>
                    <option>Other</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-subtle)]" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-poppins text-xs font-medium text-[var(--color-text-secondary)]">
                  Budget Range
                </label>
                <div className="relative">
                  <select className="h-12 w-full appearance-none rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-4 font-poppins text-sm text-[var(--color-text-subtle)] focus:border-[var(--color-accent-border)] focus:outline-none focus:ring-4 focus:ring-[#7C5CFC15] transition-all">
                    <option>Select range...</option>
                    <option>$1k - $3k</option>
                    <option>$3k - $5k</option>
                    <option>$5k - $10k</option>
                    <option>$10k+</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-subtle)]" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-poppins text-xs font-medium text-[var(--color-text-secondary)]">
                  Message
                </label>
                <textarea
                  rows={6}
                  placeholder="Tell me about your project..."
                  className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-primary)] p-4 font-poppins text-sm text-white placeholder:text-[var(--color-text-subtle)] focus:border-[var(--color-accent-border)] focus:outline-none focus:ring-4 focus:ring-[#7C5CFC15] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitState !== "idle"}
                className="flex h-[52px] w-full items-center justify-center gap-2.5 rounded-lg bg-gradient-to-b from-[var(--color-accent)] to-[#6B4FE0] font-poppins text-[15px] font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_24px_#7C5CFC20] disabled:opacity-70"
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
                {submitState === "sent" && "Message Sent ✓"}
              </button>
            </form>

            {/* Sidebar */}
            <div className="flex w-[380px] flex-col gap-6 max-md:w-full">
              {/* Details Card */}
              <div className="flex flex-col gap-6 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 rounded-2xl max-md:rounded-xl">
                <span className="font-inter text-xs font-semibold tracking-[1px] text-white">
                  DETAILS
                </span>
                <div className="flex flex-col gap-5">
                  {[
                    { icon: Mail, label: "Email", value: "heyitsnimbus@gmail.com" },
                    { icon: MapPin, label: "Location", value: "Remote — Worldwide" },
                    { icon: Clock, label: "Response", value: "Within 24 hours" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#7C5CFC15]">
                        <item.icon className="h-[18px] w-[18px] text-[var(--color-accent)]" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-inter text-[11px] text-[var(--color-text-subtle)]">{item.label}</span>
                        <span className="font-inter text-sm text-[var(--color-text-secondary)]">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Card */}
              <div className="flex flex-col gap-5 border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 rounded-2xl max-md:rounded-xl">
                <span className="font-inter text-xs font-semibold tracking-[1px] text-white">
                  SOCIAL
                </span>
                {[
                  { icon: Github, name: "GitHub", handle: "CwCw0", href: "https://github.com/CwCw0" },
                  { icon: Twitter, name: "Twitter / X", handle: "@nimbus_dev", href: "#" },
                  { icon: Linkedin, name: "LinkedIn", handle: "nimbus-studio", href: "#" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.href !== "#" ? "_blank" : undefined}
                    rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-3 transition-colors"
                  >
                    <social.icon className="h-4 w-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]" />
                    <div className="flex flex-col">
                      <span className="font-inter text-sm text-white group-hover:text-[var(--color-accent)]">
                        {social.name}
                      </span>
                      <span className="font-inter text-xs text-[var(--color-text-subtle)]">
                        {social.handle}
                      </span>
                    </div>
                    <ArrowRight className="ml-auto h-3.5 w-3.5 text-[var(--color-text-faint)] transition-all group-hover:translate-x-1 group-hover:text-[var(--color-accent)]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
