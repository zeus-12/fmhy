import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useDebouncedValue } from "@mantine/hooks";
import { Index } from "flexsearch";
import WikiData from "@/scraper/wiki-v2/data.json";
const data = WikiData.data.split("\n");

const LocalSearch = ({ query }: { query: string }) => {
  const [debouncedQuery] = useDebouncedValue(query, 200);

  const [index, setIndex] = useState(
    new Index({
      tokenize: "full",
      language: "en",
      preset: "match",
      cache: true,
      context: true,
    })
  );

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
    <p>
      using flexsearch
      <span>{results?.length} results </span>
      {finalResult?.map((result: any, idx) => (
        // @ts-ignore
        <ReactMarkdown key={idx}>{result}</ReactMarkdown>
      ))}
    </p>
  );
};

export default LocalSearch;
