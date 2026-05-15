'use client';

/* ─── Reusable Marquee ─── */

interface MarqueeStripProps {
  items: string[];
  separator?: string;
  speed?: number;
  italic?: boolean;
  reverse?: boolean;
}

function MarqueeStrip({
  items,
  separator = '✦',
  speed = 45,
  italic = false,
  reverse = false,
}: MarqueeStripProps) {
  // Duplicate 4x for seamless loop
  const repeated = [...items, ...items, ...items, ...items];
  const duration = `${speed}s`;

  return (
    <div
      style={{
        overflow: 'hidden',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        background: 'transparent',
        whiteSpace: 'nowrap',
      }}
    >
      <div
        className={reverse ? 'marquee-track-reverse' : 'marquee-track'}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0,
          animationDuration: duration,
          padding: 'var(--sp-5) 0',
        }}
      >
        {repeated.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span
              style={{
                fontFamily: "var(--f-display)",
                fontWeight: 700,
                fontSize: 'clamp(36px, 7vw, 96px)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                color: 'var(--fg)',
                fontStyle: italic ? 'italic' : 'normal',
                padding: '0 clamp(12px, 2vw, 32px)',
              }}
            >
              {item}
            </span>
            <span
              style={{
                color: 'var(--accent)',
                fontSize: 'calc(clamp(36px, 7vw, 96px) * 0.55)',
                lineHeight: 1,
                padding: '0 clamp(8px, 1.5vw, 24px)',
              }}
            >
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default MarqueeStrip;

/* ─── Preset: Design ─── */
export function MarqueeDesign() {
  return (
    <MarqueeStrip
      items={['DESIGN', 'DEVELOP', 'DEPLOY', 'AUTOMATE', 'SCALE']}
    />
  );
}

/* ─── Preset: Attention (two rows) ─── */
export function MarqueeAttention() {
  return (
    <div>
      <MarqueeStrip
        items={['Fast to respond', 'Focused when it counts']}
        speed={50}
      />
      <MarqueeStrip
        items={['One developer', 'Full attention', 'No compromises']}
        speed={55}
        reverse
        italic
      />
    </div>
  );
}
