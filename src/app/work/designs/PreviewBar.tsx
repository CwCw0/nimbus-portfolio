"use client";

/**
 * PreviewBar — Universal exit bar for all template previews.
 * Fixed top bar with template name + clear exit button.
 * Also forces scroll to top on mount to fix the auto-scroll bug.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PreviewBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);

  // Extract template name and base path from URL
  const match = pathname.match(/\/work\/designs\/([^/]+)\/preview/);
  const templateSlug = match?.[1] || "";
  const exitPath = `/work/designs/${templateSlug}`;

  const templateNames: Record<string, string> = {
    "studio-noir": "Studio Noir",
    elevate: "Elevate",
    "pop-store": "Pop Store",
    vitalis: "Vitalis",
    roast: "Roast",
    mono: "Mono",
  };

  const templateName = templateNames[templateSlug] || templateSlug;

  // Force scroll to top on mount + route change (fixes auto-scroll bug)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        background: "rgba(15, 15, 15, 0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        fontFamily: "Inter, -apple-system, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span
          style={{
            padding: "3px 10px",
            background: "rgba(124, 92, 252, 0.15)",
            border: "1px solid rgba(124, 92, 252, 0.3)",
            borderRadius: 4,
            fontSize: 11,
            fontWeight: 600,
            color: "#A78BFA",
            letterSpacing: 0.5,
          }}
        >
          PREVIEW
        </span>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>
          {templateName} Template
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Link
          href="/work"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "7px 14px",
            background: "none",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 500,
            color: "rgba(255,255,255,0.5)",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.9)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.5)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          }}
        >
          All Templates
        </Link>
        <Link
          href={exitPath}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "7px 16px",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            color: "#fff",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.18)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
          }}
        >
          ← Exit Preview
        </Link>
      </div>
    </div>
  );
}
