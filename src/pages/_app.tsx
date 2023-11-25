import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/spotlight/styles.css";

import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { SpotlightProvider } from "@/components/Spotlight";
import Navbar from "@/components/Navbar";
// import PlausibleProvider from "next-plausible";
import { DefaultSeo } from "next-seo";
import { cn } from "@/lib/utils";
import { fontSans } from "@/lib/fonts";
import { SEO } from "../../next-seo.config";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <PlausibleProvider
    //   domain="fmhy.tk"
    //   selfHosted={true}
    //   customDomain="https://i-totally-love-easylist.swmg.top"
    //   trackOutboundLinks={true}
    //   taggedEvents={true}
    //   // trackLocalhost={true}
    //   // enabled={true}
    // >
    <MantineProvider>
      {/* <SpotlightProvider> */}
      <DefaultSeo {...SEO} />

      <Navbar />

      <div
        className={cn(
          "antialiased flex flex-col gap-2 hd-screen",
          fontSans.className
        )}
      >
        <div className="flex-1 flex overflow-y-scroll mt-4">
          <Component {...pageProps} />
        </div>
      </div>
      {/* </SpotlightProvider> */}
    </MantineProvider>
    // </PlausibleProvider>
  );
}
