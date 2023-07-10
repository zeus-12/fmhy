import FAQ from "@/components/FAQ";
import Image from "next/image";
import Link from "next/link";
import PirateImage from "../../public/assets/pirate.png";

const About = () => {
  return (
    <div className="flex flex-col gap-6 sm:px-8 md:px-12 lg:px-16 md:py-2 lg:py-4 xl:py-6">
      <div className="flex gap-2 flex-col items-center md:flex-row">
        <div>
          {[
            {
              title: "Vision",
              content: (
                <>
                  Our goal is to spread free education and entertainment to as
                  many people as we can, and fight for the rights of those who
                  feel left behind to be happy, educated, and comfortable,
                  despite their economic circumstances.
                  <br /> We want to show people what the world could look like
                  if we started treating everyone as equally deserving of all
                  things good. To organize, index and preserve as many sites and
                  as much content as we possibly can, both for people now and
                  people in the future.
                  <br /> We want to do our best to lead by example, and prove
                  that putting others before ourselves really does make the
                  world a better place.
                </>
              ),
            },
            {
              title: "Promise",
              content: (
                <>
                  &quot;I&apos;m not ever going to let this project die. Even if
                  something were to happen to me, it would be in good hands
                  thanks to the awesome mods in discord. I just wanted to say
                  this because sometimes projects like this end up slowly dying,
                  and that isn&apos;t going to happen with us.
                  <br />
                  Giving as many people as possible access to educational
                  material and entertainment does make the world a smarter and
                  happier place.
                  <br />
                  Sharing is, always has been, and always will be the right
                  thing to do, and until we live in a world that doesn&apos;t
                  need to be shown that,{" "}
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
                </>
              ),
            },
          ].map((item) => (
            <>
              <p className="text-3xl text-gray-300 tracking-tighter font-semibold">
                {item.title}
              </p>

              <p
                className="py-4 bg-[#121212]"
                style={{
                  fontFamily: "courier",
                }}
              >
                {item.content}
              </p>
            </>
          ))}
        </div>
        <Image
          alt="pirate"
          placeholder="blur"
          src={PirateImage}
          className="h-[85vh] w-auto max-w-[100vw]"
        />
      </div>

      <FAQ />
    </div>
  );
};

export default About;
