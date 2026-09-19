"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import {
  FaArrowRight,
  FaCheckCircle,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUser,
  FaWhatsapp,
} from "react-icons/fa";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SideEnquiry from "@/components/SideEnquiry";

/* =========================================================
   VALIDATION
========================================================= */

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .min(3, "Please enter at least 3 characters"),

  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(
      /^[6-9]\d{9}$/,
      "Enter a valid 10-digit Indian mobile number"
    ),

  propertyType: z
    .string()
    .min(1, "Please select property"),

  budget: z
    .string()
    .min(1, "Please select your budget"),

  comments: z
    .string()
    .trim()
    .max(500, "Comments cannot exceed 500 characters")
    .optional(),

  consent: z.boolean().refine((value) => value === true, {
    message: "Please accept before submitting",
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

/* =========================================================
   PAGE
========================================================= */

export default function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,

    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),

    defaultValues: {
      name: "",
      email: "",
      phone: "",
      propertyType: "dholera-estates",
      budget: "",
      comments: "",
      consent: false,
    },

    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  /* =========================================================
     SUBMIT
  ========================================================= */

  const onSubmit = async (data: ContactFormData) => {
    try {
      setServerError("");

      const response = await fetch("/api/contact-messages", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          propertyType: data.propertyType,
          budget: data.budget,
          comments: data.comments || "",
          consent: data.consent,

        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            result.errors?.[0]?.message ||
            "Failed to submit contact form"
        );
      }

      reset({
        name: "",
        email: "",
        phone: "",
        propertyType: "dholera-estates",
        budget: "",
        comments: "",
        consent: false,
      });

      setSubmitted(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setServerError(message);
    }
  };

  return (
    <div className="contact-premium">
      <Header />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          brand-page-banner internal-page-hero
        "
      >
        <Image
          src="/images/contact.png"
          alt="Contact Dholera Estates"
          fill
          priority
          sizes="100vw"
          className="pointer-events-none object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-white via-white/88 to-white/24" />
        {/* DECORATION */}

        <div
          className="
            pointer-events-none
            absolute
            -left-30
            -top-40

            h-125
            w-77.5

            rotate-32

            bg-white/10
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            left-[28%]
            -top-52.5

            h-155
            w-75

            rotate-38

            bg-white/5
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-[8%]
            -top-47.5

            h-140
            w-72.5

            rotate-12

            bg-[#F90032]/20
          "
        />

        {/* CONTENT */}

        <div
          className="
            relative
            z-10

            mx-auto
            max-w-7xl

            px-5
            py-7

            sm:px-6
            sm:py-10

            lg:px-8
            lg:py-12
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
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
            <div className="mb-4 flex items-center gap-3">
              <span
                className="
                  h-0.5
                  w-10
                  bg-[#F90032]
                "
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.25em]

                  text-[#F90032]

                  sm:text-xs
                "
              >
                Contact Our Team
              </span>
            </div>

            <h1
              className="
                text-[30px]
                font-black
                leading-[1.1]

                text-white

                sm:text-4xl
                md:text-5xl
                lg:text-[54px]
              "
            >
              Let&apos;s Talk About{" "}

              <span className="text-[#F8FAFC]">
                Dholera Estates
              </span>
            </h1>

            <p
              className="
                mt-4

                max-w-2xl

                text-[14px]
                leading-7

                text-white/90

                sm:text-[15px]
                md:text-base
              "
            >
              Connect with our property team for Dholera Estates
              project details, plot availability, documentation,
              pricing and site visit assistance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          CONTACT SECTION
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden

          bg-white

          py-14

          sm:py-20
          lg:py-24
        "
      >
        {/* LIGHT BLUE BACKGROUND EFFECTS */}

        <div
          className="
            pointer-events-none
            absolute
            -left-40
            top-20

            h-96
            w-96

            rounded-full

            bg-[#F8FAFC]

            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-40
            bottom-10

            h-96
            w-96

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

            px-4

            sm:px-6
            lg:px-8
          "
        >
          {/* =================================================
              CONTACT GRID
          ================================================= */}

          <div
            className="
              mx-auto

              grid
              max-w-6xl
              gap-6

              lg:grid-cols-[0.85fr_1.4fr]
              lg:gap-8
            "
          >
            {/* =================================================
                LEFT CONTACT CARD
            ================================================= */}

            <motion.aside
              initial={{
                opacity: 0,
                x: -30,
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

                rounded-[30px]

                bg-linear-to-br
                from-[#F8FAFC]
                via-[#F8FAFC]
                to-[#F8FAFC]

                border
                border-[#E5E7EB]

                p-7

                text-[#F90032]

                shadow-[0_10px_28px_rgba(17,17,17,0.08)]

                sm:p-9
                lg:p-10
              "
            >
              <div className="relative">
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.25em]

                    text-[#F90032]
                  "
                >
                  Contact Information
                </p>

                <h3
                  className="
                    mt-3

                    text-2xl
                    font-black

                    brand-gradient-text

                    sm:text-3xl
                  "
                >
                  Talk To Our
                  <br />
                  Property Experts
                </h3>

                <p
                  className="
                    mt-4

                    text-sm
                    leading-7

                    text-[#4B5563]
                  "
                >
                  Get clear information about Dholera Estates,
                  plot selection, documentation, pricing and site visits.
                </p>

                {/* DETAILS */}

                <div className="mt-9 space-y-6">
                  {/* ADDRESS */}

                  <motion.div
                    whileHover={{
                      x: 4,
                    }}
                    className="
                      flex
                      items-start
                      gap-4
                    "
                  >
                    <span
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center

                        rounded-2xl

                        bg-white

                        text-[#FA7000]

                        shadow-lg
                      "
                    >
                      <FaMapMarkerAlt />
                    </span>

                    <div>
                      <p
                        className="
                          text-xs
                          font-bold
                          uppercase
                          tracking-wider
                          brand-gradient-text
                        "
                      >
                        Office Address
                      </p>

                      <p
                        className="
                          mt-2

                          text-xs
                          leading-6

                          text-[#4B5563]
                        "
                      >
                        7th Floor, Plot No 56A/16,
                        C Block, Phase 2, Industrial Area,
                        Sector 62, Noida,
                        Uttar Pradesh 201309
                      </p>
                    </div>
                  </motion.div>

                  {/* PHONE */}

                  <motion.a
                    href="tel:+919217104219"
                    whileHover={{
                      x: 4,
                    }}
                    className="
                      flex
                      items-center
                      gap-4
                    "
                  >
                    <span
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center

                        rounded-2xl

                        bg-white

                        text-[#FA7000]
                      "
                    >
                      <FaPhoneAlt />
                    </span>

                    <div>
                      <p
                        className="
                          text-xs
                          font-bold
                          uppercase
                          tracking-wider
                          brand-gradient-text
                        "
                      >
                        Phone Number
                      </p>

                      <p
                        className="
                          mt-1

                          text-sm
                          font-semibold

                          text-[#4B5563]
                        "
                      >
                        +91 92171 04219
                      </p>
                    </div>
                  </motion.a>

                  {/* EMAIL */}

                  <motion.a
                    href="mailto:customercare@omanaprojects.com"
                    whileHover={{
                      x: 4,
                    }}
                    className="
                      flex
                      items-center
                      gap-4
                    "
                  >
                    <span
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center

                        rounded-2xl

                        bg-white

                        text-[#FA7000]
                      "
                    >
                      <FaEnvelope />
                    </span>

                    <div className="min-w-0">
                      <p
                        className="
                          text-xs
                          font-bold
                          uppercase
                          tracking-wider
                          brand-gradient-text
                        "
                      >
                        Email Address
                      </p>

                      <p
                        className="
                          mt-1

                          break-all

                          text-xs
                          font-semibold

                          text-[#4B5563]
                        "
                      >
                        customercare@omanaprojects.com
                      </p>
                    </div>
                  </motion.a>
                </div>

                <div className="my-8 h-px bg-[#F90032]/25" />

                {/* WHATSAPP */}

                <a
                  href="https://wa.me/919217104219"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    brand-button

                    flex
                    w-full
                    items-center
                    justify-center
                    gap-3

                    rounded-2xl

                    px-5
                    py-4

                    text-sm
                    font-bold

                    text-white

                    shadow-lg

                    transition-all
                    duration-300

                    hover:bg-[#F8FAFC]
                    hover:text-[#F90032]
                  "
                >
                  <FaWhatsapp
                    className="
                      text-lg
                      text-white
                    "
                  />

                  Chat With Our Team

                  <FaArrowRight
                    className="
                      text-xs

                      transition-transform

                      group-hover:translate-x-1
                    "
                  />
                </a>
              </div>
            </motion.aside>

            {/* =================================================
                FORM CARD
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
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
              }}
              className="
                relative
                overflow-hidden

                rounded-[30px]

                border
                border-[#E5E7EB]

                bg-white

                p-5

                shadow-[0_10px_28px_rgba(17,17,17,0.08)]

                sm:p-8
                lg:p-10
              "
            >
              {/* TOP LINE */}

              <div
                className="
                  absolute
                  left-0
                  top-0

                  h-1
                  w-full

                  bg-linear-to-r
                  from-[#FA7000]
                  via-[#FA7000]
                  to-[#FA7000]
                "
              />

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -15,
                    }}
                  >
                    <div className="mb-7">
                      <p
                        className="
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.25em]

                          text-[#F90032]
                        "
                      >
                        Quick Enquiry
                      </p>

                      <h3
                        className="
                          mt-2

                          text-2xl
                          font-black

                          brand-gradient-text

                          sm:text-3xl
                        "
                      >
                        Send Us Your Requirement
                      </h3>

                      <p
                        className="
                          mt-2

                          text-xs
                          leading-6

                          text-[#4B5563]

                          sm:text-sm
                        "
                      >
                        Fill in the details and our property consultant
                        will contact you shortly.
                      </p>
                    </div>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                      className="space-y-5"
                    >
                      {/* NAME */}

                      <div>
                        <label
                          className="
                            mb-2
                            block

                            text-xs
                            font-bold

                            brand-gradient-text
                          "
                        >
                          Full Name *
                        </label>

                        <div
                          className={`
                            flex
                            items-center
                            gap-3

                            rounded-xl

                            border

                            bg-[#F8FAFC]

                            px-4

                            transition-all

                            ${
                              errors.name
                                ? "border-red-500"
                                : "border-[#E5E7EB] focus-within:border-[#FA7000]"
                            }

                            focus-within:bg-white
                            focus-within:shadow-[0_0_0_4px_rgba(249,0,50,0.08)]
                          `}
                        >
                          <FaUser
                            className="
                              text-sm
                              text-[#F90032]
                            "
                          />

                          <input
                            type="text"
                            placeholder="Enter your full name"
                            {...register("name")}
                            className="
                              w-full

                              bg-transparent

                              py-3.5

                              text-sm

                              text-[#F90032]

                              outline-none

                              placeholder:text-[#4B5563]/70
                            "
                          />
                        </div>

                        {errors.name && (
                          <p
                            className="
                              ml-1
                              mt-1

                              text-xs
                              text-red-500
                            "
                          >
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* EMAIL + PHONE */}

                      <div className="grid gap-4 sm:grid-cols-2">
                        {/* EMAIL */}

                        <div>
                          <label
                            className="
                              mb-2
                              block

                              text-xs
                              font-bold

                              brand-gradient-text
                            "
                          >
                            Email Address *
                          </label>

                          <div
                            className={`
                              flex
                              items-center
                              gap-3

                              rounded-xl

                              border

                              bg-[#F8FAFC]

                              px-4

                              ${
                                errors.email
                                  ? "border-red-500"
                                  : "border-[#E5E7EB] focus-within:border-[#FA7000]"
                              }
                            `}
                          >
                            <FaEnvelope
                              className="
                                text-xs
                                text-[#F90032]
                              "
                            />

                            <input
                              type="email"
                              placeholder="Your email"
                              {...register("email")}
                              className="
                                min-w-0
                                w-full

                                bg-transparent

                                py-3.5

                                text-sm

                                text-[#F90032]

                                outline-none

                                placeholder:text-[#4B5563]/70
                              "
                            />
                          </div>

                          {errors.email && (
                            <p
                              className="
                                ml-1
                                mt-1

                                text-xs
                                text-red-500
                              "
                            >
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        {/* PHONE */}

                        <div>
                          <label
                            className="
                              mb-2
                              block

                              text-xs
                              font-bold

                              brand-gradient-text
                            "
                          >
                            Phone Number *
                          </label>

                          <div
                            className={`
                              flex
                              items-center
                              overflow-hidden

                              rounded-xl

                              border

                              bg-[#F8FAFC]

                              ${
                                errors.phone
                                  ? "border-red-500"
                                  : "border-[#E5E7EB] focus-within:border-[#FA7000]"
                              }
                            `}
                          >
                            <span
                              className="
                                border-r
                                border-[#E5E7EB]

                                px-3
                                py-3.5

                                text-xs
                                font-bold

                                text-[#F90032]
                              "
                            >
                              +91
                            </span>

                            <input
                              type="tel"
                              inputMode="numeric"
                              maxLength={10}
                              placeholder="9876543210"
                              {...register("phone", {
                                onChange: (event) => {
                                  event.target.value =
                                    event.target.value
                                      .replace(/\D/g, "")
                                      .slice(0, 10);
                                },
                              })}
                              className="
                                min-w-0
                                w-full

                                bg-transparent

                                px-3
                                py-3.5

                                text-sm

                                text-[#F90032]

                                outline-none

                                placeholder:text-[#4B5563]/70
                              "
                            />
                          </div>

                          {errors.phone && (
                            <p
                              className="
                                ml-1
                                mt-1

                                text-xs
                                text-red-500
                              "
                            >
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* PROPERTY + BUDGET */}

                      <div className="grid gap-4 sm:grid-cols-2">
                        {/* PROPERTY */}

                        <div>
                          <label
                            className="
                              mb-2
                              block

                              text-xs
                              font-bold

                              brand-gradient-text
                            "
                          >
                            Property *
                          </label>

                          <select
                            {...register("propertyType")}
                            className="
                              w-full

                              rounded-xl

                              border
                              border-[#E5E7EB]

                              bg-[#F8FAFC]

                              px-4
                              py-3.5

                              text-sm

                              text-[#F90032]

                              outline-none

                              focus:border-[#FA7000]
                            "
                          >
                            <option value="dholera-estates">
                              Dholera Estates
                            </option>
                          </select>
                        </div>

                        {/* BUDGET */}

                        <div>
                          <label
                            className="
                              mb-2
                              block

                              text-xs
                              font-bold

                              brand-gradient-text
                            "
                          >
                            Budget *
                          </label>

                          <select
                            {...register("budget")}
                            defaultValue=""
                            className={`
                              contact-budget-select
                              w-full

                              rounded-xl

                              border

                              bg-[#F8FAFC]

                              px-4
                              py-3.5

                              text-sm

                              text-[#F90032]

                              outline-none

                              ${
                                errors.budget
                                  ? "border-red-500"
                                  : "border-[#E5E7EB] focus:border-[#FA7000]"
                              }
                            `}
                          >
                            <option value="">
                              Select Budget
                            </option>

                            <option value="below-20-lakhs">
                              Below ₹20 Lakhs
                            </option>

                            <option value="20-50-lakhs">
                              ₹20 - ₹50 Lakhs
                            </option>

                            <option value="50-lakhs-1-crore">
                              ₹50 Lakhs - ₹1 Crore
                            </option>

                            <option value="above-1-crore">
                              Above ₹1 Crore
                            </option>
                          </select>

                          {errors.budget && (
                            <p
                              className="
                                ml-1
                                mt-1

                                text-xs
                                text-red-500
                              "
                            >
                              {errors.budget.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* MESSAGE */}

                      <div>
                        <label
                          className="
                            mb-2
                            block

                            text-xs
                            font-bold

                            brand-gradient-text
                          "
                        >
                          Message
                        </label>

                        <textarea
                          rows={5}
                          placeholder="Tell us what you are looking for..."
                          {...register("comments")}
                          className="
                            w-full
                            resize-none

                            rounded-xl

                            border
                            border-[#E5E7EB]

                            bg-[#F8FAFC]

                            px-4
                            py-3.5

                            text-sm

                            text-[#F90032]

                            outline-none

                            placeholder:text-[#4B5563]/70

                            focus:border-[#FA7000]
                            focus:bg-white
                          "
                        />

                        {errors.comments && (
                          <p
                            className="
                              ml-1
                              mt-1

                              text-xs
                              text-red-500
                            "
                          >
                            {errors.comments.message}
                          </p>
                        )}
                      </div>

                      {/* CONSENT */}

                      <div>
                        <label
                          className="
                            flex
                            cursor-pointer
                            items-start
                            gap-3

                            text-xs
                            leading-5

                            text-[#111111]
                          "
                        >
                          <input
                            type="checkbox"
                            {...register("consent")}
                            className="
                              mt-0.5

                              h-4
                              w-4
                              shrink-0

                              accent-[#F90032]
                            "
                          />

                          <span>
                            I agree to use my information for enquiry
                            and marketing communication.
                          </span>
                        </label>

                        {errors.consent && (
                          <p
                            className="
                              ml-7
                              mt-1

                              text-xs
                              text-red-500
                            "
                          >
                            {errors.consent.message}
                          </p>
                        )}
                      </div>

                      {/* SERVER ERROR */}

                      {serverError && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: -5,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          className="
                            rounded-xl

                            border
                            border-red-200

                            bg-red-50

                            px-4
                            py-3

                            text-sm
                            text-red-600
                          "
                        >
                          {serverError}
                        </motion.div>
                      )}

                      {/* SUBMIT */}

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={
                          !isSubmitting
                            ? {
                                y: -2,
                              }
                            : undefined
                        }
                        whileTap={
                          !isSubmitting
                            ? {
                                scale: 0.98,
                              }
                            : undefined
                        }
                        className="
                          group
                          brand-button
                          relative

                          flex
                          w-full
                          items-center
                          justify-center
                          gap-3

                          overflow-hidden

                          rounded-xl

                          bg-[#FA7000]

                          px-6
                          py-4

                          text-xs
                          font-extrabold
                          uppercase
                          tracking-widest

                          text-white

                          shadow-[0_4px_12px_rgba(17,17,17,0.08)]

                          transition-all
                          duration-300

                          hover:bg-[#F90032]
                          hover:shadow-[0_10px_28px_rgba(17,17,17,0.08)]

                          disabled:cursor-not-allowed
                          disabled:opacity-60

                          sm:w-auto
                          sm:min-w-52
                        "
                      >
                        {/* SHINE */}

                        <span
                          className="
                            absolute
                            -left-full
                            top-0

                            h-full
                            w-1/2

                            -skew-x-12

                            bg-linear-to-r
                            from-transparent
                            via-white/25
                            to-transparent

                            transition-all
                            duration-700

                            group-hover:left-[130%]
                          "
                        />

                        <span className="relative z-10">
                          {isSubmitting
                            ? "Submitting..."
                            : "Send Enquiry"}
                        </span>

                        {!isSubmitting && (
                          <FaArrowRight
                            className="
                              relative
                              z-10

                              transition-transform

                              group-hover:translate-x-1
                            "
                          />
                        )}
                      </motion.button>
                    </form>
                  </motion.div>
                ) : (
                  /* =================================================
                     SUCCESS SCREEN
                  ================================================= */

                  <motion.div
                    key="success"
                    initial={{
                      opacity: 0,
                      scale: 0.94,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.45,
                    }}
                    className="
                      flex
                      min-h-125
                      flex-col
                      items-center
                      justify-center

                      px-5

                      text-center
                    "
                  >
                    <motion.div
                      initial={{
                        scale: 0,
                      }}
                      animate={{
                        scale: 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 180,
                      }}
                      className="
                        flex
                        h-20
                        w-20
                        items-center
                        justify-center

                        rounded-full

                        bg-[#F90032]

                        text-white

                        shadow-[0_4px_12px_rgba(17,17,17,0.08)]
                      "
                    >
                      <FaCheckCircle size={34} />
                    </motion.div>

                    <p
                      className="
                        mt-6

                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.25em]

                        text-[#F90032]
                      "
                    >
                      Enquiry Submitted
                    </p>

                    <h3
                      className="
                        mt-2

                        text-3xl
                        font-black

                        text-[#F90032]
                      "
                    >
                      Thank You!
                    </h3>

                    <div
                      className="
                        mt-4

                        h-1
                        w-12

                        rounded-full

                        bg-[#F90032]
                      "
                    />

                    <p
                      className="
                        mt-5

                        max-w-sm

                        text-sm
                        leading-7

                        text-[#4B5563]
                      "
                    >
                      Your contact request has been submitted successfully.
                      Our property consultant will contact you shortly.
                    </p>

                    <motion.button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setServerError("");
                      }}
                      whileHover={{
                        y: -2,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      className="
                        brand-button
                        mt-7

                        rounded-xl

                        bg-[#FA7000]

                        px-6
                        py-3

                        text-xs
                        font-bold
                        uppercase
                        tracking-wider

                        text-white

                        transition-all
                        duration-300

                        hover:bg-[#F90032]
                      "
                    >
                      Send Another Enquiry
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <SideEnquiry />
    </div>
  );
}
