import { FaWhatsapp } from "react-icons/fa";
import TrackedWhatsAppLink from "@/components/tracked-whatsapp-link";

export default function FloatingWhatsApp() {
  return (
    <TrackedWhatsAppLink
      href="https://wa.link/v1x5pl"
      source="floating"
      target="_blank"
      aria-label="Chat with us on WhatsApp"
      style={{ bottom: "calc(env(safe-area-inset-bottom) + 1.25rem)" }}
      className="fixed right-5 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#20bd5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] focus-visible:ring-4 focus-visible:ring-white"
    >
      <FaWhatsapp aria-hidden="true" className="size-9" />
    </TrackedWhatsAppLink>
  );
}
