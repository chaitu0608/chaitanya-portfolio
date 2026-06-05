import { cn } from "@/lib/utils";

interface SiteLogoProps {
  className?: string;
  size?: number;
}

export function SiteLogo({ className, size = 28 }: SiteLogoProps) {
  return (
    <img
      src="/logo.svg"
      alt=""
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      aria-hidden
    />
  );
}
