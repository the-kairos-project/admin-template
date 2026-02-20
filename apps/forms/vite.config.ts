import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite as tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [tailwindcss(), tanstackRouter({}), react()],
  server: { port: 3002 },
});
