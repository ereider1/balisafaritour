"use client";

import Image from "next/image";
import herobg from '../public/hero-1.png';
import TrackedWhatsAppLink from "@/components/tracked-whatsapp-link";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-linear-to-b from-primary-50 to-white">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={herobg}
          alt="Bali Landscape"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-20"
        />
      </div>

      {/* Content */}
      <div className="container-max container-padding relative flex min-h-screen flex-col items-center justify-center">
        <div className="max-w-3xl text-center">
          <div className="mb-6 inline-block">
            <span className="badge">Experience Bali Like Never Before</span>
          </div>

          <h1 className="section-title mb-6 animate-fade-in text-balance">
            Explore Bali in a Classic Volkswagen
          </h1>

          <p className="section-subtitle mb-8 animate-fade-in text-balance">
            Discover the hidden gems and stunning landscapes of Bali with our premium VW tour
            service. Professional guides, curated routes, and unforgettable memories await.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="#tours" className="btn-primary">
              Explore Tours
            </a>
            <TrackedWhatsAppLink href="https://wa.me/6281237812783" source="hero" className="btn-secondary">
              WhatsApp Us
            </TrackedWhatsAppLink>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary-600">500+</div>
              <p className="text-sm text-gray-600">Happy Travelers</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">12</div>
              <p className="text-sm text-gray-600">Unique Tours</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">4.9★</div>
              <p className="text-sm text-gray-600">Avg. Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-primary-600">
          <span className="text-sm font-medium">Scroll down</span>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
