"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { SITES } from "@/lib/domains";
import type { MapStop } from "@/components/interactive-map";

const InteractiveMap = dynamic(() => import("@/components/interactive-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-96 w-full items-center justify-center bg-gray-100 text-sm text-gray-500">
      Loading map...
    </div>
  ),
});

const stops: MapStop[] = [
  {
    name: "Tanah Lot",
    region: "South-West",
    note: "Iconic sea temple - go for sunset.",
    detail: "A wave-washed temple reached along Bali's dramatic west coast.",
    image: "/tourpics/tanah-lot.jpg",
    learnMoreHref: `${SITES.gobali.url}#tanah-lot`,
    category: "landmark",
    position: [-8.6212, 115.0868],
  },
  {
    name: "Uluwatu Temple",
    region: "South",
    note: "Clifftop temple with Kecak fire dance at dusk.",
    detail: "Pair the ocean views with the evening dance, and secure loose belongings near the monkeys.",
    image: "/tourpics/uluwatu.jpg",
    learnMoreHref: `${SITES.gobali.url}#uluwatu`,
    category: "landmark",
    position: [-8.8291, 115.0849],
  },
  {
    name: "Sacred Monkey Forest",
    region: "Ubud",
    note: "Ancient temples and resident macaques.",
    detail: "Shaded paths wind through a living sanctuary of banyan trees, shrines, and more than 1,000 macaques.",
    image: "/tourpics/monkey-forest-3.jpg",
    learnMoreHref: `${SITES.gobali.url}#monkey-forest`,
    category: "nature",
    position: [-8.5188, 115.2589],
  },
  {
    name: "Ubud Art Market",
    region: "Ubud",
    note: "Handwoven textiles, carvings, and souvenirs.",
    detail: "Visit early for cooler lanes, lighter crowds, and a relaxed browse through Ubud's cultural center.",
    image: "/tourpics/ubud-market.jpg",
    learnMoreHref: `${SITES.gobali.url}#ubud-market`,
    category: "adventure",
    position: [-8.5069, 115.2624],
  },
  {
    name: "Gunung Kawi",
    region: "Tampaksiring",
    note: "11th-century shrines carved into a river valley.",
    detail: "The atmospheric complex sits below roughly 300 steps, surrounded by river and rice-field scenery.",
    image: "/tourpics/gunung-kawi-01.jpg",
    learnMoreHref: `${SITES.gobali.url}#gunung-kawi`,
    category: "landmark",
    position: [-8.4144, 115.3139],
  },
  {
    name: "Jatiluwih Rice Terraces",
    region: "Tabanan",
    note: "UNESCO-listed terraces on Mount Batukaru's slopes.",
    detail: "Walk the quiet subak irrigation trails for wide green views well beyond the roadside lookout.",
    image: "/tourpics/jatiluwih3.jpg",
    learnMoreHref: `${SITES.gobali.url}#jatiluwih`,
    category: "nature",
    position: [-8.3714, 115.1281],
  },
  {
    name: "Tabanan Countryside",
    region: "Tabanan",
    note: "Quiet villages and rolling rice paddies.",
    detail: "A slower stretch of rural Bali, with village temples, farm roads, and roadside coffee stops.",
    image: "/tourpics/tabanan-02.jpg",
    learnMoreHref: `${SITES.gobali.url}#tabanan`,
    category: "nature",
    position: [-8.5382, 115.1249],
  },
  {
    name: "Mount Batur Viewpoint",
    region: "Kintamani",
    note: "Caldera views over an active volcano and lake.",
    detail: "Cool highland air and sweeping crater views make this a scenic alternative to the pre-dawn summit trek.",
    image: "/tourpics/volcano.jpg",
    learnMoreHref: `${SITES.gobali.url}#volcano`,
    category: "adventure",
    position: [-8.2422, 115.3752],
  },
];

const FAVORITES_STORAGE_KEY = "bali-safari-tour-favorites";
const WHATSAPP_NUMBER = "6281237812783";

export default function TripPlanner() {
  const [hoveredStop, setHoveredStop] = useState<string | null>(null);
  const [favoriteStops, setFavoriteStops] = useState<string[]>([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as unknown;
        if (Array.isArray(parsed)) {
          const validNames = new Set(stops.map((stop) => stop.name));
          setFavoriteStops(parsed.filter((name): name is string => typeof name === "string" && validNames.has(name)));
        }
      }
    } catch {
      // A blocked or malformed localStorage value should not prevent planning.
    } finally {
      setFavoritesLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!favoritesLoaded) return;
    try {
      window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteStops));
    } catch {
      // Keep the planner usable when storage is unavailable (for example, private browsing restrictions).
    }
  }, [favoriteStops, favoritesLoaded]);

  const addFavorite = useCallback((name: string) => {
    setFavoriteStops((current) => current.includes(name) ? current : [...current, name]);
  }, []);

  const toggleFavorite = useCallback((name: string) => {
    setFavoriteStops((current) =>
      current.includes(name) ? current.filter((stop) => stop !== name) : [...current, name],
    );
  }, []);

  const moveFavorite = (index: number, direction: -1 | 1) => {
    setFavoriteStops((current) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.length) return current;
      const reordered = [...current];
      [reordered[index], reordered[nextIndex]] = [reordered[nextIndex], reordered[index]];
      return reordered;
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Bobby, I'd like to plan a private Bali VW tour. My tour favorites are:\n${favoriteStops
      .map((name, index) => `${index + 1}. ${name}`)
      .join("\n")}\n\nCould you help me turn these into a route?`,
  );

  return (
    <section id="content" className="py-24 lg:py-32">
      <div className="container-max container-padding">
        <div className="mb-14 grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div><p className="script text-4xl">Make the island yours</p><h2 className="mt-1 font-[family-name:var(--font-display)] text-5xl font-black uppercase leading-[.92] tracking-tight sm:text-6xl">Plot your<br />perfect route</h2></div>
          <p className="max-w-xl text-base leading-7 text-black/55 lg:ml-auto">Start with the places that pull you in. Click a map pin to save it, arrange your favorites, then send us your shortlist—we’ll turn it into a day that flows.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.45fr_.55fr]">
          <div className="overflow-hidden bg-white shadow-[0_20px_55px_rgb(30_42_25/0.12)]"><InteractiveMap stops={stops} hoveredStop={hoveredStop} onHoverStop={setHoveredStop} favoriteStops={favoriteStops} onAddFavorite={addFavorite} onToggleFavorite={toggleFavorite} /></div>
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[.2em] text-[#425f32]">Route points</p>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            {stops.map((stop) => (
              <button
                type="button"
                key={stop.name}
                onMouseEnter={() => setHoveredStop(stop.name)}
                onMouseLeave={() => setHoveredStop(null)}
                onFocus={() => setHoveredStop(stop.name)}
                onBlur={() => setHoveredStop(null)}
                onClick={() => toggleFavorite(stop.name)}
                aria-pressed={favoriteStops.includes(stop.name)}
                className={`border-l-2 p-3 text-left transition-all ${
                  hoveredStop === stop.name
                    ? "border-[#79924f] bg-[#eef1e7] pl-5"
                    : "border-black/10 bg-white"
                }`}
              >
                <p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#79924f]">{stop.region}</p>
                <p className="mt-1 text-sm font-bold">{stop.name}</p>
                <p className="mt-1 hidden text-xs leading-5 text-black/50 lg:block">{stop.note}</p>
                <span className="mt-2 inline-block text-[9px] font-bold uppercase tracking-[.14em] text-[#425f32]">
                  {favoriteStops.includes(stop.name) ? "✓ Saved" : "+ Add favorite"}
                </span>
              </button>
            ))}
            </div>
          </div>
        </div>

        <section aria-labelledby="favorites-title" className="mt-8 bg-[#eef1e7] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-4 border-b border-[#425f32]/15 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#79924f]">Your shortlist · {favoriteStops.length} saved</p>
              <h3 id="favorites-title" className="mt-2 font-[family-name:var(--font-display)] text-3xl font-black uppercase leading-none text-[#1e2a19] sm:text-4xl">My tour favorites</h3>
            </div>
            {favoriteStops.length > 0 && (
              <button type="button" onClick={() => setFavoriteStops([])} className="self-start text-[10px] font-bold uppercase tracking-[.16em] text-black/45 underline decoration-black/20 underline-offset-4 hover:text-black sm:self-auto">Clear all</button>
            )}
          </div>

          {favoriteStops.length === 0 ? (
            <div className="py-10 text-center">
              <p className="font-[family-name:var(--font-display)] text-xl font-bold uppercase text-[#425f32]">No favorites yet</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-black/50">Click any pin on the map or choose “Add favorite” from the route points. Your list will stay saved on this device.</p>
            </div>
          ) : (
            <>
              <ol className="divide-y divide-[#425f32]/10" aria-label="Editable tour favorites">
                {favoriteStops.map((name, index) => {
                  const stop = stops.find((item) => item.name === name);
                  if (!stop) return null;
                  return (
                    <li key={name} className="flex items-center gap-3 py-4 sm:gap-5">
                      <span className="w-7 shrink-0 font-[family-name:var(--font-display)] text-xl font-black text-[#79924f]">{String(index + 1).padStart(2, "0")}</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-[#1e2a19]">{name}</p>
                        <p className="mt-0.5 text-xs text-black/45">{stop.region} · {stop.note}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-1" aria-label={`Edit ${name}`}>
                        <button type="button" onClick={() => moveFavorite(index, -1)} disabled={index === 0} aria-label={`Move ${name} up`} className="flex h-9 w-9 items-center justify-center border border-[#425f32]/15 text-sm text-[#425f32] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-25">↑</button>
                        <button type="button" onClick={() => moveFavorite(index, 1)} disabled={index === favoriteStops.length - 1} aria-label={`Move ${name} down`} className="flex h-9 w-9 items-center justify-center border border-[#425f32]/15 text-sm text-[#425f32] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-25">↓</button>
                        <button type="button" onClick={() => toggleFavorite(name)} aria-label={`Remove ${name} from favorites`} className="ml-1 px-2 py-2 text-[10px] font-bold uppercase tracking-[.12em] text-black/45 hover:text-[#8b3f32]">Remove</button>
                      </div>
                    </li>
                  );
                })}
              </ol>
              <div className="flex flex-col gap-4 border-t border-[#425f32]/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-md text-xs leading-5 text-black/45">Put the places in your preferred order, then send the list to Bobby. We’ll check timing, driving distances and the best route for your day.</p>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className="btn-primary bg-[#79924f] px-6 py-4 text-center">Send favorites on WhatsApp <span aria-hidden>↗</span></a>
              </div>
            </>
          )}
        </section>




        <div className="mt-20 border-t border-black/10 pt-8 text-center">
          <p className="text-xs leading-6 text-black/45">
            Want more detail on each stop? Read{" "}
            <a href={SITES.gobali.url} className="font-bold text-[#425f32] hover:underline">
              our full attraction guides
            </a>{" "}
            at {SITES.gobali.url.replace("https://", "")}, or see{" "}
            <a href={SITES.vwbali.url} className="font-bold text-[#425f32] hover:underline">
              what past guests experienced
            </a>{" "}
            at {SITES.vwbali.url.replace("https://", "")}.
          </p>
        </div>
      </div>
    </section>
  );
}
