import { NextRequest } from "next/server"
import ScrapeWikiScript from "@/scraper/dl-wiki"

export default async function handler(req: NextRequest) {
  ScrapeWikiScript()

  return true
}
