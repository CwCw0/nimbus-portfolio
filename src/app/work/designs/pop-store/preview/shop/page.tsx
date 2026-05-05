"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { PopLayout, P, BASE, useIsMobile, allProducts } from "../shared";

gsap.registerPlugin(ScrollTrigger);

const filters = [
  { label: "All", value: "all" },
  { label: "New Drops", value: "NEW DROP" },
  { label: "Bestsellers", value: "BESTSELLER" },
  { label: "Fan Favorites", value: "FAN FAVORITE" },
  { label: "Limited", value: "LIMITED" },
];

export default function ShopPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [activeFilter, setActiveFilter] = useState("all");
  const [cartCount, setCartCount] = useState(0);

  const filtered =
    activeFilter === "all"
      ? allProducts
      : allProducts.filter((p) => p.tag === activeFilter);

  /* ── GSAP scroll animations ──────────────────────────────────── */
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      el.querySelectorAll(".ps-shop-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0, rotation: i % 2 === 0 ? -3 : 3, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            rotation: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.4)",
            delay: i * 0.08,
            scrollTrigger: { trigger: card, start: "top 92%", once: true },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [activeFilter]);

  const addToCart = () => setCartCount((c) => c + 1);

  return (
    <PopLayout cartCount={cartCount}>
      {/* Header area */}
      <section style={{ padding: "60px 40px 0", maxWidth: 1200, margin: "0 auto" }}>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            color: P.coral,
            letterSpacing: 2,
          }}
        >
          THE COLLECTION
        </span>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(44px, 7vw, 72px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginTop: 6,
          }}
        >
          All The Good Stuff.
        </h1>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 17,
            color: P.muted,
            maxWidth: 500,
            lineHeight: 1.75,
            marginTop: 12,
          }}
        >
          Every product we make, all in one place. Filter by vibe, click on
          anything, add to cart recklessly.
        </p>
      </section>

      {/* Filter bar */}
      <section
        style={{
          padding: "32px 40px 0",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          {filters.map((f) => {
            const isActive = activeFilter === f.value;
            return (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                style={{
                  padding: "12px 28px",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 1,
                  border: P.border,
                  background: isActive ? P.text : P.bg,
                  color: isActive ? P.textLight : P.text,
                  cursor: "pointer",
                  boxShadow: isActive ? P.shadow : "none",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.transform = "translate(-2px, -2px)";
                    e.currentTarget.style.boxShadow = P.shadow;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.transform = "translate(0,0)";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            color: P.muted,
            marginTop: 16,
          }}
        >
          Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
        </div>
      </section>

      {/* Product grid */}
      <section
        ref={gridRef}
        style={{ padding: "32px 40px 100px", maxWidth: 1200, margin: "0 auto" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: 20,
          }}
        >
          {filtered.map((prod) => (
            <div
              key={prod.id}
              className="ps-shop-card"
              style={{
                background: prod.color + "12",
                border: P.border,
                position: "relative",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-5px, -5px)";
                e.currentTarget.style.boxShadow = "10px 10px 0 #1A1A1A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Tag */}
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  padding: "4px 12px",
                  background: prod.color,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 9,
                  fontWeight: 700,
                  color: P.textLight,
                  letterSpacing: 1.5,
                  border: P.borderThin,
                  zIndex: 2,
                }}
              >
                {prod.tag}
              </div>

              {/* Image / emoji placeholder */}
              <Link
                href={`${BASE}/product?id=${prod.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    height: 240,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: prod.color + "18",
                    borderBottom: P.border,
                  }}
                >
                  <span style={{ fontSize: 80, transition: "transform 0.3s" }}>
                    {prod.emoji}
                  </span>
                </div>
              </Link>

              {/* Info */}
              <div style={{ padding: 18 }}>
                <Link
                  href={`${BASE}/product?id=${prod.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 18,
                      fontWeight: 700,
                    }}
                  >
                    {prod.name}
                  </h3>
                </Link>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 12,
                    color: P.muted,
                    marginTop: 4,
                    lineHeight: 1.5,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {prod.desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 12,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 22,
                      fontWeight: 700,
                    }}
                  >
                    {prod.price}
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart();
                    }}
                    style={{
                      padding: "9px 18px",
                      background: P.text,
                      color: P.textLight,
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 1,
                      cursor: "pointer",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = prod.color)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = P.text)
                    }
                  >
                    ADD TO CART
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            <span style={{ fontSize: 64 }}>🤷</span>
            <p
              style={{
                fontSize: 20,
                fontWeight: 700,
                marginTop: 16,
              }}
            >
              Nothing here yet. Check back soon!
            </p>
          </div>
        )}
      </section>
    </PopLayout>
  );
}
