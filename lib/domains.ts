export type SiteKey = "main" | "vwbali" | "gobali" | "balisafari";

export interface SiteConfig {
  key: SiteKey;
  label: string;
  url: string;
  path: string;
  title: string;
  description: string;
}

export const SITES: Record<SiteKey, SiteConfig> = {
  main: {
    key: "main",
    label: "Home",
    url: "https://balisafaritour.com",
    path: "/",
    title: "Custom VW Safari Bali Tours | Private Volkswagen Adventures",
    description:
      "Plan a custom VW Safari Bali Tour in a classic open-top Volkswagen. Enjoy private, flexible routes with local driver-guides through Bali's rice terraces, temples, villages, and hidden gems.",
  },
  vwbali: {
    key: "vwbali",
    label: "Guest Photos",
    url: "https://balisafaritour.com",
    path: "/guest-photos",
    title: "Guest Experiences | VW Bali Tours",
    description:
      "See real guest photos and videos from classic Volkswagen safari tours across Bali - genuine moments from real trips, shared by the travelers who took them.",
  },
  gobali: {
    key: "gobali",
    label: "Bali Guide",
    url: "https://balisafaritour.com",
    path: "/bali-guide",
    title: "Bali Attractions Guide | Go Bali Tours",
    description:
      "A comprehensive guide to Bali's must-see tourist attractions - temples, rice terraces, markets, and viewpoints - with tips for visiting each one on a guided VW safari tour.",
  },
  balisafari: {
    key: "balisafari",
    label: "Map",
    url: "https://balisafaritour.com",
    path: "/map",
    title: "Interactive Map & Trip Planner | Bali Safari Tours",
    description:
      "Plan your Bali VW safari route with an interactive map and day-by-day itinerary guide covering the island's top attractions.",
  },
};

const HOST_TO_SITE: Record<string, SiteKey> = {
  "balivw.tours": "vwbali",
  "www.balivw.tours": "vwbali",
  "gobali.tours": "gobali",
  "www.gobali.tours": "gobali",
  "balisafari.tours": "balisafari",
  "www.balisafari.tours": "balisafari",
  "balisafaritour.com": "main",
  "www.balisafaritour.com": "main",
};

export function siteForHost(host: string | null | undefined): SiteConfig {
  if (!host) return SITES.main;
  const hostname = host.split(":")[0].toLowerCase();
  const key = HOST_TO_SITE[hostname];
  return SITES[key ?? "main"];
}
