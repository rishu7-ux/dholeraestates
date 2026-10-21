import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.dholeraestates.com",
          },
        ],
        destination: "https://dholeraestates.com/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    localPatterns: [
      { pathname: "/images/**", search: "" },
      { pathname: "/api/blog-media" },
    ],
  },
};
export default nextConfig;
