// import { useEffect } from "react";
import { MARKDOWN_RESOURCES, isDevEnv, testData } from "@/lib/CONSTANTS";
import BottomNavigator from "@/components/wiki/BottomNavigator";
import CategoriesSidebar from "@/components/wiki/CategoriesSidebar";
import { getTableOfContents } from "@/lib/toc";
import WikiTableOfContents from "@/components/wiki/toc";
import { NextSeo } from "next-seo";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { devLog } from "@/lib/utils";
import { useWiki } from "@/lib/store";
import LinkDataRenderer from "@/app/[category]/LinkDataRenderer";

const Wiki = async ({
  params: { category },
}: {
  params: { category: string };
}) => {
  // export a set of all the categories from constants and check that instead
  const markdownCategory = MARKDOWN_RESOURCES.find(
    (item) => item.urlEnding.toLowerCase() === category?.toLowerCase()
  );
  if (!markdownCategory) return <>errorr</>;

  const { props } = await getData({ params: { CATEGORY: category } });
  if (!props) return <>errorr</>;

  const { data, toc } = props;

  return (
    <>
      <NextSeo
        title={`Wiki | ${markdownCategory?.title}`}
        description={`Wiki for ${markdownCategory?.title}`}
      />
      <div className="flex justify-between overflow-hidden gap-2 w-screen">
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

export default Wiki;

async function getData({
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

// export async function getStaticPaths() {
//   const paths = MARKDOWN_RESOURCES.filter(
//     (resource) => !!resource.urlEnding
//   ).map((resource) => ({
//     params: { CATEGORY: resource.urlEnding.toLowerCase() },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }
