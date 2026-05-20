'use client';

import RevealLine from '@/components/ui/RevealLine';

const lines = [
  { text: 'We build for clients.', serif: false },
  { text: 'We ship our own products.', serif: true },
  { text: 'We use what we build.', serif: false },
  { text: 'Then we build it for you.', serif: true },
  { text: 'Every system earns its place.', serif: false },
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
