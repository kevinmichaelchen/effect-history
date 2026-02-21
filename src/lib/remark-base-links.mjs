/**
 * Remark plugin that prepends the Astro base path to internal links.
 * Internal links start with "/" but not "//" (protocol-relative).
 */
import { visit } from "unist-util-visit";

const BASE = "/effect-history";

export default function remarkBaseLinks() {
  return (tree) => {
    visit(tree, "link", (node) => {
      if (
        typeof node.url === "string" &&
        node.url.startsWith("/") &&
        !node.url.startsWith("//") &&
        !node.url.startsWith(BASE)
      ) {
        node.url = BASE + node.url;
      }
    });
  };
}
