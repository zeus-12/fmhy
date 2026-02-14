import Link from "@/components/link";
import { type TableOfContents } from "@/lib/toc";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

interface TableOfContentsProps {
  toc: TableOfContents;
  className: string;
}

export default function TableOfContents({
  toc,
  className,
}: TableOfContentsProps) {
  const itemIds = useMemo(
    () =>
      toc?.items
        ? toc.items
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split("#")[1])
        : [],
    [toc],
  );

  const activeHeading = useActiveItem(itemIds);
  return (
    <div className={cn("hide-scrollbar overflow-y-scroll", className)}>
      {toc?.items && toc?.items?.length > 0 ? (
        <Toc toc={toc} activeHeading={activeHeading} />
      ) : null}
    </div>
  );
}

function Toc({
  toc,
  activeHeading,
}: {
  toc: TableOfContents;
  activeHeading?: string | null;
}) {
  return (
    <div className="hide-scrollbar overflow-scroll">
      <div className="flex items-center justify-between">
        <p className="font-semibold">On this page</p>
      </div>
      <Tree tree={toc} activeItem={activeHeading} />
    </div>
  );
}

function useActiveItem(itemIds: (string | undefined)[]) {
  const router = useRouter();
  const currentHash = router.asPath.split("#")[1] || "";

  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -80% 0%` },
    );

    itemIds?.forEach((id) => {
      if (!id) {
        return;
      }

      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      itemIds?.forEach((id) => {
        if (!id) {
          return;
        }

        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [itemIds, currentHash]);

  return activeId;
}

interface TreeProps {
  tree: TableOfContents;
  level?: number;
  activeItem?: string | null;
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  return tree?.items?.length && level < 3 ? (
    <ul className={cn("m-0 list-none", { "pl-4": level !== 1 })}>
      {tree.items.map((item, index) => {
        return (
          <li key={index} className={cn("mt-0 pt-2")}>
            <Link
              href={item.url}
              className={cn(
                "inline-block text-sm no-underline hover:text-slate-100",
                item.url === `#${activeItem}`
                  ? "text-slate-100"
                  : "text-slate-500",
              )}
            >
              {item.title}
            </Link>
            {item.items?.length ? (
              <Tree tree={item} level={level + 1} activeItem={activeItem} />
            ) : null}
          </li>
        );
      })}
    </ul>
  ) : null;
}
