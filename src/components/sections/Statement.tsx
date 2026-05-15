'use client';

import RevealLine from '@/components/ui/RevealLine';

const lines = [
  { text: 'We study the problem.', serif: false },
  { text: 'We design the system.', serif: true },
  { text: 'We build the solution.', serif: false },
  { text: 'We measure the result.', serif: true },
  { text: 'Every pixel earns its place.', serif: false },
];

export default function Statement() {
  return (
    <section
      id="statement"
      style={{ padding: 'var(--section-gap) 0', background: 'transparent' }}
    >
      <div className="container">
        {/* Section head */}
        <div className="section-head">
          <span className="section-index">01 / Statement</span>
          <span className="section-label">A studio of one · made with care</span>
        </div>

        {/* Lines */}
        <h2 style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)', marginTop: 'var(--sp-8)' }}>
          {lines.map((line, i) => (
            <RevealLine key={i} delay={i * 120}>
              <span
                className={`display-lg ${line.serif ? 'serif' : ''}`}
                style={!line.serif ? { color: 'var(--fg)' } : undefined}
              >
                {line.text}
              </span>
            </RevealLine>
          ))}
        </h2>
      </div>
    </section>
  );
}
