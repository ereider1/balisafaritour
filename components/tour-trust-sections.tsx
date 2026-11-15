import { getAnsweredFAQs, HOW_IT_WORKS_STEPS, INCLUDED_ITEMS, TOUR_FAQS } from "@/lib/tour-trust-content";

export function WhatsIncluded({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "" : "bg-white py-14 sm:py-20"}>
      <div className={compact ? "" : "container-max container-padding"}>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-black uppercase tracking-tight sm:text-3xl">
          What&apos;s included
        </h2>
        <ul className="mt-5 grid gap-3 text-sm leading-6 text-black/65 sm:grid-cols-2">
          {INCLUDED_ITEMS.map(({ item, included }) => (
            <li key={item} className="flex items-start gap-3">
              <span className={included ? "text-[#718b4c]" : "text-black/40"} aria-hidden="true">
                {included ? "✓" : "–"}
              </span>
              <span>
                {item} <span className="text-black/45">({included ? "included" : "not included"})</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section className="bg-[#263b27] py-14 text-white sm:py-20">
      <div className="container-max container-padding">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-black uppercase tracking-tight sm:text-4xl">
          How it works
        </h2>
        <ol className="mt-7 grid gap-6 sm:grid-cols-3">
          {HOW_IT_WORKS_STEPS.map(([title, description], index) => (
            <li key={title} className="border-t border-white/20 pt-5">
              <span className="text-xs font-bold tracking-[.16em] text-[#b6cd72]">
                0{index + 1}
              </span>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-black uppercase">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/65">{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function TourFaq({ compact = false }: { compact?: boolean }) {
  const answeredFAQs = getAnsweredFAQs();

  return (
    <section className={compact ? "" : "bg-[#f4f3ee] py-14 sm:py-20"}>
      <div className={compact ? "" : "container-max container-padding"}>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-black uppercase tracking-tight sm:text-3xl">
          Frequently asked questions
        </h2>
        <div className="mt-5 divide-y divide-black/10 border-y border-black/10">
          {TOUR_FAQS.map((faq) => (
            <details key={faq.question} className="group py-4">
              <summary className="cursor-pointer list-none pr-8 font-semibold marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#425f32]">
                {faq.question}
                <span className="float-right text-[#718b4c]" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-black/60">{faq.answer}</p>
            </details>
          ))}
        </div>
        {answeredFAQs.length > 0 ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: answeredFAQs.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
                  },
                })),
              }).replace(/</g, "\\u003c"),
            }}
          />
        ) : null}
      </div>
    </section>
  );
}
