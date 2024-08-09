import { devLog } from "@/lib/utils";
import { slug as githubSlug } from "github-slugger";
import { toMdast } from "hast-util-to-mdast";
import { toMarkdown } from "mdast-util-to-markdown";
import { Children } from "react";
interface ClassMappingType {
  [key: string]: string;
}

export const classMapping: ClassMappingType = {
  h1: "text-3xl font-semibold tracking-tighter mt-4 mb-2 hover:underline hover:cursor text-white",
  h2: "text-2xl font-medium tracking-medium my-2 mt-4 mb-2 hover:underline hover:cursor text-white",
  h3: "text-2xl font-semibold tracking-tight mt-8 mb-3 mt-4 hover:underline hover:cursor text-white",
  h4: "text-xl font-medium tracking-medium mt-4 hover:underline hover:cursor text-white",
};

// maybe just remove all spaces then replace all / with space
export const removeSlashesForToc = (text: string) =>
  text.replaceAll(" / ", " ")?.replaceAll("/", "");

export function HeadingRendererHelper(props: any, slugger: any) {
  const text = getPlainTextFromProps(props);
  const cleanedText = removeSlashesForToc(text);

  const immediateChild = props.node.children[0];
  let href;
  const slug = slugger.slug(cleanedText);

  if (immediateChild?.tagName === "a") {
    const eleHref = immediateChild?.properties.href;
    href = redirectRedditAndGithubLinksToWebsite(eleHref);
  } else {
    href = "#" + slug;
  }

  return { slug, text, href };
}

export function flatten(text: string, child: any): any {
  return typeof child === "string"
    ? text + child
    : Children.toArray(child.props.children).reduce(flatten, text);
}

export function getPlainTextFromProps(props: any) {
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

function generateReverseDictionary(
  originalDict: RedditToGithubTitleMappingType,
) {
  const reverseDict: RedditToGithubTitleMappingType = {};
  for (const key in originalDict) {
    if (originalDict.hasOwnProperty(key)) {
      const value = originalDict[key];
      reverseDict[value] = key;
    }
  }
  return reverseDict;
}

export const githubToRedditTitleMapping = generateReverseDictionary(
  redditToGithubTitleMapping,
);

const LINK_REDIRECT: Record<string, string> = {};

export function redirectRedditAndGithubLinksToWebsite(link: string) {
  if (link in LINK_REDIRECT) {
    return LINK_REDIRECT[link];
  }

  if (link.startsWith(REDDIT_WIKI_URL)) {
    return redirectRedditLinksToWebsite(link);
  } else if (link.startsWith(GITHUB_WIKI_URL)) {
    return redirectGithubLinksToWebsite(link);
  } else {
    return link;
  }
}

export function redirectRedditLinksToWebsite(link: string) {
  let trimRedditUrl = link.split(REDDIT_WIKI_URL)[1];

  const splitLink = trimRedditUrl.split("#");
  const category = splitLink[0].replaceAll("/", "");

  const id = splitLink[1]
    ?.replaceAll("wiki_", "")
    .replaceAll(".25BA_", "")
    .replaceAll(".25B7_", "")
    // for ones with / in name
    .replaceAll("_.2F_", "-")
    .replaceAll("_", "-");

  if (
    !redditToGithubTitleMapping[
      category as keyof RedditToGithubTitleMappingType
    ]
  ) {
    devLog("CAN'T FIND REDDIT MAPPING FOR", category);
    return link;
  }

  return "/" + redditToGithubTitleMapping[category] + (id ? "#" + id : "");
}

export function redirectGithubLinksToWebsite(link: string) {
  let trimGithubUrl = link.split(GITHUB_WIKI_URL)[1];

  if (trimGithubUrl) {
    // devLog("GITHUB LINK", trimGithubUrl);

    const category = trimGithubUrl.split("#")[0].replace(".md", "");
    const id = trimGithubUrl.split("#")[1];

    // no need for githubToWiki mapping cause wiki uses the same category names
    return `/${category}#${id ? id : ""}`;
  }
  devLog("CAN'T FIND GITHUB MAPPING FOR", trimGithubUrl);
  return link;
}

const REDDIT_WIKI_URL = "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/";
const GITHUB_WIKI_URL = "https://github.com/nbats/FMHYedit/blob/main/";

export const generateWikiLinkFromCategories = (
  category: string,
  subcategory: string,
  subsubcategory: string,
) => {
  if (!category) return "";

  return `/${githubSlug(removeSlashesForToc(category.toLowerCase()))}#${
    subsubcategory
      ? githubSlug(removeSlashesForToc(subsubcategory.toLowerCase()))
      : subcategory
        ? githubSlug(removeSlashesForToc(subcategory.toLowerCase()))
        : ""
  }`;
};

export const stripLinksFromMarkdown = (input: string) => {
  input = input.replace(/<[^>]+>/g, "");
  const regex = /(\[([^\]]+)\]\([^\)]+\))/g;
  return input.replace(regex, "$2").trim();

  return input;
};

export const getMarkdownFromProps = (props: any) => {
  const mdast = toMdast(props.node);
  const md = toMarkdown(mdast);
  return md;
};

export const getWikiUrl = (resource: string) => {
  return `https://raw.githubusercontent.com/fmhy/FMHYedit/main/docs/${resource}.md`;
};
