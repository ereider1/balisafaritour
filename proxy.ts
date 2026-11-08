import { NextRequest, NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";
import { SITES, siteForHost } from "@/lib/domains";

const proxyHandler = clerkMiddleware((_auth, request: NextRequest) => {
  const hostname = request.headers.get("host")?.split(":")[0].toLowerCase();
  if (hostname === "balisafari.tours" || hostname === "www.balisafari.tours") {
    return NextResponse.redirect(SITES.main.url, 308);
  }

  if (request.nextUrl.pathname !== "/") return NextResponse.next();

  const site = siteForHost(request.headers.get("host"));
  if (site.key === "main") return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = site.path;
  return NextResponse.rewrite(url);
});

export { proxyHandler as proxy };
export default proxyHandler;

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:jpg|jpeg|png|svg|webp|avif|mp4|m4v|ico|webmanifest|txt|xml)$).*)",
  ],
};
