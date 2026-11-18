import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, "tests/e2e"),
  server: {
    port: 3000,
    strictPort: true,
  },
  resolve: {
    alias: {
      "@mesomian/ui": path.resolve(__dirname, "src/index.ts"),
    },
  },
});
