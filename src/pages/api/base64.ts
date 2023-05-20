import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const links = await prisma.base64.findMany();
      return res.status(200).json({ data: links });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
