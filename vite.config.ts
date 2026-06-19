import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tanstackStart(), react(), tsconfigPaths(), tailwindcss()],
  server: {
    host: true,
    strictPort: true,
    proxy: {
      "/api": {
        // During local development proxy to the locally running Cloudflare Worker (Miniflare)
        target: "http://127.0.0.1:8787",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
