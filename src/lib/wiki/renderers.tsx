import { createElement } from "react";
import Link from "next/link";
import { NoteAlert, WarningAlert } from "@/components/Alert";
import {
  HeadingRendererHelper,
  classMapping,
  getTextFromProps,
  redirectRedditAndGithubLinksToWebsite,
} from "./utils";
import { Alert } from "@mantine/core";
import { HelpCircle } from "lucide-react";

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
    <a className="break-words" href={href}>
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
        <a href={text} className="break-words">
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
            <a key={index} href={link} className="block break-words">
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

export const BlockquoteRenderer = (props: any, category: string) => {
  if (category.toLowerCase() !== "beginners-guide") {
    return <blockquote>{props.children}</blockquote>;
  }
  return (
    <Alert
      icon={<HelpCircle size="1rem" />}
      color="green"
      radius="md"
      className="my-2"
    >
      {props.children}
    </Alert>
  );
};

export const UlRenderer = (props: any) => {
  return (
    <ul className="bg-gray-900 rounded-xl p-2 sm:p-4 list-none">
      {props.children}
    </ul>
  );
};
