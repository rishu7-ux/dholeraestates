"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-white p-0">
      <div className="relative w-full overflow-hidden lg:h-[510px]">
        <div className="relative aspect-video h-auto w-full overflow-hidden bg-[#eef7ff] lg:h-[510px]">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          animate={{ scale: [1, 1.015, 1], x: [0, -2, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/images/dholera-estates-hero-v2.png"
            alt="Illustrative Dholera Estates residential boulevard"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-125 saturate-115"
          />
        </motion.div>

        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-white/34 via-white/8 to-transparent" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_52%_36%_at_50%_39%,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.68)_38%,rgba(255,255,255,0.16)_72%,transparent_100%)]"
        />

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-3 top-[76px] z-10 text-center sm:top-[108px] lg:inset-x-4 lg:top-[135px]"
        >
          <div className="mb-3 flex items-center justify-center gap-4 sm:gap-6">
            <span className="h-[3px] w-16 bg-[#fa7000] sm:w-24" />
            <p className="text-[9px] font-extrabold uppercase tracking-[0.55em] text-slate-950 sm:text-[11px]">
              Premium residential plots
            </p>
            <span className="h-[3px] w-16 bg-linear-to-r from-[#f90032] via-[#960aaa] to-[#0082fa] sm:w-24" />
          </div>

          <h1 className="text-[28px] font-black leading-none tracking-[-0.055em] text-[#111827] drop-shadow-[0_1px_0_rgba(255,255,255,0.75)] sm:text-5xl lg:text-[76px]">
            DHOLERA <span className="brand-gradient-text">ESTATES</span>
          </h1>
          <p className="mt-1 text-sm font-medium tracking-tight text-slate-900 sm:mt-2 sm:text-xl lg:text-[27px]">
            One Dholera. So Many Cities.
          </p>
        </motion.div>

        </div>
      </div>
    </section>
  );
}
