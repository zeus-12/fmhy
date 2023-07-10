import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { Kbd } from "@mantine/core";
import { useSpotlight } from "@mantine/spotlight";

const navItems = [
  { link: "/search", name: "Search", startsWith: "/search" },
  { link: "/guides", name: "Guides", startsWith: "/guides" },
  { link: "/links", name: "Links", startsWith: "/links" },
];

export const LinkElements = () => {
  const router = useRouter();
  const curLink = router.pathname;

  return (
    <div className="text-gray-300 text-md sm:text-lg font-medium flex gap-2 sm:gap-6 lg:gap-8">
      {navItems.map((item, index) => (
        <Link key={index} href={item.link}>
          <p
            className={`px-0.5 py-1 lg:px-2 rounded-md hover:text-white cursor-pointer text-center hover:bg-gray-900 ${
              curLink.startsWith(item.startsWith)
                ? "text-white"
                : "text-gray-500"
            }`}
          >
            {item.name}
          </p>
        </Link>
      ))}
    </div>
  );
};

export const Logo = () => (
  <Link href="/">
    <div className="flex gap-2 items-center">
      <Image src="/assets/logo.png" alt="logo" width={40} height={40} />
      <p className="font-semibold tracking-tight text-gray-200 font-mono text-lg sm:text-2xl md:text-lg">
        FMHY
      </p>
    </div>
  </Link>
);

const Navbar = () => {
  return (
    <>
      <div className="px-6 border-b-[1px] border-gray-800 w-screen h-16 bg-black flex justify-between items-center z-40">
        <Logo />
        <LinkElements />
        <SearchBar />
      </div>
    </>
  );
};

export const SearchBar = () => {
  const spotlight = useSpotlight();
  return (
    //     <div
    //       className="py-1 w-36 lg:w-58 max-w-[60%] mx-auto flex items-center rounded-md px-2 gap-2 bg-[#252728] hover:cursor-pointer"
    //       onClick={spotlight.openSpotlight}
    //     >
    //       <Search className="w-5 h-5 text-gray-400" />

    //       <p className="text-gray-600 w-36 text-sm">Search</p>

    <div className="hover:cursor-pointer" onClick={spotlight.openSpotlight}>
      <Kbd className="ml-auto">/</Kbd>
    </div>
    // </div>
  );
};
export default Navbar;
