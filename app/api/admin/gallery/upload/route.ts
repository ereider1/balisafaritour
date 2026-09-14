import { NextResponse } from "next/server";
import { requireGalleryAdmin } from "@/lib/admin";
import { addUploadedPhoto } from "@/lib/gallery";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await requireGalleryAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const formData = await request.formData();
  const file = formData.get("file");
  if (
    !(file instanceof File) ||
    !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
    file.size > 8 * 1024 * 1024
  ) {
    return NextResponse.json(
      { error: "Use a JPG, PNG, or WebP image up to 8 MB." },
      { status: 400 }
    );
  }
  try {
    console.log(
      "[Gallery Upload API POST] File received:",
      file.name,
      "size:",
      file.size,
      "type:",
      file.type
    );
    const photo = await addUploadedPhoto(file);
    console.log("[Gallery Upload API POST] Upload successful. Photo created:", photo);
    return NextResponse.json({ photo }, { status: 201 });
  } catch (error) {
    console.error("[Gallery Upload API POST] Failed to upload photo:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to upload the photo." },
      { status: 500 }
    );
  }
}
