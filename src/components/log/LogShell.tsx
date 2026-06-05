import { LogNav } from "./LogNav";
import { About } from "./About";
import { Work } from "./Work";
import { Now } from "./Now";
import { Experience } from "./Experience";
import { Stack } from "./Stack";
import { Contact } from "./Contact";
import { LogFooter } from "./LogFooter";
import { MusicPill } from "./MusicPill";
import { useVimKeys } from "./useVimKeys";
import { AmbientBg } from "./AmbientBg";
import { StatusBar } from "./StatusBar";

interface LogShellProps {
  onContactClick: () => void;
}

export function LogShell({ onContactClick }: LogShellProps) {
  useVimKeys();

  return (
    <div className="relative min-h-screen font-mono text-zinc-200 antialiased">
      <AmbientBg />
      <div className="relative z-10">
        <LogNav />
        <main className="pb-28 md:pb-24">
          <About />
          <Work />
          <Now />
          <Experience />
          <Stack />
          <Contact onMessage={onContactClick} />
        </main>
        <LogFooter />
        <MusicPill />
        <StatusBar />
      </div>
    </div>
  );
}
