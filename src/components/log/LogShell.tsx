import { lazy, Suspense } from "react";
import { LogNav } from "./LogNav";
import { About } from "./About";
import { LogFooter } from "./LogFooter";
import { MusicPill } from "./MusicPill";
import { useVimKeys } from "./useVimKeys";
import { AmbientBg } from "./AmbientBg";
import { StatusBar } from "./StatusBar";

const Experience = lazy(() =>
  import("./Experience").then((m) => ({ default: m.Experience })),
);
const Work = lazy(() => import("./Work").then((m) => ({ default: m.Work })));
const Skills = lazy(() =>
  import("./Skills").then((m) => ({ default: m.Skills })),
);
const Contact = lazy(() =>
  import("./Contact").then((m) => ({ default: m.Contact })),
);

interface LogShellProps {
  onContactClick: () => void;
}

function SectionFallback() {
  return <div className="min-h-[40vh]" aria-hidden />;
}

export function LogShell({ onContactClick }: LogShellProps) {
  useVimKeys();

  return (
    <div className="relative min-h-screen font-mono text-zinc-200 antialiased">
      <AmbientBg />
      <div className="relative z-10 pb-safe md:pb-9">
        <LogNav />
        <main className="pb-32 md:pb-6">
          <About />
          <Suspense fallback={<SectionFallback />}>
            <Experience />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Work />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Skills />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Contact onMessage={onContactClick} />
          </Suspense>
        </main>
        <LogFooter />
        <MusicPill />
        <StatusBar />
      </div>
    </div>
  );
}
