import fs from "fs";
import data from "./wiki.json";

const newData = data.map((item, idx) => ({
  id: String(idx),
  content: item.content + " | " + item.subcategory + " | " + item.category,
}));

// write newData as json to file
fs.writeFileSync("src/scraper/wiki-formatted.json", JSON.stringify(newData));
