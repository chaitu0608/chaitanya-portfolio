import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { contactInfo } from "@/data/portfolio";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./SectionHeader";

interface ContactProps {
  onMessage: () => void;
}

export function Contact({ onMessage }: ContactProps) {
  const reduced = useReducedMotion();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const flags: Array<{ flag: string; value: string; href?: string }> = [
    { flag: "subject", value: '"let\'s build something"' },
    { flag: "github", value: "github.com/chaitu0608", href: contactInfo.githubUrl },
    {
      flag: "linkedin",
      value: "linkedin.com/in/chaitanya-dhamdhere",
      href: contactInfo.linkedinUrl,
    },
    {
      flag: "resume",
      value: "/ChaitanyaResume.pdf",
      href: contactInfo.resumeUrl ?? "/ChaitanyaResume.pdf",
    },
    { flag: "location", value: contactInfo.location.toLowerCase() },
  ];

  const onCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedKey(key);
    toast.success(`copied ${key} to clipboard`);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <section
      id="contact"
      className="log-section border-t border-zinc-900 px-4 py-16 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          index="06_contact"
          path="./mail.sh"
          title="let's connect"
          isLast
        />

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="mt-10 font-mono"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <p className="text-zinc-300">
              <span className="text-emerald-400">$</span> mail{" "}
              <a
                href={`mailto:${contactInfo.email}`}
                className="log-focus break-all rounded text-xl text-zinc-100 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-emerald-400 hover:decoration-emerald-400 sm:text-2xl md:text-3xl"
              >
                {contactInfo.email}
              </a>
            </p>
            <button
              type="button"
              onClick={() => onCopy("email", contactInfo.email)}
              className={cn(
                "log-focus inline-flex items-center gap-1 rounded border border-zinc-800 px-2 py-1 font-mono text-xs transition-colors",
                copiedKey === "email"
                  ? "border-emerald-500/40 text-emerald-400"
                  : "text-zinc-500 hover:border-zinc-600 hover:text-zinc-200",
              )}
              aria-label="Copy email address"
            >
              {copiedKey === "email" ? (
                <>
                  <Check className="h-3 w-3" /> copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" /> copy email
                </>
              )}
            </button>
          </div>

          <div className="mt-6 space-y-1.5 pl-4 text-sm">
            {flags.map(({ flag, value, href }) => {
              const isCopied = copiedKey === flag;
              return (
                <div
                  key={flag}
                  className="group flex flex-wrap items-center gap-x-3 gap-y-1"
                >
                  <span className="text-zinc-500">--{flag.padEnd(9, " ")}</span>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="log-focus rounded text-zinc-300 transition-colors hover:text-emerald-400"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-zinc-300">{value}</span>
                  )}
                  <button
                    type="button"
                    onClick={() => onCopy(flag, value.replace(/^"|"$/g, ""))}
                    className={cn(
                      "log-focus ml-1 inline-flex items-center gap-1 rounded text-xs opacity-100 transition md:opacity-0 md:group-hover:opacity-100",
                      isCopied
                        ? "text-emerald-400"
                        : "text-zinc-500 hover:text-zinc-200",
                    )}
                    aria-label={`Copy ${flag}`}
                  >
                    {isCopied ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onMessage}
              className="log-focus inline-flex items-center gap-2 rounded border border-emerald-500/40 bg-emerald-500/5 px-4 py-2 font-mono text-sm text-emerald-400 transition-colors hover:bg-emerald-500/10 hover:text-emerald-300"
            >
              [ send a message ]
            </button>
            <a
              href={`mailto:${contactInfo.email}`}
              className="log-focus inline-flex items-center gap-2 rounded border border-zinc-700 px-4 py-2 font-mono text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
            >
              [ open mail.app ]
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
