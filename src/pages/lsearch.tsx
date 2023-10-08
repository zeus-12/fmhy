import { Input, Loader, Pagination, Switch } from "@mantine/core";
import { Search as SearchIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { NextSeo, SiteLinksSearchBoxJsonLd } from "next-seo";
import Link from "@/components/Link";
import { SEARCH_RESULTS_PER_PAGE } from "@/lib/CONSTANTS";
import ReactMarkdown from "react-markdown";
import { useDebouncedValue } from "@mantine/hooks";
// import { doASearch } from "@/scraper/wiki-v2";
import WikiData from "@/scraper/wiki-v2/data.json";
import { Index } from "flexsearch";
import { cn } from "@/lib/utils";

interface SearchResultType {
  id: string;
  title: string;
  link: string;
  starred: boolean;
  isNsfw: boolean;
}

const Search = () => {
  const { push, query, isReady } = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activePage, setActivePage] = useState<number>();
  const [includeNsfw, setIncludeNsfw] = useState<boolean>();

  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  const [isLocalSearch, setIsLocalSearch] = useState<boolean>(true);

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isReady) return;

    const q = (query.q as string) ?? "";
    const page = parseInt((query.page as string) ?? "1");
    const nsfw = query.nsfw === "true" ? true : false;

    if (q) {
      setSearchQuery(q);
      setDebouncedQuery(q);
    } else {
      searchRef.current?.focus();
    }

    if (!isLocalSearch) {
      if (page) {
        setActivePage(page);
      }

      if (nsfw) {
        setIncludeNsfw(nsfw);
      }
    }
  }, [isReady, isLocalSearch]);

  const {
    data: searchRes,
    fetchStatus,
    isLoading: isLoading_,
    isError,
  } = useQuery({
    queryKey: ["search", debouncedQuery, activePage, includeNsfw],
    queryFn: async () => {
      const res = await fetch(
        `/api/lsearch?q=${debouncedQuery}&page=${activePage}&nsfw=${includeNsfw}`
      );
      const data = await res.json();
      return data;
    },
    enabled: !!debouncedQuery && !isLocalSearch,
  });

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

    push({
      pathname: "/lsearch",
      query: params.toString(),
    });
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
    push("/lsearch");
    setSearchQuery("");
    if (!isLocalSearch) {
      setIncludeNsfw(false);
      setDebouncedQuery("");
    }
  };

  return (
    <>
      <NextSeo title="Search" description="Fmhy Search" />
      <SiteLinksSearchBoxJsonLd
        url="https://www.fmhy.net"
        potentialActions={[
          {
            target: "https://www.fmhy.net/lsearch?q",
            queryInput: "search_term_string",
          },
        ]}
      />
      <div className="flex flex-1 flex-col px-6 sm:px-8 md:px-12 md:py-2 lg:px-16 lg:py-4 xl:py-6 mb-8 w-screen">
        <div className="flex items-center justify-between">
          <div>
            <p
              onClick={resetSearch}
              className="text-3xl font-semibold tracking-tighter hover:cursor-pointer"
            >
              <span className="text-cyan-400">FMHY</span> Search
            </p>
            {isLocalSearch ? (
              <p className="text-gray-400">
                Beta version. Search the files locally.
              </p>
            ) : (
              <p className="mb-2 text-gray-400">
                Missing links from{" "}
                <Link
                  className="text-gray-400 underline"
                  href="https://github.com/nbats/FMHYedit/blob/main/STORAGE.md"
                >
                  storage
                </Link>
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Switch
              label="Local?"
              checked={isLocalSearch}
              onChange={() => setIsLocalSearch((prev) => !prev)}
            />
            <Switch label="NSFW?" checked={includeNsfw} onChange={toggleNsfw} />
          </div>
        </div>

        <Input
          placeholder="Try Adblocker"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setDebouncedQuery(searchQuery);
              searchHandler();
            }
          }}
          ref={searchRef}
          rightSection={<SearchIcon className="h-5 w-5 text-gray-400" />}
          className="w-[85vw] sm:w-96"
        />

        {!isLocalSearch ? (
          <div>
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
                      <Link
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
                      </Link>
                    ))}
                  </div>
                ))}

                {count && Math.ceil(count / SEARCH_RESULTS_PER_PAGE) > 1 && (
                  <div className="mt-4 flex justify-center pb-4">
                    <Pagination
                      value={activePage}
                      onChange={(cur) => paginationHandler(cur)}
                      total={Math.ceil(count / SEARCH_RESULTS_PER_PAGE)}
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
        ) : (
          <LocalSearch query={searchQuery} />
        )}
      </div>
    </>
  );
};
export default Search;

const data = WikiData.data.split("\n");

const LocalSearch = ({ query }: { query: string }) => {
  const [debouncedQuery] = useDebouncedValue(query, 200);

  const [index, setIndex] = useState(
    new Index({
      tokenize: "forward",
      language: "en",
      preset: "score",
      cache: true,

      // give more weight to categories

      // context: true,
    })
  );
  const [results, setResults] = useState<any[]>();

  function extractText(input: string) {
    input = input.replace(/<[^>]+>/g, "");

    const regex = /(\[([^\]]+)\]\([^\)]+\))/g;
    input = input.replace(regex, "$2");

    input = input.trim();

    return input;
  }

  useEffect(() => {
    data.forEach((item, id) => {
      const itemWithoutLinks = extractText(item);

      setIndex(index.add(id, itemWithoutLinks));
    });
  }, []);

  useEffect(() => {
    setResults(index.search(debouncedQuery, 200));
  }, [debouncedQuery]);

  const finalResult = results?.map((result) => data[result]);

  return (
    <div>
      <div>
        {debouncedQuery && (
          <p className="text-gray-400 mb-2">
            {results?.length} {results?.length === 20 ? ">" : ""} results{" "}
          </p>
        )}

        {!query ? (
          <p>Enter somethign</p>
        ) : debouncedQuery !== query ? (
          <p>loading</p>
        ) : finalResult?.length === 0 ? (
          <>no result found</>
        ) : (
          finalResult?.map((result: any, idx) => (
            // add custom components for styling
            <ReactMarkdown className={cn("my-2 ")} key={idx}>
              {result}
            </ReactMarkdown>
          ))
        )}
      </div>
    </div>
  );
};
