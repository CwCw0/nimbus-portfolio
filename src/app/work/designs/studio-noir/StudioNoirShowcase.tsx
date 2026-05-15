"use client";

import ShowcaseLayout from "../ShowcaseLayout";

export default function StudioNoirShowcase() {
  return (
    <ShowcaseLayout
      data={{
        slug: "studio-noir",
        name: "Studio Noir",
        category: "Dark Creative Studio",
        description:
          "A cinematic, animation-heavy website template for creative studios and design agencies. Pitch-black canvas, single violet accent, oversized editorial typography, GSAP-ready scroll animations.",
        techStack: ["Next.js", "GSAP", "Tailwind", "Lenis"],
        gumroadUrl: "",
        designChoices: [
          {
            num: "01",
            title: "Two-Color Constraint",
            body: "Pitch black #050505 + single violet accent #7C5CFC. Every Awwwards SOTY in the studio category uses two colors maximum. When you remove colour variety, typography and spacing become the design. The eye has nowhere to hide.",
          },
          {
            num: "02",
            title: "Typography as Hero",
            body: "No hero image. No stock photography. The first thing you see is type — Instrument Serif at 120px. This says 'we're confident enough that we don't need imagery to make an impression.' It also loads instantly and scales perfectly.",
          },
          {
            num: "03",
            title: "120px+ Section Gaps",
            body: "Most templates cram sections at 40-60px. Studio Noir uses 140px. Premium design breathes. Monocle, Bloomberg, Wallpaper* — they all use generous whitespace. It communicates confidence without saying a word.",
          },
          {
            num: "04",
            title: "Vertical Project List",
            body: "Not a card grid — a vertical list. Each project gets a full-width row with hover-triggered image reveal. The pattern used by Dennis Snellenberg (Awwwards SOTD) and Locomotive (7x Agency of the Year). Scannable, dramatic, mobile-perfect.",
          },
          {
            num: "05",
            title: "Ghost Watermark",
            body: "The massive letter at 500px behind the hero — at 1.5% opacity. Adds depth and atmosphere without clutter. Creates a layered visual hierarchy that makes the page feel designed, not assembled.",
          },
        ],
        uxDecisions: [
          {
            title: "Sticky Navigation",
            body: "Fixed nav with section anchors. Transparent — doesn't compete with content. Users always know where they are.",
          },
          {
            title: "Scroll-Triggered Reveals",
            body: "Every section has GSAP ScrollTrigger hooks. Characters stagger in, lines draw across, content fades up. Studies show scroll reveals increase time-on-page by 20-40%.",
          },
          {
            title: "Marquee Section Breaker",
            body: "Scrolling text strip communicates capabilities at a glance and creates visual rhythm between hero and content sections.",
          },
        ],
        included: [
          "6 sections (Hero, Marquee, Work, About, Services, Contact, Footer)",
          "Dark mode with carefully tuned opacity levels",
          "Responsive — same design intent on mobile, not a shrunken desktop",
          "Accessibility: proper contrast ratios, semantic HTML, skip-to-content",
          "Performance: zero external images in base — loads under 1 second",
          "GSAP class hooks on every section — animation-ready out of the box",
          "Next.js + Tailwind source code",
          "1-click Vercel deploy",
        ],
        excluded: [
          "No hamburger menu on desktop — never hide navigation from users who can see it",
          "No auto-playing video — performance killer, accessibility issue",
          "No parallax on mobile — drains battery, janky on touch",
          "No cookie banner — add your own if legally required, we don't bake tracking in",
        ],
        audience:
          "Creative studios, design agencies, freelance designers, photographers, architects — anyone whose work speaks for itself and needs a canvas that doesn't compete with it.",
        references: [
          "unseen.co",
          "locomotive.ca",
          "obys.agency",
          "dennissnellenberg.com",
          "aristidebenoist.com",
        ],
        ctaLine:
          "Source code, documentation, and a design that stands apart from every template marketplace. Built by one person who cares about every pixel.",
        hireSuffix: "for your brand",
      }}
    />
  );
}
