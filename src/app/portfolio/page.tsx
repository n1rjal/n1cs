import type { Metadata } from "next";
import PortfolioPageClient from "@/components/PortfolioPageClient";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Learn more about Nirjal Paudel (technically), his skills, experience, and accomplishments.",
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
