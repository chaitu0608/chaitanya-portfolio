import { contactInfo } from "@/data/portfolio";
import { RESUME_PATH } from "@/data/links";
const SITE_ORIGIN = "https://www.cdhamdhere.xyz";

export const RESUME_DOWNLOAD_NAME = "Chaitanya_Dhamdhere_Resume.pdf";

/** Resume PDF path — opens inline in the browser */
export function getResumePath(): string {
  return contactInfo.resumeUrl ?? RESUME_PATH;
}

/** Absolute resume URL for copy/share */
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
