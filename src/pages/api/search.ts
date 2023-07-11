import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const ITEMS_PER_PAGE = 30;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { query, nsfw, page } = req.query as {
    query: string;
    nsfw: string;
    page: string;
  };

  const parsedPage = parseInt(page) || 1;
  const parsedNsfw = nsfw === "true" ? true : false;

  const results = await prisma.wiki.findMany({
    where: {
      // OR: [
      // {
      title: {
        contains: query,
        // mode: Prisma.QueryMode.insensitive,
      },
      // },
      // {
      //   link: {
      //     contains: query,
      //   },
      // },
      // ],
      nsfw: parsedNsfw,
    },
    skip: (parsedPage - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
  });

  const count = await prisma.wiki.count({
    where: {
      OR: [
        {
          title: {
            contains: query,
          },
        },
        {
          link: {
            contains: query,
          },
        },
      ],
      nsfw: parsedNsfw,
    },
  });

  res.status(200).json({ data: results, count });
}
