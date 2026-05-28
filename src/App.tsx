import { useState, useCallback, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingScreen from "./components/LoadingScreen";

const App = () => {
  const [appReady, setAppReady] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setAppReady(true);
  }, []);

  useEffect(() => {
    if (appReady) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [appReady]);

  return (
    <ErrorBoundary>
      {!appReady && (
        <LoadingScreen onComplete={handleLoaderComplete} minDuration={600} />
      )}
      <div
        style={{
          visibility: appReady ? "visible" : "hidden",
          pointerEvents: appReady ? "auto" : "none",
          opacity: appReady ? 1 : 0,
          transition: "opacity 0.4s ease-out",
        }}
      >
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </div>
    </ErrorBoundary>
  );
};

export default App;
