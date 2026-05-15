'use client';

import Link from 'next/link';
import RevealLine from '@/components/ui/RevealLine';
import FadeIn from '@/components/ui/FadeIn';
import Magnetic from '@/components/ui/Magnetic';

const commitments = [
  'Direct communication',
  'Weekly progress',
  'Code you own',
];

const tools = ['Next.js', 'React', 'TypeScript', 'GSAP', 'Tailwind', 'Vercel'];

export default function About() {
  return (
    <section
      id="about"
      style={{ padding: 'var(--section-gap) 0', background: 'transparent' }}
    >
      <div className="container">
        {/* Section head */}
        <div className="section-head">
          <span className="section-index">04 / About</span>
          <span className="section-label">The builder behind Nimbus</span>
        </div>

        {/* Heading */}
        <h2 style={{ marginBottom: 'var(--sp-12)' }}>
          <RevealLine>
            <span className="display-lg">Not just a dev.</span>
          </RevealLine>
          <RevealLine delay={120}>
            <span className="display-lg serif">A builder from end to end.</span>
          </RevealLine>
        </h2>

        {/* Two-column grid */}
        <div className="about-grid">
          {/* Left — pillar card */}
          <FadeIn>
            <div
              style={{
                border: '1px solid var(--line)',
                borderRadius: 'var(--r-lg)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                background: 'var(--glass-bg)',
                padding: 'var(--sp-10)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--sp-6)',
              }}
            >
              <span
                className="mono"
                style={{ color: 'var(--accent)', letterSpacing: '0.12em' }}
              >
                One project at a time.
              </span>

              <p style={{ color: 'var(--fg-dim)', lineHeight: 1.7 }}>
                I don&apos;t split attention across a dozen clients. When you work with me,
                you get one developer&apos;s full focus — from strategy to deploy.
                No project managers in between, no handoff gaps.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
                {commitments.map((c) => (
                  <li key={c} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
                    <span style={{ color: 'var(--accent)', fontWeight: 600 }}>→</span>
                    <span style={{ color: 'var(--fg)' }}>{c}</span>
                  </li>
                ))}
              </ul>

              <Magnetic>
                <Link href="/contact" className="btn" style={{ alignSelf: 'flex-start', marginTop: 'var(--sp-4)' }}>
                  Work with me <span aria-hidden="true">↗</span>
                </Link>
              </Magnetic>
            </div>
          </FadeIn>

          {/* Right — body text */}
          <FadeIn delay={200}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-8)' }}>
              <p
                style={{
                  fontFamily: 'var(--f-serif)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(22px, 2.5vw, 28px)',
                  lineHeight: 1.5,
                  color: 'var(--fg)',
                }}
              >
                I build websites, business tools, and AI automation. The real
                thing I do is take the messy way a business runs and turn it
                into one system that works.
              </p>

              <p style={{ color: 'var(--fg-dim)', lineHeight: 1.7 }}>
                Nimbus Forma Studio is a one-person practice based in Kuala Lumpur.
                I design in code — no Figma handoff, no translation layer. What you
                review is what ships. Every project gets the same stack, the same
                security standards, and the same level of care.
              </p>

              <p style={{ color: 'var(--fg-dim)', lineHeight: 1.7 }}>
                Before starting Nimbus, I spent years learning by building — not by
                watching. Every project you see here was designed, built, and deployed
                by one person. That focus is the product.
              </p>

              {/* Tools chip row */}
              <div style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
                {tools.map((tool) => (
                  <span
                    key={tool}
                    style={{
                      fontFamily: 'var(--f-mono)',
                      fontSize: 'var(--t-mono)',
                      letterSpacing: '0.08em',
                      padding: '4px 12px',
                      borderRadius: 'var(--r-pill)',
                      border: '1px solid var(--line-strong)',
                      color: 'var(--fg-dim)',
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <style jsx>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--sp-12);
          align-items: start;
        }
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
