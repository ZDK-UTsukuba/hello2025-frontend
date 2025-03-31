import type { Doctype, Element, ElementContent, Root, RootContent } from "hast";
import { isDetailsEnd, isDetailsStart } from "./nodes";
import { visitParents } from "unist-util-visit-parents";

function isDoctype(node: RootContent): node is Doctype {
  return node.type === "doctype";
}

function createDetailsContentDivNode(
  children: Exclude<RootContent, Doctype>[],
): RootContent {
  return {
    type: "element",
    tagName: "div",
    properties: {
      className: ["details-content"],
    },
    children: children,
  };
}

/**
 * <details> の中身を <div class="details-content"> で囲む
 */
export function detailsContentMarker() {
  const detailsPairs: {
    parent: Element | Root;
    start: ElementContent;
    end: ElementContent;
  }[] = [];
  return async (tree: Root) => {
    visitParents(tree, (node, ancestors) => {
      if (isDetailsStart(node)) {
        const parent = ancestors[ancestors.length - 1];
        const startIdx = parent.children.indexOf(node);
        // find first </details> after <details>
        let detailsEnd: ElementContent | undefined;
        for (let i = startIdx + 1; i < parent.children.length; i++) {
          const child = parent.children[i];
          if (isDetailsEnd(child)) {
            detailsEnd = child;
            break;
          }
        }
        if (!detailsEnd) {
          return;
        }
        detailsPairs.push({
          parent: parent,
          start: node,
          end: detailsEnd,
        });
      }
    });
    detailsPairs.reverse();
    for (const { parent, start, end } of detailsPairs) {
      const startIdx = parent.children.indexOf(start);
      const endIdx = parent.children.indexOf(end);
      const children = parent.children
        .slice(startIdx + 1, endIdx)
        .filter(
          (child): child is Exclude<RootContent, Doctype> => !isDoctype(child),
        );
      const detailsContentDivNode = createDetailsContentDivNode(children);
      // wrap <details> content with <div class="details-content">
      parent.children.splice(
        startIdx + 1,
        endIdx - startIdx - 1,
        detailsContentDivNode,
      );
    }
  };
}
