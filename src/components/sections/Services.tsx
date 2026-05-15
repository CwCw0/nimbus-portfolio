'use client';

import { useState } from 'react';
import Link from 'next/link';
import RevealLine from '@/components/ui/RevealLine';
import FadeIn from '@/components/ui/FadeIn';
import { services } from '@/data/services';

export default function Services() {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (id: string) => setOpen(open === id ? null : id);

  return (
    <section
      id="services"
      style={{ padding: 'var(--section-gap) 0', background: 'transparent' }}
    >
      <div className="container">
        {/* Section head */}
        <div className="section-head">
          <span className="section-index">02 / Services</span>
          <span className="section-label">Five things · done properly</span>
        </div>

        {/* Heading */}
        <RevealLine>
          <h2 className="display-lg">What I build.</h2>
        </RevealLine>

        {/* Intro */}
        <FadeIn>
          <p
            style={{
              color: 'var(--fg-dim)',
              maxWidth: 680,
              marginTop: 'var(--sp-8)',
              marginBottom: 'var(--sp-16)',
              lineHeight: 1.7,
            }}
          >
            Websites, business tools, AI systems, and internal operations.
            One builder, end to end. Every engagement starts with a real
            conversation — no hidden discovery fees, no vague proposals.
          </p>
        </FadeIn>

        {/* Accordion rows */}
        <div style={{ borderTop: '1px solid var(--line)' }}>
          {services.map((s) => {
            const isOpen = open === s.id;
            return (
              <div
                key={s.id}
                style={{ borderBottom: '1px solid var(--line)' }}
              >
                <button
                  onClick={() => toggle(s.id)}
                  className="services-row"
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    padding: 'var(--sp-6) 0',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: 'var(--fg)',
                    transition: 'color 0.3s var(--ease-out)',
                  }}
                  aria-expanded={isOpen}
                >
                  {/* ID */}
                  <span className="services-col-id mono" style={{ color: 'var(--fg-dim)' }}>
                    {s.id}
                  </span>

                  {/* Title + kicker */}
                  <span className="services-col-title">
                    <span
                      className="display-md"
                      style={{
                        display: 'block',
                        transition: 'color 0.3s var(--ease-out), transform 0.3s var(--ease-out)',
                        color: isOpen ? 'var(--accent)' : undefined,
                      }}
                    >
                      {s.title}
                    </span>
                    <span className="mono" style={{ color: 'var(--fg-dim)', marginTop: 2 }}>
                      {s.kicker}
                    </span>
                  </span>

                  {/* Chips */}
                  <span className="services-col-chips">
                    <span style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
                      {s.chips.map((chip) => (
                        <span
                          key={chip}
                          style={{
                            fontFamily: 'var(--f-mono)',
                            fontSize: 'var(--t-mono)',
                            letterSpacing: '0.08em',
                            padding: '4px 12px',
                            borderRadius: 'var(--r-pill)',
                            border: '1px solid var(--line-strong)',
                            color: 'var(--fg-dim)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {chip}
                        </span>
                      ))}
                    </span>
                  </span>

                  {/* Toggle */}
                  <span
                    style={{
                      width: 40,
                      textAlign: 'center',
                      fontSize: 24,
                      color: 'var(--accent)',
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >
                    {isOpen ? '–' : '+'}
                  </span>
                </button>

                {/* Expanded body */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.5s var(--ease-out)',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <div
                      className="services-body"
                      style={{
                        padding: '0 0 var(--sp-8) 0',
                        maxWidth: 640,
                      }}
                    >
                      <p style={{ color: 'var(--fg-dim)', lineHeight: 1.7 }}>{s.body}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <FadeIn>
          <div style={{ marginTop: 'var(--sp-10)', display: 'flex', justifyContent: 'center' }}>
            <Link href="/services" className="btn ghost">
              View all services <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </FadeIn>
      </div>

      <style jsx>{`
        .services-row {
          display: grid;
          grid-template-columns: 50px 1fr 1fr 40px;
          align-items: center;
          gap: var(--sp-6);
        }
        .services-row:hover .display-md {
          color: var(--accent);
          transform: translateX(6px);
        }
        .services-col-id { grid-column: 1; }
        .services-col-title { grid-column: 2; }
        .services-col-chips { grid-column: 3; }

        @media (max-width: 1000px) {
          .services-row {
            grid-template-columns: 50px 1fr 40px;
          }
          .services-col-chips {
            display: none;
          }
          .services-col-title { grid-column: 2; }
        }

        .services-body {
          padding-left: 50px;
        }

        @media (max-width: 640px) {
          .services-row {
            grid-template-columns: 36px 1fr 32px;
            gap: var(--sp-3);
          }
          .services-body {
            padding-left: 20px;
          }
        }
      `}</style>
    </section>
  );
}
