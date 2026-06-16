import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { scrollToSection } from "@/utils/animations";

const SECTION_IDS = ["about", "experience", "work", "skills", "contact"];

function findActiveIndex(): number {
  const fromTop = window.scrollY + window.innerHeight * 0.3;
  let active = 0;
  SECTION_IDS.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= fromTop) active = i;
  });
  return active;
}

function scrollToIndex(i: number) {
  const clamped = Math.max(0, Math.min(SECTION_IDS.length - 1, i));
  scrollToSection(`#${SECTION_IDS[clamped]}`);
}

export function useVimKeys() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let pendingG = false;

    const onKey = (e: KeyboardEvent) => {
      // Skip if typing in input/textarea/contenteditable
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      // Skip with modifiers
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === "/") {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("open-command-palette"));
      } else if (pendingG && ["w", "a", "e", "s", "c"].includes(e.key)) {
        e.preventDefault();
        pendingG = false;
        const map: Record<string, string> = {
          w: "work",
          a: "about",
          e: "experience",
          s: "skills",
          c: "contact",
        };
        const id = map[e.key];
        const idx = SECTION_IDS.findIndex((x) => x === id);
        if (idx >= 0) scrollToIndex(idx);
      } else if (e.key === "j") {
        e.preventDefault();
        scrollToIndex(findActiveIndex() + 1);
      } else if (e.key === "k") {
        e.preventDefault();
        scrollToIndex(findActiveIndex() - 1);
      } else if (e.key === "g") {
        pendingG = true;
        setTimeout(() => {
          if (pendingG) {
            scrollToIndex(0);
            pendingG = false;
          }
        }, 220);
      } else if (e.key === "G") {
        e.preventDefault();
        scrollToIndex(SECTION_IDS.length - 1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reduced]);
}
