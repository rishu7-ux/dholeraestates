import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaCalendarAlt, FaUserAlt } from "react-icons/fa";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import SideEnquiry from "@/components/SideEnquiry";
import { blogImage, getBlogs } from "@/lib/blogs";

const title = "Dholera Estates Blog | Dholera SIR Updates";
const description =
  "Stay updated on Dholera Estates and the wider Dholera SIR region — infrastructure news, plot-buying guides, and investment insights from Omana Projects.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title,
    description,
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F8FAFC]">
        <PageHero
          eyebrow="Latest insights"
          title={<>Our <span className="brand-gradient-text">Blog</span></>}
          description="Property updates, infrastructure news and practical information about Dholera."
        />

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
          {blogs.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <article key={blog.id} className="card-hover card-hover-lift group overflow-hidden rounded-[22px] border border-[#E5E7EB] bg-white shadow-[0_4px_12px_rgba(17,17,17,0.08)]">
                  <Link href={`/blog/${blog.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-[#F8FAFC]">
                    <Image
                      src={blogImage(blog.imageUrl)}
                      alt={blog.imageAlt || blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover brightness-110 transition duration-500 group-hover:scale-105"
                    />
                  </Link>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-4 text-xs text-[#111111]">
                      <span className="flex items-center gap-2"><FaUserAlt className="text-[#FA7000]" />Admin</span>
                      <span className="flex items-center gap-2"><FaCalendarAlt className="text-[#F90032]" />{formatDate(blog.publishedAt)}</span>
                    </div>
                    <h2 className="mt-4 text-xl font-extrabold leading-7 text-[#101827] transition-colors group-hover:text-[#F90032]">
                      <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h2>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#4B5563]">{blog.excerpt}</p>
                    <Link href={`/blog/${blog.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#FA7000] transition-colors hover:text-[#F90032]">
                      Read More <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="premium-surface rounded-[24px] px-6 py-16 text-center text-[#111111]">
              <p className="brand-eyebrow">New insights are on the way</p>
              <p className="mt-3 text-lg font-bold text-[#101827]">No published Estates blogs are available yet.</p>
            </div>
          )}
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
    month: "short",
    year: "numeric",
  });
}
