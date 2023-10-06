import fs from "fs";
import { MARKDOWN_RESOURCES } from "@/lib/CONSTANTS";

const data = Promise.all(
  MARKDOWN_RESOURCES.filter((resource) => resource.dlForSearch).map(
    (resource) => {
      return dlWikiChunk(resource.urlEnding, resource.emoji);
    }
  )
);

data.then((results) => {
  const combined = results.join("\n");
  const jsonData = JSON.stringify({ data: combined });
  fs.writeFileSync("src/scraper/wiki-v2/data.json", jsonData);
});

async function dlWikiChunk(urlEnding: string, icon: string): Promise<string> {
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/nbats/FMHYedit/main/${urlEnding}.md`
    );

    const data = await res.text();

    const preText = `[${icon}](https://www.fmhy.net/${urlEnding}) `;

    const lines = data.split("\n");
    const updatedLines = addPretext(lines, preText);

    return updatedLines.join("\n");
  } catch (err: any) {
    console.log("Error fetching data", err.message);
    return "";
  }
}

function addPretext(lines: string[], preText: string): string[] {
  for (let i = 0; i < lines.length; i++) {
    lines[i] = preText + lines[i];
  }
  return lines;
}
