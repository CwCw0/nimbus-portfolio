import { ImageResponse } from "next/og";

export const alt = "Nimbus Forma Studio — I build the AI-powered system that runs your operation.";
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(124,92,252,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,92,252,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
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
            style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#7C5CFC" }}
          />
          <span
            style={{ color: "#7C5CFC", fontSize: "13px", letterSpacing: "3px", fontWeight: 600 }}
          >
            NIMBUS FORMA STUDIO
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "62px",
              fontWeight: 700,
              color: "#F5F0E6",
              lineHeight: 1.12,
              letterSpacing: "-2px",
            }}
          >
            <div style={{ display: "flex" }}>I build the AI-powered</div>
            <div style={{ display: "flex", color: "#7C5CFC" }}>system that runs</div>
            <div style={{ display: "flex" }}>your operation.</div>
          </div>
          <p style={{ fontSize: "22px", color: "#948BBC", marginTop: "8px", fontWeight: 400 }}>
            Dashboards · custom apps · assistants trained on your own data. Yours to own.
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
            border: "1px solid rgba(124,92,252,0.3)",
            padding: "10px 20px",
          }}
        >
          <span style={{ color: "#7C5CFC", fontSize: "14px", fontWeight: 600 }}>
            NIMBUSFORMASTUDIO.COM
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
