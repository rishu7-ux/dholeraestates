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
    .regex(
      /^[0-9]{10}$/,
      "Enter a valid 10-digit mobile number"
    ),
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
    formState: {
      errors,
      isSubmitting,
    },
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

      console.log("Submitting enquiry:", data);

      const response = await fetch("/api/enquiries", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,

          // matches models/Enquiry.ts
          property: "Dholera Estates",

          // current form does not have message field
          message: "",
        }),
      });

      const result = await response.json();

      console.log("API response:", result);

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to submit enquiry"
        );
      }

      console.log(
        "✅ Enquiry successfully saved in MongoDB"
      );

      reset();

      // Show existing thank-you screen
      setSubmitted(true);
    } catch (error) {
      console.error("❌ Enquiry error:", error);

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
              x: -4,
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="
              fixed
              right-0
              top-1/2
              z-9990
              flex
              h-24.5
              w-8.5
              -translate-y-1/2
              items-center
              justify-center
              overflow-hidden
              rounded-l-lg
              border-y
              border-l
              border-[#2f65a7]/25
              bg-[#2f65a7]
              text-white
              shadow-[-4px_6px_18px_rgba(255,122,0,0.20)]
              transition-all
              duration-300
              hover:bg-[#4777ae]
              sm:h-27.5
              sm:w-9.5
            "
          >
            <span
              className="
                pointer-events-none
                absolute
                inset-0
                bg-linear-to-b
                from-white/15
                via-transparent
                to-white/5
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
            {/* OVERLAY */}

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
                inset-0
                z-9997
                bg-[#103f80]/35
                backdrop-blur-[2px]
              "
            />

            {/* SLIDER */}

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
                z-9998
                w-[88%]
                max-w-85
                -translate-y-1/2
                overflow-hidden
                rounded-l-[20px]
                rounded-r-none
                border-y
                border-l
                border-[#2f65a7]/20
                bg-[#ffffff]
                shadow-[-15px_15px_45px_rgba(8,26,58,0.25)]
                sm:max-w-91.25
                sm:rounded-l-3xl
              "
            >
              {/* CLOSE */}

              <motion.button
                type="button"
                onClick={handleClose}
                whileHover={{
                  rotate: 90,
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.9,
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
                  border-[#2f65a7]/20
                  bg-white
                  text-[#103f80]
                  shadow-sm
                  transition-all
                  duration-300
                  hover:border-[#2f65a7]
                  hover:bg-[#2f65a7]
                  hover:text-white
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
                    {/* HEADER */}

                    <div
                      className="
                        relative
                        border-b
                        border-[#2f65a7]/15
                        bg-[#f1f5f9]
                        px-4
                        pb-3
                        pt-4
                        text-center
                        sm:px-5
                        sm:pb-4
                        sm:pt-5
                      "
                    >
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
                          mx-auto
                          text-[8px]
                          font-bold
                          uppercase
                          tracking-[0.2em]
                          text-[#2f65a7]
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
                          mt-1
                          text-[19px]
                          font-extrabold
                          text-[#103f80]
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
                          mx-auto
                          mt-2
                          h-0.75
                          rounded-full
                          bg-[#2f65a7]
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
                          mx-auto
                          mt-2
                          max-w-65
                          text-[10px]
                          leading-4
                          text-gray-500
                          sm:text-[11px]
                          sm:leading-5
                        "
                      >
                        Share your details and our property
                        consultant will contact you shortly.
                      </motion.p>
                    </div>

                    {/* FORM BODY */}

                    <div
                      className="
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
                        {/* NAME */}

                        <div>
                          <label
                            htmlFor="side-name"
                            className="
                              mb-1
                              block
                              text-[10px]
                              font-semibold
                              text-[#103f80]
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
                                  ? "border-red-500"
                                  : "border-[#2f65a7]/20 focus-within:border-[#2f65a7]"
                              }

                              focus-within:shadow-[0_5px_15px_rgba(255,122,0,0.08)]
                            `}
                          >
                            <FaUser
                              className={
                                errors.name
                                  ? "text-xs text-red-500"
                                  : "text-xs text-[#2f65a7]"
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
                                text-[#103f80]
                                outline-none
                                placeholder:text-gray-400
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

                        {/* EMAIL */}

                        <div>
                          <label
                            htmlFor="side-email"
                            className="
                              mb-1
                              block
                              text-[10px]
                              font-semibold
                              text-[#103f80]
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
                                  ? "border-red-500"
                                  : "border-[#2f65a7]/20 focus-within:border-[#2f65a7]"
                              }

                              focus-within:shadow-[0_5px_15px_rgba(255,122,0,0.08)]
                            `}
                          >
                            <FaEnvelope
                              className={
                                errors.email
                                  ? "text-xs text-red-500"
                                  : "text-xs text-[#2f65a7]"
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
                                text-[#103f80]
                                outline-none
                                placeholder:text-gray-400
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

                        {/* PHONE */}

                        <div>
                          <label
                            htmlFor="side-phone"
                            className="
                              mb-1
                              block
                              text-[10px]
                              font-semibold
                              text-[#103f80]
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
                                  ? "border-red-500"
                                  : "border-[#2f65a7]/20 focus-within:border-[#2f65a7]"
                              }

                              focus-within:shadow-[0_5px_15px_rgba(255,122,0,0.08)]
                            `}
                          >
                            <FaPhoneAlt
                              className={
                                errors.phone
                                  ? "text-xs text-red-500"
                                  : "text-xs text-[#2f65a7]"
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
                                text-[#103f80]
                                outline-none
                                placeholder:text-gray-400
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
                            mt-1
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            overflow-hidden
                            rounded-lg
                            bg-[#2f65a7]
                            px-4
                            py-2.5
                            text-[11px]
                            font-bold
                            uppercase
                            tracking-[0.07em]
                            text-white
                            shadow-[0_7px_18px_rgba(255,122,0,0.22)]
                            transition-all
                            duration-300
                            hover:bg-[#4777ae]
                            hover:shadow-[0_10px_24px_rgba(255,122,0,0.28)]
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
                                bg-linear-to-r
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

                      {/* QUICK CALL */}

                      <div
                        className="
                          mt-3
                          border-t
                          border-[#2f65a7]/15
                          pt-2.5
                          text-center
                        "
                      >
                        <p className="text-[9px] text-gray-500">
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
                            text-[#103f80]
                            transition-all
                            duration-300
                            hover:text-[#2f65a7]
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
                      flex
                      min-h-100
                      flex-col
                      items-center
                      justify-center
                      bg-[#ffffff]
                      px-6
                      py-10
                      text-center
                    "
                  >
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
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-full
                        bg-[#2f65a7]
                        text-white
                        shadow-[0_10px_30px_rgba(255,122,0,0.30)]
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
                          border-[#2f65a7]
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
                        mt-5
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.22em]
                        text-[#2f65a7]
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
                        mt-1
                        text-[25px]
                        font-extrabold
                        text-[#103f80]
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
                        mt-2
                        h-0.75
                        rounded-full
                        bg-[#2f65a7]
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
                        mt-4
                        max-w-67.5
                        text-[12px]
                        leading-5
                        text-gray-500
                      "
                    >
                      Your enquiry has been submitted
                      successfully. Our property consultant
                      will contact you shortly.
                    </motion.p>

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
                        scale: 1.02,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      className="
                        group
                        relative
                        mt-6
                        flex
                        min-w-35
                        items-center
                        justify-center
                        gap-2
                        overflow-hidden
                        rounded-lg
                        bg-[#2f65a7]
                        px-7
                        py-2.5
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-[0.08em]
                        text-white
                        shadow-[0_8px_20px_rgba(255,122,0,0.25)]
                        transition-all
                        duration-300
                        hover:bg-[#4777ae]
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
                        mt-6
                        w-full
                        border-t
                        border-[#2f65a7]/15
                        pt-4
                      "
                    >
                      <p className="text-[9px] text-gray-500">
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
                          text-[#103f80]
                          transition-all
                          duration-300
                          hover:text-[#2f65a7]
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


