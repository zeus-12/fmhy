/** @type {import('next').NextConfig} */
const { withPlausibleProxy } = require("next-plausible");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.clerk.dev"],
  },
  async redirects() {
    return [
      {
        source: "/wiki/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = withPlausibleProxy({
  subdirectory: "meowlytics",
  scriptName: "script",
  customDomain: "https://meowlytics.bignutty.xyz",
})(nextConfig);
