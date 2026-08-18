import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/motion",
        destination: "/work/motion-reels",
        permanent: true,
      },
      {
        source: "/creative-dev",
        destination: "/work/web-experiences",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
