import type { MetadataRoute } from "next";

import { getBlogs } from "@/lib/blogs";

const siteUrl = "https://dholeraestates.com";
const staticPagesLastModified = new Date("2026-10-21T00:00:00+05:30");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getBlogs();

  const pages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: staticPagesLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/properties`,
      lastModified: staticPagesLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/properties/dholera-estates`,
      lastModified: staticPagesLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about-us`,
      lastModified: staticPagesLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact-us`,
      lastModified: staticPagesLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: staticPagesLastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const blogUrls: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${siteUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...blogUrls];
}
