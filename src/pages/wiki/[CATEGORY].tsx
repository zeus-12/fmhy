import React from "react";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { MARKDOWN_RESOURCES } from "@/lib/CONSTANTS";
import { Switch } from "@mantine/core";
import {
  LiRenderer,
  LinkRenderer,
  PRenderer,
  CodeRenderer,
  HeadingRenderer,
} from "@/lib/wiki/renderers";
import WikiHome from "@/components/wiki/WikiHomePage";
import WikiBottomNavigator from "@/components/wiki/WikiBottomNavigator";
import WikiCategoriesSidebar from "@/components/wiki/WikiCategoriesSidebar";
import { useRouter } from "next/router";
import { getTableOfContents } from "@/lib/toc";
import WikiTableOfContents from "@/components/wiki/toc";

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

  const markdownCategory = MARKDOWN_RESOURCES.find(
    (item) => item.urlEnding.toLowerCase() === category?.toLowerCase()
  )!;

  useEffect(() => {
    if (category && !markdownCategory) {
      router.push("/wiki/home");
    }
  }, [category, markdownCategory]);

  return (
    <div className="flex justify-between overflow-hidden h-[calc(100vh_-_6rem)] gap-2">
      <WikiCategoriesSidebar markdownCategory={markdownCategory} />

      {category?.toLowerCase() === "home" ? (
        <WikiHome />
      ) : (
        <LinkDataRenderer
          isError={isError}
          data={data}
          category={category}
          markdownCategory={markdownCategory}
          toc={toc}
        />
      )}
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

  return (
    <>
      <div className="flex-1 sm:px-4 md:px-8 lg:px-14 xl:px-20 overflow-scroll hideScrollbar">
        <div className="flex justify-between items-center">
          <p className="text-3xl underline underline-offset-2 font-semibold tracking-tighter">
            {markdownCategory?.title}
          </p>
          <Switch
            className={
              ["beginners-guide", "storage"].includes(category) ? "hidden" : ""
            }
            label="Recommended?"
            size="xs"
            checked={starredLinks}
            onChange={(event) => setStarredLinks(event.currentTarget.checked)}
          />
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
              }}
            >
              {data}
            </ReactMarkdown>

            <WikiBottomNavigator category={category} />
          </>
        )}
      </div>
      <WikiTableOfContents toc={toc} />
    </>
  );
};

export default Wiki;

export async function getStaticProps({
  params: { CATEGORY },
}: {
  params: { CATEGORY: string };
}) {
  if (CATEGORY === "home") {
    return {
      props: {
        data: "",
        isError: false,
      },
    };
  }
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

    const cleanedText = text
      .split("For mobile users")[1]
      ?.replaceAll("►", "")
      ?.replaceAll("▷", "");

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
    return {
      props: {
        isError: true,
        data: "",
      },
    };
  }
}

export async function getStaticPaths() {
  const paths = MARKDOWN_RESOURCES.map((resource) => ({
    params: { CATEGORY: resource.urlEnding.toLowerCase() },
  }));

  return {
    paths,
    fallback: true,
  };
}
