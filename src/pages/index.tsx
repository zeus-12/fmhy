import FAQ from "@/components/faq";
import Link from "@/components/link";
import WikiBottomNavigator from "@/components/wiki/bottom-navigator";
import CategoriesSidebar from "@/components/wiki/categories-sidebar";
import {
  ChildResource,
  MARKDOWN_RESOURCES,
  blurDataUrlForLogo,
} from "@/lib/constants";
import { Badge } from "@mantine/core";
import Image from "next/image";
import Balancer from "react-wrap-balancer";

const quickLinks = [
  // {
  //   title: "About",
  //   link: "#about",
  //   color: "cyan",
  // },
  // {
  //   title: "FAQs",
  //   link: "#faq",
  //   color: "pink",
  // },
  {
    title: "Discord",
    link: "https://discord.gg/5W9QJKuPkD",
    color: "green",
  },
  {
    title: "Feedback",
    link: "/feedback",
    color: "orange",
  },
  {
    title: "Guides",
    link: "https://rentry.co/fmhy-guides",
    color: "pink",
  },
];

// const content = [
//   {
//     title: "Vision",
//     content: (
//       <>
//         Our goal is to spread free education and entertainment to as many people
//         as we can, and fight for the rights of those who feel left behind to be
//         happy, educated, and comfortable, despite their economic circumstances.
//         <br /> We want to show people what the world could look like if we
//         started treating everyone as equally deserving of all things good. To
//         organize, index and preserve as many sites and as much content as we
//         possibly can, both for people now and people in the future.
//         <br /> We want to do our best to lead by example, and prove that putting
//         others before ourselves really does make the world a better place.
//       </>
//     ),
//   },
//   {
//     title: "Promise",
//     content: (
//       <>
//         &quot;I&apos;m not ever going to let this project die. Even if something
//         were to happen to me, it would be in good hands thanks to the awesome
//         mods in discord. I just wanted to say this because sometimes projects
//         like this end up slowly dying, and that isn&apos;t going to happen with
//         us.
//         <br />
//         Giving as many people as possible access to educational material and
//         entertainment does make the world a smarter and happier place.
//         <br />
//         Sharing is, always has been, and always will be the right thing to do,
//         and until we live in a world that doesn&apos;t need to be shown that,{" "}
//         <span className="text-cyan-400 tracking-tighter font-semibold">
//           we&apos;ll be here.
//         </span>
//         &quot;
//         <span className="block font-semibold font-sans">- nbatman</span>
//       </>
//     ),
//   },
// ];
const Home = () => {
  return (
    <div className="flex justify-between gap-2">
      <CategoriesSidebar
        markdownCategory={MARKDOWN_RESOURCES[0] as ChildResource}
      />
      <div className="hideScrollbar mb-4 flex-1 space-y-4 overflow-scroll overflow-x-hidden px-2 sm:px-4 md:px-8 lg:px-14 xl:px-28">
        <div className="flex min-h-full flex-col items-center justify-center">
          <p className="text-center text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl">
            <Balancer>
              The largest collection of Free stuff on the Internet!
            </Balancer>
          </p>
          <Image
            src={"/assets/fmhy.gif"}
            alt="logo"
            className="h-[12rem] w-auto sm:h-[20rem]"
            blurDataURL={blurDataUrlForLogo}
            placeholder="blur"
            width={100}
            height={100}
          />
          <div className="flex flex-wrap justify-center gap-2">
            {quickLinks.map((item) => (
              <Link key={item.title} href={item.link}>
                <Badge size="lg" color={item.color}>
                  {item.title}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        {/* <div
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
        </div> */}

        <div
          className="min-h-dscreen flex items-center justify-center"
          id="faq"
        >
          <FAQ />
        </div>
        <WikiBottomNavigator category={""} />
      </div>
    </div>
  );
};
export default Home;
