import type { Node } from "hast";

export interface ImgNode extends Node {
  type: "element";
  tagName: "img";
  properties: {
    src: string;
  };
}

export function isImg(node: Node | undefined): node is ImgNode {
  if (node === undefined) {
    return false;
  }
  if (!(node.type === "element" && "tagName" in node)) {
    return false;
  }
  if (node.tagName !== "img") {
    return false;
  }
  return true;
}
