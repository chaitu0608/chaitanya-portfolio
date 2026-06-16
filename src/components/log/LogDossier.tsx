import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Shared dossier typography (About / Experience / Projects):
 * - title: font-mono text-base sm:text-lg font-semibold text-zinc-100
 * - body:  font-mono text-sm leading-relaxed text-zinc-400
 * - meta:  font-mono text-xs text-zinc-500
 */

export function LogDossierShell({
  windowPath,
  children,
  className,
  overflow = "hidden",
}: {
  windowPath: string;
  children: ReactNode;
  className?: string;
  overflow?: "hidden" | "visible";
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "log-dossier rounded-lg border border-zinc-800 bg-zinc-950/60",
        overflow === "visible" ? "overflow-visible" : "overflow-hidden",
        className,
      )}
    >
      <LogDossierWindowChrome path={windowPath} />
      {children}
    </motion.div>
  );
}

export function LogDossierWindowChrome({ path }: { path: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-zinc-800 bg-zinc-900/50 px-4 py-2.5 sm:px-5">
      <div className="flex items-center gap-1.5" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/75" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/75" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/75" />
      </div>
      <span className="font-mono text-xs text-zinc-500 sm:text-sm">{path}</span>
    </div>
  );
}

export function LogPaneChrome({
  path,
  status,
  className,
}: {
  path: string;
  status?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-zinc-800 bg-zinc-900/40 px-4 py-2.5 sm:px-5",
        className,
      )}
    >
      <span className="font-mono text-xs text-zinc-500 sm:text-sm">{path}</span>
      {status ? (
        <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600">
          {status}
        </span>
      ) : null}
    </div>
  );
}

export function LogTag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border border-zinc-800 bg-zinc-900/50 px-2.5 py-1 font-mono text-xs text-zinc-400",
        className,
      )}
    >
      {children}
    </span>
  );
}
