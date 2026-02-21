import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import remarkBaseLinks from "./src/lib/remark-base-links.mjs";
import rehypeShiki from "@shikijs/rehype";

export default defineConfig({
  site: "https://kevinmichaelchen.github.io",
  base: "/effect-history",
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    remarkPlugins: [remarkBaseLinks],
    syntaxHighlight: false,
    rehypePlugins: [
      [rehypeShiki, {
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
        defaultColor: false,
      }],
    ],
  },
});
