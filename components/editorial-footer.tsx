import { SITES, type SiteKey } from "@/lib/domains";

export default function EditorialFooter({ current }: { current: SiteKey }) {
  return (
    <footer className="bg-[#1d211e] py-14 text-white">
      <div className="container-max container-padding">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.2fr_.8fr_.8fr]">
          <div className="max-w-sm"><h3 className="font-[family-name:var(--font-display)] text-2xl font-bold uppercase">Bali Safari Tour</h3><p className="mt-3 text-sm leading-6 text-white/45">Local knowledge, open roads and personal journeys across Bali.</p></div>
          <div><h4 className="text-[10px] font-bold uppercase tracking-[.2em] text-white/50">Plan your day</h4><nav className="mt-4 grid gap-2 text-sm text-white/70"><a href="#content">Explore</a><a href="#contact">Book a tour</a><a href="/leave-a-review">Leave a review</a><a href="tel:+6281237812783">Call Bobby</a></nav></div>
          <div><h4 className="text-[10px] font-bold uppercase tracking-[.2em] text-white/50">Explore Bali</h4><nav className="mt-4 grid gap-2 text-sm text-white/70">{Object.values(SITES).filter((item) => item.key !== current && item.key !== "main").map((item) => <a key={item.key} href={item.path}>{item.label}</a>)}</nav></div>
        </div>
        <div className="flex flex-col gap-2 pt-7 text-[10px] uppercase tracking-[.16em] text-white/35 sm:flex-row sm:justify-between"><p>© 2026 VW Tours Bali</p><p>Bali, Indonesia · Open every day</p></div>
      </div>
    </footer>
  );
}
