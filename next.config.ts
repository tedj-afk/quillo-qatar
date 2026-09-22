import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  output: "export",
  turbopack: {
    root: __dirname,
  },
  webpack: (config) => {
    if (process.env.QUILLO_LOW_DISK === "true") config.cache = false;
    return config;
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
