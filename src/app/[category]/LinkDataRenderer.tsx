"use client";

import BottomNavigator from "@/components/wiki/BottomNavigator";
import WikiTableOfContents from "@/components/wiki/toc";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { useWiki } from "@/lib/store";

interface LinkDataRendererProps {
  data: string;
  category: string;
  toc: any;
  markdownCategory: {
    title: string;
    urlEnding: string;
  };
}

const LinkDataRenderer: React.FC<LinkDataRendererProps> = ({
  data,
  category,
  markdownCategory,
  toc,
}) => {
  // const [starredLinks, setStarredLinks] = useState(false);

  // const linksRef = useRef(null);

  // useEffect(() => {
  //   if (!linksRef.current || !(linksRef.current as any)?.scrollTo) {
  //     console.log("UNDEFINED");
  //     return;
  //   }
  //   console.log("scrolliong up");

  //   (linksRef.current as any)?.scrollTo(0, 0);
  // }, []);

  const { showOnlyStarred, showToc, toggleShowToc } = useWiki();

  return (
    <>
      <div
        // ref={linksRef}
        className="px-1 sm:px-4 md:px-8 lg:px-14 xl:px-20 overflow-scroll hideScrollbar flex-1 2xl:max-w-7xl  pb-12"
      >
        <div className="flex justify-between items-center">
          <p className="text-3xl underline underline-offset-2 font-semibold tracking-tighter">
            {markdownCategory?.title}
          </p>
          <div className="flex items-center">
            {/* <div className="plausible-event-name=recommended-toggle pr-6 md:pr-0">
                  <Switch
                    size="sm"
                    checked={starredLinks}
                    onChange={(event) => {
                      setStarredLinks(event.currentTarget.checked);
                    }}
                    offLabel={<span className="text-base">⭐️</span>}
                    onLabel={<span className="text-xs">All</span>}
                  />
                </div> */}
            {/* {toc?.items && toc?.items.length > 0 && ( */}
          </div>
        </div>

        {data && data.length > 0 && (
          <>
            <MarkdownRenderer
              category={category}
              showOnlyStarred={showOnlyStarred}
            >
              {data}
            </MarkdownRenderer>

            <BottomNavigator category={category} />
          </>
        )}
      </div>
      <WikiTableOfContents toc={toc} open={showToc} toggle={toggleShowToc} />
    </>
  );
};

export default LinkDataRenderer;
