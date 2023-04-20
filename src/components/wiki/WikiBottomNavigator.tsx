import Link from "next/link";
import { MARKDOWN_RESOURCES } from "@/lib/CONSTANTS";
import { ArrowLeft, ArrowRight } from "lucide-react";

const WikiBottomNavigator: React.FC<{ CATEGORY: string }> = ({ CATEGORY }) => {
  const currentCategoryIndex = MARKDOWN_RESOURCES.findIndex(
    (item) => item?.urlEnding.toLowerCase() === CATEGORY?.toLowerCase()
  );

  const icons = [
    {
      ele: MARKDOWN_RESOURCES[currentCategoryIndex - 1],
      icon: (
        <ArrowLeft className="group-hover:animate-bounce w-7 h-7 text-gray-400" />
      ),
      text: "Previous",
    },
    {
      ele: MARKDOWN_RESOURCES[currentCategoryIndex + 1],
      icon: (
        <ArrowRight className="group-hover:animate-bounce w-7 h-7 text-gray-400" />
      ),
      text: "Next",
    },
  ];

  return (
    <div
      className={`flex gap-2 my-4 w-full ${
        currentCategoryIndex === 0
          ? "justify-end"
          : currentCategoryIndex === MARKDOWN_RESOURCES.length - 1
          ? "justify-start"
          : "justify-center"
      }`}
    >
      {icons.map(
        (item, i) =>
          item.ele && (
            <Link
              key={i}
              href={`/wiki/${item.ele.urlEnding.toLowerCase()}`}
              className="max-w-[20rem] w-full group"
            >
              <div
                className={`border-[1px] w-full border-gray-400 px-4 py-6 rounded-lg flex gap-2 justify-start ${
                  i === 0 ? "" : "flex-row-reverse"
                } ${currentCategoryIndex === 0 ? "ml-auto" : "mr-auto"}`}
              >
                {item.icon}
                <div className="">
                  <p className="text-gray-400">{item.text}</p>
                  <p>{item.ele.title}</p>
                </div>
              </div>
            </Link>
          )
      )}
    </div>
  );
};

export default WikiBottomNavigator;
