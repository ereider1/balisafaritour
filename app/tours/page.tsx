import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/header";
import EditorialFooter from "@/components/editorial-footer";
import { SITES } from "@/lib/domains";

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

export const metadata: Metadata = {
  title: "Popular Private Bali Tours",
  description:
    "Explore our most popular private Bali routes by classic open-top Volkswagen, from Ubud waterfalls and temple tours to Mount Batur and sunset on the coast.",
  alternates: { canonical: `${SITES.main.url}/tours` },
  openGraph: {
    type: "website",
    url: `${SITES.main.url}/tours`,
    title: "Popular Private Bali Tours",
    description: "Twelve flexible Bali route ideas, explored in a classic open-top Volkswagen with a local driver-guide.",
    images: [{ url: `${SITES.main.url}/gallerypics/bali_vw_04.jpg`, width: 1200, height: 900, alt: "Classic Volkswagen tour through Bali" }],
  },
};

const whatsappBase = "https://wa.me/6281237812783?text=";

export default function ToursPage() {
  return (
    <main className="min-h-screen bg-[#f4f3ee] text-[#20241f]">
      <section className="relative min-h-[54vh] overflow-hidden bg-[#263b27] text-white">
        <Header
          overlay
          navItems={[
            { label: "Tour options", href: "#tour-options" },
            { label: "Build your own", href: "#build-your-own" },
            { label: "Back home", href: "/" },
          ]}
        />
        <Image
          src="/gallerypics/bali_vw_04.jpg"
          alt="Classic Volkswagen on a private Bali tour"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,37,25,.92),rgba(21,37,25,.5)_65%,rgba(21,37,25,.2))]" />
        <div className="container-max container-padding relative z-10 flex min-h-[54vh] items-end pb-16 pt-40 lg:items-center lg:pb-0">
          <div className="max-w-4xl animate-rise">
            <p className="text-[10px] font-bold uppercase tracking-[.28em] text-white/65">Private · Flexible · Open-top VW</p>
            <h1 className="mt-5 font-(family-name:--font-display) text-[clamp(3.4rem,7vw,6.8rem)] font-black uppercase leading-[.82] tracking-[-.05em]">
              Choose your<br /><span className="script inline-block -rotate-2 text-[1.04em] text-[#b6cd72]">Bali road</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              Start with one of our most-loved routes. Every tour is private, and the stops can be shaped around your pace, hotel and wish list.
            </p>
          </div>
        </div>
      </section>

      <section id="tour-options" className="scroll-mt-24 py-24 lg:py-32">
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

      <section id="build-your-own" className="bg-[#425f32] py-20 text-white lg:py-24">
        <div className="container-max container-padding grid gap-8 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
          <div>
            <p className="script text-4xl text-[#b6cd72]">Nothing quite right?</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-5xl font-black uppercase leading-[.9] tracking-tight sm:text-6xl">Mix the stops.<br />Make it yours.</h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/65">Tell us what you want to see, where you are staying and how active you want the day to feel. We&apos;ll connect the stops into a realistic private route.</p>
          </div>
          <div className="lg:text-right">
            <a href="https://www.balisafari.tours" className="btn-primary bg-[#79924f] px-8 py-4">Build my route <span aria-hidden>↗</span></a>
          </div>
        </div>
      </section>

      <EditorialFooter current="main" />
    </main>
  );
}
