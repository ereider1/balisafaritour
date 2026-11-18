import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/header";
import EditorialFooter from "@/components/editorial-footer";
import ReviewForm from "@/components/review-form";

export const metadata: Metadata = {
  title: "Leave a Review",
  description:
    "Tell us about your Bali Safari Tour experience. Share the moments, places and people that made your day on the road memorable.",
  alternates: { canonical: "/leave-a-review" },
};

const reasons = [
  ["Help future guests", "Your honest notes help other travelers choose the right kind of Bali day."],
  ["Keep the good stuff", "We read every review and use your ideas to make the next trip even more personal."],
  ["Share the feeling", "The best part of a tour is often the detail you remember after you get home."],
];

export default function LeaveAReviewPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbfaf6] text-[#20241f]">
      <section className="relative min-h-[58vh] overflow-hidden bg-[#263b27] text-white">
        <Header overlay />
        <Image
          src="/gallerypics/bali_vw_18.jpg"
          alt="Guests enjoying a classic Volkswagen tour in Bali"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,37,25,.94),rgba(21,37,25,.5)_62%,rgba(21,37,25,.18))]" />
        <div className="container-max container-padding relative z-10 flex min-h-[58vh] items-end pb-16 pt-44 lg:items-center lg:pb-0">
          <div className="max-w-4xl animate-rise">
            <p className="text-[10px] font-bold uppercase tracking-[.28em] text-white/65">A note from the road · Bali, Indonesia</p>
            <h1 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(3.7rem,8vw,7.6rem)] font-black uppercase leading-[.8] tracking-[-.055em]">
              Tell us about<br /><span className="script inline-block -rotate-2 text-[1.04em] text-[#b6cd72]">your Bali day</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-white/78 sm:text-lg">A few honest words about your time with us go a long way. Tell us what you loved, what surprised you and the moment you&apos;ll still be talking about when you&apos;re home.</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 z-10 flex w-full justify-end px-5 pb-5 text-[10px] uppercase tracking-[.2em] text-white/60 sm:px-12">Real guests · Real stories · Always appreciated</div>
      </section>

      <section id="review-form" className="scroll-mt-24 py-20 lg:py-32">
        <div className="container-max container-padding grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-start lg:gap-20">
          <aside className="lg:sticky lg:top-24">
            <p className="eyebrow">Guest book</p>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-5xl font-black uppercase leading-[.88] tracking-tight sm:text-6xl">Leave a little<br /><span className="script text-[#79924f]">Bali behind</span></h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-black/58">This should take about five minutes. We&apos;ll send your review straight to Bobby and the team through WhatsApp so it lands with the people who made your day.</p>
            <div className="mt-10 border-l-2 border-[#b6cd72] pl-5">
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#425f32]">A small promise</p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-black/55">We&apos;ll only share your words publicly if you say it&apos;s okay.</p>
            </div>
          </aside>
          <ReviewForm />
        </div>
      </section>

      <section id="why-review" className="scroll-mt-24 bg-[#f0eee5] py-20 lg:py-28">
        <div className="container-max container-padding">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
            <div>
              <p className="script text-4xl text-[#718b4c]">The little things matter</p>
              <h2 className="mt-1 max-w-xl font-[family-name:var(--font-display)] text-5xl font-black uppercase leading-[.9] tracking-tight sm:text-6xl">Your story helps shape the next one</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-black/58 lg:justify-self-end">You don&apos;t need to write a perfect travel essay. A sentence, a favorite stop, the name of your guide, or a photo-worthy moment is more than enough.</p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden bg-black/10 md:grid-cols-3">
            {reasons.map(([title, copy], index) => (
              <article key={title} className="bg-[#f0eee5] p-7 sm:p-9">
                <span className="font-[family-name:var(--font-display)] text-4xl font-black text-[#79924f]">0{index + 1}</span>
                <h3 className="mt-6 font-[family-name:var(--font-display)] text-2xl font-black uppercase leading-none">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-black/55">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <EditorialFooter current="main" />
    </main>
  );
}
