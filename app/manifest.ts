import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Custom VW Safari Bali Tours",
    short_name: "VW Safari Bali",
    description:
      "Plan a custom VW Safari Bali Tour in a classic convertible Volkswagen with a private local driver-guide.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbfaf6",
    theme_color: "#263b27",
    icons: [
      {
        src: "/favicon.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/vw-icon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
