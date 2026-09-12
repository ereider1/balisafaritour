"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "glightbox/dist/css/glightbox.min.css";
import { SITES } from "@/lib/domains";

interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
}

export default function Gallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);

  useEffect(() => {
    fetch("/api/gallery")
      .then((response) => (response.ok ? response.json() : { photos: [] }))
      .then((data: { photos?: GalleryPhoto[] }) => setPhotos(data.photos ?? []))
      .catch(() => setPhotos([]));
  }, []);

  const displayedImages = photos.slice(0, 6);

  useEffect(() => {
    if (displayedImages.length === 0) return;
    let lightbox: { destroy: () => void } | undefined;

    import("glightbox").then(({ default: GLightbox }) => {
      lightbox = GLightbox({
        selector: ".glightbox",
        loop: true,
        touchNavigation: true,
        zoomable: true,
      });
    });

    return () => lightbox?.destroy();
  }, [displayedImages]);

  return (
    <section id="gallery" className="py-20 lg:py-32">
      <div className="container-max container-padding">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <span className="badge">Gallery</span>
          <h2 className="section-title mb-4 mt-4">Moments to Remember</h2>
          <p className="section-subtitle">Explore our collection of unforgettable moments from Bali tours.</p>
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {displayedImages.map((image) => (
            <a
              key={image.id}
              href={image.src}
              className="glightbox group relative block h-64 overflow-hidden rounded-lg md:h-80"
              data-gallery="bali-gallery"
              data-glightbox={`title: ${image.alt}`}
            >
              {image.src.startsWith("https://") ? (
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div>
                  <p className="text-sm font-semibold text-white">{image.alt}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="mb-4 text-gray-600">Create your own unforgettable moments</p>
          <a href="https://wa.me/6281237812783" className="btn-primary">
            Book Your Tour Today
          </a>
          <p className="mt-6 text-sm text-gray-500">
            See hundreds more real guest photos and videos at{" "}
            <a href={SITES.vwbali.url} className="text-primary-600 hover:underline">
              {SITES.vwbali.url.replace("https://", "")}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
