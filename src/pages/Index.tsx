import { lazy, Suspense, useCallback, useState } from "react";
import { LogShell } from "@/components/log/LogShell";
import { PushpaEasterEgg } from "@/components/log/PushpaEasterEgg";
import { usePushpaEasterEgg } from "@/hooks/usePushpaEasterEgg";

const ContactModal = lazy(() => import("@/components/ContactModal"));
const CommandPalette = lazy(() =>
  import("@/components/CommandPalette").then((m) => ({
    default: m.CommandPalette,
  })),
);

const Index = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { open: pushpaOpen, close: closePushpa } = usePushpaEasterEgg();

  const handleContactClick = useCallback(() => {
    setIsContactModalOpen(true);
  }, []);

  const handleContactModalClose = useCallback(() => {
    setIsContactModalOpen(false);
  }, []);

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100001] focus:rounded focus:bg-emerald-500 focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>

      <LogShell onContactClick={handleContactClick} />

      <PushpaEasterEgg open={pushpaOpen} onClose={closePushpa} />

      <Suspense fallback={null}>
        <CommandPalette onContactClick={handleContactClick} />
      </Suspense>

      {/* SEO sr-only */}
      <div className="sr-only">
        <h1>Chaitanya Dhamdhere — Engineer · Builder · Student</h1>
        <p>
          Chaitanya Dhamdhere is a Computer Engineering student at K. J. Somaiya
          College of Engineering, Mumbai, building full-stack apps, developer
          tools, and practical AI. Full Stack Developer Intern at RxGPT (Jun–Aug
          2026). Former Software Development Intern at Jio Platforms (Dec 2025–Jan
          2026). Core team at KJSCE CodeCell. Projects include Verifyr, ShieldEye,
          SpendSense, ZkMultiCloud, and TrustWipe. Skills include React,
          TypeScript, Python, FastAPI, Node.js, MongoDB, and PostgreSQL.
        </p>
      </div>

      <Suspense fallback={null}>
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={handleContactModalClose}
        />
      </Suspense>
    </>
  );
};

export default Index;
