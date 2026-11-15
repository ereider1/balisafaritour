import type { Tour } from "@/lib/tours";
import { formatTourPrice } from "@/lib/tours";

export const WHATSAPP_NUMBER = "6281237812783";

export function getTourWhatsAppHref(tour: Tour) {
  const message = `Hi Bobby, I'm interested in the ${tour.name} at ${formatTourPrice(tour)}. Could you help me plan it?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
