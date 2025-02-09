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
    link: "https://rentry.co/fmhy-invite",
    color: "green",
  },
  {
    title: "Feedback",
    link: "/feedback",
    color: "orange",
  },
  // {
  //   title: "Guides",
  //   link: "https://rentry.co/fmhy-guides",
  //   color: "pink",
  // },
];

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
