import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SpotlightProvider } from "@/components/Spotlight";

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
          {/* <Notifications /> */}
          <div className="mt-20 px-2">
            <Component {...pageProps} />
          </div>
        </SpotlightProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}
