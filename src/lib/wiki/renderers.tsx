import React from "react";
import Link from "next/link";
import { NoteAlert, WarningAlert } from "@/components/Alert";
import {
  HeadingRendererHelper,
  classMapping,
  convertTextToLowerCamelCase,
  flatten,
  logHeading,
  redirectRedditLinksToWebsite,
  removeSymbolsInHeading,
} from "./helpers";

export const H1Renderer = (
  props: any,
  markdownHeadings: Record<string, string[]>
) => {
  const { slug, text } = HeadingRendererHelper(props);
  logHeading(props.level, text, markdownHeadings);

  return (
    <Link href={`#${slug}`}>
      <h1
        className={`${
          classMapping["h" + props.level]
        } mt-4 mb-2 hover:underline hover:cursor text-white`}
        id={slug}
      >
        &#x203A; {removeSymbolsInHeading(text)}
      </h1>
    </Link>
  );
};

export const H2Renderer = (
  props: any,
  markdownHeadings: Record<string, string[]>
) => {
  let { slug, text } = HeadingRendererHelper(props);
  let href = `#${convertTextToLowerCamelCase(text)}`;

  logHeading(props.level, text, markdownHeadings);

  if (props.node.children[1]?.tagName === "a") {
    const eleHref = props.node.children[1]?.properties.href;
    if (
      eleHref.startsWith("https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/")
    ) {
      href = redirectRedditLinksToWebsite(eleHref);
    } else {
      console.log("not reddit link", eleHref);
    }
  }

  return (
    <Link href={href}>
      <h2
        className={`${
          classMapping["h" + props.level]
        } mt-4 mb-2 hover:underline hover:cursor text-white`}
        id={slug}
      >
        &#xbb; {removeSymbolsInHeading(text)}
      </h2>
    </Link>
  );
};

export const H3Renderer = (
  props: any,
  markdownHeadings: Record<string, string[]>
) => {
  const { slug, text } = HeadingRendererHelper(props);
  logHeading(props.level, text, markdownHeadings);

  return (
    <Link href={`#${slug}`}>
      <h3
        className={`${
          classMapping["h" + props.level]
        } mt-4 hover:underline hover:cursor text-white`}
        id={slug}
      >
        {text}
      </h3>
    </Link>
  );
};

export const H4Renderer = (
  props: any,
  markdownHeadings: Record<string, string[]>
) => {
  const { slug, text } = HeadingRendererHelper(props);
  logHeading(props.level, text, markdownHeadings);

  return (
    <Link href={`#${slug}`}>
      <h4
        className={`${
          classMapping["h" + props.level]
        } mt-4 hover:underline hover:cursor text-white`}
        id={slug}
      >
        {text}
      </h4>
    </Link>
  );
};

export function LinkRenderer(props: any) {
  const newProps = { ...props };
  let href = newProps.href;
  if (href.startsWith("https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki")) {
    href = redirectRedditLinksToWebsite(href);
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );
}

export function LiRenderer(props: any, showOnlyStarredLinks: boolean) {
  var children = React.Children.toArray(props.children);
  var text = children.reduce(flatten, "");

  const isStarred = text.startsWith("⭐");

  if (text.startsWith("Note - ")) {
    const message = text.split("Note - ")[1];
    return <NoteAlert message={message} />;
  } else if (text.startsWith("https://") || text.startsWith("http://")) {
    return (
      <li>
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      </li>
    );
  } else {
    return (
      <li
        className={`list-disc ml-6 ${
          showOnlyStarredLinks ? (isStarred ? "" : "hidden") : ""
        }`}
        // {...props}
      >
        {props.children}
      </li>
    );
  }
}

export const PRenderer = (props: any) => {
  var children = React.Children.toArray(props.children);
  var text = children.reduce(flatten, "");

  const NOTE_STARTERS = ["!!!note", "Note - "];
  const WARNING_STARTERS = ["!!!warning", "Warning - "];

  const noteStarter = NOTE_STARTERS.find((item) => text.startsWith(item));
  if (noteStarter) {
    const message = text.split(noteStarter)[1];
    return <NoteAlert message={message} />;
  }

  const warningStarter = WARNING_STARTERS.find((item) => text.startsWith(item));
  if (warningStarter) {
    const message = text.split(warningStarter)[1];
    return <WarningAlert message={message} />;
  } else {
    return <p>{props.children}</p>;
  }
};
