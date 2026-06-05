import { useEffect, useRef } from "react";

interface UseTypedSequenceOptions {
  /** Max ms between keystrokes before the buffer resets */
  gapMs?: number;
  enabled?: boolean;
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.isContentEditable
  );
}

/** Fires when the user types an exact character sequence anywhere on the page */
export function useTypedSequence(
  sequence: string,
  onMatch: () => void,
  { gapMs = 2500, enabled = true }: UseTypedSequenceOptions = {},
) {
  const onMatchRef = useRef(onMatch);
  onMatchRef.current = onMatch;

  useEffect(() => {
    if (!enabled || sequence.length === 0) return;

    let buffer = "";
    let gapTimer: ReturnType<typeof setTimeout> | undefined;

    const reset = () => {
      buffer = "";
      if (gapTimer) clearTimeout(gapTimer);
      gapTimer = undefined;
    };

    const onKey = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.length !== 1) return;

      buffer = (buffer + e.key.toLowerCase()).slice(-sequence.length);

      if (gapTimer) clearTimeout(gapTimer);
      gapTimer = setTimeout(reset, gapMs);

      if (buffer === sequence) {
        onMatchRef.current();
        reset();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (gapTimer) clearTimeout(gapTimer);
    };
  }, [sequence, gapMs, enabled]);
}
