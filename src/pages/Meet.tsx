import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getMeetUrl } from "@/lib/resume";

const Meet = () => {
  const meetUrl = getMeetUrl();

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Google Meet | Chaitanya Dhamdhere";

    const meta = document.createElement("meta");
    meta.httpEquiv = "refresh";
    meta.content = `0;url=${meetUrl}`;
    document.head.appendChild(meta);

    window.location.replace(meetUrl);

    return () => {
      document.title = prevTitle;
      document.head.removeChild(meta);
    };
  }, [meetUrl]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-4 text-center text-zinc-100">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-emerald-400/80">
        redirecting
      </p>
      <h1 className="mt-4 font-mono text-lg text-zinc-200">
        Opening Google Meet…
      </h1>
      <p className="mt-3 max-w-md font-mono text-sm text-zinc-500">
        If nothing happens,{" "}
        <a
          href={meetUrl}
          className="text-emerald-400 underline-offset-4 hover:underline"
        >
          tap here to join
        </a>
        .
      </p>
      <Link
        to="/"
        className="log-focus mt-8 font-mono text-xs text-zinc-500 transition-colors hover:text-emerald-400"
      >
        ← back to cdhamdhere.xyz
      </Link>
    </div>
  );
};

export default Meet;
