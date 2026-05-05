"use client";

import { useRef, useEffect, useState, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PopLayout, P, BASE, useIsMobile, allProducts } from "../shared";

gsap.registerPlugin(ScrollTrigger);

const sizes = ["250ml", "500ml", "1L", "Pack of 6"];

const details = [
  {
    title: "Ingredients",
    body: "Filtered water, organic cold-pressed fruit, natural flavors, a pinch of audacity. No artificial sweeteners, no preservatives, no regrets.",
  },
  {
    title: "Nutrition",
    body: "Calories: 45 per serving | Sugar: 8g (all from fruit) | Sodium: 0mg | Vibes: immeasurable. Consult your taste buds for full details.",
  },
  {
    title: "Shipping",
    body: "Free shipping on orders over $50. Standard delivery in 3-5 business days. Express available because we get it, you're excited.",
  },
  {
    title: "Returns",
    body: "30-day no-questions-asked returns. If you don't love it, we failed. But you'll love it. They always love it.",
  },
];

function ProductContent() {
  const mainRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id") || "the-original";
  const [cartCount, setCartCount] = useState(0);
  const [selectedSize, setSelectedSize] = useState(sizes[1]);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [qty, setQty] = useState(1);

  const product = allProducts.find((p) => p.id === productId) || allProducts[0];
  const related = allProducts.filter((p) => p.id !== product.id).slice(0, 4);

  /* ── GSAP animations ──────────────────────────────────────────── */
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Product image entrance
      const img = el.querySelector(".ps-pdp-image");
      if (img) {
        gsap.fromTo(
          img,
          { scale: 0.8, opacity: 0, rotation: -5 },
          { scale: 1, opacity: 1, rotation: 0, duration: 0.9, ease: "back.out(1.4)", delay: 0.1 }
        );
      }

      // Product info stagger
      el.querySelectorAll(".ps-pdp-info").forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.4)", delay: 0.2 + i * 0.08 }
        );
      });

      // Related products
      el.querySelectorAll(".ps-related").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.4)",
            delay: i * 0.1,
            scrollTrigger: { trigger: card, start: "top 92%", once: true },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [productId]);

  const addToCart = () => setCartCount((c) => c + qty);

  return (
    <PopLayout cartCount={cartCount}>
      <div ref={mainRef}>
        {/* Breadcrumb */}
        <section style={{ padding: "20px 40px", maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              gap: 8,
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              color: P.muted,
            }}
          >
            <Link
              href={BASE}
              style={{ color: P.muted, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = P.coral)}
              onMouseLeave={(e) => (e.currentTarget.style.color = P.muted)}
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href={`${BASE}/shop`}
              style={{ color: P.muted, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = P.coral)}
              onMouseLeave={(e) => (e.currentTarget.style.color = P.muted)}
            >
              Shop
            </Link>
            <span>/</span>
            <span style={{ color: P.text, fontWeight: 600 }}>{product.name}</span>
          </div>
        </section>

        {/* Main product layout */}
        <section
          style={{
            padding: "20px 40px 80px",
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 32 : 60,
          }}
        >
          {/* Left: product image */}
          <div
            className="ps-pdp-image"
            style={{
              background: product.color + "18",
              border: P.border,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: isMobile ? 320 : 520,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                padding: "6px 16px",
                background: product.color,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 10,
                fontWeight: 700,
                color: P.textLight,
                letterSpacing: 1.5,
                border: P.borderThin,
              }}
            >
              {product.tag}
            </div>
            <span style={{ fontSize: isMobile ? 120 : 180 }}>{product.emoji}</span>
          </div>

          {/* Right: product info */}
          <div>
            <span
              className="ps-pdp-info"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: product.color,
                letterSpacing: 2,
                display: "block",
              }}
            >
              {product.tag}
            </span>

            <h1
              className="ps-pdp-info"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(36px, 5vw, 52px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                marginTop: 8,
              }}
            >
              {product.name}
            </h1>

            <div
              className="ps-pdp-info"
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 12,
                marginTop: 12,
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 36,
                  fontWeight: 700,
                }}
              >
                {product.price}
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  color: P.green,
                  fontWeight: 600,
                }}
              >
                Free shipping over $50
              </span>
            </div>

            <p
              className="ps-pdp-info"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 16,
                lineHeight: 1.75,
                color: P.muted,
                marginTop: 20,
                maxWidth: 440,
              }}
            >
              {product.desc}
            </p>

            {/* Size selector */}
            <div className="ps-pdp-info" style={{ marginTop: 32 }}>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 2,
                  display: "block",
                  marginBottom: 10,
                }}
              >
                SIZE / VARIANT
              </span>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {sizes.map((s) => {
                  const isActive = selectedSize === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      style={{
                        padding: "10px 22px",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 13,
                        fontWeight: 700,
                        border: P.border,
                        background: isActive ? P.text : P.bg,
                        color: isActive ? P.textLight : P.text,
                        cursor: "pointer",
                        boxShadow: isActive ? P.shadow : "none",
                        transition: "all 0.12s",
                      }}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity + add to cart */}
            <div
              className="ps-pdp-info"
              style={{
                display: "flex",
                gap: 12,
                marginTop: 28,
                alignItems: "stretch",
                flexWrap: "wrap",
              }}
            >
              {/* Qty */}
              <div
                style={{
                  display: "flex",
                  border: P.border,
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  style={{
                    width: 44,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 20,
                    fontWeight: 700,
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  −
                </button>
                <span
                  style={{
                    width: 40,
                    textAlign: "center",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    borderLeft: P.border,
                    borderRight: P.border,
                    padding: "10px 0",
                  }}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  style={{
                    width: 44,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 20,
                    fontWeight: 700,
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={addToCart}
                style={{
                  flex: 1,
                  minWidth: 200,
                  padding: "16px 40px",
                  background: product.color,
                  color: P.textLight,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: 1,
                  border: P.border,
                  boxShadow: P.shadow,
                  cursor: "pointer",
                  transition: "all 0.12s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translate(-3px, -3px)";
                  e.currentTarget.style.boxShadow = P.shadowHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translate(0,0)";
                  e.currentTarget.style.boxShadow = P.shadow;
                }}
              >
                ADD TO CART — {product.price}
              </button>
            </div>

            {/* Trust badges */}
            <div
              className="ps-pdp-info"
              style={{
                display: "flex",
                gap: 20,
                marginTop: 24,
                flexWrap: "wrap",
              }}
            >
              {["🚚 Free Shipping", "↩️ 30-Day Returns", "🌱 100% Natural"].map(
                (badge) => (
                  <span
                    key={badge}
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 12,
                      color: P.muted,
                    }}
                  >
                    {badge}
                  </span>
                )
              )}
            </div>

            {/* Accordion details */}
            <div className="ps-pdp-info" style={{ marginTop: 40 }}>
              {details.map((d, i) => (
                <div
                  key={d.title}
                  style={{
                    borderTop: i === 0 ? P.border : "none",
                    borderBottom: P.border,
                    borderLeft: P.border,
                    borderRight: P.border,
                  }}
                >
                  <button
                    onClick={() =>
                      setOpenAccordion(openAccordion === i ? null : i)
                    }
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "16px 20px",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 14,
                      fontWeight: 700,
                      border: "none",
                      background: openAccordion === i ? P.text : "transparent",
                      color: openAccordion === i ? P.textLight : P.text,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {d.title}
                    <span
                      style={{
                        fontSize: 18,
                        transform:
                          openAccordion === i ? "rotate(45deg)" : "rotate(0)",
                        transition: "transform 0.2s",
                      }}
                    >
                      +
                    </span>
                  </button>
                  {openAccordion === i && (
                    <div
                      style={{
                        padding: "16px 20px",
                        fontFamily: "Inter, sans-serif",
                        fontSize: 14,
                        lineHeight: 1.7,
                        color: P.muted,
                        background: P.bg,
                      }}
                    >
                      {d.body}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related products */}
        <section style={{ padding: "0 40px 100px", maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 28,
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: P.coral,
                  letterSpacing: 2,
                }}
              >
                YOU MIGHT ALSO LIKE
              </span>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: 700,
                  marginTop: 4,
                }}
              >
                More Good Stuff.
              </h2>
            </div>
            <Link
              href={`${BASE}/shop`}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                borderBottom: `2px solid ${P.text}`,
                paddingBottom: 2,
                cursor: "pointer",
                textDecoration: "none",
                color: P.text,
              }}
            >
              VIEW ALL →
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
              gap: 20,
            }}
          >
            {related.map((prod) => (
              <Link
                key={prod.id}
                href={`${BASE}/product?id=${prod.id}`}
                className="ps-related"
                style={{
                  background: prod.color + "12",
                  border: P.border,
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  display: "block",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translate(-4px, -4px)";
                  e.currentTarget.style.boxShadow = "8px 8px 0 #1A1A1A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translate(0, 0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    height: 180,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: prod.color + "18",
                    borderBottom: P.border,
                  }}
                >
                  <span style={{ fontSize: 60 }}>{prod.emoji}</span>
                </div>
                <div style={{ padding: 14 }}>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                    }}
                  >
                    {prod.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 18,
                      fontWeight: 700,
                      marginTop: 4,
                      display: "block",
                    }}
                  >
                    {prod.price}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PopLayout>
  );
}

export default function ProductPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            background: P.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          Loading product...
        </div>
      }
    >
      <ProductContent />
    </Suspense>
  );
}
