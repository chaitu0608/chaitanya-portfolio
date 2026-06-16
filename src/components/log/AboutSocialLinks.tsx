import { Github, Mail } from "lucide-react";
import {
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandX,
} from "@tabler/icons-react";
import { contactInfo } from "@/data/portfolio";
import { cn } from "@/lib/utils";

function whatsappHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

const LINKS = [
  {
    id: "github",
    href: contactInfo.githubUrl,
    label: "github",
    icon: Github,
  },
  {
    id: "linkedin",
    href: contactInfo.linkedinUrl,
    label: "linkedin",
    icon: IconBrandLinkedin,
  },
  {
    id: "twitter",
    href: contactInfo.twitterUrl ?? "https://twitter.com/chaitu0608",
    label: "twitter",
    icon: IconBrandX,
  },
  {
    id: "mail",
    href: `mailto:${contactInfo.email}`,
    label: "mail",
    icon: Mail,
  },
  {
    id: "whatsapp",
    href: whatsappHref(contactInfo.phone),
    label: "whatsapp",
    icon: IconBrandWhatsapp,
  },
] as const;

interface AboutSocialLinksProps {
  className?: string;
}

export function AboutSocialLinks({ className }: AboutSocialLinksProps) {
  return (
    <nav
      aria-label="Social links"
      className={cn(
        "grid w-full max-w-sm grid-cols-2 gap-2 sm:flex sm:max-w-none sm:flex-wrap sm:items-center sm:justify-center sm:gap-2.5",
        className,
      )}
    >
      {LINKS.map(({ id, href, label, icon: Icon }) => (
        <a
          key={id}
          href={href}
          target={id === "mail" ? undefined : "_blank"}
          rel={id === "mail" ? undefined : "noopener noreferrer"}
          className="log-focus inline-flex items-center gap-2 rounded border border-zinc-700/80 bg-zinc-900/50 px-3 py-2 font-mono text-xs text-zinc-400 transition-colors hover:border-emerald-500/40 hover:bg-emerald-500/5 hover:text-emerald-400"
        >
          <Icon className="h-4 w-4 shrink-0" aria-hidden />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}
