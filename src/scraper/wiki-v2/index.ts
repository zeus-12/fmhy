import data from "./data.json";
const lineList = data.data?.split("\n");

let doAltIndexing = true;
const coloring = false;

function cleanLineForSearchMatchChecks(line: string): string {
  return line.replace("https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/", "/");
}

function removeEmptyStringsFromList(stringList: string[]): string[] {
  return stringList.filter((string) => string !== "");
}

// function checkMultiWordQueryContainedExactlyInLine(
//   line: string,
//   searchQuery: string
// ): boolean {
//   if (searchQuery.split(" ").length <= 1) {
//     return false;
//   }
//   return line.toLowerCase().includes(searchQuery.toLowerCase());
// }

// function moveExactMatchesToFront(
//   myList: string[],
//   searchQuery: string
// ): string[] {
//   const bumped: string[] = [];
//   const notBumped: string[] = [];
//   for (const element of myList) {
//     if (checkMultiWordQueryContainedExactlyInLine(element, searchQuery)) {
//       bumped.push(element);
//     } else {
//       notBumped.push(element);
//     }
//   }
//   return bumped.concat(notBumped);
// }

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

// function checkWordForWordMatchCaseSensitive(
//   line: string,
//   searchQuery: string
// ): boolean {
//   const lineWords = removeEmptyStringsFromList(
//     line.replace("[", " ").replace("]", " ").split(" ")
//   );
//   const searchQueryWords = removeEmptyStringsFromList(searchQuery.split(" "));
//   return checkList1isInList2(searchQueryWords, lineWords);
// }

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

// function getOnlyFullWordMatchesCaseSensitive(
//   myList: string[],
//   searchQuery: string
// ): string[] {
//   const bumped: string[] = [];
//   for (const element of myList) {
//     if (checkWordForWordMatchCaseSensitive(element, searchQuery)) {
//       bumped.push(element);
//     }
//   }
//   return bumped;
// }

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

type SearchResults = {
  results: string[];
  matchingSections: string[];
};

export async function doASearch(searchInput: string): Promise<SearchResults> {
  if (!searchInput || !searchInput.trim()) {
    console.log("empty search input");
    return { results: [], matchingSections: [] };
  }
  const myFilterWords = removeEmptyStringsFromList(
    searchInput.toLowerCase().split(" ")
  );
  console.log("Looking for lines that contain all of these words:");
  console.log(myFilterWords);

  // main results
  // const myLineList = await lineList;

  let linesFoundPrev = filterLines(lineList, searchInput);

  if (linesFoundPrev.length > 300) {
    console.log(
      `Too many results (${linesFoundPrev.length}). Showing only full-word matches.`
    );
    linesFoundPrev = getOnlyFullWordMatches(linesFoundPrev, searchInput);
  }

  // rank results
  // linesFoundPrev = moveExactMatchesToFront(linesFoundPrev, searchInput);
  linesFoundPrev = moveBetterMatchesToFront(linesFoundPrev, searchInput);

  // separate title lines
  const linesFoundAll = filterOutTitleLines(linesFoundPrev);
  const linesFound = linesFoundAll[0];
  const sectionTitleList = linesFoundAll[1];

  //   if (coloring) {
  //     const linesFoundColored = colorLinesFound(linesFound, myFilterWords);
  //     const textToPrint = linesFoundColored.join("\n");
  //     console.log(`Printing ${linesFound.length} search results:
  // `);
  //     console.log(textToPrint);
  //     console.log(`
  // Search ended with ${linesFound.length} results found.
  // `);
  //   } else {
  // const textToPrint = linesFound.join("\n");
  //   console.log(`Printing ${linesFound.length} search results:
  // `);
  //   console.log(textToPrint);
  //   console.log(`
  // Search ended with ${linesFound.length} results found.
  // `);
  // }

  //   if (sectionTitleList.length > 0) {
  //     console.log("Also there are these section titles: ");
  //     console.log(`
  // ${sectionTitleList.join("\n")}`);
  //   }

  return {
    results: linesFound,
    matchingSections: sectionTitleList,
  };
}

doASearch("telegram").then((results) => {
  console.log(results);
});
