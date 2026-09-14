import { NextResponse } from "next/server";
import { requireGalleryAdmin } from "@/lib/admin";
import {
  listGalleryPhotos,
  removeGalleryPhoto,
  updateGalleryPhoto,
  updateGalleryPhotos,
  type GalleryPhoto,
} from "@/lib/gallery";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function authorized() {
  return requireGalleryAdmin();
}

export async function GET() {
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(
    { photos: await listGalleryPhotos(true) },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function PATCH(request: Request) {
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = (await request.json()) as {
      action?: string;
      id?: string;
      photos?: GalleryPhoto[];
      alt?: string;
      isPublished?: boolean;
    };
    console.log("[Gallery API PATCH] Request body action:", body.action, "id:", body.id);

    if (body.action === "reorder" && Array.isArray(body.photos)) {
      console.log("[Gallery API PATCH] Reordering photos. Total count:", body.photos.length);
      const updated = await updateGalleryPhotos(body.photos);
      return NextResponse.json({ photos: updated });
    }

    if (!body.id) {
      console.warn("[Gallery API PATCH] Photo ID is missing in PATCH request");
      return NextResponse.json({ error: "Photo id is required." }, { status: 400 });
    }

    console.log("[Gallery API PATCH] Updating photo metadata for ID:", body.id);
    const updated = await updateGalleryPhoto(body.id, {
      alt: body.alt,
      isPublished: body.isPublished,
    });
    return NextResponse.json({ photos: updated });
  } catch (error) {
    console.error("[Gallery API PATCH] Failed to update gallery:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update the gallery." },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = (await request.json()) as { id?: string };
    if (!id) return NextResponse.json({ error: "Photo id is required." }, { status: 400 });
    console.log("[Gallery API DELETE] Deleting photo ID:", id);
    await removeGalleryPhoto(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[Gallery API DELETE] Failed to remove photo:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to remove the photo." },
      { status: 400 }
    );
  }
}
