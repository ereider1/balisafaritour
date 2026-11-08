import Image from "next/image";
import Link from "next/link";

const tours = [
  {
    name: "Tabanan & Jatiluwih Tours",
    detailAnchor: "tabanan-tour",
    location: "Tabanan Bali",
    image: "/tourpics/tabanan-02.jpg",
    description:
      "Explore Jatiluwih and Tabanan rice terraces and Tanah Lot Temple.",
    price: 40,
  },
  {
    name: "Ubud Tours",
    detailAnchor: "ubud-tour",
    location: "Central Bali",
    image: "/tourpics/ubud-market.jpg",
    description:
      "Visit Ubud's villages, temples, rice terraces and creative heart in a classic open-top Volkswagen.",
    price: 40,
  },
  {
    name: "Kintamani Volcano Tours",
    detailAnchor: "kintamani-volcano-tour",
    location: "Bali Highlands",
    image: "/tourpics/volcano.jpg",
    description:
      "Climb into the cool highlands for Mount Batur views, village roads, rice terraces and sacred springs.",
    price: 40,
  },
  {
    name: "Uluwatu Tours",
    detailAnchor: "uluwatu-sunset-tour",
    location: "South Bali",
    image: "/tourpics/uluwatu.jpg",
    description:
      "Follow the coast to Uluwatu Temple for Indian Ocean views, roaming monkeys and a golden-hour drive.",
    price: 40,
  },
  {
    name: "Instagram Tours",
    detailAnchor: "instagram-tour",
    location: "Custom Bali",
    image: "/tourpics/bali-swing.jpg",
    description:
      "Your driver will take you to the swing, waterfalls, epic lookouts... Your Day. Your Tour!",
    price: 40,
  },
  {
    name: "Custom Tours",
    detailAnchor: "build-your-own",
    location: "Anywhere Bali",
    image: "/tourpics/bali_vw_01.jpg",
    description:
      "Experience Bali with your local guide! Ask for special spots: Gardens, Hot Springs, Traditional Ceremonies.",
    price: 40,
  },

] as const;

const whatsappBase = "https://wa.me/6281237812783?text=";

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
            Three favourite private routes, with your own Volkswagen and local driver-guide for the day.
          </p>
          <Link
            href="/tours"
            className="mt-4 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.18em] text-[#425f32] sm:mt-6 sm:gap-3 sm:text-[10px]"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[#79924f] text-white sm:h-7 sm:w-7" aria-hidden>
              →
            </span>
            View all destinations
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {tours.map((tour, index) => {
            const message = encodeURIComponent(
              `Hi Bobby, I'm interested in the ${tour.name} at Rp ${tour.price} per person. Could you help me plan it?`,
            );

            return (
              <article
                key={tour.name}
                className={`${index === 1 ? "" : ""} group flex flex-col bg-[#fbfaf6] shadow-[0_18px_50px_rgb(30_42_25/0.09)] transition duration-500`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#263b27]">
                  <Link
                    href={`/tours#${tour.detailAnchor}`}
                    aria-label={`View ${tour.name} details`}
                    className="absolute inset-0"
                  >
                    <Image
                      src={tour.image}
                      alt={`${tour.name} by classic Volkswagen`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </Link>
                  <Link
                    href={`/tours#${tour.detailAnchor}`}
                    className="absolute bottom-5 left-5 hidden items-center bg-[#fbfaf6] px-4 py-3 text-[10px] font-bold uppercase tracking-[.14em] text-[#425f32] transition hover:bg-[#b6cd72] md:inline-flex"
                  >
                    More Info <span className="ml-2" aria-hidden>↗</span>
                  </Link>
                </div>

                <div className="flex flex-1 flex-col p-3 sm:p-6 lg:p-8">
                  <p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#79924f]">
                    {tour.location} · Full day
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-black uppercase leading-[.95] tracking-tight text-[#20241f] sm:mt-3 sm:text-2xl lg:text-3xl">
                    <Link href={`/tours#${tour.detailAnchor}`} className="hover:text-[#425f32]">
                      {tour.name}
                    </Link>
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-black/55 sm:mt-4 sm:text-sm sm:leading-6">{tour.description}</p>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-black/10 pt-3 sm:mt-8 sm:gap-4 sm:pt-6">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-2 sm:gap-x-4 sm:gap-y-3">
                      <a href={`${whatsappBase}${message}`} className="btn-primary px-2 py-2 text-[9px] sm:px-3 sm:py-3 sm:text-inherit">
                        Reserve Tour <span aria-hidden>↗</span>
                      </a>
                    </div>
                    <p className="text-right text-[9px] font-bold uppercase tracking-[.1em] text-black/40 sm:text-[10px] sm:tracking-[.14em]">
                      Best price!
                      <span className="mt-1 block font-[family-name:var(--font-display)] text-lg font-black tracking-normal text-[#425f32] sm:text-2xl">
                        USD$ {tour.price}<span className="text-sm">/person</span>
                      </span>
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mx-auto mt-5 max-w-2xl text-center text-xs leading-5 text-black/45 sm:mt-9 sm:text-sm">
          We pick you up and drop you off wherever you are in Bali. Included in price. Let&apos;s Go!
        </p>
      </div>
    </section>
  );
}
