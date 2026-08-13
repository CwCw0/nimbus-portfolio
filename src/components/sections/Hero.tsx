'use client';

import Link from 'next/link';
import RevealLine from '@/components/ui/RevealLine';
import FadeIn from '@/components/ui/FadeIn';
import Magnetic from '@/components/ui/Magnetic';

export default function Hero() {

  return (
    <section
      id="hero"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'var(--section-gap) 0',
        background:
          'radial-gradient(1400px 800px at 80% 20%, rgba(42, 26, 85, 0.20), transparent 60%), radial-gradient(1200px 700px at 0% 100%, rgba(124, 92, 252, 0.04), transparent 65%)',
      }}
    >
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-12)' }}>
        {/* Eyebrow */}
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
            <span className="status-dot" />
            <span className="mono" style={{ color: 'var(--fg-dim)' }}>
              Currently accepting 1 new project for Q3 2026
            </span>
          </div>
        </FadeIn>

        {/* Title */}
        <h1>
          <RevealLine>
            <span className="display-xl">I build the AI-powered system</span>
          </RevealLine>
          <RevealLine delay={120}>
            <span
              className="display-xl"
              style={{ paddingLeft: 'clamp(40px, 8vw, 180px)', color: 'var(--accent)' }}
            >
              that runs your operation.
            </span>
          </RevealLine>
        </h1>

        {/* Meta area — 2 col */}
        <div className="hero-meta">
          <FadeIn delay={300}>
            <p style={{ color: 'var(--fg-dim)', maxWidth: 520, lineHeight: 1.7 }}>
              Internal dashboards, workflow automation, and assistants trained on
              your own data. Custom-coded — not templates, not a subscription.
              Deployed, documented, and yours to own.
            </p>
          </FadeIn>
          <FadeIn delay={450}>
            <div style={{ display: 'flex', gap: 'var(--sp-4)', flexWrap: 'wrap' }}>
              <Magnetic>
                <Link href="/work" className="btn">
                  See the work <span aria-hidden="true">↗</span>
                </Link>
              </Magnetic>
            </div>
          </FadeIn>
        </div>

        {/* Byline */}
        <FadeIn delay={600}>
          <span className="mono" style={{ color: 'var(--fg-faint)' }}>
            Dee — solo builder, Kuala Lumpur. Nimbus Forma Studio (SSM 202603095969).
          </span>
        </FadeIn>
      </div>

      <style jsx>{`
        .hero-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--sp-10);
          align-items: start;
        }
        @media (max-width: 900px) {
          .hero-meta {
            grid-template-columns: 1fr;
            gap: var(--sp-6);
          }
          h1 .display-xl {
            padding-left: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
