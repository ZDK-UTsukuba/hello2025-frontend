import { visit } from "unist-util-visit";
import { downloadAndSave } from "./download-image";
import type { Node } from "unist";

export function imageReplacer() {
  const imageNodes: { node: Node; originalUrl: string }[] = [];
  return async (tree: Node) => {
    visit(tree, (node) => {
      if (
        node.type === "image" &&
        "url" in node &&
        typeof node.url === "string"
      ) {
        // ![]() の md形式の画像
        imageNodes.push({ node, originalUrl: node.url });
      } else if (
        node.type === "html" &&
        "value" in node &&
        typeof node.value === "string"
      ) {
        if (node.value.startsWith("<details")) {
          // メニューなど
        } else if (node.value.startsWith("<img")) {
          // 画像
          throw new Error("記事にはmd形式で画像を置いてください。");
        } else {
          // 他のHTML
          console.error("details以外のhtmlが使用されています。");
        }
      }
    });

    await Promise.all(
      imageNodes.map(async ({ node, originalUrl }) => {
        const filepath = await downloadAndSave(originalUrl);
        if ("url" in node && typeof node.url === "string") {
          node.url = filepath;
        }
      }),
    );
  };
}
