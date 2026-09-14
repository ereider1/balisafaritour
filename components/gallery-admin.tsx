"use client";

import { useEffect, useState } from "react";
import type { GalleryPhoto } from "@/lib/gallery";

function compressImage(
  file: File,
  maxWidth = 1920,
  maxHeight = 1920,
  quality = 0.85
): Promise<File> {
  return new Promise((resolve) => {
    if (!file.type.startsWith("image/")) {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file);
              return;
            }
            const name = file.name.replace(/\.[^/.]+$/, "") + ".jpg";
            const compressedFile = new File([blob], name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = () => resolve(file);
      img.src = event.target?.result as string;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}

export default function GalleryAdmin() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [dragCounter, setDragCounter] = useState(0);
  const isDraggingFile = dragCounter > 0;

  const [showVideoLimitModal, setShowVideoLimitModal] = useState(false);
  const [oversizedVideoName, setOversizedVideoName] = useState("");
  const [oversizedVideoSize, setOversizedVideoSize] = useState("");

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
    setMessage(`Preparing ${files.length} file(s)...`);
    let successCount = 0;

    for (const file of files) {
      let fileToUpload = file;

      if (file.type.startsWith("image/")) {
        try {
          setMessage(`Optimizing "${file.name}" for mobile upload...`);
          fileToUpload = await compressImage(file, 1920, 1920, 0.85);
          console.log(
            `[Gallery Admin] Original size: ${(file.size / 1024 / 1024).toFixed(2)}MB, Optimized size: ${(fileToUpload.size / 1024 / 1024).toFixed(2)}MB`
          );
        } catch (error) {
          console.warn(
            "[Gallery Admin] Client-side compression failed, using original file:",
            error
          );
        }
      }

      const isAcceptedImage = ["image/jpeg", "image/png", "image/webp"].includes(fileToUpload.type);
      const isAcceptedVideo = ["video/mp4", "video/quicktime", "video/webm"].includes(
        fileToUpload.type
      );

      if (!isAcceptedImage && !isAcceptedVideo) {
        setMessage(
          `Skipped "${fileToUpload.name}": Only JPG, PNG, WebP, MP4, MOV, and WebM are allowed.`
        );
        continue;
      }
      if (fileToUpload.size > 15 * 1024 * 1024) {
        if (fileToUpload.type.startsWith("video/")) {
          setOversizedVideoName(fileToUpload.name);
          setOversizedVideoSize((fileToUpload.size / 1024 / 1024).toFixed(1) + " MB");
          setShowVideoLimitModal(true);
        }
        setMessage(`Skipped "${fileToUpload.name}": File size exceeds 15 MB.`);
        continue;
      }

      const formData = new FormData();
      formData.set("file", fileToUpload);

      try {
        setMessage(`Uploading "${fileToUpload.name}"...`);
        const response = await fetch("/api/admin/gallery/upload", {
          method: "POST",
          body: formData,
        });
        const data = (await response.json()) as { photo?: GalleryPhoto; error?: string };
        if (response.ok && data.photo) {
          setPhotos((current) => [...current, data.photo as GalleryPhoto]);
          successCount++;
          setMessage(`Uploaded ${successCount}/${files.length} file(s)`);
        } else {
          setMessage(data.error ?? `Upload failed for ${file.name}`);
        }
      } catch {
        setMessage(`Upload failed for ${file.name}`);
      }
    }

    if (successCount === files.length) {
      setMessage(`Successfully uploaded ${successCount} file(s)`);
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
        current.map((item) =>
          item.id === photo.id ? { ...item, isPublished: !item.isPublished } : item
        )
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
            <p className="mt-4 text-lg font-bold uppercase tracking-wider">
              Drop your media here to upload
            </p>
            <p className="mt-2 text-sm text-white/60">
              Supports JPG, PNG, WebP, MP4, MOV, WebM up to 15MB each
            </p>
          </div>
        </div>
      )}
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-black/10 pb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#79924f]">
              Content studio
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl font-black uppercase leading-none">
              Guest gallery
            </h1>
            <p className="mt-3 text-sm text-black/55">
              Drag photos/videos or use the arrows to change their order on the live page.
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
              Add photo / video
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm"
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
                {photo.type === "video" ? (
                  <video
                    src={photo.src}
                    className="h-full w-full object-cover"
                    muted
                    playsInline
                    autoPlay
                    loop
                  />
                ) : (
                  <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" />
                )}
                <span className="absolute left-2 top-2 bg-[#20241f]/75 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white animate-fade-in">
                  {photo.isPublished ? "Live" : "Hidden"}
                </span>
                {photo.type === "video" && (
                  <span
                    className="absolute right-2 top-2 bg-black/60 rounded-full p-1 text-white text-[10px] uppercase font-bold tracking-wider px-2"
                    aria-hidden
                  >
                    ▶ Video
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between gap-2 p-2">
                <span className="truncate text-xs text-black/55">{photo.id.slice(0, 8)}...</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => void toggle(photo)}
                    className="text-xs font-bold text-[#425f32]"
                  >
                    {photo.isPublished ? "Hide" : "Show"}
                  </button>
                  <button
                    type="button"
                    onClick={() => void remove(photo)}
                    className="text-xs font-bold text-red-700"
                  >
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

      {showVideoLimitModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-xs animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Video too large"
        >
          <div
            className="relative w-full max-w-lg bg-white p-6 shadow-2xl text-[#20241f] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowVideoLimitModal(false)}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center text-2xl text-black/40 hover:text-black cursor-pointer"
              aria-label="Close modal"
            >
              ×
            </button>
            <div className="mb-4">
              <span className="text-3xl" role="img" aria-label="Alert">
                ⚠️
              </span>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-black uppercase tracking-tight text-red-800">
                Video exceeds 15MB limit
              </h2>
              <p className="mt-1 text-xs text-black/45 truncate">
                File: {oversizedVideoName} ({oversizedVideoSize})
              </p>
            </div>

            <p className="text-sm leading-6 text-black/75">
              To keep uploads blazing fast and fit within secure host transfer limits, guest videos
              must be <strong>15 MB or less</strong>. High-quality mobile camera clips are usually
              larger, but you can compress or trim them in seconds!
            </p>

            <div className="mt-6 space-y-4 text-xs">
              <div className="border-l-2 border-[#79924f] pl-3">
                <b className="block text-xs uppercase tracking-wide text-[#425f32]">
                  📱 On iPhone / iOS
                </b>
                <p className="mt-1 leading-relaxed text-black/60">
                  Open your <strong>Photos App</strong>, select the video, tap <strong>Edit</strong>{" "}
                  in the top right, and drag the yellow slider anchors at the bottom to crop it to
                  the best 5-10 seconds of the drive. Click <strong>Done</strong> to save as a
                  fresh, lightweight clip!
                </p>
              </div>

              <div className="border-l-2 border-[#79924f] pl-3">
                <b className="block text-xs uppercase tracking-wide text-[#425f32]">
                  🤖 On Android
                </b>
                <p className="mt-1 leading-relaxed text-black/60">
                  Open <strong>Google Photos</strong>, select the video, tap <strong>Edit</strong>{" "}
                  at the bottom, and trim the start/end timelines to shorten it. Tap{" "}
                  <strong>Save copy</strong> to create an optimized, fast-uploading file.
                </p>
              </div>

              <div className="border-l-2 border-[#79924f] pl-3">
                <b className="block text-xs uppercase tracking-wide text-[#425f32]">
                  💻 On Desktop / Web
                </b>
                <p className="mt-1 leading-relaxed text-black/60">
                  Drop it into free online compressors like{" "}
                  <a
                    href="https://www.videocompressor.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#425f32] underline hover:text-[#79924f]"
                  >
                    VideoCompressor.com
                  </a>{" "}
                  or{" "}
                  <a
                    href="https://www.freeconvert.com/video-compressor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#425f32] underline hover:text-[#79924f]"
                  >
                    FreeConvert.com
                  </a>{" "}
                  to shrink it down in 5 seconds without losing detail!
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowVideoLimitModal(false)}
              className="mt-8 w-full bg-[#263b27] py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#425f32] transition rounded-sm cursor-pointer"
            >
              Got it, let me trim it!
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
