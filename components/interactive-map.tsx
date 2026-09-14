"use client";

import { useRef, useEffect } from "react";

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

interface InteractiveMapProps {
  stops: MapStop[];
  hoveredStop: string | null;
  onHoverStop: (name: string | null) => void;
  favoriteStops: string[];
  onAddFavorite: (name: string) => void;
  onToggleFavorite: (name: string) => void;
}

// Bounding box for mapping latitude/longitude coordinates to CSS percentages on the Bali vector SVG
const minLat = -8.90;
const maxLat = -8.05;
const minLng = 114.40;
const maxLng = 115.70;

function getPercentPosition(lat: number, lng: number) {
  const top = ((maxLat - lat) / (maxLat - minLat)) * 100;
  const left = ((lng - minLng) / (maxLng - minLng)) * 100;
  return { top: `${top}%`, left: `${left}%` };
}

export default function InteractiveMap({
  stops,
  hoveredStop,
  onHoverStop,
  favoriteStops,
  onAddFavorite,
  onToggleFavorite,
}: InteractiveMapProps) {
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const triggerClose = () => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => {
      onHoverStop(null);
    }, 180);
  };

  // Clear any timeouts on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full">
      {/* Styled Map Shell */}
      <div 
        className="relative h-[480px] w-full overflow-hidden rounded-2xl bg-[#eef1e7] border border-[#263b27]/10 shadow-inner sm:h-[550px] md:h-[620px]"
        onClick={() => onHoverStop(null)}
      >
        {/* Map positioning and aspect ratio wrapper */}
        <div className="absolute inset-0 p-4 sm:p-8 md:p-12 flex items-center justify-center">
          <div className="relative w-full h-full max-w-[800px] max-h-[500px] aspect-[8/5]">
            {/* Custom SVG Map of Bali */}
            <img 
              src="/bali-vector-map.svg" 
              alt="Vector map of Bali" 
              className="w-full h-full object-contain pointer-events-none select-none"
            />
            
            {/* Absolute Pin Overlay Layer */}
            <div className="absolute inset-0" onClick={(e) => e.stopPropagation()}>
              {stops.map((stop) => {
                const isHovered = hoveredStop === stop.name;
                const isFavorite = favoriteStops.includes(stop.name);
                const { top, left } = getPercentPosition(stop.position[0], stop.position[1]);
                const meta = CATEGORY_META[stop.category];

                return (
                  <div 
                    key={stop.name}
                    className="absolute"
                    style={{ top, left }}
                  >
                    {/* Animated Ripple for Hovered Pin */}
                    {isHovered && (
                      <span className="absolute left-0 top-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-[#425f32]/20 duration-1000" />
                    )}

                    {/* Styled Map Pin */}
                    <button
                      type="button"
                      className="group absolute left-0 top-0 flex h-[34px] w-[34px] -translate-x-1/2 -translate-y-full items-center justify-center rounded-full border-2 border-white bg-white shadow-md transition-transform duration-300 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{
                        borderRadius: "50% 50% 50% 0",
                        transform: `translate(-50%, -100%) rotate(-45deg) ${isHovered ? "scale(1.12)" : "scale(1)"}`,
                        backgroundColor: meta.color,
                        boxShadow: isHovered 
                          ? "0 4px 14px rgba(30, 42, 25, 0.35)" 
                          : "0 2px 8px rgba(0, 0, 0, 0.25)"
                      }}
                      onMouseEnter={() => {
                        cancelClose();
                        onHoverStop(stop.name);
                      }}
                      onMouseLeave={triggerClose}
                      onFocus={() => {
                        cancelClose();
                        onHoverStop(stop.name);
                      }}
                      onBlur={triggerClose}
                      onClick={() => {
                        cancelClose();
                        onHoverStop(stop.name);
                        onAddFavorite(stop.name);
                      }}
                      aria-label={`${stop.name} map stop - ${meta.label}`}
                    >
                      {/* Inner emoji, rotated back to be upright */}
                      <span 
                        style={{ 
                          transform: "rotate(45deg)", 
                          fontSize: "15px",
                          lineHeight: 1
                        }}
                      >
                        {meta.emoji}
                      </span>
                    </button>

                    {/* Interactive Tooltip Card */}
                    {isHovered && (
                      <div 
                        className="absolute z-50 filter drop-shadow-[0_12px_28px_rgba(30,42,25,0.18)] transition-all duration-300 animate-rise"
                        style={{
                          bottom: "44px",
                          left: "0",
                          transform: "translateX(-50%)",
                        }}
                        onMouseEnter={cancelClose}
                        onMouseLeave={triggerClose}
                      >
                        <div className="relative w-[285px] sm:w-[330px] bg-white rounded-xl overflow-hidden border border-[#263b27]/10 text-left">
                          <div className="map-stop-card">
                            <img src={stop.image} alt="" className="map-stop-card__image" />
                            <div className="map-stop-card__content">
                              <span className="map-stop-card__meta">
                                {stop.region} · {meta.label}
                              </span>
                              <strong className="map-stop-card__title">{stop.name}</strong>
                              <p className="map-stop-card__note">{stop.note}</p>
                              <p className="map-stop-card__detail">{stop.detail}</p>
                              <button
                                type="button"
                                className={`map-stop-card__favorite ${isFavorite ? "is-favorite" : ""}`}
                                onClick={() => onToggleFavorite(stop.name)}
                                aria-label={`${isFavorite ? "Remove" : "Add"} ${stop.name} ${isFavorite ? "from" : "to"} tour favorites`}
                              >
                                {isFavorite ? "✓ Added to favorites" : "+ Add to favorites"}
                              </button>
                              <a
                                href={stop.learnMoreHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="map-stop-card__link"
                              >
                                learn more →
                              </a>
                            </div>
                          </div>
                        </div>
                        {/* Downward pointing arrow pointer */}
                        <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white rotate-45 border-r border-b border-[#263b27]/10 z-[-1]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Legend below the map */}
      <div className="mt-4 flex flex-wrap p-4 gap-4 text-sm text-black/55">
        {(Object.keys(CATEGORY_META) as MapCategory[]).map((key) => (
          <span key={key} className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: CATEGORY_META[key].color }} />
            {CATEGORY_META[key].label}
          </span>
        ))}
      </div>
    </div>
  );
}
