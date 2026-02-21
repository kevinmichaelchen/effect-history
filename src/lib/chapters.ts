import { readFile } from "node:fs/promises";

export type ChapterContent = {
  chapterNumber: string;
  title: string;
  slug: string;
  markdownBody: string;
};

const normalizeSlug = (value: string): string => {
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

/**
 * Splits the main markdown document into individual chapter content.
 * Each chapter gets its own footnote definitions and reference-style links.
 */
export async function splitMarkdownByChapter(): Promise<ChapterContent[]> {
  const sourcePath = new URL("../../effect-intellectual-lineage.md", import.meta.url);
  const sourceMarkdown = await readFile(sourcePath, "utf-8");

  const lines = sourceMarkdown.split("\n");

  // Find chapter heading line indices (## N. Title patterns, excluding Table of Contents)
  const chapterStarts: { lineIndex: number; chapterNumber: string; title: string }[] = [];
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^## (\d+)\.\s+(.+)$/);
    if (match) {
      chapterStarts.push({
        lineIndex: i,
        chapterNumber: match[1],
        title: match[2],
      });
    }
  }

  // Also find the Epilogue heading to include it with chapter 11 or as separate content
  let epilogueLineIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^## Epilogue/)) {
      epilogueLineIndex = i;
      break;
    }
  }

  // Collect all footnote definitions and reference-style links from the document
  const footnoteDefRegex = /^\[\^([\w-]+)\]:/;
  const refLinkRegex = /^\[([\w-]+)\]:\s+/;
  const footnoteDefinitions = new Map<string, string[]>();
  const refLinks = new Map<string, string>();

  let currentFootnoteId: string | null = null;
  let currentFootnoteLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for reference-style links (e.g., [church-1936-pdf]: https://...)
    const refMatch = line.match(/^\[([\w-]+)\]:\s*(https?:\/\/.+)$/);
    if (refMatch) {
      refLinks.set(refMatch[1], refMatch[2]);
      continue;
    }

    // Multi-line ref links (e.g., indented continuation)
    if (refLinks.size > 0 && line.match(/^\s+https?:\/\//) && i > 0) {
      const prevLine = lines[i - 1];
      const prevRefMatch = prevLine.match(/^\[([\w-]+)\]:$/);
      if (prevRefMatch) {
        refLinks.set(prevRefMatch[1], line.trim());
        continue;
      }
    }

    // Check for footnote definitions
    const fnMatch = line.match(footnoteDefRegex);
    if (fnMatch) {
      // Save previous footnote
      if (currentFootnoteId) {
        footnoteDefinitions.set(currentFootnoteId, currentFootnoteLines);
      }
      currentFootnoteId = fnMatch[1];
      currentFootnoteLines = [line];
    } else if (currentFootnoteId && line.match(/^\s{4}/) && line.trim()) {
      // Continuation of footnote definition (indented)
      currentFootnoteLines.push(line);
    } else if (currentFootnoteId && line.trim() === "") {
      // Empty line might end the footnote
      currentFootnoteLines.push(line);
    } else {
      if (currentFootnoteId) {
        footnoteDefinitions.set(currentFootnoteId, currentFootnoteLines);
        currentFootnoteId = null;
        currentFootnoteLines = [];
      }
    }
  }
  // Save last footnote
  if (currentFootnoteId) {
    footnoteDefinitions.set(currentFootnoteId, currentFootnoteLines);
  }

  const chapters: ChapterContent[] = [];

  for (let idx = 0; idx < chapterStarts.length; idx++) {
    const start = chapterStarts[idx];
    const nextStart = chapterStarts[idx + 1];

    let endLineIndex: number;
    if (nextStart) {
      endLineIndex = nextStart.lineIndex;
    } else {
      // Last chapter — goes to end of file but we exclude footnote defs / ref links
      endLineIndex = lines.length;
    }

    // For chapter 11 (Complete Timeline), include the Epilogue section
    if (start.chapterNumber === "11" && epilogueLineIndex > 0 && nextStart) {
      // Extend chapter 11 to include the Epilogue up to chapter 12
      endLineIndex = nextStart.lineIndex;
    }

    // Extract chapter body (skip the --- separator before next chapter)
    let chapterLines = lines.slice(start.lineIndex, endLineIndex);

    // Remove trailing --- separators
    while (chapterLines.length > 0 && chapterLines[chapterLines.length - 1].trim() === "---") {
      chapterLines.pop();
    }
    while (chapterLines.length > 0 && chapterLines[chapterLines.length - 1].trim() === "") {
      chapterLines.pop();
    }

    const chapterBody = chapterLines.join("\n");

    // Find all footnote references used in this chapter (e.g., [^church-1936])
    const footnoteRefs = new Set<string>();
    const fnRefRegex = /\[\^([\w-]+)\]/g;
    let fnRefMatch;
    while ((fnRefMatch = fnRefRegex.exec(chapterBody)) !== null) {
      footnoteRefs.add(fnRefMatch[1]);
    }

    // Find all reference-style link usages (e.g., [text][ref-id])
    const refLinkUsages = new Set<string>();
    const refUsageRegex = /\]\[([\w-]+)\]/g;
    let refUsageMatch;
    while ((refUsageMatch = refUsageRegex.exec(chapterBody)) !== null) {
      refLinkUsages.add(refUsageMatch[1]);
    }

    // Build footnote section for this chapter
    const footnoteLines: string[] = [];
    for (const fnId of footnoteRefs) {
      const def = footnoteDefinitions.get(fnId);
      if (def) {
        footnoteLines.push("");
        footnoteLines.push(...def);
      }
    }

    // Build reference links section for this chapter
    const refLinkLines: string[] = [];
    // Also collect ref links used in footnote definitions
    for (const fnId of footnoteRefs) {
      const def = footnoteDefinitions.get(fnId);
      if (def) {
        const defText = def.join("\n");
        const innerRefRegex = /\]\[([\w-]+)\]/g;
        let innerMatch;
        while ((innerMatch = innerRefRegex.exec(defText)) !== null) {
          refLinkUsages.add(innerMatch[1]);
        }
      }
    }

    for (const refId of refLinkUsages) {
      const url = refLinks.get(refId);
      if (url) {
        refLinkLines.push(`[${refId}]: ${url}`);
      }
    }

    // Assemble the full chapter markdown
    let fullMarkdown = chapterBody;
    if (footnoteLines.length > 0) {
      fullMarkdown += "\n" + footnoteLines.join("\n");
    }
    if (refLinkLines.length > 0) {
      fullMarkdown += "\n\n" + refLinkLines.join("\n");
    }

    const fullTitle = `${start.chapterNumber}. ${start.title}`;
    chapters.push({
      chapterNumber: start.chapterNumber,
      title: start.title,
      slug: normalizeSlug(fullTitle),
      markdownBody: fullMarkdown,
    });
  }

  return chapters;
}
