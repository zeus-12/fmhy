import { MARKDOWN_RESOURCES } from "@/lib/CONSTANTS";
import Link from "@/components/Link";

interface CategoriesSidebarProps {
  markdownCategory: {
    title: string;
    urlEnding: string;
    emoji: string;
  };
}

const CategoriesSidebar: React.FC<CategoriesSidebarProps> = ({
  markdownCategory,
}) => {
  // const toggleNsfw = () => setIncludeNsfw((prev) => !prev);
  // const [includeNsfw, setIncludeNsfw] = useState(false);

  return (
    <div className="bg-[#050a15] border-gray-700 border-r-[1px] h-full overflow-scroll hideScrollbar">
      {/* <div className="items-center pt-2 justify-between hidden md:flex"> */}
      {/* <p className="text-xl tracking-tighter font-medium ">Categories</p> */}
      {/* <Switch
          label="NSFW?"
          size="xs"
          checked={includeNsfw}
          onChange={toggleNsfw}
        /> */}
      {/* </div> */}

      {MARKDOWN_RESOURCES
        //   .filter((item) =>
        //   includeNsfw ? item : item.urlEnding !== "NSFWPiracy"
        // )
        .map((item) => (
          <Link
            key={item.urlEnding}
            href={`/${item.urlEnding.toLowerCase()}`}
            className={`${
              item.urlEnding === markdownCategory?.urlEnding
                ? "text-gray-300 font-semibold border-r-[2px] border-white"
                : "text-gray-500"
            } rounded-sm px-2 sm:px-4 my-2 py-2 group block`}
          >
            <p className="group-hover:text-slate-200 text-base">
              <span className="group-hover:animate-pulse">{item.emoji}</span>
              <span className="hidden md:inline-flex">
                &nbsp;&nbsp;{item.title}
              </span>
            </p>
          </Link>
        ))}
    </div>
  );
};

export default CategoriesSidebar;
