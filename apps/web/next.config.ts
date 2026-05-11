import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@appkit/ui", "@appkit/core", "@appkit/api-client"],
  reactCompiler: true,
};

export default nextConfig;
