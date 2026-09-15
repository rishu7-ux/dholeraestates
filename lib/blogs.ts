import "server-only";

export type Blog = {
  id: string | number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  richContentHtml?: string | null;
  publishedAt: string;
  imageUrl: string | null;
  imageAlt: string;
};

type CmsRecord = Record<string, unknown>;

export async function getBlogs(slug?: string): Promise<Blog[]> {
  const base = process.env.PAYLOAD_CMS_URL?.replace(/\/$/, "");
  if (!base) return [];

  try {
    const query = slug ? `?slug=${encodeURIComponent(slug)}` : "";
    const response = await fetch(
      `${base}/api/dholera-estates-blog-feed${query}`,
      { cache: "no-store" },
    );
    if (!response.ok) return [];

    const data: unknown = await response.json();
    return getRecords(data)
      .filter(isPublished)
      .map(normalizeBlog)
      .filter((blog): blog is Blog => blog !== null)
      .filter((blog) => !slug || blog.slug === slug);
  } catch {
    return [];
  }
}

export function blogImage(path: string | null) {
  return path
    ? `/api/blog-media?path=${encodeURIComponent(path)}`
    : "/images/blog-placeholder.svg";
}

function getRecords(data: unknown): CmsRecord[] {
  if (Array.isArray(data)) return data.filter(isRecord);
  if (!isRecord(data)) return [];

  const records = data.blogs ?? data.docs;
  return Array.isArray(records) ? records.filter(isRecord) : [];
}

function normalizeBlog(record: CmsRecord): Blog | null {
  const title = text(record.blogTitle ?? record.title);
  const slug = text(record.slug);
  if (!title || !slug) return null;

  const featuredImage = record.featuredImage ?? record.image;
  const media = isRecord(featuredImage) ? featuredImage : null;
  const imageUrl = text(media?.url ?? record.imageUrl) || null;

  return {
    id: typeof record.id === "string" || typeof record.id === "number"
      ? record.id
      : slug,
    title,
    slug,
    excerpt: text(record.shortDescription ?? record.excerpt),
    content: richText(record.blogContent ?? record.content),
    richContentHtml: richContentHtml(record.richContentHtml),
    publishedAt: text(record.publishedAt ?? record.updatedAt ?? record.createdAt)
      || new Date(0).toISOString(),
    imageUrl,
    imageAlt: text(media?.alt ?? record.imageAlt) || title,
  };
}

function isPublished(record: CmsRecord) {
  const status = text(record.status ?? record._status).toLowerCase();
  return !status || status === "published" || status === "active";
}

function richText(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(richText).filter(Boolean).join("\n");
  if (!isRecord(value)) return "";

  if (typeof value.text === "string") return value.text;
  return richText(value.root ?? value.children);
}

function richContentHtml(value: unknown): string | null {
  if (typeof value !== "string") return null;

  const html = value.trim();
  if (!html) return null;

  const hasVisibleContent =
    html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim().length > 0 ||
    /<(img|hr|iframe|video)\b/i.test(html);

  return hasVisibleContent ? html : null;
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isRecord(value: unknown): value is CmsRecord {
  return typeof value === "object" && value !== null;
}
