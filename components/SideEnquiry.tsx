"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaArrowRight,
  FaCheck,
  FaEnvelope,
  FaPhoneAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* =========================================================
   VALIDATION
========================================================= */

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(3, "Please enter your full name"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number"),
});

type FormData = z.infer<typeof formSchema>;

/* =========================================================
   COMPONENT
========================================================= */

export default function SideEnquiry() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },

    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  /* =========================================================
     OPEN
  ========================================================= */

  const handleOpen = () => {
    setSubmitted(false);
    setServerError("");
    setOpen(true);
  };

  /* =========================================================
     CLOSE
  ========================================================= */

  const handleClose = () => {
    setOpen(false);

    setTimeout(() => {
      setSubmitted(false);
      setServerError("");
      reset();
    }, 300);
  };

  /* =========================================================
     SUBMIT → API → MONGODB
  ========================================================= */

  const onSubmit = async (data: FormData) => {
    try {
      setServerError("");

      const response = await fetch("/api/enquiries", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,

          property: "Dholera Estates",

          message: "",

          source: "dholeraestates-side-enquiry-form",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to submit enquiry"
        );
      }

      reset();
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
    <>
      {/* =====================================================
          RIGHT SIDE ENQUIRE BUTTON
      ===================================================== */}

      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            onClick={handleOpen}
            initial={{
              x: 45,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: 45,
              opacity: 0,
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              x: -2,
              y: -2,
            }}
            whileTap={{
              y: 0,
            }}
            className="
              fixed
              enquiry-premium
              max-[539px]:hidden
              right-0
              top-1/2
              z-9990

              flex
              h-36
              w-10
              -translate-y-1/2
              items-center
              justify-center

              overflow-hidden

              rounded-l-xl
              bg-[linear-gradient(180deg,#ff7914_0%,#f90032_40%,#960aaa_72%,#0082fa_100%)]

              text-white

              shadow-[-2px_2px_8px_rgba(17,17,17,0.12)]

              transition-all
              duration-200

              hover:brightness-110
              hover:shadow-[-6px_8px_24px_rgba(249,0,50,0.32)]

              sm:h-40
              sm:w-10
            "
          >
            {/* BUTTON LIGHT EFFECT */}

            <span
              className="
                pointer-events-none
                absolute
                inset-0

                bg-linear-to-b
                from-white/15
                via-transparent
                to-[#F90032]/10
              "
            />

            <span
              className="
                relative
                z-10
                rotate-180
                whitespace-nowrap

                text-[10px]
                font-bold
                tracking-[0.07em]

                [writing-mode:vertical-rl]

                sm:text-[11px]
              "
            >
              Enquire Now
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* =====================================================
          FORM OPEN
      ===================================================== */}

      <AnimatePresence>
        {open && (
          <>
            {/* =================================================
                OVERLAY
            ================================================= */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.25,
              }}
              onClick={handleClose}
              className="
                fixed
                enquiry-premium
                inset-0
                z-[9997]

                bg-[#111111]/70
                backdrop-blur-[2px]
              "
            />

            {/* =================================================
                SLIDER
            ================================================= */}

            <motion.div
              initial={{
                x: "100%",
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: "100%",
                opacity: 0,
              }}
              transition={{
                x: {
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                },

                opacity: {
                  duration: 0.3,
                },
              }}
              className="
                fixed
                right-0
                top-1/2
                z-[9998]

                w-[88%]
                max-w-[340px]
                -translate-y-1/2

                overflow-hidden

                rounded-l-[20px]
                rounded-r-none

                border-y
                border-l
                border-[#E5E7EB]

                bg-[#F8FAFC]

                shadow-[-15px_15px_45px_rgba(249,0,50,0.22)]

                sm:max-w-[365px]
                sm:rounded-l-3xl
              "
            >
              {/* =================================================
                  SOFT BLUE GLOW
              ================================================= */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-16
                  -top-16

                  h-40
                  w-40

                  rounded-full

                  bg-transparent

                  blur-3xl
                "
              />

              {/* =================================================
                  CLOSE
              ================================================= */}

              <motion.button
                type="button"
                onClick={handleClose}
                whileHover={{
                  rotate: 90,
                  y: -2,
                }}
                whileTap={{
                  y: 0,
                }}
                aria-label="Close enquiry"
                className="
                  absolute
                  right-3
                  top-3
                  z-30

                  flex
                  h-7
                  w-7
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-[#E5E7EB]

                  bg-white

                  text-[#FA7000]

                  shadow-sm

                  transition-all
                  duration-300

                  hover:border-[#F90032]
                  hover:bg-[#F90032]
                  hover:text-white

                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-[#F90032]/45

                  sm:h-8
                  sm:w-8
                "
              >
                <FaTimes size={12} />
              </motion.button>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  /* =================================================
                     FORM
                  ================================================= */

                  <motion.div
                    key="enquiry-form"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -15,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                  >
                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <div
                      className="
                        relative

                        border-b
                        border-[#E5E7EB]

                        bg-linear-to-b
                        from-[#F8FAFC]
                        to-[#F8FAFC]

                        px-4
                        pb-3
                        pt-4

                        text-center

                        sm:px-5
                        sm:pb-4
                        sm:pt-5
                      "
                    >
                      {/* LIGHT BLUE GLOW */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          left-1/2
                          top-0

                          h-20
                          w-32

                          -translate-x-1/2

                          rounded-full

                          bg-[#F8FAFC]

                          blur-2xl
                        "
                      />

                      <motion.p
                        initial={{
                          opacity: 0,
                          y: 5,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: 0.15,
                        }}
                        className="
                          relative
                          z-10

                          mx-auto

                          text-[8px]
                          font-bold
                          uppercase
                          tracking-[0.2em]

                          text-[#F90032]

                          sm:text-[9px]
                        "
                      >
                        Property Enquiry
                      </motion.p>

                      <motion.h2
                        initial={{
                          opacity: 0,
                          y: 8,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: 0.2,
                        }}
                        className="
                          relative
                          z-10

                          mt-1

                          text-[19px]
                          font-extrabold

                          text-[#F90032]

                          sm:text-[22px]
                        "
                      >
                        Enquire Now
                      </motion.h2>

                      <motion.div
                        initial={{
                          width: 0,
                        }}
                        animate={{
                          width: 36,
                        }}
                        transition={{
                          delay: 0.25,
                          duration: 0.4,
                        }}
                        className="
                          relative
                          z-10

                          mx-auto
                          mt-2

                          h-[3px]

                          rounded-full

                          bg-[#F90032]
                        "
                      />

                      <motion.p
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        transition={{
                          delay: 0.28,
                        }}
                        className="
                          relative
                          z-10

                          mx-auto
                          mt-2
                          max-w-[260px]

                          text-[10px]
                          leading-4
                          text-[#111111]

                          sm:text-[11px]
                          sm:leading-5
                        "
                      >
                        Share your details and our property
                        consultant will contact you shortly.
                      </motion.p>
                    </div>

                    {/* =================================================
                        FORM BODY
                    ================================================= */}

                    <div
                      className="
                        relative
                        bg-linear-to-b
                        from-[#F8FAFC]
                        to-[#F8FAFC]

                        px-4
                        py-4

                        sm:px-5
                        sm:py-5
                      "
                    >
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        className="space-y-2.5"
                      >
                        {/* =================================================
                            NAME
                        ================================================= */}

                        <div>
                          <label
                            htmlFor="side-name"
                            className="
                              mb-1
                              block

                              text-[10px]
                              font-semibold

                              text-[#F90032]
                            "
                          >
                            Name
                          </label>

                          <div
                            className={`
                              flex
                              items-center
                              gap-2.5

                              rounded-lg
                              border

                              bg-white

                              px-3

                              transition-all
                              duration-300

                              ${
                                errors.name
                                  ? "border-red-500 bg-red-50/20"
                                  : "border-[#E5E7EB] focus-within:border-[#FA7000]"
                              }

                              focus-within:shadow-[0_1px_3px_rgba(17,17,17,0.08)]
                            `}
                          >
                            <FaUser
                              className={
                                errors.name
                                  ? "text-xs text-red-500"
                                  : "text-xs text-[#F90032]"
                              }
                            />

                            <input
                              id="side-name"
                              type="text"
                              placeholder="Your Name*"
                              {...register("name")}
                              className="
                                w-full

                                bg-transparent

                                py-2.5

                                text-[12px]
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
                                text-[9px]
                                text-red-500
                              "
                            >
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        {/* =================================================
                            EMAIL
                        ================================================= */}

                        <div>
                          <label
                            htmlFor="side-email"
                            className="
                              mb-1
                              block

                              text-[10px]
                              font-semibold

                              text-[#F90032]
                            "
                          >
                            Email
                          </label>

                          <div
                            className={`
                              flex
                              items-center
                              gap-2.5

                              rounded-lg
                              border

                              bg-white

                              px-3

                              transition-all
                              duration-300

                              ${
                                errors.email
                                  ? "border-red-500 bg-red-50/20"
                                  : "border-[#E5E7EB] focus-within:border-[#FA7000]"
                              }

                              focus-within:shadow-[0_1px_3px_rgba(17,17,17,0.08)]
                            `}
                          >
                            <FaEnvelope
                              className={
                                errors.email
                                  ? "text-xs text-red-500"
                                  : "text-xs text-[#F90032]"
                              }
                            />

                            <input
                              id="side-email"
                              type="email"
                              placeholder="Your Email*"
                              {...register("email")}
                              className="
                                w-full

                                bg-transparent

                                py-2.5

                                text-[12px]
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
                                text-[9px]
                                text-red-500
                              "
                            >
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        {/* =================================================
                            PHONE
                        ================================================= */}

                        <div>
                          <label
                            htmlFor="side-phone"
                            className="
                              mb-1
                              block

                              text-[10px]
                              font-semibold

                              text-[#F90032]
                            "
                          >
                            Phone
                          </label>

                          <div
                            className={`
                              flex
                              items-center
                              gap-2.5

                              rounded-lg
                              border

                              bg-white

                              px-3

                              transition-all
                              duration-300

                              ${
                                errors.phone
                                  ? "border-red-500 bg-red-50/20"
                                  : "border-[#E5E7EB] focus-within:border-[#FA7000]"
                              }

                              focus-within:shadow-[0_1px_3px_rgba(17,17,17,0.08)]
                            `}
                          >
                            <FaPhoneAlt
                              className={
                                errors.phone
                                  ? "text-xs text-red-500"
                                  : "text-xs text-[#F90032]"
                              }
                            />

                            <input
                              id="side-phone"
                              type="tel"
                              inputMode="numeric"
                              maxLength={10}
                              placeholder="Your Phone*"
                              {...register("phone", {
                                onChange: (e) => {
                                  const numbersOnly =
                                    e.target.value
                                      .replace(/\D/g, "")
                                      .slice(0, 10);

                                  setValue(
                                    "phone",
                                    numbersOnly,
                                    {
                                      shouldValidate: true,
                                      shouldDirty: true,
                                    }
                                  );
                                },
                              })}
                              className="
                                w-full

                                bg-transparent

                                py-2.5

                                text-[12px]
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
                                text-[9px]
                                text-red-500
                              "
                            >
                              {errors.phone.message}
                            </p>
                          )}
                        </div>

                        {/* =================================================
                            SERVER ERROR
                        ================================================= */}

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
                              rounded-lg
                              border
                              border-red-200

                              bg-red-50

                              px-3
                              py-2

                              text-center
                              text-[10px]
                              font-medium
                              text-red-600
                            "
                          >
                            {serverError}
                          </motion.div>
                        )}

                        {/* =================================================
                            SUBMIT
                        ================================================= */}

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

                            mt-1

                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2

                            overflow-hidden

                            rounded-lg

                            bg-[#FA7000]

                            px-4
                            py-2.5

                            text-[11px]
                            font-bold
                            uppercase
                            tracking-[0.07em]
                            text-white

                            shadow-[0_1px_3px_rgba(17,17,17,0.08)]

                            transition-all
                            duration-300

                            hover:bg-[#F90032]
                            hover:shadow-[0_4px_12px_rgba(17,17,17,0.08)]

                            disabled:cursor-not-allowed
                            disabled:opacity-60
                          "
                        >
                          {!isSubmitting && (
                            <span
                              className="
                                absolute
                                -left-full
                                top-0

                                h-full
                                w-1/2

                                skew-x-[-25deg]

                                bg-gradient-to-r
                                from-transparent
                                via-white/25
                                to-transparent

                                transition-all
                                duration-700

                                group-hover:left-[130%]
                              "
                            />
                          )}

                          <span className="relative z-10">
                            {isSubmitting
                              ? "Submitting..."
                              : "Submit Enquiry"}
                          </span>

                          {!isSubmitting && (
                            <FaArrowRight
                              className="
                                relative
                                z-10

                                text-[9px]

                                transition-transform
                                duration-300

                                group-hover:translate-x-1
                              "
                            />
                          )}
                        </motion.button>
                      </form>

                      {/* =================================================
                          QUICK CALL
                      ================================================= */}

                      <div
                        className="
                          mt-3

                          pt-2.5

                          text-center
                        "
                      >
                        <p className="text-[9px] text-[#4B5563]">
                          Need quick assistance?
                        </p>

                        <a
                          href="tel:+919217104219"
                          className="
                            mt-1

                            inline-flex
                            items-center
                            gap-1.5

                            text-[12px]
                            font-bold

                            text-[#FA7000]

                            transition-all
                            duration-300

                            hover:text-[#F90032]
                          "
                        >
                          <FaPhoneAlt className="text-[9px]" />
                          +91 92171 04219
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* =================================================
                     THANK YOU
                  ================================================= */

                  <motion.div
                    key="thank-you"
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.95,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                      relative

                      flex
                      min-h-[400px]
                      flex-col
                      items-center
                      justify-center

                      overflow-hidden

                      bg-white

                      px-6
                      py-10

                      text-center
                    "
                  >
                    {/* SUCCESS BACKGROUND GLOW */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-10

                        h-40
                        w-40

                        -translate-x-1/2

                        rounded-full

                        bg-[#F8FAFC]

                        blur-3xl
                      "
                    />

                    {/* SUCCESS ICON */}

                    <motion.div
                      initial={{
                        scale: 0,
                        rotate: -30,
                      }}
                      animate={{
                        scale: 1,
                        rotate: 0,
                      }}
                      transition={{
                        delay: 0.12,
                        type: "spring",
                        stiffness: 190,
                        damping: 13,
                      }}
                      className="
                        relative
                        z-10

                        flex
                        h-16
                        w-16
                        items-center
                        justify-center

                        rounded-full

                        bg-[#FA7000]

                        text-white

                        shadow-[0_4px_12px_rgba(17,17,17,0.08)]
                      "
                    >
                      <FaCheck size={24} />

                      <motion.span
                        initial={{
                          scale: 1,
                          opacity: 0.5,
                        }}
                        animate={{
                          scale: 1.45,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                        }}
                        className="
                          absolute
                          inset-0

                          rounded-full

                          border-2
                          border-[#F90032]
                        "
                      />
                    </motion.div>

                    <motion.p
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.25,
                      }}
                      className="
                        relative
                        z-10

                        mt-5

                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.22em]

                        text-[#F90032]
                      "
                    >
                      Enquiry Submitted
                    </motion.p>

                    <motion.h2
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.3,
                      }}
                      className="
                        relative
                        z-10

                        mt-1

                        text-[25px]
                        font-extrabold

                        text-[#F90032]
                      "
                    >
                      Thank You!
                    </motion.h2>

                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: 42,
                      }}
                      transition={{
                        delay: 0.35,
                        duration: 0.45,
                      }}
                      className="
                        relative
                        z-10

                        mt-2

                        h-[3px]

                        rounded-full

                        bg-[#F90032]
                      "
                    />

                    <motion.p
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.4,
                      }}
                      className="
                        relative
                        z-10

                        mt-4
                        max-w-[270px]

                        text-[12px]
                        leading-5

                        text-[#111111]
                      "
                    >
                      Your enquiry has been submitted successfully.
                      Our property consultant will contact you
                      shortly.
                    </motion.p>

                    {/* DONE BUTTON */}

                    <motion.button
                      type="button"
                      onClick={handleClose}
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.48,
                      }}
                      whileHover={{
                        y: -2,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      className="
                        group
                        brand-button
                        relative
                        z-10

                        mt-6

                        flex
                        min-w-[140px]
                        items-center
                        justify-center
                        gap-2

                        overflow-hidden

                        rounded-lg

                        bg-[#FA7000]

                        px-7
                        py-2.5

                        text-[11px]
                        font-bold
                        uppercase
                        tracking-[0.08em]

                        text-white

                        shadow-[0_1px_3px_rgba(17,17,17,0.08)]

                        transition-all
                        duration-300

                        hover:bg-[#F90032]
                        hover:shadow-[0_4px_12px_rgba(17,17,17,0.08)]
                      "
                    >
                      <span
                        className="
                          absolute
                          -left-full
                          top-0

                          h-full
                          w-1/2

                          skew-x-[-25deg]

                          bg-gradient-to-r
                          from-transparent
                          via-white/25
                          to-transparent

                          transition-all
                          duration-700

                          group-hover:left-[130%]
                        "
                      />

                      <span className="relative z-10">
                        Done
                      </span>

                      <FaArrowRight
                        className="
                          relative
                          z-10

                          text-[9px]

                          transition-transform
                          duration-300

                          group-hover:translate-x-1
                        "
                      />
                    </motion.button>

                    {/* IMMEDIATE ASSISTANCE */}

                    <motion.div
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      transition={{
                        delay: 0.55,
                      }}
                      className="
                        relative
                        z-10

                        mt-6

                        w-full

                        border-t
                        border-[#E5E7EB]

                        pt-4
                      "
                    >
                      <p className="text-[9px] text-[#4B5563]">
                        Need immediate assistance?
                      </p>

                      <a
                        href="tel:+919217104219"
                        className="
                          mt-1

                          inline-flex
                          items-center
                          gap-1.5

                          text-[12px]
                          font-bold

                          text-[#FA7000]

                          transition-all
                          duration-300

                          hover:text-[#F90032]
                        "
                      >
                        <FaPhoneAlt className="text-[9px]" />
                        +91 92171 04219
                      </a>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
