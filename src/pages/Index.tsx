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
        <h1>Chaitanya Dhamdhere — Full Stack Developer Portfolio</h1>
        <p>
          Chaitanya Dhamdhere is a Full Stack Developer and Computer
          Engineering student at K. J. Somaiya College of Engineering, Mumbai.
          Skills include React, TypeScript, Node.js, Next.js, MongoDB, and
          PostgreSQL. Experience at Jio Platforms and KJSCE CodeCell.
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
