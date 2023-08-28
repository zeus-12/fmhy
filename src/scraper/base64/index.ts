import { devLog } from "@/lib/utils";
import { addBase64LinksToDb, removeAllBase64LinksFromDb } from "./db";
import { base64_scraper } from "./scraper";

const scrapeBase64AndAddToDb = async () => {
  devLog("---DELETING OLD LINKS----");
  await removeAllBase64LinksFromDb();

  devLog("---SCRAPING BASE64 LINKS----");
  const data = await base64_scraper();

  devLog("---WRITING " + data.length + " LINKS TO DB----");

  await addBase64LinksToDb(data);
  devLog("---DONE WRITING BASE64 LINKS----");
};

export default scrapeBase64AndAddToDb;
