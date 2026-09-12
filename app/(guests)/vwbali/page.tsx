import type { Metadata } from "next";
import PhotoGallery from "@/components/photo-gallery";
import DomainHero from "@/components/domain-hero";
import DomainBooking from "@/components/domain-booking";
import EditorialFooter from "@/components/editorial-footer";
import FullDayTours from "@/components/full-day-tours";
import { SITES } from "@/lib/domains";
import BaliVideoStories from "@/components/balivideostories";

const site = SITES.vwbali;

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: "VW Bali Tours",
    title: site.title,
    description: site.description,
    images: [
      {
        url: `${site.url}/gallerypics/bali_vw_01.jpg`,
        width: 1200,
        height: 900,
        alt: "Guests on a classic Volkswagen safari tour in Bali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [`${site.url}/gallerypics/bali_vw_01.jpg`],
  },
};

export default function VwBaliPage() {
  return (
    <main className="min-h-screen bg-[#fbfaf6]">
      <DomainHero brand="Bali VW Tours" tagline="Stories from the road" eyebrow="Guest journals · Bali, Indonesia" title="Bali through" script="their eyes" description="No staged shots and no stock travel moments. Just the island as our guests lived it—from the back seat of a classic Volkswagen." image="/gallerypics/bali_vw_01.jpg" video="/bobby-vw-hero.mp4" ctaLabel="Meet our guests" navItems={[{ label: "Guest stories", href: "#gallery" }, { label: "Plan your day", href: "#contact" }]} />
      <PhotoGallery />
      <BaliVideoStories />
      <FullDayTours />
      <DomainBooking script="Make your own memories" title="Be part of the next story" description="Tell us who you're traveling with and what makes a perfect Bali day. We'll help shape the route—and leave plenty of room for the unplanned moments." image="/gallerypics/bali_vw_24.jpg" />
      <EditorialFooter current="vwbali" />
    </main>
  );
}
