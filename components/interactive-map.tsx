"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import L, {
  type Map as LeafletMap,
  type Tooltip as LeafletTooltip,
} from "leaflet";

export type MapCategory = "landmark" | "nature" | "adventure";

export interface MapStop {
  name: string;
  region: string;
  note: string;
  detail: string;
  image: string;
  learnMoreHref: string;
  category: MapCategory;
  position: [number, number];
}

const CATEGORY_META: Record<MapCategory, { label: string; color: string; emoji: string }> = {
  landmark: { label: "Temples & landmarks", color: "#425f32", emoji: "🛕" },
  nature: { label: "Nature & landscapes", color: "#79924f", emoji: "🌿" },
  adventure: { label: "Markets & adventure", color: "#b48a4c", emoji: "🥾" },
};

function createIcon(category: MapCategory) {
  const { color, emoji } = CATEGORY_META[category];
  return L.divIcon({
    className: "map-pin-icon",
    html: `<span style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${color};box-shadow:0 2px 8px rgba(0,0,0,.3);border:2px solid white"><span style="transform:rotate(45deg);font-size:16px;line-height:1">${emoji}</span></span>`,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
  });
}

interface InteractiveMapProps {
  stops: MapStop[];
  hoveredStop: string | null;
  onHoverStop: (name: string | null) => void;
  favoriteStops: string[];
  onAddFavorite: (name: string) => void;
  onToggleFavorite: (name: string) => void;
}

export default function InteractiveMap({
  stops,
  hoveredStop,
  onHoverStop,
  favoriteStops,
  onAddFavorite,
  onToggleFavorite,
}: InteractiveMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const tooltipRefs = useRef<Record<string, LeafletTooltip>>({});
  const favoriteButtonRefs = useRef<Record<string, HTMLButtonElement>>({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current) return;

    // Leaflet tags its container; clearing a stale tag makes Strict Mode remounts safe.
    const taggedContainer = container as HTMLDivElement & { _leaflet_id?: number };
    if (taggedContainer._leaflet_id) delete taggedContainer._leaflet_id;
    const cancelTooltipClosures: Array<() => void> = [];

    const map = L.map(container, {
      center: [-8.45, 115.15],
      zoom: 10,
      scrollWheelZoom: false,
      zoomAnimation: true,
    });
    mapRef.current = map;
    
    // Standard OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    stops.forEach((stop) => {
      const tooltip = document.createElement("div");
      tooltip.className = "map-stop-card";

      const image = document.createElement("img");
      image.src = stop.image;
      image.alt = "";
      image.className = "map-stop-card__image";

      const content = document.createElement("div");
      content.className = "map-stop-card__content";

      const meta = document.createElement("span");
      meta.className = "map-stop-card__meta";
      meta.textContent = `${stop.region} · ${CATEGORY_META[stop.category].label}`;

      const title = document.createElement("strong");
      title.className = "map-stop-card__title";
      const note = document.createElement("p");
      note.className = "map-stop-card__note";
      const detail = document.createElement("p");
      detail.className = "map-stop-card__detail";
      const link = document.createElement("a");
      link.className = "map-stop-card__link";
      link.href = stop.learnMoreHref;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "learn more →";
      const favoriteButton = document.createElement("button");
      favoriteButton.type = "button";
      favoriteButton.className = "map-stop-card__favorite";
      favoriteButton.setAttribute("aria-label", `Add ${stop.name} to tour favorites`);
      favoriteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        onToggleFavorite(stop.name);
      });
      favoriteButtonRefs.current[stop.name] = favoriteButton;

      title.textContent = stop.name;
      note.textContent = stop.note;
      detail.textContent = stop.detail;
      content.append(meta, title, note, detail, favoriteButton, link);
      tooltip.append(image, content);

      let closeTimer: number | undefined;
      const cancelClose = () => window.clearTimeout(closeTimer);
      cancelTooltipClosures.push(cancelClose);
      const closeTooltip = () => {
        cancelClose();
        closeTimer = window.setTimeout(() => onHoverStop(null), 180);
      };
      tooltip.addEventListener("mouseenter", cancelClose);
      tooltip.addEventListener("mouseleave", closeTooltip);

      const mapTooltip = L.tooltip({
        className: "map-stop-tooltip",
        direction: "top",
        interactive: true,
        offset: [0, -28],
        opacity: 1,
      })
        .setLatLng(stop.position)
        .setContent(tooltip);

      L.marker(stop.position, {
        alt: `${stop.name} map stop`,
        icon: createIcon(stop.category),
        title: stop.name,
      })
        .on("mouseover focus click", () => {
          cancelClose();
          onHoverStop(stop.name);
        })
        .on("click", () => {
          onAddFavorite(stop.name);
        })
        .on("mouseout blur", closeTooltip)
        .addTo(map);
      tooltipRefs.current[stop.name] = mapTooltip;
    });

    map.on("click", () => onHoverStop(null));

    window.requestAnimationFrame(() => map.invalidateSize());

    return () => {
      cancelTooltipClosures.forEach((cancelClose) => cancelClose());
      tooltipRefs.current = {};
      favoriteButtonRefs.current = {};
      mapRef.current = null;
      map.remove();
      if (taggedContainer._leaflet_id) delete taggedContainer._leaflet_id;
    };
  }, [stops, onHoverStop, onAddFavorite, onToggleFavorite]);

  useEffect(() => {
    Object.entries(favoriteButtonRefs.current).forEach(([name, button]) => {
      const isFavorite = favoriteStops.includes(name);
      button.textContent = isFavorite ? "✓ Added to favorites" : "+ Add to favorites";
      button.classList.toggle("is-favorite", isFavorite);
      button.setAttribute("aria-label", `${isFavorite ? "Remove" : "Add"} ${name} ${isFavorite ? "from" : "to"} tour favorites`);
    });
  }, [favoriteStops]);

  useEffect(() => {
    const map = mapRef.current;
    Object.entries(tooltipRefs.current).forEach(([name, tooltip]) => {
      if (map && name === hoveredStop) tooltip.addTo(map);
      else tooltip.remove();
    });
    const activeStop = stops.find((stop) => stop.name === hoveredStop);
    if (map && activeStop) {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      map.setView(activeStop.position, Math.max(map.getZoom(), 11), {
        animate: !reduceMotion,
        duration: 0.45,
      });
    }
  }, [hoveredStop, stops]);

  return (
    <div className="h-[470px] w-full lg:h-[620px]">
      <div ref={containerRef} className="h-full w-full" aria-label="Interactive map of Bali tour stops" />
      <div className="mt-4 flex flex-wrap p-4 gap-4 text-sm text-black/55">
        {(Object.keys(CATEGORY_META) as MapCategory[]).map((key) => (
          <span key={key} className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: CATEGORY_META[key].color }} />{CATEGORY_META[key].label}</span>
        ))}
      </div>
    </div>
  );
}
