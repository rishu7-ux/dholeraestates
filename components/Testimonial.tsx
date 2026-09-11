"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaQuoteRight, FaStar } from "react-icons/fa";

const testimonials = [
  { name: "Rajeev Malhotra", image: "/images/testimonial-rajeev-v2.png", review: "The team supported us throughout the process and explained the residential plot options clearly." },
  { name: "Rakesh Jain", image: "/images/testimonial-rakesh-v2.png", review: "The guidance made our property enquiry and plot-selection process straightforward." },
  { name: "Sudha Sharma", image: "/images/testimonial-sudha-v2.png", review: "We appreciated the responsive communication and help with understanding the next steps." },
];

const runningTestimonials = [...testimonials, ...testimonials];

export default function Testimonial() {
  return (
    <section className="bg-white px-0 py-8 sm:px-5 lg:px-8">
      <div className="relative isolate mx-auto min-h-[720px] max-w-[1920px] overflow-hidden rounded-[0px] px-6 py-10 sm:min-h-[720px] sm:rounded-[34px] sm:px-10 lg:min-h-[760px] lg:px-18 lg:py-12">
        <Image src="/images/dholera-testimonials-background-v2.png" alt="Illustrative landscaped residential community at sunset" fill sizes="(max-width: 1920px) 100vw, 1920px" className="-z-30 object-cover object-center" />
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-linear-to-b from-white/38 via-white/5 to-black/10" />
        <div aria-hidden="true" className="absolute left-0 top-0 -z-10 h-[48%] w-[62%] bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.68)_55%,transparent_100%)]" />

        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="relative max-w-xl">
          <div className="flex items-center gap-4"><span className="h-[3px] w-14 bg-linear-to-r from-[#fa7000] to-[#f90032]" /><p className="text-xs font-extrabold uppercase tracking-[0.26em] text-[#111827]">Client Experiences</p></div>
          <h2 className="mt-6 text-4xl font-black leading-none tracking-[-0.045em] text-[#101827] sm:text-5xl lg:text-[64px]">OUR <span className="brand-gradient-text">TESTIMONIALS</span></h2>
          <p className="mt-5 max-w-[570px] text-base leading-7 text-[#4b5563] sm:text-lg">See what our clients say about their experience while exploring property opportunities in Dholera.</p>
          <div className="mt-6 flex gap-2" aria-label="Testimonial slide 1 of 6">{[0, 1, 2, 3, 4, 5].map((dot) => <span key={dot} className={`h-3 w-3 rounded-full ${dot === 0 ? "bg-[#fa7000]" : "bg-slate-300/80"}`} />)}</div>
        </motion.div>

        <p className="absolute right-10 top-10 hidden max-w-[240px] text-xs font-medium uppercase tracking-[0.22em] leading-6 text-white/85 lg:block">People trust us<br />to build a brighter<br />tomorrow <span className="mt-4 block h-px w-12 bg-white/80" /></p>

        <div className="relative mt-10 -mx-6 overflow-hidden pb-3 pt-2 sm:mt-12 sm:-mx-10 lg:mt-14 lg:-mx-18">
          <motion.div className="flex w-max gap-5 px-6 sm:gap-6 sm:px-10 lg:gap-7 lg:px-18" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 50, ease: "linear", repeat: Infinity }}>
            {runningTestimonials.map((testimonial, index) => (
              <article key={`${testimonial.name}-${index}`} className="premium-card-sheen group relative flex min-h-82.5 w-77.5 shrink-0 flex-col rounded-[22px] bg-white/92 p-5 shadow-[0_10px_28px_rgba(17,17,17,0.12)] backdrop-blur-md sm:min-h-87.5 sm:w-97.5 sm:p-7 lg:w-125 lg:p-8">
                <div className="flex items-center justify-between text-[#fa7000]"><div className="flex gap-1">{[1, 2, 3, 4, 5].map((star) => <FaStar key={star} className="text-[12px] sm:text-sm" />)}</div><FaQuoteRight className="text-3xl text-[#ffb579]" /></div>
                <p className="mt-5 text-[13px] leading-7 text-[#4b5563] sm:text-[15px] sm:leading-8">{testimonial.review}</p>
                <div className="mt-auto border-t-2 border-[#fa7000] pt-5"><div className="flex items-center gap-4"><div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-[3px] border-[#fa7000] sm:h-[72px] sm:w-[72px]"><Image src={testimonial.image} alt={`${testimonial.name} portrait`} fill sizes="72px" className="object-cover" /></div><div><h3 className="text-[18px] font-bold text-[#111827] sm:text-xl">{testimonial.name}</h3><p className="mt-1 text-[11px] font-medium uppercase tracking-[0.1em] text-slate-500 sm:text-xs">Happy Client</p></div></div></div>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
