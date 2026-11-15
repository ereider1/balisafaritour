"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackWhatsAppClick } from "@/lib/whatsapp-tracking";

type TrackedWhatsAppLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick"
> & {
  href: string;
  source: string;
  children: ReactNode;
};

export default function TrackedWhatsAppLink({
  href,
  source,
  children,
  rel = "noopener noreferrer",
  ...props
}: TrackedWhatsAppLinkProps) {
  return (
    <a
      href={href}
      rel={rel}
      onClick={() => trackWhatsAppClick(source)}
      {...props}
    >
      {children}
    </a>
  );
}
