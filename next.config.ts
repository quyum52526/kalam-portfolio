import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
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
