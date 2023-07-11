import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { Kbd } from "@mantine/core";
import { useSpotlight } from "@mantine/spotlight";

const navItems = [
  { link: "/search", name: "Search", startsWith: "/search" },
  { link: "/guides", name: "Guides", startsWith: "/guides" },
];

export const LinkElements = () => {
  const router = useRouter();
  const curLink = router.pathname;

  return (
    <div className="text-gray-300 text-base sm:text-lg font-medium flex gap-4 sm:gap-6 lg:gap-8">
      {navItems.map((item, index) => (
        <Link key={index} href={item.link}>
          <p
            className={`px-0.5 lg:px-2 rounded-md hover:text-white cursor-pointer text-center hover:bg-gray-900 ${
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
    <div className="hover:cursor-pointer" onClick={spotlight.openSpotlight}>
      <Kbd className="ml-auto">/</Kbd>
    </div>
  );
};
export default Navbar;
