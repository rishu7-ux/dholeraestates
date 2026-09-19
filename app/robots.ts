import type { MetadataRoute } from "next";

const disallow = [
  "/api/",
  "/_next/data/",
  "/products/",
  "/*?ref=",
  "/*utm_",
];

const allowedBots = [
  "Googlebot",
  "Googlebot-Image",
  "Google-Extended",
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "CCBot",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      ...allowedBots.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow,
      })),
    ],
    sitemap: "https://dholeraestates.com/sitemap.xml",
  };
}
