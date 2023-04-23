import { useState, Dispatch, SetStateAction } from "react";
import { Burger, Drawer, Input } from "@mantine/core";
import { Kbd } from "@mantine/core";
import { useSpotlight } from "@mantine/spotlight";
import Link from "next/link";
import { Search } from "lucide-react";
import { useRouter } from "next/router";
import Image from "next/image";

const navItems = [
  { link: "/wiki/home", name: "Wiki", startsWith: "/wiki" },
  { link: "/search", name: "Search", startsWith: "/search" },
  { link: "/about", name: "About", startsWith: "/about" },
  { link: "/guides", name: "Guides", startsWith: "/guides" },
  // { link: username?"/user":"/login", name: username?"User":"Login" },
];

export const LinkElements = () => {
  const router = useRouter();
  const curLink = router.pathname;

  return (
    <>
      {navItems.map((item, index) => (
        <Link key={index} href={item.link}>
          <p
            className={`px-0.5 py-1 lg:px-2 text-2xl md:text-lg rounded-md hover:text-white cursor-pointer text-center hover:bg-gray-900 ${
              curLink.startsWith(item.startsWith)
                ? "text-white"
                : "text-gray-500"
            }`}
          >
            {item.name}
          </p>
        </Link>
      ))}
    </>
  );
};

export const Logo = () => (
  <Link href="/">
    <div className="flex gap-2 items-center">
      <Image src="/assets/logo.png" alt="logo" width={40} height={40} />
      <p className="font-semibold tracking-tight text-gray-200 font-sans text-2xl md:text-lg  hidden md:inline">
        FMHY
      </p>
    </div>
  </Link>
);

interface NavbarDrawerProps {
  opened: boolean;
  setOpened: (o: boolean) => void;
}

export const NavbarDrawer: React.FC<NavbarDrawerProps> = ({
  opened,
  setOpened,
}) => (
  <div className={opened ? "px-2" : ""}>
    <Drawer
      className="bg-black"
      opened={opened}
      position="top"
      size="100vh"
      onClick={() => setOpened(false)}
      onClose={() => setOpened(false)}
      overlayProps={{
        opacity: 0.55,
        blur: 3,
      }}
      withCloseButton={false}
      zIndex={20}
    >
      <div className="text-2xl pt-16 space-y-4">
        <SearchBar />
        <LinkElements />
      </div>
    </Drawer>
  </div>
);

interface BurgerComponentProps {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  title: string;
}
export const BurgerComponent: React.FC<BurgerComponentProps> = ({
  opened,
  setOpened,
  title,
}) => (
  <Burger
    color="cyan"
    opened={opened}
    onClick={() => setOpened((o: boolean) => !o)}
    title={title}
  />
);

const Navbar = () => {
  const [opened, setOpened] = useState(false);
  const title = opened ? "Close navigation" : "Open navigation";

  return (
    <>
      <div className="px-6 border-b-[1px] border-gray-800 w-screen h-16 bg-black flex justify-between items-center z-40">
        <Logo />
        <Link href="/">
          <p className="text-white font-medium font-sans text-2xl md:text-lg  md:hidden">
            FMHY
          </p>
        </Link>
        <div className="md:hidden">
          <BurgerComponent
            opened={opened}
            setOpened={setOpened}
            title={title}
          />
        </div>
        {opened && (
          <div className="hidden md:flex">
            <BurgerComponent
              opened={opened}
              setOpened={setOpened}
              title={title}
            />
          </div>
        )}
        {!opened && (
          <div className="text-gray-300 text-lg font-medium hidden xl:gap-8 md:flex gap-8">
            <SearchBar />
            <LinkElements />
          </div>
        )}
      </div>

      <NavbarDrawer opened={opened} setOpened={setOpened} />
    </>
  );
};

export const SearchBar = () => {
  const spotlight = useSpotlight();
  return (
    <div
      className="py-1 w-58 max-w-[60%] mx-auto flex items-center rounded-md px-2 gap-2 bg-[#252728] hover:cursor-pointer"
      onClick={spotlight.openSpotlight}
    >
      <Search className="w-5 h-5 text-gray-400" />

      <p className="text-gray-600 w-36 text-sm">Search</p>

      <Kbd className="ml-auto">/</Kbd>
    </div>
  );
};

export default Navbar;
