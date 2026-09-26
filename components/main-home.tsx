import Image from "next/image";
import Header from "@/components/header";
import FullDayTours from "@/components/full-day-tours";
import GuestShowcase from "@/components/guest-showcase";
import TestimonialCarousel from "@/components/testimonial-carousel";
import { listPublishedReviews, type PublishedReview } from "@/lib/reviews";

const featuredReviews: PublishedReview[] = [
  { id: "sarah-j", q: "The most memorable day of our Bali trip. Bobby took us down roads we never would have found, and the car made everyone smile.", n: "Sarah J.", c: "United States", f: "/flags/US.svg", rating: 5, createdAt: "2026-01-01" },
  { id: "emma-w", q: "It felt personal from the first message. No rushing, no hard sell—just a beautiful day through villages, rice fields and temples.", n: "Emma W.", c: "Australia", f: "/flags/AU.svg", rating: 5, createdAt: "2026-01-01" },
];

export default async function MainHome() {
  const submittedReviews = await listPublishedReviews();
  const reviews = [...featuredReviews, ...submittedReviews];

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbfaf6]">
      <div className="relative min-h-[92vh] bg-[#263b27] text-white">
        <Header overlay />
        <div className="absolute inset-0">
          <Image
            src="/hero-1.jpg"
            alt="Classic Volkswagen safari through Bali"
            fill
            priority
            className="object-cover"
          />
          <video
            className="absolute inset-0 h-full w-full object-cover"
            poster="/hero-1.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            aria-hidden="true"
          >
            <source src="/bobby-vw-hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,37,25,.9),rgba(21,37,25,.28)_68%,rgba(21,37,25,.1))]" />
        <div className="container-max container-padding relative z-10 flex min-h-[92vh] items-end pb-24 pt-44 lg:items-center lg:pb-0">
          <div className="max-w-3xl animate-rise">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[.28em] text-white/75">Bali, Indonesia · Private guided tours</p>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(3.7rem,8vw,7.3rem)] font-black uppercase leading-[.79] tracking-[-.055em]">
              See Bali<br /><span className="script inline-block -rotate-2 text-[1.05em] leading-[.85] text-[#b6cd72]">with the top down</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-white/80 sm:text-lg">Leave the tour-bus route behind. Ride through rice fields, temple villages and mountain roads in an original open-top Volkswagen with a local driver-guide.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#tours" className="btn-primary bg-[#718b4c]">Explore the routes <span aria-hidden>↘</span></a>
              <a href="#vwadventure" className="btn-outline">Feeling Adventurous?</a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 z-10 flex w-full justify-end px-5 pb-5 text-[10px] uppercase tracking-[.2em] text-white/60 sm:px-12">Private · Flexible · Island-wide</div>
      </div>

      <FullDayTours />




      <section id="vwadventure" className="relative min-h-[400px] overflow-hidden bg-[#fcfcfc] text-white">
        
        <div className="container-max container-padding relative z-10 flex min-h-[400px] items-center py-28">
          <div className="max-w-3xl">
            <p className="script text-4xl text-[#b6cd72]">Want a full-on Bali Adventure?</p>
            <h2 className="mt-1 font-[family-name:var(--font-display)] text-gray-600 text-5xl font-black uppercase leading-[.9] tracking-tight sm:text-7xl">Rafting. ATV. Zipline. Paragliding. Jet Ski. Buggy... We got you!</h2>
            <p className="mt-7 max-w-xl text-base leading-7 text-gray-500">Contact us for adventure tour availability. We will get you the best price- and we will get you there in style.</p>
            <div className="mt-4">
<a href="https://wa.me/6281237812783?text=Hi%20Bobby%2C%20I%27d%20like%20to%20plan%20a%20adventure%20VW%20tour%20in%20Bali." className="btn-primary bg-[#79924f] px-8 py-4">Plan on WhatsApp <span aria-hidden>↗</span></a>
</div>
          </div>
        </div>
      </section>




      <section id="why-us" className="paper-edge relative min-h-[660px] overflow-hidden bg-[#425f32] text-white">
        <Image src="/gallerypics/bali_vw_16.jpg" alt="Bali countryside seen from a classic VW" fill className="object-cover object-center opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(37,59,39,.95),rgba(37,59,39,.62)_60%,rgba(37,59,39,.18))]" />
        <div className="container-max container-padding relative z-10 flex min-h-[660px] items-center py-28">
          <div className="max-w-3xl">
            <p className="script text-4xl text-[#b6cd72]">Not just a sightseeing tour</p>
            <h2 className="mt-1 font-[family-name:var(--font-display)] text-5xl font-black uppercase leading-[.9] tracking-tight sm:text-7xl">Meet the Bali<br />behind the postcard</h2>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/75">Our driver-guides grew up on these roads. They know when the light hits the terraces, which family warung makes the best lunch, and where the quiet road turns into the best part of your day.</p>
            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-4">
              {[['Private','Just your group'],['Flexible','Change as you go'],['Local','Bali-born guides'],['Original','Classic VW fleet']].map(([big, small]) => <div key={big}><b className="block font-[family-name:var(--font-display)] text-2xl uppercase">{big}</b><span className="text-xs text-white/55">{small}</span></div>)}
            </div>
          </div>
        </div>
      </section>






      <GuestShowcase />

      <section id="reviews" className="relative overflow-hidden bg-[#f0eee5] py-24">
        <div className="container-max container-padding">
          <div className="text-center"><p className="script text-4xl">Stories brought home</p><h2 className="font-[family-name:var(--font-display)] text-4xl font-black uppercase tracking-tight">From our guests</h2></div>
          <TestimonialCarousel reviews={reviews} />
        </div>
      </section>

      <section id="contact" className="paper-edge relative overflow-hidden bg-[#263b27] py-28 text-white">
        <Image src="/tourpics/jatiluwih3.jpg" alt="Jatiluwih rice terraces" fill className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-[#263b27]/75" />
        <div className="container-max container-padding relative z-10 grid gap-10 lg:grid-cols-[1.35fr_.65fr] lg:items-end">
          <div>
            <p className="script text-4xl text-[#b6cd72]">Your Bali story starts here</p>
            <h2 className="mt-2 max-w-4xl font-[family-name:var(--font-display)] text-5xl font-black uppercase leading-[.9] tracking-tight sm:text-7xl">Tell us what kind<br />of day you want</h2>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/65">Send Bobby your dates, hotel area and the places you are curious about. We’ll shape a private route and reply with a clear plan.</p>
          </div>
          <div className="lg:text-right">
            <a href="https://wa.me/6281237812783?text=Hi%20Bobby%2C%20I%27d%20like%20to%20plan%20a%20private%20VW%20tour%20in%20Bali." className="btn-primary bg-[#79924f] px-8 py-4">Plan on WhatsApp <span aria-hidden>↗</span></a>
            <p className="mt-5 text-xs leading-5 text-white/50">Usually replies within a few hours<br />+62 812 3781 2783</p>
          </div>
        </div>
      </section>

      <footer className="bg-[#1d211e] py-14 text-white">
        <div className="container-max container-padding">
          <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.2fr_.8fr_.8fr]">
            <div className="max-w-sm"><h3 className="font-[family-name:var(--font-display)] text-2xl font-bold uppercase">Bali Safari Tour</h3><p className="mt-3 text-sm leading-6 text-white/45">Private classic Volkswagen adventures, guided by locals and made one day at a time.</p></div>
            <div><h4 className="text-[10px] font-bold uppercase tracking-[.2em] text-white/50">Explore</h4><nav className="mt-4 grid gap-2 text-sm text-white/70"><a href="#tours">Tours</a><a href="#why-us">Our story</a><a href="#gallery">Moments</a><a href="#reviews">Guest stories</a><a href="/leave-a-review">Leave a review</a></nav></div>
            <div><h4 className="text-[10px] font-bold uppercase tracking-[.2em] text-white/50">Our Bali network</h4><nav className="mt-4 grid gap-2 text-sm text-white/70"><a href="https://balivw.tours">balivw.tours</a><a href="https://gobali.tours">gobali.tours</a><a href="https://balisafari.tours">balisafari.tours</a></nav></div>
          </div>
          <div className="flex flex-col gap-2 pt-7 text-[10px] uppercase tracking-[.16em] text-white/35 sm:flex-row sm:justify-between"><p>© 2026 Bali Safari Tour</p><p>Bali, Indonesia · Open every day</p></div>
        </div>
      </footer>
    </main>
  );
}
