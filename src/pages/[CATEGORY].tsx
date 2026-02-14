import MarkdownRenderer from "@/components/markdown-renderer";
import BottomNavigator from "@/components/wiki/bottom-navigator";
import CategoriesSidebar from "@/components/wiki/categories-sidebar";
import WikiTableOfContents from "@/components/wiki/toc";
import {
  ChildResource,
  MARKDOWN_RESOURCES,
  ResourceEle,
} from "@/lib/constants";
import { useWiki } from "@/lib/store";
import { getTableOfContents } from "@/lib/toc";
import { devLog } from "@/lib/utils";
import { getWikiUrl } from "@/lib/wiki/utils";
import { NextSeo } from "next-seo";
import { useEffect, useRef } from "react";

const Wiki = ({
  data,
  toc,
  markdownCategory,
}: {
  data: string;
  toc: any;
  markdownCategory: ChildResource;
}) => {
  return (
    <>
      <NextSeo
        title={`Wiki | ${markdownCategory?.title}`}
        description={`Wiki for ${markdownCategory?.title}`}
      />
      <div className="flex w-screen justify-between overflow-hidden">
        <CategoriesSidebar markdownCategory={markdownCategory} />

        <LinkDataRenderer
          data={data}
          markdownCategory={markdownCategory}
          toc={toc}
        />
      </div>
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
    <div className="flex flex-1 justify-evenly rounded-2xl border border-gray-800 bg-[#0B0D0E] lg:px-2 xl:px-20">
      <div
        ref={linksRef}
        className="hide-scrollbar xl:pt-18 max-w-2xl overflow-scroll px-2 py-6 sm:px-8 sm:pt-8 md:pt-14 lg:px-6 lg:pt-14 xl:px-8"
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="text-2xl font-semibold tracking-tighter underline-offset-2">
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
        className="xl:py-18 hidden px-4 py-14 lg:block xl:px-8"
        toc={toc}
      />
    </div>
  );
};

export default Wiki;

export async function getStaticProps({
  params: { CATEGORY },
}: {
  params: { CATEGORY: string };
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
  try {
    let markdownCategory: ResourceEle | undefined;

    MARKDOWN_RESOURCES.forEach((item) => {
      if (!item.hasSubItems) {
        if (item.urlEnding.toLowerCase() === CATEGORY?.toLowerCase()) {
          markdownCategory = item;
          return;
        }
      } else {
        const ele = item.items?.find(
          (subItem) =>
            subItem.urlEnding.toLowerCase() === CATEGORY?.toLowerCase(),
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
    if (CATEGORY === "beginners-guide") {
      cleanedText = cleanedText.replace(/\n\*\*\[/g, "\n* **[");
    }

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
  const paths: { params: { CATEGORY: string } }[] = [];

  MARKDOWN_RESOURCES.forEach((resource) => {
    // THIS IS JUST TO TARGET THE HOME PAGE AND SUB PAGES (ones with '#')
    if (
      !resource.hasSubItems &&
      (!resource.urlEnding || resource.urlEnding.includes("#"))
    ) {
      return;
    }

    if (resource.hasSubItems) {
      resource.items?.forEach((item) => {
        // THIS IS JUST TO TARGET THE HOME PAGE AND SUB PAGES (ones with '#')
        if (
          !item.hasSubItems &&
          (!item.urlEnding || item.urlEnding.includes("#"))
        ) {
          return;
        }
        paths.push({
          params: { CATEGORY: item.urlEnding.toLowerCase() },
        });
      });
    } else {
      paths.push({
        params: { CATEGORY: resource.urlEnding.toLowerCase() },
      });
    }
  });

  return {
    paths,
    fallback: false,
  };
}
