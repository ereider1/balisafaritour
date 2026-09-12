import { listGalleryPhotos } from "@/lib/gallery";

export async function GET() {
  const photos = await listGalleryPhotos();
  return Response.json({ photos }, { headers: { "Cache-Control": "no-store" } });
}
