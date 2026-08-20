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
    "cloud energy efficiency",
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
      "AI agents that work 24/7 to cut cloud costs by 40%, save 35% of infrastructure energy, and boost performance by 30%.",
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
        {/* framed page canvas: hairline side rails with a darker gutter outside */}
        <div className="px-3 sm:px-6">
          <div className="mx-auto max-w-[1440px] border-x border-white/[0.07] bg-night">
            <main id="main">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
