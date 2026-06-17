import { contactInfo } from "@/data/portfolio";

export const RESUME_VIEW_PATH = "/resume";
const DEFAULT_RESUME_DOWNLOAD = "/ChaitanyaResume.pdf";
const SITE_ORIGIN = "https://www.cdhamdhere.xyz";

export const RESUME_DOWNLOAD_NAME = "Chaitanya_Dhamdhere_Resume.pdf";

/** In-browser resume viewer route (cdhamdhere.xyz/resume) */
export function getResumePath(): string {
  return contactInfo.resumeUrl ?? RESUME_VIEW_PATH;
}

/** Direct PDF download path */
export function getResumeDownloadPath(): string {
  return contactInfo.resumeDownloadUrl ?? DEFAULT_RESUME_DOWNLOAD;
}

/** Absolute URL for copy/share (works when pasted into a browser) */
export function getResumeHref(): string {
  const path = getResumePath();
  if (typeof window !== "undefined" && window.location?.origin) {
    return new URL(path, window.location.origin).href;
  }
  return `${SITE_ORIGIN}${path}`;
}

/** Google Meet destination for cdhamdhere.xyz/meet */
export function getMeetUrl(): string {
  return contactInfo.meetUrl;
}

/** Google Drive / Docs embed URL for the resume viewer iframe */
export function getResumeEmbedUrl(): string {
  const driveUrl = contactInfo.resumeDriveUrl?.trim();
  if (driveUrl) {
    return toDrivePreviewUrl(driveUrl);
  }

  const pdfHref = getResumeDownloadHref();

  if (typeof window !== "undefined") {
    const { hostname } = window.location;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return pdfHref;
    }
  }

  const pdfUrl = encodeURIComponent(pdfHref);
  return `https://docs.google.com/viewer?url=${pdfUrl}&embedded=true`;
}

function getResumeDownloadHref(): string {
  const path = getResumeDownloadPath();
  if (typeof window !== "undefined" && window.location?.origin) {
    return new URL(path, window.location.origin).href;
  }
  return `${SITE_ORIGIN}${path}`;
}

function toDrivePreviewUrl(url: string): string {
  const fileId = url.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1];
  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  if (url.includes("/preview")) {
    return url;
  }
  return url;
}
