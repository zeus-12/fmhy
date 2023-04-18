import { Button } from "@mantine/core";
import RedditWikiMenu from "@/components/wiki/RedditWikiMenu";
import WikiBottomNavigator from "@/components/wiki/WikiBottomNavigator";
import Link from "next/link";

const messages = [
  <p className="inline" key={0}>
    Anyone can suggest{" "}
    <a href="https://github.com/nbats/FMHYedit">
      changes or corrections to the wiki.
    </a>
  </p>,
  <p className="inline" key={1}>
    If you&apos;re adding a new site, please{" "}
    <a href="https://raw.githubusercontent.com/nbats/FMHYedit/main/single-page">
      search
    </a>{" "}
    first to make sure we don&apos;t already have it.
  </p>,
  <p className="inline" key={2}>
    Approved edits will be applied to this site and all{" "}
    <a href="https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/backups">
      backups
    </a>
    .
  </p>,
  <p className="inline" key={3}>
    You can send us stuff directly via{" "}
    <a href="https://redd.it/uto5vw">💬 Divolt</a>.
  </p>,
  <p className="inline" key={4}>
    You can also checkout our{" "}
    <a href="https://www.reddit.com/r/FREEMEDIAHECKYEAH/">subreddit</a> to know
    about any major updates to the wiki.
  </p>,
];
const WikiHome = () => {
  return (
    <div className="flex-1 sm:px-4 md:px-8 lg:px-14 xl:px-28 overflow-scroll space-y-4">
      <p className="text-2xl font-semibold tracking-tighter">
        Welcome to The{" "}
        <span className="text-cyan-400"> Largest Collection of Free Stuff</span>{" "}
        On The Internet!
      </p>
      <img src={"/assets/logo-no-bg.gif"} alt="logo" className="w-1/2" />
      <div>
        {messages.map((item) => (
          <li key={item.key} className="text-gray-400">
            {item}
          </li>
        ))}
      </div>

      <div>
        <p className="text-xl font-semibold tracking-tighter">
          Few other resources
        </p>

        <div className="gap-2 flex">
          {[
            {
              link: "",
              name: <RedditWikiMenu />,
              color: "orange",
            },
            {
              link: "/base64",
              name: "Base 64",
              color: "blue",
            },
          ].map((item) => {
            if (item.link) {
              return (
                <Link key={item.color} href={item.link}>
                  <Button variant="light" color={item.color}>
                    {item.name}
                  </Button>
                </Link>
              );
            } else {
              return (
                <Button key={item.color} variant="light" color={item.color}>
                  {item.name}
                </Button>
              );
            }
          })}
        </div>
      </div>
      <WikiBottomNavigator CATEGORY={"home"} />
    </div>
  );
};
export default WikiHome;
