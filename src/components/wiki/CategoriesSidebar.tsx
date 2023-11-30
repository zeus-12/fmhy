import { MARKDOWN_RESOURCES } from "@/lib/CONSTANTS";
import Link from "@/components/Link";
import { cn } from "@/lib/utils";
import { useWiki } from "@/lib/store";
import { useState } from "react";
import { ChevronDown, ChevronsDownIcon } from "lucide-react";

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
  const { hideCategory } = useWiki();
  return (
    <div className="bg-[#050a15] border-gray-700 border-r-[1px] h-full overflow-scroll hideScrollbar">
      {MARKDOWN_RESOURCES.map((item) => {
        if (item.hasSubItems) {
          return (
            <ToggleableCategory
              hideCategory={hideCategory}
              urlEnding={markdownCategory.urlEnding}
              key={item.urlEnding}
              item={item}
            />
          );
        }
        return (
          <Link
            key={item.emoji}
            href={`/${item.urlEnding.toLowerCase()}`}
            className={cn(
              item.urlEnding === markdownCategory?.urlEnding
                ? "text-gray-300 font-semibold border-r-[2px] border-white"
                : "text-gray-500",
              "rounded-sm px-2 sm:px-4 my-2 py-2 group block"
            )}
          >
            <CategoryCard
              hideCategory={hideCategory}
              emoji={item.emoji}
              title={item.title}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default CategoriesSidebar;

const ToggleableCategory = ({
  item,
  urlEnding,
  hideCategory,
}: {
  item: (typeof MARKDOWN_RESOURCES)[0];
  urlEnding: string;
  hideCategory: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <>
      <div
        className={cn(
          "rounded-sm px-2 sm:px-4 my-2 py-2 group block text-gray-500",
          isOpen && "bg-gray-900 rounded-lg "
        )}
      >
        <CategoryCard
          hideCategory={hideCategory}
          emoji={item.emoji}
          title={item.title}
          onClick={toggleOpen}
          hasSubItems={item.hasSubItems}
        />
      </div>

      {isOpen &&
        item.items?.map((subItem) => {
          return (
            <Link
              key={subItem.emoji}
              href={`/${subItem.urlEnding.toLowerCase()}`}
              className={cn(
                subItem.urlEnding.toLowerCase() === urlEnding.toLowerCase()
                  ? "text-gray-300 font-semibold border-r-[2px] border-white"
                  : "text-gray-500",
                "rounded-sm px-2 sm:px-4 md:pl-8 my-2 py-2 group block"
              )}
            >
              <CategoryCard
                hideCategory={hideCategory}
                emoji={subItem.emoji}
                title={subItem.title}
              />
            </Link>
          );
        })}
    </>
  );
};

const CategoryCard = ({
  hideCategory,
  emoji,
  title,
  onClick,
  hasSubItems,
}: {
  hideCategory: boolean;
  title: string;
  emoji: string;
  hasSubItems?: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      className="flex items-center justify-between hover:cursor-pointer"
      onClick={onClick}
    >
      <p className="group-hover:text-slate-200 text-base">
        <span className="group-hover:animate-pulse">{emoji}</span>
        <span
          className={cn(
            hideCategory && "hidden md:inline-flex",
            "transition-all duration-100 ease-in-out"
          )}
        >
          &nbsp;&nbsp;{title}
        </span>
      </p>
      {hasSubItems && <ChevronDown size={20} className="ml-auto" />}
    </div>
  );
};
