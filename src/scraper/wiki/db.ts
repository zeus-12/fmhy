import { LinkType } from "../utils/types";
import prisma from "@/lib/prisma";

export const addLinksToDb = async (data_: LinkType[]) => {
  console.log("ading duh links");
  await prisma.wiki.createMany({
    data: data_
      .filter((item) => item?.link?.length > 0)
      .map((item) => {
        return {
          title: item.title,
          starred: item.starred,
          link: JSON.stringify(item.link),
          nsfw: item.isNsfw,
        };
      }),
  });
};

export const removeAllWikiLinksFromDb = async () => {
  await prisma.wiki.deleteMany({});
};
