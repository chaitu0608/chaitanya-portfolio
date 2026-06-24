import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { MEET_URL, RESUME_PATH } from "./src/data/links";

function utilityRedirects(): Plugin {
  return {
    name: "utility-redirects",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0];
        if (url === "/meet" || url === "/meet/") {
          res.writeHead(302, { Location: MEET_URL });
          res.end();
          return;
        }
        if (url === "/resume" || url === "/resume/") {
          res.writeHead(302, { Location: RESUME_PATH });
          res.end();
          return;
        }
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.pdf"],
  server: {
    host: "localhost",
    port: 8000,
  },
  plugins: [react(), utilityRedirects()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (
            id.includes("react-dom") ||
            id.includes("react-router") ||
            id.includes("/react/")
          ) {
            return "vendor";
          }
          if (id.includes("framer-motion")) return "motion";
          if (id.includes("lenis")) return "lenis";
          if (id.includes("@tabler/icons-react")) return "icons";
          if (id.includes("penflow") || id.includes("typr")) return "penflow";
        },
      },
    },
    target: "es2020",
    cssCodeSplit: true,
    sourcemap: false,
  },
});
