import fs from "fs";
import wiki from "./wiki.json";
import { DlWikiLinkType } from "@/scraper/wiki-v2/dl-wiki";

const linkRegex = /https?:\/\/[^\s]+/;
const missingLinksInContent: DlWikiLinkType[] = [];

(wiki as DlWikiLinkType[]).map((item) => {
  if (!linkRegex.test(item.content)) {
    missingLinksInContent.push(item);
  }
});

// also, separately(or use this istelf) index all the subcat, subsubcats, and display it in the UI

const missingBothSubcatSubsubcat = (wiki as DlWikiLinkType[]).filter(
  (item) => !item.subcategory && !item.subsubcategory
);

fs.writeFileSync(
  "src/scraper/wiki-v2/missing-both-subcat-and-subsubcat.json",
  // @ts-ignore
  JSON.stringify(missingBothSubcatSubsubcat)
);
const missingSubcat = (wiki as DlWikiLinkType[]).filter(
  (item) => !item.subcategory
);

fs.writeFileSync(
  "src/scraper/wiki-v2/missing-subcat.json",
  // @ts-ignore
  JSON.stringify(missingSubcat)
);

fs.writeFileSync(
  "src/scraper/wiki-v2/missing-links-in-content.json",
  // @ts-ignore
  JSON.stringify(missingLinksInContent)
);
