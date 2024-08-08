import Link from "@/components/link";
import { ChildResource, MARKDOWN_RESOURCES } from "@/lib/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

type NavigatorType = { ele: ChildResource; icon: JSX.Element } | null;
const calculateCategories = (category: string) => {
  let previousCategory: NavigatorType = null;
  let nextCategory: NavigatorType = null;

  let isFirstCategory;
  let isLastCategory;

  for (let i = 0; i < MARKDOWN_RESOURCES.length; i++) {
    const cur = MARKDOWN_RESOURCES[i];

    if (cur.hasSubItems) {
      const childIndex = cur.items.findIndex((item) => {
        return item.urlEnding.toLowerCase() === category.toLowerCase();
      });

      if (childIndex !== -1) {
        let previousCategoryEle;
        let nextCategoryEle;

        if (childIndex === 0) {
          isFirstCategory = true;
        } else {
          previousCategoryEle = cur.items[childIndex - 1];
        }

        if (childIndex === cur.items.length - 1) {
          isLastCategory = true;
        } else {
          nextCategoryEle = cur.items[childIndex + 1];
        }

        previousCategory = previousCategoryEle
          ? {
              ele: previousCategoryEle,
              icon: <ChevronLeft className="h-5 w-5 text-gray-100" />,
            }
          : null;

        nextCategory = nextCategoryEle
          ? {
              ele: nextCategoryEle,
              icon: <ChevronRight className="h-5 w-5 text-gray-100" />,
            }
          : null;

        break;
      }
    } else {
      if (cur.urlEnding.toLowerCase() === category.toLowerCase()) {
        if (i === 0) {
          isFirstCategory = true;
        } else if (i === MARKDOWN_RESOURCES.length - 1) {
          isLastCategory = true;
        }

        const next = MARKDOWN_RESOURCES[i + 1];
        const prev = MARKDOWN_RESOURCES[i - 1];

        if (next?.hasSubItems) {
          nextCategory = {
            ele: next.items[0] as ChildResource,
            icon: <ChevronRight className="h-5 w-5 text-gray-100" />,
          };
        } else {
          nextCategory =
            i === MARKDOWN_RESOURCES.length - 1
              ? null
              : {
                  ele: MARKDOWN_RESOURCES[i + 1] as ChildResource,
                  icon: <ChevronRight className="h-5 w-5 text-gray-100" />,
                };
        }

        if (prev?.hasSubItems) {
          previousCategory = {
            ele: prev.items[prev.items.length - 1] as ChildResource,
            icon: <ChevronLeft className="h-5 w-5 text-gray-100" />,
          };
        } else {
          previousCategory =
            i === 0
              ? null
              : {
                  ele: MARKDOWN_RESOURCES[i - 1] as ChildResource,
                  icon: <ChevronLeft className="h-5 w-5 text-gray-100" />,
                };
        }

        break;
      }
    }
  }

  return {
    isFirstCategory,
    previousCategory,
    nextCategory,
    isLastCategory,
  };
};

const WikiBottomNavigator: React.FC<{ category: string }> = ({ category }) => {
  const navigate = calculateCategories(category);

  if (!navigate) {
    return <></>;
  }
  const { isFirstCategory, previousCategory, nextCategory, isLastCategory } =
    navigate;

  return (
    <>
      <div className="my-8 border-[0.2px] border-gray-800" />
      <div
        className={`my-8 flex w-full gap-2 ${
          isFirstCategory
            ? "justify-end"
            : isLastCategory
              ? "justify-start"
              : "justify-between"
        }`}
      >
        {[previousCategory, nextCategory].map(
          (item: NavigatorType | null, i) => {
            if (!item || !item.ele?.urlEnding) {
              return <div key={i} />;
            }
            return (
              <Link key={i} href={`/${item.ele.urlEnding?.toLowerCase()}`}>
                <div
                  className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 hover:bg-gray-900 ${
                    i === 0 ? "" : "flex-row-reverse"
                  } ${isFirstCategory ? "ml-auto" : "mr-auto"}`}
                >
                  {item.icon}
                  <p className="text-slate-100">{item.ele.title}</p>
                </div>
              </Link>
            );
          },
        )}
      </div>
    </>
  );
};

export default WikiBottomNavigator;
