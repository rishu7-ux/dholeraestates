"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import {
  FaArrowRight,
  FaBuilding,
  FaCheck,
  FaChartLine,
  FaFileAlt,
  FaHandshake,
  FaHome,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaShieldAlt,
} from "react-icons/fa";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PopupForm from "@/components/PopupForm";
import SideEnquiry from "@/components/SideEnquiry";

/* =========================================================
   ABOUT IMAGE
========================================================= */


/* =========================================================
   SERVICES
========================================================= */

const services = [
  {
    icon: FaHome,
    title: "Residential Plot Sales",
    description:
      "Residential plot opportunities in Dholera Estates with project information, location guidance and buyer assistance.",
  },
  {
    icon: FaChartLine,
    title: "Investment Guidance",
    description:
      "Property guidance based on location, budget, plot size and long-term investment objectives.",
  },
  {
    icon: FaFileAlt,
    title: "Documentation Support",
    description:
      "Support for understanding available project documents, land records and property-related paperwork.",
  },
  {
    icon: FaMapMarkerAlt,
    title: "Site Visit Assistance",
    description:
      "Site visit coordination for buyers interested in exploring Dholera Estates at Akru Village.",
  },
  {
    icon: FaBuilding,
    title: "Property Information",
    description:
      "Clear information about plot sizes, project area, indicative pricing, location and residential land use.",
  },
];

/* =========================================================
   JOURNEY
========================================================= */

const journeyExpansion = [
  {
    icon: FaChartLine,
    title: "Property Guidance",
    description:
      "Helping buyers understand residential plot opportunities in the wider Dholera growth region.",
  },
  {
    icon: FaBuilding,
    title: "Flexible Plot Options",
    description:
      "Residential plot options ranging from 176 to 235 sq. yards in Dholera Estates.",
  },
  {
    icon: FaHandshake,
    title: "Customer Support",
    description:
      "Support throughout property exploration, documentation, enquiry and site-visit coordination.",
  },
];

/* =========================================================
   ANIMATION
========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const stagger = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardAnimation = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.97,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      className="mb-8"
    >
      {/* LABEL */}

      <div className="mb-4 flex items-center gap-3">
        <span
          className="
            brand-accent-line
          "
        />

        <span
          className="
            brand-eyebrow
          "
        >
          {label}
        </span>
      </div>

      {/* TITLE */}

      <h2
        className="
          text-3xl
          font-extrabold
          leading-tight
          tracking-tight
          text-[#101827]

          md:text-4xl
          lg:text-[42px]
        "
      >
        {title}
      </h2>

      {/* DESCRIPTION */}

      {description && (
        <p
          className="
            mt-4
            max-w-3xl
            text-[16px]
            leading-8
            text-[#4B5563]
          "
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function AboutPage() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <div className="about-premium">
      <Header />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          brand-page-banner internal-page-hero about-page-hero
        "
      >
        <Image
          src="/images/property-overview-background.png"
          alt="Dholera Estates"
          fill
          priority
          sizes="100vw"
          className="pointer-events-none object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-white via-white/86 to-white/22" />
        {/* BACKGROUND DESIGN */}

        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-32

            h-105
            w-105

            rotate-12

            border-60
            border-white/10
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-[18%]
            top-10

            h-48
            w-48

            rotate-45

            border-25
            border-white/5
          "
        />

        {/* CONTENT */}

        <div
          className="
            relative
            mx-auto

            flex
            min-h-50
            max-w-7xl
            items-center

            px-5
            py-8

            sm:px-6
            sm:min-h-58.75
            sm:py-10
            lg:px-8
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-4xl"
          >
            {/* LABEL */}

            <div className="mb-4 flex items-center gap-3">
              <span className="brand-accent-line" />

              <span
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.24em]
                  brand-gradient-text
                "
              >
                Dholera Estates
              </span>
            </div>

            {/* HEADING */}

            <h1
              className="
                text-3xl
                font-extrabold
                tracking-tight
                text-white

                sm:text-5xl
                lg:text-[54px]
              "
            >
              About <span className="brand-gradient-text">Us</span>
            </h1>

            {/* BREADCRUMB */}

            <div
              className="
                mt-5

                flex
                items-center
                gap-2

                text-sm
                font-medium
                text-white/90
              "
            >
              <Link
                href="/"
                className="
                  transition-colors
                  duration-300

                  hover:text-[#F8FAFC]
                "
              >
                Home
              </Link>

              <span>/</span>

              <span>About Us</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          COMPANY / PROJECT INTRO
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden

          bg-[#F8FAFC]

          py-20
        "
      >
        {/* BACKGROUND */}

        <div
          className="
            pointer-events-none

            absolute
            -left-32
            top-20

            h-80
            w-80

            rounded-full

            bg-[#F8FAFC]

            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none

            absolute
            -right-32
            bottom-0

            h-80
            w-80

            rounded-full

            bg-[#F8FAFC]

            blur-3xl
          "
        />

        <div
          className="
            relative

            mx-auto
            max-w-7xl

            px-5
            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              grid
              items-start
              gap-12

              lg:grid-cols-[1fr_360px]
            "
          >
            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <main>
              {/* =================================================
                  OUR STORY
              ================================================= */}

              <SectionHeading
                label="Our Story"
                title="About Dholera Estates"
                description="A residential plotting opportunity in Akru Village focused on clear project information, buyer guidance and a straightforward property enquiry experience."
              />

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                }}
                className="
                  rounded-[26px]

                  border
                  border-[#E5E7EB]

                  bg-white

                  p-6

                  shadow-[0_10px_28px_rgba(17,17,17,0.08)]

                  md:p-8
                "
              >
                <p
                  className="
                    text-[16px]
                    leading-8

                    text-[#4B5563]

                    md:text-[17px]
                  "
                >
                  Dholera Estates is a residential plotting project located in
                  Akru Village in the wider Dholera region of Gujarat. The
                  project offers residential plots designed for buyers looking
                  for land near the Dholera growth corridor.
                </p>

                <div className="my-7 h-px bg-[#F8FAFC]" />

                <p
                  className="
                    text-[16px]
                    leading-8

                    text-[#4B5563]

                    md:text-[17px]
                  "
                >
                  Established in 2024, Dholera Estates promotes a township of approximately 16 acres with residential plots of approximately 176–235 sq. yards. A clubhouse and proposed temple are included in the project information. Confirm the title, NA conversion, layout and exact boundaries independently.
                </p>
              </motion.div>

              {/* =================================================
                  WHAT WE DO
              ================================================= */}

              <section className="mt-16">
                <SectionHeading
                  label="Our Expertise"
                  title="How We Help Property Buyers"
                />

                <p
                  className="
                    text-[17px]
                    leading-8

                    text-[#4B5563]
                  "
                >
                  Our focus is to help buyers understand Dholera Estates
                  through clear property information and enquiry support.
                </p>

                {/* SERVICES */}

                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                    amount: 0.1,
                  }}
                  className="
                    mt-8

                    grid
                    gap-5

                    sm:grid-cols-2
                  "
                >
                  {services.map((service) => {
                    const Icon = service.icon;

                    return (
                      <motion.article
                        key={service.title}
                        variants={cardAnimation}
                        whileHover={{
                          y: -6,
                        }}
                        className="
                          group
                          relative

                          overflow-hidden

                          rounded-2xl

                          border
                          border-[#E5E7EB]

                          bg-white

                          p-5

                          shadow-[0_4px_12px_rgba(17,17,17,0.08)]

                          transition-all
                          duration-300

                          hover:border-[#E5E7EB]
                          hover:shadow-[0_10px_28px_rgba(17,17,17,0.08)]
                        "
                      >
                        {/* ICON */}

                        <span
                          className="
                            flex
                            h-12
                            w-12

                            items-center
                            justify-center

                            rounded-xl

                            bg-[#F8FAFC]

                            text-[#FA7000]

                            transition-all
                            duration-300

                            group-hover:rotate-6
                            group-hover:scale-110
                            group-hover:bg-[#F90032]
                            group-hover:text-white
                          "
                        >
                          <Icon />
                        </span>

                        {/* TITLE */}

                        <h3
                          className="
                            mt-5

                            text-lg
                            font-extrabold

                            text-[#F90032]

                            transition-colors
                            duration-300

                            group-hover:text-[#F90032]
                          "
                        >
                          {service.title}
                        </h3>

                        {/* DESCRIPTION */}

                        <p
                          className="
                            mt-3

                            text-sm
                            leading-7

                            text-[#4B5563]
                          "
                        >
                          {service.description}
                        </p>

                        {/* BOTTOM LINE */}

                        <span
                          className="
                            absolute
                            bottom-0
                            left-0

                            h-0.75
                            w-0

                            bg-[#F90032]

                            transition-all
                            duration-500

                            group-hover:w-full
                          "
                        />
                      </motion.article>
                    );
                  })}
                </motion.div>

                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                  }}
                  className="
                    mt-8

                    rounded-2xl

                    border
                    border-[#E5E7EB]

                    bg-[#F8FAFC]

                    p-5

                    text-[16px]
                    font-semibold
                    leading-8

                    text-[#F90032]
                  "
                >
                  Our goal is to make property information easier to understand
                  so buyers can evaluate Dholera Estates with greater clarity.
                </motion.p>
              </section>

              {/* =================================================
                  JOURNEY
              ================================================= */}

              <section className="mt-16">
                <SectionHeading
                  label="Our Approach"
                  title="Our Property Journey"
                />

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                  }}
                  className="
                    rounded-[26px]

                    border
                    border-[#E5E7EB]

                    bg-white

                    p-6

                    shadow-[0_10px_28px_rgba(17,17,17,0.08)]

                    md:p-8
                  "
                >
                  <p
                    className="
                      text-[16px]
                      leading-8

                      text-[#4B5563]
                    "
                  >
                    The property journey begins with understanding what the
                    buyer is looking for — plot size, location, intended use
                    and budget. From there, our team helps explain the
                    available Dholera Estates information and assists with
                    enquiries, documentation discussions and site visits.
                  </p>
                </motion.div>

                {/* JOURNEY CARDS */}

                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  className="
                    mt-7

                    grid
                    gap-5

                    md:grid-cols-3
                  "
                >
                  {journeyExpansion.map((item) => {
                    const Icon = item.icon;

                    return (
                      <motion.article
                        key={item.title}
                        variants={cardAnimation}
                        whileHover={{
                          y: -7,
                        }}
                        className="
                          group

                          rounded-[22px]

                          border
                          border-[#E5E7EB]

                          bg-white

                          p-6

                          shadow-[0_4px_12px_rgba(17,17,17,0.08)]

                          transition-all
                          duration-300

                          hover:border-[#E5E7EB]
                          hover:shadow-[0_10px_28px_rgba(17,17,17,0.08)]
                        "
                      >
                        <span
                          className="
                            flex
                            h-12
                            w-12

                            items-center
                            justify-center

                            rounded-xl

                            bg-[#F8FAFC]

                            text-[#FA7000]

                            transition-all
                            duration-300

                            group-hover:scale-110
                            group-hover:bg-[#F90032]
                            group-hover:text-white
                          "
                        >
                          <Icon />
                        </span>

                        <h3
                          className="
                            mt-5

                            text-lg
                            font-extrabold

                            text-[#F90032]
                          "
                        >
                          {item.title}
                        </h3>

                        <p
                          className="
                            mt-3

                            text-sm
                            leading-7

                            text-[#4B5563]
                          "
                        >
                          {item.description}
                        </p>
                      </motion.article>
                    );
                  })}
                </motion.div>

                <p
                  className="
                    mt-7

                    text-[17px]
                    leading-8

                    text-[#4B5563]
                  "
                >
                  Dholera Estates is focused on residential plots in Akru
                  Village. Buyers can explore flexible plot sizes and obtain
                  project information before deciding whether the opportunity
                  fits their requirements.
                </p>
              </section>

              {/* =================================================
                  VISION
              ================================================= */}

              <motion.section
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.65,
                }}
                className="
                  relative

                  mt-16

                  overflow-hidden

                  rounded-[28px]

                  border
                  border-[#E5E7EB]

                  bg-[#F8FAFC]

                  p-7

                  md:p-9
                "
              >
                {/* ICON */}

                <div
                  className="
                    flex
                    h-14
                    w-14

                    items-center
                    justify-center

                    rounded-2xl

                    bg-[#FA7000]

                    text-xl
                    text-white

                    shadow-[0_4px_12px_rgba(17,17,17,0.08)]
                  "
                >
                  <FaShieldAlt />
                </div>

                {/* LABEL */}

                <p
                  className="
                    mt-6

                    text-xs
                    font-extrabold
                    uppercase
                    tracking-[0.2em]

                    text-[#F90032]
                  "
                >
                  Future Direction
                </p>

                {/* HEADING */}

                <h2
                  className="
                    mt-3

                    text-3xl
                    font-extrabold

                    text-[#F90032]

                    md:text-4xl
                  "
                >
                  Our Vision
                </h2>

                {/* CONTENT */}

                <p
                  className="
                    mt-5

                    text-[16px]
                    leading-8

                    text-[#4B5563]
                  "
                >
                  Our vision is to provide buyers with a clear and professional
                  way to explore Dholera Estates and understand residential
                  property opportunities in the wider Dholera region.
                </p>

                {/* CTA */}

                <motion.button
                  type="button"
                  onClick={() => setPopupOpen(true)}
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="
                    group
                    brand-button

                    mt-7

                    inline-flex
                    items-center
                    gap-3

                    rounded-xl

                    bg-[#FA7000]

                    px-7
                    py-4

                    font-bold
                    text-white

                    shadow-[0_4px_12px_rgba(17,17,17,0.08)]

                    transition-all
                    duration-300

                    hover:bg-[#F90032]
                    hover:shadow-[0_4px_12px_rgba(17,17,17,0.08)]
                  "
                >
                  Explore Dholera Estates

                  <FaArrowRight
                    className="
                      transition-transform
                      duration-300

                      group-hover:translate-x-1
                    "
                  />
                </motion.button>
              </motion.section>
            </main>

            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside
              className="
                space-y-7
                self-start

                lg:sticky
                lg:top-28
              "
            >
              {/* =================================================
                  ENQUIRY CARD
              ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: 30,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                }}
                className="
                  relative
                  overflow-hidden

                  rounded-[26px]

                  border
                  border-[#E5E7EB]

                  bg-[#F8FAFC]

                  p-6

                  shadow-[0_10px_28px_rgba(17,17,17,0.08)]
                "
              >
                {/* TOP LINE */}

                <span
                  className="
                    absolute
                    left-0
                    top-0

                    h-1
                    w-full

                    bg-[#F90032]
                  "
                />

                {/* LABEL */}

                <span
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.18em]

                    text-[#F90032]
                  "
                >
                  Property Enquiry
                </span>

                {/* TITLE */}

                <h3
                  className="
                    mt-2

                    text-3xl
                    font-extrabold

                    text-[#F90032]
                  "
                >
                  Interested in Dholera Estates?
                </h3>

                {/* DESCRIPTION */}

                <p
                  className="
                    mt-3

                    text-sm
                    leading-6

                    text-[#4B5563]
                  "
                >
                  Speak with our team for plot information, availability,
                  documentation and site-visit assistance.
                </p>

                {/* ENQUIRE */}

                <motion.button
                  type="button"
                  onClick={() => setPopupOpen(true)}
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="
                    group
                    brand-button

                    mt-6

                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2

                    rounded-xl

                    bg-[#FA7000]

                    py-4

                    font-bold
                    text-white

                    shadow-[0_4px_12px_rgba(17,17,17,0.08)]

                    transition-all
                    duration-300

                    hover:bg-[#F90032]
                  "
                >
                  Enquire Now

                  <FaArrowRight
                    className="
                      transition-transform
                      duration-300

                      group-hover:translate-x-2
                    "
                  />
                </motion.button>

                {/* PHONE */}

                <a
                  href="tel:+919217104219"
                  className="
                    group

                    mt-5

                    flex
                    items-center
                    justify-center
                    gap-2

                    border-t
                    border-[#E5E7EB]

                    pt-5

                    text-sm
                    font-bold

                    text-[#FA7000]

                    transition-colors
                    duration-300

                    hover:text-[#F90032]
                  "
                >
                  <FaPhoneAlt className="text-[#F90032]" />

                  +91 92171 04219
                </a>
              </motion.div>

              {/* =================================================
                  TRUST CARD
              ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: 30,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                }}
                className="
                  rounded-[26px]

                  border
                  border-[#E5E7EB]

                  bg-white

                  p-6

                  shadow-[0_10px_28px_rgba(17,17,17,0.08)]
                "
              >
                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.18em]

                    text-[#F90032]
                  "
                >
                  Why Choose Us
                </p>

                <h3
                  className="
                    mt-2

                    text-2xl
                    font-extrabold

                    text-[#F90032]
                  "
                >
                  Property Information Made Simple
                </h3>

                <div className="mt-6 space-y-3">
                  {[
                    "Project Information",
                    "Plot Size Guidance",
                    "Documentation Support",
                    "Site Visit Assistance",
                  ].map((item) => (
                    <motion.div
                      key={item}
                      whileHover={{
                        x: 4,
                      }}
                      className="
                        group

                        flex
                        items-center
                        gap-3

                        rounded-xl

                        border
                        border-transparent

                        bg-[#F8FAFC]

                        p-3

                        transition-all
                        duration-300

                        hover:border-[#E5E7EB]
                      "
                    >
                      <span
                        className="
                          flex
                          h-8
                          w-8

                          items-center
                          justify-center

                          rounded-lg

                          bg-[#F8FAFC]

                          text-xs
                          text-[#FA7000]

                          transition-all
                          duration-300

                          group-hover:bg-[#F90032]
                          group-hover:text-white
                        "
                      >
                        <FaCheck />
                      </span>

                      <span
                        className="
                          text-sm
                          font-semibold

                          text-[#F90032]
                        "
                      >
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <CTASection />

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />
      <SideEnquiry />

      {/* =====================================================
          POPUP FORM
      ===================================================== */}

      <PopupForm
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        propertyName="Dholera Estates"
      />
    </div>
  );
}
