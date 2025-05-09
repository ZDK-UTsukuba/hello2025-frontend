import { visit } from "unist-util-visit";
import { optimizeImage } from "./optimize-image";
import type { Node } from "hast";
import { isImg, type ImgNode } from "./nodes";

export function imageReplacer() {
  const imageNodes: ImgNode[] = [];
  return async (tree: Node) => {
    visit(tree, (node) => {
      if (isImg(node)) {
        imageNodes.push(node);
      }
    });

    await Promise.all(
      imageNodes.map(async (node) => {
        const filepath = await optimizeImage(node.properties.src);
        node.properties.src = filepath.src;
        node.properties.width = filepath.attributes.width;
        node.properties.height = filepath.attributes.height;
      }),
    );
  };
}
