import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";
import GuideItem from "@/components/GuideItem";
import { Input } from "@mantine/core";
import { FRONTEND_URL } from "@/lib/config";
import { devLog } from "@/lib/utils";
import { NextSeo } from "next-seo";
import { Base64LinksType } from "@/pages/oldbase64";

export interface GuideType {
  credits?: string;
  link: string;
  nsfw: boolean;
  tags: string;
  id: string;
  title: string;
}

const Guides = ({
  guides,
  isError,
}: {
  guides: GuideType[];
  isError: boolean;
  errorMessage?: string;
}) => {
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

      <div className="sm:p-4 sm:px-8 md:px-12 lg:px-16 md:py-2 lg:py-4 xl:py-6 pt-0 flex-1 flex flex-col mx-auto w-[95vw] max-w-[80rem]">
        <div className="px-4 py-2">
          <p
            onClick={() => setInputText("")}
            className="mb-0 inline text-3xl tracking-tighter font-semibold md:text-4xl"
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
        {isError && <p>Can&apos;t connect to the server</p>}

        <div className="space-y-2 flex-1 flex">
          <div className="w-full">
            {guides.length > 0 &&
              (filterData(guides)?.length === 0 ? (
                <p className="mt-2 px-4">No results match the entered query</p>
              ) : (
                filterData(guides)?.map((item) => (
                  <GuideItem key={item.id} data={item} />
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
    const base64 = await fetch(`${FRONTEND_URL}/api/base64`);
    const base64Data = (await base64.json()).data;

    const guideDomains = ["rentry", "pastelink", "telegra.ph", "pastebin"];

    const scrapedGuides: any = [];

    base64Data.map((item: Base64LinksType) => {
      try {
        const decoded = atob(item.hash);
        const link = decoded
          .split("\n")
          .filter((item) => !!item)
          .filter((link) =>
            guideDomains.some((domain) => link.includes(domain))
          );

        if (link.length === 0) return;

        for (let i = 0; i < link.length; i++) {
          scrapedGuides.push({
            title: item.title + (link.length > 1 ? ` ${i + 1}` : ""),
            link: link[i],
            nsfw: false,
            tags: "",
            id: Math.random().toString(36).substr(2, 9),
          });
        }
      } catch (err) {
        devLog("Invalid base64 string");
      }
    });

    const res = await fetch(`${FRONTEND_URL}/api/guides`);
    const data = await res.json();
    return {
      props: {
        guides: [...data.data, ...scrapedGuides],
        isError: false,
      },
      revalidate: 60 * 60 * 24, // 1 day
    };
  } catch (err: any) {
    devLog(err.message);
    return {
      props: {
        guides: [],
        isError: true,
      },
    };
  }
}
