import type { Metadata } from "next";
import TripPlanner from "@/components/trip-planner";
import DomainHero from "@/components/domain-hero";
import DomainBooking from "@/components/domain-booking";
import EditorialFooter from "@/components/editorial-footer";
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

const tours = [
  {
    name: "Bali Ubud Waterfall",
    duration: "Full day · Nature",
    summary: "Go deeper into Bali's green interior on a circuit of four very different jungle waterfalls.",
    stops: ["Monkey Forest", "Gunung Kawi Sebatu", "Ulu Petanu Waterfall"],
  },
  {
    name: "Bali Ubud Tour",
    duration: "Full day · Culture",
    summary: "Trace Bali's spiritual landscape through mountain sanctuaries and ancient stone shrines.",
    stops: ["Barong Dance", "Ubud Art Market", "Silver Jewelry / Paintings", "Tegalalang Rice Terrace"],
  },
  {
    name: "Kintamani Volcano Tour",
    duration: "Full day · Highlands",
    summary: "Culture, craft villages and rice terraces on the road to Mount Batur and its crater lake.",
    stops: ["Tegalalang Rice Terrace", "Coffee Plantation", "Mount Batur View"],
  },
  {
    name: "Uluwatu Sunset Tour",
    duration: "Full day · Sunset",
    summary: "Clifftop temple views, the rhythmic Kecak fire dance and an easy evening on the coast.",
    stops: ["Pandawa Beach", "Uluwatu Temple", "Kecak Fire Dance", "Jimbaran Bay"],
  },
  {
    name: "Tabanan Tour",
    duration: "Full day · Scenic",
    summary: "Experience incredible views of Bali, local villages, and the Ubud Market.",
    stops: ["Tanah Lot Temple", "Coffee Plantation", "Jatiluwih Rice Terrace"],
  },
  {
    name: "Instagram Tour",
    duration: "Full day · Photo route",
    summary: "A camera-ready loop through Bali's best-known temples, volcano, terrace and swing viewpoints.",
    stops: ["Custom Route", "Bali Swing", "Waterfalls", "Temples", "Rice Terraces"],
  },
];

const whatsappBase = "https://wa.me/6281237812783?text=";

export default function BaliSafariPage() {
  return (
    <main className="min-h-screen bg-[#fbfaf6]">
      <DomainHero 
        brand="Bali Safari Tours" 
        tagline="Build your island route" 
        eyebrow="Interactive island planner" 
        title="Your Bali" 
        script="your route" 
        description="Pin the temples, coastlines and highland roads that call to you. Then shape them into a trip that makes sense—with enough space to enjoy the way there." 
        image="/tourpics/volcano.jpg" 
        ctaLabel="Start planning" 
        navItems={[
          { label: "Interactive map", href: "#content" }, 
          { label: "Popular tours", href: "#popular-tours" }, 
          { label: "Book the route", href: "#contact" }
        ]} 
      />
      <TripPlanner />

      {/* Popular Tours Grid Section from add-this.png */}
      <section id="popular-tours" className="scroll-mt-24 bg-[#f4f3ee] py-24 lg:py-32">
        <div className="container-max container-padding">
          <div className="mb-14 text-center">
            <p className="script text-4xl text-[#718b4c]">What kind of day fits?</p>
            <h2 className="mt-1 font-[family-name:var(--font-display)] text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl">
              Our popular tours
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-black/55">
              A shorter edit of Bali&apos;s best coast, culture, waterfall and highland routes—enough detail to compare without planning every minute.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tours.map((tour, index) => {
              const featured = index === 0;
              const message = encodeURIComponent(`Hi Bobby, I'm interested in the ${tour.name}. Could you help me plan it?`);

              return (
                <article
                  key={tour.name}
                  className={`${featured ? "bg-[#425f32] text-white" : "bg-white text-[#20241f]"} group flex min-h-[430px] flex-col p-7 shadow-[0_18px_50px_rgb(30_42_25/0.08)] transition duration-500 hover:-translate-y-1 hover:bg-[#425f32] hover:text-white sm:p-9`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#8ea65d]">{tour.duration}</p>
                  <h3 className="mt-6 font-[family-name:var(--font-display)] text-3xl font-black uppercase leading-[.95] tracking-tight">
                    {tour.name}
                  </h3>
                  <p className={`${featured ? "text-white/65" : "text-black/55"} mt-5 text-sm leading-6 group-hover:text-white/65`}>
                    {tour.summary}
                  </p>
                  <ol className={`${featured ? "border-white/15" : "border-black/10"} mt-7 space-y-2 border-t pt-6 group-hover:border-white/15`}>
                    {tour.stops.map((stop, stopIndex) => (
                      <li key={stop} className={`${featured ? "text-white/72" : "text-black/60"} flex gap-3 text-xs leading-5 group-hover:text-white/72`}>
                        <span className="font-bold text-[#8ea65d]">{String(stopIndex + 1).padStart(2, "0")}</span>
                        {stop}
                      </li>
                    ))}
                  </ol>
                  <a
                    href={`${whatsappBase}${message}`}
                    className={`${featured ? "border-white/25 text-white" : "border-black/15 text-[#425f32]"} mt-auto inline-flex items-center justify-between border-t pt-6 text-[10px] font-bold uppercase tracking-[.18em] group-hover:border-white/25 group-hover:text-white`}
                  >
                    Ask about this tour <span aria-hidden>↗</span>
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <DomainBooking script="Ready to make it real?" title="Let a local connect the dots" description="Share your saved places, dates and hotel area. We’ll turn them into a smooth private route and handle the driving while you enjoy the island." image="/tourpics/jatiluwih3.jpg" />
      <EditorialFooter current="balisafari" />
    </main>
  );
}
