// @ts-nocheck

import React from "react";
import { NoteAlert, WarningAlert } from "../../components/Alert";
import {
  HeadingRendererHelper,
  classMapping,
  convertTextToLowerCamelCase,
  flatten,
  logHeading,
  redirectRedditLinksToWebsite,
  removeSymbolsInHeading,
} from "./helpers";

interface HeadingRendererProps {
  props: any;
  markdownHeadings: Record<string, string[]>;
}

export const H1Renderer = (
  props: any,
  markdownHeadings: Record<string, string[]>
) => {
  const { slug, text } = HeadingRendererHelper(props);
  logHeading(props.level, text, markdownHeadings);

  return (
    <h1
      className={classMapping["h" + props.level] + " group mt-4 mb-2"}
      id={slug}
    >
      <a href={`#${slug}`} className="hidden group-hover:inline-flex">
        #{" "}
      </a>
      &#x203A; {removeSymbolsInHeading(text)}
    </h1>
  );
};

export const H2Renderer: React.FC<HeadingRendererProps> = (
  props,
  markdownHeadings
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
    <h2 className={classMapping["h" + props.level] + " group mt-4"} id={slug}>
      <a href={href} className="group-hover:inline-flex hidden">
        #{" "}
      </a>
      &#xbb; {removeSymbolsInHeading(text)}
    </h2>
  );
};

export const H3Renderer: React.FC<HeadingRendererProps> = (
  props,
  markdownHeadings
) => {
  const { slug, text } = HeadingRendererHelper(props);
  logHeading(props.level, text, markdownHeadings);

  return (
    <h3 className={classMapping["h" + props.level] + " group mt-4"} id={slug}>
      <a href={`#${slug}`} className="group-hover:inline-flex hidden">
        #{" "}
      </a>
      {text}
    </h3>
  );
};

export const H4Renderer: React.FC<HeadingRendererProps> = (
  props,
  markdownHeadings
) => {
  const { slug, text } = HeadingRendererHelper(props);
  logHeading(props.level, text, markdownHeadings);

  return (
    <h4 className={classMapping["h" + props.level] + " group mt-4"} id={slug}>
      <a href={`#${slug}`} className="group-hover:inline-flex hidden">
        #{" "}
      </a>
      {text}
    </h4>
  );
};

export function LinkRenderer(props) {
  const newProps = { ...props };

  if (
    newProps.href.startsWith("https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki")
  ) {
    newProps.href = redirectRedditLinksToWebsite(newProps.href);
  }

  return <a {...newProps} target="_blank" rel="noopener noreferrer" />;
}

export function LiRenderer(props, showOnlyStarredLinks) {
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
        {...props}
      />
    );
  }
}

export const PRenderer = (props) => {
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
    return <p {...props} />;
  }
};
