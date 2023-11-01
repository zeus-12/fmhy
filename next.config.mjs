/** @type {import('next').NextConfig} */
import { withPlausibleProxy } from "next-plausible";

const nextConfig = {
  reactStrictMode: false,

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
  customDomain: "https://i-totally-love-easylist.swmg.top",
})(nextConfig);
// {
// subdirectory: "analytics",
// scriptName: "script",
// }
