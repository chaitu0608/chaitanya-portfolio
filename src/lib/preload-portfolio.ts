/** Eager-load lazy route chunks while the boot terminal runs. */
export function preloadPortfolio(): Promise<void> {
  return Promise.all([
    import("@/components/About"),
    import("@/components/Projects"),
    import("@/components/Experience"),
    import("@/components/Skills"),
    import("@/components/Contact"),
    import("@/components/Footer"),
    import("@/components/ContactModal"),
    import("@/components/PhotoAlbum"),
    import("@/pages/Index"),
  ]).then(() => undefined);
}
