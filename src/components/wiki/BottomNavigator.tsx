import Link from "next/link";
import { MARKDOWN_RESOURCES } from "@/lib/CONSTANTS";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WikiBottomNavigator: React.FC<{ category: string }> = ({ category }) => {
  const currentCategoryIndex = MARKDOWN_RESOURCES.findIndex(
    (item) => item?.urlEnding.toLowerCase() === category?.toLowerCase()
  );

  const icons = [
    {
      ele: MARKDOWN_RESOURCES[currentCategoryIndex - 1],
      icon: <ChevronLeft className="w-5 h-5 text-gray-100" />,
    },
    {
      ele: MARKDOWN_RESOURCES[currentCategoryIndex + 1],
      icon: <ChevronRight className="w-5 h-5 text-gray-100" />,
    },
  ];

  return (
    <>
      <div className="border-gray-800 border-[0.2px] my-8" />
      <div
        className={`flex gap-2 my-8 w-full ${
          currentCategoryIndex === 0
            ? "justify-end"
            : currentCategoryIndex === MARKDOWN_RESOURCES.length - 1
            ? "justify-start"
            : "justify-between"
        }`}
      >
        {icons.map(
          (item, i) =>
            item.ele && (
              <Link key={i} href={`/${item.ele.urlEnding.toLowerCase()}`}>
                <div
                  className={`px-4 py-2 items-center rounded-lg flex gap-2 justify-center hover:bg-gray-900 ${
                    i === 0 ? "" : "flex-row-reverse"
                  } ${currentCategoryIndex === 0 ? "ml-auto" : "mr-auto"}`}
                >
                  {item.icon}
                  <p className="text-slate-100">{item.ele.title}</p>
                </div>
              </Link>
            )
        )}
      </div>
    </>
  );
};

export default WikiBottomNavigator;
