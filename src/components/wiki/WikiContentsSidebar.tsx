import { Drawer, Loader } from "@mantine/core";
import {
  convertTextToLowerCamelCase,
  removeSymbolsInHeading,
} from "@/lib/wiki/helpers";
import { useState } from "react";
import { PanelRightOpen, X } from "lucide-react";
interface WikiContentsSidebarProps {
  CATEGORY: string;
  markdownHeadings: Record<string, string[]>;
}

const WikiContentsSidebar: React.FC<WikiContentsSidebarProps> = ({
  CATEGORY,
  markdownHeadings,
}) => {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <PanelRightOpen
        className="h-7 w-7 md:hidden absolute right-3 text-gray-500"
        onClick={() => setOpened(true)}
      />
      <div className="hidden md:flex">
        <WikiContentsSidebarData
          markdownHeadings={markdownHeadings}
          CATEGORY={CATEGORY}
        />
      </div>

      <Drawer
        opened={opened}
        className="bg-black md:hidden"
        classNames={{
          body: "p-0",
        }}
        position="right"
        size="sm"
        onClose={() => setOpened(false)}
        overlayProps={{
          opacity: 0.55,
          blur: 3,
        }}
        withCloseButton={false}
        zIndex={20}
      >
        <>
          <Drawer.Header>
            <p className="text-2xl font-semibold">Contents</p>
            <Drawer.CloseButton />
          </Drawer.Header>
          <WikiContentsSidebarData
            markdownHeadings={markdownHeadings}
            CATEGORY={CATEGORY}
            closeDrawer={() => setOpened(false)}
            isDrawer={true}
          />
        </>
      </Drawer>
    </>
  );
};

interface WikiContentsSidebarDataProps extends WikiContentsSidebarProps {
  isDrawer?: boolean;
  closeDrawer?: () => void;
}

const WikiContentsSidebarData: React.FC<WikiContentsSidebarDataProps> = ({
  markdownHeadings,
  CATEGORY,
  isDrawer,
  closeDrawer,
}) => {
  return (
    <div
      className={`${
        ["home"].includes(CATEGORY) ? "hidden" : ""
      } px-5 py-2 bg-[#0E131F] border-l-[1px] h-full w-full border-gray-700 md:flex-col overflow-scroll hideScrollbar min-w-[12rem]`}
    >
      <div className="flex items-center justify-between">
        <p className="text-2xl tracking-tighter font-medium px-4">Contents</p>
        {isDrawer && <X className="h-6 w-6" onClick={closeDrawer} />}
      </div>
      {Object.entries(markdownHeadings).length > 0 ? (
        Object.entries(markdownHeadings)?.map((item) => (
          <div key={item[0]} className="px-2 py-1">
            <a
              href={`#${convertTextToLowerCamelCase(item[0])}`}
              className="text-gray-500 text-lg hover:text-slate-300"
            >
              &#x203A; {removeSymbolsInHeading(item[0])}
            </a>
            {item[1]?.map((subHeading) => (
              <div key={subHeading} className="px-3 py-[3px]">
                <a
                  href={`#${convertTextToLowerCamelCase(subHeading)}`}
                  className="text-gray-500 text-base hover:text-slate-300"
                >
                  &#xbb; {removeSymbolsInHeading(subHeading)}
                </a>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className="justify-center items-center flex h-[calc(100vh_-_6rem)]">
          <Loader variant="dots" />
        </div>
      )}
    </div>
  );
};

export default WikiContentsSidebar;
