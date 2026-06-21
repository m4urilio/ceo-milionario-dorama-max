import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // Force Nitro on with the Vercel preset so `vercel build` / `vite build`
  // on Vercel produces a `.vercel/output` deployment instead of a static
  // SPA (which causes 404 NOT_FOUND on every route).
  nitro: { preset: "vercel" },
});
