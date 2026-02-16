import FAQ from "@/components/faq";
import Link from "@/components/link";
import MarkdownRenderer from "@/components/markdown-renderer";
import BottomNavigator from "@/components/wiki/bottom-navigator";
import CategoriesSidebar from "@/components/wiki/categories-sidebar";
import WikiTableOfContents from "@/components/wiki/toc";
import {
  ChildResource,
  MARKDOWN_RESOURCES,
  ResourceEle,
  blurDataUrlForLogo,
} from "@/lib/constants";
import { useWiki } from "@/lib/store";
import { getTableOfContents } from "@/lib/toc";
import { devLog } from "@/lib/utils";
import { getWikiUrl } from "@/lib/wiki/utils";
import { Badge } from "@mantine/core";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Balancer from "react-wrap-balancer";

const Page = ({
  data,
  toc,
  markdownCategory,
  isHome,
}: {
  data?: string;
  toc?: any;
  markdownCategory: ChildResource;
  isHome?: boolean;
}) => {
  return (
    <>
      {isHome ? (
        <NextSeo
          title="FreeMediaHeckYeah — The Largest Collection of Free Stuff on the Internet"
          description="The largest collection of free movies, music, software, games, books, and more. Curated links to the best free resources on the internet."
        />
      ) : (
        <NextSeo
          title={`Wiki | ${markdownCategory?.title}`}
          description={`Wiki for ${markdownCategory?.title}`}
        />
      )}

      <CategoriesSidebar markdownCategory={markdownCategory} />

      {isHome ? (
        <HomeContent />
      ) : (
        <LinkDataRenderer
          data={data!}
          markdownCategory={markdownCategory}
          toc={toc}
        />
      )}
    </>
  );
};

interface LinkDataRendererProps {
  data: string;
  toc: any;
  markdownCategory: ResourceEle;
}

const LinkDataRenderer: React.FC<LinkDataRendererProps> = ({
  data,
  markdownCategory,
  toc,
}) => {
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (linksRef.current) {
      const el = linksRef.current;
      const prev = el.style.scrollBehavior;
      el.style.scrollBehavior = "auto";
      el.scrollTo(0, 0);
      el.style.scrollBehavior = prev;
    }
  }, [markdownCategory.title]);

  const { showOnlyStarred } = useWiki();

  return (
    <div
      ref={linksRef}
      className="hide-scrollbar flex flex-1 justify-evenly overflow-y-auto rounded-2xl border border-gray-800 bg-[#0B0D0E] lg:px-2 xl:px-20"
    >
      <div className="max-w-2xl px-2 py-6 sm:px-8 sm:pt-8 md:pt-14 lg:px-6 lg:pt-14 xl:px-8 xl:pt-20">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[26px] font-semibold leading-8 tracking-tighter underline-offset-2">
            {markdownCategory.title}
          </p>
          <div className="flex items-center"></div>
        </div>

        {data && data.length > 0 && (
          <>
            <MarkdownRenderer
              category={markdownCategory.title}
              showOnlyStarred={showOnlyStarred}
            >
              {data}
            </MarkdownRenderer>

            <BottomNavigator category={markdownCategory.title} />
          </>
        )}
      </div>
      <WikiTableOfContents
        className="sticky top-0 hidden max-h-full px-4 py-14 lg:block xl:px-8 xl:py-20"
        toc={toc}
      />
    </div>
  );
};

export default Page;

export async function getStaticProps({
  params,
}: {
  params: { CATEGORY?: string[] };
}) {
  // if (isDevEnv) {
  //   const testMarkdownCategory: ResourceEle = {
  //     dlForSearch: false,
  //     emoji: "🧪",
  //     hasSubItems: false,
  //     title: "TEST",
  //     urlEnding: "/test",
  //     useAbsoluteUrl: true,
  //   };
  //   const toc = await getTableOfContents(testData);

  //   return {
  //     props: {
  //       data: testData,
  //       markdownCategory: testMarkdownCategory,
  //       toc,
  //     },
  //   };
  // }

  const categorySlug = params?.CATEGORY?.[0];

  if (!categorySlug) {
    return {
      props: {
        isHome: true,
        markdownCategory: MARKDOWN_RESOURCES[0] as ChildResource,
      },
    };
  }

  try {
    let markdownCategory: ResourceEle | undefined;

    MARKDOWN_RESOURCES.forEach((item) => {
      if (!item.hasSubItems) {
        if (item.urlEnding.toLowerCase() === categorySlug.toLowerCase()) {
          markdownCategory = item;
          return;
        }
      } else {
        const ele = item.items?.find(
          (subItem) =>
            subItem.urlEnding.toLowerCase() === categorySlug.toLowerCase(),
        );

        if (ele) {
          markdownCategory = ele;
          return;
        }
      }
    });

    if (markdownCategory?.hasSubItems)
      throw new Error(
        "Parent resource found => MARKDOWNURL is undefined => SSG",
      );

    const markdownUrlEnding = markdownCategory?.urlEnding;
    if (!markdownUrlEnding) {
      throw new Error("Undefined markdown-url-ending, possibly ChildResource");
    }

    const url = getWikiUrl(markdownUrlEnding);
    const res = await fetch(url);

    const text = await res.text();
    if (!text) {
      devLog("No text found", "Err");
    }

    const cleanedText = getCleanedText(text, categorySlug);

    const toc = await getTableOfContents(cleanedText);

    return {
      props: {
        markdownCategory,
        data: cleanedText,
        toc,
      },
      revalidate: 60 * 60 * 24 * 2, // 2 days
    };
  } catch (err: any) {
    devLog(err, "Err");
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  const paths: { params: { CATEGORY: string[] } }[] = [];

  MARKDOWN_RESOURCES.forEach((resource) => {
    if (
      !resource.hasSubItems &&
      (!resource.urlEnding || resource.urlEnding.includes("#"))
    ) {
      return;
    }

    if (resource.hasSubItems) {
      resource.items?.forEach((item) => {
        if (
          !item.hasSubItems &&
          (!item.urlEnding || item.urlEnding.includes("#"))
        ) {
          return;
        }
        paths.push({
          params: { CATEGORY: [item.urlEnding.toLowerCase()] },
        });
      });
    } else {
      paths.push({
        params: { CATEGORY: [resource.urlEnding.toLowerCase()] },
      });
    }
  });

  return {
    paths: [{ params: { CATEGORY: [] } }, ...paths],
    fallback: false,
  };
}

const getCleanedText = (text: string, categorySlug: string) => {
  const stringList = text.split("\n");

  const ignoreList = ["", "***", "***\r", "\r", "****"];

  const ignoreStarters = [
    "**[Table of Contents]",
    "**[◄◄ Back to Wiki Index]",
    "**Use [redirect bypassers]",
    "**Table of Contents**",
    "[TOC2]",
    "# -> ***Beginners Guide to Piracy*** <-",
    "Use any **[Base64 Decoding](https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/storage#wiki_encode_.2F_decode_urls)** site or extension.",
    "**[^ Back to Top]",
    "**[Back to Wiki Index]",
  ];

  const cleanedList = stringList.filter(
    (item) =>
      !ignoreList.includes(item) &&
      !ignoreStarters.some((starter) => item.startsWith(starter)),
  );

  const joinedText = cleanedList.join("\n");

  let cleanedText = (joinedText.split("For mobile users")[1] ?? joinedText)
    ?.replaceAll("►", "")
    ?.replaceAll("▷", "")
    ?.replace("#### How-to Decode Links", "")
    .replace(`# Untrusted Sites / Software`, "")
    ?.replace(
      `Use any **[Base64 Decoding](https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/storage#wiki_encode_.2F_decode_urls)** site or extension.`,
      "",
    )
    .replace(`# Untrusted Sites / Software`, "")
    ?.replace(
      `### Mirrors
* https://fmhy.net/base64
* https://fmhy.pages.dev/base64/
* https://github.com/nbats/FMHYedit/blob/main/base64.md
* https://notabug.org/nbatman/freemediaheckyeah/wiki/base64
* https://rentry.co/FMHYBase64`,
      "",
    );

  // FIX links appearing in single line in beginners-guide
  if (categorySlug === "beginners-guide") {
    cleanedText = cleanedText.replace(/\n\*\*\[/g, "\n* **[");
  }

  return cleanedText;
};

const quickLinks = [
  {
    title: "Discord",
    link: "https://rentry.co/fmhy-invite",
    color: "green",
  },
  {
    title: "Feedback",
    link: "/feedback",
    color: "orange",
  },
  {
    title: "Glossary",
    link: "https://rentry.org/The-Piracy-Glossary",
    color: "pink",
  },
];

const HomeContent = () => (
  <div className="hide-scrollbar flex-1 overflow-auto rounded-2xl border border-gray-800 bg-[#0B0D0E] lg:px-2 xl:px-20">
    <div className="flex min-h-full flex-col items-center justify-center">
      <p className="text-center text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl">
        <Balancer>
          The largest collection of Free stuff on the Internet!
        </Balancer>
      </p>
      <Image
        src={"/assets/fmhy.gif"}
        alt="logo"
        className="h-[12rem] w-auto sm:h-[20rem]"
        blurDataURL={blurDataUrlForLogo}
        placeholder="blur"
        width={100}
        height={100}
      />
      <div className="flex flex-wrap justify-center gap-2">
        {quickLinks.map((item) => (
          <Link key={item.title} href={item.link}>
            <Badge size="lg" color={item.color}>
              {item.title}
            </Badge>
          </Link>
        ))}
      </div>
    </div>

    <div className="min-h-dscreen flex items-center justify-center" id="faq">
      <FAQ />
    </div>
    <BottomNavigator category={""} />
  </div>
);
