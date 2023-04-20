import React from "react";

export const logHeading: {
  (
    headingLevel: number,
    headingTitle: string,
    markdownHeadings: Record<string, string[]>
  ): void;
} = (headingLevel, headingTitle, markdownHeadings) => {
  if (headingLevel === 1) {
    if (markdownHeadings[headingTitle] || !headingTitle) return;

    markdownHeadings[headingTitle] = [];
  } else if (headingLevel === 2) {
    const lastHeading = Object.keys(markdownHeadings).slice(-1)[0];

    if (markdownHeadings[lastHeading]?.includes(headingTitle) || !headingTitle)
      return;

    markdownHeadings[lastHeading] = [
      ...(markdownHeadings[lastHeading]?.length > 0
        ? markdownHeadings[lastHeading]
        : []),
      headingTitle,
    ];
  } else if (headingLevel === 4 || headingLevel === 3) {
    if (!headingTitle) return;
    //storage & piracyguide
    markdownHeadings[headingTitle] = [];
  }
};

export function flatten(text: string, child: any): any {
  return typeof child === "string"
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

interface ClassMappingType {
  [key: string]: string;
}

export const classMapping: ClassMappingType = {
  h1: "text-2xl font-semibold tracking-tighter",
  h2: "text-xl font-medium tracking-medium",
  h3: "text-2xl font-semibold tracking-tight mt-8 mb-3",
  h4: "text-xl font-medium tracking-medium",
};

export function HeadingRendererHelper(props: any) {
  const children = React.Children.toArray(props.children);
  const text = children.reduce(flatten, "");
  const slug = convertTextToLowerCamelCase(text);

  // prevent duplicate slug for each page -- how to?
  return { slug, text };
}

export const convertTextToLowerCamelCase = (text: any) => {
  if (!text || typeof text !== "string") return;

  const filteredText = text
    .toLowerCase()
    .replace("▷ ", "")
    .replace("► ", "")
    // remove everything but spaces, alphabets, numbers
    .replace(/[^a-z0-9 ]/g, "");

  // split at spaces, and join them with _
  const splitText = filteredText.split(" ");
  return splitText.filter((item) => item !== "").join("_");
};

export const removeSymbolsInHeading = (text: string) => {
  if (!text) return;
  return text.replace("▷ ", "").replace("► ", "").replace("►", "");
};

interface RedditToGithubTitleMappingType {
  [key: string]: string;
}

export const redditToGithubTitleMapping: RedditToGithubTitleMappingType = {
  "adblock-vpn-privacy": "adblockvpnguide",
  android: "android-iosguide",
  reading: "readingpiracyguide",
  download: "downloadpiracyguide",
  edu: "edupiracyguide",
  games: "gamingpiracyguide",
  linux: "linuxguide",
  misc: "miscguide",
  video: "videopiracyguide",
  audio: "audiopiracyguide",
  "non-eng": "non-english",
  storage: "storage",
  torrent: "torrentpiracyguide",
  ai: "ai",
  beginners_guide: "beginners_guide",
  "img-tools": "img-tools",
  "tools-misc": "toolsguide",
  "dev-tools": "devtools",
  // :"nsfwpiracy"
};

export function redirectRedditLinksToWebsite(link: string) {
  let trimRedditUrl = link.split(
    "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/"
  )[1];

  const splitLink = trimRedditUrl.split("#");
  const category = splitLink[0].replaceAll("/", "");

  const id = splitLink[1]
    ?.replaceAll("wiki_", "")
    .replaceAll(".25BA_", "")
    .replaceAll(".25B7_", "")
    // for ones with / in name
    .replaceAll("_.2F_", "_");

  if (
    !redditToGithubTitleMapping[
      category as keyof RedditToGithubTitleMappingType
    ]
  ) {
    console.log("no mapping for", category);
    return link;
  }

  return "/wiki/" + redditToGithubTitleMapping[category] + (id ? "#" + id : "");
}
