import { contactInfo } from "@/data/portfolio";

const DEFAULT_RESUME_PATH = "/ChaitanyaResume.pdf";
export const RESUME_DOWNLOAD_NAME = "Chaitanya_Dhamdhere_Resume.pdf";

/** Relative path for same-origin navigation */
export function getResumePath(): string {
  return contactInfo.resumeUrl ?? DEFAULT_RESUME_PATH;
}

/** Absolute URL for copy/share (works when pasted into a browser) */
export function getResumeHref(): string {
  const path = getResumePath();
  if (typeof window !== "undefined" && window.location?.origin) {
    return new URL(path, window.location.origin).href;
  }
  return `https://www.cdhamdhere.xyz${path}`;
}
