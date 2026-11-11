import type { Metadata } from "next";
import MainHome from "@/components/main-home";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Private VW Safari Tours in Bali",

  description:
    "Experience Bali in an original open-top Volkswagen. Enjoy private VW Safari tours with a local driver-guide through Bali's villages, temples and beautiful countryside.",

  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <MainHome />;
}