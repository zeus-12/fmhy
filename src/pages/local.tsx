import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useDebouncedValue } from "@mantine/hooks";
import { Index } from "flexsearch";
import WikiData from "@/scraper/wiki-v2/data.json";
import { Input } from "@mantine/core";
const data = WikiData.data.split("\n");

const LocalSearch = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 200);

  const [index, setIndex] = useState(
    new Index({
      tokenize: "full",
      language: "en",
      preset: "score",
      cache: true,

      // context: true,
    })
  );

  // fix the defeault limit of 100 reuslts
  // find the best parameters for index
  const [results, setResults] = useState<any[]>();

  useEffect(() => {
    data.forEach((item, id) => {
      setIndex(index.add(id, item));
    });
  }, []);

  useEffect(() => {
    setResults(index.search(debouncedQuery));
  }, [debouncedQuery]);

  const finalResult = results?.map((result) => data[result]);

  console.log(results);

  return (
    <div>
      <Input
        placeholder="Try Adblocker"
        value={query}
        onChange={(e: any) => setQuery(e.target.value)}
        className="w-[85vw] sm:w-96"
      />
      <div>
        <p>using flexsearch</p>

        <p>{results?.length} results </p>
        {finalResult?.map((result: any, idx) => (
          // @ts-ignore
          <ReactMarkdown key={idx}>{result}</ReactMarkdown>
        ))}
      </div>
    </div>
  );
};

export default LocalSearch;
