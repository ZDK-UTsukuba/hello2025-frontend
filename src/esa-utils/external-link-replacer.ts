import { visit } from "unist-util-visit";
import type { Node } from "hast";
import { isAnchor, type AnchorNode } from "./nodes";

function isExternalLink(href: string): boolean {
  /**
   * @see https://docs.astro.build/ja/guides/environment-variables/
   */
  if (href.startsWith(import.meta.env.SITE)) {
    return false;
  }
  return true;
}

export function externalLinkReplacer() {
  const externalLinkNodes: AnchorNode[] = [];
  return async (tree: Node) => {
    visit(tree, (node) => {
      if (isAnchor(node)) {
        const { properties } = node;
        if (isExternalLink(properties.href)) {
          externalLinkNodes.push(node);
        }
      }
    });

    for (const node of externalLinkNodes) {
      const { properties } = node;
      properties.target = "_blank";
    }
  };
}
