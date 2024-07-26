import { JetBrains_Mono as FontMono, Inter as FontSans } from "next/font/google"

export const dev = process.env.NODE_ENV !== "production"
export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Next.js",
  description: "",
  mainNav: [
    { href: "/search", title: "Search" },
    { href: "/guides", title: "Guides" },
  ],
  links: {
    twitter: "",
    github: "",
    docs: "",
  },
}

export const fontSans = FontSans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
})
