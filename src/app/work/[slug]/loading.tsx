/* Proof-page skeleton — hairline frames on ink, slow pulse. No gray boxes. */
export default function Loading() {
  return (
    <div className="csk-root">
      <div className="container" style={{ paddingTop: 'clamp(120px, 15vh, 170px)' }}>
        <div className="csk csk-line" style={{ width: 110 }} />
        <div className="csk csk-pill" style={{ width: 190, marginTop: 40 }} />
        <div className="csk csk-title" style={{ width: 'min(560px, 80%)', marginTop: 22 }} />
        <div className="csk csk-line" style={{ width: 'min(620px, 92%)', marginTop: 26 }} />
        <div className="csk csk-line" style={{ width: 'min(460px, 70%)', marginTop: 12 }} />
        <div className="csk csk-line" style={{ width: 'min(520px, 78%)', marginTop: 34, height: 10 }} />
        <div className="csk csk-frame" style={{ marginTop: 48 }} />
      </div>
      <style>{`
        .csk-root { min-height: 100vh; }
        .csk {
          background: #14121F;
          border: 1px solid rgba(245, 240, 230, 0.07);
          animation: csk-pulse 1.6s ease-in-out infinite;
        }
        .csk-line { height: 14px; }
        .csk-pill { height: 26px; border-radius: 999px; }
        .csk-title { height: clamp(48px, 7vw, 92px); }
        .csk-frame { width: 100%; aspect-ratio: 16 / 10; }
        @keyframes csk-pulse {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.8; }
        }
        @media (prefers-reduced-motion: reduce) {
          .csk { animation: none; opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
