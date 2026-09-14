import type { Metadata } from "next";
import TripPlanner from "@/components/trip-planner";
import DomainHero from "@/components/domain-hero";
import DomainBooking from "@/components/domain-booking";
import EditorialFooter from "@/components/editorial-footer";
import FullDayTours from "@/components/full-day-tours";
import { SITES } from "@/lib/domains";

const site = SITES.balisafari;

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: "Bali Safari Tours",
    title: site.title,
    description: site.description,
    images: [
      {
        url: `${site.url}/tourpics/volcano.jpg`,
        width: 1200,
        height: 900,
        alt: "Mount Batur volcano viewpoint in Bali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [`${site.url}/tourpics/volcano.jpg`],
  },
};

export default function BaliSafariPage() {
  return (
    <main className="min-h-screen bg-[#fbfaf6]">
      <DomainHero brand="Bali Safari Tours" tagline="Build your island route" eyebrow="Interactive island planner" title="Your Bali" script="your route" description="Pin the temples, coastlines and highland roads that call to you. Then shape them into a trip that makes sense—with enough space to enjoy the way there." image="/tourpics/volcano.jpg" ctaLabel="Start planning" navItems={[{ label: "Interactive map", href: "#content" }, { label: "Trip lengths", href: "#itineraries" }, { label: "Book the route", href: "#contact" }]} />
      <TripPlanner />
      <FullDayTours />
      <DomainBooking script="Ready to make it real?" title="Let a local connect the dots" description="Share your saved places, dates and hotel area. We’ll turn them into a smooth private route and handle the driving while you enjoy the island." image="/tourpics/jatiluwih3.jpg" />
      <EditorialFooter current="balisafari" />
    </main>
  );
}
