import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import remarkBaseLinks from "./src/lib/remark-base-links.mjs";

export default defineConfig({
  site: "https://kevinmichaelchen.github.io",
  base: "/effect-history",
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    remarkPlugins: [remarkBaseLinks],
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
});
