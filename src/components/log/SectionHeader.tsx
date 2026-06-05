import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  index: string;
  path: string;
  title?: string;
  isLast?: boolean;
  size?: "default" | "large";
  pathOnly?: boolean;
}

export function SectionHeader({
  index,
  path,
  title = "",
  isLast = false,
  size = "default",
  pathOnly = false,
}: SectionHeaderProps) {
  const branch = isLast ? "└──" : "├──";
  const large = size === "large";

  const showTitle = !pathOnly && Boolean(title);

  return (
    <header
      className={cn(
        pathOnly ? "mb-6" : large ? "mb-12 md:mb-16" : "mb-10 md:mb-14",
      )}
    >
      <p
        className={cn(
          "font-mono text-zinc-500",
          large ? "text-sm" : "text-xs",
        )}
      >
        {branch} {index}
      </p>
      <p
        className={cn(
          "mt-0.5 font-mono text-zinc-600",
          large ? "text-sm" : "text-xs",
        )}
      >
        │ {path}
      </p>
      {showTitle ? (
        <h2
          className={cn(
            "mt-3 font-mono font-semibold text-zinc-100",
            large
              ? "text-3xl sm:text-4xl lg:text-5xl"
              : "mt-2 text-2xl sm:text-3xl",
          )}
        >
          {title}
        </h2>
      ) : null}
    </header>
  );
}
