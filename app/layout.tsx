import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Caveat, Geist, Oswald } from "next/font/google";
import { headers } from "next/headers";
import { siteForHost } from "@/lib/domains";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-body" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-display" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-script" });

async function getSite() {
  const headersList = await headers();
  return siteForHost(headersList.get("host"));
}

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();

  return {
    metadataBase: new URL(site.url),
    title: {
      default: site.title,
      template: `%s | ${site.title}`,
    },
    description: site.description,
    keywords: [
      "VW tour Bali",
      "Bali Volkswagen safari",
      "classic VW Bali tour",
      "Bali convertible tour",
      "Bali safari tour",
      "Bali VW Beetle tour",
      "Bali island tour",
      "Bali sightseeing tour",
    ],
    authors: [{ name: "VW Tour Bali" }],
    creator: "VW Tour Bali",
    publisher: "VW Tour Bali",
    applicationName: site.title,
    category: "Travel",
    alternates: {
      canonical: site.url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: site.url,
      siteName: site.title,
      title: site.title,
      description: site.description,
      images: [
        {
          url: "/hero-1.jpg",
          width: 1200,
          height: 630,
          alt: "Classic Volkswagen convertible safari tour in Bali",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@vwtourbali",
      creator: "@vwtourbali",
      title: site.title,
      description: site.description,
      images: ["/og-social-share.png"],
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon.png", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: "/vw-icon.png",
    },
    manifest: "/manifest.webmanifest",
    formatDetection: {
      telephone: true,
      email: true,
      address: true,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#263b27",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSite();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "VW Tour Bali",
    alternateName: "Bali Safari Tour",
    description: site.description,
    url: site.url,
    image: `${site.url}/og-social-share.png`,
    logo: `${site.url}/vw-logo-3.svg`,
    telephone: "+62-812-3781-2783",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bali",
      addressCountry: "ID",
    },
    areaServed: {
      "@type": "Place",
      name: "Bali, Indonesia",
    },
    sameAs: [],
  };

  return (
    <html lang="en" className={`${geist.variable} ${oswald.variable} ${caveat.variable} scroll-smooth`}>
      <head>
        <meta charSet="utf-8" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased"><ClerkProvider dynamic>{children}</ClerkProvider></body>
    </html>
  );
}
