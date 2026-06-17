import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Home } from "lucide-react";
import {
  getResumeDownloadPath,
  getResumeEmbedUrl,
  RESUME_DOWNLOAD_NAME,
} from "@/lib/resume";
import { personalInfo } from "@/data/portfolio";

const Resume = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `Resume | ${personalInfo.name}`;

    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-zinc-100">
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-zinc-800 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            to="/"
            className="log-focus inline-flex items-center gap-2 font-mono text-xs text-zinc-400 transition-colors hover:text-emerald-400"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
            <span className="hidden sm:inline">back to portfolio</span>
            <Home className="h-4 w-4 sm:hidden" aria-hidden />
          </Link>
          <span className="hidden h-4 w-px bg-zinc-800 sm:block" aria-hidden />
          <p className="truncate font-mono text-xs text-emerald-400 sm:text-sm">
            ~/resume.pdf
          </p>
        </div>

        <a
          href={getResumeDownloadPath()}
          download={RESUME_DOWNLOAD_NAME}
          className="log-focus inline-flex shrink-0 items-center gap-2 rounded border border-zinc-700 px-3 py-1.5 font-mono text-xs text-zinc-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-400"
        >
          <Download className="h-3.5 w-3.5" aria-hidden />
          <span className="hidden sm:inline">download</span>
        </a>
      </header>

      <main className="relative min-h-0 flex-1">
        <iframe
          title={`${personalInfo.name} resume`}
          src={getResumeEmbedUrl()}
          className="absolute inset-0 h-full w-full border-0 bg-zinc-950"
          allow="autoplay"
        />
      </main>
    </div>
  );
};

export default Resume;
