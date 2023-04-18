import Image from "next/image";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";

const Home = () => {
  return (
    <div className="px-4">
      <div className="lg:flex justify-center items-center lg:justify-evenly">
        <div className="my-auto">
          <div className="flex sm:justify-center">
            <p className="text-2xl font-semibold tracking-tighter">Hey 👋</p>
          </div>

          <div className="flex justify-center items-center flex-col">
            <p
              className="col lg:col-10 text-xl lg:px-12"
              style={{ fontFamily: "courier" }}
            >
              Most of the people new to{" "}
              <a
                className="text-cyan-500"
                href="https://www.reddit.com/r/FREEMEDIAHECKYEAH/"
              >
                r/FreeMediaHeckYeah{" "}
              </a>
              can find our massive wiki overwhelming when taking their first
              look at it. So the members of r/FMHY thought that we should make a
              curated list of common sites that we use, one that&apos;s much
              shorter and not an entire list of every site we&apos;ve aggregated
              over the years, making it much easier to navigate{" "}
              <span className="animate-pulse">💖</span> It&apos;ll be some
              underrated sites, ones that we use everyday, and guides that may
              come in handy for a lot of people! ⚡️
            </p>
            <div className="pt-2 xl:pt-4 lg:px-10 my-2">
              <p className="text-center">
                Check out our{" "}
                <Link className="text-cyan-500" href="/about">
                  Vision
                </Link>{" "}
                & get started with our
                <a
                  className="text-cyan-500"
                  href="https://rentry.org/Piracy-BG"
                >
                  {" "}
                  Beginners Guide to Piracy
                </a>
              </p>
              <p className="text-center">
                Also be sure to checkout the updated{" "}
                <Link className="text-cyan-500" href="/wiki/home">
                  Wiki page
                </Link>
              </p>
            </div>

            <div className="flex justify-center mb-3 hover:scale-[102%] mt-2 transition transform duration-100 ease-out">
              <a
                className="px-2 py-2 rounded-md text-white bg-cyan-700"
                href="https://www.reddit.com/r/FREEMEDIAHECKYEAH/comments/uto5vw/revolt_server/"
              >
                Join the Divolt Server! (Instructions)
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            className="max-h-[85vh] w-auto max-w-[100vw]"
            alt="pirate"
            src="/assets/pirate.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
