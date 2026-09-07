import type { NextConfig } from "next";
// @ts-expect-error next-pwa does not have built-in TypeScript definitions
import withPWA from "next-pwa";

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  turbopack: {},
};

export default pwaConfig(nextConfig);