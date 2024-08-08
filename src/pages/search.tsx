import Link from "@/components/link";
import { MARKDOWN_URL_ENDING_TO_EMOJI_MAPPING } from "@/lib/constants";
import { LiRenderer, LinkRenderer } from "@/lib/wiki/renderers";
import {
  generateWikiLinkFromCategories,
  stripLinksFromMarkdown,
} from "@/lib/wiki/utils";
import { DlWikiLinkType } from "@/scraper/dl-wiki";
import WikiData from "@/scraper/wiki.json";
import { Badge, Input } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { Index } from "flexsearch";
import { Search as SearchIcon } from "lucide-react";
import { NextSeo, SiteLinksSearchBoxJsonLd } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

const SEARCH_RESULTS_LIMIT = 100;

const Search = () => {
  const { push, query, isReady } = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>("");

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isReady) return;

    const q = (query.q as string) ?? "";

    if (q) {
      setSearchQuery(q);
    } else {
      searchRef.current?.focus();
    }
  }, [isReady]);

  const navigatePage = (query: string) => {
    let params = new URLSearchParams(window.location.search);
    params.set("q", query);

    push({
      pathname: "/search",
      query: params.toString(),
    });
  };

  const searchHandler = async () => {
    navigatePage(searchQuery);
    searchRef.current?.blur();
  };

  const resetSearch = () => {
    push("/search");
    setSearchQuery("");
  };

  return (
    <>
      <NextSeo title="Search" description="Fmhy Search" />
      <SiteLinksSearchBoxJsonLd
        url="https://fmhy.vercel.app"
        potentialActions={[
          {
            target: "https://fmhy.vercel.app/search?q",
            queryInput: "search_term_string",
          },
        ]}
      />
      <div className="mb-8 flex w-screen flex-1 flex-col px-6 pt-4 sm:px-8 md:px-12 md:py-2 lg:px-16 lg:py-4 xl:py-6">
        <div className="flex items-center justify-between">
          <div>
            <p
              onClick={resetSearch}
              className="text-3xl font-semibold tracking-tighter hover:cursor-pointer"
            >
              <span className="text-cyan-400">FMHY</span> Search
            </p>
          </div>
          <div className="space-y-2"></div>
        </div>

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

        <LocalSearch query={searchQuery} />
      </div>
    </>
  );
};
export default Search;

const LocalSearch = ({ query }: { query: string }) => {
  const [debouncedQuery] = useDebouncedValue(query, 150);

  const [index, setIndex] = useState(
    new Index({
      tokenize: "forward",
      language: "en",
      preset: "score",
      cache: true,

      // give more weight to categories, and links with "⭐"

      // context: true,
    }),
  );
  const [results, setResults] = useState<any[]>();

  useEffect(() => {
    (WikiData as DlWikiLinkType[]).forEach((item, id) => {
      const itemWithoutLinks = stripLinksFromMarkdown(item.content);
      setIndex(
        index.add(
          id,
          `${itemWithoutLinks} ${item.subcategory} ${item.subsubcategory}`,
        ),
      );
    });
  }, []);

  useEffect(() => {
    if (!debouncedQuery) return;

    // update url history
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("q", debouncedQuery);
    const newUrl = window.location.pathname + "?" + urlParams.toString();
    history.pushState(null, "", newUrl);

    setResults(index.search(debouncedQuery, SEARCH_RESULTS_LIMIT));
  }, [debouncedQuery]);

  const finalResult = results?.map(
    (result) => (WikiData as DlWikiLinkType[])[result],
  );

  return (
    <div className="pb-14 pt-2">
      {debouncedQuery && (
        <p className="mb-2 text-gray-400">
          {results?.length === SEARCH_RESULTS_LIMIT ? "> " : " "}
          {results?.length} results{" "}
        </p>
      )}

      {!query ? (
        <></>
      ) : debouncedQuery !== query ? (
        // <p className="text-gray-400">loading</p>
        <></>
      ) : finalResult?.length === 0 ? (
        <>no result found</>
      ) : (
        finalResult?.map((result: DlWikiLinkType, idx) => (
          <div
            key={idx}
            className="my-2 list-none rounded-xl"
            style={{
              background: "#11151F",
              padding: "0.5rem 1rem",
            }}
          >
            <ReactMarkdown
              components={{
                a: LinkRenderer,
                li: (props: any) => LiRenderer(props, false), //for storage only
              }}
            >
              {result.content}
            </ReactMarkdown>

            <div className="flex gap-2">
              <Link
                href={generateWikiLinkFromCategories(
                  result.category,
                  result.subcategory,
                  result.subsubcategory,
                )}
              >
                {result.category && (
                  <div className="max-w-[80vw]">
                    <Badge
                      className="py-3"
                      fullWidth
                      leftSection={
                        <>
                          {
                            MARKDOWN_URL_ENDING_TO_EMOJI_MAPPING[
                              result.category.toLowerCase()
                            ]
                          }
                        </>
                      }
                    >
                      {result.category}{" "}
                      {result.subcategory && (
                        <>
                          <span>/</span> {result.subcategory}{" "}
                        </>
                      )}
                      {result.subsubcategory && (
                        <>
                          <span>/</span> {result.subsubcategory}
                        </>
                      )}
                    </Badge>
                  </div>
                )}
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
