import type { Metadata } from "next";
import AttractionGuide from "@/components/attraction-guide";
import DomainHero from "@/components/domain-hero";
import DomainBooking from "@/components/domain-booking";
import EditorialFooter from "@/components/editorial-footer";
import FullDayTours from "@/components/full-day-tours";
import { SITES } from "@/lib/domains";

const site = SITES.gobali;

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  alternates: {
    canonical: `${site.url}${site.path}`,
  },
  openGraph: {
    type: "website",
    url: `${site.url}${site.path}`,
    siteName: "Go Bali Tours",
    title: site.title,
    description: site.description,
    images: [
      {
        url: `${site.url}/tourpics/tanah-lot.jpg`,
        width: 1200,
        height: 900,
        alt: "Tanah Lot sea temple at sunset in Bali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [`${site.url}/tourpics/tanah-lot.jpg`],
  },
};

export default function GoBaliPage() {
  return (
    <main className="min-h-screen bg-[#fbfaf6]">
      <DomainHero eyebrow="Temples · Terraces · Wild places" title="Go beyond" script="the guidebook" description="A field guide to Bali's essential places—what they feel like, when the light is best, and the local details that make each stop worth the road." image="/tourpics/tanah-lot.jpg" ctaLabel="Open the field guide" />
      <AttractionGuide />
      <FullDayTours />
      <DomainBooking script="Seen something you love?" title="Turn the guide into a journey" description="Send us the places on your shortlist. A local driver-guide will connect them into a realistic private route with the right timing, pace and a few good surprises." image="/tourpics/uluwatu.jpg" />
      <EditorialFooter current="gobali" />
    </main>
  );
}
