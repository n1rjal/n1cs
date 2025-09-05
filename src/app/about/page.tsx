
import { Metadata } from 'next';
import AboutPageClient from "@/components/AboutPageClient";

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn more about Nirjal Paudel, his skills, experience, and accomplishments.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
