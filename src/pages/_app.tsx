import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import "@/styles/globals.css";
import "@/styles/guides.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SpotlightProvider } from "@/components/Spotlight";
import { Notifications } from "@mantine/notifications";
import Navbar from "@/components/Navbar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Head from "next/head";
import PlausibleProvider from "next-plausible";
// import { useRouter } from "next/router";

// const privatePages: Array<string> = [];

export default function App({ Component, pageProps }: AppProps) {
  // const { pathname } = useRouter();
  // const isPrivatePage = privatePages.includes(pathname);

  const queryClient = new QueryClient();

  return (
    // <ClerkProvider {...pageProps}>
    <PlausibleProvider
      domain="fmhy.tk"
      selfHosted={true}
      // trackLocalhost={true}
      // enabled={true}
      customDomain="https://a.bignutty.xyz"
      trackOutboundLinks={true}
      taggedEvents={true}
    >
      <MantineProvider
        theme={{
          colorScheme: "dark",
        }}
      >
        <QueryClientProvider client={queryClient}>
          <SpotlightProvider>
            <Head>
              <title>FreeMediaHeckYeah</title>
            </Head>

            <div className="min-h-screen gap-2 flex flex-col">
              <Notifications />
              <Navbar />
              <div className="px-2 h-full flex-1 flex-col flex">
                {/* {isPrivatePage ? (
                  <>
                    <SignedIn>
                      <Component {...pageProps} />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                ) : ( */}
                <Component {...pageProps} />
                {/* )} */}
              </div>
            </div>
          </SpotlightProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </MantineProvider>
    </PlausibleProvider>

    // </ClerkProvider>
  );
}
