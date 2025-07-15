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
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const Wiki = ({ data, toc }: { data: string; toc: any }) => {
  const router = useRouter();

  const category = router.query.CATEGORY as string;

  // export a set of all the categories from constants and check that instead
  let markdownCategory: ChildResource | undefined;

  MARKDOWN_RESOURCES.forEach((item) => {
    if (!item.hasSubItems) {
      if (item.urlEnding.toLowerCase() === category?.toLowerCase()) {
        markdownCategory = item;
        return;
      }
    } else {
      const ele = item.items?.find(
        (subItem) =>
          subItem.urlEnding.toLowerCase() === category?.toLowerCase(),
      );

      if (ele) {
        markdownCategory = ele;
        return;
      }
    }
  });

  useEffect(() => {
    if (category && !markdownCategory) {
      router.push("/");
    }
  }, [category, markdownCategory]);

  if (!markdownCategory) return <>Error</>;

  return (
    <>
      <NextSeo
        title={`Wiki | ${markdownCategory?.title}`}
        description={`Wiki for ${markdownCategory?.title}`}
      />
      <div className="flex w-screen justify-between gap-2 overflow-hidden">
        <CategoriesSidebar markdownCategory={markdownCategory} />

        <LinkDataRenderer
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
  category: string;
  toc: any;
  markdownCategory: ResourceEle | undefined;
}

const LinkDataRenderer: React.FC<LinkDataRendererProps> = ({
  data,
  category,
  markdownCategory,
  toc,
}) => {
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (linksRef.current) {
      // temp set scroll-behavior to 'auto'
      const el = linksRef.current;
      const prev = el.style.scrollBehavior;
      el.style.scrollBehavior = "auto";
      el.scrollTo(0, 0);
      el.style.scrollBehavior = prev;
    }
  }, [category]);

  // const [starredLinks, setStarredLinks] = useState(false);

  // const linksRef = useRef(null);

  // useEffect(() => {
  //   if (!linksRef.current || !(linksRef.current as any)?.scrollTo) {
  //     console.log("UNDEFINED");
  //     return;
  //   }
  //   console.log("scrolliong up");

  //   (linksRef.current as any)?.scrollTo(0, 0);
  // }, []);

  const { showOnlyStarred, showToc, toggleShowToc } = useWiki();

  return (
    <>
      <div
        ref={linksRef}
        className="hideScrollbar flex-1 overflow-scroll px-1 pb-12 pt-4 sm:px-4 md:px-8 lg:px-14 xl:px-20 2xl:max-w-7xl"
      >
        <div className="flex items-center justify-between">
          <p className="text-3xl font-semibold tracking-tighter underline underline-offset-2">
            {markdownCategory?.title}
          </p>
          <div className="flex items-center"></div>
        </div>

        {data && data.length > 0 && (
          <>
            <MarkdownRenderer
              category={category}
              showOnlyStarred={showOnlyStarred}
            >
              {data}
            </MarkdownRenderer>

            <BottomNavigator category={category} />
          </>
        )}
      </div>
      <WikiTableOfContents toc={toc} open={showToc} toggle={toggleShowToc} />
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
