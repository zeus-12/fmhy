import { devLog } from "@/lib/utils";
import axios from "axios";
import fs from "fs";

Promise.all([
  dlWikiChunk("VideoPiracyGuide.md", "📺", "video"),
  dlWikiChunk("AI.md", "🤖", "ai"),
  dlWikiChunk("Android-iOSGuide.md", "📱", "android"),
  dlWikiChunk("AudioPiracyGuide.md", "🎵", "audio"),
  dlWikiChunk("DownloadPiracyGuide.md", "💾", "download"),
  dlWikiChunk("EDUPiracyGuide.md", "🧠", "edu"),
  dlWikiChunk("GamingPiracyGuide.md", "🎮", "games"),
  dlWikiChunk("AdblockVPNGuide.md", "📛", "adblock-vpn-privacy"),
  dlWikiChunk("TOOLSGuide.md", "🔧", "tools-misc"),
  dlWikiChunk("MISCGuide.md", "📂", "misc"),
  dlWikiChunk("ReadingPiracyGuide.md", "📗", "reading"),
  dlWikiChunk("TorrentPiracyGuide.md", "🌀", "torrent"),
  dlWikiChunk("img-tools.md", "📷", "img-tools"),
  dlWikiChunk("LinuxGuide.md", "🐧🍏", "linux"),
  dlWikiChunk("DEVTools.md", "🖥️", "dev-tools"),
  dlWikiChunk("Non-English.md", "🌏", "non-eng"),
  dlWikiChunk("STORAGE.md", "🗄️", "storage"),
  dlWikiChunk(
    "NSFWPiracy.md",
    "🌶",
    "https://saidit.net/s/freemediafuckyeah/wiki/index"
  ),
]);

async function dlWikiChunk(
  fileName: string,
  icon: string,
  subURL: string
): Promise<void> {
  let lines: string[];
  // first, try to get the chunk locally
  try {
    // First, try to get it from the local file
    devLog(`Loading ${fileName} from local file...`);
    // const response = await axios.get(`src/scraper/wiki-v2/data/${fileName}`);
    const response = fs.readFileSync(
      `src/scraper/wiki-v2/data/${fileName}`,
      "utf8"
    );

    lines = response.split("\n");
    devLog("exists on file.");
  } catch {
    devLog(`Local file not found. Downloading ${fileName} from Github...`);
    const response = await axios.get(
      `https://raw.githubusercontent.com/nbats/FMHYedit/main/${fileName}`
    );

    // save data locally
    devLog(`Saving ${fileName} locally...`);
    fs.writeFileSync(`src/scraper/wiki-v2/data/${fileName}`, response.data);

    lines = response.data.split("\n");
    devLog("Downloaded and saved locally.");
  }

  // add a pretext
  // let preText = "";
  // if (fileName !== "NSFWPiracy.md") {
  //   preText = `[${icon}](https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/${subURL}) `;
  // } else {
  //   preText = `[${icon}](${subURL}) `;
  // }
  // lines = addPretext(lines, preText);

  // return lines;
}
