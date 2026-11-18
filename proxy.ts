import { NextRequest, NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";
import { SITES, siteForHost } from "@/lib/domains";

const proxyHandler = clerkMiddleware((_auth, request: NextRequest) => {
  const site = siteForHost(request.headers.get("host"));
  const isLegacyHost = site.key !== "main";
  const isWwwMainHost = request.nextUrl.hostname === "www.balisafaritour.com";
  if (!isLegacyHost && !isWwwMainHost) return NextResponse.next();

  const pathname =
    isLegacyHost && request.nextUrl.pathname === "/"
      ? site.path
      : request.nextUrl.pathname;
  const url = new URL(pathname, SITES.main.url);
  url.search = request.nextUrl.search;
  return NextResponse.redirect(url, 308);
});

export { proxyHandler as proxy };
export default proxyHandler;

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:jpg|jpeg|png|svg|webp|avif|mp4|m4v|ico|webmanifest|txt|xml)$).*)",
  ],
};
