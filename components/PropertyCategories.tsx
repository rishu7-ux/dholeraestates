"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaBuilding, FaHouse, FaIndustry, FaTruckFast } from "react-icons/fa6";

const categories = [
  { title: "Dholera Estates", description: "Verified residential plots in Aakru village from ₹13,00,000. Since 2024, helping investors find trusted, transparent land opportunities in Dholera Smart City under the DMIC corridor.", icon: FaHouse, accent: "#ff5c16", soft: "#fff0e8", position: "object-center", image: "/images/dholera-estates-project.png" },
  { title: "Dholera Estates 1", description: "Dholera Estates 1 offers verified residential plots in Kasindra village, on the Dholera SIR growth corridor near the Ahmedabad–Dholera Expressway. A secure investment by Omana Projects.", icon: FaBuilding, accent: "#f9005d", soft: "#ffe9f2", position: "object-center", image: "/images/dholera-estate-1-project.png" },
  { title: "Dholera Estates 2", description: "One Dholera, so many cities. Premium 170–350 sq. yd. residential plots in Vallinda village, near Dholera International Airport. Explore Dholera Estates 2 today.", icon: FaIndustry, accent: "#087cf4", soft: "#e8f2ff", position: "object-center", image: "/images/dholera-estates-2-project.png" },
  { title: "Dholera Estates 3", description: "Dholera Estates 3 by Omana Projects — verified residential plots near Dholera SIR. Transparent documentation, expert guidance and secure investment opportunities.", icon: FaTruckFast, accent: "#960aaa", soft: "#f6eaff", position: "object-center", image: "/images/dholera-estate-3-project.png" },
];

export default function PropertyCategories() {
  return (
    <section className="bg-white px-0 py-8 sm:px-5 lg:px-8">
      <div className="relative isolate mx-auto max-w-[1800px] overflow-hidden rounded-[0px] bg-[#fcfcff] px-6 py-12 sm:rounded-[34px] sm:px-12 sm:py-14 lg:px-16 lg:py-16">
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_88%_5%,rgba(224,226,255,0.72),transparent_26%),radial-gradient(circle_at_4%_90%,rgba(255,180,146,0.35),transparent_22%)]" />
        <div aria-hidden="true" className="absolute -bottom-24 -left-20 -z-10 h-80 w-80 rotate-[-45deg] border border-[#fa7000]/35 bg-linear-to-tr from-[#f90032]/10 via-[#fa7000]/10 to-transparent" />

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="relative max-w-5xl">
          <div className="flex items-center gap-4"><span className="h-[3px] w-15 bg-linear-to-r from-[#fa7000] to-[#f90032]" /><p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#344155]">Our Projects</p><span className="h-[3px] w-15 bg-linear-to-r from-[#f90032] via-[#960aaa] to-[#0082fa]" /></div>
          <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-0.05em] text-[#101827] sm:text-4xl md:text-5xl">Explore Our <span className="brand-gradient-text">Dholera Estates</span></h2>
          <p className="mt-4 text-sm leading-7 text-[#60708b] sm:text-base">Discover four residential plot projects by Omana Projects in the Dholera growth region.</p>
        </motion.div>

        <div className="relative mt-8 grid gap-4 sm:mt-10 sm:gap-6 lg:mt-9 lg:grid-cols-2 lg:gap-7">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.article key={category.title} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.5, delay: index * 0.08 }} whileHover={{ y: -6 }} className="premium-card-sheen group relative flex flex-col overflow-hidden rounded-[20px] border bg-white/95 shadow-[0_8px_20px_rgba(33,47,80,0.09)] sm:min-h-[290px] sm:flex-row sm:rounded-[22px] sm:shadow-[0_10px_24px_rgba(33,47,80,0.09)]" style={{ borderColor: `${category.accent}55`, borderTopWidth: 5 }}>
                <div className="relative h-36 shrink-0 overflow-hidden sm:h-auto sm:w-1/2"><Image src={category.image || "/images/p1.jpg"} alt={`${category.title} opportunity in Dholera`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw" className={`object-cover brightness-110 saturate-110 transition-transform duration-700 group-hover:scale-110 ${category.position}`} /><div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" /></div>
                <div className="flex flex-1 flex-col p-4 sm:w-1/2 sm:p-5"><span className="flex h-11 w-11 items-center justify-center rounded-[14px] text-lg text-white shadow-[0_5px_14px_rgba(17,17,17,0.18)] sm:h-12 sm:w-12 sm:rounded-[15px] sm:text-xl" style={{ background: category.accent }}><Icon aria-hidden="true" /></span><h3 className="mt-2.5 text-lg font-extrabold tracking-[-0.04em] text-[#101827] sm:mt-3 sm:text-xl">{category.title}</h3><p className="mt-1.5 text-[13px] leading-5 text-[#61708a] sm:mt-2 sm:text-sm">{category.description}</p><Link href="/properties" className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-[linear-gradient(100deg,#fa7000_0%,#f90032_62%,#d000c9_100%)] px-4 py-2 text-xs font-bold text-white shadow-[0_5px_12px_rgba(249,0,80,0.20)] transition-transform hover:scale-105 sm:mt-auto">Read More <FaArrowRight /></Link></div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
