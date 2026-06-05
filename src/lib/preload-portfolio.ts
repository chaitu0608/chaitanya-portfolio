/** Eager-load lazy route chunks while the boot terminal runs. */
export function preloadPortfolio(): Promise<void> {
  return Promise.all([
    import("@/components/log/LogShell"),
    import("@/components/ContactModal"),
    import("@/components/CommandPalette"),
    import("@/pages/Index"),
  ]).then(() => undefined);
}
