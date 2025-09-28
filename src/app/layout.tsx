import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import "./globals.css";
import "highlight.js/styles/github.css";
import ClientSidebarWrapper from "../components/ClientSidebarWrapper";
import ThemeRegistry from "./ThemeRegistry";
import Script from "next/script";
import { Poppins } from "next/font/google";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "300",
});

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
        url: "/nirjal.jpg",
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
    images: ["/nirjal.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <AppRouterCacheProvider options={{ key: "css" }}>
          <ThemeRegistry>
            <ClientSidebarWrapper>
              {children}
              <Footer />
            </ClientSidebarWrapper>
          </ThemeRegistry>
        </AppRouterCacheProvider>
        <Script
          async
          id="gtag"
          src="https://www.googletagmanager.com/gtag/js?id=G-LZ4S5KBNWY"
        ></Script>
        <Script id="analytics">
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-LZ4S5KBNWY');
  `}
        </Script>
      </body>
    </html>
  );
}
