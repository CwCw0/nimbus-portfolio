---
name: Nimbus Forma Studio
description: Creative builder portfolio and template storefront
colors:
  bg-primary: "#0A0A0F"
  bg-elevated: "#110F1C"
  bg-footer: "#08080D"
  bg-card: "#14122A"
  bg-card-alt: "#1C1935"
  border: "#221F38"
  border-light: "#2E2B45"
  accent-purple: "#7C5CFC"
  accent-purple-light: "#A78BFA"
  accent-teal: "#5EEAD4"
  accent-warm: "#F5C26B"
  text-primary: "#F0EFF5"
  text-secondary: "#B8B5C8"
  text-muted: "#6B6880"
  text-dim: "#5A5770"
  text-subtle: "#3A384A"
typography:
  display:
    fontFamily: "Instrument Serif, serif"
    fontSize: "clamp(42px, 10vw, 140px)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.03em"
    fontStyle: "italic for emphasis"
  body:
    fontFamily: "Outfit, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "Outfit, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "3px"
    textTransform: "uppercase"
rounded:
  none: "0px"
spacing:
  section-y: "128px"
  section-y-mobile: "80px"
  section-x: "64px"
  section-x-mobile: "24px"
  content-max: "1200px"
components:
  button-primary:
    backgroundColor: "{colors.accent-warm}"
    textColor: "#1a1400"
    rounded: "{rounded.none}"
    padding: "16px 36px"
    fontSize: "15px"
    fontWeight: 600
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  card:
    backgroundColor: "{colors.bg-card}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.none}"
    padding: "32px"
---

## Colors

Dark-first palette with purple as the identity color. Teal as secondary for data/tech contexts. Warm gold exclusively for CTAs and conversion moments.

**Color strategy: Committed.** Purple carries 30-40% of accent surfaces. Not restrained to 10%.

The dark background is not black; it's tinted toward deep indigo (#0A0A0F). Every neutral leans purple. Backgrounds use 4 distinct values to create layered depth without borders.

Text hierarchy uses 6 levels from near-white (#F0EFF5) to near-invisible (#2A283A). The gap between muted (#6B6880) and dim (#5A5770) is intentional; muted is readable, dim is atmospheric.

## Typography

Two fonts, strict roles:
- **Instrument Serif** (display): Headlines, hero text, decorative moments. Always italic when used for emphasis. Never for body text.
- **Outfit** (body): Everything else. Clean geometric sans-serif. Weights 300-700.

Labels use Outfit at 11px, tracking 3px, uppercase. This is the "whisper" voice of the site: section markers, metadata, navigation states.

Scale ratio is ~1.25 (major third). Hero headlines reach 140px on desktop, body stays at 15px. The gap is intentional; the site speaks in two volumes.

## Layout

No border-radius anywhere on the main site. Sharp edges communicate precision. The templates each have their own radius strategy.

Sections use generous vertical padding (128px desktop, 80px mobile). Horizontal padding is 64px desktop, 24px mobile.

Content maxes at 1200px but hero text breaks wider. The site breathes.

Grid is implicit, not visible. Two-column layouts use flex with percentage widths (35%/65% for About). No CSS Grid on the homepage.

## Iconography

Lucide React icons only. Stroke style, never filled. Size 16-20px. Color inherits from text or accent.

No custom illustrations. No emojis on the main site. The templates use emojis as part of their own design language, not Nimbus's.

## Motion

GSAP + ScrollTrigger for all scroll-linked animations. Lenis for smooth scrolling. SplitType for character-level text animation.

Entrance animations use power3.out easing. Scroll-linked parallax uses scrub with 1.5s lag. Exit animations use power2.inOut.

Reduced motion: all animations check prefers-reduced-motion and skip to final state.

Key signature animations:
- Hero "intention." letter assembly from scattered positions
- Footer wordmark strikethrough → "Forma Studio" reveal
- Services bento grid mouse-tracking radial glow
- Case study hover-following image with clip-path reveal

## Interaction

Custom cursor (ring that scales on interactive elements). Magnetic hover on CTA buttons. ScrambleText effect on nav link hover.

Form fields use floating labels with gradient glow underline on focus.

Cards respond to hover with border-color shift to accent, never with lift/shadow. The exception is the Services bento grid which uses a radial glow that follows the cursor.
