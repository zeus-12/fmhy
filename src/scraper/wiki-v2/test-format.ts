import fs from "fs";
import wiki from "./wiki.json";

const linkRegex = /https?:\/\/[^\s]+/;
// @ts-ignore
const res = [];

(wiki as any[]).map((item: any) => {
  if (!linkRegex.test(item.content)) {
    res.push(item);
  }
});

// check how many of these dont have both subcat, subsubcat
// also, separately(or use this istelf) index all the subcat, subsubcats, and display it in the UI

fs.writeFileSync(
  "src/scraper/wiki-v2/test-format.json",
  // @ts-ignore
  JSON.stringify(res)
);
