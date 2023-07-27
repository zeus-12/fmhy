import { TableOfContents } from "@/lib/toc";
import { cn } from "@/lib/utils";
import { Drawer } from "@mantine/core";
import { XIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface TableOfContentsProps {
  toc: TableOfContents;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function TableOfContents({
  toc,
  open,
  setOpen,
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
    [toc]
  );
  const activeHeading = useActiveItem(itemIds);
  return (
    <>
      <div className="hidden md:block overflow-y-scroll">
        {toc?.items ? <Toc toc={toc} activeHeading={activeHeading} /> : null}
      </div>

      {toc?.items && toc?.items?.length > 0 ? (
        <Drawer
          opened={open}
          className="bg-black md:hidden hideScrollbar"
          classNames={{
            body: "mt-16 p-8",
            content: "hideScrollbar",
          }}
          position="right"
          size="sm"
          onClose={() => setOpen(false)}
          overlayProps={{
            opacity: 0.55,
            blur: 3,
          }}
          withCloseButton={false}
          zIndex={20}
        >
          <Toc
            toc={toc}
            activeHeading={activeHeading}
            closeModal={() => setOpen(false)}
          />
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
    <div className="space-y-2 overflow-scroll lg:pr-8 md:pr-2 hideScrollbar">
      <div className="flex justify-between items-center">
        <p className={cn(`font-medium`, isModal && "text-xl")}>Contents</p>
        {isModal && (
          <XIcon
            className="text-gray-400 cursor-pointer"
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
      { rootMargin: `0% 0% -80% 0%` }
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
  }, [itemIds]);

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
            <a
              href={item.url}
              className={cn(
                "inline-block no-underline text-sm hover:text-slate-100",
                item.url === `#${activeItem}`
                  ? "text-slate-100"
                  : "text-slate-500",
                isModal && "text-md"
              )}
            >
              {item.title}
            </a>
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
