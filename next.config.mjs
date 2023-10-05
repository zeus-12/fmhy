/** @type {import('next').NextConfig} */
// import { withPlausibleProxy } from "next-plausible";

const nextConfig = {
  reactStrictMode: false,
  // images: {
  //   domains: ["images.clerk.dev"],
  // },
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
export default nextConfig;
// export default withPlausibleProxy({
//   subdirectory: "analytics",
//   scriptName: "script",
//   customDomain: "https://i-totally-love-easylist.swmg.top",
// })(nextConfig);
