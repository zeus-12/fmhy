import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SpotlightProvider } from "@/components/Spotlight";
import { Notifications } from "@mantine/notifications";
import Navbar from "@/components/Navbar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PlausibleProvider from "next-plausible";
import { DefaultSeo } from "next-seo";
import { cn } from "@/lib/utils";
import { fontSans } from "@/lib/fonts";
import { SEO } from "../../next-seo.config";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

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
    <MantineProvider
      theme={{
        colorScheme: "dark",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <SpotlightProvider>
          <DefaultSeo {...SEO} />

          <Navbar />

          <div
            className={cn(
              "antialiased flex flex-col gap-2 h-screen",
              fontSans.className
            )}
          >
            <Notifications />
            <div className="flex-1 flex overflow-y-scroll mt-4">
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
