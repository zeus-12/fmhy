import scrapeBase64AndAddToDb from "./base64";
import scrapeAndAddToDb from "./wiki";

const main = async () => {
  await scrapeAndAddToDb();
  await scrapeBase64AndAddToDb();
};

main().catch((err) => console.error(err.message));
