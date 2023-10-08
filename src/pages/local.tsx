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
      tokenize: "forward",
      language: "en",
      preset: "score",
      cache: true,

      // context: true,
    })
  );

  // fix the defeault limit of 100 reuslts
  // find the best parameters for index
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
    setResults(index.search(debouncedQuery, 500));
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
