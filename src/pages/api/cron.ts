import ScrapeWikiScript from "@/scraper/dl-wiki";
import { NextRequest } from "next/server";

export default async function handler(req: NextRequest) {
  ScrapeWikiScript();

  return true;
}
