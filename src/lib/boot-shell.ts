/** Hides the static HTML boot overlay once React loader is ready. */
export function hideBootShell(): void {
  document.getElementById("boot-shell")?.classList.add("boot-shell--hidden");
}

/** Removes the static HTML boot overlay after the loader completes. */
export function removeBootShell(): void {
  document.getElementById("boot-shell")?.remove();
  document.body.classList.remove("boot-loading");
}
