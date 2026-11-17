import Link from "next/link";
import ArrowIcon from "@/components/arrow-icon";
import TourCardSlider from "@/components/tour-card-slider";
import TrackedWhatsAppLink from "@/components/tracked-whatsapp-link";
import { formatTourPrice, HOME_TOURS } from "@/lib/tours";
import { getTourWhatsAppHref } from "@/lib/whatsapp";

export default function FullDayTours() {
  return (
    <section id="tours" className="scroll-mt-24 bg-[#f4f3ee] py-12 sm:py-24 lg:py-32">
      <div className="container-max px-3 sm:px-8 lg:px-12">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-14">
          <p className="script text-3xl text-[#718b4c] sm:text-4xl">Choose your road</p>
          <h2 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-black uppercase leading-none tracking-tight sm:text-6xl">
            Full day tours
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs leading-5 text-black/55 sm:mt-5 sm:text-sm sm:leading-7">
            Six favourite private routes, with your own Volkswagen and local driver-guide for the day.
          </p>
          <Link
            href="/tours"
            className="mt-4 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.18em] text-[#425f32] sm:mt-6 sm:gap-3 sm:text-[10px]"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[#79924f] text-white sm:h-7 sm:w-7" aria-hidden>
              <ArrowIcon direction="right" className="size-3.5 shrink-0" />
            </span>
            View all destinations
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {HOME_TOURS.map((tour, index) => {
            return (
              <article
                key={tour.name}
                className={`${index === 1 ? "" : ""} group flex flex-col bg-[#fbfaf6] shadow-[0_18px_50px_rgb(30_42_25/0.09)] transition duration-500`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#263b27]">
                  <TourCardSlider
                    image={tour.image}
                    gallery={tour.gallery}
                    alt={`${tour.name} by classic Volkswagen`}
                    href={`/tours/${tour.slug}`}
                  />
                  <Link
                    href={`/tours/${tour.slug}`}
                    className="absolute bottom-5 left-5 z-20 hidden items-center bg-[#fbfaf6] px-4 py-3 text-[10px] font-bold uppercase tracking-[.14em] text-[#425f32] transition hover:bg-[#b6cd72] md:inline-flex"
                  >
                    Learn More <ArrowIcon className="ml-2 size-3.5 shrink-0" />
                  </Link>
                </div>

                <div className="flex flex-1 flex-col p-3 sm:p-6 lg:p-8">
                  <p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#79924f]">
                    {tour.location} · {tour.duration}
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-black uppercase leading-[.95] tracking-tight text-[#20241f] sm:mt-3 sm:text-2xl lg:text-3xl">
                    <Link href={`/tours/${tour.slug}`} className="hover:text-[#425f32]">
                      {tour.name}
                    </Link>
                  </h3>
                  <p className="mt-2 text-xs leading-4 text-black/55 sm:mt-4 sm:text-sm sm:leading-6">{tour.description}</p>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-black/10 pt-3 sm:gap-4 sm:pt-6">

                    <p className="font-[family-name:var(--font-display)] text-base font-black tracking-tight text-[#425f32] sm:text-xl">
                      {formatTourPrice(tour)}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-2 sm:gap-x-4 sm:gap-y-3">
                      <TrackedWhatsAppLink href={getTourWhatsAppHref(tour)} source={`tour_card_${tour.slug}`} className="btn-primary px-3 py-3 text-[10px] sm:px-2 sm:py-2">
                        WhatsApp<ArrowIcon />
                      </TrackedWhatsAppLink>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mx-auto mt-5 max-w-2xl text-center text-xs leading-5 text-black/45 sm:mt-9 sm:text-sm">
          Pickup and drop-off at all Bali locations are included in the price.
        </p>
      </div>
    </section>
  );
}
