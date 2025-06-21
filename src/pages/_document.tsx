import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en" className="scroll-mt-6 scroll-smooth">
      <Head>
        <Script id="iframe-buster" strategy="beforeInteractive">
          {`if (window.top !== window.self) {
            window.top.location = window.location;
          }`}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
