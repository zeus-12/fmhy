import React from "react";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { MARKDOWN_RESOURCES, isDevEnv, testData } from "@/lib/CONSTANTS";
import { Switch } from "@mantine/core";
import {
  LiRenderer,
  LinkRenderer,
  PRenderer,
  CodeRenderer,
  HeadingRenderer,
  UlRenderer,
  BlockquoteRenderer,
} from "@/lib/wiki/renderers";
import BottomNavigator from "@/components/wiki/BottomNavigator";
import CategoriesSidebar from "@/components/wiki/CategoriesSidebar";
import { useRouter } from "next/router";
import { getTableOfContents } from "@/lib/toc";
import WikiTableOfContents from "@/components/wiki/toc";
import { PanelRightOpen } from "lucide-react";

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

  useEffect(() => {
    if (category && !markdownCategory) {
      router.push("/");
    }
  }, [category, markdownCategory]);

  return (
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

  return (
    <>
      <div className="px-1 sm:px-4 md:px-8 lg:px-14 xl:px-20 overflow-scroll hideScrollbar flex-1">
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
            <ReactMarkdown
              components={{
                h1: (props: any) => HeadingRenderer(props, 1),
                h2: (props: any) => HeadingRenderer(props, 2),
                h3: (props: any) => HeadingRenderer(props, 3), //for beginners guide only
                h4: (props: any) => HeadingRenderer(props, 4), //for storage only
                p: PRenderer, // for beginners guide only
                a: LinkRenderer,
                li: (props: any) => LiRenderer(props, starredLinks), //for storage only
                hr: () => <></>,
                code: (props: any) => CodeRenderer(props, category),
                ul: (props: any) => UlRenderer(props),
                blockquote: (props: any) => BlockquoteRenderer(props, category),
              }}
            >
              {data}
            </ReactMarkdown>

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

    const markdownUrl =
      "https://raw.githubusercontent.com/nbats/FMHYedit/main/" +
      markdownUrlEnding +
      ".md";

    const res = await fetch(markdownUrl);
    const text = await res.text();

    const cleanedText = (text.split("For mobile users")[1] ?? text)
      ?.replaceAll("►", "")
      ?.replaceAll("▷", "")
      ?.replaceAll("Table of Contents", "")
      ?.replaceAll("[TOC2]", "")
      ?.replaceAll("-> ***Beginners Guide to Piracy*** <-", "")
      ?.replaceAll("**[^ Back to Top](#beginners-guide-to-piracy)**", "")
      ?.replace(
        "**[Back to Wiki Index](https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/index)**",
        ""
      )
      ?.replaceAll(
        "If you have any suggestions or questions feel free to join us in [Divolt](https://redd.it/uto5vw) ♡",
        ""
      )
      ?.replaceAll(
        "Source: **[/r/FREEMEDIAHECKYEAH](https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/index)**",
        ""
      )
      ?.replace(
        `#### How-to Decode Links

Use any **[Base64 Decoding](https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/storage#wiki_encode_.2F_decode_urls)** site or extension.

***`,
        ""
      )
      .replace(`# Untrusted Sites / Software`, "")
      ?.replace(
        `### Mirrors

* https://fmhy.net/base64
* https://fmhy.pages.dev/base64/
* https://github.com/nbats/FMHYedit/blob/main/base64.md
* https://notabug.org/nbatman/freemediaheckyeah/wiki/base64
* https://rentry.co/FMHYBase64

***`,
        ""
      );

    const toc = await getTableOfContents(cleanedText);

    return {
      props: {
        data: cleanedText || text,
        toc:
          // // for some reason the toc for the beginners guide is nested one level deeper
          markdownUrlEnding === "Beginners-Guide"
            ? { items: toc?.items?.[0].items } ?? []
            : toc,
        isError: false,
      },
      revalidate: 60 * 60 * 24 * 2, // 2 days
    };
  } catch (err: any) {
    // todo show 404 page
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
