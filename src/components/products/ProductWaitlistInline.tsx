"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import type { Product } from "../../data/products";

// ---------------------------------------------------------------------------
// ProductWaitlistInline
// ---------------------
// A single-line email signup for a specific product — lives at the bottom
// of a product card on the wall, tinted with the product's accent.
// Submissions go to Formspree with a product discriminator field so every
// signup shows up tagged in the dashboard.
//
// The wall cards wrap the rest of the card in a stretched overlay <Link>,
// so this form sits above it (`relative z-20`) to keep the inputs clickable
// without accidentally triggering the card's navigation.
// ---------------------------------------------------------------------------

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "xjgebdwg";

type SubmitState = "idle" | "sending" | "sent" | "error";

type Props = {
  product: Product;
};

export default function ProductWaitlistInline({ product }: Props) {
  const [state, setState] = useState<SubmitState>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot
    if (data.get("_gotcha")) return;

    data.set("product", product.slug);
    data.set("productName", product.name);
    data.set("_subject", `Waitlist — ${product.name}`);

    setState("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setState("sent");
        form.reset();
        return;
      }
      setState("error");
    } catch {
      setState("error");
    }
  };

  const isSent = state === "sent";
  const isSending = state === "sending";

  // Stop the card-wide overlay <Link> from firing when the user clicks
  // anywhere inside the form (including the input).
  const swallow = (e: React.MouseEvent) => e.stopPropagation();

  if (isSent) {
    return (
      <div
        className="relative z-20 flex items-center justify-center gap-2.5 border px-4 py-3.5 font-body text-[12px] font-semibold"
        style={{
          background: `${product.accent.hex}14`,
          borderColor: product.accent.border,
          color: product.accent.hex,
        }}
      >
        <Check className="h-3.5 w-3.5" />
        You&apos;re on the list.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onClick={swallow}
      onMouseDown={swallow}
      className="relative z-20 flex w-full flex-row items-stretch"
    >
      {/* Honeypot */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />

      <label htmlFor={`waitlist-card-${product.slug}`} className="sr-only">
        Email
      </label>
      <input
        id={`waitlist-card-${product.slug}`}
        type="email"
        name="email"
        required
        disabled={isSending}
        placeholder={`your@email for ${product.name.toLowerCase()}`}
        onClick={swallow}
        onMouseDown={swallow}
        className="h-11 min-w-0 flex-1 border bg-[var(--color-bg-primary)] px-4 font-body text-[12px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-subtle)] focus:outline-none disabled:opacity-60"
        style={{
          borderColor: product.accent.border,
          borderRightWidth: 0,
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = product.accent.hex)}
        onBlur={(e) => (e.currentTarget.style.borderColor = product.accent.border)}
      />
      <button
        type="submit"
        disabled={isSending}
        className="group/btn flex h-11 shrink-0 items-center justify-center gap-1.5 px-4 font-body text-[12px] font-semibold transition-all disabled:cursor-wait disabled:opacity-60"
        style={{
          background: product.accent.hex,
          color: "#0A0A0F",
        }}
      >
        {isSending ? "…" : "Notify me"}
        {!isSending && (
          <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
        )}
      </button>
    </form>
  );
}
