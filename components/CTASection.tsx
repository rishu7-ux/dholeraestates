"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function CTASection() {
  return (
    <section
      className="
        relative
        overflow-hidden

        bg-linear-to-r
        from-[#FA7000]
        via-[#F90032]
        to-[#960AAA]
      "
    >
      {/* =====================================================
          BACKGROUND SHAPES
      ===================================================== */}

      <div className="absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            -right-24
            top-0

            h-full
            w-105

            rotate-12

            bg-white/10
          "
        />

        <div
          className="
            absolute
            right-60
            -top-24

            h-[300px]
            w-[300px]

            rotate-45

            bg-white/5
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-0

            h-full
            w-62.5

            skew-x-[-35deg]

            bg-white/5
          "
        />

        <div
          className="
            absolute
            -left-20
            -bottom-20

            h-72
            w-72

            rounded-full

            bg-[#F90032]/20

            blur-3xl
          "
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10

          mx-auto

          flex
          max-w-7xl
          flex-col
          items-center
          justify-between

          gap-8

          px-6
          py-12

          md:flex-row
          md:py-14

          lg:px-8
        "
      >
        {/* ===================================================
            LEFT CONTENT
        =================================================== */}

        <div className="text-center md:text-left">
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.22em]

              text-white/80

              sm:text-xs
            "
          >
            Dholera Estates
          </p>

          <h2
            className="
              mt-2

              text-3xl
              font-semibold
              leading-tight

              text-white

              sm:text-4xl
              md:text-5xl
            "
          >
            Let&apos;s Talk About Dholera Estates
          </h2>

          <p
            className="
              mt-4

              max-w-2xl

              text-sm
              leading-7

              text-white/80

              sm:text-base
              md:text-lg
            "
          >
            Connect with our team to learn more about Dholera Estates
            residential plots in Akru Village and get complete property
            details.
          </p>
        </div>

        {/* ===================================================
            BUTTON
        =================================================== */}

        <Link
          href="/contact-us"
          className="
            brand-button-outline
            group

            inline-flex
            shrink-0
            items-center
            gap-3

            rounded-xl

            bg-white

            px-7
            py-3.5

            text-sm
            font-bold

            text-[#FA7000]

            shadow-[0_4px_12px_rgba(17,17,17,0.08)]

            transition-all
            duration-300

            hover:bg-[#F90032]
            hover:text-white
            hover:shadow-[0_4px_12px_rgba(17,17,17,0.08)]

            sm:px-8
            sm:py-4
            sm:text-base
          "
        >
          Get in Touch

          <FaArrowRight
            className="
              text-sm

              transition-transform
              duration-300

              group-hover:translate-x-2
            "
          />
        </Link>
      </div>
    </section>
  );
}
