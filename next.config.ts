import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      { pathname: "/images/**", search: "" },
      { pathname: "/api/blog-media" },
    ],
  },
};
export default nextConfig;
