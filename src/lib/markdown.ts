import MarkdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItFootnote from "markdown-it-footnote";
import markdownItKatex from "@traptitech/markdown-it-katex";
import Shiki from "@shikijs/markdown-it";
import { autolinks } from "../data/autolinks";

export type Heading = {
  level: number;
  title: string;
  slug: string;
};

type RenderResult = {
  html: string;
  headings: Heading[];
};

const normalizeSlugBase = (value: string): string => {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[–—]/g, "")
    .replace(/&/g, " and ")
    .replace(/["'`.,!?;:()\[\]{}]/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

// Create the Shiki plugin once (cached promise)
const shikiPlugin = Shiki({
  themes: {
    light: "github-light",
    dark: "github-dark",
  },
});

/**
 * Post-process rendered HTML to auto-link known names in <strong> tags.
 * Only links the first occurrence of each name, and skips <strong> tags
 * that are already inside an <a> tag.
 */
function autoLinkNames(html: string): string {
  const linked = new Set<string>();

  for (const [name, url] of Object.entries(autolinks)) {
    if (linked.has(name)) continue;

    // Escape name for regex
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Match <strong>Name</strong> that is NOT already inside an <a> tag.
    // We look for <strong>Name</strong> and check if it's preceded by <a ...>
    // Strategy: match the pattern and use a function to check context
    const pattern = new RegExp(
      `(<strong>)(${escaped})(</strong>)`,
      "g"
    );

    let replaced = false;
    html = html.replace(pattern, (match, openTag, text, closeTag, offset) => {
      if (replaced) return match;

      // Check if this <strong> is inside an <a> tag by looking backwards
      // Find the last <a or </a> before this position
      const before = html.slice(Math.max(0, offset - 500), offset);
      const lastAOpen = before.lastIndexOf("<a ");
      const lastAClose = before.lastIndexOf("</a>");

      // If we found an <a> that hasn't been closed, skip
      if (lastAOpen > lastAClose) return match;

      replaced = true;
      linked.add(name);
      return `<a href="${url}" target="_blank" rel="noreferrer">${openTag}${text}${closeTag}</a>`;
    });
  }

  return html;
}

export const renderMarkdown = async (markdown: string): Promise<RenderResult> => {
  const headings: Heading[] = [];
  const slugCounts = new Map<string, number>();

  const md = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: true,
    breaks: false
  })
    .use(markdownItFootnote)
    .use(markdownItKatex)
    .use(markdownItAnchor, {
      slugify: (title: string) => {
        const baseSlug = normalizeSlugBase(title) || "section";
        const seen = slugCounts.get(baseSlug) ?? 0;
        slugCounts.set(baseSlug, seen + 1);
        return seen > 0 ? `${baseSlug}-${seen}` : baseSlug;
      },
      callback: (token, info) => {
        if (!token.tag.startsWith("h")) {
          return;
        }

        const level = Number.parseInt(token.tag.slice(1), 10);
        headings.push({
          level,
          title: info.title,
          slug: info.slug
        });
      }
    });

  md.use(await shikiPlugin);

  let html = md.render(markdown);
  html = autoLinkNames(html);

  return { html, headings };
};
