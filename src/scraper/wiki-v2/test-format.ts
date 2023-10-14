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

fs.writeFileSync(
  "src/scraper/wiki-v2/missing-links-in-content.json",
  JSON.stringify(missingLinksInContent)
);

// also, separately(or use this istelf) index all the subcat, subsubcats, and display it in the UI

const missingBothSubcatSubsubcat = (wiki as DlWikiLinkType[]).filter(
  (item) => !item.subcategory && !item.subsubcategory
);

fs.writeFileSync(
  "src/scraper/wiki-v2/missing-both-subcat-and-subsubcat.json",
  JSON.stringify(missingBothSubcatSubsubcat)
);
const missingSubcat = (wiki as DlWikiLinkType[]).filter(
  (item) => !item.subcategory
);

fs.writeFileSync(
  "src/scraper/wiki-v2/missing-subcat.json",
  JSON.stringify(missingSubcat)
);
const doesntStartWithAstrisk = (wiki as DlWikiLinkType[]).filter(
  (item) => !item.content.startsWith("*")
);

fs.writeFileSync(
  "src/scraper/wiki-v2/doesnt-start-with-asterisk.json",
  JSON.stringify(doesntStartWithAstrisk)
);
