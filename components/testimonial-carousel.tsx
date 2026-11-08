"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ArrowIcon from "@/components/arrow-icon";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import type { PublishedReview } from "@/lib/reviews";

function ReviewCard({ review, index, total, isSlide = false }: { review: PublishedReview; index: number; total: number; isSlide?: boolean }) {
  const formattedDate = formatReviewDate(review.createdAt);

  return (
    <blockquote aria-roledescription={isSlide ? "slide" : undefined} aria-label={isSlide ? `Review ${index + 1} of ${total}` : undefined} className="flex min-h-72 flex-col bg-white p-6 shadow-[0_20px_50px_rgb(30_42_25/0.08)] sm:p-8">
      <div className="flex items-start justify-between gap-3">
        <div className="text-sm tracking-[.14em] text-[#79924f]" aria-label={`${review.rating} out of 5 stars`}>
          {"★".repeat(review.rating)}<span className="text-black/15">{"★".repeat(5 - review.rating)}</span>
        </div>
        {formattedDate ? <time dateTime={review.createdAt} className="text-right text-[9px] font-bold uppercase tracking-[.12em] text-black/35">{formattedDate}</time> : null}
      </div>
      <p className="mt-6 flex-1 text-base leading-7 text-[#263b27]">“{review.q}”</p>
      <footer className="mt-7 flex items-center gap-3 border-t border-black/10 pt-5">
        {review.f ? <Image src={review.f} alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover" /> : <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#b6cd72] text-xs font-bold uppercase text-[#425f32]" aria-hidden="true">{review.n.slice(0, 1)}</span>}
        <div><b className="block text-xs uppercase tracking-[.12em]">{review.n}</b><span className="text-xs text-black/45">{review.c}</span></div>
      </footer>
    </blockquote>
  );
}

function formatReviewDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export default function TestimonialCarousel({ reviews }: { reviews: PublishedReview[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);

  useEffect(() => {
    function updateVisibleCount() {
      const nextVisibleCount = window.matchMedia("(min-width: 1024px)").matches
        ? 3
        : window.matchMedia("(min-width: 768px)").matches
          ? 2
          : 1;

      setVisibleCount(nextVisibleCount);
      setActiveIndex((index) => Math.min(index, Math.max(0, reviews.length - nextVisibleCount)));
    }

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [reviews.length]);

  if (reviews.length === 0) return null;

  const canNavigate = reviews.length > visibleCount;

  return (
    <div className="mx-auto mt-12 max-w-7xl">
      <div className="hidden columns-3 gap-6 lg:block">
        {reviews.map((review, index) => (
          <div key={review.id} className="mb-6 break-inside-avoid">
            <ReviewCard review={review} index={index} total={reviews.length} />
          </div>
        ))}
      </div>

      <div className="lg:hidden" aria-roledescription="carousel" aria-label="Guest reviews">
        <Swiper
          key={visibleCount}
          modules={[Autoplay]}
          autoHeight
          autoplay={canNavigate ? { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
          onSwiper={(instance) => {
            setSwiper(instance);
            setActiveIndex(instance.realIndex);
          }}
          onSlideChange={(instance) => setActiveIndex(instance.realIndex)}
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={16}
          loop={canNavigate}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 20 },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={review.id} className="!h-auto">
              <ReviewCard review={review} index={index} total={reviews.length} isSlide />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {canNavigate ? (
        <nav className="mt-7 flex items-center justify-center gap-2 md:hidden" aria-label="Review navigation">
          {reviews.map((review, index) => (
            <button
              key={review.id}
              type="button"
              onClick={() => swiper?.slideToLoop(index)}
              aria-label={`Go to review ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#425f32] ${activeIndex === index ? "w-6 bg-[#425f32]" : "w-2.5 bg-[#425f32]/25 hover:bg-[#425f32]/50"}`}
            />
          ))}
        </nav>
      ) : null}

      <div className="mt-7 hidden items-center justify-between md:flex lg:hidden">
        <span className="text-[10px] font-bold uppercase tracking-[.16em] text-black/40" aria-live="polite">
          {String(activeIndex + 1).padStart(2, "0")} <span className="text-black/20">/</span> {String(reviews.length).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => swiper?.slidePrev()} aria-label="Previous review" disabled={!canNavigate} className="flex h-11 w-11 items-center justify-center border border-black/15 text-lg text-[#425f32] transition hover:bg-[#425f32] hover:text-white disabled:cursor-default disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-[#425f32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#425f32]">
            <ArrowIcon direction="left" className="size-5 shrink-0" />
          </button>
          <button type="button" onClick={() => swiper?.slideNext()} aria-label="Next review" disabled={!canNavigate} className="flex h-11 w-11 items-center justify-center border border-black/15 text-lg text-[#425f32] transition hover:bg-[#425f32] hover:text-white disabled:cursor-default disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-[#425f32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#425f32]">
            <ArrowIcon direction="right" className="size-5 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
}