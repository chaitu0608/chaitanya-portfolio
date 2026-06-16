import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, ExternalLink } from "lucide-react";
import { contactInfo, personalInfo } from "@/data/portfolio";
import { getResumePath, RESUME_DOWNLOAD_NAME } from "@/lib/resume";
import { scrollToSection } from "@/utils/animations";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useSectionSpy } from "./useSectionSpy";
import { SiteLogo } from "./SiteLogo";

const NAV_LINKS = [
  { label: "about", href: "#about" },
  { label: "experience", href: "#experience" },
  { label: "work", href: "#work" },
  { label: "skills", href: "#skills" },
  { label: "contact", href: "#contact" },
] as const;

const SECTION_IDS = [
  "about",
  "experience",
  "work",
  "skills",
  "contact",
] as const;

export function LogNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useSectionSpy(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("lenis-scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("lenis-scroll", onScroll);
    };
  }, []);

  const go = (href: string) => {
    setMenuOpen(false);
    scrollToSection(href);
  };

  const navLinkClass = (id: string, isMobile = false) =>
    cn(
      "font-mono transition-colors log-focus",
      isMobile ? "text-base" : "text-sm",
      active === id
        ? "text-emerald-400"
        : "text-zinc-400 hover:text-zinc-100",
    );

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className={cn(
        "fixed left-0 right-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-zinc-800 bg-[#0a0a0a]/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex min-w-0 max-w-6xl items-center gap-3 px-4 py-3 md:gap-5 md:px-6">
        <button
          type="button"
          onClick={() => go("#about")}
          className="log-focus flex items-center gap-2.5 rounded font-mono text-sm font-semibold text-zinc-100"
          aria-label="Home"
        >
          <SiteLogo size={26} />
          <span className="log-pulse h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="hidden truncate sm:inline">
            {personalInfo.name.toLowerCase()}
          </span>
          <span className="sm:hidden">chaitanya</span>
        </button>

        <ul className="ml-4 hidden items-center gap-5 md:flex">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = active === id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(link.href);
                  }}
                  className={navLinkClass(id)}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="mt-0.5 block h-px w-full bg-emerald-400"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-3">
          <kbd className="hidden rounded border border-zinc-800 bg-zinc-900/60 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 lg:inline">
            ⌘K
          </kbd>
          <kbd className="hidden rounded border border-zinc-800 bg-zinc-900/60 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 lg:inline">
            g+w
          </kbd>

          <a
            href={getResumePath()}
            download={RESUME_DOWNLOAD_NAME}
            target="_blank"
            rel="noopener noreferrer"
            className="log-focus hidden items-center gap-1.5 rounded border border-emerald-500/40 px-3 py-1.5 font-mono text-xs text-emerald-400 transition-colors hover:bg-emerald-500/10 hover:text-emerald-300 sm:inline-flex"
          >
            [ resume.pdf
            <ExternalLink className="h-3 w-3" />
            ]
          </a>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <button
                type="button"
                className="log-focus rounded p-1 text-zinc-300"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-zinc-800 bg-[#0a0a0a] text-zinc-100"
            >
              <SheetHeader>
                <SheetTitle className="break-all font-mono text-sm text-emerald-400 sm:text-base">
                  ~/chaitanya_dhamdhere
                </SheetTitle>
              </SheetHeader>
              <ul className="mt-8 flex flex-col gap-4 font-mono">
                {NAV_LINKS.map((link) => {
                  const id = link.href.replace("#", "");
                  const isActive = active === id;
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          go(link.href);
                        }}
                        className={navLinkClass(id, true)}
                      >
                        {link.label}
                        {isActive && (
                          <span className="mt-1 block h-px w-8 bg-emerald-400" />
                        )}
                      </a>
                    </li>
                  );
                })}
                <li>
                  <a
                    href={getResumePath()}
                    download={RESUME_DOWNLOAD_NAME}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="log-focus mt-4 inline-flex items-center gap-1.5 rounded border border-emerald-500/40 px-3 py-1.5 text-sm text-emerald-400"
                  >
                    [ resume.pdf
                    <ExternalLink className="h-3 w-3" />
                    ]
                  </a>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
