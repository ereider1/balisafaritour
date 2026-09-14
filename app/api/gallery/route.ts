import { listGalleryPhotos } from "@/lib/gallery";

export const dynamic = "force-dynamic";

export async function GET() {
  const photos = await listGalleryPhotos();
  return Response.json({ photos }, { headers: { "Cache-Control": "no-store" } });
}
