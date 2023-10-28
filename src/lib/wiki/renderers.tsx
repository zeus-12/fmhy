import { ReactNode, createElement } from "react";
import Link from "@/components/Link";
import { NoteAlert, WarningAlert } from "@/components/Alert";
import {
  HeadingRendererHelper,
  classMapping,
  getTextFromProps,
  redirectRedditAndGithubLinksToWebsite,
} from "./utils";
import { Accordion, Alert } from "@mantine/core";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { fontMono } from "@/lib/fonts";
import ReactMarkdown from "react-markdown";

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

export const BlockquoteRenderer = (props: any, category: string) => {
  if (category.toLowerCase() !== "beginners-guide") {
    return <blockquote>{props.children}</blockquote>;
  }

  const faqs = [
    {
      question: "How do I tell if a site or download is safe? Any tips?",
      answer: `Check out [Booty Guard](https://rentry.org/bootyguard) our basic safety guide. 
      Still feel unsure? Reach out to us via [Discord](https://redd.it/17f8msf) & make sure you've looked at sites/software we've listed as unsafe: [here](https://www.reddit.com/r/FREEMEDIAHECKYEAH/comments/10bh0h9/unsafe_sites_software_thread)`,
    },
    {
      question: "I don't know what seeding means or *insert other term*...",
      answer: `You will find almost all terms related to piracy & more on [The Piracy Glossary](https://rentry.org/the-piracy-glossary)
        Didn't find it and still confused? Reach out to us via [Divolt](https://redd.it/uto5vw).`,
    },

    {
      question: "How do I download Photoshop/Adobe Products for free?",
      answer: `You can download pre-cracked Adobe products from [M0nkrus](http://w14.monkrus.ws/) | [How to download from M0nkrus](https://rentry.co/adobesoftware) or Patch it yourself following these guides [here](https://www.reddit.com/r/GenP/wiki/index/) & for MacOS go [here](#macos)
        !!!info M0nkrus is a well trusted and reputable source for adobe software in the piracy community.`,
    },
    {
      question: "How do I download windows / activate windows & Office?",
      answer: `For Windows check out this [section](#pirate-windows)
      For Office check these [guides](https://fmhy.pages.dev/storage/#office-suites)`,
    },
    {
      question: "Where do I find *insert game title / movie title*?",
      answer: `For movies check out [this](https://whereyouwatch.com) and for new movies it's a good idea to keep an eye on [r/movieleaks](https://reddit.com/r/movieleaks). 
        For sites to stream from check out this [section](#streaming).
        !!!info Pirated releases generally happen after a movie is digitally released or released via Blu-Ray / DVD, which can take 3 months+ after initially playing in theaters.
        
For games use [Rezi](https://rezi.one) or any site listed [here](https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/games/#wiki_.25BA_download_games) and for newly released games check [r/crackwatch](https://reddit.com/r/crackwatch).

!!!warning Please avoid downloading games from The Pirate Bay or any site listed: [here](https://www.reddit.com/r/FREEMEDIAHECKYEAH/comments/10bh0h9/unsafe_sites_software_thread)`,
    },
    {
      question: "How do I unlock *insert random game title* DLCs?",
      answer:
        "Use the tools listed [here](https://fmhy.pages.dev/gamingpiracyguide/#steam--epic) to unlock DLCs.",
    },
    {
      question:
        "Should I install & use *insert random anti-virus software* instead of using Windows Defender?",
      answer: `No don't do that, windows defender is more than good enough, you don't need another anti-virus, but if you're set on installing a secondary AV the one worth installing is Malwarebytes. Please read the note [here](#anti-virus). 
        !!!warning Stay away from Avast, Norton and McAfee, these are "bloatware" and generally not safe software.`,
    },
    {
      question: "How do I bypass this paywalled article?",
      answer:
        "Use [this](https://bitbucket.org/magnolia1234/bypass-paywalls-firefox-clean/src/master/) / [2](https://gitlab.com/magnolia1234/bypass-paywalls-chrome-clean) to read the article easily.",
    },
    {
      question: "How do I download image from *insert stock site*?",
      answer: `You can use [this](https://downloader.la/) if this doesn't work you can find similar stock image downloaders [here](https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/storage/#wiki_stock_photo_sites).`,
    },
  ];

  return (
    <Accordion
      variant="separated"
      radius="md"
      className="max-w-[80%] md:max-w-[60%]  mx-auto"
    >
      {faqs.map((item, index) => (
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
