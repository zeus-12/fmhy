import * as cheerio from "cheerio";
import fetch from "node-fetch";
// import fs from "fs";
// import { LinkType } from "./types";

export let currentEle = (tag: string, data: any) => data.is(tag);

export const prettifyTitle = (data: any, textToRemove: string) => {
  return data.text().replaceAll(textToRemove, "");
};

export const getCheerioDocument = async (urlEnding: string) => {
  const res = await fetch(
    `https://github.com/nbats/FMHYedit/blob/main/${urlEnding}.md`
  );

  const data = (await res.json()) as any;
  const text = data?.payload?.blob?.richText;
  if (!text) {
    throw new Error("No text found");
  }

  const $ = cheerio.load(text);

  var markdown = $(".markdown-body").children();
  return { $, markdown };
};

// export const logLinks = (data: LinkType[]) => {
//   fs.writeFileSync(
//     `./src/links-scraped/${Date.now()}.json`,
//     JSON.stringify(data)
//   );
// };
