import { addBase64LinksToDb, removeAllBase64LinksFromDb } from "./db";
import { base64_scraper } from "./scraper";

const scrapeBase64AndAddToDb = async () => {
  console.log("---DELETING OLD LINKS----");
  await removeAllBase64LinksFromDb();

  console.log("---SCRAPING BASE64 LINKS----");
  const data = await base64_scraper();

  console.log("---WRITING " + data.length + " LINKS TO DB----");

  await addBase64LinksToDb(data);
  console.log("---DONE WRITING BASE64 LINKS----");
};

export default scrapeBase64AndAddToDb;
