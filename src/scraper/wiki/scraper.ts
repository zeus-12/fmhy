import * as cheerio from "cheerio";
import { currentEle, getCheerioDocument, prettifyTitle } from "../utils/helper";
import { CategoryType, LinkType } from "../utils/types";

async function get_links(
  $: cheerio.CheerioAPI,
  children: cheerio.Cheerio<cheerio.Element>,
  i: number,
  urlEnding: string
) {
  let res: LinkType[] = [];
  let nextUl = $(children[i]).next("ul");
  let curLi = $(nextUl).children("li");

  curLi.each((_, element) => {
    let item: LinkType = {
      title: "",
      link: [],
      starred: false,
      isNsfw: false,
    };

    let title = $(element).text();
    if (title.includes("⭐ ")) {
      item.starred = true;
    }

    item.title = prettifyTitle($(element), "⭐ ");

    item.isNsfw = urlEnding === "NSFWPiracy";

    // for bolded links
    $(element)
      .children("strong")
      .children("a")
      .each((_: number, element: cheerio.Element) => {
        let link = $(element).attr("href");
        if (link) item.link.push(link);
      });

    $(element)
      .children("a")
      .each((_: number, element: cheerio.Element) => {
        let link = $(element).attr("href");
        if (link) item.link.push(link);
      });

    res.push(item);
  });

  return res;
}

// isShort === true ? return data in LinkType[] ,else return data in CategoryType[]

export default async function scrape(urlEnding: string, isShort: boolean) {
  const { $, markdown } = await getCheerioDocument(urlEnding);

  let finalData: any = [];

  let i = 0;

  if (isShort) {
    while (i < markdown.length) {
      if (
        currentEle("h1", $(markdown[i])) ||
        currentEle("h2", $(markdown[i]))
      ) {
        let temp = await get_links($, markdown, i, urlEnding);
        finalData = finalData.concat(temp);
      }
      i += 1;
    }
  } else {
    while (i < markdown.length) {
      let res: CategoryType = { title: "", links: [], subCategory: [] };

      if (currentEle("h1", $(markdown[i]))) {
        let temp = await get_links($, markdown, i, urlEnding);
        res.title = prettifyTitle($(markdown[i]), "► ");

        res.links = temp;

        i += 1;

        while (!currentEle("h1", $(markdown[i])) && i < markdown.length) {
          if (currentEle("h2", $(markdown[i]))) {
            let temp = await get_links($, markdown, i, urlEnding);

            res.subCategory.push({
              title: prettifyTitle($(markdown[i]), "▷ "),
              links: temp,
            });
          }
          i += 1;
        }

        finalData.push(res);
      } else {
        i += 1;
      }
    }
  }

  return finalData;
}

export async function storage_scraper(isShort: boolean) {
  const { $, markdown } = await getCheerioDocument("STORAGE");

  let finalData: any = [];

  let i = 0;
  if (isShort) {
    while (i < markdown.length) {
      if (currentEle("h4", $(markdown[i]))) {
        let data: any = [];

        const categoryName = $(markdown[i]).text();

        let nextP = $(markdown[i]).next("p");

        $(nextP)
          .children()
          .each((_: number, element: cheerio.Element) => {
            const cur: LinkType = {
              title: "",
              link: [],
              isNsfw: false,
              starred: false,
            };

            cur.title = categoryName + " " + $(element).text();
            // @ts-ignore
            cur.link = [$(element).attr("href")];

            if (cur.title.includes("⭐ ")) {
              cur.starred = true;
            }

            data.push({ ...cur });
          });

        if (data.length === 0) {
          console.log("no data found for " + categoryName);
          console.log("nextP: " + nextP.toString());
          return;
        } else {
          console.log(data);
          finalData = finalData.concat([...data]);
        }
      }

      i += 1;
    }
  }

  if (finalData.length > 0) {
    console.log(finalData.length);
    // logLinks(finalData);
  }
}
