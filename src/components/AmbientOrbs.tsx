"use client";

export default function AmbientOrbs() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {/* Purple orb — top right */}
      <div
        className="absolute rounded-full"
        style={{
          width: "600px",
          height: "600px",
          top: "-10%",
          right: "-5%",
          background:
            "radial-gradient(circle, rgba(124,92,252,0.03) 0%, transparent 70%)",
          animation: "ambient-drift-1 25s ease-in-out infinite",
        }}
      />
      {/* Teal orb — bottom left */}
      <div
        className="absolute rounded-full"
        style={{
          width: "500px",
          height: "500px",
          bottom: "10%",
          left: "-8%",
          background:
            "radial-gradient(circle, rgba(94,234,212,0.02) 0%, transparent 70%)",
          animation: "ambient-drift-2 30s ease-in-out infinite",
        }}
      />
      {/* Subtle purple — center */}
      <div
        className="absolute rounded-full"
        style={{
          width: "700px",
          height: "700px",
          top: "40%",
          left: "30%",
          background:
            "radial-gradient(circle, rgba(124,92,252,0.02) 0%, transparent 70%)",
          animation: "ambient-drift-3 35s ease-in-out infinite",
        }}
      />
    </div>
  );
}
