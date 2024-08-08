import GuideItem from "@/components/guide-item";
import { devLog } from "@/lib/utils";
import { Input } from "@mantine/core";
import cheerio from "cheerio";
import { NextSeo } from "next-seo";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";

export interface GuideType {
  link: string;
  title: string;
}

const Guides = ({ guides }: { guides: GuideType[] }) => {
  const [inputText, setInputText] = useState("");

  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current?.focus();
    }
  }, []);

  let inputHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    var lowerCase = (e.target as HTMLInputElement).value;
    setInputText(lowerCase);
  };

  const filterData = (data: GuideType[]) => {
    if (data) {
      const filter_data = data.filter((el) => {
        if (inputText === "") {
          return el;
        } else {
          return el.title.toLowerCase().includes(inputText.toLowerCase());
        }
      });

      return filter_data;
    }
  };

  return (
    <>
      <NextSeo title="Guides" description="Collection of useful guides" />

      <div className="mx-auto flex w-[95vw] max-w-[80rem] flex-1 flex-col pt-0 sm:p-4 sm:px-8 md:px-12 md:py-2 lg:px-16 lg:py-4 xl:py-6">
        <div className="px-4 py-2">
          <p
            onClick={() => setInputText("")}
            className="mb-0 inline text-3xl font-semibold tracking-tighter md:text-4xl"
          >
            Guides
          </p>
          <Input
            className="mt-3 max-w-sm"
            type="text"
            value={inputText}
            ref={inputElement}
            onChange={inputHandler}
            autoFocus
            variant="filled"
            placeholder="Search Guide"
          />
        </div>

        <div className="flex flex-1 space-y-2">
          <div className="w-full">
            {guides.length > 0 &&
              (filterData(guides)?.length === 0 ? (
                <p className="mt-2 px-4">No results match the entered query</p>
              ) : (
                filterData(guides)?.map((item, idx) => (
                  <GuideItem key={idx} title={item.title} link={item.link} />
                ))
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Guides;

export async function getStaticProps() {
  try {
    const html = await fetch("https://rentry.co/fmhy-guides");
    const htmlData = await html.text();

    const $ = cheerio.load(htmlData);
    const ul = $("ul").first();
    const res: Array<{ title: string; link: string }> = [];

    ul.find("li").each((i, el) => {
      const li = $(el);
      const link = li.children().first().attr("href");
      const text = li.text();

      if (!link) {
        console.log(text, "NO LINK FOUND");
        return;
      }

      res.push({
        title: text,
        link: link,
      });
    });

    return {
      props: {
        guides: res,
      },
      revalidate: 60 * 60 * 24 * 2, // 2 day
    };
  } catch (err: any) {
    devLog(err.message);
    return {
      notFound: true,
    };
  }
}
