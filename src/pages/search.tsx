import { Input, Loader, Pagination, Switch } from "@mantine/core";
import { Search as SearchIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { InferGetServerSidePropsType, NextPageContext } from "next";
import { devLog } from "@/lib/utils";
import { NextSeo } from "next-seo";

const ITEMS_PER_PAGE = 30;

interface SearchResultType {
  id: string;
  title: string;
  link: string;
  starred: boolean;
  isNsfw: boolean;
}

const Search = ({
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const q = (query.q as string) ?? "";
  const page = parseInt((query.page as string) ?? "1");
  const nsfw = query.nsfw === "true" ? true : false;

  const [searchQuery, setSearchQuery] = useState<string>(q);
  const [activePage, setActivePage] = useState(page);
  const [includeNsfw, setIncludeNsfw] = useState(nsfw);

  const searchRef = useRef<HTMLInputElement>(null);

  const {
    data: searchRes,
    fetchStatus,
    isLoading: isLoading_,
    isError,
    refetch: refetchSearchResults,
  } = useQuery({
    queryKey: ["search", searchQuery, activePage, includeNsfw],
    queryFn: async () => {
      const res = await fetch(
        `/api/search?q=${searchQuery}&page=${activePage}&nsfw=${includeNsfw}`
      );
      const data = await res.json();
      return data;
    },
    enabled: false,
  });

  useEffect(() => {
    if (q) return;
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    if (q) {
      fetchSearchResults();
    }
  }, [q, page, nsfw]);

  // cause of weird reactq behaviour, isloading remaining true when enabled is false
  const isLoading = isLoading_ && fetchStatus !== "idle";

  const searchResults: undefined | SearchResultType[] = searchRes?.data;
  const count = searchRes?.count;

  const navigatePage = ({
    page,
    nsfw,
    query,
  }: {
    page?: number;
    nsfw?: boolean;
    query?: string;
  }) => {
    let params = new URLSearchParams(window.location.search);
    if (query !== undefined) {
      params.set("q", query);
    }
    if (page !== undefined) {
      setActivePage(page);
      params.set("page", page.toString());
    }
    if (nsfw !== undefined) {
      setIncludeNsfw(nsfw);
      params.set("nsfw", nsfw.toString());
    }

    router.push({
      pathname: "/search",
      query: params.toString(),
    });
  };

  const fetchSearchResults = async () => {
    if (!searchQuery || !searchQuery.trim()) return;

    try {
      await refetchSearchResults();
    } catch (err: any) {
      devLog(err.message);
    }
  };

  const searchHandler = async () => {
    navigatePage({ page: 1, nsfw: includeNsfw, query: searchQuery });
    searchRef.current?.blur();
  };

  const paginationHandler = async (cur: number) => {
    navigatePage({ page: cur });
    window.scrollTo(0, 0);
  };

  const toggleNsfw = (e: React.FormEvent<EventTarget>) => {
    const nsfw = (e.target as HTMLInputElement).checked;
    navigatePage({ page: 1, nsfw: nsfw });
  };

  const resetSearch = () => {
    router.push("/search");
    setSearchQuery("");
    setIncludeNsfw(false);
  };

  return (
    <>
      <NextSeo title="Search" description="Fmhy Search" />
      <div className="flex flex-1 flex-col px-6 sm:px-8 md:px-12 md:py-2 lg:px-16 lg:py-4 xl:py-6 mb-8">
        <div className="flex items-center justify-between">
          <p
            onClick={resetSearch}
            className="text-3xl font-semibold tracking-tighter hover:cursor-pointer"
          >
            <span className="text-cyan-400">FMHY</span> Search
          </p>
          <Switch label="NSFW?" checked={includeNsfw} onChange={toggleNsfw} />
        </div>
        <p className="mb-2 text-gray-400">
          Missing links from{" "}
          <a
            className="text-gray-400 underline"
            href="https://github.com/nbats/FMHYedit/blob/main/STORAGE.md"
          >
            storage
          </a>
        </p>
        <Input
          placeholder="Try Adblocker"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchHandler();
            }
          }}
          ref={searchRef}
          rightSection={<SearchIcon className="h-5 w-5 text-gray-400" />}
          className="w-[85vw] sm:w-96"
        />
        {isError && (
          <div className="mt-2">
            <p className="font-semibold">
              Something went wrong, please try again later!
            </p>
          </div>
        )}
        {isLoading && (
          <div className="flex flex-1 items-center justify-center">
            <Loader size="lg" variant="bars" />
          </div>
        )}

        {!isLoading && searchResults && searchResults?.length > 0 && (
          <div className="mt-2 flex flex-1 flex-col space-y-4">
            <p className="text-gray-600">{`${count} results found`}</p>
            {searchResults.map((result) => (
              <div
                className="flex transform flex-col space-y-2 rounded-xl bg-gray-900 p-4 transition duration-100 ease-out hover:scale-[101%]"
                key={result.id}
              >
                <p className="text-xl font-semibold">{result.title}</p>
                {JSON.parse(result?.link)?.map((link: string) => (
                  <a
                    className="break-words text-cyan-400 hover:text-cyan-300"
                    href={link}
                    key={link}
                  >
                    <p>
                      <span className="pr-1 text-white">
                        {result.starred ? "⭐️" : "•"}
                      </span>
                      <span className="underline-offset-2 hover:underline">
                        {link}
                      </span>
                    </p>
                  </a>
                ))}
              </div>
            ))}

            {count && Math.ceil(count / ITEMS_PER_PAGE) > 1 && (
              <div className="mt-4 flex justify-center pb-4">
                <Pagination
                  value={activePage}
                  onChange={(cur) => paginationHandler(cur)}
                  total={Math.ceil(count / ITEMS_PER_PAGE)}
                />
              </div>
            )}
          </div>
        )}
        {!isLoading && searchResults?.length === 0 && (
          <div className="flex flex-1 items-center justify-center">
            <p>No results found! Try changing the query</p>
          </div>
        )}
      </div>
    </>
  );
};
export default Search;

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {
      query: context.query,
    },
  };
};
