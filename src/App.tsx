import { useState, useCallback, useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingScreen from "./components/LoadingScreen";
import { cn } from "@/lib/utils";

const App = () => {
  const [bootStarted, setBootStarted] = useState(false);
  const [appReady, setAppReady] = useState(false);

  const handleBootStart = useCallback(() => {
    setBootStarted(true);
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setAppReady(true);
  }, []);

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
      {!appReady && (
        <LoadingScreen
          onBootStart={handleBootStart}
          onComplete={handleLoaderComplete}
          minDuration={600}
        />
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
            <Toaster />
            <Sonner />
            <Suspense fallback={null}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
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
