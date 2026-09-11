"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaChartLine, FaHouse, FaLocationDot, FaScaleBalanced, FaShieldHalved } from "react-icons/fa6";

const highlights = [
  { label: "Prime", detail: "Location", icon: FaLocationDot, color: "text-[#fa7000]" },
  { label: "Buyer", detail: "Guidance", icon: FaChartLine, color: "text-[#f90032]" },
  { label: "Document", detail: "Support", icon: FaShieldHalved, color: "text-[#0082fa]" },
];

const projectDetails = [
  { label: "Prime Location", value: "Akru Village", icon: FaLocationDot },
  { label: "Plot Size", value: "170 - 235 Sq. Yd.", icon: FaChartLine },
  { label: "Documentation", value: "Buyer verification required", icon: FaScaleBalanced },
  { label: "Land Type", value: "Residential Plot", icon: FaHouse },
];

export default function PropertyIntro() {
  return (
    <section className="relative overflow-hidden bg-white py-8 sm:py-16 lg:py-9">
      <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 sm:gap-10 sm:px-8 lg:grid-cols-[1.18fr_0.82fr] lg:gap-14 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }}>
          <div className="flex items-center gap-3">
            <span className="h-[3px] w-10 bg-linear-to-r from-[#fa7000] to-[#f90032]" />
            <p className="text-[10px] font-extrabold uppercase tracking-[0.34em] text-slate-700">About Dholera Estates</p>
            <span className="h-[3px] w-10 bg-linear-to-r from-[#f90032] via-[#960aaa] to-[#0082fa]" />
          </div>
          <h2 className="mt-3 text-3xl font-black leading-none tracking-[-0.05em] text-[#111827] sm:mt-4 sm:text-5xl lg:text-[58px]">Dholera <span className="brand-gradient-text">Estates</span></h2>
          <p className="mt-2 text-sm font-semibold text-slate-800 sm:text-lg">Akru village near Dholera SIR, Gujarat</p>
          <span className="mt-3 block h-[3px] w-24 bg-linear-to-r from-[#fa7000] via-[#f90032] to-[#960aaa] sm:mt-4 sm:w-28" />
          <p className="mt-3 max-w-xl text-[13px] leading-[1.65] text-slate-600 sm:mt-4 sm:text-[15px] sm:leading-6">Dholera Estates is a residential plotting project in Akru village, near—not inside—the Dholera Special Investment Region (DSIR). Explore approximately 170–235 sq. yd. plots in a promoted 16-acre township, with location guidance, site visits and documentation support from our team.</p>
          <div className="mt-5 grid gap-3 sm:mt-7 sm:grid-cols-2 sm:gap-4">
            {projectDetails.map(({ label, value, icon: Icon }) => (
              <motion.div key={label} whileHover={{ y: -3 }} className="premium-card-sheen relative flex min-h-[88px] items-center gap-3 overflow-hidden rounded-[18px] border border-[#ffdcca] bg-white p-3 shadow-[0_5px_18px_rgba(250,112,0,0.06)] sm:min-h-[118px] sm:gap-4 sm:rounded-[22px] sm:p-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[15px] bg-[linear-gradient(100deg,#fa7000_0%,#f90032_62%,#d000c9_100%)] text-lg text-white shadow-[0_6px_16px_rgba(249,0,80,0.20)] sm:h-14 sm:w-14 sm:rounded-[18px] sm:text-xl"><Icon aria-hidden="true" /></span>
                <div><p className="text-[8px] font-extrabold uppercase tracking-[0.16em] text-[#8b9bb4] sm:text-[9px]">{label}</p><p className="mt-1 text-[13px] font-extrabold leading-tight text-[#10203a] sm:mt-1.5 sm:text-[15px]">{value}</p></div>
              </motion.div>
            ))}
          </div>
          <Link href="/properties" className="mt-4 inline-flex items-center gap-3 rounded-full bg-[linear-gradient(100deg,#fa7000_0%,#ff5a18_45%,#f90032_100%)] px-6 py-2.5 text-[13px] font-extrabold text-white shadow-[0_5px_14px_rgba(249,0,50,0.20)] transition-transform hover:-translate-y-0.5 hover:brightness-105 sm:mt-5 sm:px-7 sm:py-3 sm:text-sm">Explore Projects <FaArrowRight aria-hidden="true" /></Link>
        </motion.div>

        <motion.aside initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, delay: 0.08 }} className="relative overflow-hidden rounded-[30px] border border-[#e8eef5] bg-[#fefefe] p-6 shadow-[0_10px_32px_rgba(34,53,87,0.08)] sm:p-7">
          <div className="relative z-10">
            <div className="flex items-center gap-3"><p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-slate-600">Investment highlight</p><span className="h-[3px] flex-1 bg-linear-to-r from-[#fa7000] via-[#f90032] to-[#0082fa]" /></div>
            <h3 className="mt-4 text-3xl font-black leading-none tracking-[-0.04em] text-[#111827] sm:text-4xl">Plots near <span className="brand-gradient-text">Dholera SIR</span></h3>
            <div className="mt-3">
              <p className="min-w-0 flex-1 text-sm leading-6 text-slate-600 sm:max-w-sm">Explore residential plots from approximately ₹13–17 lakh onwards. Confirm availability, pricing and documents before purchase.</p>
            </div>
            <div className="mt-4 grid grid-cols-3 divide-x divide-slate-200 sm:mt-6">
              {highlights.map(({ label, detail, icon: Icon, color }) => <div key={detail} className="px-2 first:pl-0 last:pr-0"><Icon className={`mb-2 text-xl ${color}`} aria-hidden="true" /><p className="text-[9px] font-bold leading-tight text-slate-500">{label}<br />{detail}</p></div>)}
            </div>
            <Link href="/properties/dholera-estates" className="mt-6 inline-flex rounded-full bg-[linear-gradient(90deg,#fa7000_0%,#f90032_43%,#960aaa_70%,#0082fa_100%)] p-[2px] shadow-[0_3px_8px_rgba(34,53,87,0.10)] transition-transform hover:-translate-y-0.5">
              <span className="flex items-center gap-3 rounded-full bg-white px-7 py-2.5 text-sm font-extrabold">
                <span className="brand-gradient-text">Know More</span>
                <FaArrowRight className="text-[#960aaa]" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
