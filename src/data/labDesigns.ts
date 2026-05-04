export type LabDesign = {
  slug: string;
  title: string;
  subtitle: string;
  category: "Website Design" | "UI Concept" | "Template";
  tags: string[];
  description: string;
  price: string | null; // null = showcase only, string = purchasable (e.g., "RM 299")
  previewImage: string;
  year: string;
  stack: string[];
  references: string[];
  status: "live" | "coming-soon";
  route: string;
  gumroadUrl: string;
};

export const labDesigns: LabDesign[] = [
  {
    slug: "studio-noir",
    title: "Studio Noir",
    subtitle: "Dark creative studio template",
    category: "Template",
    tags: ["Creative Studio", "Dark", "GSAP", "Editorial"],
    description:
      "A cinematic, animation-heavy website template for creative studios and design agencies. Pitch-black canvas with a single violet accent, oversized editorial serif typography, GSAP scroll-triggered reveals, magnetic cursor, and parallax case study sections. Inspired by Unseen Studio, Locomotive, and Obys Agency.",
    price: null,
    previewImage:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
    year: "2026",
    stack: ["Next.js", "GSAP", "Tailwind", "Lenis"],
    references: ["unseen.co", "locomotive.ca", "obys.agency"],
    status: "live",
    route: "/work/designs/studio-noir",
    gumroadUrl: "",
  },
  {
    slug: "elevate",
    title: "Elevate",
    subtitle: "Clean corporate & SaaS template",
    category: "Template",
    tags: ["Corporate", "SaaS", "Light", "Professional"],
    description:
      "A premium, light-mode corporate website template for SaaS companies, startups, and professional services. Structured 12-column grid, systematic spacing, monochrome palette with one saturated accent, bento feature cards, trust bars, and subtle scroll-triggered fades. Inspired by Linear, Stripe, and Vercel.",
    price: null,
    previewImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    year: "2026",
    stack: ["Next.js", "Tailwind", "Framer Motion"],
    references: ["linear.app", "stripe.com", "vercel.com"],
    status: "live",
    route: "/work/designs/elevate",
    gumroadUrl: "",
  },
  {
    slug: "pop-store",
    title: "Pop Store",
    subtitle: "Vibrant e-commerce template",
    category: "Template",
    tags: ["E-commerce", "Playful", "Bold", "Product-first"],
    description:
      "A loud, personality-driven e-commerce template for brands that refuse to be boring. Per-product color theming, neo-brutalist elements with chunky borders, scroll-triggered product animations, illustration-meets-photography hybrid layouts, and microcopy that drips with attitude. Inspired by Tony's Chocolonely, Simply Chocolate, and Liquid Death.",
    price: null,
    previewImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
    year: "2026",
    stack: ["Next.js", "GSAP", "Tailwind"],
    references: ["tonyschocolonely.com", "simplychocolate.com", "liquiddeath.com"],
    status: "live",
    route: "/work/designs/pop-store",
    gumroadUrl: "",
  },
  {
    slug: "vitalis",
    title: "Vitalis",
    subtitle: "Healthcare & wellness clinic template",
    category: "Template",
    tags: ["Healthcare", "Wellness", "Rounded", "Warm"],
    description:
      "A warm, calming healthcare website template that breaks free from clinical sterility. Soft greens, rounded elements, Playfair Display serif, booking CTAs, trust indicators, and testimonials. Built for physio clinics, wellness centres, and medical practices.",
    price: null,
    previewImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
    year: "2026",
    stack: ["Next.js", "GSAP", "Tailwind"],
    references: ["parsleyhealth.com", "hims.com", "hevahealth.com"],
    status: "live",
    route: "/work/designs/vitalis",
    gumroadUrl: "",
  },
  {
    slug: "roast",
    title: "Roast",
    subtitle: "Specialty coffee & cafe template",
    category: "Template",
    tags: ["Coffee", "Artisan", "Editorial", "Warm"],
    description:
      "An artisan, editorial coffee shop template with earthy tones, Cormorant Garamond serif, parallax hero, origin-focused product cards, and full-bleed photography. For specialty coffee roasters, cafes, and artisan food brands.",
    price: null,
    previewImage:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
    year: "2026",
    stack: ["Next.js", "GSAP", "Tailwind"],
    references: ["ceremonycoffee.com", "coffeecollective.dk", "seycoffee.com"],
    status: "live",
    route: "/work/designs/roast",
    gumroadUrl: "",
  },
  {
    slug: "mono",
    title: "Mono",
    subtitle: "Ultra-minimal portfolio template",
    category: "Template",
    tags: ["Minimal", "Portfolio", "Type-only", "B&W"],
    description:
      "Extreme minimalism. One font (Syne), zero decoration, black on white. Project titles ARE the navigation — hover reveals accent colour. For designers, developers, and creatives who let their work speak.",
    price: null,
    previewImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
    year: "2026",
    stack: ["Next.js", "GSAP", "Tailwind"],
    references: ["stevenmengin.com", "olhalazarieva.com", "minimalwim.com"],
    status: "live",
    route: "/work/designs/mono",
    gumroadUrl: "",
  },
];

export const labCategories = ["All", "Website Design", "UI Concept", "Template"];
