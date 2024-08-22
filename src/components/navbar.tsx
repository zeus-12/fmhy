import Image from "next/image";
import { useRouter } from "next/router";
// import { Kbd } from "@mantine/core";
import { useWiki } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useSpotlight } from "@mantine/spotlight";
import {
  Command,
  Home,
  // PanelLeftOpen,
  PanelRightOpen,
  Search,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const Logo = () => (
  <div className="flex h-full w-full items-center gap-1 sm:gap-2">
    <Image
      src="/assets/logo.png"
      alt="logo"
      width={40}
      height={40}
      className="xs:h-10 xs:w-10 h-7 w-7"
    />
    {/* <p className="font-semibold tracking-tight text-gray-200 font-mono text-base xs:text-lg sm:text-2xl md:text-lg ">
        FMHY
      </p> */}
  </div>
);

// const Navbar = () => {
//   return (
//     <>
//       <div className="px-6 py-4 border-b-[1px] border-gray-800 w-screen h-16 bg-black flex justify-between items-center z-40">
//         <Logo />
//         <LinkElements />
//         <SearchBar />
//       </div>
//     </>
//   );
// };

export const SearchBar = () => {
  const spotlight = useSpotlight();
  return (
    <div
      className="plausible-event-name=spotlight-toggle hover:cursor-pointer"
      onClick={spotlight.openSpotlight}
    >
      <Command className="h-5 w-5 text-gray-400 md:h-6 md:w-6" />
      {/* <Kbd className="ml-auto"> */}
      {/* {navigator.appVersion.includes("Macintosh") ? (
          <>
            <span className="nx-text-xs">⌘</span>K
          </>
        ) : (
          "CTRL K"
        )} */}
      {/* </Kbd> */}
    </div>
  );
};
// export default Navbar;

let navItems = [
  { href: "/", icon: <Home className="h-5 w-5 text-gray-400 md:h-6 md:w-6" /> },
  {
    href: "/search",
    icon: <Search className="h-5 w-5 text-gray-400 md:h-6 md:w-6" />,
  },
];

const Navbar = () => {
  const tabsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(null);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const router = useRouter();

  const {
    showOnlyStarred,
    toggleWikiToggleStarred,
    toggleShowToc,
    // showToc,
    toggleHideCategory,
  } = useWiki();

  useEffect(() => {
    const path = window.location.pathname;
    const currentPath = path.split("/")[1];
    const currentTab = navItems.findIndex(
      (tab) => tab.href === `/${currentPath}`,
    );
    setActiveTabIndex(currentTab);
  }, [router.pathname]);

  useEffect(() => {
    if (activeTabIndex === null) {
      return;
    }

    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTabIndex] as HTMLElement;
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    };

    setTabPosition();
    window.addEventListener("resize", setTabPosition);

    return () => window.removeEventListener("resize", setTabPosition);
  }, [activeTabIndex]);

  // hardcoding for now
  const isWikiPage = router.pathname === "/[CATEGORY]";

  return (
    <div className="dark fixed inset-x-0 bottom-0 z-20 mx-auto mb-4 flex h-14 w-fit">
      <div className="relative mx-auto flex h-full items-center rounded-md border border-neutral-400/20 bg-white/40 backdrop-blur-md dark:border-neutral-600/30 dark:bg-black/40 dark:text-white">
        <span
          className="absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-[4px] p-1 transition-all duration-300 sm:p-1"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        >
          <span className="h-full w-full rounded-xl bg-neutral-200 backdrop-blur-xl dark:bg-neutral-800" />
        </span>

        {navItems.map((tab, index) => {
          return (
            <Link
              key={index}
              href={tab.href as string}
              ref={(el) => (tabsRef.current[index] = el)}
              className="font-base inline-flex cursor-pointer items-center justify-center rounded-full px-3 text-center text-sm text-white transition hover:text-black/80 hover:text-gray-400 dark:hover:text-white/80 sm:text-base"
              onClick={() => setActiveTabIndex(index)}
            >
              {tab.icon}
            </Link>
          );
        })}

        <div className="px-3">
          <SearchBar />
        </div>

        {isWikiPage && (
          <>
            <div className="px-3">
              <Star
                onClick={toggleWikiToggleStarred}
                className={cn(
                  "h-5 w-5 text-gray-400 hover:cursor-pointer md:h-6 md:w-6",
                  showOnlyStarred && "fill-yellow-400 text-transparent",
                )}
              />
            </div>

            <div className="px-3 md:hidden">
              <PanelRightOpen
                className={cn(
                  "h-5 w-5 text-gray-400 hover:cursor-pointer md:h-6 md:w-6",
                )}
                onClick={toggleShowToc}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
