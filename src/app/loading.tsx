/* Generic route skeleton — editorial hairline pulse, matches the V6 system. */
export default function Loading() {
  return (
    <div className="gsk-root">
      <div className="container" style={{ paddingTop: 'clamp(140px, 18vh, 200px)' }}>
        <div className="gsk gsk-kicker" />
        <div className="gsk gsk-title" style={{ width: 'min(640px, 85%)' }} />
        <div className="gsk gsk-line" style={{ width: 'min(560px, 75%)' }} />
        <div className="gsk gsk-line" style={{ width: 'min(420px, 60%)' }} />
        <div className="gsk-grid">
          <div className="gsk gsk-cell" />
          <div className="gsk gsk-cell" />
          <div className="gsk gsk-cell" />
        </div>
      </div>
      <style>{`
        .gsk-root { min-height: 100vh; }
        .gsk {
          background: #14121F;
          border: 1px solid rgba(245, 240, 230, 0.07);
          animation: gsk-pulse 1.6s ease-in-out infinite;
        }
        .gsk-kicker { width: 150px; height: 12px; }
        .gsk-title { height: clamp(44px, 6vw, 80px); margin-top: 26px; }
        .gsk-line { height: 14px; margin-top: 16px; }
        .gsk-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          margin-top: 56px;
        }
        .gsk-cell { height: 140px; }
        @media (max-width: 700px) {
          .gsk-grid { grid-template-columns: 1fr; }
        }
        @keyframes gsk-pulse {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.8; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gsk { animation: none; opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
