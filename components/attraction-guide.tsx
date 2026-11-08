"use client";

import Image from "next/image";
import { SITES } from "@/lib/domains";

const attractions = [
  {
    id: "tanah-lot",
    name: "Tanah Lot",
    image: "/tourpics/tanah-lot.jpg",
    category: "Temple & Coastline",
    description:
      "Tanah Lot is a sea temple perched on a rock formation just off Bali's southwest coast, and one of the island's most photographed sights. It's best visited in the late afternoon, when the temple silhouette catches the sunset and the tide recedes enough to walk out along the rocks. Expect crowds near golden hour — arriving an hour earlier gives you space to explore the surrounding cliffside market stalls and viewpoints before the light show starts.",
    tip: "Best time to visit: 4-6pm for sunset views and lower tide.",
  },
  
  {
    id: "uluwatu",
    name: "Uluwatu Temple",
    image: "/tourpics/uluwatu.jpg",
    category: "Clifftop Temple",
    description:
      "Set on a limestone cliff nearly 70 meters above the Indian Ocean, Uluwatu Temple is one of Bali's six key directional temples and offers some of the most dramatic coastal views on the island. Many visitors pair the temple with the evening Kecak fire dance performed at an amphitheater overlooking the sunset. Watch for the resident long-tailed macaques near the entrance — they're known to grab sunglasses and hats, so keep loose items secured.",
    tip: "Wear a sarong (provided at entry) and keep belongings zipped up near the monkeys.",
  },
  {
    id: "ubud-market",
    name: "Ubud Art Market",
    image: "/tourpics/ubud-market.jpg",
    category: "Culture & Shopping",
    description:
      "In the heart of Ubud, this traditional market is a maze of stalls selling handwoven textiles, wood carvings, sarongs, jewelry, and Balinese art. Bargaining is expected and part of the experience — start at roughly half the asking price and negotiate from there. The market sits close to the Ubud Royal Palace and Saraswati Temple, making it easy to combine a shopping stop with a short walk through Ubud's cultural core.",
    tip: "Go early morning to beat the tour bus crowds and get better opening prices.",
  },
  {
    id: "monkey-forest",
    name: "Sacred Monkey Forest Sanctuary",
    image: "/tourpics/monkey-forest-3.jpg",
    category: "Nature & Wildlife",
    description:
      "This forest sanctuary in Ubud is home to over 1,200 long-tailed macaques living among moss-covered temples and banyan trees. Walking paths wind through three ancient temple complexes dating to the 14th century, giving the reserve as much cultural weight as natural charm. The monkeys are habituated to visitors but can be assertive around food or shiny objects, so it's best to store snacks, sunglasses, and loose jewelry before entering.",
    tip: "Don't carry food or hold anything shiny — monkeys will try to take it.",
  },
  {
    id: "jatiluwih",
    name: "Jatiluwih Rice Terraces",
    image: "/tourpics/jatiluwih3.jpg",
    category: "Landscape",
    description:
      "A UNESCO World Heritage site, Jatiluwih's terraced rice fields showcase the centuries-old subak irrigation system that defines traditional Balinese agriculture. The terraces sweep across the slopes of Mount Batukaru, and a network of walking trails lets visitors get well beyond the roadside viewpoints. It's one of the quieter major attractions on the island, making it a good stop for slower, more scenic time away from crowds.",
    tip: "Bring water and sun protection — the walking trails have little shade at midday.",
  },
  {
    id: "gunung-kawi",
    name: "Gunung Kawi Temple",
    image: "/tourpics/gunung-kawi-01.jpg",
    category: "Ancient Temple",
    description:
      "Gunung Kawi is an 11th-century temple complex carved directly into a river valley cliff face, reached by descending roughly 300 stone steps through terraced rice paddies. The candi (shrines) are believed to be memorials to Balinese royalty and are among the oldest structures on the island. The climb back up is the real workout, but the valley setting — river, rice fields, and carved stone in one frame — makes it worth the effort.",
    tip: "Wear comfortable shoes; the return climb up 300 steps is the hard part.",
  },
  {
    id: "tabanan",
    name: "Tabanan Countryside",
    image: "/tourpics/tabanan-02.jpg",
    category: "Rural Bali",
    description:
      "Tabanan regency is Bali's agricultural heartland, known for rolling rice paddies, quiet village roads, and some of the least touristed scenery on the island. It's a good stop for slower travel — village temples, roadside coffee stalls, and farmers at work in the fields — away from the busier south. Many VW safari routes pass through Tabanan en route to Jatiluwih or the western coast.",
    tip: "A great stop for authentic village life without the crowds of Ubud.",
  },
  {
    id: "volcano",
    name: "Mount Batur Volcano View",
    image: "/tourpics/volcano.jpg",
    category: "Volcano & Viewpoint",
    description:
      "Mount Batur is an active volcano in the Kintamani highlands, with viewpoints along the caldera rim offering sweeping views over the crater and Lake Batur below. Sunrise trekking to the summit is popular for serious early risers, but the roadside viewpoints deliver dramatic scenery without the pre-dawn climb. The cooler mountain air here is a welcome break from the coastal heat.",
    tip: "Bring a light jacket — Kintamani's elevation makes it noticeably cooler than the coast.",
  },
];

export default function AttractionGuide() {
  return (
    <section id="content" className="py-24 lg:py-32">
      <div className="container-max container-padding">
        <div className="mb-20 grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div><p className="script text-4xl">Where will Bali take you?</p><h2 className="mt-1 font-[family-name:var(--font-display)] text-5xl font-black uppercase leading-[.92] tracking-tight sm:text-6xl">Eight places<br />worth the road</h2></div>
          <p className="max-w-xl text-base leading-7 text-black/55 lg:ml-auto">A practical field guide to the temples, terraces and viewpoints that shape a classic Bali itinerary—what each place feels like, when to go and what to know.</p>
        </div>

        <div className="space-y-20 lg:space-y-28">
          {attractions.map((place, index) => (
            <article
              key={place.id}
              id={place.id}
              className={`grid items-center gap-8 lg:grid-cols-[1.12fr_.88fr] lg:gap-16 ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className={`${index % 3 === 1 ? "lg:translate-y-5" : ""} relative aspect-[4/3] overflow-hidden bg-[#263b27]`}>
                <Image
                  src={place.image}
                  alt={place.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-700 hover:scale-105"
                />
                <span className="absolute left-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-[#fbfaf6] font-[family-name:var(--font-display)] text-sm font-bold text-[#425f32]">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <span className="eyebrow">{place.category}</span>
                <h2 className="mb-5 mt-4 font-[family-name:var(--font-display)] text-4xl font-black uppercase leading-none tracking-tight">{place.name}</h2>
                <p className="mb-6 text-sm leading-7 text-black/60">{place.description}</p>
                <div className="border-l-2 border-[#79924f] pl-4"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#425f32]">Local note</p><p className="mt-1 text-sm text-black/60">{place.tip}</p></div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-24 border-t border-black/10 pt-8 text-center">
          <p className="text-xs leading-6 text-black/45">
            Ready to map out your visit? Use{" "}
            <a href={SITES.balisafari.url} className="font-bold text-[#425f32] hover:underline">
              our interactive trip planner
            </a>{" "}
            at {SITES.balisafari.url.replace("https://", "")}, or see{" "}
            <a href={SITES.vwbali.url} className="font-bold text-[#425f32] hover:underline">
              real guest photos from these spots
            </a>{" "}
            at {SITES.vwbali.url.replace("https://", "")}.
          </p>
        </div>
      </div>
    </section>
  );
}
