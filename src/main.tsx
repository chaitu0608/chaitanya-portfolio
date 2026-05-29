import { createRoot } from "react-dom/client";
import { inject } from "@vercel/analytics";
import App from "./App.tsx";
import { ThemeProvider } from "@/hooks/use-theme";
import "lenis/dist/lenis.css";
import "./index.css";

inject();

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);
