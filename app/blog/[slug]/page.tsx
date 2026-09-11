import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaCalendarAlt, FaUserAlt } from "react-icons/fa";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SideEnquiry from "@/components/SideEnquiry";
import { getBlogs, blogImage } from "@/lib/blogs";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [blog] = await getBlogs(slug);
  if (!blog) notFound();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F8FAFC]">
        <section className="internal-page-hero border-b border-[#F8FAFC]">
          <div className="mx-auto max-w-5xl px-5 py-12 sm:px-6 lg:py-16">
            <div className="flex items-center gap-2 text-sm text-[#111111]">
              <Link href="/" className="hover:text-[#F90032]">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[#F90032]">Blog</Link>
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
                sizes="(max-width: 1024px) 100vw, 1000px"
                className="object-cover"
              />
            </div>
            <div className="px-6 py-8 sm:px-10 lg:px-14 lg:py-12">
              <p className="rounded-2xl border border-[#F8FAFC] bg-[#F8FAFC] p-5 text-lg font-semibold leading-8 text-[#F90032]">{blog.excerpt}</p>
              <div className="mt-8 whitespace-pre-line text-base leading-8 text-[#111111]">{blog.content}</div>
              <Link href="/blog" className="brand-button-outline mt-10 inline-flex items-center gap-2 rounded-xl border border-[#F90032] px-5 py-3 text-sm font-bold text-[#FA7000] hover:bg-[#F90032] hover:text-white">
                <FaArrowLeft /> Back to Blogs
              </Link>
            </div>
          </article>
        </section>
      </main>
      <Footer />
      <SideEnquiry />
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
