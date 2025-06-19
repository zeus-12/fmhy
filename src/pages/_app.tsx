import Navbar from "@/components/navbar";
import { SpotlightProvider } from "@/components/spotlight";
import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
// import PlausibleProvider from "next-plausible";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { DefaultSeo } from "next-seo";
import { useEffect } from "react";
import { SEO } from "../../next-seo.config";

const ACCESS_BLOCKED_MESSAGE = (href: string) => `<div style="
            position: fixed; 
            top: 0; 
            left: 0; 
            width: 100%; 
            height: 100%; 
            background: #000; 
            color: #fff; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-family: Arial, sans-serif;
            z-index: 9999;
          ">
            <div style="text-align: center; padding: 20px;">
              <h1>🚫 Access Blocked</h1>
              <p>This site cannot be displayed in an iframe.</p>
              <p>Please visit <a href="${href}" style="color: #3b82f6;">${window.location.href}</a> directly.</p>
            </div>
          </div>`;

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.top &&
      window.top !== window.self
    ) {
      try {
        // Redirect to our site
        window.top.location.href = window.location.href;
      } catch (e) {
        // If we can't redirect (due to same-origin policy)
        document.body.innerHTML = ACCESS_BLOCKED_MESSAGE(window.location.href);
      }
    }
  }, []);

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
