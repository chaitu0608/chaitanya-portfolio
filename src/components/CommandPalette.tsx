import { useCallback, useEffect, useState } from "react";
import { Command } from "cmdk";
import {
  Briefcase,
  Code,
  Download,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Moon,
  Star,
  Sun,
  User,
} from "lucide-react";
import { IconBrandX } from "@tabler/icons-react";
import { contactInfo } from "@/data/portfolio";
import { getResumeHref } from "@/lib/resume";
import { scrollToSection } from "@/utils/animations";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "about", label: "about", href: "#about", icon: User },
  { id: "experience", label: "experience", href: "#experience", icon: Briefcase },
  { id: "work", label: "work", href: "#work", icon: Code },
  { id: "skills", label: "skills", href: "#skills", icon: Star },
  { id: "contact", label: "contact", href: "#contact", icon: Mail },
];

interface CommandPaletteProps {
  onContactClick?: () => void;
}

export function CommandPalette({ onContactClick }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "/" && !(e.metaKey || e.ctrlKey || e.altKey)) {
        const target = e.target as HTMLElement | null;
        if (
          target &&
          (target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.isContentEditable)
        ) {
          return;
        }
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onCustomOpen = () => setOpen(true);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onCustomOpen as EventListener);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onCustomOpen as EventListener);
    };
  }, []);

  const go = useCallback((href: string) => {
    scrollToSection(href);
    setOpen(false);
  }, []);

  const openExternal = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  }, []);

  const openResume = useCallback(() => {
    setOpen(false);
    window.location.assign(getResumeHref());
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100000] flex items-start justify-center bg-black/70 p-4 pt-[12vh] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="command-palette-title"
      onClick={() => setOpen(false)}
    >
      <h2 id="command-palette-title" className="sr-only">
        Command palette
      </h2>
      <Command
        className={cn(
          "w-full max-w-lg overflow-hidden rounded-md border border-zinc-800",
          "bg-[#0a0a0a] shadow-2xl",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-zinc-800 px-4">
          <span className="mr-2 text-sm text-emerald-400" aria-hidden>
            $
          </span>
          <Command.Input
            placeholder="jump to section…"
            className="flex h-12 w-full bg-transparent font-mono text-sm text-zinc-100 outline-none placeholder:text-zinc-600"
          />
          <kbd className="hidden rounded border border-zinc-700 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 sm:inline">
            esc
          </kbd>
        </div>
        <Command.List
          data-lenis-prevent
          className="max-h-80 overflow-y-auto p-2 font-mono"
        >
          <Command.Empty className="py-6 text-center text-sm text-zinc-500">
            no results.
          </Command.Empty>

          <Command.Group
            heading="navigate"
            className="px-2 py-1.5 text-[10px] uppercase tracking-wider text-zinc-500"
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Command.Item
                  key={item.href}
                  value={item.label}
                  onSelect={() => go(item.href)}
                  className="flex cursor-pointer items-center gap-3 rounded px-3 py-2 text-sm text-zinc-300 aria-selected:bg-emerald-500/10 aria-selected:text-emerald-400"
                >
                  <Icon className="h-4 w-4 shrink-0 opacity-70" />
                  {item.label}
                </Command.Item>
              );
            })}
          </Command.Group>

          <Command.Group
            heading="actions"
            className="mt-2 px-2 py-1.5 text-[10px] uppercase tracking-wider text-zinc-500"
          >
            <Command.Item
              value="resume download"
              onSelect={openResume}
              className="flex cursor-pointer items-center gap-3 rounded px-3 py-2 text-sm text-zinc-300 aria-selected:bg-emerald-500/10 aria-selected:text-emerald-400"
            >
              <Download className="h-4 w-4 shrink-0 opacity-70" />
              download resume
            </Command.Item>
            <Command.Item
              value="github"
              onSelect={() => openExternal(contactInfo.githubUrl)}
              className="flex cursor-pointer items-center gap-3 rounded px-3 py-2 text-sm text-zinc-300 aria-selected:bg-emerald-500/10 aria-selected:text-emerald-400"
            >
              <Github className="h-4 w-4 shrink-0 opacity-70" />
              open github
            </Command.Item>
            <Command.Item
              value="linkedin"
              onSelect={() => openExternal(contactInfo.linkedinUrl)}
              className="flex cursor-pointer items-center gap-3 rounded px-3 py-2 text-sm text-zinc-300 aria-selected:bg-emerald-500/10 aria-selected:text-emerald-400"
            >
              <Linkedin className="h-4 w-4 shrink-0 opacity-70" />
              open linkedin
            </Command.Item>
            {contactInfo.twitterUrl && (
              <Command.Item
                value="twitter x"
                onSelect={() => openExternal(contactInfo.twitterUrl!)}
                className="flex cursor-pointer items-center gap-3 rounded px-3 py-2 text-sm text-zinc-300 aria-selected:bg-emerald-500/10 aria-selected:text-emerald-400"
              >
                <IconBrandX className="h-4 w-4 shrink-0 opacity-70" />
                open twitter
              </Command.Item>
            )}
            {onContactClick && (
              <Command.Item
                value="message contact"
                onSelect={() => {
                  setOpen(false);
                  onContactClick();
                }}
                className="flex cursor-pointer items-center gap-3 rounded px-3 py-2 text-sm text-zinc-300 aria-selected:bg-emerald-500/10 aria-selected:text-emerald-400"
              >
                <MessageCircle className="h-4 w-4 shrink-0 opacity-70" />
                send a message
              </Command.Item>
            )}
            <Command.Item
              value="toggle theme"
              onSelect={() => {
                toggleTheme();
                setOpen(false);
              }}
              className="flex cursor-pointer items-center gap-3 rounded px-3 py-2 text-sm text-zinc-300 aria-selected:bg-emerald-500/10 aria-selected:text-emerald-400"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 shrink-0 opacity-70" />
              ) : (
                <Moon className="h-4 w-4 shrink-0 opacity-70" />
              )}
              toggle {theme === "dark" ? "light" : "dark"} mode
            </Command.Item>
          </Command.Group>
        </Command.List>
        <div className="border-t border-zinc-800 px-4 py-2 font-mono text-[10px] text-zinc-500">
          <span className="text-emerald-400">⌘K</span> · <span className="text-emerald-400">/</span> · arrow keys · enter
        </div>
      </Command>
    </div>
  );
}
