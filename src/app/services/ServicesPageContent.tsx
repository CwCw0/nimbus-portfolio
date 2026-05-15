'use client';

import { useState } from 'react';
import Link from 'next/link';
import RevealLine from '@/components/ui/RevealLine';
import FadeIn from '@/components/ui/FadeIn';
import Magnetic from '@/components/ui/Magnetic';
import { services, faqItems } from '@/data/services';
import { processSteps } from '@/data/process';

export default function ServicesPageContent() {
  const [openService, setOpenService] = useState<string | null>(services[0].id);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleService = (id: string) =>
    setOpenService(openService === id ? null : id);

  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ padding: 'clamp(120px, 16vw, 240px) 0 var(--section-gap)', background: 'transparent' }}>
        <div className="container">
          <RevealLine>
            <h1 className="display-xl">What I build.</h1>
          </RevealLine>
          <FadeIn delay={200}>
            <p
              style={{
                color: 'var(--fg-dim)',
                maxWidth: 680,
                marginTop: 'var(--sp-8)',
                lineHeight: 1.7,
                fontSize: 'var(--t-body)',
              }}
            >
              Websites, business tools, AI systems, and internal operations.
              One builder, end to end. Each delivered with the same obsessive
              attention to craft.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Service Deep-dives ── */}
      <section style={{ paddingBottom: 'var(--section-gap)', background: 'transparent' }}>
        <div className="container">
          <div className="section-head">
            <span className="section-index">01 / Services</span>
            <span className="section-label">Five things &middot; done properly</span>
          </div>

          <div style={{ borderTop: '1px solid var(--line)' }}>
            {services.map((s) => {
              const isOpen = openService === s.id;
              return (
                <div key={s.id} style={{ borderBottom: '1px solid var(--line)' }}>
                  <button
                    onClick={() => toggleService(s.id)}
                    aria-expanded={isOpen}
                    className="services-accordion-btn"
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      padding: 'var(--sp-8) 0',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: 'var(--fg)',
                      display: 'grid',
                      gridTemplateColumns: '50px 1fr 40px',
                      alignItems: 'center',
                      gap: 'var(--sp-6)',
                    }}
                  >
                    <span className="mono" style={{ color: 'var(--fg-dim)' }}>
                      {s.id}
                    </span>
                    <span>
                      <span
                        className="display-md"
                        style={{
                          display: 'block',
                          transition: 'color 0.3s var(--ease-out)',
                          color: isOpen ? 'var(--accent)' : undefined,
                        }}
                      >
                        {s.title}
                      </span>
                      <span className="mono" style={{ color: 'var(--fg-dim)', marginTop: 2 }}>
                        {s.kicker}
                      </span>
                    </span>
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
                      {isOpen ? '\u2013' : '+'}
                    </span>
                  </button>

                  {/* Expandable body */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      transition: 'grid-template-rows 0.5s var(--ease-out)',
                    }}
                  >
                    <div style={{ overflow: 'hidden' }}>
                      <div
                        className="services-accordion-body"
                        style={{
                          padding: '0 0 var(--sp-10) 50px',
                          maxWidth: 800,
                        }}
                      >
                        <p
                          style={{
                            color: 'var(--fg-dim)',
                            lineHeight: 1.7,
                            marginBottom: 'var(--sp-8)',
                          }}
                        >
                          {s.body}
                        </p>

                        {/* Deliverables */}
                        {s.deliverables && s.deliverables.length > 0 && (
                          <div>
                            <span
                              className="mono"
                              style={{
                                color: 'var(--fg-faint)',
                                display: 'block',
                                marginBottom: 'var(--sp-4)',
                              }}
                            >
                              Deliverables
                            </span>
                            <ul
                              style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--sp-3)',
                              }}
                            >
                              {s.deliverables.map((d) => (
                                <li
                                  key={d}
                                  style={{
                                    color: 'var(--fg-dim)',
                                    fontSize: 'var(--t-body-sm)',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 'var(--sp-3)',
                                  }}
                                >
                                  <span style={{ color: 'var(--accent)', flexShrink: 0 }}>&rarr;</span>
                                  <span>{d}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Chips */}
                        <div
                          style={{
                            display: 'flex',
                            gap: 'var(--sp-2)',
                            flexWrap: 'wrap',
                            marginTop: 'var(--sp-6)',
                          }}
                        >
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
                        </div>

                        {/* CTA */}
                        <div style={{ marginTop: 'var(--sp-8)' }}>
                          <Link href="/contact" className="btn ghost" style={{ fontSize: 'var(--t-body-sm)' }}>
                            Start a project &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section style={{ padding: 'var(--section-gap) 0', background: 'transparent' }}>
        <div className="container">
          <div className="section-head">
            <span className="section-index">02 / Process</span>
            <span className="section-label">Three steps &middot; zero drama</span>
          </div>

          <RevealLine>
            <h2 className="display-lg" style={{ marginBottom: 'var(--sp-12)' }}>
              How it works.
            </h2>
          </RevealLine>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--sp-8)',
            }}
          >
            {processSteps.map((step, i) => (
              <FadeIn key={step.n} delay={i * 150}>
                <div
                  style={{
                    borderTop: '1px solid var(--line)',
                    paddingTop: 'var(--sp-8)',
                  }}
                >
                  <span
                    className="display-md"
                    style={{
                      color: 'var(--accent)',
                      opacity: 0.3,
                      display: 'block',
                      marginBottom: 'var(--sp-4)',
                    }}
                  >
                    {step.n}
                  </span>
                  <span className="mono" style={{ color: 'var(--fg-faint)', display: 'block', marginBottom: 'var(--sp-3)' }}>
                    {step.kicker}
                  </span>
                  <h3 className="display-sm" style={{ marginBottom: 'var(--sp-4)' }}>
                    {step.title}
                  </h3>
                  <p style={{ color: 'var(--fg-dim)', lineHeight: 1.7, fontSize: 'var(--t-body-sm)' }}>
                    {step.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 900px) {
            div[style*='grid-template-columns: repeat(3'] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* ── What Makes This Different ── */}
      <section style={{ padding: 'var(--section-gap) 0', background: 'transparent', borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="section-head">
            <span className="section-index">03 / Different</span>
            <span className="section-label">Why it matters &middot; to you</span>
          </div>

          <RevealLine>
            <h2 className="display-lg" style={{ marginBottom: 'var(--sp-12)' }}>
              What makes this different.
            </h2>
          </RevealLine>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
            {[
              {
                n: '01',
                text: 'Design in code — what you review is what ships. No Figma translation, no handoff loss.',
              },
              {
                n: '02',
                text: 'One person, start to finish. You talk to the person writing the code. No account managers. No game of telephone.',
              },
              {
                n: '03',
                text: 'AI built in from day one. Not a chatbot widget bolted on after launch.',
              },
              {
                n: '04',
                text: 'Malaysian context. FPX payments, PDPA compliance, WhatsApp integration. I understand your market because I\u2019m in it.',
              },
            ].map((item, i) => (
              <FadeIn key={item.n} delay={i * 120}>
                <div
                  style={{
                    borderTop: '1px solid var(--line)',
                    paddingTop: 'var(--sp-8)',
                    paddingBottom: 'var(--sp-8)',
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr',
                    gap: 'var(--sp-6)',
                    alignItems: 'start',
                  }}
                >
                  <span
                    className="display-md"
                    style={{
                      color: 'var(--accent)',
                      opacity: 0.25,
                      lineHeight: 1,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {item.n}
                  </span>
                  <p
                    style={{
                      color: 'var(--fg-dim)',
                      lineHeight: 1.7,
                      fontSize: 'var(--t-body)',
                      maxWidth: 640,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: 'var(--section-gap) 0', background: 'transparent' }}>
        <div className="container">
          <div className="section-head">
            <span className="section-index">04 / FAQ</span>
            <span className="section-label">Common questions</span>
          </div>

          <RevealLine>
            <h2 className="display-lg" style={{ marginBottom: 'var(--sp-12)' }}>
              Questions &amp; answers.
            </h2>
          </RevealLine>

          <div style={{ borderTop: '1px solid var(--line)' }}>
            {faqItems.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                  <button
                    onClick={() => toggleFaq(i)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      padding: 'var(--sp-6) 0',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: 'var(--fg)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 'var(--sp-6)',
                    }}
                  >
                    <span className="display-sm">{item.q}</span>
                    <span
                      style={{
                        width: 32,
                        textAlign: 'center',
                        fontSize: 20,
                        color: 'var(--accent)',
                        lineHeight: 1,
                        flexShrink: 0,
                        transition: 'transform 0.3s var(--ease-out)',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      transition: 'grid-template-rows 0.5s var(--ease-out)',
                    }}
                  >
                    <div style={{ overflow: 'hidden' }}>
                      <p
                        style={{
                          color: 'var(--fg-dim)',
                          lineHeight: 1.7,
                          maxWidth: 680,
                          paddingBottom: 'var(--sp-6)',
                        }}
                      >
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{ padding: 'var(--section-gap) 0', background: 'transparent' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <FadeIn>
            <RevealLine>
              <h2 className="display-lg">Ready to start?</h2>
            </RevealLine>
            <p
              style={{
                color: 'var(--fg-dim)',
                marginTop: 'var(--sp-6)',
                marginBottom: 'var(--sp-10)',
                maxWidth: 500,
                marginInline: 'auto',
                lineHeight: 1.7,
              }}
            >
              Tell me what you need. I&apos;ll tell you how I&apos;d build it.
            </p>
            <Magnetic>
              <Link href="/contact" className="btn">
                Start a conversation &rarr;
              </Link>
            </Magnetic>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
