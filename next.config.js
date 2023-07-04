/** @type {import('next').NextConfig} */
const { withPlausibleProxy } = require("next-plausible");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.clerk.dev"],
  },
};

module.exports = withPlausibleProxy({
  subdirectory: "meowlytics",
  scriptName: "script",
  customDomain: "https://meowlytics.bignutty.xyz",
})(nextConfig);
