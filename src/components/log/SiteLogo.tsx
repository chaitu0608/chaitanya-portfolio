import { brandAssets } from "@/data/portfolio";
import { cn } from "@/lib/utils";

interface SiteLogoProps {
  className?: string;
  size?: number;
}

export function SiteLogo({ className, size = 28 }: SiteLogoProps) {
  return (
    <img
      src={brandAssets.avatar}
      alt=""
      width={size}
      height={size}
      className={cn(
        "shrink-0 rounded-full object-cover ring-1 ring-zinc-700/90",
        className,
      )}
      aria-hidden
    />
  );
}
