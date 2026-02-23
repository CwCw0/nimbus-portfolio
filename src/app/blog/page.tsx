import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog — Building, Learning & Shipping",
  description: "Thoughts on web development, design, productivity, and the builder mindset. From a founder building real products.",
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
