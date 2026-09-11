"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaIndustry, FaPlaneDeparture, FaRoad, FaSolarPanel, FaTrain, FaTruckFast } from "react-icons/fa6";

const highlights = [
  { title: "Semiconductor Manufacturing Hub", icon: FaIndustry, accent: "#0082FA" },
  { title: "Dholera International Airport", icon: FaPlaneDeparture, accent: "#FA7000" },
  { title: "Ahmedabad–Dholera Expressway", icon: FaRoad, accent: "#FA7000" },
  { title: "Ahmedabad–Dholera Semi-High-Speed Rail", icon: FaTrain, accent: "#0082FA" },
  { title: "Freight & Logistics Connectivity", icon: FaTruckFast, accent: "#960AAA" },
  { title: "Renewable Energy & Solar Development", icon: FaSolarPanel, accent: "#0082FA" },
];

export default function InfrastructureHighlights() {
  return (
    <section className="bg-white px-4 py-8 sm:px-8 lg:px-8">
      <div className="relative isolate mx-auto max-w-[2000px] overflow-hidden bg-[#f8fafc] px-5 py-16 shadow-[0_12px_26px_rgba(17,17,17,0.12)] sm:px-8 lg:px-14 lg:py-20">
        <Image src="/images/dholera-regional-infrastructure-v2.png" alt="Illustrative panorama of infrastructure around the Dholera region" fill priority={false} sizes="(max-width: 2048px) 100vw, 2000px" className="-z-30 object-cover object-center" />
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-linear-to-b from-white/10 via-white/5 to-white/88" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[55%] bg-[radial-gradient(ellipse_62%_65%_at_50%_42%,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.80)_45%,rgba(255,255,255,0)_100%)]" />

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3"><span className="h-0.5 w-10 rounded-full bg-[#FA7000]" /><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#111111]">Regional Infrastructure</p><span className="h-0.5 w-10 rounded-full bg-[#FA7000]" /></div>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#101827] sm:text-4xl md:text-5xl">Growth Drivers Around the <span className="brand-gradient-text inline-block">Dholera Region</span></h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-[#4b5563] sm:text-lg">Major transport, industry and clean-energy initiatives are shaping connectivity and long-term development across the wider region.</p>
        </motion.div>

        <div className="relative z-10 mx-auto mt-10 grid max-w-7xl gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <motion.article key={highlight.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: index * 0.07 }} whileHover={{ y: -4 }} style={{ "--card-accent": highlight.accent, "--card-accent-soft": `${highlight.accent}14` } as React.CSSProperties} className="card-hover group flex min-h-24 items-center gap-3.5 rounded-xl border border-white/90 bg-white/95 p-4 shadow-[0_2px_6px_rgba(17,17,17,0.08)] backdrop-blur-sm">
                <span className="icon-box flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg"><Icon aria-hidden="true" /></span>
                <div className="min-w-0"><h3 className="text-sm font-extrabold leading-6 text-[#111827] lg:whitespace-nowrap xl:text-[15px]">{highlight.title}</h3><span style={{ backgroundColor: highlight.accent }} className="mt-2.5 block h-0.5 w-8 transition-all duration-300 group-hover:w-12" /></div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
