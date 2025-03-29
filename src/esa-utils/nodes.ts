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

export function isDetails(node: Node | undefined): node is ImgNode {
  if (node === undefined) {
    return false;
  }
  if (
    !(node.type === "raw" && "value" in node && typeof node.value === "string")
  ) {
    return false;
  }
  if (!node.value.includes("<details>")) {
    return false;
  }
  return true;
}
