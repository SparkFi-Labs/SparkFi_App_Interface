const runtimeCaching = require("next-pwa/cache");
const withTM = require("next-transpile-modules")(["gsap"]);

const withPWA = require("next-pwa")({
  dest: "public",
  skipWaiting: true,
  register: true,
  disable: process.env.NODE_ENV !== "production",
  runtimeCaching
});

module.exports = withPWA({
  ...withTM(),
  reactStrictMode: true,
  images: {
    domains: ["sparkfi.xyz"],
    dangerouslyAllowSVG: true
  }
});
