import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteCompression()],
});
