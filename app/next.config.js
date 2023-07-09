const runtimeCaching = require("next-pwa/cache");

const withPWA = require("next-pwa")({
  dest: "public",
  skipWaiting: true,
  register: true,
  disable: process.env.NODE_ENV !== "production",
  runtimeCaching
});

module.exports = withPWA({
  reactStrictMode: true
});
