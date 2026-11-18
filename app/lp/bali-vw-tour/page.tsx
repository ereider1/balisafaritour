import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "@/components/arrow-icon";
import Header from "@/components/header";
import TestimonialCarousel from "@/components/testimonial-carousel";
import TrackedWhatsAppLink from "@/components/tracked-whatsapp-link";
import { HowItWorks, TourFaq, WhatsIncluded } from "@/components/tour-trust-sections";
import { featuredReviews } from "@/lib/featured-reviews";
import { SITES } from "@/lib/domains";
import { listPublishedReviews } from "@/lib/reviews";
import { formatTourPrice, HOME_TOURS } from "@/lib/tours";
import { GOOGLE_REVIEW_URL } from "@/lib/tour-trust-content";
import { getTourWhatsAppHref } from "@/lib/whatsapp";

const canonicalUrl = `${SITES.main.url}/lp/bali-vw-tour`;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Private Classic VW Tours in Bali | Bali Safari Tour",
  description:
    "Explore Bali in a private classic Volkswagen with a local driver-guide. Compare routes, check tour details and plan your day on WhatsApp.",
  alternates: { canonical: canonicalUrl },
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Private Classic VW Tours in Bali | Bali Safari Tour",
    description:
      "Explore Bali in a private classic Volkswagen with a local driver-guide. Compare routes and plan your day on WhatsApp.",
    images: [
      {
        url: `${SITES.main.url}/hero-1.jpg`,
        width: 1200,
        height: 630,
        alt: "Classic Volkswagen tour in Bali",
      },
    ],
  },
};

export default async function BaliVwTourLandingPage() {
  const submittedReviews = await listPublishedReviews();
  const reviews = [...featuredReviews, ...submittedReviews]
    .filter((review, index, allReviews) => allReviews.findIndex((item) => item.id === review.id) === index)
    .sort((a, b) => b.rating - a.rating || b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);
  const startingTour = HOME_TOURS[0];

  return (
    <main className="min-h-screen bg-[#fbfaf6] text-[#20241f]">
      <section className="relative min-h-[78vh] overflow-hidden bg-[#263b27] text-white">
        <Header overlay />
        <Image
          src="/hero-1.jpg"
          alt="Classic Volkswagen tour in Bali"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,37,25,.92),rgba(21,37,25,.48)_70%,rgba(21,37,25,.25))]" />
        <div className="container-max container-padding relative z-10 flex min-h-[78vh] items-end pb-16 pt-44 sm:items-center sm:pb-0">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[.28em] text-white/70">Bali, Indonesia · Private tours</p>
            <h1 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(3.2rem,8vw,6.8rem)] font-black uppercase leading-[.84] tracking-[-.05em]">
              Bali by<br /><span className="script text-[#b6cd72]">classic VW</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
              Choose a private route through Bali and plan the day directly with a local driver-guide.
            </p>
            <p className="mt-6 font-[family-name:var(--font-display)] text-2xl font-black text-[#b6cd72]">
              {formatTourPrice(startingTour)}
            </p>
            <TrackedWhatsAppLink
              href="https://wa.me/6281237812783?text=Hi%20Bobby%2C%20I%27d%20like%20to%20plan%20a%20private%20VW%20tour%20in%20Bali."
              source="lp_hero"
              className="btn-primary mt-5 bg-[#79924f] px-8 py-4"
            >
              Plan on WhatsApp <ArrowIcon />
            </TrackedWhatsAppLink>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className="container-max container-padding grid gap-6 sm:grid-cols-3">
          {[
            ["Private route", "A day planned around your group and interests."],
            ["Local driver-guide", "Explore Bali with a guide familiar with the island's roads."],
            ["Classic Volkswagen", "See Bali from an open-top classic VW."],
          ].map(([title, description]) => (
            <article key={title} className="border-t-2 border-[#b6cd72] pt-4">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-black uppercase text-[#425f32]">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-black/55">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f4f3ee] py-12 sm:py-16">
        <div className="container-max container-padding">
          <div className="mb-7">
            <p className="script text-3xl text-[#718b4c]">Choose your road</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-black uppercase sm:text-5xl">Six Bali tours</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {HOME_TOURS.map((tour) => (
              <article key={tour.slug} className="flex flex-col bg-white p-5 shadow-sm">
                <p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#718b4c]">{tour.location} · {tour.duration}</p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-black uppercase leading-tight">
                  <Link href={`/tours/${tour.slug}`} className="hover:text-[#425f32]">{tour.name}</Link>
                </h3>
                <p className="mt-2 flex-1 text-xs leading-5 text-black/55">{tour.summary}</p>
                <p className="mt-4 font-[family-name:var(--font-display)] font-black text-[#425f32]">
                  {formatTourPrice(tour)}
                </p>
                <TrackedWhatsAppLink
                  href={getTourWhatsAppHref(tour)}
                  source={`tour_card_${tour.slug}`}
                  className="btn-primary mt-3 w-full bg-[#79924f] text-center text-[10px]"
                >
                  Ask about this tour <ArrowIcon />
                </TrackedWhatsAppLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <WhatsIncluded />
      <HowItWorks />
      <TourFaq />

      <section className="bg-[#f0eee5] py-14 sm:py-20">
        <div className="container-max container-padding">
          <div className="text-center">
            <p className="script text-4xl">Stories brought home</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-black uppercase tracking-tight sm:text-4xl">
              Guest reviews
            </h2>
          </div>
          <TestimonialCarousel reviews={reviews} />
          <p className="mt-7 text-center text-xs text-black/45">
            <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#425f32] underline underline-offset-4">
              Read more reviews on Google
            </a>
          </p>
        </div>
      </section>

      <section className="bg-[#263b27] py-14 text-center text-white sm:py-20">
        <div className="container-max container-padding">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-black uppercase sm:text-5xl">
            Ready to plan your Bali day?
          </h2>
          <TrackedWhatsAppLink
            href="https://wa.me/6281237812783?text=Hi%20Bobby%2C%20I%27d%20like%20to%20plan%20a%20private%20VW%20tour%20in%20Bali."
            source="lp_footer"
            className="btn-primary mt-6 bg-[#79924f] px-8 py-4"
          >
            Message us on WhatsApp <ArrowIcon />
          </TrackedWhatsAppLink>
        </div>
      </section>
    </main>
  );
}
