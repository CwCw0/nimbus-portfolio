'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import RevealLine from '@/components/ui/RevealLine';
import FadeIn from '@/components/ui/FadeIn';
import Magnetic from '@/components/ui/Magnetic';

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

export default function ContactSection() {
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

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
    <section
      id="contact"
      style={{ padding: 'var(--section-gap) 0', background: 'transparent' }}
    >
      <div className="container">
        {/* Section head */}
        <div className="section-head">
          <span className="section-index">08 / Contact</span>
          <span className="section-label">Avg response · under 24h</span>
        </div>

        {/* Two-column grid */}
        <div className="contact-grid">
          {/* ── Left ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-10)' }}>
            {/* Heading */}
            <h2>
              <RevealLine>
                <span className="display-xl">Let&apos;s work</span>
              </RevealLine>
              <RevealLine delay={120}>
                <span className="display-xl serif">together.</span>
              </RevealLine>
            </h2>

            {/* Pitch card */}
            <FadeIn delay={200}>
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
                <span className="display-sm" style={{ color: 'var(--fg)' }}>
                  Have a project in mind?
                </span>
                <p style={{ color: 'var(--fg-dim)', lineHeight: 1.7 }}>
                  Tell me what you need. I&apos;ll tell you how I&apos;d build it.
                </p>
                <Magnetic>
                  <a
                    href="https://calendly.com/heyitsnimbus/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{ alignSelf: 'flex-start', marginTop: 'var(--sp-2)' }}
                  >
                    Start a conversation <span aria-hidden="true">↗</span>
                  </a>
                </Magnetic>
              </div>
            </FadeIn>

            {/* Contact details */}
            <FadeIn delay={350}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 'var(--sp-6)',
                }}
              >
                {contactDetails.map((d) => (
                  <div key={d.label}>
                    <span className="mono" style={{ color: 'var(--fg-faint)', display: 'block', marginBottom: 'var(--sp-2)' }}>
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
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-8)' }}>
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
                    <span className="mono" style={{ color: 'var(--fg-faint)', marginRight: 8 }}>01</span>
                    Name
                  </label>
                </div>

                {/* 02 Email */}
                <div className="float-field">
                  <input type="email" name="email" placeholder=" " required />
                  <label>
                    <span className="mono" style={{ color: 'var(--fg-faint)', marginRight: 8 }}>02</span>
                    Email
                  </label>
                </div>

                {/* 03 Project type */}
                <div className="float-field">
                  <select name="projectType" defaultValue="" required>
                    <option value="" disabled>Select a type</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <label>
                    <span className="mono" style={{ color: 'var(--fg-faint)', marginRight: 8 }}>03</span>
                    Project type
                  </label>
                </div>

                {/* 04 Budget */}
                <div className="float-field">
                  <select name="budget" defaultValue="" required>
                    <option value="" disabled>Select a range</option>
                    {budgetRanges.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                  <label>
                    <span className="mono" style={{ color: 'var(--fg-faint)', marginRight: 8 }}>04</span>
                    Budget range
                  </label>
                </div>

                {/* 05 Details */}
                <div className="float-field">
                  <textarea name="details" placeholder=" " rows={4} required />
                  <label>
                    <span className="mono" style={{ color: 'var(--fg-faint)', marginRight: 8 }}>05</span>
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
                    {submitState === 'idle' && (<>Send message <span aria-hidden="true">↗</span></>)}
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

      <style jsx>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--sp-12);
          align-items: start;
        }
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
