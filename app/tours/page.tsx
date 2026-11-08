import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import EditorialFooter from "@/components/editorial-footer";
import { SITES } from "@/lib/domains";
import { TOURS } from "@/lib/tours";

export const metadata: Metadata = {
  title: "Popular Private Bali Tours",
  description:
    "Explore seven private Bali routes by classic open-top Volkswagen, from Ubud's art and rice terraces to Mount Batur and sunset on the coast.",
  alternates: { canonical: `${SITES.main.url}/tours` },
  openGraph: {
    type: "website",
    url: `${SITES.main.url}/tours`,
    title: "Popular Private Bali Tours",
    description: "Seven flexible Bali route ideas, explored in a classic open-top Volkswagen with a local driver-guide.",
    images: [{ url: `${SITES.main.url}/gallerypics/bali_vw_04.jpg`, width: 1200, height: 900, alt: "Classic Volkswagen tour through Bali" }],
  },
};

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
          src="/gallerypics/bali_vw_01.jpg"
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
            <p className="mt-7 mb-8 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
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
            {TOURS.map((tour, index) => {
              const featured = index === 0;

              return (
                <article
                  key={tour.slug}
                  className={`${featured ? "bg-[#425f32] text-white" : "bg-white text-[#20241f]"} group overflow-hidden shadow-[0_18px_50px_rgb(30_42_25/0.08)] transition duration-500 hover:-translate-y-1 hover:bg-[#425f32] hover:text-white`}
                >
                  <Link href={`/tours/${tour.slug}`} className="flex h-full flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#263b27]">
                      <Image
                        src={tour.image}
                        alt={`${tour.name} in Bali`}
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-7 sm:p-9">
                      <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#8ea65d]">
                        {tour.location} · {tour.duration}
                      </p>
                      <h3 className="mt-5 font-[family-name:var(--font-display)] text-3xl font-black uppercase leading-[.95] tracking-tight">
                        {tour.name}
                      </h3>
                      <p className={`${featured ? "text-white/65" : "text-black/55"} mt-4 text-sm leading-6 group-hover:text-white/65`}>
                        {tour.summary}
                      </p>
                      <ol className={`${featured ? "border-white/15" : "border-black/10"} mt-6 space-y-2 border-t pt-5 group-hover:border-white/15`}>
                        {tour.stops.map((stop, stopIndex) => (
                          <li key={stop} className={`${featured ? "text-white/72" : "text-black/60"} flex gap-3 text-xs leading-5 group-hover:text-white/72`}>
                            <span className="font-bold text-[#8ea65d]">{String(stopIndex + 1).padStart(2, "0")}</span>
                            {stop}
                          </li>
                        ))}
                      </ol>
                      <span className={`${featured ? "border-white/25 text-white" : "border-black/15 text-[#425f32]"} mt-6 inline-flex items-center justify-between border-t pt-5 text-[10px] font-bold uppercase tracking-[.18em] group-hover:border-white/25 group-hover:text-white`}>
                        Explore this tour <span aria-hidden>↗</span>
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="build-your-own" className="scroll-mt-24 bg-[#425f32] py-20 text-white lg:py-24">
        <div className="container-max container-padding grid gap-8 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
          <div>
            <p className="script text-4xl text-[#b6cd72]">Nothing quite right?</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-5xl font-black uppercase leading-[.9] tracking-tight sm:text-6xl">Mix the stops.<br />Make it yours.</h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/65">Tell us what you want to see, where you are staying and how active you want the day to feel. We&apos;ll connect the stops into a realistic private route.</p>
          </div>
          <div className="lg:text-right">
            <Link href="/tours/build-your-own" className="btn-primary bg-[#79924f] px-8 py-4">Build my route <span aria-hidden>↗</span></Link>
          </div>
        </div>
      </section>

      <EditorialFooter current="main" />
    </main>
  );
}
