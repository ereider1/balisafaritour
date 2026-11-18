"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    country: "United States",
    rating: 5,
    text: "Absolutely amazing experience! The driver was knowledgeable, the VW was comfortable, and the views were breathtaking. Highly recommend!",
    image: "flags/US.svg",
  },
  {
    id: 2,
    name: "Marco Rossi",
    country: "Italy",
    rating: 5,
    text: "The best tour we've had in Bali. Professional service, hidden gems, and unforgettable memories. Worth every penny!",
    image: "flags/IT.svg",
  },
  {
    id: 3,
    name: "Emma Williams",
    country: "Australia",
    rating: 5,
    text: "Incredible attention to detail and customer service. The sunset beach tour was magical. Can't wait to come back!",
    image: "flags/AU.svg",
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="bg-gradient-to-b from-primary-50 to-white py-20 lg:py-32">
      <div className="container-max container-padding">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <span className="badge">Testimonials</span>
          <h2 className="section-title mb-4 mt-4">What Our Guests Say</h2>
          <p className="section-subtitle">Read about the unforgettable experiences our travelers have had.</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="card">
              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} size={16} className="fill-primary-600 text-primary-600" />
                ))}
              </div>

              {/* Quote */}
              <p className="mb-6 text-gray-600">&ldquo;{testimonial.text}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.country}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} size={20} className="fill-primary-600 text-primary-600" />
              ))}
            </div>
            <span className="font-semibold text-gray-900">4.9 out of 5</span>
          </div>
          <p className="text-gray-600">Based on 500+ verified reviews</p>
        </div>
      </div>
    </section>
  );
}
