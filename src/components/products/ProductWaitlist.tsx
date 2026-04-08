"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import type { Product } from "../../data/products";

// ---------------------------------------------------------------------------
// ProductWaitlist
// ---------------
// A drop-in waitlist form tinted with the host product's accent color.
// Submissions go to the same Formspree endpoint the contact form uses,
// but with a `product` discriminator field so every signup shows up
// tagged in the dashboard.
//
// This replaces the old "click through to /contact?product=xxx" flow —
// people who want in on a product can now leave their email without
// ever leaving the page they care about.
// ---------------------------------------------------------------------------

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "xjgebdwg";

type SubmitState = "idle" | "sending" | "sent" | "error";

type Props = {
  product: Product;
  compact?: boolean;
};

export default function ProductWaitlist({ product, compact = false }: Props) {
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — silently discard bots
    if (data.get("_gotcha")) return;

    // Always stamp the submission with the product slug + name so
    // Formspree shows the right label in the dashboard, even though
    // every product shares one endpoint.
    data.set("product", product.slug);
    data.set("productName", product.name);
    data.set("_subject", `Waitlist — ${product.name}`);

    setState("sending");
    setErrorMsg(null);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setState("sent");
        form.reset();
        // Stay in the "sent" state — this is a success, not a toast.
        return;
      }
      setState("error");
      setErrorMsg("Something went wrong. Try again in a moment.");
    } catch {
      setState("error");
      setErrorMsg("Network hiccup. Try again in a moment.");
    }
  };

  const isSent = state === "sent";
  const isSending = state === "sending";

  return (
    <div
      id="waitlist"
      className="product-waitlist relative w-full scroll-mt-24 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${product.accent.soft}, transparent 70%)`,
        border: `1px solid ${product.accent.border}`,
        padding: compact ? "32px" : "48px",
      }}
    >
      {/* Accent grid wash — same treatment as the product card */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(${product.accent.hex} 1px, transparent 1px), linear-gradient(90deg, ${product.accent.hex} 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative z-10 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: product.accent.hex,
              boxShadow: `0 0 10px ${product.accent.hex}`,
            }}
          />
          <span
            className="font-body text-[10px] font-semibold tracking-[2.5px]"
            style={{ color: product.accent.hex }}
          >
            WAITLIST
          </span>
        </div>

        <h3
          className="font-display italic tracking-[-0.5px] text-[var(--color-text-primary)]"
          style={{ fontSize: compact ? "26px" : "32px", lineHeight: 1.15 }}
        >
          {isSent
            ? `You're on the list for ${product.name}.`
            : `Be the first to know when ${product.name} drops.`}
        </h3>

        <p className="max-w-[520px] font-body text-[14px] leading-[1.7] text-[var(--color-text-secondary)]">
          {isSent
            ? "No follow-up spam. One email on launch day, nothing else. Thanks for getting in early."
            : "Leave your email and I'll let you know the day it's ready. No newsletter, no CRM sequence — just one message when the wait is over."}
        </p>

        {!isSent && (
          <form
            onSubmit={handleSubmit}
            className="mt-2 flex w-full flex-col gap-3 sm:flex-row sm:items-center"
          >
            {/* Honeypot */}
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
            />

            <label htmlFor={`waitlist-email-${product.slug}`} className="sr-only">
              Email
            </label>
            <input
              id={`waitlist-email-${product.slug}`}
              type="email"
              name="email"
              required
              disabled={isSending}
              placeholder="you@example.com"
              className="h-12 flex-1 border bg-[var(--color-bg-primary)] px-4 font-body text-[14px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-subtle)] transition-all focus:outline-none disabled:opacity-60"
              style={{
                borderColor: product.accent.border,
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = product.accent.hex)}
              onBlur={(e) => (e.currentTarget.style.borderColor = product.accent.border)}
            />

            <button
              type="submit"
              disabled={isSending}
              className="group flex h-12 items-center justify-center gap-2 px-6 font-body text-[13px] font-semibold transition-all hover:scale-[1.02] disabled:cursor-wait disabled:opacity-60 disabled:hover:scale-100"
              style={{
                background: product.accent.hex,
                color: "#0A0A0F",
                boxShadow: `0 10px 30px -8px ${product.accent.glow}`,
              }}
            >
              {isSending ? "Sending…" : "Join waitlist"}
              {!isSending && (
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              )}
            </button>
          </form>
        )}

        {isSent && (
          <div
            className="mt-2 flex items-center gap-2.5 font-body text-[13px] font-semibold"
            style={{ color: product.accent.hex }}
          >
            <Check className="h-4 w-4" />
            Saved. You&apos;re in.
          </div>
        )}

        {state === "error" && errorMsg && (
          <div className="mt-2 font-body text-[12px] text-[var(--color-text-secondary)]">
            {errorMsg}
          </div>
        )}

        <p className="mt-1 font-body text-[10px] tracking-[2px] text-[var(--color-text-subtle)]">
          ONE EMAIL · NO SPAM · NO CHASING
        </p>
      </div>
    </div>
  );
}
