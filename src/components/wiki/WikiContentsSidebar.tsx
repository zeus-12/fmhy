import { Loader } from "@mantine/core";
import {
  convertTextToLowerCamelCase,
  removeSymbolsInHeading,
} from "@/lib/wiki/helpers";

interface WikiContentsSidebarProps {
  CATEGORY: string;
  markdownHeadings: Record<string, string[]>;
}

const WikiContentsSidebar: React.FC<WikiContentsSidebarProps> = ({
  CATEGORY,
  markdownHeadings,
}) => {
  return (
    <div
      className={`${
        ["home"].includes(CATEGORY) ? "hidden" : "hidden md:inline-flex"
      } bg-[#0E131F] border-l-[1px] border-gray-700 md:flex-col overflow-scroll hideScrollbar min-w-[12rem]`}
    >
      <p className="text-xl tracking-tighter font-medium px-4 pt-2">Contents</p>
      {Object.entries(markdownHeadings).length > 0 ? (
        Object.entries(markdownHeadings)?.map((item) => (
          <div key={item[0]} className="px-2 py-1">
            <a
              href={`#${convertTextToLowerCamelCase(item[0])}`}
              className="text-gray-500 text-base hover:text-slate-300"
            >
              &#x203A; {removeSymbolsInHeading(item[0])}
            </a>
            {item[1]?.map((subHeading) => (
              <div key={subHeading} className="px-3 py-[3px]">
                <a
                  href={`#${convertTextToLowerCamelCase(subHeading)}`}
                  className="text-gray-500 text-sm hover:text-slate-300"
                >
                  &#xbb; {removeSymbolsInHeading(subHeading)}
                </a>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className="justify-center items-center flex h-[calc(100vh_-_6rem)]">
          <Loader variant="dots" />
        </div>
      )}
    </div>
  );
};

export default WikiContentsSidebar;
