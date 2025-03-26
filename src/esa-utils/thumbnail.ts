import { unified } from "unified";
import type { Post } from "./models";
import rehypeParse from "rehype-parse";
import { find } from "unist-util-find";
import type { Node } from "hast";
import { optimizeImage } from "./download-image";

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

export function getFirstImg(post: Post): Promise<string> | undefined {
  const hast = unified().use(rehypeParse).parse(post.body_html);
  const imgNode = find(hast, { type: "element", tagName: "img" });
  if (isImg(imgNode)) {
    return optimizeImage(imgNode.properties.src, true);
  } else {
    return undefined;
  }
}
