import Navbar from "@/components/navbar";
import { SpotlightProvider } from "@/components/spotlight";
import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
// import PlausibleProvider from "next-plausible";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { DefaultSeo } from "next-seo";
import { SEO } from "../../next-seo.config";

export default function App({ Component, pageProps }: AppProps) {
  // const [isIframe, setIsIframe] = useState(false);

  // useEffect(() => {
  //   if (window.top !== window.self) {
  //     setIsIframe(true);
  //     handleRedirection();
  //   }
  // }, []);

  // const handleRedirection = (openNew?: boolean) => {
  //   try {
  //     if (window.top) {
  //       window.top.location.href = window.location.href;
  //     }
  //   } catch (error) {
  //     if (openNew) {
  //       window.open(window.location.href, "_blank");
  //     }
  //   }
  // };

  // if (isIframe) {
  //   return (
  //     <div
  //       className="flex h-screen cursor-pointer items-center justify-center font-sans"
  //       onClick={() => handleRedirection(true)}
  //     >
  //       <p className="text-lg font-semibold">Click to continue.</p>
  //     </div>
  //   );
  // }

  return (
    // <PlausibleProvider
    //   domain="fmhy.vercel.app"
    //   selfHosted={true}
    //   customDomain="https://i-totally-love-easylist.swmg.top"
    //   trackOutboundLinks={true}
    //   taggedEvents={true}
    //   // trackLocalhost={true}
    //   // enabled={true}
    // >
    <MantineProvider
      theme={{
        colorScheme: "dark",
      }}
    >
      <SpotlightProvider>
        <DefaultSeo {...SEO} />
        <Navbar />

        <div
          className={cn(
            "hd-screen dark flex flex-col gap-2 antialiased",
            fontSans.className,
          )}
        >
          <div className="flex flex-1 overflow-y-scroll">
            <Component {...pageProps} />
          </div>
        </div>
      </SpotlightProvider>
    </MantineProvider>
    // </PlausibleProvider>
  );
}
