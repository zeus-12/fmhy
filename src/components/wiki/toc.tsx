import Link from "@/components/link";
import { type TableOfContents } from "@/lib/toc";
import { cn } from "@/lib/utils";
import { Drawer } from "@mantine/core";
import { XIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

interface TableOfContentsProps {
  toc: TableOfContents;
  open: boolean;
  toggle: () => void;
}

export default function TableOfContents({
  toc,
  open,
  toggle,
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
    <>
      <div className="hideScrollbar hidden overflow-y-scroll md:block">
        {toc?.items && toc?.items?.length > 0 ? (
          <Toc toc={toc} activeHeading={activeHeading} />
        ) : null}
      </div>

      {toc?.items && toc?.items?.length > 0 ? (
        <Drawer
          opened={open}
          className="hideScrollbar bg-black md:hidden"
          classNames={{
            body: "p-8",
            content: "hideScrollbar",
          }}
          position="right"
          size="sm"
          onClose={toggle}
          overlayProps={{
            opacity: 0.55,
            blur: 3,
          }}
          withCloseButton={false}
          zIndex={10}
        >
          <Toc toc={toc} activeHeading={activeHeading} closeModal={toggle} />
        </Drawer>
      ) : null}
    </>
  );
}

function Toc({
  toc,
  activeHeading,
  closeModal,
}: {
  toc: TableOfContents;
  activeHeading?: string | null;
  closeModal?: () => void;
}) {
  const isModal = !!closeModal;

  return (
    <div className="hideScrollbar overflow-scroll py-4 md:pr-2 lg:pr-8">
      <div className="flex items-center justify-between">
        <p className={cn(`font-semibold`, isModal && "text-xl")}>Contents</p>
        {isModal && (
          <XIcon
            className="cursor-pointer text-gray-400"
            onClick={closeModal}
          />
        )}
      </div>
      <Tree
        tree={toc}
        activeItem={activeHeading}
        closeModal={closeModal}
        isModal={isModal}
      />
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
  closeModal?: () => void;
  isModal?: boolean;
}

function Tree({ tree, level = 1, activeItem, closeModal, isModal }: TreeProps) {
  return tree?.items?.length && level < 3 ? (
    <ul className={cn("m-0 list-none", { "pl-4": level !== 1 })}>
      {tree.items.map((item, index) => {
        return (
          <li
            onClick={isModal ? closeModal : undefined}
            key={index}
            className={cn("mt-0 pt-2")}
          >
            <Link
              href={item.url}
              className={cn(
                "inline-block text-sm no-underline hover:text-slate-100",
                item.url === `#${activeItem}`
                  ? "text-slate-100"
                  : "text-slate-500",
                isModal && "text-md",
              )}
            >
              {item.title}
            </Link>
            {item.items?.length ? (
              <Tree
                tree={item}
                level={level + 1}
                activeItem={activeItem}
                closeModal={closeModal}
              />
            ) : null}
          </li>
        );
      })}
    </ul>
  ) : null;
}
