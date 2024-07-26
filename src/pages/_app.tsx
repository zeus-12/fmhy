import { DefaultSeo } from "next-seo"

import "/src/styles/globals.css"
import type { AppProps } from "next/app"

import { SiteHeader } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"

import { SEO } from "../../next-seo.config"

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider {...pageProps}>
      <DefaultSeo {...SEO} />

      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex-1">
          <Component {...pageProps} />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
