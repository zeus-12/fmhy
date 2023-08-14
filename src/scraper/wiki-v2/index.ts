// 1st method

// import data from "./wiki-one-page.txt";
// import fs from "fs";

// const split = data
//   .split("\n")
//   .filter((line: string) => line.startsWith("* "))
//   .filter(Boolean);

// fs.writeFileSync("./res.txt", split.join("\n"));

// console.log(split);

// ##########################################################
// 2nd method

// import { readFileSync, writeFileSync } from "fs";

// interface ListItem {
//   title: string;
//   category: string;
//   subcategory: string;
//   links: string[];
//   isStarred: boolean;
// }

// const markdownData = readFileSync("src/scrapers/wiki-v2/data.md", "utf8");

// const items: ListItem[] = [];
// let currentItem: ListItem | null = null;

// let category, subcategory;
// let count = 0;
// for (const line of markdownData.split("\n")) {
//   if (line.startsWith("# ►")) {
//     category = line.replace("# ►", "").trim();
//   }

//   if (line.startsWith("## ▷")) {
//     //   this maybe a reddit link
//     subcategory = line.replace("## ▷", "").trim();
//   }

//   if (
//     line.replaceAll(" ", "").length === 0 ||
//     line.startsWith("---") ||
//     line.startsWith("## ▷") ||
//     line.startsWith("# ►")
//   ) {
//     continue;
//   }

//   if (!category || !subcategory || !line.startsWith("-")) {
//     console.log("NOT FOUND ", line);
//     continue;
//   }

//   currentItem = {
//     title: "",
//     subcategory,
//     category,
//     links: [],
//     isStarred: false,
//   };

//   if (line.includes("⭐")) {
//     currentItem.isStarred = true;
//   }

//   if (line.startsWith("-")) {
//     const text = line
//       .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
//       .slice(1)
//       .replace("⭐", "")
//       .replaceAll("**", "")
//       .trim();

//     // Extract the array of links
//     const linkRegex = /\((https?:\/\/[^)]+)\)/g; // Matches (link)
//     const linkMatches = Array.from(line.matchAll(linkRegex));
//     const linkArray = linkMatches.map((match) => match[1]);
//     count += linkArray.length;

//     if (text && linkArray && linkArray.length > 0) {
//       currentItem.title = text;
//       currentItem.links = linkArray;
//     } else {
//       console.log("text", text, "links", linkArray);
//       continue;
//     }
//   }

//   items.push(currentItem);
// }

// const jsonData = JSON.stringify(items, null, 2);
// writeFileSync("./src/scrapers/wiki-v2/res.json", jsonData);
// console.log("count", count);
