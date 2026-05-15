'use client';

import { useRef, useEffect } from 'react';
import RevealLine from '@/components/ui/RevealLine';
import FadeIn from '@/components/ui/FadeIn';
import { processSteps } from '@/data/process';

export default function Process() {
  return (
    <section
      id="process"
      style={{ padding: 'var(--section-gap) 0', background: 'transparent' }}
    >
      <div className="container">
        {/* Section head */}
        <div className="section-head">
          <span className="section-index">05 / Process</span>
          <span className="section-label">How it actually works</span>
        </div>

        {/* Heading */}
        <h2 style={{ marginBottom: 'var(--sp-16)' }}>
          <RevealLine>
            <span className="display-lg">How it actually</span>
          </RevealLine>
          <RevealLine delay={120}>
            <span className="display-lg serif">works.</span>
          </RevealLine>
        </h2>

        {/* Rows */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {processSteps.map((step, i) => (
            <ProcessRow key={step.n} step={step} delay={i * 200} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessRow({
  step,
  delay,
}: {
  step: (typeof processSteps)[0];
  delay: number;
}) {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transform = 'scaleY(1)';
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="process-row"
      style={{
        borderTop: '1px solid var(--line)',
        padding: 'var(--sp-12) 0',
      }}
    >
      {/* Number */}
      <div className="process-number">
        <span
          style={{
            fontFamily: 'var(--f-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(80px, 10vw, 140px)',
            lineHeight: 0.9,
            color: 'var(--accent)',
            letterSpacing: '-0.03em',
          }}
        >
          {step.n}
        </span>
      </div>

      {/* Content */}
      <FadeIn delay={delay}>
        <div>
          <span className="mono" style={{ color: 'var(--fg-dim)', display: 'block', marginBottom: 'var(--sp-4)' }}>
            {step.kicker}
          </span>
          <RevealLine delay={delay + 100}>
            <span className="display-md">{step.title}</span>
          </RevealLine>
          <p style={{ color: 'var(--fg-dim)', lineHeight: 1.7, marginTop: 'var(--sp-5)', maxWidth: 560 }}>
            {step.body}
          </p>
        </div>
      </FadeIn>

      {/* Rail */}
      <div className="process-rail">
        <div
          ref={railRef}
          style={{
            width: 1,
            height: '100%',
            background: 'var(--accent)',
            transformOrigin: 'top',
            transform: 'scaleY(0)',
            transition: 'transform 0.8s var(--ease-out)',
          }}
        />
      </div>

      <style jsx>{`
        .process-row {
          display: grid;
          grid-template-columns: 200px 1fr 1px;
          gap: var(--sp-10);
          align-items: start;
        }
        .process-number {
          display: flex;
          align-items: flex-start;
        }
        .process-rail {
          display: flex;
          justify-content: center;
          min-height: 120px;
        }
        @media (max-width: 900px) {
          .process-row {
            grid-template-columns: 80px 1fr;
          }
          .process-rail {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
