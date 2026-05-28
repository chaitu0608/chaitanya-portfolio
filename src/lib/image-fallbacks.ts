/** Derive up to two uppercase initials from a name or label. */
export function getInitials(label: string): string {
  return label
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

/** First character for company badges (handles emoji logos). */
export function getCompanyInitial(company: string, logo?: string): string {
  if (logo && !logo.startsWith("/") && !logo.startsWith("http")) {
    return logo;
  }
  return getInitials(company) || company.charAt(0).toUpperCase();
}
