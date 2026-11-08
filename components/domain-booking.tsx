import Image from "next/image";
import ArrowIcon from "@/components/arrow-icon";

interface DomainBookingProps {
  script: string;
  title: string;
  description: string;
  image: string;
}

export default function DomainBooking({ script, title, description, image }: DomainBookingProps) {
  return (
    <section id="contact" className="paper-edge relative overflow-hidden bg-[#263b27] py-28 text-white">
      <Image src={image} alt="" fill className="object-cover opacity-20" />
      <div className="absolute inset-0 bg-[#263b27]/75" />
      <div className="container-max container-padding relative z-10 grid gap-10 lg:grid-cols-[1.35fr_.65fr] lg:items-end">
        <div><p className="script text-4xl text-[#b6cd72]">{script}</p><h2 className="mt-2 max-w-4xl font-[family-name:var(--font-display)] text-5xl font-black uppercase leading-[.9] tracking-tight sm:text-7xl">{title}</h2><p className="mt-7 max-w-xl text-base leading-7 text-white/65">{description}</p></div>
        <div className="lg:text-right">
          <a href="https://www.balisafari.tours" className="btn-primary bg-[#79924f] px-8 py-4">Plan Your Tour <ArrowIcon /></a>
          <a href="https://wa.me/6281237812783" className="btn-primary bg-[#79924f] px-8 py-4 mt-5">Contact via WhatsApp <ArrowIcon /></a>
        <p className="mt-2 text-xs leading-5 text-white/50">Usually replies within a few hours<br />+62 812 3781 2783</p>
        </div>
      
      </div>
    </section>
  );
}
