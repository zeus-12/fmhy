import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";
import GuideItem from "@/components/GuideItem";
import { Input } from "@mantine/core";
import { FRONTEND_SERVER_URL, SERVER_URL } from "@/lib/config";
import { notSignedInNotification } from "@/components/Notifications";
import { Plus, Search, X } from "lucide-react";
// import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

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
  const [showInput, setShowInput] = useState(false);

  const inputElement = useRef<HTMLInputElement>(null);

  const router = useRouter();
  // const { isSignedIn } = useUser();
  const isSignedIn = false;

  const addGuideHandler = () => {
    if (!isSignedIn) {
      notSignedInNotification("You need to be signed in to add a guide!");
      return;
    }
    router.push("/guides/new");
  };

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current?.focus();
    }
  }, [showInput]);

  // const {
  //   data: guides,
  //   isError,
  //   isLoading,
  // } = useQuery(["guides"], () =>
  //   fetch(SERVER_URL + "/api/guides")
  //     .then((res) => res.json())
  //     .then((data) => data.data)
  // );

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
      <div
        className={`justify-between flex sm:flex-row ${showInput ? "" : ""}`}
      >
        <p
          onClick={() => setInputText("")}
          className="mb-0 inline text-3xl tracking-tighter font-semibold"
        >
          Guides
        </p>
        <div className="flex sm:ml-auto items-center sm:pr-4 sm:gap-2">
          <div className="search flex items-center gap-2">
            {showInput ? (
              <>
                <Input
                  className="flex sm:w-52"
                  type="text"
                  value={inputText}
                  ref={inputElement}
                  onChange={inputHandler}
                  autoFocus
                  variant="filled"
                  placeholder="Search Guide"
                />
                <div
                  className="hover:cursor-pointer"
                  onClick={() => setShowInput(false)}
                >
                  <X className="w-6 h-6" />
                </div>
              </>
            ) : (
              <div
                className="hover:cursor-pointer"
                onClick={() => setShowInput(true)}
              >
                <Search className="w-5 h-5" />
              </div>
            )}
          </div>
          <div onClick={addGuideHandler} className="hover:cursor-pointer">
            <Plus className="w-6 h-6" />
          </div>
        </div>
      </div>
      {isError && <p>Can&apos;t connect to the server</p>}

      <div className="space-y-2 flex-1 flex">
        <div className="w-full">
          {guides.length > 0 &&
            (filterData(guides)?.length === 0 ? (
              <p className="mt-2">No results match the entered query</p>
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
    const res = await fetch(`${FRONTEND_SERVER_URL}/api/guides`);
    const data = await res.json();
    return {
      props: {
        guides: data.data,
        isError: false,
      },
      revalidate: 60 * 60 * 24, // 1 day
    };
  } catch (err: any) {
    console.log(err.message);
    return {
      props: {
        guides: [],
        isError: true,
      },
    };
  }
}
