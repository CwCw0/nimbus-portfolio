'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import RevealLine from '@/components/ui/RevealLine';
import FadeIn from '@/components/ui/FadeIn';
import Magnetic from '@/components/ui/Magnetic';
import { faqItems } from '@/data/services';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xjgebdwg';

const contactDetails = [
  { label: 'Email', value: 'heyitsnimbus@gmail.com', href: 'mailto:heyitsnimbus@gmail.com' },
  { label: 'Based', value: 'Kuala Lumpur, MY', href: undefined },
  { label: 'Github', value: 'CwCw0', href: 'https://github.com/CwCw0' },
];

const projectTypes = [
  'Website',
  'Web Application',
  'AI / Automation',
  'Design System',
  'Other',
];

const budgetRanges = [
  'Under $2,500',
  '$2,500 – $5,000',
  '$5,000 – $10,000',
  '$10,000+',
  'Not sure yet',
];

export default function ContactPageContent() {
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get('_gotcha')) return;

    const email = String(data.get('email') || '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitState('error');
      setTimeout(() => setSubmitState('idle'), 4000);
      return;
    }

    const name = String(data.get('name') || '').trim();
    const details = String(data.get('details') || '').trim();
    if (!name || name.length > 200 || !details || details.length > 5000) {
      setSubmitState('error');
      setTimeout(() => setSubmitState('idle'), 4000);
      return;
    }

    setSubmitState('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setSubmitState('sent');
        form.reset();
        setTimeout(() => setSubmitState('idle'), 4000);
      } else {
        setSubmitState('error');
        setTimeout(() => setSubmitState('idle'), 4000);
      }
    } catch {
      setSubmitState('error');
      setTimeout(() => setSubmitState('idle'), 4000);
    }
  };

  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          padding: 'clamp(120px, 16vw, 240px) 0 clamp(60px, 8vw, 120px)',
          background: 'transparent',
        }}
      >
        <div className="container">
          <RevealLine>
            <h1 className="display-xl">Let&apos;s work together.</h1>
          </RevealLine>
          <FadeIn delay={200}>
            <p
              style={{
                color: 'var(--fg-dim)',
                maxWidth: 560,
                marginTop: 'var(--sp-8)',
                lineHeight: 1.7,
              }}
            >
              Tell me what you need. I&apos;ll tell you how I&apos;d build it.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Split: Left pitch + Right form ── */}
      <section style={{ paddingBottom: 'var(--section-gap)', background: 'transparent' }}>
        <div className="container">
          <div
            className="contact-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--sp-12)',
              alignItems: 'start',
            }}
          >
            {/* ── Left ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-10)' }}>
              {/* Pitch card */}
              <FadeIn>
                <div
                  style={{
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--r-lg)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    background: 'var(--glass-bg)',
                    padding: 'var(--sp-8)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--sp-4)',
                  }}
                >
                  <span className="display-sm">Have a project in mind?</span>
                  <p style={{ color: 'var(--fg-dim)', lineHeight: 1.7 }}>
                    Book a free 30-minute call and we&apos;ll figure out exactly
                    what you need. No pitch, no pressure.
                  </p>
                  <Magnetic>
                    <a
                      href="https://calendly.com/heyitsnimbus/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                      style={{ alignSelf: 'flex-start', marginTop: 'var(--sp-2)' }}
                    >
                      Book a free strategy call <span aria-hidden="true">↗</span>
                    </a>
                  </Magnetic>
                </div>
              </FadeIn>

              {/* Contact details */}
              <FadeIn delay={200}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 'var(--sp-6)',
                  }}
                >
                  {contactDetails.map((d) => (
                    <div key={d.label}>
                      <span
                        className="mono"
                        style={{
                          color: 'var(--fg-faint)',
                          display: 'block',
                          marginBottom: 'var(--sp-2)',
                        }}
                      >
                        {d.label}
                      </span>
                      {d.href ? (
                        <a
                          href={d.href}
                          target={d.href.startsWith('http') ? '_blank' : undefined}
                          rel={d.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="link-underline"
                          style={{ color: 'var(--fg)', fontSize: 'var(--t-body-sm)' }}
                        >
                          {d.value}
                        </a>
                      ) : (
                        <span style={{ color: 'var(--fg)', fontSize: 'var(--t-body-sm)' }}>
                          {d.value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </FadeIn>

              {/* Availability */}
              <FadeIn delay={350}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
                  <span className="status-dot" />
                  <span className="mono" style={{ color: 'var(--fg-dim)' }}>
                    Available for new projects
                  </span>
                </div>
              </FadeIn>
            </div>

            {/* ── Right — Form ── */}
            <FadeIn delay={300}>
              <div
                style={{
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--r-lg)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  background: 'var(--glass-bg)',
                  padding: 'var(--sp-10)',
                }}
              >
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--sp-8)',
                  }}
                >
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ display: 'none' }}
                  />

                  {/* 01 Name */}
                  <div className="float-field">
                    <input type="text" name="name" placeholder=" " required />
                    <label>
                      <span className="mono" style={{ color: 'var(--fg-faint)', marginRight: 8 }}>
                        01
                      </span>
                      Name
                    </label>
                  </div>

                  {/* 02 Email */}
                  <div className="float-field">
                    <input type="email" name="email" placeholder=" " required />
                    <label>
                      <span className="mono" style={{ color: 'var(--fg-faint)', marginRight: 8 }}>
                        02
                      </span>
                      Email
                    </label>
                  </div>

                  {/* 03 Project type */}
                  <div className="float-field">
                    <select name="projectType" defaultValue="" required>
                      <option value="" disabled>
                        Select a type
                      </option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <label>
                      <span className="mono" style={{ color: 'var(--fg-faint)', marginRight: 8 }}>
                        03
                      </span>
                      Project type
                    </label>
                  </div>

                  {/* 04 Budget */}
                  <div className="float-field">
                    <select name="budget" defaultValue="" required>
                      <option value="" disabled>
                        Select a range
                      </option>
                      {budgetRanges.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                    <label>
                      <span className="mono" style={{ color: 'var(--fg-faint)', marginRight: 8 }}>
                        04
                      </span>
                      Budget range
                    </label>
                  </div>

                  {/* 05 Details */}
                  <div className="float-field">
                    <textarea name="details" placeholder=" " rows={4} required />
                    <label>
                      <span className="mono" style={{ color: 'var(--fg-faint)', marginRight: 8 }}>
                        05
                      </span>
                      Project details
                    </label>
                  </div>

                  {/* Submit */}
                  <Magnetic>
                    <button
                      type="submit"
                      className="btn"
                      style={{ width: '100%', justifyContent: 'center' }}
                      disabled={submitState !== 'idle'}
                    >
                      {submitState === 'idle' && 'Send message \u2197'}
                      {submitState === 'sending' && (
                        <span
                          className="submit-spinner"
                          style={{
                            width: 20,
                            height: 20,
                            border: '2px solid rgba(255,255,255,0.3)',
                            borderTopColor: 'white',
                            borderRadius: '50%',
                            display: 'inline-block',
                          }}
                        />
                      )}
                      {submitState === 'sent' && 'Sent \u00b7 thank you'}
                      {submitState === 'error' && 'Something went wrong. Try again'}
                    </button>
                  </Magnetic>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* ── Risk reversal ── */}
        <FadeIn delay={500}>
          <div
            style={{
              marginTop: 'var(--sp-10)',
              borderTop: '1px solid var(--line)',
              paddingTop: 'var(--sp-8)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--sp-4)',
            }}
          >
            <span className="mono" style={{ color: 'var(--fg-faint)', marginBottom: 'var(--sp-2)' }}>
              How it works
            </span>
            {[
              'Free 30-minute call. No obligation.',
              'You don\u2019t pay the balance until you approve the design.',
              '2 revision rounds included at every milestone.',
              'Weekly updates every Friday \u2014 you always know where things stand.',
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--sp-3)',
                }}
              >
                <span
                  style={{
                    color: 'var(--accent)',
                    flexShrink: 0,
                    marginTop: 2,
                    fontSize: 10,
                  }}
                >
                  &#9679;
                </span>
                <span
                  style={{
                    color: 'var(--fg-dim)',
                    fontFamily: 'var(--f-body)',
                    fontSize: 'var(--t-body-sm)',
                    lineHeight: 1.6,
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>

        <style jsx>{`
          .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--sp-12);
            align-items: start;
          }
          @media (max-width: 900px) {
            .contact-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* ── FAQ ── */}
      <section
        style={{
          padding: 'var(--section-gap) 0',
          background: 'transparent',
          borderTop: '1px solid var(--line)',
        }}
      >
        <div className="container">
          <div className="section-head">
            <span className="section-index">FAQ</span>
            <span className="section-label">Common questions</span>
          </div>

          <div style={{ borderTop: '1px solid var(--line)' }}>
            {faqItems.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
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

      {/* ── Location ── */}
      <section style={{ padding: 'var(--sp-16) 0 var(--section-gap)', background: 'transparent' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <FadeIn>
            <span
              className="mono"
              style={{
                color: 'var(--fg-faint)',
                fontSize: 'var(--t-mono)',
              }}
            >
              Based in Kuala Lumpur &middot; Available worldwide
            </span>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
