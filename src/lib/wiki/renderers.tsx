import { createElement } from "react";
import Link from "@/components/Link";
import { NoteAlert, WarningAlert } from "@/components/Alert";
import {
  HeadingRendererHelper,
  classMapping,
  getTextFromProps,
  redirectRedditAndGithubLinksToWebsite,
} from "./utils";
import { Alert } from "@mantine/core";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { fontMono } from "@/lib/fonts";

export const HeadingRenderer = (
  props: any,
  level: 1 | 2 | 3 | 4,
  slugger: any
) => {
  const { slug, text, href } = HeadingRendererHelper(props, slugger);

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
    <Link
      className={cn("break-words font-semibold ", fontMono.className)}
      href={href}
    >
      {props.children}
    </Link>
  );
}

export function LiRenderer(props: any, showOnlyStarredLinks: boolean) {
  const text = getTextFromProps(props);

  const isStarred = text.startsWith("⭐");

  if (text.startsWith("Note - ")) {
    const message = text.split("Note - ")[1];
    return <NoteAlert message={message} />;
  } else if (text.startsWith("https://") || text.startsWith("http://")) {
    const splitText = text.split(" ");
    const link = splitText[0];

    return (
      <li>
        <Link
          href={link}
          className={cn("break-words font-semibold ", fontMono.className)}
        >
          {link}
        </Link>
        <span>{splitText.slice(1).join(" ")}</span>
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
            <Link
              key={index}
              href={link}
              className={cn(
                "font-semibold block break-words",
                fontMono.className
              )}
            >
              {link}
            </Link>
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
    <ul
      className="rounded-xl list-none"
      style={{
        background: "#11151F",
        padding: "0.5rem 1rem",
      }}
    >
      {props.children}
    </ul>
  );
};

const ADDITION_STARTERS = ["Added"];
const REMOVAL_STARTERS = ["Removed"];

const STARRED = "Starred";
const UNSTARRED = "Unstarred";

export const changelogsPRenderer = (props: any) => {
  const text = getTextFromProps(props);
  const firstWord = text.split(" ")[0];

  const isUnstarred = firstWord.includes(UNSTARRED);
  const isStarred = firstWord.includes(STARRED);
  const isAdditionStarter = ADDITION_STARTERS.includes(firstWord);
  const isRemovalStarter = REMOVAL_STARTERS.includes(firstWord);

  return (
    <p
      className={cn(
        isAdditionStarter && "text-green-400",
        isRemovalStarter && "text-red-400"
      )}
    >
      {/* {(isUnstarred || isStarred) && (
        <span className={cn(isUnstarred && "line-through")}>⭐️</span>
      )} */}

      {props.children}
    </p>
  );
};
