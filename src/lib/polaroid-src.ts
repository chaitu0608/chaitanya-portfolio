/** Polaroid-friendly Cloudinary delivery — small, fast, no square-crop */
export function polaroidSrc(src: string): string {
  if (!src.includes("res.cloudinary.com") || src.startsWith("PASTE_")) {
    return src;
  }

  const isVideo = src.includes("/video/upload/");
  const width = isVideo ? 720 : 600;

  let url = src;

  if (url.includes("c_fill")) {
    url = url
      .replace(/c_fill,?/g, "c_limit,")
      .replace(/,g_auto/g, "")
      .replace(/g_auto,/g, "");
  }

  if (/w_\d+/.test(url)) {
    url = url.replace(/w_\d+/, `w_${width}`);
  } else if (url.includes("/upload/")) {
    url = url.replace("/upload/", `/upload/f_auto,q_auto,w_${width},c_limit/`);
  }

  return url;
}

/** Cached natural aspect ratios — instant reframe when revisiting */
const aspectCache = new Map<string, number>();

export function getCachedAspect(src: string): number | null {
  return aspectCache.get(polaroidSrc(src)) ?? null;
}

export function setCachedAspect(src: string, aspect: number): void {
  if (!Number.isFinite(aspect) || aspect <= 0) return;
  aspectCache.set(polaroidSrc(src), aspect);
}

/** Prefetch a single upcoming polaroid image (not video) */
export function prefetchPolaroidPhoto(src: string): void {
  if (!src.includes("res.cloudinary.com") || src.includes("/video/")) return;
  const img = new Image();
  img.decoding = "async";
  img.src = polaroidSrc(src);
}
