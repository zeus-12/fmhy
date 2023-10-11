import fs from "fs";
import { MARKDOWN_RESOURCES } from "@/lib/CONSTANTS";
import fetch from "node-fetch";

const data = Promise.all(
  MARKDOWN_RESOURCES.filter((resource) => resource.dlForSearch).map(
    (resource) => {
      return dlWikiChunk(resource.urlEnding, resource.emoji);
    }
  )
);

data.then((arrayOfArrays) => {
  const mergedArray: DlWikiLinkType[] = arrayOfArrays.reduce(
    (accumulator, currentArray) => {
      // Use concat or push to merge the current array into the accumulator
      return accumulator.concat(currentArray);
    },
    []
  );

  fs.writeFileSync(
    "src/scraper/wiki-v2/wiki.json",
    JSON.stringify(mergedArray)
  );
});

export interface DlWikiLinkType {
  category: string;
  subcategory: string;
  subsubcategory: string;
  content: string;
  isStarred: boolean;
}

const ignoreList = [
  "",
  "***",
  "***\r",
  "\r",
  "**[◄◄ Back to Wiki Index](https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/index)**",
  "**[◄◄ Back to Wiki Index](https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/index)**\r",
  "**[Table of Contents](https://ibb.co/SNGCnLP)** - For mobile users",
  "**[Table of Contents](https://ibb.co/FndFxzS)** - For mobile users\r",
];

async function dlWikiChunk(
  urlEnding: string,
  icon: string
): Promise<DlWikiLinkType[]> {
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/nbats/FMHYedit/main/${urlEnding}.md`
    );

    const data = await res.text();

    let stringList = data.split("\n");

    const items = [];
    let curSubCategory = "";
    let curSubSubcategory = "";

    for (let item of stringList) {
      if (ignoreList.includes(item)) {
        continue;
      }
      if (item.startsWith("# ►")) {
        curSubCategory = item;
        curSubSubcategory = "";
        continue;
      } else if (
        item.startsWith("## ▷") ||
        (item.startsWith("### ▷") && urlEnding === "STORAGE")
      ) {
        curSubSubcategory = item;
        continue;
      }
      let isStarred = false;

      if (item.includes("⭐")) {
        item = item.replace("⭐", "");
        isStarred = true;
      }

      // replace reddit links with fmhy links
      items.push({
        category: urlEnding,
        subcategory: curSubCategory.replace("# ►", "").trim(),
        subsubcategory: curSubSubcategory.replace("## ▷", "").trim(),
        content: item.replace("\r", ""),
        isStarred,
      });
    }

    return items;
  } catch (err: any) {
    console.log("Error fetching data", err.message);
    return [];
  }
}
