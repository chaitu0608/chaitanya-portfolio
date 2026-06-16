import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { aboutMeta, contactInfo } from "@/data/portfolio";
import { getResumeHref, getResumePath } from "@/lib/resume";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { AboutSocialLinks } from "./AboutSocialLinks";
import { LogDossierShell, LogPaneChrome } from "./LogDossier";
import { SectionHeader } from "./SectionHeader";

interface ContactProps {
  onMessage: () => void;
}

function whatsappHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

function CopyButton({
  label,
  value,
  copiedKey,
  copyKey,
  onCopy,
}: {
  label: string;
  value: string;
  copiedKey: string | null;
  copyKey: string;
  onCopy: (key: string, text: string) => void;
}) {
  const isCopied = copiedKey === copyKey;

  return (
    <button
      type="button"
      onClick={() => onCopy(copyKey, value)}
      className={cn(
        "log-focus inline-flex items-center gap-1 rounded border border-zinc-800 px-2 py-1 font-mono text-xs transition-colors",
        isCopied
          ? "border-emerald-500/40 text-emerald-400"
          : "text-zinc-500 hover:border-zinc-600 hover:text-zinc-200",
      )}
      aria-label={`Copy ${label}`}
    >
      {isCopied ? (
        <>
          <Check className="h-3 w-3" /> copied
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" /> copy
        </>
      )}
    </button>
  );
}

export function Contact({ onMessage }: ContactProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const flags: Array<{
    flag: string;
    value: string;
    href?: string;
    copyValue?: string;
  }> = [
    { flag: "subject", value: '"let\'s build something"' },
    { flag: "github", value: "github.com/chaitu0608", href: contactInfo.githubUrl },
    {
      flag: "linkedin",
      value: "linkedin.com/in/chaitanya-dhamdhere",
      href: contactInfo.linkedinUrl,
    },
    {
      flag: "twitter",
      value: "x.com/chaitu0608",
      href: contactInfo.twitterUrl,
    },
    {
      flag: "phone",
      value: contactInfo.phone,
      href: whatsappHref(contactInfo.phone),
    },
    {
      flag: "resume",
      value: getResumePath(),
      href: getResumePath(),
      copyValue: getResumeHref(),
    },
    { flag: "location", value: contactInfo.location.toLowerCase() },
  ];

  const onCopy = (key: string, text: string) => {
    void navigator.clipboard.writeText(text).then(
      () => {
        setCopiedKey(key);
        toast.success(`copied ${key} to clipboard`);
        setTimeout(() => setCopiedKey(null), 1500);
      },
      () => {
        toast.error(`could not copy ${key} — check browser permissions`);
      },
    );
  };

  return (
    <section
      id="contact"
      className="log-section border-t border-zinc-900 px-4 py-12 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="05_contact"
          path="./connect"
          title="let's connect"
          isLast
        />

        <LogDossierShell windowPath="~/mail/connect.sh" className="mt-10">
          <div className="border-b border-zinc-800 bg-zinc-900/20">
            <LogPaneChrome path="~/mail/readme.md" />
            <div className="space-y-2 p-5 sm:p-6 lg:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-emerald-400">
                {aboutMeta.status}
              </p>
              <p className="log-prose">
                Good conversations, real problems, interesting builds — reach out
                anytime. Fastest path is email; use the form if you want a
                structured note.
              </p>
            </div>
          </div>

          <div className="border-b border-zinc-800">
            <LogPaneChrome path="~/mail/inbox" status="ready" />
            <div className="flex flex-col gap-3 p-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-2 sm:p-6 lg:p-8">
              <p className="min-w-0 text-zinc-300">
                <span className="text-emerald-400">$</span> mail{" "}
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="log-focus break-all rounded text-lg text-zinc-100 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-emerald-400 hover:decoration-emerald-400 sm:text-2xl md:text-3xl"
                >
                  {contactInfo.email}
                </a>
              </p>
              <CopyButton
                label="email"
                value={contactInfo.email}
                copiedKey={copiedKey}
                copyKey="email"
                onCopy={onCopy}
              />
            </div>
          </div>

          <div className="border-b border-zinc-800 bg-zinc-900/20">
            <LogPaneChrome path="~/mail/flags.env" />
            <div className="space-y-2 p-5 sm:p-6 lg:p-8">
              {flags.map(({ flag, value, href, copyValue }) => (
                <div
                  key={flag}
                  className="group flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 font-mono text-sm sm:gap-x-3"
                >
                  <span className="shrink-0 text-zinc-500">--{flag}</span>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("mailto") ? undefined : "_blank"}
                      rel={
                        href.startsWith("mailto") ? undefined : "noopener noreferrer"
                      }
                      className="log-focus min-w-0 break-all rounded text-zinc-300 transition-colors hover:text-emerald-400"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="min-w-0 break-all text-zinc-300">{value}</span>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      onCopy(
                        flag,
                        (copyValue ?? value).replace(/^"|"$/g, ""),
                      )
                    }
                    className={cn(
                      "log-focus ml-1 inline-flex items-center gap-1 rounded text-xs opacity-100 transition md:opacity-0 md:group-hover:opacity-100",
                      copiedKey === flag
                        ? "text-emerald-400"
                        : "text-zinc-500 hover:text-zinc-200",
                    )}
                    aria-label={`Copy ${flag}`}
                  >
                    {copiedKey === flag ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900/20">
            <LogPaneChrome path="~/mail/channels/" />
            <div className="space-y-6 p-5 sm:p-6 lg:p-8">
              <AboutSocialLinks className="max-w-none justify-start" />
              <div className="flex flex-wrap gap-3">
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
            </div>
          </div>
        </LogDossierShell>
      </div>
    </section>
  );
}
