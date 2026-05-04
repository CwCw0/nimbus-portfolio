"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

// ---------------------------------------------------------------------------
// VaultWaitlistForm
// -----------------
// The inline email form shown in place of the old "Tell me when the vault
// opens" Link button. Submissions go to the shared Formspree endpoint with
// a "vault" discriminator so every vault-wide signup shows up tagged in
// the dashboard separately from per-product waitlists.
// ---------------------------------------------------------------------------

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "xjgebdwg";

type SubmitState = "idle" | "sending" | "sent" | "error";

export default function VaultWaitlistForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get("_gotcha")) return;

    data.set("product", "vault");
    data.set("productName", "The Vault");
    data.set("_subject", "Waitlist — The Vault");

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

  if (isSent) {
    return (
      <div className="flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-body text-[13px] font-semibold text-white backdrop-blur-md">
        <Check className="h-4 w-4" />
        You&apos;re on the list. Keep an eye on your inbox.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-[440px] flex-row items-stretch rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md overflow-hidden"
      >
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />
        <label htmlFor="vault-waitlist-email" className="sr-only">
          Email
        </label>
        <input
          id="vault-waitlist-email"
          type="email"
          name="email"
          required
          disabled={isSending}
          placeholder="you@example.com"
          className="h-12 min-w-0 flex-1 bg-transparent px-6 font-body text-[13px] text-white placeholder:text-white/40 focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isSending}
          className="group flex h-12 shrink-0 items-center justify-center gap-2 bg-white px-5 font-body text-[13px] font-semibold text-[#0A0A0F] transition-all hover:bg-white/90 disabled:cursor-wait disabled:opacity-60"
        >
          {isSending ? "Sending…" : "Notify me"}
          {!isSending && (
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          )}
        </button>
      </form>
      {state === "error" && errorMsg && (
        <span className="font-body text-[11px] text-red-300/80">{errorMsg}</span>
      )}
    </div>
  );
}
