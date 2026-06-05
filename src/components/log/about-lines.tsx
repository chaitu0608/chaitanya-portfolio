import { cn } from "@/lib/utils";

export function EmphasisText({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <span key={i} className="about-kw">
              {part.slice(1, -1)}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function AboutLineContent({
  line,
  className,
}: {
  line: string;
  className?: string;
}) {
  if (line.startsWith("## ")) {
    const label = line.slice(3);
    return (
      <div className={cn("about-section", className)} role="presentation">
        <span className="about-section-label">{label}</span>
        <span className="about-section-rule about-section-rule--fade" aria-hidden>
          ──
        </span>
      </div>
    );
  }

  if (line.startsWith("> ")) {
    return (
      <blockquote className={cn("about-pull", className)}>
        <EmphasisText text={line.slice(2)} />
      </blockquote>
    );
  }

  if (line.startsWith("//")) {
    return <p className={cn("about-comment", className)}>{line}</p>;
  }

  if (line === "") {
    return <div className="about-break" aria-hidden />;
  }

  return (
    <p className={cn("about-line", className)}>
      <EmphasisText text={line} />
    </p>
  );
}
