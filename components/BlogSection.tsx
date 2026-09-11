import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaCalendarAlt, FaRegFileAlt, FaUserAlt } from "react-icons/fa";
import { type Blog, blogImage } from "@/lib/blogs";

export default function BlogSection({ blogs }: { blogs: Blog[] }) {
  return (
    <section className="bg-white px-0 py-8 sm:px-5 lg:px-8">
      <div className="relative isolate mx-auto max-w-[1660px] overflow-hidden rounded-[0px] bg-[#fcfcff] px-6 py-10 sm:rounded-[30px] sm:px-10 sm:py-12 lg:px-14 lg:py-12">
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_93%_8%,rgba(232,221,255,0.58),transparent_24%),radial-gradient(circle_at_4%_100%,rgba(255,175,137,0.30),transparent_23%)]" />
        <div aria-hidden="true" className="premium-float absolute right-28 top-20 -z-10 grid grid-cols-6 gap-3 opacity-35">{Array.from({ length: 30 }).map((_, index) => <span key={index} className="h-1 w-1 rounded-full bg-[#f90032]" />)}</div>
        <div aria-hidden="true" className="absolute -bottom-8 -left-12 -z-10 h-72 w-80 rotate-[-45deg] border border-[#fa7000]/50 bg-linear-to-tr from-[#f90032]/8 via-[#fa7000]/10 to-transparent" />

        <div className="relative max-w-4xl">
          <div className="flex items-center gap-4"><span className="h-[3px] w-14 bg-linear-to-r from-[#fa7000] via-[#f90032] to-[#960aaa]" /><p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#344155]">Latest Insights</p></div>
          <h2 className="mt-4 text-3xl font-black leading-none tracking-[-0.05em] text-[#101827] sm:text-4xl">Our <span className="brand-gradient-text">Blog</span></h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#60708b] sm:text-base">Explore the latest Dholera property updates, infrastructure development and investment opportunities.</p>
          <div className="mt-5 flex gap-1.5">{["#fa7000", "#ff4e24", "#f90032", "#d000c9", "#960aaa", "#5d4aff"].map((color) => <span key={color} className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />)}</div>
        </div>

        {blogs.length === 0 ? (
          <div className="relative mt-9 max-w-[720px] rounded-[18px] border border-[#dfe5f3] bg-white/70 px-6 py-6 shadow-[0_4px_12px_rgba(46,65,100,0.04)] backdrop-blur-sm sm:px-8">
            <div className="flex items-center gap-4"><FaRegFileAlt className="text-3xl text-[#f90032]" /><span className="h-10 w-px bg-[#d7ddea]" /><p className="text-base font-medium text-[#182947]">Published Estates articles will appear here soon.</p></div>
          </div>
        ) : (
          <div className="relative mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.slice(0, 3).map((blog) => <article key={blog.id} className="overflow-hidden rounded-2xl border border-[#e3e8f2] bg-white/90 shadow-[0_5px_16px_rgba(34,53,87,0.08)]"><Link href={`/blog/${blog.slug}`} className="relative block h-42"><Image src={blogImage(blog.imageUrl)} alt={blog.imageAlt || blog.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" /></Link><div className="p-5"><div className="flex gap-3 text-xs text-[#64718a]"><span className="flex items-center gap-1"><FaUserAlt /> Admin</span><span className="flex items-center gap-1"><FaCalendarAlt /> {new Date(blog.publishedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span></div><Link href={`/blog/${blog.slug}`}><h3 className="mt-3 line-clamp-2 text-lg font-bold text-[#17233b]">{blog.title}</h3></Link><p className="mt-2 line-clamp-2 text-sm leading-6 text-[#64718a]">{blog.excerpt}</p></div></article>)}
          </div>
        )}

        <div className="relative mt-9 text-center"><Link href="/blog" className="premium-button-shine inline-flex items-center gap-3 rounded-xl bg-[linear-gradient(100deg,#fa7000_0%,#f90032_50%,#960aaa_100%)] px-6 py-3 text-sm font-bold text-white shadow-[0_8px_18px_rgba(183,0,128,0.24)] transition-transform hover:-translate-y-0.5"><span>View All Blogs</span> <FaArrowRight /></Link></div>
      </div>
    </section>
  );
}
