"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SITES } from "@/lib/domains";

type GuestPhoto = {
  id: string;
  src: string;
  alt: string;
  isPublished?: boolean;
};

export default function GuestShowcase() {
  const [guestPhotos, setGuestPhotos] = useState<GuestPhoto[]>([]);

  useEffect(() => {
    fetch("/api/gallery")
      .then((response) => (response.ok ? response.json() : { photos: [] }))
      .then((data: { photos?: GuestPhoto[] }) => setGuestPhotos(data.photos ?? []))
      .catch(() => setGuestPhotos([]));
  }, []);

  return (
    <section id="gallery" className="scroll-mt-24 py-24 lg:py-32">
      <div className="container-max container-padding">
        <div className="mb-14 grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div><p className="script text-4xl">The view from the back seat</p><h2 className="mt-1 font-[family-name:var(--font-display)] text-5xl font-black uppercase leading-[.92] tracking-tight sm:text-6xl">Real guests.<br />Real Bali.</h2></div>
          <p className="max-w-xl text-base leading-7 text-black/55 lg:ml-auto">Every trip looks different behind the wheel of a classic Bali VW. These are unscripted moments from real travelers—temple mornings, roadside coconuts and all.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {guestPhotos.map((photo, index) => (
            <div
              key={photo.src}
              className={`${index === 0 || index === 9 || index === 18 ? "col-span-2 row-span-2" : ""} group relative aspect-square overflow-hidden bg-[#263b27]`}
            >
              {photo.src.startsWith("https://") ? (
                <img src={photo.src} alt={photo.alt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/75 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="max-w-sm text-xs leading-5 text-white/85">{photo.alt}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-black/10 pt-8 text-center">
          <p className="text-xs leading-6 text-black/45">
            Curious where each photo was taken? See{" "}
            <a href={SITES.gobali.url} className="font-bold text-[#425f32] hover:underline">
              our full guide to Bali&apos;s attractions
            </a>{" "}
            at {SITES.gobali.url.replace("https://", "")}, or plan your own route with{" "}
            <a href={SITES.balisafari.url} className="font-bold text-[#425f32] hover:underline">
              our trip planner
            </a>{" "}
            at {SITES.balisafari.url.replace("https://", "")}.
          </p>
        </div>
      </div>
    </section>
  );
}
