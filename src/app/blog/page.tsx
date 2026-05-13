import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog — Web Design, AI & Building in Malaysia",
  description: "Thoughts on web development, design, AI tools, and the builder mindset. From a founder building real products in Kuala Lumpur, Malaysia.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Nimbus Blog — Building, Learning & Shipping",
    description: "Thoughts on web development, design, productivity, and the builder mindset.",
    url: "/blog",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
