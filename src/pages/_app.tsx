import "@/styles/globals.css";
import "@/styles/guides.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SpotlightProvider } from "@/components/Spotlight";
import { Notifications } from "@mantine/notifications";
import Navbar from "@/components/Navbar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import PlausibleProvider from "next-plausible";
import { DefaultSeo } from "next-seo";
import { cn } from "@/lib/utils";
import { fontSans } from "@/lib/fonts";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    // <PlausibleProvider
    //   domain="fmhy.net"
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
      <QueryClientProvider client={queryClient}>
        <SpotlightProvider>
          <DefaultSeo
            title="FreeMediaHeckYeah"
            description="The Largest collection of Free stuff on the Internet! | FMHY"
            openGraph={{
              type: "website",
              locale: "en_US",
              url: "FMHY",
              // url: "https://www.fmhy.net/",
              siteName: "FreeMediaHeckYeah",
              images: [{ url: "https://fmhy.net/assets/logo.png" }],
            }}
            // canonical="https://www.fmhy.net/"
          />

          <div
            // className="flex flex-col h-screen gap-2"
            className={cn(
              "antialiased flex flex-col h-screen gap-2",
              fontSans.className
            )}
          >
            <Notifications />
            <Navbar />
            <div className="px-2 flex-1 flex overflow-y-scroll max-w-[100vw]">
              <Component {...pageProps} />
            </div>
          </div>
        </SpotlightProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </MantineProvider>
    // </PlausibleProvider>
  );
}
