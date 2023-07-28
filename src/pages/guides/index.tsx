import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";
import GuideItem from "@/components/GuideItem";
import { Input } from "@mantine/core";
import { FRONTEND_URL } from "@/lib/config";
import { notSignedInNotification } from "@/components/Notifications";
import { useRouter } from "next/router";
import { devLog } from "@/lib/utils";

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
  );
};

export default Guides;

export async function getStaticProps() {
  try {
    const res = await fetch(`${FRONTEND_URL}/api/guides`);
    const data = await res.json();
    return {
      props: {
        guides: data.data,
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
