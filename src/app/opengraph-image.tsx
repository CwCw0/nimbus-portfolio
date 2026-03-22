import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nimbus — Creative Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          background: "#0A0A0F",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(124,92,252,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,92,252,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,92,252,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Top label */}
        <div
          style={{
            position: "absolute",
            top: "72px",
            left: "80px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#7C5CFC",
            }}
          />
          <span
            style={{
              color: "#7C5CFC",
              fontSize: "13px",
              letterSpacing: "3px",
              fontWeight: 600,
            }}
          >
            NIMBUS STUDIO
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", zIndex: 1 }}>
          <div
            style={{
              fontSize: "80px",
              fontWeight: 700,
              color: "#EEEDF5",
              lineHeight: 1.05,
              letterSpacing: "-2px",
            }}
          >
            Websites.
            <br />
            <span style={{ color: "#7C5CFC" }}>Branding.</span>
            <br />
            Results.
          </div>

          <p
            style={{
              fontSize: "22px",
              color: "#6B6880",
              marginTop: "8px",
              fontWeight: 400,
            }}
          >
            End-to-end web design, development & AI tools.
          </p>
        </div>

        {/* Bottom row */}
        <div
          style={{
            position: "absolute",
            bottom: "72px",
            right: "80px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            border: "1px solid rgba(124,92,252,0.3)",
            padding: "10px 20px",
          }}
        >
          <span style={{ color: "#7C5CFC", fontSize: "14px", fontWeight: 600 }}>
            heyitsnimbus@gmail.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
