import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { getCompanyInitial, getInitials } from "@/lib/image-fallbacks";

type FallbackVariant = "initials" | "project" | "company";

interface ImageWithFallbackProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "children"> {
  fallbackLabel: string;
  fallbackVariant?: FallbackVariant;
  /** Used for company variant when logo is an emoji */
  companyLogo?: string;
  containerClassName?: string;
}

export function InitialsFallback({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/25 via-accent/10 to-background",
        className
      )}
      aria-hidden={!label}
    >
      <span className="font-display font-bold text-accent select-none">
        {getInitials(label) || "?"}
      </span>
    </div>
  );
}

export function ProjectFallback({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-accent/15 via-background/90 to-background p-4 text-center",
        className
      )}
    >
      <span className="font-mono text-[10px] uppercase tracking-widest text-accent/70">
        Project
      </span>
      <span className="font-display text-sm font-semibold text-foreground/90 line-clamp-3">
        {title}
      </span>
    </div>
  );
}

export function CompanyFallback({
  company,
  logo,
  className,
}: {
  company: string;
  logo?: string;
  className?: string;
}) {
  const display = getCompanyInitial(company, logo);
  const isEmoji = Boolean(logo && !logo.startsWith("/") && !logo.startsWith("http"));

  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-accent/20 to-accent/5 ring-2 ring-accent/20",
        className
      )}
    >
      <span
        className={cn(
          "font-display font-bold text-accent select-none",
          isEmoji ? "text-2xl" : "text-sm md:text-base"
        )}
      >
        {display}
      </span>
    </div>
  );
}

export function ImageWithFallback({
  src,
  alt,
  fallbackLabel,
  fallbackVariant = "initials",
  companyLogo,
  className,
  containerClassName,
  ...imgProps
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  const fallback =
    fallbackVariant === "project" ? (
      <ProjectFallback title={fallbackLabel} />
    ) : fallbackVariant === "company" ? (
      <CompanyFallback company={fallbackLabel} logo={companyLogo} />
    ) : (
      <InitialsFallback label={fallbackLabel} />
    );

  if (failed || !src) {
    return (
      <div className={cn("relative h-full w-full overflow-hidden", containerClassName)}>
        {fallback}
      </div>
    );
  }

  return (
    <div className={cn("relative h-full w-full overflow-hidden", containerClassName)}>
      <img
        {...imgProps}
        src={src}
        alt={alt}
        className={cn("h-full w-full object-cover", className)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
