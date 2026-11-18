import { headers } from "next/headers";
import { SITES, siteForHost } from "@/lib/domains";
import TrackedWhatsAppLink from "@/components/tracked-whatsapp-link";

export default async function Footer() {
  const headersList = await headers();
  const currentSite = siteForHost(headersList.get("host"));
  const otherSites = Object.values(SITES).filter((s) => s.key !== currentSite.key);

  return (
    <footer className="bg-gray-900 text-white py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Bali Safari Tour</h3>
            <p className="text-gray-400">
              Premium Volkswagen tour experiences in beautiful Bali.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Tours</a></li>
              <li><a href="#" className="hover:text-white">Gallery</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4 text-gray-400">
              <a href="#" className="hover:text-white">Facebook</a>
              <a href="#" className="hover:text-white">Instagram</a>
              <TrackedWhatsAppLink href="https://wa.link/v1x5pl" source="footer_link" className="hover:text-white">WhatsApp</TrackedWhatsAppLink>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Bali Safari Tour. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Explore more —{" "}
            {otherSites.map((s, i) => (
              <span key={s.key}>
                <a href={s.path} className="hover:text-white">
                  {s.label}
                </a>
                {i < otherSites.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
