import PortfolioPageClient from "@/components/PortfolioPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Learn more about Nirjal Paudel (technically), his skills, experience, and accomplishments.",
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
