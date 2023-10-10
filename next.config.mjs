/** @type {import('next').NextConfig} */
import { withPlausibleProxy } from "next-plausible";

const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/analytics/js/script.js",
        destination: "https://i-totally-love-easylist.swmg.top/js/script.js",
      },
      {
        source: "/analytics/js/script.local.js",
        destination:
          "https://i-totally-love-easylist.swmg.top/js/script.local.js",
      },
      {
        source: "/analytics/api/event",
        destination: "https://i-totally-love-easylist.swmg.top/api/event",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/wiki/:path*",
        destination: "/:path*",
        permanent: true,
      },
      {
        source: "/links/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};

export default withPlausibleProxy({
  subdirectory: "analytics",
  scriptName: "script",
  customDomain: "https://i-totally-love-easylist.swmg.top",
})(nextConfig);
