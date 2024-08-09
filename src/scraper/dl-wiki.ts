import { MARKDOWN_RESOURCES } from "@/lib/constants";
import fs from "fs";
import fetch from "node-fetch";

const ScrapeWikiScript = () => {
  const urls: string[] = [];
  MARKDOWN_RESOURCES.forEach((resource) => {
    if (!resource.dlForSearch) {
      return;
    }
    if (resource.hasSubItems) {
      resource.items?.forEach((subItem) => {
        if (!subItem.dlForSearch) {
          return;
        }
        urls.push(subItem.urlEnding);
      });
      return;
    }

    return urls.push(resource.urlEnding);
  });

  const data = Promise.all(
    urls.map((url) => {
      return dlWikiChunk(url);
    }),
  );

  data.then((arrayOfArrays) => {
    const mergedArray: DlWikiLinkType[] = arrayOfArrays.reduce(
      (accumulator, currentArray) => {
        return accumulator.concat(currentArray);
      },
      [],
    );

    fs.writeFileSync("src/scraper/wiki.json", JSON.stringify(mergedArray));
  });
};

export interface DlWikiLinkType {
  category: string;
  subcategory: string;
  subsubcategory: string;
  content: string;
  isStarred: boolean;
}

const ignoreList = ["", "***", "***\r", "\r", "****"];

const ignoreStarters = [
  "* **Note**",
  "**Note**",
  "**Warning**",
  "**[Table of Contents]",
  "**[◄◄ Back to Wiki Index]",
  "**Use [redirect bypassers]",
];

async function dlWikiChunk(urlEnding: string): Promise<DlWikiLinkType[]> {
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/nbats/FMHYedit/main/docs/${urlEnding}.md`,
    );

    const data = await res.text();

    let stringList = data.split("\n");

    const items = [];
    let curSubCategory = "";
    let curSubSubcategory = "";

    for (let item of stringList) {
      item = item.trim();
      if (ignoreList.includes(item)) {
        continue;
      }

      if (ignoreStarters.some((ignore) => item.startsWith(ignore))) {
        continue;
      }

      if (
        item.startsWith("# ►") ||
        (item.startsWith("## ") && urlEnding === "STORAGE")
      ) {
        curSubCategory = item;
        curSubSubcategory = "";
        continue;
      } else if (
        item.startsWith("## ▷") ||
        (item.startsWith("### ") && urlEnding === "STORAGE")
      ) {
        curSubSubcategory = item;
        continue;
      }
      let isStarred = false;

      if (item.includes("⭐")) {
        item = item.replace("⭐", "");
        isStarred = true;
      }

      items.push({
        category: urlEnding,
        subcategory: curSubCategory
          .replaceAll("#", "")
          .replaceAll("►", "")
          .trim(),
        subsubcategory: curSubSubcategory
          .replaceAll("#", "")
          .replaceAll("▷", "")
          .trim(),
        content: item.replace("\r", ""),
        isStarred,
      });
    }

    return items;
  } catch (err: any) {
    throw new Error("Issue fetching data::: ", err.message);
  }
}

export default ScrapeWikiScript;
