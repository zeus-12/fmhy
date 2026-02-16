export const SEO = {
  title: "FreeMediaHeckYeah — Free Movies, Music, Software, Games & More",
  description:
    "The largest collection of free movies, music, software, games, books, and more. Curated links to the best free resources on the internet.",
  canonical: "https://fmhy.vercel.app/",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fmhy.vercel.app/",
    siteName: "FreeMediaHeckYeah",
    images: [{ url: "https://fmhy.vercel.app/assets/logo.png" }],
  },
  twitter: {
    cardType: "summary_large_image",
  },
  themeColor: "black",
  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    },
    {
      name: "application-name",
      content: "FreeMediaHeckYeah",
    },
    {
      name: "keywords",
      content:
        "free movies, free music, free software, free games, free books, streaming, anime, FMHY, FreeMediaHeckYeah",
    },
  ],

  additionalLinkTags: [
    {
      rel: "icon",
      href: "https://fmhy.vercel.app/favicon.ico",
    },
  ],
};
