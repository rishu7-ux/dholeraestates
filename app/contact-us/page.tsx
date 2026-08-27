"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
    .min(1, "Please select property type"),

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
      propertyType: "",
      budget: "",
      comments: "",
      consent: false,
    },

    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  /* =========================================================
     SUBMIT → PAYLOAD CMS → MONGODB
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

          source: "contact-us-page",
          status: "new",
        }),
      });

      const result = await response.json();

      console.log("Contact API Response:", result);

      if (!response.ok) {
        throw new Error(
          result.message ||
            result.errors?.[0]?.message ||
            "Failed to submit contact form"
        );
      }

      console.log(
        "✅ Contact saved successfully in Payload + MongoDB"
      );

      reset();

      setSubmitted(true);
    } catch (error) {
      console.error(
        "❌ Contact submit error:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setServerError(message);
    }
  };

  return (
    <><Header />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#111111] to-[#103f80]">
        <div className="pointer-events-none absolute -left-[120px] -top-[160px] h-[500px] w-[310px] rotate-[32deg] bg-white/10" />
        <div className="pointer-events-none absolute left-[28%] top-[-210px] h-[620px] w-[300px] rotate-[38deg] bg-[#88a9cc]/20" />
        <div className="pointer-events-none absolute left-[44%] -top-[190px] h-[560px] w-[250px] -rotate-[38deg] bg-white/8" />
        <div className="pointer-events-none absolute right-[8%] -top-[190px] h-[560px] w-[290px] rotate-[12deg] bg-[#88a9cc]/25" />
        <div className="pointer-events-none absolute right-[18%] -top-[100px] h-[330px] w-[240px] rotate-[45deg] bg-white/7" />
        <div className="pointer-events-none absolute -bottom-[180px] right-[-80px] h-[340px] w-[520px] rotate-[12deg] bg-[#4777ae]/25" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-4xl"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="h-0.5 w-10 bg-white" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/90 sm:text-xs">
                Contact Our Team
              </span>
            </div>

            <h1 className="text-[32px] font-black leading-[1.1] text-white sm:text-4xl md:text-5xl lg:text-[54px]">
              Let&apos;s Talk About Your{" "}
              <span className="text-[#b9cde2]">
                Dholera Investment
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-[14px] leading-7 text-white/90 sm:text-[15px] md:text-base">
              Connect with our property team for project details,
              availability, pricing, documentation and Dholera investment
              guidance.
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
          bg-[#f8f7f3]
          py-14
          sm:py-20
          lg:py-24
        "
      >
        {/* BACKGROUND */}

        <div
          className="
            pointer-events-none
            absolute
            -left-40
            top-20
            h-96
            w-96
            rounded-full
            bg-[#2f65a7]/8
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
            bg-[#4777ae]/8
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
              SECTION HEADING
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
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
              mx-auto
              mb-10
              max-w-2xl
              text-center
              lg:mb-14
            "
          >
            <p
              className="
                text-xs
                font-extrabold
                uppercase
                tracking-[0.25em]
                text-[#2f65a7]
              "
            >
              Get In Touch
            </p>

            <h2
              className="
                mt-3
                text-3xl
                font-black
                leading-tight
                text-[#1f2937]
                sm:text-4xl
                lg:text-5xl
              "
            >
              Find The Right Property
              <br className="hidden sm:block" />
              For Your Investment
            </h2>

            <p
              className="
                mx-auto
                mt-4
                max-w-xl
                text-sm
                leading-7
                text-[#64748b]
              "
            >
              Tell us your requirement and our team
              will help you explore the right Dholera
              property.
            </p>

            <div
              className="
                mx-auto
                mt-5
                h-1
                w-16
                rounded-full
                bg-[#2f65a7]
              "
            />
          </motion.div>

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
                mobile-contact-card
                relative
                overflow-hidden
                rounded-[30px]
                bg-linear-to-br
                from-[#2f65a7]
                to-[#173f6d]
                p-7
                text-white
                shadow-[0_25px_70px_rgba(255,122,0,0.20)]
                sm:p-9
                lg:p-10
              "
            >
              {/* DECORATION */}

              <div
                className="
                  absolute
                  -right-20
                  -top-20
                  h-60
                  w-60
                  rounded-full
                  border-40
                  border-white/10
                "
              />

              <div
                className="
                  absolute
                  -bottom-24
                  -left-24
                  h-64
                  w-64
                  rounded-full
                  bg-white/5
                "
              />

              <div className="relative">
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-white/75
                  "
                >
                  Contact Information
                </p>

                <h3
                  className="
                    mt-3
                    text-2xl
                    font-black
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
                    text-white/80
                  "
                >
                  Get clear information about property
                  selection, investment, pricing and
                  site visits.
                </p>

                {/* DETAILS */}

                <div className="mt-9 space-y-6">
                  {/* ADDRESS */}

                  <motion.div
                    whileHover={{
                      x: 4,
                    }}
                    className="flex items-start gap-4"
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
                        text-[#2f65a7]
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
                        "
                      >
                        Office Address
                      </p>

                      <p
                        className="
                          mt-2
                          text-xs
                          leading-6
                          text-white/80
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
                    className="flex items-center gap-4"
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
                        text-[#2f65a7]
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
                        "
                      >
                        Phone Number
                      </p>

                      <p
                        className="
                          mt-1
                          text-sm
                          font-semibold
                          text-white/85
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
                    className="flex items-center gap-4"
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
                        text-[#2f65a7]
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
                          text-white/85
                        "
                      >
                        customercare@omanaprojects.com
                      </p>
                    </div>
                  </motion.a>
                </div>

                <div className="my-8 h-px bg-white/20" />

                {/* WHATSAPP */}

                <a
                  href="https://wa.me/919217104219?text=Hello%20Dholera%20Estates%2C%20I%20would%20like%20to%20know%20more%20about%20your%20residential%20plots."
                  aria-label="Chat with the Dholera Estates team on WhatsApp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    contact-whatsapp
                    group
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-2xl
                    bg-[#25D366]
                    px-5
                    py-4
                    text-sm
                    font-bold
                    text-white
                    shadow-lg
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-[#1EBE5D]
                    hover:text-white
                  "
                >
                  <FaWhatsapp className="shrink-0 text-xl text-white" />

                  <span className="whitespace-nowrap text-white">
                    Chat With Our Team
                  </span>

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
                border-[#dbe3ec]
                bg-white
                p-5
                shadow-[0_25px_70px_rgba(255,122,0,0.08)]
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
                  from-[#2f65a7]
                  via-[#88a9cc]
                  to-[#2f65a7]
                "
              />

              <AnimatePresence mode="wait">
                {!submitted ? (
                  /* =================================================
                     FORM SCREEN
                  ================================================= */

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
                          text-[#2f65a7]
                        "
                      >
                        Quick Enquiry
                      </p>

                      <h3
                        className="
                          mt-2
                          text-2xl
                          font-black
                          text-[#1f2937]
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
                          text-[#64748b]
                          sm:text-sm
                        "
                      >
                        Fill in the details and our
                        property consultant will contact
                        you shortly.
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
                            text-[#1f2937]
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
                            bg-[#ffffff]
                            px-4
                            transition-all

                            ${
                              errors.name
                                ? "border-red-500"
                                : "border-[#dbe3ec] focus-within:border-[#2f65a7]"
                            }

                            focus-within:bg-white
                            focus-within:shadow-[0_0_0_4px_rgba(255,122,0,0.06)]
                          `}
                        >
                          <FaUser
                            className="
                              text-sm
                              text-[#2f65a7]
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
                              text-[#1f2937]
                              outline-none
                              placeholder:text-[#94a3b8]
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
                              text-[#1f2937]
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
                              bg-[#ffffff]
                              px-4

                              ${
                                errors.email
                                  ? "border-red-500"
                                  : "border-[#dbe3ec] focus-within:border-[#2f65a7]"
                              }
                            `}
                          >
                            <FaEnvelope className="text-xs text-[#2f65a7]" />

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
                                text-[#1f2937]
                                outline-none
                                placeholder:text-[#94a3b8]
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
                              text-[#1f2937]
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
                              bg-[#ffffff]

                              ${
                                errors.phone
                                  ? "border-red-500"
                                  : "border-[#dbe3ec] focus-within:border-[#2f65a7]"
                              }
                            `}
                          >
                            <span
                              className="
                                border-r
                                border-[#dbe3ec]
                                px-3
                                py-3.5
                                text-xs
                                font-bold
                                text-[#2f65a7]
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
                                text-[#1f2937]
                                outline-none
                                placeholder:text-[#94a3b8]
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
                              text-[#1f2937]
                            "
                          >
                            Property Type *
                          </label>

                          <select
                            {...register("propertyType")}
                            defaultValue=""
                            className={`
                              w-full
                              rounded-xl
                              border
                              bg-[#ffffff]
                              px-4
                              py-3.5
                              text-sm
                              text-[#1f2937]
                              outline-none

                              ${
                                errors.propertyType
                                  ? "border-red-500"
                                  : "border-[#dbe3ec] focus:border-[#2f65a7]"
                              }
                            `}
                          >
                            <option value="">
                              Select Property Type
                            </option>

                            <option value="dholera-estates">
                              Dholera Estates Residential Plot
                            </option>
                          </select>

                          {errors.propertyType && (
                            <p
                              className="
                                ml-1
                                mt-1
                                text-xs
                                text-red-500
                              "
                            >
                              {errors.propertyType.message}
                            </p>
                          )}
                        </div>

                        {/* BUDGET */}

                        <div>
                          <label
                            className="
                              mb-2
                              block
                              text-xs
                              font-bold
                              text-[#1f2937]
                            "
                          >
                            Budget *
                          </label>

                          <select
                            {...register("budget")}
                            defaultValue=""
                            className={`
                              w-full
                              rounded-xl
                              border
                              bg-[#ffffff]
                              px-4
                              py-3.5
                              text-sm
                              text-[#1f2937]
                              outline-none

                              ${
                                errors.budget
                                  ? "border-red-500"
                                  : "border-[#dbe3ec] focus:border-[#2f65a7]"
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
                            text-[#1f2937]
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
                            border-[#dbe3ec]
                            bg-[#ffffff]
                            px-4
                            py-3.5
                            text-sm
                            text-[#1f2937]
                            outline-none
                            placeholder:text-[#94a3b8]
                            focus:border-[#2f65a7]
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
                            text-[#64748b]
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
                              accent-[#2f65a7]
                            "
                          />

                          <span>
                            I agree to use my information
                            for enquiry and marketing
                            communication.
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
                                scale: 1.01,
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
                          relative
                          flex
                          w-full
                          items-center
                          justify-center
                          gap-3
                          overflow-hidden
                          rounded-xl
                          bg-[#2f65a7]
                          px-6
                          py-4
                          text-xs
                          font-extrabold
                          uppercase
                          tracking-widest
                          text-white
                          shadow-[0_12px_30px_rgba(255,122,0,0.25)]
                          transition-all
                          duration-300
                          hover:bg-[#4777ae]
                          hover:shadow-[0_16px_36px_rgba(255,122,0,0.32)]
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
                        bg-[#2f65a7]
                        text-white
                        shadow-[0_15px_35px_rgba(255,122,0,0.30)]
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
                        text-[#2f65a7]
                      "
                    >
                      Enquiry Submitted
                    </p>

                    <h3
                      className="
                        mt-2
                        text-3xl
                        font-black
                        text-[#1f2937]
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
                        bg-[#2f65a7]
                      "
                    />

                    <p
                      className="
                        mt-5
                        max-w-sm
                        text-sm
                        leading-7
                        text-[#64748b]
                      "
                    >
                      Your contact request has been
                      submitted successfully. Our
                      property consultant will contact
                      you shortly.
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
                        mt-7
                        rounded-xl
                        bg-[#2f65a7]
                        px-6
                        py-3
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-white
                        transition-all
                        duration-300
                        hover:bg-[#4777ae]
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
    </>
  );
}
