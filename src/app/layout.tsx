import type { Metadata } from "next";
import "./globals.css";
import "highlight.js/styles/github.css";
import ClientSidebarWrapper from "../components/ClientSidebarWrapper";
import ThemeRegistry from "./ThemeRegistry";

export const metadata: Metadata = {
  title: {
    template: "%s | Nirjal Paudel",
    default: "Nirjal Paudel - Software Developer",
  },
  viewport: "width=device-width, initial-scale=1",
  description:
    "The personal website and blog of Nirjal Paudel, a software developer passionate about building things for the web.",
  keywords: [
    "Nirjal Paudel",
    "n1rjal",
    "software developer",
    "web developer",
    "blog",
    "portfolio",
    "typescript",
    "react",
    "nextjs",
    "python",
    "django",
  ],
  authors: [{ name: "Nirjal Paudel", url: "https://nirjalpaudel.com.np" }],
  openGraph: {
    title: "Nirjal Paudel - Software Developer",
    description:
      "The personal website and blog of Nirjal Paudel, a software developer passionate about building things for the web.",
    url: "https://nirjalpaudel.com.np",
    siteName: "Nirjal Paudel",
    images: [
      {
        url: "/nirjal.jpeg",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nirjal Paudel - Software Developer",
    description:
      "The personal website and blog of Nirjal Paudel, a software developer passionate about building things for the web.",
    creator: "@n1rjal",
    images: ["/nirjal.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <ThemeRegistry>
          <ClientSidebarWrapper>{children}</ClientSidebarWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
