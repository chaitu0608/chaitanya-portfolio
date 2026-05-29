import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.pdf"],
  server: {
    host: "::",
    port: 8000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
          lenis: ["lenis"],
        },
      },
    },
    target: "es2020",
    cssCodeSplit: true,
    sourcemap: false,
  },
});
