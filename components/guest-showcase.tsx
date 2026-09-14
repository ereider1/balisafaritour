"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SITES } from "@/lib/domains";

type GuestPhoto = {
  id: string;
  src: string;
  alt: string;
  isPublished?: boolean;
  type?: "image" | "video";
};

export default function GuestShowcase() {
  const [guestPhotos, setGuestPhotos] = useState<GuestPhoto[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const selectedPhoto = selectedIndex !== null ? guestPhotos[selectedIndex] : null;

  useEffect(() => {
    fetch("/api/gallery")
      .then((response) => (response.ok ? response.json() : { photos: [] }))
      .then((data: { photos?: GuestPhoto[] }) => setGuestPhotos(data.photos ?? []))
      .catch(() => setGuestPhotos([]));
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % guestPhotos.length : null));
      }
      if (event.key === "ArrowLeft") {
        setSelectedIndex((prev) =>
          prev !== null ? (prev - 1 + guestPhotos.length) % guestPhotos.length : null
        );
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, guestPhotos.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      // Swiped left, show next
      setSelectedIndex((prev) => (prev !== null ? (prev + 1) % guestPhotos.length : null));
    } else if (diff < -50) {
      // Swiped right, show previous
      setSelectedIndex((prev) =>
        prev !== null ? (prev - 1 + guestPhotos.length) % guestPhotos.length : null
      );
    }
    setTouchStartX(null);
  };

  return (
    <section id="gallery" className="scroll-mt-24 py-24 lg:py-32">
      <div className="container-max container-padding">
        <div className="mb-14 grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="script text-4xl">The view from the back seat</p>
            <h2 className="mt-1 font-[family-name:var(--font-display)] text-5xl font-black uppercase leading-[.92] tracking-tight sm:text-6xl">
              Real guests.
              <br />
              Real Bali.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-black/55 lg:ml-auto">
            Every trip looks different behind the wheel of a classic Bali VW. These are unscripted
            moments from real travelers—temple mornings, roadside coconuts and all.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {guestPhotos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`${index === 0 || index === 9 || index === 18 ? "col-span-2 row-span-2" : ""} group relative aspect-square overflow-hidden bg-[#263b27] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#79924f] w-full cursor-pointer`}
            >
              {photo.type === "video" ? (
                <video
                  src={photo.src}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : photo.src.startsWith("https://") ? (
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={
                    index === 0 || index === 9 || index === 18
                      ? "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
                      : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  }
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/75 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="max-w-sm text-xs leading-5 text-white/85">{photo.alt}</p>
              </div>
              {photo.type === "video" && (
                <span
                  className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white text-[10px] uppercase font-bold tracking-wider"
                  aria-hidden
                >
                  ▶
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-16 border-t border-black/10 pt-8 text-center">
          <p className="text-xs leading-6 text-black/45">
            <a className="btn-primary px-3 py-3 m-2" href="https://www.tiktok.com/@bobbyinyomandinat?_r=1&_t=ZS-99iaiPhhyam" target="_blank">View more photos on TIKTOK</a>
            <a className="btn-primary px-3 py-3 m-2" href="https://www.instagram.com/balisafaritour?stkn=ZHdjM3Uyc2tuc3hl&utm_source=qr" target="_blank">View more photos on INSTAGRAM</a><br />
            <a href={SITES.gobali.url} className="font-bold text-[#425f32] hover:underline">
             View our full guide to Bali&apos;s attractions
            </a>{" "}
            at {SITES.gobali.url.replace("https://", "")}, or plan your own route with{" "}
            <a href={SITES.balisafari.url} className="font-bold text-[#425f32] hover:underline">
              our trip planner
            </a>{" "}
            at {SITES.balisafari.url.replace("https://", "")}.
          </p>
        </div>
      </div>

      {selectedPhoto && selectedIndex !== null ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[#1d211e]/95 p-5 sm:p-10 select-none"
          role="dialog"
          aria-modal="true"
          aria-label={selectedPhoto.alt}
          onClick={() => setSelectedIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center border border-white/40 text-2xl text-white transition hover:bg-white/10 hover:border-white animate-fade-in"
            aria-label="Close photo viewer"
          >
            ×
          </button>

          {/* Previous Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) =>
                prev !== null ? (prev - 1 + guestPhotos.length) % guestPhotos.length : null
              );
            }}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/30 text-xl text-white transition hover:bg-black/60 hover:scale-105 active:scale-95 sm:left-8 sm:h-12 sm:w-12 sm:text-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            aria-label="Previous photo"
          >
            ‹
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => (prev !== null ? (prev + 1) % guestPhotos.length : null));
            }}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/30 text-xl text-white transition hover:bg-black/60 hover:scale-105 active:scale-95 sm:right-8 sm:h-12 sm:w-12 sm:text-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            aria-label="Next photo"
          >
            ›
          </button>

          {/* Media Container */}
          <div
            className="relative h-[78vh] w-full max-w-5xl flex items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            {selectedPhoto.type === "video" ? (
              <video
                src={selectedPhoto.src}
                controls
                autoPlay
                className="max-h-[78vh] max-w-full rounded-md outline-hidden bg-black/40"
                playsInline
              />
            ) : selectedPhoto.src.startsWith("https://") ? (
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="max-h-[78vh] max-w-full object-contain"
              />
            ) : (
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            )}
          </div>

          {/* Photo Information & Counter */}
          <p className="absolute bottom-5 left-5 text-[10px] font-bold uppercase tracking-[.18em] text-white/65 sm:bottom-8 sm:left-10">
            {selectedPhoto.alt}{" "}
            <span className="ml-2 text-white/40">
              ({selectedIndex + 1} of {guestPhotos.length})
            </span>
          </p>
        </div>
      ) : null}
    </section>
  );
}
