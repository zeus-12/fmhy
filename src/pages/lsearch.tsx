import { useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { doASearch } from "@/scraper/wiki-v2";
import { Input } from "@mantine/core";
import { SearchIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface SearchData {
  results: string[];
  matchingSections: string[];
}

const Lsearch = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [data, setData] = useState<SearchData>();
  useEffect(() => {
    const searchLocal = async () => {
      const { results, matchingSections } = await doASearch(query);
      // console.log(results, matchingSections);
      setData({
        results,
        matchingSections,
      });
    };

    searchLocal();
  }, [debouncedQuery]);

  return (
    <div>
      <Input
        placeholder="Try Adblocker"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        // onKeyDown={(e) => {
        //   if (e.key === "Enter") {
        //     setQuery(query);
        //   }
        // }}
        rightSection={<SearchIcon className="h-5 w-5 text-gray-400" />}
        className="w-[85vw] sm:w-96"
      />

      {debouncedQuery !== query ? (
        "loading.."
      ) : query === "" ? (
        "Search for something"
      ) : data && data.results.length + data.matchingSections.length > 0 ? (
        <>
          <p>{data.results.length} Results found!</p>
          {data?.results.map((result, idx) => (
            <div key={idx}>
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          ))}

          {/* <p>Matching categories</p>
          {data.matchingSections.map((section, idx) => (
            <ReactMarkdown key={idx}>{section}</ReactMarkdown>
          ))} */}
        </>
      ) : (
        <p> No results found</p>
      )}
    </div>
  );
};
export default Lsearch;
