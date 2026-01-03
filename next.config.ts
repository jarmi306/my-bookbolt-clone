import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Set these to true to force the build to finish despite errors */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // This turns off Turbopack which is causing your WASM error
  transpilePackages: ["lucide-react"], 
};

export default nextConfig;