import FAQ from "@/components/FAQ";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <div className="flex flex-col gap-6 sm:px-8 md:px-12 lg:px-16 md:py-2 lg:py-4 xl:py-6">
      <div>
        <p className="text-3xl text-gray-300 tracking-tighter font-semibold">
          Vision
        </p>

        <div className="lg:flex justify-evenly items-center gap-6">
          <div className="mb-3 lg:mb-0 flex justify-center ">
            <Image
              width={300}
              height={300}
              className="w-[300px] lg:max-w-xl"
              src="../assets/help.svg"
              alt=""
            />
          </div>
          <p
            className="p-4 rounded-xl bg-[#121212] text-[#DEEEEA] text-[1.1rem]"
            style={{
              fontFamily: "courier",
            }}
          >
            Our goal is to spread free education and entertainment to as many
            people as we can, and fight for the rights of those who feel left
            behind to be happy, educated, and comfortable, despite their
            economic circumstances.
            <br /> We want to show people what the world could look like if we
            started treating everyone as equally deserving of all things good.
            To organize, index and preserve as many sites and as much content as
            we possibly can, both for people now and people in the future.
            <br /> We want to do our best to lead by example, and prove that
            putting others before ourselves really does make the world a better
            place.
          </p>
        </div>
      </div>
      <div>
        <p className="text-3xl text-gray-300 tracking-tighter font-semibold">
          Promise
        </p>
        <div className="lg:flex gap-6 justify-evenly items-center rounded-xl text-[#DEEEEA] text-[1.1rem]">
          <p
            className="p-4 bg-[#121212]"
            style={{
              fontFamily: "courier",
            }}
          >
            &quot;I&apos;m not ever going to let this project die. Even if
            something were to happen to me, it would be in good hands thanks to
            the awesome mods in discord. I just wanted to say this because
            sometimes projects like this end up slowly dying, and that
            isn&apos;t going to happen with us.
            <br />
            Giving as many people as possible access to educational material and
            entertainment does make the world a smarter and happier place.
            <br />
            Sharing is, always has been, and always will be the right thing to
            do, and until we live in a world that doesn&apos;t need to be shown
            that,{" "}
            <span className="text-cyan-400 tracking-tighter font-semibold">
              we&apos;ll be here.
            </span>
            &quot;
            <span
              className="block font-semibold"
              style={{ fontFamily: "helvetica" }}
            >
              - nbatman
            </span>
          </p>
          <div className="flex justify-center">
            <Image
              width={300}
              height={200}
              className="w-[300px] lg:max-w-xl"
              alt="logo gif"
              src="/assets/logo-no-bg.gif"
            />
          </div>
        </div>
      </div>
      <p className="text-xl text-center font-semibold tracking-tight">
        Get started with the updated <Link href="/wiki/home">Wiki page</Link>{" "}
        (scraped from FMHY Github Page)
      </p>
      <FAQ />
    </div>
  );
};

export default About;

// {
/* <div>
  <p className="text-3xl text-lime-400">Contribute</p>

  <p>
    <a className="text-cyan-400" href="https://rentry.co/FMHYedit">
      Edit FMHY
    </a>{" "}
    Make changes to the FMHY Wiki
  </p>
  <p>
    <a
      className="text-cyan-400"
      href="https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/find-new-sites"
    >
      Site Hunting Guide
    </a>{" "}
    Help us Discover New Sites
  </p>
</div> */
// }
