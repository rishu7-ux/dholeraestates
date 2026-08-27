"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  FaArrowRight,
  FaCheckCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* =========================================================
   GLOBAL FLAG
========================================================= */

/* =========================================================
   PROPS
========================================================= */

type PopupFormProps = {
  open?: boolean;
  onClose?: () => void;
  propertyName?: string;
};

/* =========================================================
   VALIDATION
========================================================= */

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(3, "Please enter your full name")
    .max(50, "Name is too long"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(
      /^[6-9]\d{9}$/,
      "Enter a valid 10-digit Indian mobile number"
    ),
});

type FormData = z.infer<typeof formSchema>;

/* =========================================================
   COMPONENT
========================================================= */

export default function PopupForm({
  open = false,
  onClose,
  propertyName = "Dholera Estates",
}: PopupFormProps) {
  const [autoOpen, setAutoOpen] = useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const [serverError, setServerError] =
    useState("");

  const modalOpen =
    open || autoOpen;

  const {
    register,
    handleSubmit,
    reset,

    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<FormData>({
    resolver:
      zodResolver(formSchema),

    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },

    mode: "onSubmit",

    reValidateMode:
      "onChange",
  });

  /* =========================================================
     AUTO OPEN AFTER EVERY PAGE LOAD
  ========================================================= */

  useEffect(() => {
    const timer =
      window.setTimeout(() => {
        setAutoOpen(true);
      }, 1200);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  /* =========================================================
     CLOSE
  ========================================================= */

  const handleClose =
    useCallback(() => {
      setAutoOpen(false);

      setServerError("");

      onClose?.();

      setTimeout(() => {
        reset();

        setSubmitted(false);
      }, 250);
    }, [
      reset,
      onClose,
    ]);

  /* =========================================================
     ESC CLOSE
  ========================================================= */

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (
        event.key === "Escape" &&
        modalOpen
      ) {
        handleClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [
    modalOpen,
    handleClose,
  ]);

  /* =========================================================
     BODY SCROLL LOCK
  ========================================================= */

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "";
    }

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [modalOpen]);

  /* =========================================================
     SUBMIT → API → PAYLOAD → MONGODB
  ========================================================= */

  const onSubmit = async (
    data: FormData
  ) => {
    try {
      setServerError("");

      console.log(
        "Submitting popup enquiry:",
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          property: propertyName,
        }
      );

      /* =============================================
         POPUP → ENQUIRY API
      ============================================= */

      const response = await fetch(
        "/api/enquiries",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name: data.name.trim(),

            email: data.email
              .trim()
              .toLowerCase(),

            phone: data.phone.trim(),

            property:
              propertyName ||
              "Dholera Estates",

            message: "",

            source: "dholeraestates-popup-form",
          }),
        }
      );

      /* =============================================
         READ API RESPONSE
      ============================================= */

      const result =
        await response.json();

      console.log(
        "Popup API Response:",
        result
      );

      /* =============================================
         CHECK API RESPONSE
      ============================================= */

      if (!response.ok) {
        console.error(
          "❌ Enquiry API Error:",
          result
        );

        throw new Error(
          result?.message ||
            "Failed to save enquiry"
        );
      }

      /* =============================================
         SUCCESS
      ============================================= */

      console.log(
        "✅ Popup enquiry saved to Payload:",
        result
      );

      /* =============================================
         RESET FORM
      ============================================= */

      reset();

      /* =============================================
         SHOW THANK YOU SCREEN
      ============================================= */

      setSubmitted(true);
    } catch (error) {
      console.error(
        "❌ Popup enquiry submit error:",
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
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.25,
          }}
          onClick={
            handleClose
          }
          className="
            fixed
            inset-0
            z-9999

            flex
            items-center
            justify-center

            overflow-y-auto

            bg-[#103f80]/70

            px-4
            py-4

            backdrop-blur-sm
          "
        >
          {/* =================================================
              POPUP CARD
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            transition={{
              duration: 0.4,

              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            onClick={(
              event
            ) => {
              event.stopPropagation();
            }}
            className="
              relative

              max-h-[94vh]

              w-full
              max-w-87.5

              overflow-x-hidden
              overflow-y-auto

              rounded-[22px]

              border
              border-[#2f65a7]/20

              bg-[#f1f5f9]

              shadow-[0_22px_65px_rgba(8,26,58,0.30)]

              sm:max-w-107.5
              sm:rounded-[28px]
            "
          >
            {/* =================================================
                CLOSE BUTTON
            ================================================= */}

            <motion.button
              type="button"
              onClick={
                handleClose
              }
              aria-label="Close popup"
              whileHover={{
                rotate: 90,
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.9,
              }}
              className="
                absolute
                right-3
                top-3
                z-40

                flex
                h-8
                w-8

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

                sm:right-4
                sm:top-4
                sm:h-9
                sm:w-9
              "
            >
              <FaTimes
                size={13}
              />
            </motion.button>

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
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -15,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >
                  {/* =============================================
                      HEADER
                  ============================================= */}

                  <div
                    className="
                      relative

                      border-b
                      border-[#2f65a7]/10

                      bg-linear-to-b
                      from-[#f8fafc]
                      to-[#e7edf4]

                      px-5
                      pb-4
                      pt-5

                      text-center

                      sm:px-7
                      sm:pb-6
                      sm:pt-7
                    "
                  >
                    {/* BADGE */}

                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.12,
                      }}
                      className="
                        mx-auto
                        mb-2

                        flex
                        w-fit
                        items-center
                        gap-2

                        rounded-full

                        border
                        border-[#2f65a7]/20

                        bg-white/70

                        px-3
                        py-1

                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.15em]

                        text-[#2f65a7]

                        sm:text-[10px]
                      "
                    >
                      <FaCheckCircle />

                      Property Enquiry
                    </motion.div>

                    {/* TITLE */}

                    <motion.h2
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.18,
                      }}
                      className="
                        text-center

                        text-[23px]
                        font-extrabold

                        text-[#103f80]

                        sm:text-3xl
                      "
                    >
                      Enquire Now
                    </motion.h2>

                    {/* LINE */}

                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: 44,
                      }}
                      transition={{
                        delay: 0.25,
                        duration: 0.45,
                      }}
                      className="
                        mx-auto
                        mt-2

                        h-0.75

                        rounded-full

                        bg-[#2f65a7]
                      "
                    />

                    {/* DESCRIPTION */}

                    <p
                      className="
                        mx-auto
                        mt-2

                        max-w-72.5

                        text-center

                        text-[11px]
                        leading-5

                        text-gray-600

                        sm:mt-3
                        sm:text-[13px]
                        sm:leading-6
                      "
                    >
                      Share your details and our
                      property consultant will contact
                      you shortly.
                    </p>

                    {/* PROPERTY */}

                    <div
                      className="
                        mt-3

                        rounded-xl

                        border
                        border-[#2f65a7]/15

                        bg-white/60

                        px-3
                        py-2

                        text-center

                        sm:mt-4
                      "
                    >
                      <p
                        className="
                          text-[8px]
                          font-semibold
                          uppercase
                          tracking-[0.15em]

                          text-gray-400

                          sm:text-[9px]
                        "
                      >
                        Enquiring About
                      </p>

                      <p
                        className="
                          mt-1

                          text-[12px]
                          font-bold

                          text-[#103f80]

                          sm:text-[13px]
                        "
                      >
                        {propertyName}
                      </p>
                    </div>
                  </div>

                  {/* =============================================
                      FORM BODY
                  ============================================= */}

                  <div
                    className="
                      bg-linear-to-b
                      from-[#f8fafc]
                      to-[#e7edf4]

                      px-5
                      pb-5
                      pt-4

                      sm:px-7
                      sm:pb-7
                      sm:pt-6
                    "
                  >
                    <form
                      onSubmit={
                        handleSubmit(
                          onSubmit
                        )
                      }
                      noValidate
                      className="
                        space-y-3
                        sm:space-y-4
                      "
                    >
                      {/* =========================================
                          NAME
                      ========================================= */}

                      <div>
                        <div
                          className={`
                            flex
                            items-center
                            gap-3

                            rounded-xl

                            border

                            bg-white

                            px-3.5

                            transition-all
                            duration-300

                            ${
                              errors.name
                                ? "border-red-500 bg-red-50/20"
                                : "border-[#2f65a7]/20 focus-within:border-[#2f65a7]"
                            }

                            focus-within:shadow-[0_6px_20px_rgba(255,122,0,0.10)]

                            sm:px-4
                          `}
                        >
                          <FaUser
                            className={
                              errors.name
                                ? "text-sm text-red-500"
                                : "text-sm text-[#2f65a7]"
                            }
                          />

                          <input
                            type="text"
                            placeholder="Your Name*"
                            {...register(
                              "name"
                            )}
                            className="
                              w-full

                              bg-transparent

                              py-2.5

                              text-sm
                              text-[#103f80]

                              outline-none

                              placeholder:text-gray-400

                              sm:py-3.5
                            "
                          />
                        </div>

                        <AnimatePresence>
                          {errors.name && (
                            <motion.p
                              initial={{
                                opacity: 0,
                                y: -4,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              exit={{
                                opacity: 0,
                              }}
                              className="
                                ml-1
                                mt-1

                                text-[10px]
                                font-medium
                                text-red-500

                                sm:text-[11px]
                              "
                            >
                              {
                                errors
                                  .name
                                  .message
                              }
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* =========================================
                          EMAIL
                      ========================================= */}

                      <div>
                        <div
                          className={`
                            flex
                            items-center
                            gap-3

                            rounded-xl

                            border

                            bg-white

                            px-3.5

                            transition-all
                            duration-300

                            ${
                              errors.email
                                ? "border-red-500 bg-red-50/20"
                                : "border-[#2f65a7]/20 focus-within:border-[#2f65a7]"
                            }

                            focus-within:shadow-[0_6px_20px_rgba(255,122,0,0.10)]

                            sm:px-4
                          `}
                        >
                          <FaEnvelope
                            className={
                              errors.email
                                ? "text-sm text-red-500"
                                : "text-sm text-[#2f65a7]"
                            }
                          />

                          <input
                            type="email"
                            placeholder="Your Email*"
                            {...register(
                              "email"
                            )}
                            className="
                              w-full

                              bg-transparent

                              py-2.5

                              text-sm
                              text-[#103f80]

                              outline-none

                              placeholder:text-gray-400

                              sm:py-3.5
                            "
                          />
                        </div>

                        <AnimatePresence>
                          {errors.email && (
                            <motion.p
                              initial={{
                                opacity: 0,
                                y: -4,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              exit={{
                                opacity: 0,
                              }}
                              className="
                                ml-1
                                mt-1

                                text-[10px]
                                font-medium
                                text-red-500

                                sm:text-[11px]
                              "
                            >
                              {
                                errors
                                  .email
                                  .message
                              }
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* =========================================
                          PHONE
                      ========================================= */}

                      <div>
                        <div
                          className={`
                            flex
                            items-center

                            rounded-xl

                            border

                            bg-white

                            transition-all
                            duration-300

                            ${
                              errors.phone
                                ? "border-red-500 bg-red-50/20"
                                : "border-[#2f65a7]/20 focus-within:border-[#2f65a7]"
                            }

                            focus-within:shadow-[0_6px_20px_rgba(255,122,0,0.10)]
                          `}
                        >
                          <span
                            className="
                              flex
                              h-10.5
                              w-10.5

                              shrink-0

                              items-center
                              justify-center

                              text-[#2f65a7]

                              sm:h-12
                              sm:w-12
                            "
                          >
                            <FaPhoneAlt
                              size={13}
                            />
                          </span>

                          <span
                            className="
                              border-r
                              border-[#2f65a7]/15

                              pr-2

                              text-xs
                              font-bold

                              text-gray-500

                              sm:pr-3
                              sm:text-sm
                            "
                          >
                            +91
                          </span>

                          <input
                            type="tel"
                            inputMode="numeric"
                            maxLength={10}
                            placeholder="9876543210"
                            {...register(
                              "phone",
                              {
                                onChange:
                                  (
                                    event
                                  ) => {
                                    event.target.value =
                                      event.target.value
                                        .replace(
                                          /\D/g,
                                          ""
                                        )
                                        .slice(
                                          0,
                                          10
                                        );
                                  },
                              }
                            )}
                            className="
                              min-w-0
                              w-full

                              bg-transparent

                              px-2
                              py-2.5

                              text-sm
                              text-[#103f80]

                              outline-none

                              placeholder:text-gray-400

                              sm:px-3
                              sm:py-3.5
                            "
                          />
                        </div>

                        <AnimatePresence>
                          {errors.phone && (
                            <motion.p
                              initial={{
                                opacity: 0,
                                y: -4,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              exit={{
                                opacity: 0,
                              }}
                              className="
                                ml-1
                                mt-1

                                text-[10px]
                                font-medium
                                text-red-500

                                sm:text-[11px]
                              "
                            >
                              {
                                errors
                                  .phone
                                  .message
                              }
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* =========================================
                          SERVER ERROR
                      ========================================= */}

                      {serverError && (
                        <motion.p
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
                            text-[11px]
                            font-medium
                            text-red-600
                          "
                        >
                          {serverError}
                        </motion.p>
                      )}

                      {/* =========================================
                          SUBMIT
                      ========================================= */}

                      <motion.button
                        type="submit"
                        disabled={
                          isSubmitting
                        }
                        whileHover={
                          isSubmitting
                            ? undefined
                            : {
                                y: -2,
                                scale: 1.01,
                              }
                        }
                        whileTap={
                          isSubmitting
                            ? undefined
                            : {
                                scale: 0.98,
                              }
                        }
                        className="
                          group
                          relative

                          flex
                          w-full
                          items-center
                          justify-center
                          gap-2

                          overflow-hidden

                          rounded-xl

                          bg-[#2f65a7]

                          px-5
                          py-3

                          text-[12px]
                          font-bold
                          uppercase
                          tracking-[0.08em]

                          text-white

                          shadow-[0_10px_25px_rgba(255,122,0,0.25)]

                          transition-all
                          duration-300

                          hover:bg-[#4777ae]
                          hover:shadow-[0_14px_30px_rgba(255,122,0,0.30)]

                          disabled:cursor-not-allowed
                          disabled:opacity-60

                          sm:py-3.5
                          sm:text-[13px]
                        "
                      >
                        {!isSubmitting && (
                          <span
                            className="
                              pointer-events-none

                              absolute
                              inset-y-0
                              -left-20

                              w-16

                              -skew-x-12

                              bg-white/25

                              transition-all
                              duration-700

                              group-hover:left-[120%]
                            "
                          />
                        )}

                        <span
                          className="
                            relative
                            z-10
                          "
                        >
                          {isSubmitting
                            ? "Submitting..."
                            : "Submit Enquiry"}
                        </span>

                        {!isSubmitting && (
                          <FaArrowRight
                            className="
                              relative
                              z-10

                              text-xs

                              transition-transform
                              duration-300

                              group-hover:translate-x-1.5
                            "
                          />
                        )}
                      </motion.button>
                    </form>

                    {/* =============================================
                        QUICK HELP
                    ============================================= */}

                    <div
                      className="
                        mt-4

                        border-t
                        border-[#2f65a7]/15

                        pt-4

                        text-center
                      "
                    >
                      <p
                        className="
                          text-[10px]
                          font-medium
                          text-gray-500

                          sm:text-[11px]
                        "
                      >
                        Need quick assistance?
                      </p>

                      <a
                        href="tel:+919217104219"
                        className="
                          mt-1.5

                          inline-flex
                          items-center
                          gap-2

                          text-[13px]
                          font-bold

                          text-[#103f80]

                          transition-all
                          duration-300

                          hover:text-[#2f65a7]

                          sm:text-sm
                        "
                      >
                        <FaPhoneAlt
                          size={11}
                        />

                        +91 92171 04219
                      </a>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* =================================================
                    THANK YOU SCREEN
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

                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  className="
                    flex
                    min-h-105
                    flex-col
                    items-center
                    justify-center

                    bg-linear-to-b
                    from-[#f8fafc]
                    to-[#e7edf4]

                    px-6
                    py-10

                    text-center
                  "
                >
                  {/* SUCCESS ICON */}

                  <motion.div
                    initial={{
                      scale: 0,
                      rotate: -25,
                    }}
                    animate={{
                      scale: 1,
                      rotate: 0,
                    }}
                    transition={{
                      delay: 0.1,
                      type: "spring",
                      stiffness: 180,
                      damping: 12,
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
                    <FaCheckCircle
                      size={28}
                    />

                    <motion.span
                      initial={{
                        scale: 1,
                        opacity: 0.5,
                      }}
                      animate={{
                        scale: 1.5,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 1.3,
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

                  {/* LABEL */}

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
                      delay: 0.2,
                    }}
                    className="
                      mt-5

                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.2em]

                      text-[#2f65a7]
                    "
                  >
                    Enquiry Submitted
                  </motion.p>

                  {/* TITLE */}

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
                      delay: 0.25,
                    }}
                    className="
                      mt-1

                      text-[26px]
                      font-extrabold

                      text-[#103f80]

                      sm:text-[30px]
                    "
                  >
                    Thank You!
                  </motion.h2>

                  {/* LINE */}

                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: 42,
                    }}
                    transition={{
                      delay: 0.3,
                      duration: 0.45,
                    }}
                    className="
                      mt-2

                      h-0.75

                      rounded-full

                      bg-[#2f65a7]
                    "
                  />

                  {/* MESSAGE */}

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
                      delay: 0.35,
                    }}
                    className="
                      mx-auto
                      mt-4

                      max-w-70

                      text-[12px]
                      leading-5

                      text-gray-600

                      sm:text-[13px]
                      sm:leading-6
                    "
                  >
                    Your enquiry has been submitted successfully.
                    Our property consultant will contact you shortly.
                  </motion.p>

                  {/* DONE */}

                  <motion.button
                    type="button"
                    onClick={
                      handleClose
                    }
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
                      min-w-36.25
                      items-center
                      justify-center
                      gap-2

                      overflow-hidden

                      rounded-xl

                      bg-[#2f65a7]

                      px-7
                      py-3

                      text-[11px]
                      font-bold
                      uppercase
                      tracking-[0.08em]

                      text-white

                      shadow-[0_8px_22px_rgba(255,122,0,0.25)]

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

                        text-[10px]

                        transition-transform
                        duration-300

                        group-hover:translate-x-1
                      "
                    />
                  </motion.button>

                  {/* QUICK CALL */}

                  <motion.div
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      delay: 0.5,
                    }}
                    className="
                      mt-6

                      w-full

                      border-t
                      border-[#2f65a7]/15

                      pt-4
                    "
                  >
                    <p className="text-[10px] text-gray-500">
                      Need quick assistance?
                    </p>

                    <a
                      href="tel:+919217104219"
                      className="
                        mt-1.5

                        inline-flex
                        items-center
                        gap-2

                        text-[13px]
                        font-bold

                        text-[#103f80]

                        transition-all
                        duration-300

                        hover:text-[#2f65a7]
                      "
                    >
                      <FaPhoneAlt
                        size={11}
                      />

                      +91 92171 04219
                    </a>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


