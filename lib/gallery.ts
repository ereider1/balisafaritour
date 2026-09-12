import { del, get, put } from "@vercel/blob";

export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
  sortOrder: number;
  isPublished: boolean;
  blobPath?: string;
};

const MANIFEST_PATH = "gallery/gallery-manifest.json";
const PHOTO_PREFIX = "review-photos/";

const basePhotos: GalleryPhoto[] = Array.from({ length: 26 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    id: `bali-vw-${number}`,
    src: `/gallerypics/bali_vw_${number}.jpg`,
    alt: `Guests on a VW Bali safari tour 2026, photo ${number}`,
    sortOrder: index,
    isPublished: true,
  };
});

type StoredManifest = { photos: GalleryPhoto[] };

function hasBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readManifest(): Promise<GalleryPhoto[]> {
  if (!hasBlobStorage()) return basePhotos;

  try {
    const result = await get(MANIFEST_PATH, { access: "public", useCache: false });
    if (!result || result.statusCode !== 200) return basePhotos;
    const value = (await new Response(result.stream).json()) as StoredManifest;
    return Array.isArray(value.photos) ? value.photos : basePhotos;
  } catch {
    return basePhotos;
  }
}

async function writeManifest(photos: GalleryPhoto[]) {
  if (!hasBlobStorage()) throw new Error("Gallery storage is not configured.");

  await put(MANIFEST_PATH, JSON.stringify({ photos }), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

function sortPhotos(photos: GalleryPhoto[]) {
  return [...photos].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function listGalleryPhotos(includeUnpublished = false) {
  const photos = sortPhotos(await readManifest());
  return includeUnpublished ? photos : photos.filter((photo) => photo.isPublished);
}

export async function updateGalleryPhotos(photos: GalleryPhoto[]) {
  const normalized = photos.map((photo, index) => ({ ...photo, sortOrder: index }));
  await writeManifest(normalized);
  return sortPhotos(normalized);
}

export async function addUploadedPhoto(file: File) {
  const id = crypto.randomUUID();
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const blobPath = `${PHOTO_PREFIX}${Date.now()}-${id}.${extension}`;
  const blob = await put(blobPath, file, {
    access: "public",
    addRandomSuffix: false,
    contentType: file.type,
  });
  const photos = await listGalleryPhotos(true);
  const photo: GalleryPhoto = {
    id,
    src: blob.url,
    blobPath,
    alt: "Guest photo from a Bali Volkswagen tour",
    sortOrder: photos.length,
    isPublished: true,
  };
  await updateGalleryPhotos([...photos, photo]);
  return photo;
}

export async function removeGalleryPhoto(id: string) {
  const photos = await listGalleryPhotos(true);
  const photo = photos.find((item) => item.id === id);
  if (!photo) throw new Error("Photo not found.");

  if (photo.blobPath) await del(photo.blobPath);
  await updateGalleryPhotos(
    photos.map((item) => (item.id === id ? { ...item, isPublished: false } : item)),
  );
}

export async function updateGalleryPhoto(id: string, changes: Partial<Pick<GalleryPhoto, "alt" | "isPublished">>) {
  const photos = await listGalleryPhotos(true);
  if (!photos.some((photo) => photo.id === id)) throw new Error("Photo not found.");
  return updateGalleryPhotos(
    photos.map((photo) => {
      if (photo.id !== id) return photo;
      return {
        ...photo,
        ...(changes.alt !== undefined ? { alt: changes.alt } : {}),
        ...(changes.isPublished !== undefined ? { isPublished: changes.isPublished } : {}),
      };
    }),
  );
}
