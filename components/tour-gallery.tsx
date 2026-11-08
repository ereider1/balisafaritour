"use client";

import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type TourGalleryProps = {
  images: string[];
  tourName: string;
};

export default function TourGallery({ images, tourName }: TourGalleryProps) {
  return (
    <>
      <div
        className="relative mt-8 aspect-[1/1.05] overflow-hidden bg-[#263b27] sm:hidden"
        role="region"
        aria-label={`${tourName} photos`}
      >
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          loop={images.length > 1}
          autoplay={
            images.length > 1
              ? { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }
              : false
          }
          className="h-full w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={image}
              className="!relative !h-full !overflow-hidden !bg-[#263b27]"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${images.length}`}
            >
              <Image
                src={image}
                alt={`${tourName} photo ${index + 1}`}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mt-8 hidden aspect-[2.4/1] grid-cols-4 grid-rows-2 gap-2 overflow-hidden sm:mt-10 sm:grid">
        {images.map((image, index) => (
          <div
            key={image}
            className={`relative overflow-hidden bg-[#263b27] ${
              index === 0 ? "col-span-2 row-span-2" : ""
            }`}
          >
            <Image
              src={image}
              alt={`${tourName} photo ${index + 1}`}
              fill
              priority={index === 0}
              sizes={index === 0 ? "50vw" : "25vw"}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </>
  );
}
