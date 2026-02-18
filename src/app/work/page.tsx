import type { Metadata } from "next";
import WorkContent from "./WorkContent";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects showcasing design, development, and strategy by Nimbus.",
};

export default function WorkPage() {
  return <WorkContent />;
}
