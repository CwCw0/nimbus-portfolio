import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on learning, building, and growing as a developer. Articles on web development, design, productivity, and the builder mindset.",
};

export default function BlogPage() {
  return <BlogContent />;
}
