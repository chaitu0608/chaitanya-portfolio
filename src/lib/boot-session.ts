const BOOT_SEEN_KEY = "portfolio-boot-seen";

export function hasSeenBoot(): boolean {
  try {
    return sessionStorage.getItem(BOOT_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

export function markBootSeen(): void {
  try {
    sessionStorage.setItem(BOOT_SEEN_KEY, "1");
  } catch {
    /* private browsing */
  }
}
