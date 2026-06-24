import { useState, useCallback, useEffect, lazy, Suspense } from "react";
import { ThemeSonner } from "@/components/ThemeSonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { useLenisScroll } from "@/hooks/useLenisScroll";
import { hasSeenBoot } from "@/lib/boot-session";
import { removeBootShell } from "@/lib/boot-shell";
import { cn } from "@/lib/utils";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LoadingScreen = lazy(() => import("./components/LoadingScreen"));

const App = () => {
  const skipBoot = hasSeenBoot();
  const [bootStarted, setBootStarted] = useState(skipBoot);
  const [appReady, setAppReady] = useState(skipBoot);

  const handleBootStart = useCallback(() => {
    setBootStarted(true);
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setAppReady(true);
  }, []);

  useLenisScroll(appReady);

  useEffect(() => {
    if (skipBoot) {
      removeBootShell();
    }
  }, [skipBoot]);

  useEffect(() => {
    if (appReady) {
      document.body.style.overflow = "";
      document.body.classList.remove("boot-loading");
    } else {
      document.body.style.overflow = "hidden";
      document.body.classList.add("boot-loading");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("boot-loading");
    };
  }, [appReady]);

  return (
    <ErrorBoundary>
      {!appReady && !skipBoot && (
        <Suspense fallback={null}>
          <LoadingScreen
            onBootStart={handleBootStart}
            onComplete={handleLoaderComplete}
            minDuration={600}
          />
        </Suspense>
      )}
      {bootStarted && (
        <div
          className={cn(
            !appReady &&
              "fixed inset-0 z-0 opacity-0 pointer-events-none overflow-hidden",
          )}
          aria-hidden={!appReady}
        >
          <TooltipProvider>
            <ThemeSonner />
            <Suspense fallback={null}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/jhukega-nahi-sala/*" element={<Index />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </Suspense>
          </TooltipProvider>
        </div>
      )}
    </ErrorBoundary>
  );
};

export default App;
