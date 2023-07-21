import { createElement } from "react";
import Link from "next/link";
import { NoteAlert, WarningAlert } from "@/components/Alert";
import {
  HeadingRendererHelper,
  classMapping,
  getTextFromProps,
  redirectRedditAndGithubLinksToWebsite,
} from "./utils";

export const HeadingRenderer = (props: any, level: 1 | 2 | 3 | 4) => {
  const { slug, text, href } = HeadingRendererHelper(props);

  return (
    <Link href={href}>
      {createElement(
        "h" + level,
        {
          className: classMapping["h" + level],
          id: slug,
        },
        text
      )}
    </Link>
  );
};

export function LinkRenderer(props: any) {
  const newProps = { ...props };
  let href = redirectRedditAndGithubLinksToWebsite(newProps.href);

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );
}

export function LiRenderer(props: any, showOnlyStarredLinks: boolean) {
  const text = getTextFromProps(props);

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
        className={`list-disc ml-6 my-2 text-md text-slate-200 ${
          showOnlyStarredLinks ? (isStarred ? "" : "hidden") : ""
        }`}
      >
        {props.children}
      </li>
    );
  }
}

export const PRenderer = (props: any) => {
  const text = getTextFromProps(props);

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

export const CodeRenderer = (props: any, category: string) => {
  if (category !== "base64") {
    return <code {...props} />;
  } else {
    try {
      const text = getTextFromProps(props);
      const decrypted = atob(text);
      const split = decrypted.split("\n");
      return (
        <>
          {split.map((link, index) => (
            <a
              key={index}
              href={link}
              className="block "
              target="_blank"
              rel="noreferrer"
            >
              {link}
            </a>
          ))}
        </>
      );
    } catch (e) {
      return <code {...props} />;
    }
  }
};
