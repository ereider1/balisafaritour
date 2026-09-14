import Image from "next/image";
import Link from "next/link";

const tours = [
  {
    name: "Ubud Tours",
    location: "Central Bali",
    image: "/tourpics/ubud-market.jpg",
    description:
      "Visit Ubud's villages, temples, rice terraces and creative heart in a classic open-top Volkswagen.",
    price: 40,
  },
  {
    name: "Kintamani Volcano Tours",
    location: "Bali Highlands",
    image: "/tourpics/volcano.jpg",
    description:
      "Climb into the cool highlands for Mount Batur views, village roads, rice terraces and sacred springs.",
    price: 40,
  },
  {
    name: "Uluwatu Tours",
    location: "South Bali",
    image: "/tourpics/uluwatu.jpg",
    description:
      "Follow the coast to Uluwatu Temple for Indian Ocean views, roaming monkeys and a golden-hour drive.",
    price: 40,
  },
] as const;

const whatsappBase = "https://wa.me/6281237812783?text=";

export default function FullDayTours() {
  return (
    <section id="tours" className="scroll-mt-24 bg-[#f4f3ee] py-24 lg:py-32">
      <div className="container-max container-padding">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="script text-4xl text-[#718b4c]">Choose your road</p>
          <h2 className="mt-1 font-[family-name:var(--font-display)] text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl">
            Full day tours
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-black/55">
            Three favourite private routes, with your own Volkswagen and local driver-guide for the day.
          </p>
          <Link
            href="/tours"
            className="mt-6 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#425f32]"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#79924f] text-white" aria-hidden>
              →
            </span>
            View all destinations
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour, index) => {
            const message = encodeURIComponent(
              `Hi Bobby, I'm interested in the ${tour.name} at Rp ${tour.price} per person. Could you help me plan it?`,
            );

            return (
              <article
                key={tour.name}
                className={`${index === 1 ? "lg:-translate-y-3" : ""} group flex flex-col bg-[#fbfaf6] shadow-[0_18px_50px_rgb(30_42_25/0.09)] transition duration-500 hover:-translate-y-2`}
              >
                <Link href="/tours" className="relative block aspect-[4/3] overflow-hidden bg-[#263b27]">
                  <Image
                    src={tour.image}
                    alt={`${tour.name} by classic Volkswagen`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <span className="absolute bottom-0 right-0 bg-[#425f32] px-5 py-3 text-[10px] font-bold uppercase tracking-[.18em] text-white transition group-hover:bg-[#263b27]">
                    Learn more <span aria-hidden>↗</span>
                  </span>
                </Link>

                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#79924f]">
                    {tour.location} · Full day
                  </p>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-black uppercase leading-[.95] tracking-tight text-[#20241f]">
                    {tour.name}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-black/55">{tour.description}</p>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-6">
                    <a href={`${whatsappBase}${message}`} className="btn-primary px-3 py-3">
                      Reserve Tour <span aria-hidden>↗</span>
                    </a>
                    <p className="text-right text-[10px] font-bold uppercase tracking-[.14em] text-black/40">
                      Best price!
                      <span className="mt-1 block font-[family-name:var(--font-display)] text-2xl font-black tracking-normal text-[#425f32]">
                        USD$ {tour.price}<span className="text-sm">/person</span>
                      </span>
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mx-auto mt-9 max-w-2xl text-center text-sm leading-5 text-black/45">
          Hotel/Villa pickup and dropoff is included.
        </p>
      </div>
    </section>
  );
}
