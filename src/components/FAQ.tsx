"use client";

import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "What services do you offer?",
    a: "I offer end-to-end digital services including website design & development, brand identity, UI/UX design, SEO optimization, and AI-powered tools like custom chatbots. Whether you need a full build or specific expertise, I adapt to your project scope.",
  },
  {
    q: "How does the contract process work?",
    a: "It starts with a discovery call to understand your goals. I then provide a detailed proposal with scope, timeline, and pricing. Once agreed, we sign a contract and I begin work in structured phases with regular check-ins and deliverables.",
  },
  {
    q: "What is your typical project timeline?",
    a: "Timelines vary based on scope. A landing page or brand identity typically takes 1–2 weeks. A full website with custom features can take 3–6 weeks. AI integrations and complex builds may extend further. I always provide a clear timeline upfront.",
  },
  {
    q: "How many revisions are included?",
    a: "Each project phase includes up to two rounds of revisions. Additional revisions can be arranged at an hourly rate. I focus on getting it right through clear communication, so most projects stay well within the included rounds.",
  },
  {
    q: "Are you available for ongoing contract work?",
    a: "Yes. I offer flexible part-time contract arrangements for businesses that need consistent design and development support. This works well for teams that need a dedicated resource without the overhead of a full-time hire. Let’s discuss what works for your needs.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="snap-section w-full bg-[var(--color-bg-secondary)] px-16 py-[100px] max-md:px-6 max-md:py-16"
    >
      {/* Header */}
      <div className="mb-14 flex w-full items-end justify-between max-md:flex-col max-md:items-start">
        <div className="flex flex-col gap-4">
          <span className="font-poppins text-[11px] font-medium tracking-[3px] text-[var(--color-accent)]">
            FAQ
          </span>
          <h2 className="font-poppins text-[40px] font-semibold tracking-[-1px] text-white max-md:text-[28px]">
            Common Questions
          </h2>
          <p className="w-[500px] font-poppins text-base text-[var(--color-text-muted)] max-md:w-full">
            Everything you need to know about working with me.
          </p>
        </div>
      </div>

      {/* FAQ List */}
      <div className="flex flex-col">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          const isLast = i === faqs.length - 1;
          return (
            <div
              key={i}
              className={`flex flex-col gap-4 py-8 ${
                !isLast ? "border-b border-[var(--color-border)]" : ""
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between"
              >
                <span className="font-poppins text-lg font-medium text-white">
                  {faq.q}
                </span>
                {isOpen ? (
                  <Minus className="h-5 w-5 text-[var(--color-accent)]" />
                ) : (
                  <Plus className="h-5 w-5 text-[var(--color-accent)]" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="font-poppins text-sm leading-[1.7] text-[var(--color-text-muted)]">
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
