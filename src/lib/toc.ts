// @ts-nocheck

import { toc } from "mdast-util-toc";
import { remark } from "remark";
import { visit } from "unist-util-visit";
import GithubSlugger from "github-slugger";
import { removeSlashesForToc } from "@/lib/wiki/utils";

const textTypes = ["text", "emphasis", "strong", "inlineCode"];

function flattenNode(node) {
  const p = [];
  visit(node, (node) => {
    if (!textTypes.includes(node.type)) return;
    p.push(node.value);
  });
  return p.join(``);
}

interface Item {
  title: string;
  url: string;
  items?: Item[];
}

interface Items {
  items?: Item[];
}

function getItems(node, current, slugger): Items {
  if (!node) {
    return {};
  }

  if (node.type === "paragraph") {
    visit(node, (item) => {
      if (item.type === "link") {
        current.title = flattenNode(node);
        current.url = "#" + slugger.slug(removeSlashesForToc(current.title));
      }

      if (item.type === "text") {
        current.title = flattenNode(node);
      }
    });

    return current;
  }

  if (node.type === "list") {
    current.items = node.children.map((i) => getItems(i, {}, slugger));

    return current;
  } else if (node.type === "listItem") {
    const heading = getItems(node.children[0], {}, slugger);

    if (node.children.length > 1) {
      getItems(node.children[1], heading, slugger);
    }

    return heading;
  }

  return {};
}

const getToc = () => (node, file) => {
  const table = toc(node);
  const slugger = new GithubSlugger();

  file.data = getItems(table.map, {}, slugger);
};

export type TableOfContents = Items;

export async function getTableOfContents(
  content: string
): Promise<TableOfContents> {
  const result = await remark().use(getToc).process(content);

  return result.data;
}
