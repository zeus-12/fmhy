import {
  MARKDOWN_RESOURCES,
  ChildResource,
  ParentResource,
} from "@/lib/constants";
import Link from "@/components/link";
import { cn } from "@/lib/utils";
import { useWiki } from "@/lib/store";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/router";

const CategoriesSidebar = ({
  markdownCategory,
}: {
  markdownCategory: ChildResource;
}) => {
  const { hideCategory } = useWiki();
  return (
    <div className="bg-[#050a15] border-gray-700 border-r-[1px] h-full overflow-scroll hideScrollbar">
      {MARKDOWN_RESOURCES.map((item) => {
        if (item.hasSubItems) {
          return (
            <ToggleableCategory
              hideCategory={hideCategory}
              key={item.title}
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
  hideCategory,
}: {
  item: ParentResource;
  hideCategory: boolean;
}) => {
  const router = useRouter();

  const category = router.query.CATEGORY as string;
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
          hasSubItems={item.hasSubItems && item.items.length > 0}
        />
      </div>

      {isOpen &&
        item.hasSubItems &&
        item.items?.map((subItem) => {
          return (
            <Link
              key={subItem.emoji}
              href={`/${subItem.urlEnding.toLowerCase()}`}
              className={cn(
                subItem.urlEnding.toLowerCase() === category.toLowerCase()
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
      {hasSubItems && (
        <ChevronDown size={20} className="ml-auto hidden md:inline-flex" />
      )}
    </div>
  );
};
