import CategoriesSidebar from "@/components/wiki/CategoriesSidebar";
import { MARKDOWN_RESOURCES } from "@/lib/CONSTANTS";
import WikiBottomNavigator from "@/components/wiki/BottomNavigator";
import Link from "next/link";
import Image from "next/image";
import PirateImage from "/public/assets/pirate.png";
import FAQ from "@/components/FAQ";
import { Badge } from "@mantine/core";
import Balancer from "react-wrap-balancer";

const quickLinks = [
  {
    title: "About",
    link: "#about",
    color: "cyan",
  },
  {
    title: "FAQs",
    link: "#faq",
    color: "pink",
  },
  {
    title: "Divolt",
    link: "https://fmhy.divolt.xyz/",
    color: "green",
  },
];

const content = [
  {
    title: "Vision",
    content: (
      <>
        Our goal is to spread free education and entertainment to as many people
        as we can, and fight for the rights of those who feel left behind to be
        happy, educated, and comfortable, despite their economic circumstances.
        <br /> We want to show people what the world could look like if we
        started treating everyone as equally deserving of all things good. To
        organize, index and preserve as many sites and as much content as we
        possibly can, both for people now and people in the future.
        <br /> We want to do our best to lead by example, and prove that putting
        others before ourselves really does make the world a better place.
      </>
    ),
  },
  {
    title: "Promise",
    content: (
      <>
        &quot;I&apos;m not ever going to let this project die. Even if something
        were to happen to me, it would be in good hands thanks to the awesome
        mods in discord. I just wanted to say this because sometimes projects
        like this end up slowly dying, and that isn&apos;t going to happen with
        us.
        <br />
        Giving as many people as possible access to educational material and
        entertainment does make the world a smarter and happier place.
        <br />
        Sharing is, always has been, and always will be the right thing to do,
        and until we live in a world that doesn&apos;t need to be shown that,{" "}
        <span className="text-cyan-400 tracking-tighter font-semibold">
          we&apos;ll be here.
        </span>
        &quot;
        <span className="block font-semibold font-sans">- nbatman</span>
      </>
    ),
  },
];
const Home = () => {
  return (
    <div className="flex justify-between overflow-hidden h-[calc(100vh_-_80px)] gap-2">
      <CategoriesSidebar markdownCategory={MARKDOWN_RESOURCES[0]} />
      <div className="flex-1 sm:px-4 md:px-8 lg:px-14 xl:px-28 overflow-scroll space-y-4">
        <div className="justify-center min-h-full items-center flex flex-col">
          <p className="text-5xl md:text-6xl font-semibold tracking-tighter text-center">
            <Balancer>
              The largest collection of Free stuff on the Internet!
            </Balancer>
          </p>
          <Image
            src={"/assets/fmhy.gif"}
            alt="logo"
            className="w-full h-auto sm:w-3/4 md:w-2/3 mx-auto"
            width={200}
            height={200}
          />
          <div className="flex gap-2">
            {quickLinks.map((item) => (
              <Link key={item.title} href={item.link}>
                <Badge size="lg" color={item.color}>
                  {item.title}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        <div
          className="flex gap-3 flex-col items-center xl:flex-row"
          id="about"
        >
          <div className="space-y-4">
            {content.map((item) => (
              <div key={item.title} className="space-y-2">
                <p className="text-3xl text-gray-300 tracking-tighter font-semibold">
                  {item.title}
                </p>

                <p
                  className="bg-[#121212]"
                  style={{
                    fontFamily: "courier",
                  }}
                >
                  {item.content}
                </p>
              </div>
            ))}
          </div>
          <Image
            alt="pirate"
            placeholder="blur"
            src={PirateImage}
            className="w-[400px] h-auto max-w-[90%]"
          />
        </div>

        <div className="min-h-screen items-center flex justify-center" id="faq">
          <FAQ />
        </div>
        <WikiBottomNavigator category={""} />
      </div>
    </div>
  );
};
export default Home;
