import { useEffect, useState } from "react";
import { useSectionSpy } from "./useSectionSpy";

const SECTIONS = [
  { id: "about", label: "about" },
  { id: "work", label: "work" },
  { id: "now", label: "now" },
  { id: "experience", label: "experience" },
  { id: "stack", label: "stack" },
  { id: "contact", label: "contact" },
] as const;

const SECTION_IDS = SECTIONS.map((s) => s.id);

function formatTime(d: Date): string {
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function StatusBar() {
  const active = useSectionSpy(SECTION_IDS);
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()));
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  const activeLabel =
    SECTIONS.find((s) => s.id === active)?.label ?? "home";

  return (
    <div
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 hidden border-t border-zinc-900 bg-[#0a0a0a]/95 backdrop-blur-sm md:flex"
      aria-hidden
    >
      <div className="mx-auto flex h-6 max-w-6xl items-center justify-between gap-4 px-4 font-mono text-[10px] text-zinc-500">
        <span className="shrink-0 rounded border border-emerald-500/30 bg-emerald-500/5 px-1.5 py-px-0.5 text-emerald-400">
          NORMAL
        </span>
        <span className="min-w-0 truncate">
          ~/portfolio/{activeLabel}
        </span>
        <span className="hidden shrink-0 sm:inline">main</span>
        <span className="hidden shrink-0 sm:inline">tsx</span>
        <span className="hidden shrink-0 sm:inline">utf-8</span>
        <span className="hidden shrink-0 sm:inline">LF</span>
        <span className="shrink-0 tabular-nums">{time}</span>
      </div>
    </div>
  );
}
