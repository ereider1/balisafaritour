"use client";

export function trackWhatsAppClick(source: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  const gadsId = process.env.NEXT_PUBLIC_GADS_ID;
  const conversionLabel = process.env.NEXT_PUBLIC_GADS_WHATSAPP_LABEL;

  if (gadsId && conversionLabel) {
    try {
      window.gtag("event", "conversion", {
        send_to: `${gadsId}/${conversionLabel}`,
      });
    } catch {
      // Tracking must never interfere with opening WhatsApp.
    }
  }

  try {
    window.gtag("event", "whatsapp_click", { source });
  } catch {
    // Tracking must never interfere with opening WhatsApp.
  }
}
