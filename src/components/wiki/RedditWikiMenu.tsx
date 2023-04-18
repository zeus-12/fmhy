import { Menu } from "@mantine/core";
import { resources as menuItems } from "@/lib/CONSTANTS";
import Link from "next/link";

const RedditWikiMenu = () => {
  return (
    <Menu>
      <Menu.Target>
        <p className="px-0.5 py-1 lg:px-2 rounded-md  cursor-pointer text-center">
          Reddit Scraped
        </p>
      </Menu.Target>
      <Menu.Dropdown className="h-72 overflow-scroll">
        {menuItems.map((item, index) => (
          <Link key={index} href={item.link}>
            <Menu.Item icon={item.emoji}>{item.title}</Menu.Item>
          </Link>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default RedditWikiMenu;
