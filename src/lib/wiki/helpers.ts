import { Children } from "react";
import { slug as githubSlug } from "github-slugger";

interface ClassMappingType {
  [key: string]: string;
}

export const classMapping: ClassMappingType = {
  h1: "text-2xl font-semibold tracking-tighter mt-4 mb-2 hover:underline hover:cursor text-white",
  h2: "text-xl font-medium tracking-medium my-2 mt-4 mb-2 hover:underline hover:cursor text-white",
  h3: "text-2xl font-semibold tracking-tight mt-8 mb-3 mt-4 hover:underline hover:cursor text-white",
  h4: "text-xl font-medium tracking-medium mt-4 hover:underline hover:cursor text-white",
};

export function HeadingRendererHelper(props: any) {
  const text = getTextFromProps(props);
  const slug = githubSlug(text);
  let href = "#" + slug;

  const immediateChild = props.node.children[0];

  if (immediateChild?.tagName === "a") {
    const eleHref = immediateChild?.properties.href;
    if (
      eleHref.startsWith("https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/")
    ) {
      href = redirectRedditLinksToWebsite(eleHref);
    } else {
      console.log("CAN'T FIND REDDIT MAPPING", eleHref);
    }
  }

  return { slug, text, href };
}

export function flatten(text: string, child: any): any {
  return typeof child === "string"
    ? text + child
    : Children.toArray(child.props.children).reduce(flatten, text);
}

export function getTextFromProps(props: any) {
  const children = Children.toArray(props.children);
  const text = children.reduce(flatten, "");
  return text;
}

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
    console.log("NO MAPPING FOR", category);
    return link;
  }

  return "/wiki/" + redditToGithubTitleMapping[category] + (id ? "#" + id : "");
}
