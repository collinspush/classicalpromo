import type { Metadata, Viewport } from "next";
import { Manrope, Syne } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const syne = Syne({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-syne" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "ClassicalPromo — One Song. Every Opportunity.",
    template: "%s · ClassicalPromo",
  },
  description: site.description,
  applicationName: "ClassicalPromo",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "ClassicalPromo",
    title: "ClassicalPromo — One Song. Every Opportunity.",
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "ClassicalPromo — One Song. Every Opportunity.",
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070708",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${syne.variable} h-full antialiased`}>
      <body className="min-h-full bg-ink text-ivory">
        <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-3 focus:py-2 focus:text-[#1a1408]">
          Skip to content
        </a>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.name,
            url: site.url,
            slogan: site.tagline,
            email: site.email,
            description: site.description,
            areaServed: ["NG", "GH", "ZA", "KE", "GB", "US", "CA"],
          }}
        />
        {children}
      </body>
    </html>
  );
}
