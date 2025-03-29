import { unified } from "unified";
import type { Post } from "./models";
import rehypeParse from "rehype-parse";
import { find } from "unist-util-find";
import { optimizeImage } from "./optimize-image";
import { isImg } from "./nodes";

export function getFirstImg(post: Post): Promise<string> | undefined {
  const hast = unified().use(rehypeParse).parse(post.body_html);
  const imgNode = find(hast, { type: "element", tagName: "img" });
  if (isImg(imgNode)) {
    return optimizeImage(imgNode.properties.src, true, 400);
  } else {
    return undefined;
  }
}
