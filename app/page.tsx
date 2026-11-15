import type { Metadata } from "next";
import MainHome from "@/components/main-home";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Custom VW Safari Bali Tours",

  description:
    "Create a custom VW Safari Bali Tour in an original open-top Volkswagen. Enjoy a private, flexible route with a local driver-guide through Bali's villages, temples, rice terraces, and beautiful countryside.",

  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <MainHome />;
}
