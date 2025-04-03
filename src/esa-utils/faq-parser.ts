import type { Heading, Node, Paragraph, Root, RootContent, Text } from "mdast";
import type { Faq } from "./models";
import { unified } from "unified";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { imageReplacer } from "./image-replacer";
import { externalLinkReplacer } from "./external-link-replacer";

function isH2(node: RootContent): node is Heading {
  return node.type === "heading" && node.depth === 2;
}

function isText(node: Node): node is Text {
  return node.type === "text";
}

function getString(node: Heading | Paragraph): string {
  return node.children
    .filter((node) => isText(node))
    .map((text) => text.value)
    .join("");
}

export async function parseFaqs(ast: Root): Promise<Faq[]> {
  const faqs: Faq[] = [];

  for (let i = 0; i < ast.children.length; ) {
    const question = ast.children[i];
    if (!isH2(question)) {
      console.error("Expected h2, but got", question);
      i++;
      continue;
    }
    i++;
    // 質問文となる h2 が見つかった
    const answerNodes: RootContent[] = [];
    while (i < ast.children.length) {
      const node = ast.children[i];
      if (isH2(node)) {
        // 次の h2 が見つかった
        break;
      }
      answerNodes.push(node);
      i++;
    }
    const answerRoot: Root = {
      type: "root",
      children: answerNodes,
    };
    const answerHast = await unified()
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(imageReplacer)
      .use(externalLinkReplacer)
      .run(answerRoot);
    const answerHtml = unified()
      .use(rehypeStringify, { allowDangerousHtml: true })
      .stringify(answerHast);
    faqs.push({
      question: getString(question),
      answerHtml,
    });
  }
  return faqs;
}
