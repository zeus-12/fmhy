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

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
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
            <div className="px-2 flex-1">
              <Component {...pageProps} />
            </div>
          </div>
        </SpotlightProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </MantineProvider>
  );
}
