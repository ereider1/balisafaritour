"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAdsTracking() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const campaignParams: Record<string, string> = {};

    params.forEach((value, key) => {
      if (key === "gclid" || key.startsWith("utm_")) {
        campaignParams[key] = value;
      }
    });

    if (Object.keys(campaignParams).length === 0) return;

    try {
      const previous = window.sessionStorage.getItem("bali-safari-campaign-params");
      const savedParams = previous ? JSON.parse(previous) as Record<string, string> : {};
      window.sessionStorage.setItem(
        "bali-safari-campaign-params",
        JSON.stringify({ ...savedParams, ...campaignParams }),
      );
    } catch {
      // Campaign storage is optional and must not interrupt page navigation.
    }
  }, []);

  return null;
}
