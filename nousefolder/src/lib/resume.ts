import { contactInfo } from "@/data/portfolio";

/** Absolute URL for resume PDF (works on localhost and production). */
export function getResumeHref(): string {
  const path = contactInfo.resumeUrl ?? "/ChaitanyaResume.pdf";
  if (path.startsWith("http")) {
    return path;
  }
  if (typeof window !== "undefined") {
    return `${window.location.origin}${path}`;
  }
  return path;
}
