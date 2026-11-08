"use client";

import Image from "next/image";
import { FaClock, FaDollarSign, FaMap, FaUsers } from "react-icons/fa";
import { SITES } from "@/lib/domains";

const tours = [
  {
    id: 1,
    name: "Sunrise Adventure",
    duration: "4 hours",
    groupSize: "1-4 people",
    distance: "35 km",
    price: "$89",
    description: "Start your day with a breathtaking sunrise tour through Bali's countryside.",
    image: "/gallerypics/bali_vw_01.jpg",
    highlights: ["Sunrise viewpoint", "Traditional villages", "Local market visit"],
  },
  {
    id: 2,
    name: "Cultural Heritage",
    duration: "6 hours",
    groupSize: "1-6 people",
    distance: "50 km",
    price: "$129",
    description: "Immerse yourself in Bali's rich culture with visits to temples and local communities.",
    image: "/gallerypics/bali_vw_02.jpg",
    highlights: ["Ancient temples", "Cultural demonstrations", "Lunch included"],
  },
  {
    id: 3,
    name: "Beach Hopper",
    duration: "5 hours",
    groupSize: "1-5 people",
    distance: "45 km",
    price: "$109",
    description: "Visit Bali's most beautiful beaches and secret coves in one unforgettable day.",
    image: "/gallerypics/bali_vw_03.jpg",
    highlights: ["Multiple beaches", "Water activities", "Sunset views"],
  },
  {
    id: 4,
    name: "Adventure Expedition",
    duration: "8 hours",
    groupSize: "1-4 people",
    distance: "60 km",
    price: "$199",
    description: "The ultimate Bali experience with hiking, waterfalls, and mountain scenery.",
    image: "/gallerypics/bali_vw_04.jpg",
    highlights: ["Mountain hiking", "Waterfall visits", "Full meals included"],
  },
];

export default function Tours() {
  return (
    <section id="tours" className="py-20 lg:py-32">
      <div className="container-max container-padding">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <span className="badge">Our Tours</span>
          <h2 className="section-title mb-4 mt-4">Choose Your Perfect Adventure</h2>
          <p className="section-subtitle">
            From cultural experiences to beach hopping, we have the perfect tour for you.
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {tours.map((tour) => (
            <div key={tour.id} className="card overflow-hidden">
              {/* Image */}
              <div className="relative mb-6 h-48 w-full overflow-hidden rounded-lg">
                <Image
                  src={tour.image}
                  alt={tour.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Content */}
              <h3 className="mb-3 text-2xl font-bold text-gray-900">{tour.name}</h3>

              <p className="mb-4 text-gray-600">{tour.description}</p>

              {/* Details Grid */}
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <FaClock size={16} className="text-primary-600" />
                  <span className="text-gray-600">{tour.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaUsers size={16} className="text-primary-600" />
                  <span className="text-gray-600">{tour.groupSize}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaMap size={16} className="text-primary-600" />
                  <span className="text-gray-600">{tour.distance}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaDollarSign size={16} className="text-primary-600" />
                  <span className="font-semibold text-gray-900">{tour.price}/person</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-6 space-y-2">
                {tour.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="h-2 w-2 rounded-full bg-primary-600" />
                    {highlight}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a href={`https://wa.me/6281237812783?text=I'm interested in the ${tour.name} tour`} className="btn-primary w-full text-center">
                Book This Tour
              </a>
            </div>
          ))}
        </div>

        {/* All Tours CTA */}
        <div className="mt-16 text-center">
          <p className="mb-4 text-gray-600">Interested in a custom tour?</p>
          <a href="https://wa.me/6281237812783" className="btn-secondary">
            Create Your Own Adventure
          </a>
        </div>

        {/* Cross-site links */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Not sure which stops to pick? See{" "}
            <a href={SITES.gobali.url} className="text-primary-600 hover:underline">
              our full guide to Bali&apos;s top attractions
            </a>{" "}
            at {SITES.gobali.url.replace("https://", "")}, or map out a route with{" "}
            <a href={SITES.balisafari.url} className="text-primary-600 hover:underline">
              our interactive trip planner
            </a>{" "}
            at {SITES.balisafari.url.replace("https://", "")}.
          </p>
        </div>
      </div>
    </section>
  );
}
