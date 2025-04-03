import type { Node } from "hast";

export interface ImgNode extends Node {
  type: "element";
  tagName: "img";
  properties: {
    src: string;
    width?: number;
    height?: number;
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

export interface DetailsNode extends Node {
  type: "raw";
  value: string;
}

export function isDetailsStart(node: Node | undefined): node is DetailsNode {
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

export function isDetailsEnd(node: Node | undefined): node is DetailsNode {
  if (node === undefined) {
    return false;
  }
  if (
    !(node.type === "raw" && "value" in node && typeof node.value === "string")
  ) {
    return false;
  }
  if (!node.value.includes("</details>")) {
    return false;
  }
  return true;
}

export interface AnchorNode extends Node {
  type: "element";
  tagName: "a";
  properties: {
    href: string;
    target?: string;
    rel?: string;
  };
}

export function isAnchor(node: Node | undefined): node is AnchorNode {
  if (node === undefined) {
    return false;
  }
  if (!(node.type === "element" && "tagName" in node)) {
    return false;
  }
  if (node.tagName !== "a") {
    return false;
  }
  return true;
}
