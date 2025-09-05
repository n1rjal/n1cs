import type { Metadata } from "next";
import { Roboto } from "next/font/google"; // Import Roboto
import "./globals.css";
import "highlight.js/styles/github.css";
import ThemeRegistry from "./ThemeRegistry";
import Sidebar from "../components/Sidebar"; // Import Sidebar

const roboto = Roboto({
  weight: ["300", "400", "500", "700"], // Specify weights to load
  subsets: ["latin"],
  display: "swap", // Optimize font loading
}); // Initialize Roboto

export const metadata: Metadata = {
  title: {
    template: '%s | Nirjal Paudel',
    default: 'Nirjal Paudel - Software Developer',
  },
  viewport: 'width=device-width, initial-scale=1',
  description: 'The personal website and blog of Nirjal Paudel, a software developer passionate about building things for the web.',
  keywords: ['Nirjal Paudel', 'n1rjal', 'software developer', 'web developer', 'blog', 'portfolio', 'typescript', 'react', 'nextjs', 'python', 'django'],
  authors: [{ name: 'Nirjal Paudel', url: 'https://nirjalpaudel.com.np' }],
  openGraph: {
    title: 'Nirjal Paudel - Software Developer',
    description: 'The personal website and blog of Nirjal Paudel, a software developer passionate about building things for the web.',
    url: 'https://nirjalpaudel.com.np',
    siteName: 'Nirjal Paudel',
    images: [
      {
        url: '/nirjal.jpeg',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nirjal Paudel - Software Developer',
    description: 'The personal website and blog of Nirjal Paudel, a software developer passionate about building things for the web.',
    creator: '@n1rjal',
    images: ['/nirjal.jpeg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <ThemeRegistry>
          <Sidebar>{children}</Sidebar>
        </ThemeRegistry>
      </body>
    </html>
  );
}
