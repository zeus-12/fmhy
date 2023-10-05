import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { SEARCH_RESULTS_PER_PAGE } from "@/lib/CONSTANTS";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { q, nsfw, page } = req.query as {
    q: string;
    nsfw: string;
    page: string;
  };

  if (!q) {
    return res.status(400).json({ message: "Missing query", error: true });
  }

  const parsedPage = parseInt(page) || 1;
  const parsedNsfw = nsfw === "true" ? true : false;

  const searchWhereQuery = {
    title: {
      contains: q,
    },
    nsfw: parsedNsfw,
  };

  const [results, count] = await prisma.$transaction([
    prisma.wiki.findMany({
      where: searchWhereQuery,
      skip: (parsedPage - 1) * SEARCH_RESULTS_PER_PAGE,
      take: SEARCH_RESULTS_PER_PAGE,
    }),
    prisma.wiki.count({
      where: searchWhereQuery,
    }),
  ]);

  res.status(200).json({ data: results, count });
}
