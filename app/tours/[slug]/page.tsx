import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArrowIcon from "@/components/arrow-icon";
import EditorialFooter from "@/components/editorial-footer";
import Header from "@/components/header";
import TrackedWhatsAppLink from "@/components/tracked-whatsapp-link";
import TourGallery from "@/components/tour-gallery";
import { WhatsIncluded } from "@/components/tour-trust-sections";
import { SITES } from "@/lib/domains";
import { formatTourPrice, getTourBySlug, TOURS } from "@/lib/tours";
import { getTourWhatsAppHref } from "@/lib/whatsapp";

const phone = "+62 812 3781 2783";

type TourPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return TOURS.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({
  params,
}: TourPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    return { title: "Bali Tour" };
  }

  const title = `${tour.name.replace(/ Tours?$/, " Tour")} by Classic VW | Private Day Tour, Bali`;
  const description = `${tour.summary} Private classic Volkswagen day tour in ${tour.location}, Bali.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITES.main.url}/tours/${tour.slug}` },
    openGraph: {
      type: "website",
      url: `${SITES.main.url}/tours/${tour.slug}`,
      title,
      description,
      images: [
        {
          url: `${SITES.main.url}${tour.image}`,
          width: 1200,
          height: 900,
          alt: `${tour.name} with Bali Safari Tour`,
        },
      ],
    },
  };
}

export default async function TourDetailPage({ params }: TourPageProps) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) notFound();

  const relatedTours = TOURS.filter((item) => item.slug !== tour.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#f4f3ee] text-[#20241f]">
      <Header
        navItems={[
          { label: "All tours", href: "/tours" },
          { label: "Highlights", href: "#highlights" },
          { label: "Plan your day", href: "#tour-info" },
          { label: "Contact", href: "#contact" },
        ]}
      />

      <section className="container-max container-padding pb-10 pt-10 sm:pb-16 sm:pt-14">
        <Link
          href="/tours"
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#425f32] hover:text-[#718b4c]"
        >
          <span aria-hidden>←</span> All Bali tours
        </Link>
        <div className="mt-7 flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[.24em] text-[#718b4c]">
              {tour.location} · {tour.duration}
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-black uppercase leading-[.9] tracking-tight sm:text-6xl">
              {tour.name}
            </h1>
            <p className="mt-5 font-[family-name:var(--font-display)] text-xl font-black text-[#425f32] sm:text-2xl">
              {formatTourPrice(tour)}
            </p>
          </div>
          <p className="max-w-xl text-sm leading-6 text-black/55 sm:text-base sm:leading-7">
            {tour.summary}
          </p>
        </div>

        <dl className="mt-7 grid gap-4 border-y border-black/10 py-5 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-[10px] font-bold uppercase tracking-[.16em] text-black/40">Duration</dt>
            <dd className="mt-1 text-black/70">{tour.duration}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-bold uppercase tracking-[.16em] text-black/40">Pickup area</dt>
            <dd className="mt-1 text-black/70">{tour.pickupArea}</dd>
          </div>
        </dl>
        <TrackedWhatsAppLink
          href={getTourWhatsAppHref(tour)}
          source={`tour_detail_${tour.slug}`}
          target="_blank"
          className="btn-primary mt-5 bg-[#79924f]"
        >
          Book on WhatsApp <ArrowIcon className="size-3.5 shrink-0" />
        </TrackedWhatsAppLink>

        <TourGallery images={tour.gallery} tourName={tour.name} />

        <div className="mt-10 grid gap-8 border-t border-black/10 pt-8 lg:grid-cols-[1.2fr_.8fr]">
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-black uppercase tracking-tight">
              Sample itinerary
            </h2>
            <ol className="mt-5 space-y-4">
              {tour.itinerary.map((stop, index) => (
                <li key={stop.title} className="flex gap-4">
                  <span className="text-xs font-bold text-[#718b4c]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-bold">{stop.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-black/55">{stop.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
          <WhatsIncluded compact />
        </div>
      </section>

      <section className="container-max container-padding grid gap-8 pb-20 lg:grid-cols-[minmax(0,1.7fr)_minmax(17rem,.75fr)] lg:gap-12 lg:pb-28">
        <article className="min-w-0">
          <p className="max-w-3xl text-sm leading-7 text-black/65 sm:text-base sm:leading-8">
            {tour.description}
          </p>

          <section id="highlights" className="scroll-mt-28 border-b border-black/10 py-8">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-black uppercase tracking-tight">
              Tour highlights
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {tour.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm leading-6 text-black/65">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#718b4c]" />
                  {highlight}
                </li>
              ))}
            </ul>
          </section>

          <section className="border-b border-black/10 py-8">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-black uppercase tracking-tight">
              Destinations
            </h2>
            <ol className="mt-5 grid gap-3 sm:grid-cols-2">
              {tour.stops.map((stop, index) => (
                <li key={stop} className="flex gap-3 text-sm leading-6 text-black/65">
                  <span className="font-bold text-[#718b4c]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {stop}
                </li>
              ))}
            </ol>
          </section>

          <section id="tour-info" className="scroll-mt-28 border-b border-black/10 py-8">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-black uppercase tracking-tight">
              Tour information
            </h2>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                ["Duration", tour.duration],
                ["Tour type", "Private classic VW and driver-guide"],
                ["Pickup", tour.pickupArea],
                ["Your guide", "Driver-guide included"],
              ].map(([label, value]) => (
                <div key={label} className="border-l-2 border-[#b6cd72] pl-4">
                  <dt className="text-[10px] font-bold uppercase tracking-[.16em] text-black/40">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-black/70">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="py-8">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-black uppercase tracking-tight">
              Before you book
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-black/65">
              <li>Share your travel date, pickup area and the stops you have in mind.</li>
              <li>We&apos;ll confirm availability, pickup timing and route details with you.</li>
              <li>Some locations and performances have their own opening hours or access conditions.</li>
            </ul>
          </section>
        </article>

        <aside id="contact" className="scroll-mt-28">
          <div className="sticky top-24 space-y-4">
            <div className="bg-white p-6 shadow-[0_14px_40px_rgb(30_42_25/0.1)] sm:p-7">
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#718b4c]">
                Plan with Bali Safari Tour
              </p>
              <p className="mt-4 font-[family-name:var(--font-display)] text-2xl font-black uppercase leading-tight">
                Make this Bali day yours
              </p>
              <p className="mt-3 text-sm leading-6 text-black/55">
                Ask about availability, the route and the current price. We&apos;ll
                help you plan directly with our team.
              </p>
              <TrackedWhatsAppLink
                href={getTourWhatsAppHref(tour)}
                source={`tour_detail_${tour.slug}`}
                target="_blank"
                className="btn-primary mt-6 flex w-full justify-center bg-[#79924f] text-center"
              >
                Book on WhatsApp <ArrowIcon className="ml-2 size-3.5 shrink-0" />
              </TrackedWhatsAppLink>
              <a
                href="tel:+6281237812783"
                className="mt-4 flex items-center justify-between border-t border-black/10 pt-4 text-sm font-semibold text-[#425f32]"
              >
                Call us <span>{phone}</span>
              </a>
              <div className="mt-5 space-y-2 border-t border-black/10 pt-5 text-xs text-black/55">
                <p>Private tour · Flexible route</p>
                <p>{tour.pickupArea}</p>
              </div>
            </div>
            <div className="bg-[#e7e9dc] p-6">
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#718b4c]">
                Need a different route?
              </p>
              <p className="mt-2 text-sm leading-6 text-black/65">
                Combine favorite stops or ask for a custom day around your hotel.
              </p>
              <Link
                href="/tours/build-your-own"
                className="mt-4 inline-flex text-[10px] font-bold uppercase tracking-[.16em] text-[#425f32]"
              >
                Build your own tour <ArrowIcon className="ml-2 size-3.5 shrink-0" />
              </Link>
            </div>
          </div>
        </aside>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-max container-padding">
          <div className="mx-auto max-w-2xl text-center">
            <p className="script text-3xl text-[#718b4c]">Travel your way</p>
            <h2 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-black uppercase tracking-tight sm:text-5xl">
              Why ride with Bali Safari Tour?
            </h2>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Private", "A day planned for your group, not a bus schedule."],
              ["Local", "See the island with a driver-guide who knows the roads."],
              ["Flexible", "Shape the stops and pace around your interests."],
              ["Classic", "Take in Bali from an open-top Volkswagen."],
            ].map(([title, description]) => (
              <div key={title} className="bg-[#f4f3ee] p-5">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-black uppercase text-[#425f32]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-black/55">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-max container-padding py-16 sm:py-20">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-black uppercase tracking-tight">
          More Bali tour ideas
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {relatedTours.map((related) => (
            <Link
              key={related.slug}
              href={`/tours/${related.slug}`}
              className="group bg-white p-5 transition hover:bg-[#425f32] hover:text-white"
            >
              <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#718b4c]">
                {related.location}
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-black uppercase">
                {related.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-black/55 group-hover:text-white/65">
                {related.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <EditorialFooter current="main" />
    </main>
  );
}
