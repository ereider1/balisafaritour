"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import TrackedWhatsAppLink from "@/components/tracked-whatsapp-link";

interface HeaderProps {
  overlay?: boolean;
}

export default function Header({
  overlay = false,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigationItems = [
    { label: "Tours", href: "/tours" },
    { label: "Why Us?", href: "/#why-us" },
    // { label: "Map", href: "/map" },
    // { label: "Bali Guide", href: "/bali-guide" },
    { label: "Guest Photos", href: "/guest-photos" },
    { label: "Leave a Review", href: "/leave-a-review" },
  ];

  return (
    <header className={`${overlay ? "absolute text-white" : "sticky bg-[#fbfaf6] text-[#20241f] shadow-sm"} top-0 z-50 w-full`}>
      <div className={`${overlay ? "bg-[#263b27]/75" : "bg-[#263b27]"} hidden px-8 py-1.5 text-right text-[10px] uppercase tracking-[.18em] text-white/75 sm:block`}>
        Private tours across Bali &nbsp; · &nbsp; +62 812 3781 2783
      </div>
      <nav className="container-max container-padding py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/90 p-2">
              <Image
                src="/vw-logo-black.svg"
                alt="VW logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="hidden sm:block">
              <b className="block font-(family-name:--font-display) text-lg uppercase leading-none tracking-tight">Bali Safari Tour</b>
              <small className="text-[9px] uppercase tracking-[.26em] opacity-70">Classic VW adventures</small>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[11px] font-bold uppercase tracking-[.16em] transition-colors hover:text-[#b6cd72]"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            <TrackedWhatsAppLink href="https://wa.link/v1x5pl" source="header" className={`${overlay ? "border-white/60 text-white hover:bg-white hover:text-[#263b27]" : "border-[#425f32] text-[#425f32]"} hidden border px-5 py-2.5 text-[10px] font-bold uppercase tracking-[.18em] sm:inline-flex`}>
              BOOK via WhatsApp
            </TrackedWhatsAppLink>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className={`${overlay ? "border-white/30 bg-[#263b27]/95 text-white" : "border-black/10 bg-[#fbfaf6] text-[#20241f]"} mt-4 space-y-2 border-t p-4 md:hidden`}>
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-2 py-3 text-sm font-bold uppercase tracking-[.14em] transition-colors hover:text-[#b6cd72]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <TrackedWhatsAppLink
              href="https://wa.link/v1x5pl"
              source="header_mobile"
              className="btn-primary mt-4 block w-full text-center"
            >
              BOOK via WhatsApp
            </TrackedWhatsAppLink>
          </div>
        )}
      </nav>
    </header>
  );
}
