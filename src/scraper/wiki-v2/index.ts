import { devLog } from "@/lib/utils";
import axios from "axios";
import fs from "fs";

let doAltIndexing = true;
const coloring = false;

function addPretext(lines: string[], preText: string): string[] {
  for (let i = 0; i < lines.length; i++) {
    lines[i] = preText + lines[i];
  }
  return lines;
}

async function dlWikiChunk(
  fileName: string,
  icon: string,
  subURL: string
): Promise<string[]> {
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
    devLog("Loaded.");
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
  let preText = "";
  if (fileName !== "NSFWPiracy.md") {
    preText = `[${icon}](https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/${subURL}) `;
  } else {
    preText = `[${icon}](${subURL}) `;
  }
  lines = addPretext(lines, preText);

  return lines;
}

function cleanLineForSearchMatchChecks(line: string): string {
  return line.replace("https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/", "/");
}

async function alternativeWikiIndexing(): Promise<string[]> {
  const wikiChunks = await Promise.all([
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
  return wikiChunks.flat();
}
// --------------------------------

async function standardWikiIndexing(): Promise<string[]> {
  let lines: string[];
  try {
    // First, try to get it from the local single-page file
    devLog("Loading FMHY from local single-page...");
    const response = await axios.get("single-page");
    lines = response.data.split("\n");
    devLog("Loaded.");
  } catch {
    devLog("Local single-page file not found.");
    // If that fails, try to get it from Github
    devLog("Loading FMHY single-page file from Github...");
    const response = await axios.get(
      "https://raw.githubusercontent.com/nbats/FMHYedit/main/single-page"
    );
    lines = response.data.split("\n");
    devLog("Loaded.");
  }
  return lines;
}

async function getAllLines(): Promise<string[]> {
  let lines: string[];

  if (doAltIndexing) {
    try {
      lines = await alternativeWikiIndexing();
    } catch {
      lines = await standardWikiIndexing();
    }
  } else {
    lines = await standardWikiIndexing();
  }
  return lines;
}

function removeEmptyStringsFromList(stringList: string[]): string[] {
  return stringList.filter((string) => string !== "");
}

function checkMultiWordQueryContainedExactlyInLine(
  line: string,
  searchQuery: string
): boolean {
  if (searchQuery.split(" ").length <= 1) {
    return false;
  }
  return line.toLowerCase().includes(searchQuery.toLowerCase());
}

function moveExactMatchesToFront(
  myList: string[],
  searchQuery: string
): string[] {
  const bumped: string[] = [];
  const notBumped: string[] = [];
  for (const element of myList) {
    if (checkMultiWordQueryContainedExactlyInLine(element, searchQuery)) {
      bumped.push(element);
    } else {
      notBumped.push(element);
    }
  }
  return bumped.concat(notBumped);
}

function checkList1isInList2(list1: string[], list2: string[]): boolean {
  for (const element of list1) {
    if (!list2.includes(element)) {
      return false;
    }
  }
  return true;
}

function checkWordForWordMatch(line: string, searchQuery: string): boolean {
  const lineWords = removeEmptyStringsFromList(
    line.toLowerCase().replace("[", " ").replace("]", " ").split(" ")
  );
  const searchQueryWords = removeEmptyStringsFromList(
    searchQuery.toLowerCase().split(" ")
  );
  return checkList1isInList2(searchQueryWords, lineWords);
}

function checkWordForWordMatchCaseSensitive(
  line: string,
  searchQuery: string
): boolean {
  const lineWords = removeEmptyStringsFromList(
    line.replace("[", " ").replace("]", " ").split(" ")
  );
  const searchQueryWords = removeEmptyStringsFromList(searchQuery.split(" "));
  return checkList1isInList2(searchQueryWords, lineWords);
}

function moveBetterMatchesToFront(
  myList: string[],
  searchQuery: string
): string[] {
  const bumped: string[] = [];
  const notBumped: string[] = [];
  for (const element of myList) {
    if (checkWordForWordMatch(element, searchQuery)) {
      bumped.push(element);
    } else {
      notBumped.push(element);
    }
  }
  return bumped.concat(notBumped);
}

function getOnlyFullWordMatches(
  myList: string[],
  searchQuery: string
): string[] {
  const bumped: string[] = [];
  for (const element of myList) {
    if (checkWordForWordMatch(element, searchQuery)) {
      bumped.push(element);
    }
  }
  return bumped;
}

function getOnlyFullWordMatchesCaseSensitive(
  myList: string[],
  searchQuery: string
): string[] {
  const bumped: string[] = [];
  for (const element of myList) {
    if (checkWordForWordMatchCaseSensitive(element, searchQuery)) {
      bumped.push(element);
    }
  }
  return bumped;
}

function getLinesThatContainAllWords(
  lineList: string[],
  searchQuery: string
): string[] {
  const words = removeEmptyStringsFromList(
    searchQuery.toLowerCase().split(" ")
  );

  const bumped: string[] = [];
  for (const line of lineList) {
    let lineModdedForChecking = line.toLowerCase();
    if (doAltIndexing) {
      lineModdedForChecking = cleanLineForSearchMatchChecks(
        lineModdedForChecking
      );
    }
    let containsAllWords = true;
    for (const word of words) {
      if (!lineModdedForChecking.includes(word)) {
        containsAllWords = false;
        break;
      }
    }
    if (containsAllWords) {
      bumped.push(line);
    }
  }
  return bumped;
}

function filterLines(lineList: string[], searchQuery: string): string[] {
  if (
    searchQuery.length <= 2 ||
    (searchQuery === searchQuery.toUpperCase() && searchQuery.length <= 5)
  ) {
    return getOnlyFullWordMatches(lineList, searchQuery);
  } else {
    return getLinesThatContainAllWords(lineList, searchQuery);
  }
}

function filterOutTitleLines(lineList: string[]): [string[], string[]] {
  const filteredList: string[] = [];
  const sectionTitleList: string[] = [];
  for (const line of lineList) {
    if (line[0] !== "#") {
      filteredList.push(line);
    } else {
      sectionTitleList.push(line);
    }
  }
  return [filteredList, sectionTitleList];
}

function highlightWord(sentence: string, word: string): string {
  return sentence;
  //   return sentence.replace(word, colored(word, 'red'));
}

function colorLinesFound(
  linesFound: string[],
  filterWords: string[]
): string[] {
  const filterWordsCapitalized = filterWords.map(
    (word) => word[0].toUpperCase() + word.slice(1).toLowerCase()
  );

  const filterWordsAllCaps = filterWords.map((word) => word.toUpperCase());

  const filterWordsIncludingCaps = filterWords.concat(
    filterWordsCapitalized,
    filterWordsAllCaps
  );
  const coloredLinesList: string[] = [];
  for (let line of linesFound) {
    for (const word of filterWordsIncludingCaps) {
      line = highlightWord(line, word);
    }
    const coloredLine = line;
    coloredLinesList.push(coloredLine);
  }
  return coloredLinesList;
}

async function doASearch(searchInput: string): Promise<void> {
  const myFilterWords = removeEmptyStringsFromList(
    searchInput.toLowerCase().split(" ")
  );
  devLog("Looking for lines that contain all of these words:");
  devLog(myFilterWords);

  // main results
  const myLineList = await lineList;
  let linesFoundPrev = filterLines(myLineList, searchInput);

  if (linesFoundPrev.length > 300) {
    devLog(
      `Too many results (${linesFoundPrev.length}). Showing only full-word matches.`
    );
    linesFoundPrev = getOnlyFullWordMatches(linesFoundPrev, searchInput);
  }

  // rank results
  // linesFoundPrev = moveExactMatchesToFront(linesFoundPrev, searchInput);
  linesFoundPrev = moveBetterMatchesToFront(linesFoundPrev, searchInput);

  // reverse list for terminal
  linesFoundPrev.reverse();

  // separate title lines
  const linesFoundAll = filterOutTitleLines(linesFoundPrev);
  const linesFound = linesFoundAll[0];
  const sectionTitleList = linesFoundAll[1];

  if (coloring) {
    const linesFoundColored = colorLinesFound(linesFound, myFilterWords);
    const textToPrint = linesFoundColored.join("\n");
    devLog(`Printing ${linesFound.length} search results:
`);
    devLog(textToPrint);
    devLog(`
Search ended with ${linesFound.length} results found.
`);
  } else {
    const textToPrint = linesFound.join("\n");
    devLog(`Printing ${linesFound.length} search results:
`);
    devLog(textToPrint);
    devLog(`
Search ended with ${linesFound.length} results found.
`);
  }

  // title section results
  if (sectionTitleList.length > 0) {
    devLog("Also there are these section titles: ");
    devLog(`
${sectionTitleList.join("\n")}`);
  }
}

const lineList = getAllLines();
devLog(
  "Search examples: 'youtube frontend', 'streaming site', 'rare movies', 'userscripts'... You can also type 'exit' or nothing to close the script."
);
doASearch("google");
