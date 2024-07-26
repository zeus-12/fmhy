import { Head, Html, Main, NextScript } from "next/document"

import { fontSans } from "@/lib/config"
import { cn } from "@/lib/utils"

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body
        className={cn(
          "min-h-screen scroll-smooth bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
