import { useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { doASearch } from "@/scraper/wiki-v2";
import { Input } from "@mantine/core";
import { SearchIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";

const Lsearch = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [results, setResults] = useState<string[]>([]);
  useEffect(() => {
    const searchLocal = async () => {
      const { results, matchingSections } = await doASearch(query);
      console.log(results, matchingSections);
      setResults(results);
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

      {debouncedQuery !== query
        ? "loading.."
        : query === ""
        ? "Search for something"
        : results.map((result, idx) => (
            <div key={idx}>
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          ))}
    </div>
  );
};
export default Lsearch;
