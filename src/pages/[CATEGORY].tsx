import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { MARKDOWN_RESOURCES, isDevEnv, testData } from "@/lib/CONSTANTS";
import { Switch } from "@mantine/core";
import BottomNavigator from "@/components/wiki/BottomNavigator";
import CategoriesSidebar from "@/components/wiki/CategoriesSidebar";
import { useRouter } from "next/router";
import { getTableOfContents } from "@/lib/toc";
import WikiTableOfContents from "@/components/wiki/toc";
import { PanelRightOpen } from "lucide-react";
import { NextSeo } from "next-seo";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { devLog } from "@/lib/utils";

const Wiki = ({
  data,
  toc,
  isError,
}: {
  data: string;
  isError: boolean;
  toc: any;
}) => {
  const router = useRouter();

  const category = router.query.CATEGORY as string;

  // export a set of all the categories from constants and check that instead
  const markdownCategory = MARKDOWN_RESOURCES.find(
    (item) => item.urlEnding.toLowerCase() === category?.toLowerCase()
  )!;
  // todo remove ! from above line

  useEffect(() => {
    if (category && !markdownCategory) {
      router.push("/");
    }
  }, [category, markdownCategory]);

  return (
    <>
      <NextSeo
        title={`Wiki | ${markdownCategory?.title}`}
        description={`Wiki for ${markdownCategory?.title}`}
      />
      <div className="flex justify-between overflow-hidden gap-2 w-screen">
        <CategoriesSidebar markdownCategory={markdownCategory} />

        <LinkDataRenderer
          isError={isError}
          data={data}
          category={category}
          markdownCategory={markdownCategory}
          toc={toc}
        />
      </div>
    </>
  );
};

interface LinkDataRendererProps {
  data: string;
  isError: boolean;
  category: string;
  toc: any;
  markdownCategory: {
    title: string;
    urlEnding: string;
  };
}

const LinkDataRenderer: React.FC<LinkDataRendererProps> = ({
  data,
  category,
  isError,
  markdownCategory,
  toc,
}) => {
  const [starredLinks, setStarredLinks] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);

  // const linksRef = useRef(null);

  // useEffect(() => {
  //   if (!linksRef.current || !(linksRef.current as any)?.scrollTo) {
  //     console.log("UNDEFINED");
  //     return;
  //   }
  //   console.log("scrolliong up");

  //   (linksRef.current as any)?.scrollTo(0, 0);
  // }, []);

  return (
    <>
      <div
        // ref={linksRef}
        className="px-1 sm:px-4 md:px-8 lg:px-14 xl:px-20 overflow-scroll hideScrollbar flex-1 2xl:max-w-7xl"
      >
        <div className="flex justify-between items-center">
          <p className="text-3xl underline underline-offset-2 font-semibold tracking-tighter">
            {markdownCategory?.title}
          </p>
          <div className="flex items-center">
            <div className="plausible-event-name=recommended-toggle pr-6 md:pr-0">
              <Switch
                size="sm"
                checked={starredLinks}
                onChange={(event) => {
                  setStarredLinks(event.currentTarget.checked);
                }}
                offLabel={<span className="text-base">⭐️</span>}
                onLabel={<span className="text-xs">All</span>}
              />
            </div>

            {toc?.items && toc?.items.length > 0 && (
              // temp fix
              <PanelRightOpen
                className="h-6 w-6 md:hidden text-gray-400 absolute right-0"
                onClick={() => setIsTocOpen(true)}
              />
            )}
          </div>
        </div>

        {isError && <p>Something went wrong!</p>}

        {data && data.length > 0 && (
          <>
            <MarkdownRenderer category={category} starredLinks={starredLinks}>
              {data}
            </MarkdownRenderer>

            <BottomNavigator category={category} />
          </>
        )}
      </div>
      <WikiTableOfContents toc={toc} open={isTocOpen} setOpen={setIsTocOpen} />
    </>
  );
};

export default Wiki;

export async function getStaticProps({
  params: { CATEGORY },
}: {
  params: { CATEGORY: string };
}) {
  // if (isDevEnv) {
  //   return {
  //     props: {
  //       data: testData,
  //       isError: false,
  //     },
  //   };
  // }
  try {
    const markdownCategory = MARKDOWN_RESOURCES.find(
      (item) => item.urlEnding.toLowerCase() === CATEGORY?.toLowerCase()
    )!;
    const markdownUrlEnding = markdownCategory?.urlEnding;

    const res = await fetch(
      `https://raw.githubusercontent.com/nbats/FMHYedit/main/${markdownUrlEnding}.md`
    );
    const text = await res.text();

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
        !ignoreStarters.some((starter) => item.startsWith(starter))
    );

    const joinedText = cleanedList.join("\n");

    let cleanedText = (joinedText.split("For mobile users")[1] ?? joinedText)
      ?.replaceAll("►", "")
      ?.replaceAll("▷", "")
      ?.replace("#### How-to Decode Links", "")
      .replace(`# Untrusted Sites / Software`, "")
      ?.replace(
        `Use any **[Base64 Decoding](https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/storage#wiki_encode_.2F_decode_urls)** site or extension.`,
        ""
      )
      .replace(`# Untrusted Sites / Software`, "")
      ?.replace(
        `### Mirrors
* https://fmhy.net/base64
* https://fmhy.pages.dev/base64/
* https://github.com/nbats/FMHYedit/blob/main/base64.md
* https://notabug.org/nbatman/freemediaheckyeah/wiki/base64
* https://rentry.co/FMHYBase64`,
        ""
      );

    // FIX links appearing in single line in beginners-guide
    if (CATEGORY === "beginners-guide") {
      cleanedText = cleanedText.replace(/\n\*\*\[/g, "\n* **[");
    }

    const toc = await getTableOfContents(cleanedText);

    return {
      props: {
        data: cleanedText || text,
        toc,
        isError: false,
      },
      revalidate: 60 * 60 * 24 * 2, // 2 days
    };
  } catch (err: any) {
    // todo show 404 page
    devLog(err, "Err");
    return {
      props: {
        isError: true,
        data: "",
      },
    };
  }
}

export async function getStaticPaths() {
  const paths = MARKDOWN_RESOURCES.filter(
    (resource) => !!resource.urlEnding
  ).map((resource) => ({
    params: { CATEGORY: resource.urlEnding.toLowerCase() },
  }));

  return {
    paths,
    fallback: true,
  };
}
