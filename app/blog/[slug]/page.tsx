import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaCalendarAlt, FaUserAlt } from "react-icons/fa";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getBlogs, blogImage } from "@/lib/blogs";

const siteUrl = "https://dholeraestates.com";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [blog] = await getBlogs(slug);

  if (!blog) {
    return {
      title: "Article Not Found",
      robots: { index: false, follow: false },
    };
  }

  const canonicalPath = `/blog/${blog.slug}`;
  const title = blog.title.replace(/\s*[|–—-]\s*Dholera Estates\s*$/i, "");
  const description = blog.excerpt || `Read ${blog.title} on the Dholera Estates blog.`;
  const image = blogImage(blog.imageUrl);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${title} | Dholera Estates`,
      description,
      type: "article",
      url: canonicalPath,
      siteName: "Dholera Estates",
      publishedTime: blog.publishedAt,
      modifiedTime: blog.updatedAt,
      authors: ["Dholera Estates"],
      images: [{ url: image, alt: blog.imageAlt || blog.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Dholera Estates`,
      description,
      images: [image],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: BlogPageProps) {
  const { slug } = await params;
  const [blog] = await getBlogs(slug);
  if (!blog) notFound();

  const canonicalUrl = `${siteUrl}/blog/${blog.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${canonicalUrl}#article`,
        mainEntityOfPage: canonicalUrl,
        headline: blog.title,
        description: blog.excerpt,
        image: new URL(blogImage(blog.imageUrl), siteUrl).toString(),
        datePublished: blog.publishedAt,
        dateModified: blog.updatedAt,
        author: {
          "@type": "Person",
          name: "Admin",
        },
        publisher: {
          "@type": "Organization",
          name: "Dholera Estates",
          url: siteUrl,
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/images/dholera-estates-logo.png`,
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
          { "@type": "ListItem", position: 3, name: blog.title, item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main className="min-h-screen bg-[#F8FAFC]">
        <section className="internal-page-hero border-b border-[#F8FAFC]">
          <div className="mx-auto max-w-5xl px-5 py-12 sm:px-6 lg:py-16">
            <div className="flex items-center gap-2 text-sm text-[#111111]">
              <Link href="/" className="hover:text-[#F90032]">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[#F90032]">Blog</Link>
              <span>/</span>
              <span aria-current="page" className="line-clamp-1">{blog.title}</span>
            </div>
            <div className="mt-7 flex items-center gap-3"><span className="brand-accent-line" /><p className="brand-eyebrow">Dholera Estates Insights</p></div>
            <h1 className="mt-4 text-3xl font-black leading-tight tracking-[-0.04em] text-[#101827] sm:text-4xl lg:text-5xl">{blog.title}</h1>
            <div className="mt-6 flex flex-wrap gap-5 text-sm text-[#111111]">
              <span className="flex items-center gap-2"><FaUserAlt className="text-[#FA7000]" />Admin</span>
              <span className="flex items-center gap-2"><FaCalendarAlt className="text-[#F90032]" />{formatDate(blog.publishedAt)}</span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-12 sm:px-6 lg:py-16">
          <article className="overflow-hidden rounded-[26px] border border-[#E5E7EB] bg-white shadow-[0_10px_28px_rgba(17,17,17,0.08)]">
            <div className="relative aspect-video bg-[#F8FAFC]">
              <Image
                src={blogImage(blog.imageUrl)}
                alt={blog.imageAlt || blog.title}
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 1000px"
                className="object-cover"
              />
            </div>
            <div className="px-6 py-8 sm:px-10 lg:px-14 lg:py-12">
              <p className="rounded-2xl border border-[#F8FAFC] bg-[#F8FAFC] p-5 text-lg font-semibold leading-8 text-[#F90032]">{blog.excerpt}</p>
              {blog.richContentHtml ? (
                <div
                  className="mt-8 break-words text-base leading-8 text-[#4B5563] [overflow-wrap:anywhere] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_a]:font-semibold [&_a]:text-[#FA7000] [&_a]:underline [&_a]:decoration-2 [&_a]:underline-offset-4 [&_a:hover]:text-[#F90032] [&_a:focus-visible]:rounded-sm [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-2 [&_a:focus-visible]:outline-[#FA7000] [&_em]:italic [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:scroll-mt-24 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:leading-tight [&_h2]:tracking-[-0.02em] [&_h2]:text-[#111111] sm:[&_h2]:mt-12 sm:[&_h2]:text-3xl [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:scroll-mt-24 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:leading-snug [&_h3]:text-[#111111] sm:[&_h3]:text-2xl [&_li]:pl-1 [&_li]:leading-8 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 sm:[&_ol]:pl-8 [&_p]:my-5 [&_p]:leading-8 [&_strong]:font-bold [&_strong]:text-[#111111] [&_ul]:my-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 sm:[&_ul]:pl-8"
                  dangerouslySetInnerHTML={{ __html: blog.richContentHtml }}
                />
              ) : (
                <div className="mt-8 whitespace-pre-line text-base leading-8 text-[#111111]">{blog.content}</div>
              )}
              <Link href="/blog" className="brand-button-outline mt-10 inline-flex items-center gap-2 rounded-xl border border-[#F90032] px-5 py-3 text-sm font-bold text-[#FA7000] hover:bg-[#F90032] hover:text-white">
                <FaArrowLeft /> Back to Blogs
              </Link>
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
