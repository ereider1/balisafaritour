import Image from "next/image";
import Header from "@/components/header";

interface DomainHeroProps {
  brand: string;
  tagline: string;
  eyebrow: string;
  title: string;
  script: string;
  description: string;
  image: string;
  video?: string;
  navItems: { label: string; href: string }[];
  ctaLabel?: string;
  ctaHref?: string;
}

export default function DomainHero({
  brand,
  tagline,
  eyebrow,
  title,
  script,
  description,
  image,
  video,
  navItems,
  ctaLabel = "Start exploring",
  ctaHref = "#content",
}: DomainHeroProps) {
  return (
    <section className="relative min-h-[78vh] overflow-hidden bg-[#263b27] text-white">
      <Header overlay brand={brand} tagline={tagline} navItems={navItems} />
      {video ? <video className="absolute inset-0 h-full w-full object-cover" src={video} poster={image} autoPlay muted loop playsInline /> : <Image src={image} alt="" fill priority className="object-cover" />}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,37,25,.91),rgba(21,37,25,.35)_66%,rgba(21,37,25,.14))]" />
      <div className="container-max container-padding relative z-10 flex min-h-[78vh] items-end pb-20 pt-44 lg:items-center lg:pb-0">
        <div className="max-w-3xl animate-rise">
          <p className="text-[10px] font-bold uppercase tracking-[.28em] text-white/65">{eyebrow}</p>
          <h1 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(3.5rem,7.5vw,7rem)] font-black uppercase leading-[.82] tracking-[-.05em]">{title}<br /><span className="script -rotate-2 text-[1.04em] leading-[.82] text-[#b6cd72]">{script}</span></h1>
          <p className="mt-8 max-w-xl text-base leading-7 text-white/75 sm:text-lg">{description}</p>
          <a href={ctaHref} className="btn-primary mt-8 bg-[#79924f]">{ctaLabel} <span aria-hidden>↓</span></a>
        </div>
      </div>
    </section>
  );
}
