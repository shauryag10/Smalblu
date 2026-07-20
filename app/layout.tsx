import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { site } from "@/lib/site";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "SmalBlu | Your AI Infrastructure Optimization Team",
    template: "%s | SmalBlu",
  },
  description: site.description,
  keywords: [
    "cloud cost optimization",
    "AI infrastructure optimization",
    "FinOps",
    "cross-layer optimization",
    "database optimization",
    "cloud sustainability",
    "AI agents",
  ],
  authors: [{ name: "SmalBlu" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: "SmalBlu",
    title: "SmalBlu | Your AI Infrastructure Optimization Team",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "SmalBlu | Your AI Infrastructure Optimization Team",
    description:
      "AI agents that work 24/7 to cut cloud costs by 40%, boost performance by 30%, and reduce data carbon footprint by 35%.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#04080f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
