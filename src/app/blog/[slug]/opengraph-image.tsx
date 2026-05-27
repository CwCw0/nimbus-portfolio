import { ImageResponse } from "next/og";
import { getPostBySlug, blogPosts } from "@/data/blog";

export const alt = "Nimbus Forma Studio — Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  const title = post?.title ?? "Blog Post";
  const tag = post?.tag ?? "Post";
  const readTime = post?.readTime ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
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
            background:
              "radial-gradient(circle, rgba(124,92,252,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Top row: brand + tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
              NIMBUS FORMA STUDIO
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                color: "#6B6880",
                fontSize: "13px",
                letterSpacing: "2px",
                fontWeight: 500,
              }}
            >
              {tag.toUpperCase()}
            </span>
            {readTime && (
              <span
                style={{
                  color: "#4A4860",
                  fontSize: "13px",
                  letterSpacing: "1px",
                }}
              >
                · {readTime}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: title.length > 60 ? "48px" : title.length > 40 ? "56px" : "64px",
              fontWeight: 700,
              color: "#EEEDF5",
              lineHeight: 1.1,
              letterSpacing: "-2px",
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <span
            style={{
              color: "#4A4860",
              fontSize: "14px",
              letterSpacing: "1px",
            }}
          >
            nimbusformastudio.com/blog
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              border: "1px solid rgba(124,92,252,0.3)",
              padding: "8px 16px",
            }}
          >
            <span
              style={{
                color: "#7C5CFC",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              Built with intention.
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
