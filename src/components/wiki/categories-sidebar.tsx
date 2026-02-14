import Link from "@/components/link";
import {
  ChildResource,
  MARKDOWN_RESOURCES,
  ParentResource,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";

const CategoriesSidebar = ({
  markdownCategory,
}: {
  markdownCategory: ChildResource;
}) => {
  return (
    <div className="hide-scrollbar h-full overflow-scroll bg-[#09090B] py-4">
      {MARKDOWN_RESOURCES.map((item) => {
        if (item.hasSubItems) {
          return <ToggleableCategory key={item.title} item={item} />;
        }

        return (
          <Link
            key={item.emoji}
            href={
              item.useAbsoluteUrl
                ? item.urlEnding
                : `/${item.urlEnding.toLowerCase()}`
            }
            className={cn(
              item.urlEnding === markdownCategory?.urlEnding
                ? "font-semibold text-gray-300"
                : "text-gray-500",
              "group my-2 block rounded-sm px-2 py-2 sm:px-4",
            )}
          >
            <CategoryCard emoji={item.emoji} title={item.title} />
          </Link>
        );
      })}
    </div>
  );
};

export default CategoriesSidebar;

const ToggleableCategory = ({ item }: { item: ParentResource }) => {
  const router = useRouter();

  const category = router.query.CATEGORY as string;
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <>
      <div
        className={cn(
          "group my-2 block rounded-sm px-2 py-2 text-gray-500 sm:px-4",
          isOpen && "rounded-lg bg-gray-900",
        )}
      >
        <CategoryCard
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
              href={
                subItem.useAbsoluteUrl
                  ? subItem.urlEnding
                  : `/${subItem.urlEnding.toLowerCase()}`
              }
              className={cn(
                category &&
                  subItem.urlEnding.toLowerCase() === category.toLowerCase()
                  ? "border-r-[2px] border-white font-semibold text-gray-300"
                  : "text-gray-500",
                "group my-2 block rounded-sm px-2 py-2 sm:px-4 md:pl-8",
              )}
            >
              <CategoryCard emoji={subItem.emoji} title={subItem.title} />
            </Link>
          );
        })}
    </>
  );
};

const CategoryCard = ({
  emoji,
  title,
  onClick,
  hasSubItems,
}: {
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
      <p className="text-base group-hover:text-slate-200">
        <span className="group-hover:animate-pulse">{emoji}</span>
        <span className="hidden flex-col items-start transition-all duration-100 ease-in-out md:inline-flex">
          &nbsp;&nbsp;{title}
          <span className="invisible h-0 font-semibold" aria-hidden="true">
            &nbsp;&nbsp;{title}
          </span>
        </span>
      </p>
      {hasSubItems && (
        <ChevronDown size={20} className="ml-auto hidden md:inline-flex" />
      )}
    </div>
  );
};
