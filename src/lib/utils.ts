import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toMdast } from "hast-util-to-mdast";
import { toMarkdown } from "mdast-util-to-markdown";

export function formatName(name: string) {
  if (!name) return name;
  let nameArray = name.replaceAll("-", " ").replaceAll("_", " ").split(" ");

  let formattedName = "";
  for (let i = 0; i < nameArray.length; i++) {
    formattedName +=
      nameArray[i][0].toUpperCase() + nameArray[i].slice(1) + " ";
  }
  return formattedName.replaceAll("Ios", "iOS").replaceAll("os", "OS");
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const devLog = (...args: any) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`%c[DEV]`, "color: #green; font-weight: bold;", ...args);
  }
};

export const getMarkdownFromProps = (props: any) => {
  const mdast = toMdast(props.node);
  const md = toMarkdown(mdast);
  return md;
};
