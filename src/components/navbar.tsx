import { useRouter } from "next/router";
import Image from "next/image";
// import { Kbd } from "@mantine/core";
import { useSpotlight } from "@mantine/spotlight";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Command,
  Home,
  // PanelLeftOpen,
  PanelRightOpen,
  Search,
  Star,
} from "lucide-react";
import { useWiki } from "@/lib/store";
import { cn } from "@/lib/utils";

// const navItems = [
//   { link: "/search", name: "Search" },
//   { link: "/guides", name: "Guides" },
//   // { link: "/changelogs", name: "Changelog" },
// ];

// export const LinkElements = () => {
//   const router = useRouter();
//   const curLink = router.pathname;

//   return (
//     <div className="text-gray-300 text-base sm:text-lg font-medium flex gap-4 sm:gap-6 lg:gap-8">
//       {navItems.map((item, index) => (
//         <Link key={index} href={item.link}>
//           <p
//             className={`px-0.5 lg:px-2 rounded-md hover:text-white cursor-pointer text-center hover:bg-gray-900 ${
//               curLink.startsWith(item.link) ? "text-white" : "text-gray-500"
//             }`}
//           >
//             {item.name}
//           </p>
//         </Link>
//       ))}
//     </div>
//   );
// };

export const Logo = () => (
  <div className="flex gap-1 sm:gap-2 items-center h-full w-full">
    <Image
      src="/assets/logo.png"
      alt="logo"
      width={40}
      height={40}
      className="xs:w-10 xs:h-10 w-7 h-7"
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
      className="hover:cursor-pointer plausible-event-name=spotlight-toggle"
      onClick={spotlight.openSpotlight}
    >
      <Command className="text-gray-400 w-5 h-5 md:w-6 md:h-6" />
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
  { href: "/", icon: <Home className="text-gray-400 w-5 h-5 md:w-6 md:h-6" /> },
  {
    href: "/search",
    icon: <Search className="text-gray-400 w-5 h-5 md:w-6 md:h-6" />,
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
      (tab) => tab.href === `/${currentPath}`
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
    <div className="fixed inset-x-0 bottom-0 z-20 mx-auto mb-4 flex h-14 w-fit">
      <div className="relative mx-auto flex h-full items-center rounded-md border border-neutral-400/20 bg-white/40 backdrop-blur-md dark:border-neutral-600/30 dark:bg-black/40 dark:text-white">
        <span
          className="absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-[4px] p-1 transition-all duration-300 sm:p-1"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        >
          <span className="h-full w-full rounded-xl bg-neutral-200 backdrop-blur-xl dark:bg-neutral-800" />
        </span>

        {/* {isWikiPage && (
          <>
            <div className="px-3 md:hidden ">
              <PanelLeftOpen
                className={cn(
                  "text-gray-400 hover:cursor-pointer w-5 h-5 md:w-6 md:h-6"
                )}
                onClick={toggleHideCategory}
              />
            </div>
          </>
        )} */}
        {navItems.map((tab, index) => {
          return (
            <Link
              key={index}
              href={tab.href as string}
              ref={(el) => (tabsRef.current[index] = el)}
              className="text-white hover:text-gray-400 font-base inline-flex cursor-pointer items-center justify-center rounded-full px-3 text-center text-sm transition hover:text-black/80 dark:hover:text-white/80 sm:text-base"
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
                  "text-gray-400 hover:cursor-pointer w-5 h-5 md:w-6 md:h-6",
                  showOnlyStarred && "fill-yellow-400 text-transparent"
                )}
              />
            </div>

            <div className="px-3 md:hidden ">
              <PanelRightOpen
                className={cn(
                  "text-gray-400 hover:cursor-pointer w-5 h-5 md:w-6 md:h-6"
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
