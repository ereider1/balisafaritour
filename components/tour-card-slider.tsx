"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ArrowIcon from "@/components/arrow-icon";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";

type TourCardSliderProps = {
  image: string;
  gallery: string[];
  alt: string;
  href: string;
};

export default function TourCardSlider({
  image,
  gallery,
  alt,
  href,
}: TourCardSliderProps) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const images = Array.from(new Set([image, ...gallery]));

  return (
    <div
      className="group/slider relative h-full w-full"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${alt} photos`}
    >
      <Swiper
        className="h-full w-full"
        slidesPerView={1}
        rewind={images.length > 1}
        onSwiper={(instance) => setSwiper(instance)}
      >
        {images.map((src, index) => (
          <SwiperSlide
            key={src}
            className="!relative !h-full !overflow-hidden !bg-[#263b27]"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${images.length}`}
          >
            <Link href={href} aria-label={`View ${alt}`} className="absolute inset-0">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {images.length > 1 ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-end bg-gradient-to-t from-black/55 to-transparent px-3 pb-3 pt-8 opacity-0 transition-opacity group-hover/slider:opacity-100 group-focus-within/slider:opacity-100 sm:px-4 sm:pb-4">
          <div className="pointer-events-auto flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => swiper?.slidePrev()}
              aria-label={`Previous ${alt} photo`}
              className="grid size-8 place-items-center bg-black/35 text-white transition hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:size-9"
            >
              <ArrowIcon direction="left" className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => swiper?.slideNext()}
              aria-label={`Next ${alt} photo`}
              className="grid size-8 place-items-center bg-black/35 text-white transition hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:size-9"
            >
              <ArrowIcon direction="right" className="size-4" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
