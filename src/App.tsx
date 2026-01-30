import { useState, useCallback, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexNoThree from "./pages/IndexNoThree";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingScreen from "./components/LoadingScreen";

const queryClient = new QueryClient();

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
        <LoadingScreen onComplete={handleLoaderComplete} minDuration={4000} />
      )}
      <div
        style={{
          visibility: appReady ? "visible" : "hidden",
          pointerEvents: appReady ? "auto" : "none",
          opacity: appReady ? 1 : 0,
          transition: "opacity 0.4s ease-out",
        }}
      >
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<IndexNoThree />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </div>
    </ErrorBoundary>
  );
};

export default App;
