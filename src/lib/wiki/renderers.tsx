import { NoteAlert, WarningAlert } from "@/components/alert";
import Link from "@/components/link";
import MarkdownRenderer from "@/components/markdown-renderer";
import { beginnersGuideFaqs } from "@/lib/constants";
import { fontMono } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Accordion } from "@mantine/core";
import { ClassAttributes, HTMLAttributes, createElement } from "react";
import ReactMarkdown, { ExtraProps } from "react-markdown";
import gfm from "remark-gfm";
import {
  HeadingRendererHelper,
  classMapping,
  getMarkdownFromProps,
  getPlainTextFromProps,
  redirectRedditAndGithubLinksToWebsite,
} from "./utils";

type PropsType<T> = ClassAttributes<T> & HTMLAttributes<T> & ExtraProps;

export const HeadingRenderer = (
  props: PropsType<HTMLHeadingElement>,
  level: 1 | 2 | 3 | 4,
  slugger: any,
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
        text,
      )}
    </Link>
  );
};

export function LinkRenderer(props: PropsType<HTMLAnchorElement>) {
  const newProps = { ...props } as any;
  let href = redirectRedditAndGithubLinksToWebsite(newProps?.href);

  return (
    <Link
      className={cn("break-words font-semibold", fontMono.className)}
      href={href}
    >
      {props.children}
    </Link>
  );
}

export function LiRenderer(
  props: PropsType<HTMLLIElement>,
  showOnlyStarred?: boolean,
) {
  const md = getMarkdownFromProps(props).trim();
  const isStarred = md.includes("⭐");

  const noteStarter = NOTE_STARTERS.find((item) => md.includes(item));

  // make a separate helper function to dynamically create the relevant html tag, and populate the data
  const getLinkData = (md: string, isModified: boolean) => {
    if (showOnlyStarred && !isStarred) return <></>;

    if (!isModified) {
      return (
        <li className={`text-md my-2 ml-6 list-disc text-slate-200`}>
          {props.children}
        </li>
      );
    }
    return <UnstyledMarkdownRenderer>{md}</UnstyledMarkdownRenderer>;
  };

  if (noteStarter) {
    const splitData = md.split(noteStarter);
    return (
      <>
        {getLinkData(splitData[0], true)}
        <NoteAlert message={splitData[1]} />
      </>
    );
  }

  const warningStarter = WARNING_STARTERS.find((item) => md.includes(item));
  if (warningStarter) {
    const splitData = md.split(warningStarter);
    return (
      <>
        {getLinkData(splitData[0], true)}
        <WarningAlert message={splitData[1]} />
      </>
    );
  }

  return getLinkData(md, false);
}

const NOTE_STARTERS = ["!!!note", "**Note** - ", "!!!info"];
const WARNING_STARTERS = ["!!!warning", "**Warning** - "];

export const PRenderer = (props: PropsType<HTMLParagraphElement>) => {
  const md = getMarkdownFromProps(props);

  const noteStarter = NOTE_STARTERS.find((item) => md.includes(item));
  if (noteStarter) {
    const message = md.split(noteStarter)[1];
    return (
      <>
        <MarkdownRenderer>{md.split(noteStarter)[0]}</MarkdownRenderer>
        <NoteAlert message={message} />
      </>
    );
  }

  const warningStarter = WARNING_STARTERS.find((item) => md.startsWith(item));
  if (warningStarter) {
    const message = md.split(warningStarter)[1];
    return <WarningAlert message={message} />;
  } else {
    return <p>{props.children}</p>;
  }
};

export const CodeRenderer = (
  props: PropsType<HTMLElement>,
  category?: string,
) => {
  if (category !== "base64") {
    return <code {...props} />;
  } else {
    try {
      const text = getPlainTextFromProps(props);
      const decrypted = Buffer.from(text, "base64").toString("binary");
      const split = decrypted.split("\n");
      return (
        <>
          {split.map((link, index) => (
            <Link
              key={index}
              href={link}
              className={cn(
                "block break-words font-semibold",
                fontMono.className,
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

// update this w.o any padding or margin => such that calling this multiple times wont change the elements appearance
const UnstyledMarkdownRenderer = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      components={{
        a: (props) => LinkRenderer(props),
        // p: PRenderer, // for beginners guide only
        // li: LiRenderer, //for storage only
        // code: CodeRenderer,
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

const FaqMarkdownRenderer = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      components={{
        p: PRenderer, // for beginners guide only
        a: LinkRenderer,
        li: LiRenderer, //for storage only
        code: CodeRenderer,
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export const BlockquoteRenderer = (
  props: PropsType<HTMLQuoteElement>,
  category?: string,
) => {
  if (!category || category.toLowerCase() !== "beginners-guide") {
    return <blockquote>{props.children}</blockquote>;
  }

  return (
    <Accordion
      variant="separated"
      radius="md"
      className="mx-auto max-w-[80%] md:max-w-[60%]"
    >
      {beginnersGuideFaqs.map((item, index) => (
        <Accordion.Item key={index} value={item.question}>
          <Accordion.Control>{item.question}</Accordion.Control>
          <Accordion.Panel>
            <FaqMarkdownRenderer>{item.answer}</FaqMarkdownRenderer>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export const UlRenderer = (props: PropsType<HTMLUListElement>) => {
  return (
    <ul
      className="list-none rounded-xl"
      style={{
        background: "#11151F",
        padding: "0.5rem 1rem",
      }}
    >
      {props.children}
    </ul>
  );
};
