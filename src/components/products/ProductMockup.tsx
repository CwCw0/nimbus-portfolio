"use client";

import Image from "next/image";
import { type Product } from "../../data/products";

type Size = "card" | "hero";

type Props = {
  product: Product;
  size?: Size;
};

/**
 * ProductMockup
 * -------------
 * Renders the product preview inside an honest device frame.
 *
 *   - mockup.type === "screenshot" → real PNG inside a laptop / phone /
 *     desktop frame.
 *   - mockup.type === "concept"    → typographic placeholder built from the
 *     product accent + name. Honest "in build" treatment, no fake UI.
 *
 * The same component is used on both the wall card (`size="card"`) and the
 * product detail hero (`size="hero"`).
 */
export default function ProductMockup({ product, size = "card" }: Props) {
  const { mockup, accent, name, status } = product;

  if (mockup.type === "screenshot" && mockup.image) {
    if (mockup.device === "phone") {
      return <PhoneFrame src={mockup.image} alt={name} accent={accent.hex} size={size} />;
    }
    if (mockup.device === "desktop") {
      return <DesktopFrame src={mockup.image} alt={name} accent={accent.hex} size={size} />;
    }
    if (mockup.device === "terminal") {
      return <TerminalFrame src={mockup.image} alt={name} accent={accent.hex} size={size} />;
    }
    // Default screenshot device is laptop
    return <LaptopFrame src={mockup.image} alt={name} accent={accent.hex} size={size} />;
  }

  // ---- Concept (honest "in build") ----
  return (
    <ConceptPlaceholder
      product={product}
      size={size}
      statusLabel={
        status === "in-development" ? "In build" : status === "coming-soon" ? "Coming soon" : "Concept"
      }
    />
  );
}

// ===========================================================================
// LAPTOP FRAME — for productivity / web app screenshots
// ===========================================================================
function LaptopFrame({
  src,
  alt,
  accent,
  size,
}: {
  src: string;
  alt: string;
  accent: string;
  size: Size;
}) {
  const heightClass = size === "hero" ? "h-[440px] max-md:h-[280px]" : "h-[340px] max-md:h-[240px]";
  return (
    <div className={`relative w-full ${heightClass} flex items-center justify-center px-8 max-md:px-4`}>
      <div
        className="relative w-full max-w-[680px]"
        style={{
          filter: `drop-shadow(0 30px 60px ${accent}22) drop-shadow(0 60px 120px rgba(0,0,0,0.5))`,
        }}
      >
        {/* Screen */}
        <div
          className="relative w-full overflow-hidden rounded-t-[14px] border border-white/[0.08] bg-black"
          style={{ aspectRatio: "16 / 10" }}
        >
          {/* Top chrome bar */}
          <div className="absolute left-0 right-0 top-0 z-10 flex h-5 items-center gap-1.5 border-b border-white/[0.06] bg-[#1a1a1f]/90 px-3 backdrop-blur-sm">
            <span className="h-[7px] w-[7px] rounded-full bg-[#ff5f57]" />
            <span className="h-[7px] w-[7px] rounded-full bg-[#febc2e]" />
            <span className="h-[7px] w-[7px] rounded-full bg-[#28c840]" />
          </div>
          {/* Screenshot fills the rest */}
          <div className="absolute inset-0 top-5">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 90vw, 680px"
              className="object-cover object-top"
              priority={size === "hero"}
            />
          </div>
        </div>
        {/* Laptop hinge / base */}
        <div className="relative h-3 w-full overflow-hidden">
          <div
            className="absolute left-1/2 top-0 h-3 -translate-x-1/2 rounded-b-[14px] border border-t-0 border-white/[0.08] bg-gradient-to-b from-[#2a2a31] to-[#16161a]"
            style={{ width: "calc(100% + 24px)" }}
          />
          <div className="absolute left-1/2 top-1.5 h-px w-16 -translate-x-1/2 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}

// ===========================================================================
// PHONE FRAME — for mobile-first apps
// ===========================================================================
function PhoneFrame({
  src,
  alt,
  accent,
  size,
}: {
  src: string;
  alt: string;
  accent: string;
  size: Size;
}) {
  const heightClass = size === "hero" ? "h-[480px]" : "h-[360px]";
  return (
    <div className={`relative flex w-full ${heightClass} items-center justify-center`}>
      <div
        className="relative h-full"
        style={{
          aspectRatio: "9 / 19",
          filter: `drop-shadow(0 30px 60px ${accent}26) drop-shadow(0 60px 120px rgba(0,0,0,0.55))`,
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[36px] border-[3px] border-[#1a1a1f] bg-black">
          {/* Notch */}
          <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-[#0a0a0f]" />
          <div className="absolute inset-0">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 60vw, 240px"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ===========================================================================
// DESKTOP FRAME — for menubar / floating-window apps
// ===========================================================================
function DesktopFrame({
  src,
  alt,
  accent,
  size,
}: {
  src: string;
  alt: string;
  accent: string;
  size: Size;
}) {
  const heightClass = size === "hero" ? "h-[440px] max-md:h-[280px]" : "h-[340px] max-md:h-[240px]";
  return (
    <div className={`relative flex w-full ${heightClass} items-center justify-center px-8 max-md:px-4`}>
      <div
        className="relative w-full max-w-[640px] overflow-hidden rounded-[12px] border border-white/[0.08] bg-black"
        style={{
          aspectRatio: "16 / 10",
          filter: `drop-shadow(0 30px 60px ${accent}22) drop-shadow(0 60px 120px rgba(0,0,0,0.5))`,
        }}
      >
        <div className="absolute left-0 right-0 top-0 z-10 flex h-7 items-center gap-1.5 border-b border-white/[0.06] bg-[#1a1a1f]/90 px-3 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        </div>
        <div className="absolute inset-0 top-7">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 90vw, 640px"
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

// ===========================================================================
// TERMINAL FRAME — for CLI tools
// ===========================================================================
function TerminalFrame({
  src,
  alt,
  accent,
  size,
}: {
  src: string;
  alt: string;
  accent: string;
  size: Size;
}) {
  const heightClass = size === "hero" ? "h-[440px] max-md:h-[280px]" : "h-[340px] max-md:h-[240px]";
  return (
    <div className={`relative flex w-full ${heightClass} items-center justify-center px-8 max-md:px-4`}>
      <div
        className="relative w-full max-w-[600px] overflow-hidden rounded-[10px] border border-white/[0.1] bg-[#0c0c10]"
        style={{
          aspectRatio: "5 / 3",
          filter: `drop-shadow(0 30px 60px ${accent}22) drop-shadow(0 60px 120px rgba(0,0,0,0.5))`,
        }}
      >
        <div className="absolute left-0 right-0 top-0 z-10 flex h-6 items-center gap-1.5 border-b border-white/[0.06] bg-[#16161c]/90 px-3 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
          <span className="ml-auto font-mono text-[9px] text-white/40">~ /nimbus</span>
        </div>
        <div className="absolute inset-0 top-6">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 90vw, 600px"
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

// ===========================================================================
// CONCEPT PLACEHOLDER — honest "in build" treatment, no fake UI
// ===========================================================================
function ConceptPlaceholder({
  product,
  size,
  statusLabel,
}: {
  product: Product;
  size: Size;
  statusLabel: string;
}) {
  const { accent, name, mockup, releaseDate, markStyle } = product;
  const heightClass = size === "hero" ? "h-[480px] max-md:h-[320px]" : "h-[340px] max-md:h-[240px]";
  const useSans = markStyle === "sans";

  // Each device hint gets a slightly different abstract treatment so it
  // still feels per-product, but nothing pretends to be real UI.
  return (
    <div
      className={`relative w-full ${heightClass} flex items-center justify-center overflow-hidden`}
    >
      {/* Concept-style background — accent radial + grid */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${accent.soft}, transparent 70%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${accent.hex}10 1px, transparent 1px), linear-gradient(90deg, ${accent.hex}10 1px, transparent 1px)`,
          backgroundSize: size === "hero" ? "60px 60px" : "40px 40px",
          maskImage: "radial-gradient(circle at center, black, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle at center, black, transparent 70%)",
        }}
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-5 text-center">
        {/* In-build chip */}
        <div
          className="flex items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur-md"
          style={{
            background: `${accent.hex}10`,
            border: `1px solid ${accent.hex}33`,
          }}
        >
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full"
            style={{ background: accent.hex, boxShadow: `0 0 10px ${accent.hex}` }}
          />
          <span
            className="font-body text-[10px] font-semibold tracking-[2px] uppercase"
            style={{ color: accent.hex }}
          >
            {statusLabel}
          </span>
        </div>

        {/* Big mark */}
        <span
          className={`relative select-none ${
            useSans
              ? "font-body font-bold tracking-[-0.04em]"
              : "font-display italic tracking-[-0.04em]"
          }`}
          style={{
            fontSize: size === "hero" ? "clamp(80px, 12vw, 180px)" : "clamp(56px, 6vw, 100px)",
            color: accent.hex,
            lineHeight: 0.9,
            textShadow: `0 0 80px ${accent.glow}`,
          }}
        >
          {name}
        </span>

        {/* Device hint + release window */}
        {(mockup.device || releaseDate) && (
          <div className="flex items-center gap-3 font-body text-[10px] tracking-[2.5px] text-white/50 uppercase">
            {mockup.device && <span>{mockup.device}</span>}
            {mockup.device && releaseDate && <span className="h-px w-4 bg-white/30" />}
            {releaseDate && <span>{releaseDate}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
