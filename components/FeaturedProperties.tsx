"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

import {
  FaMapMarkerAlt,
  FaRulerCombined,
  FaRoad,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

import { MdOutlineVilla } from "react-icons/md";

import PopupForm from "@/components/PopupForm";

/* =========================================================
   PROPERTY DATA
========================================================= */

const properties = [
  {
    id: 1,

    title: "Dholera Estates",

    image: "/images/dholera-estates-project.png",

    location: "Akru Village, Dholera Region, Gujarat",

    size: "170 - 235 Sq. Yd.",

    type: "Residential Plot",

    road: "₹13–17 Lakh*",

    legalStatus: "NA Converted*",

    projectArea: "Approx. 16 Acres*",

    sirPosition: "Near / Outside Dholera SIR Boundary",

    status: "Available",

    slug: "dholera-estates",
  },
];

/* =========================================================
   CARD ANIMATION
========================================================= */

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.98,
  },

  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      delay: index * 0.07,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

/* =========================================================
   INFO ITEM
========================================================= */

function InfoItem({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      className="
        group/info
        flex
        min-w-0
        items-center
        gap-2
        rounded-xl
        bg-[#F8FAFC]
        px-2.5
        py-2.5
        transition-all
        duration-300
        sm:gap-2.5
        sm:px-3
        sm:py-3
      "
    >
      <span
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-[#F8FAFC]
          text-xs
          text-[#FA7000]
          transition-all
          duration-300
          group-hover/info:scale-110
          group-hover/info:bg-[#F90032]
          group-hover/info:text-white
          sm:h-9
          sm:w-9
          sm:text-sm
        "
      >
        {icon}
      </span>

      <span
        className="
          min-w-0
          text-[11px]
          font-semibold
          leading-4
          text-[#111111]
          transition-colors
          duration-300
          group-hover/info:text-[#F90032]
          sm:text-[13px]
          sm:leading-5
          lg:text-sm
        "
      >
        {value}
      </span>
    </motion.div>
  );
}

/* =========================================================
   PROPERTY CARD
========================================================= */

function PropertyCard({
  item,
  index,
  onEnquire,
}: {
  item: (typeof properties)[number];
  index: number;
  onEnquire: (title: string) => void;
}) {
  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      whileHover={{
        y: -4,
      }}
      className="
        card-hover
        group
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-[#E5E7EB]
        bg-white
        shadow-[0_8px_24px_rgba(17,24,39,0.07)]
      "
    >
      {/* TOP LINE */}

      <span
        className="
          absolute
          left-0
          top-0
          z-40
          h-0.75
          w-0
          bg-[#F90032]
          transition-all
          duration-700
          group-hover:w-full
        "
      />

      <div className="grid lg:grid-cols-2">
        {/* =================================================
            IMAGE
        ================================================= */}

        <div
          className="
            relative
            h-67.5
            w-full
            overflow-hidden
            bg-[#F90032]
            sm:h-77.5
            lg:h-full
            lg:min-h-[330px]
          "
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority={index === 0}
            sizes="
              (max-width: 1024px) 100vw,
              60vw
            "
            className="
              object-cover
              brightness-110
              object-left
              transition-transform
              duration-700
              group-hover:scale-105
            "
          />

          {/* AVAILABLE BADGE */}

          <motion.div
            initial={{
              opacity: 0,
              x: -15,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.2,
              duration: 0.4,
            }}
            className="
              absolute
              left-4
              top-4
              z-20
              sm:left-5
              sm:top-5
            "
          >
            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-[#FA7000]
                bg-[#FA7000]
                px-4
                py-2
                text-[10px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-white
                shadow-[0_4px_12px_rgba(17,17,17,0.08)]
                sm:text-xs
              "
            >
              <FaCheckCircle className="text-[#F90032]" />

              {item.status}
            </span>
          </motion.div>

          {/* IMAGE LOCATION */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.3,
              duration: 0.45,
            }}
            className="
              absolute
              bottom-4
              left-4
              right-4
              z-20
              sm:bottom-5
              sm:left-5
              sm:right-auto
            "
          >
            <div
              className="
                inline-flex
                max-w-full
                items-center
                gap-2
                rounded-xl
                border
                border-white/20
                bg-[#FA7000]/75
                px-4
                py-2.5
                text-[12px]
                font-semibold
                text-white
                shadow-[0_4px_12px_rgba(17,17,17,0.08)]
                backdrop-blur-md
                sm:text-sm
              "
            >
              <FaMapMarkerAlt />

              <span>Akru Village</span>
            </div>
          </motion.div>
        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div
          className="
            flex
            flex-col
            justify-center
            bg-white
            px-4
            py-5
            transition-all
            duration-500
            sm:px-6
            sm:py-6
            lg:min-h-87.5
            lg:px-7
            lg:py-6
          "
        >
          {/* SMALL LABEL */}

          <div className="mb-2 flex items-center gap-2">
            <span
              className="
                h-0.5
                w-7
                rounded-full
                bg-[#F90032]
              "
            />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#F90032]
                sm:text-xs
              "
            >
              Residential Plot
            </span>
          </div>

          {/* STATUS */}

          <div className="mt-2">
            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#E5E7EB]
                bg-[#F8FAFC]
                px-3
                py-1.5
                text-[10px]
                font-black
                uppercase
                tracking-[0.12em]
                text-[#FA7000]
                sm:text-[11px]
              "
            >
              <FaCheckCircle />

              Residential Plots Available
            </span>
          </div>

          {/* LOCATION */}

          <motion.div
            whileHover={{
              x: 3,
            }}
            className="
              group/location
              mt-4
              flex
              items-start
              gap-3
              text-[15px]
              font-medium
              text-[#111111]
              sm:mt-5
              sm:text-base
              lg:mt-4
              lg:text-[15px]
            "
          >
            <span
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[#F8FAFC]
                text-[#FA7000]
                transition-all
                duration-300
                group-hover/location:scale-110
                group-hover/location:bg-[#FA7000]
                group-hover/location:text-white
              "
            >
              <FaMapMarkerAlt />
            </span>

            <span className="leading-6">
              {item.location}
            </span>
          </motion.div>

          {/* MAIN DETAILS */}

          <div
            className="
              mt-4
              grid
              grid-cols-1
              gap-2
              sm:mt-5
              sm:grid-cols-3
              sm:gap-3
              lg:mt-4
            "
          >
            <InfoItem
              icon={<FaRulerCombined />}
              value={item.size}
            />

            <InfoItem
              icon={<MdOutlineVilla />}
              value={item.type}
            />

            <InfoItem
              icon={<FaRoad />}
              value={item.road}
            />
          </div>

          {/* EXTRA DETAILS */}

          <div
            className="
              mt-4
              grid
              grid-cols-2
              gap-3
              rounded-xl
              border
              border-[#E5E7EB]
              bg-[#F8FAFC]
              p-3
            "
          >
            <div>
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-[#4B5563]/60
                "
              >
                Project Area
              </p>

              <p
                className="
                  mt-1
                  text-[12px]
                  font-extrabold
                  text-[#F90032]
                  sm:text-[13px]
                "
              >
                {item.projectArea}
              </p>
            </div>

            <div>
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-[#4B5563]/60
                "
              >
                Legal Status
              </p>

              <p
                className="
                  mt-1
                  text-[12px]
                  font-extrabold
                  text-[#F90032]
                  sm:text-[13px]
                "
              >
                {item.legalStatus}
              </p>
            </div>
          </div>

          {/* SIR POSITION */}

          <div
            className="
              mt-3
              rounded-xl
              border
              border-[#E5E7EB]
              bg-[#F8FAFC]
              px-4
              py-3
            "
          >
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-[#F90032]
              "
            >
              SIR Position
            </p>

            <p
              className="
                mt-1
                text-[12px]
                font-semibold
                text-[#4B5563]
                sm:text-[13px]
              "
            >
              {item.sirPosition}
            </p>
          </div>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div
            className="
              mt-5
              grid
              grid-cols-2
              gap-2.5
              sm:mt-6
              sm:gap-3
              lg:mt-4
            "
          >
            {/* ENQUIRE NOW */}

            <motion.button
              type="button"
              onClick={() => onEnquire(item.title)}
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="
                brand-button
                group/enquiry
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#FA7000]
                px-3
                py-3
                text-[13px]
                font-bold
                text-white
                shadow-[0_4px_12px_rgba(17,17,17,0.08)]
                transition-all
                duration-300
                hover:bg-[#F90032]
                hover:shadow-[0_4px_12px_rgba(17,17,17,0.08)]
                sm:px-6
                sm:py-3.5
                sm:text-sm
              "
            >
              Enquire Now

              <FaArrowRight
                className="
                  text-[10px]
                  transition-transform
                  duration-300
                  group-hover/enquiry:translate-x-1
                "
              />
            </motion.button>

            {/* VIEW DETAILS */}

            <motion.div
              whileTap={{
                scale: 0.98,
              }}
              className="h-full"
            >
              <Link
                href="/properties/dholera-estates"
                className="
                  brand-button-outline
                  group/read
                  flex
                  h-full
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-[#F90032]
                  bg-white
                  px-3
                  py-3
                  text-[13px]
                  font-bold
                  text-[#FA7000]
                  transition-all
                  duration-300
                  hover:bg-[#F90032]
                  hover:text-white
                  sm:px-6
                  sm:py-3.5
                  sm:text-sm
                "
              >
                View Details

                <FaArrowRight
                  className="
                    text-[10px]
                    transition-transform
                    duration-300
                    group-hover/read:translate-x-1
                  "
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* =========================================================
   FEATURED PROPERTY SECTION
========================================================= */

export default function FeaturedProperties() {
  const [popupOpen, setPopupOpen] = useState(false);

  const [selectedProperty, setSelectedProperty] =
    useState<string | undefined>(undefined);

  /* =========================================================
     OPEN ENQUIRY
  ========================================================= */

  const handleEnquire = (title: string) => {
    setSelectedProperty(title);
    setPopupOpen(true);
  };

  /* =========================================================
     CLOSE ENQUIRY
  ========================================================= */

  const handleClose = () => {
    setPopupOpen(false);
    setSelectedProperty(undefined);
  };

  return (
    <section id="project-details"
      className="
        relative
        overflow-hidden
        bg-white
        py-16
        md:py-20
        lg:py-14
      "
    >
      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mb-10
            max-w-4xl
            md:mb-12
            lg:mb-8
          "
        >
          {/* SMALL TITLE */}

          <div
            className="
              mb-3
              flex
              items-center
              gap-3
            "
          >
            <motion.span
              initial={{
                width: 0,
              }}
              whileInView={{
                width: 40,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
              className="
                h-0.5
                bg-[#F90032]
              "
            />

            <span
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                text-[#F90032]
              "
            >
              Featured Property
            </span>
          </div>

          {/* HEADING */}

          <h2
            className="
              text-3xl
              font-extrabold
              leading-tight
              sm:text-4xl
            md:text-5xl
            lg:text-4xl
            "
          >
            <span className="brand-gradient-text inline-block">
              Explore Dholera Estates
            </span>
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mt-4
              max-w-3xl
              text-base
              leading-7
              text-[#4B5563]
              sm:text-lg
              lg:text-base
            "
          >
            Explore residential plots in Akru village, near—not inside—Dholera SIR. Plot sizes are approximately 170–235 sq. yards, with indicative pricing of ₹13–17 lakh onwards. *Availability, land use and project details require independent verification.
          </p>
        </motion.div>

        {/* =====================================================
            PROPERTY LIST
        ===================================================== */}

        <div className="space-y-6 md:space-y-8">
          {properties.map((item, index) => (
            <PropertyCard
              key={item.id}
              item={item}
              index={index}
              onEnquire={handleEnquire}
            />
          ))}
        </div>
      </div>

      {/* =====================================================
          POPUP FORM
      ===================================================== */}

      <PopupForm
        open={popupOpen}
        onClose={handleClose}
        propertyName={selectedProperty}
      />
    </section>
  );
}
