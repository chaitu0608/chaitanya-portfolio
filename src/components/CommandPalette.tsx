import { useCallback, useEffect, useState } from "react";
import { Command } from "cmdk";
import {
  Briefcase,
  Code,
  Mail,
  MessageCircle,
  Moon,
  Star,
  Sun,
  User,
} from "lucide-react";
import { navItems } from "@/data/portfolio";
import { scrollToSection } from "@/utils/animations";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

const NAV_ICONS: Record<string, React.ElementType> = {
  about: User,
  projects: Code,
  experience: Briefcase,
  skills: Star,
  contact: Mail,
};

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
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const go = useCallback((href: string) => {
    scrollToSection(href);
    setOpen(false);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100000] flex items-start justify-center bg-black/60 p-4 pt-[12vh] backdrop-blur-sm"
      role="presentation"
      onClick={() => setOpen(false)}
    >
      <Command
        className={cn(
          "w-full max-w-lg overflow-hidden rounded-2xl border border-border/60",
          "bg-background/95 shadow-2xl backdrop-blur-xl",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-border/60 px-4">
          <Command.Input
            placeholder="Jump to section…"
            className="flex h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden rounded border border-border/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
            esc
          </kbd>
        </div>
        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
            No results.
          </Command.Empty>

          <Command.Group
            heading="Navigate"
            className="px-2 py-1.5 text-xs font-medium text-muted-foreground"
          >
            {navItems.map((item) => {
              const id = item.href.substring(1);
              const Icon = NAV_ICONS[id] ?? User;
              return (
                <Command.Item
                  key={item.href}
                  value={item.label}
                  onSelect={() => go(item.href)}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm aria-selected:bg-accent/15 aria-selected:text-accent"
                >
                  <Icon className="h-4 w-4 shrink-0 opacity-70" />
                  {item.label}
                </Command.Item>
              );
            })}
          </Command.Group>

          <Command.Group
            heading="Actions"
            className="mt-2 px-2 py-1.5 text-xs font-medium text-muted-foreground"
          >
            {onContactClick && (
              <Command.Item
                value="message contact"
                onSelect={() => {
                  setOpen(false);
                  onContactClick();
                }}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm aria-selected:bg-accent/15 aria-selected:text-accent"
              >
                <MessageCircle className="h-4 w-4 shrink-0 opacity-70" />
                Send a message
              </Command.Item>
            )}
            <Command.Item
              value="toggle theme"
              onSelect={() => {
                toggleTheme();
                setOpen(false);
              }}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm aria-selected:bg-accent/15 aria-selected:text-accent"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 shrink-0 opacity-70" />
              ) : (
                <Moon className="h-4 w-4 shrink-0 opacity-70" />
              )}
              Toggle {theme === "dark" ? "light" : "dark"} mode
            </Command.Item>
          </Command.Group>
        </Command.List>
        <div className="border-t border-border/60 px-4 py-2 text-[10px] text-muted-foreground">
          <span className="font-mono">⌘K</span> to open · arrow keys to navigate
        </div>
      </Command>
    </div>
  );
}
