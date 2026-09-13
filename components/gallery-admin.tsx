"use client";

import { useEffect, useState } from "react";
import type { GalleryPhoto } from "@/lib/gallery";

export default function GalleryAdmin() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [dragCounter, setDragCounter] = useState(0);
  const isDraggingFile = dragCounter > 0;

  useEffect(() => {
    fetch("/api/admin/gallery")
      .then((response) => response.json())
      .then((data: { photos?: GalleryPhoto[] }) => setPhotos(data.photos ?? []));
  }, []);

  async function handleSaveOrder() {
    setMessage("Saving photo order...");
    const response = await fetch("/api/admin/gallery", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "reorder", photos }),
    });
    if (response.ok) {
      setHasUnsavedChanges(false);
      setMessage("Photo order saved successfully!");
    } else {
      setMessage("Could not save changes to the photo order.");
    }
  }

  function movePhoto(targetId: string) {
    if (!draggedId || draggedId === targetId) return;
    const from = photos.findIndex((photo) => photo.id === draggedId);
    const to = photos.findIndex((photo) => photo.id === targetId);
    const next = [...photos];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setPhotos(next);
    setHasUnsavedChanges(true);
    setMessage("Changes made to order. Click 'Save Order' in the header to publish changes!");
    setDraggedId(null);
  }

  function shiftPhoto(index: number, direction: "earlier" | "later") {
    const nextIndex = direction === "earlier" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= photos.length) return;
    const next = [...photos];
    const [moved] = next.splice(index, 1);
    next.splice(nextIndex, 0, moved);
    setPhotos(next);
    setHasUnsavedChanges(true);
    setMessage("Changes made to order. Click 'Save Order' in the header to publish changes!");
  }

  async function uploadFiles(files: File[]) {
    setMessage(`Uploading ${files.length} photo(s)...`);
    let successCount = 0;

    for (const file of files) {
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        setMessage(`Skipped "${file.name}": Only JPG, PNG, and WebP are allowed.`);
        continue;
      }
      if (file.size > 8 * 1024 * 1024) {
        setMessage(`Skipped "${file.name}": File size exceeds 8 MB.`);
        continue;
      }

      const formData = new FormData();
      formData.set("file", file);

      try {
        const response = await fetch("/api/admin/gallery/upload", { method: "POST", body: formData });
        const data = (await response.json()) as { photo?: GalleryPhoto; error?: string };
        if (response.ok && data.photo) {
          setPhotos((current) => [...current, data.photo as GalleryPhoto]);
          successCount++;
          setMessage(`Uploaded ${successCount}/${files.length} photo(s)`);
        } else {
          setMessage(data.error ?? `Upload failed for ${file.name}`);
        }
      } catch {
        setMessage(`Upload failed for ${file.name}`);
      }
    }

    if (successCount === files.length) {
      setMessage(`Successfully uploaded ${successCount} photo(s)`);
    }
  }

  async function upload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    await uploadFiles(Array.from(files));
    event.target.value = "";
  }

  function handleDragEnter(event: React.DragEvent) {
    event.preventDefault();
    if (draggedId) return;
    if (event.dataTransfer.types.includes("Files")) {
      setDragCounter((prev) => prev + 1);
    }
  }

  function handleDragOver(event: React.DragEvent) {
    event.preventDefault();
  }

  function handleDragLeave(event: React.DragEvent) {
    event.preventDefault();
    if (draggedId) return;
    if (event.dataTransfer.types.includes("Files")) {
      setDragCounter((prev) => Math.max(0, prev - 1));
    }
  }

  async function handleDrop(event: React.DragEvent) {
    event.preventDefault();
    setDragCounter(0);

    if (draggedId) return;

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const filesArray = Array.from(event.dataTransfer.files);
      await uploadFiles(filesArray);
    }
  }

  async function toggle(photo: GalleryPhoto) {
    const response = await fetch("/api/admin/gallery", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: photo.id, isPublished: !photo.isPublished }),
    });
    if (response.ok) {
      setPhotos((current) =>
        current.map((item) => (item.id === photo.id ? { ...item, isPublished: !item.isPublished } : item))
      );
      setMessage("Visibility updated");
    }
  }

  async function remove(photo: GalleryPhoto) {
    if (!window.confirm("Remove this photo from the gallery?")) return;
    const response = await fetch("/api/admin/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: photo.id }),
    });
    if (response.ok) {
      setPhotos((current) => current.filter((item) => item.id !== photo.id));
      setMessage("Photo removed");
    } else {
      setMessage("Could not remove photo");
    }
  }

  return (
    <main
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="min-h-screen bg-[#fbfaf6] px-5 py-10 text-[#20241f] sm:px-10"
    >
      {isDraggingFile && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#263b27]/90 text-white backdrop-blur-xs">
          <div className="pointer-events-none rounded-2xl border-4 border-dashed border-white/50 p-12 text-center">
            <span className="text-6xl">＋</span>
            <p className="mt-4 text-lg font-bold uppercase tracking-wider">Drop your photos here to upload</p>
            <p className="mt-2 text-sm text-white/60">Supports JPG, PNG, WebP up to 8MB each</p>
          </div>
        </div>
      )}
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-black/10 pb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#79924f]">Content studio</p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl font-black uppercase leading-none">
              Guest gallery
            </h1>
            <p className="mt-3 text-sm text-black/55">
              Drag photos or use the arrows to change their order on the live page.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {hasUnsavedChanges && (
              <button
                type="button"
                onClick={handleSaveOrder}
                className="bg-[#b45309] px-5 py-3 text-xs font-bold uppercase tracking-[.15em] text-white hover:bg-[#92400e] transition-colors shadow-md animate-pulse"
              >
                Save Order
              </button>
            )}
            <label className="cursor-pointer bg-[#263b27] px-5 py-3 text-xs font-bold uppercase tracking-[.15em] text-white hover:bg-[#425f32]">
              Add photo
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={upload}
                multiple
              />
            </label>
          </div>
        </div>
        <p className="h-10 pt-4 text-sm font-semibold text-[#425f32]">{message}</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((photo, index) => (
            <article
              key={photo.id}
              draggable
              onDragStart={() => setDraggedId(photo.id)}
              onDragEnd={() => setDraggedId(null)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => movePhoto(photo.id)}
              className={`group bg-white p-2 shadow-sm ${photo.isPublished ? "" : "opacity-50"}`}
            >
              <div className="relative aspect-square overflow-hidden bg-[#263b27]">
                <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" />
                <span className="absolute left-2 top-2 bg-[#20241f]/75 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  {photo.isPublished ? "Live" : "Hidden"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 p-2">
                <span className="truncate text-xs text-black/55">{photo.id.slice(0, 8)}...</span>
                <div className="flex gap-2">
                  <button type="button" onClick={() => void toggle(photo)} className="text-xs font-bold text-[#425f32]">
                    {photo.isPublished ? "Hide" : "Show"}
                  </button>
                  <button type="button" onClick={() => void remove(photo)} className="text-xs font-bold text-red-700">
                    Delete
                  </button>
                </div>
              </div>
              {/* Touch-Friendly Position Control Panel */}
              <div className="flex items-center justify-between gap-2 p-2 pt-0 border-t border-black/5 mt-1">
                <span className="text-[9px] uppercase font-bold text-black/40">Reorder</span>
                <div className="flex gap-2.5">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => shiftPhoto(index, "earlier")}
                    aria-label="Move photo earlier"
                    className="text-xs font-black px-2 py-1 text-[#425f32] hover:bg-slate-100 rounded disabled:opacity-20 disabled:hover:bg-transparent"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    disabled={index === photos.length - 1}
                    onClick={() => shiftPhoto(index, "later")}
                    aria-label="Move photo later"
                    className="text-xs font-black px-2 py-1 text-[#425f32] hover:bg-slate-100 rounded disabled:opacity-20 disabled:hover:bg-transparent"
                  >
                    →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
