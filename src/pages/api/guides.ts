import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const guides = await prisma.guides.findMany();

      res.status(200).json({ data: guides });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  } else if (req.method === "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
