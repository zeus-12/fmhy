import fs from "fs";
import wiki from "./wiki.json";
import { DlWikiLinkType } from "@/scraper/dl-wiki";

const writeToFile = (data: any, fileName: string) => {
  try {
    fs.writeFileSync(`src/scraper/${fileName}.json`, JSON.stringify(data));
  } catch (err: any) {
    console.log(err.message);
  }
};

const getItemsWithMissingLinksInContent = () => {
  const linkRegex = /https?:\/\/[^\s]+/;
  const missingLinksInContent: DlWikiLinkType[] = [];

  (wiki as DlWikiLinkType[]).map((item) => {
    if (!linkRegex.test(item.content)) {
      missingLinksInContent.push(item);
    }
  });

  writeToFile(missingLinksInContent, "missing-links-in-content");
};

// add all categories and subcategories as entries to the search

const getItemsMissingBothCatAndSubcat = () => {
  const missingBothSubcatSubsubcat = (wiki as DlWikiLinkType[]).filter(
    (item) => !item.subcategory && !item.subsubcategory
  );
  writeToFile(missingBothSubcatSubsubcat, "missing-both-cat-and-subcat");
};

const getItemsMissingSubCat = () => {
  const missingSubcat = (wiki as DlWikiLinkType[]).filter(
    (item) => !item.subcategory
  );

  writeToFile(missingSubcat, "missing-subcat");
};

const getItemsWithContentNotStartingWithAsterisk = () => {
  const doesntStartWithAstrisk = (wiki as DlWikiLinkType[]).filter(
    (item) => !item.content.startsWith("*")
  );

  writeToFile(doesntStartWithAstrisk, "doesnt-start-with-asterisk");
};

getItemsWithMissingLinksInContent();
getItemsMissingBothCatAndSubcat();
getItemsMissingSubCat();
getItemsWithContentNotStartingWithAsterisk();
