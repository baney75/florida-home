import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// Build timestamp for cache busting
const BUILD_TIMESTAMP = new Date().toISOString();

export default defineConfig({
  base: "/florida-home/",
  define: {
    __BUILD_TIME__: JSON.stringify(BUILD_TIMESTAMP),
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/baney75\.github\.io\/florida-home\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "florida-home-cache-v2",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 1 day only
              },
              networkTimeoutSeconds: 3,
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
        skipWaiting: true,
        clientsClaim: true,
      },
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Florida Home Access",
        short_name: "FL Home",
        description: "Access codes for the Florida vacation home",
        theme_color: "#800000",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        start_url: "/florida-home/",
        scope: "/florida-home/",
        icons: [
          {
            src: "/florida-home/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/florida-home/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
