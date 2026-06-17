import { useState, useCallback, useEffect, lazy, Suspense } from "react";
import { ThemeSonner } from "@/components/ThemeSonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { useLenisScroll } from "@/hooks/useLenisScroll";
import { cn } from "@/lib/utils";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Resume = lazy(() => import("./pages/Resume"));
const Meet = lazy(() => import("./pages/Meet"));
const LoadingScreen = lazy(() => import("./components/LoadingScreen"));

const UTILITY_ROUTES = new Set(["/resume", "/meet"]);

function isUtilityRoute(): boolean {
  if (typeof window === "undefined") return false;
  return UTILITY_ROUTES.has(window.location.pathname);
}

function UtilityRoutes() {
  return (
    <ErrorBoundary>
      <Suspense fallback={null}>
        <BrowserRouter>
          <Routes>
            <Route path="/resume" element={<Resume />} />
            <Route path="/meet" element={<Meet />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
}

const App = () => {
  const [utilityRoute] = useState(isUtilityRoute);
  const [bootStarted, setBootStarted] = useState(false);
  const [appReady, setAppReady] = useState(false);

  const handleBootStart = useCallback(() => {
    setBootStarted(true);
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setAppReady(true);
  }, []);

  useLenisScroll(appReady && !utilityRoute);

  useEffect(() => {
    if (utilityRoute || appReady) {
      document.body.style.overflow = "";
      document.body.classList.remove("boot-loading");
      return;
    }

    document.body.style.overflow = "hidden";
    document.body.classList.add("boot-loading");

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("boot-loading");
    };
  }, [appReady, utilityRoute]);

  if (utilityRoute) {
    return <UtilityRoutes />;
  }

  return (
    <ErrorBoundary>
      {!appReady && (
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
