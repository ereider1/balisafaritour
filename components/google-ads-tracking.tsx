"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const CONVERSION_ID = "AW-18361331433/ZncMCMWZ-Y8dEOndrrNE";

export default function GoogleAdsTracking() {
  useEffect(() => {
    function handleWhatsAppClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>(
        'a[href*="wa.me"], a[href*="wa.link"]',
      );
      if (!link) return;

      window.gtag?.("event", "conversion", {
        send_to: CONVERSION_ID,
        value: 1.0,
        currency: "IDR",
      });
    }

    document.addEventListener("click", handleWhatsAppClick);
    return () => document.removeEventListener("click", handleWhatsAppClick);
  }, []);

  return null;
}
