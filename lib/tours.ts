export type Tour = {
  slug: string;
  name: string;
  location: string;
  duration: string;
  image: string;
  gallery: string[];
  description: string;
  summary: string;
  stops: string[];
  highlights: string[];
  itinerary: { title: string; description: string }[];
  price: number;
};

export const TOURS: Tour[] = [
  {
    slug: "tabanan-tour",
    name: "Tabanan & Jatiluwih Tours",
    location: "West Bali",
    duration: "Full day · Scenic",
    image: "/tourpics/tabanan-02.jpg",
    gallery: [
      "/tourpics/tabanan-02.jpg",
      "/tourpics/jatiluwih3.jpg",
      "/tourpics/tanah-lot.jpg",
      "/tourpics/bali_vw_01.jpg",
    ],
    description:
      "Pair the dramatic coast at Tanah Lot with the wide-open green of Jatiluwih. This private drive through Tabanan is a relaxed way to see temple, countryside and rice-terrace scenery in one flexible day.",
    summary:
      "Explore Tabanan's coast and countryside, from Tanah Lot Temple to the Jatiluwih rice terraces.",
    stops: ["Tanah Lot Temple", "Coffee Plantation", "Jatiluwih Rice Terrace"],
    highlights: [
      "See the ocean-side setting of Tanah Lot Temple",
      "Take in the UNESCO-listed Jatiluwih rice terraces",
      "Enjoy a private drive through Tabanan's rural landscape",
      "Set the pace and photo stops with your local driver-guide",
    ],
    itinerary: [
      {
        title: "Start at the coast",
        description:
          "Begin with the coastal scenery around Tanah Lot and time to explore the temple area.",
      },
      {
        title: "Take the countryside road",
        description:
          "Pause at a coffee plantation, then continue inland through Tabanan's villages.",
      },
      {
        title: "Finish among the terraces",
        description:
          "Spend time at Jatiluwih, with room in the day for photos and a relaxed return drive.",
      },
    ],
    price: 700,
  },
  {
    slug: "ubud-tour",
    name: "Ubud Tours",
    location: "Central Bali",
    duration: "Full day · Culture",
    image: "/tourpics/ubud-market.jpg",
    gallery: [
      "/tourpics/ubud-market.jpg",
      "/tourpics/monkey-forest-3.jpg",
      "/tourpics/gunung-kawi-01.jpg",
      "/tourpics/jatiluwih3.jpg",
    ],
    description:
      "Get to know Ubud through its performance, market and craft traditions, then head into the surrounding landscape. The route brings cultural stops and rice-terrace views together, with time to enjoy each at your own pace.",
    summary:
      "Discover Ubud's art, village culture and rice-terrace scenery in a private classic Volkswagen.",
    stops: [
      "Barong Dance",
      "Ubud Art Market",
      "Silver Jewelry or Painting",
      "Tegalalang Rice Terrace",
    ],
    highlights: [
      "Experience a traditional Barong dance performance",
      "Browse the stalls at Ubud Art Market",
      "Explore local silver or painting traditions",
      "Take in the green views at Tegalalang",
    ],
    itinerary: [
      {
        title: "Meet Bali's performing arts",
        description:
          "Start with a Barong dance performance; show times can shape the day's order.",
      },
      {
        title: "Explore Ubud town",
        description:
          "Browse the art market and choose a craft stop that suits your interests.",
      },
      {
        title: "Head to the rice terraces",
        description:
          "Finish with the landscape around Tegalalang before heading back at a comfortable pace.",
      },
    ],
    price: 700,
  },
  {
    slug: "kintamani-volcano-tour",
    name: "Kintamani Volcano Tours",
    location: "Bali Highlands",
    duration: "Full day · Highlands",
    image: "/tourpics/volcano.jpg",
    gallery: [
      "/tourpics/volcano.jpg",
      "/tourpics/jatiluwih3.jpg",
      "/tourpics/bali_vw_01.jpg",
      "/tourpics/bali_vw_02.jpg",
    ],
    description:
      "Trade the coast for cooler highland roads and broad views of Mount Batur. This route pairs the Tegalalang rice terraces and a coffee plantation with a visit to the Kintamani volcano viewpoint.",
    summary:
      "Follow a highland route through rice terraces and coffee country to Mount Batur views.",
    stops: [
      "Tegalalang Rice Terrace",
      "Coffee Plantation",
      "Mount Batur View",
    ],
    highlights: [
      "See Mount Batur and its volcanic landscape from Kintamani",
      "Visit the Tegalalang rice terraces",
      "Add a coffee plantation stop along the way",
      "Enjoy a scenic private drive into Bali's highlands",
    ],
    itinerary: [
      {
        title: "Set out through the green interior",
        description:
          "Travel inland toward Tegalalang and take time to enjoy the rice-terrace landscape.",
      },
      {
        title: "Pause for a coffee stop",
        description:
          "Visit a coffee plantation on the way north; ask your guide about the options available.",
      },
      {
        title: "Take in the volcano views",
        description:
          "Spend time at the Mount Batur viewpoint before your return journey.",
      },
    ],
    price: 700,
  },
  {
    slug: "uluwatu-sunset-tour",
    name: "Uluwatu Sunset Tours",
    location: "South Bali",
    duration: "Full day · Sunset",
    image: "/tourpics/uluwatu.jpg",
    gallery: [
      "/tourpics/uluwatu.jpg",
      "/tourpics/tanah-lot.jpg",
      "/tourpics/bali_vw_01.jpg",
      "/tourpics/bali_vw_02.jpg",
    ],
    description:
      "Spend the day on Bali's southern coast, from the beach to the clifftop setting of Uluwatu Temple. If timing and availability allow, finish with the Kecak fire dance and a stop around Jimbaran Bay.",
    summary:
      "Follow the south-coast road to Uluwatu Temple, sunset views and the Kecak fire dance.",
    stops: [
      "Pandawa Beach",
      "Uluwatu Temple",
      "Kecak Fire Dance",
      "Jimbaran Bay",
    ],
    highlights: [
      "Enjoy a coastal drive through South Bali",
      "Visit the clifftop setting of Uluwatu Temple",
      "Plan around sunset and the Kecak performance schedule",
      "Add time at Pandawa Beach or Jimbaran Bay",
    ],
    itinerary: [
      {
        title: "Discover the southern coastline",
        description:
          "Start with a beach stop such as Pandawa, adjusting the pace to your plans.",
      },
      {
        title: "Visit Uluwatu Temple",
        description:
          "Explore the clifftop temple area and ocean views with your guide.",
      },
      {
        title: "Stay for the evening",
        description:
          "If you choose the Kecak performance, the final timing will follow the show schedule; Jimbaran can be added to the plan.",
      },
    ],
    price: 700,
  },
  {
    slug: "instagram-tour",
    name: "Instagram Tours",
    location: "Custom Bali",
    duration: "Full day · Photo route",
    image: "/tourpics/bali-swing.jpg",
    gallery: [
      "/tourpics/bali-swing.jpg",
      "/tourpics/jatiluwih3.jpg",
      "/tourpics/tanah-lot.jpg",
      "/tourpics/uluwatu.jpg",
    ],
    description:
      "Build a photo-friendly day around the places you want to remember. Choose from Bali's swings, waterfalls, temples, rice terraces and viewpoints, then shape the order with your local guide.",
    summary:
      "Create a camera-ready route around Bali's swings, waterfalls, temples and rice terraces.",
    stops: ["Bali Swing", "Waterfalls", "Temples", "Rice Terraces"],
    highlights: [
      "Choose the photo stops that match your travel style",
      "Balance popular viewpoints with time to explore",
      "Set your own pace for photos and scenic breaks",
      "Adjust the route with your guide on the day",
    ],
    itinerary: [
      {
        title: "Choose your must-see locations",
        description:
          "Tell us which swings, waterfalls, temples or terraces are on your list.",
      },
      {
        title: "Plan the route together",
        description:
          "Your guide can help organize the stops into a practical day based on your starting point.",
      },
      {
        title: "Enjoy the day at your pace",
        description:
          "Leave room for photos and change the plan as you go, subject to timing and access.",
      },
    ],
    price: 700,
  },
  {
    slug: "build-your-own",
    name: "Custom Bali Tours",
    location: "Anywhere in Bali",
    duration: "Full day · Your own route",
    image: "/tourpics/bali_vw_01.jpg",
    gallery: [
      "/tourpics/bali_vw_01.jpg",
      "/tourpics/jatiluwih3.jpg",
      "/tourpics/ubud-market.jpg",
      "/tourpics/uluwatu.jpg",
    ],
    description:
      "Make the day about what interests you. Share your starting point, favorite places and the pace you prefer, and we'll help connect the stops into a private route with your local driver-guide.",
    summary:
      "Choose your own Bali stops and shape a private Volkswagen tour around your interests.",
    stops: [
      "Choose your favorite places",
      "Add a village, garden or hot spring",
      "Set a relaxed or full day pace",
    ],
    highlights: [
      "Start with your own wish list rather than a fixed itinerary",
      "Ask about gardens, hot springs and local ceremonies",
      "Make time for the stops that matter to your group",
      "Get help connecting your ideas into a route",
    ],
    itinerary: [
      {
        title: "Tell us what you have in mind",
        description:
          "Share your dates, hotel area and the places or experiences you are curious about.",
      },
      {
        title: "Shape a practical route",
        description:
          "We can help connect your chosen stops and discuss how much to fit into the day.",
      },
      {
        title: "Enjoy your private day",
        description:
          "Travel with a local driver-guide and keep the plan flexible along the way.",
      },
    ],
    price: 700,
  },
  {
    slug: "monkey-forest-tour",
    name: "Bali Monkey Forest & Waterfalls",
    location: "Central Bali",
    duration: "Full day · Nature",
    image: "/tourpics/monkey-forest-3.jpg",
    gallery: [
      "/tourpics/monkey-forest-3.jpg",
      "/tourpics/gunung-kawi-01.jpg",
      "/tourpics/ubud-market.jpg",
      "/tourpics/bali_vw_02.jpg",
    ],
    description:
      "Explore Bali's greener side with a route linking the Monkey Forest, Gunung Kawi Sebatu and Ulu Petanu Waterfall. Spend time among the forest paths and temple surroundings, then enjoy a scenic drive between stops.",
    summary:
      "Pair the Monkey Forest with Gunung Kawi Sebatu and Ulu Petanu Waterfall.",
    stops: ["Monkey Forest", "Gunung Kawi Sebatu", "Ulu Petanu Waterfall"],
    highlights: [
      "Walk among the trees at the Monkey Forest",
      "Visit the temple setting of Gunung Kawi Sebatu",
      "Take a nature break at Ulu Petanu Waterfall",
      "Travel between stops in a private classic Volkswagen",
    ],
    itinerary: [
      {
        title: "Start among the forest paths",
        description:
          "Explore the Monkey Forest area and allow time for a relaxed walk.",
      },
      {
        title: "Continue to Gunung Kawi Sebatu",
        description:
          "Visit the temple surroundings and enjoy the quieter green setting.",
      },
      {
        title: "End with a waterfall visit",
        description:
          "Finish at Ulu Petanu Waterfall; access and conditions can vary, so confirm details before your tour.",
      },
    ],
    price: 700,
  },
];

export const HOME_TOURS = TOURS.filter(
  (tour) => tour.slug !== "monkey-forest-tour",
);

export function getTourBySlug(slug: string) {
  return TOURS.find((tour) => tour.slug === slug);
}
