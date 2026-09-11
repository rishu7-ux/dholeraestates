"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";

/* =========================================================
   COLOR THEME

   PURE WHITE : #FFFFFF
   DARK NAVY  : #111111

   ORANGE
   MAIN       : #F90032
   DARK       : #F90032
   LIGHT      : #FA7000
========================================================= */

const navLinks = [
  {
    label: "HOME",
    href: "/",
  },
  {
    label: "PROPERTIES",
    href: "/properties",
  },
  {
    label: "ABOUT US",
    href: "/about-us",
  },
  {
    label: "BLOG",
    href: "/blog",
  },
  {
    label: "CONTACT US",
    href: "/contact-us",
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const overlaysHero = pathname === "/";

  /* =========================================================
     ACTIVE LINK CHECK
  ========================================================= */

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <motion.header
      initial={{
        y: -50,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`
        ${
          overlaysHero
            ? "fixed top-0 pb-1.5 pt-1 sm:pb-2.5 sm:pt-0"
            : "sticky top-0 py-1.5 sm:py-2.5"
        }
        z-50
        w-full
        bg-transparent
        px-2.5
        sm:px-4
        lg:px-6
      `}
    >
      {/* =====================================================
          MAIN HEADER
          PURE WHITE BACKGROUND
      ===================================================== */}

      <div
        className={`
          relative
          mx-auto
          flex
          h-15
          w-full
          max-w-[1420px]
          items-center
          justify-between
          rounded-lg
          border
          px-3
          sm:h-19
          sm:rounded-xl
          sm:px-5
          md:px-6
          lg:h-22
          lg:rounded-[17px]
          lg:px-8
          ${
            overlaysHero
              ? "border-white/90 bg-white shadow-[0_4px_12px_rgba(17,17,17,0.08)] backdrop-blur-xl"
              : "border-white/90 bg-[#FFFFFF] shadow-[0_4px_12px_rgba(249,0,50,0.11),0_2px_7px_rgba(0,0,0,0.05)]"
          }
        `}
      >
        {/* =================================================
            LOGO
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.1,
          }}
          whileHover={{
            scale: 1.02,
          }}
          className="shrink-0"
        >
          <Link href="/" className="flex items-center">
            <div
              className="
                relative
                h-10
                w-24
                sm:h-14
                sm:w-36
                md:h-15
                md:w-40
                lg:h-[68px]
                lg:w-20
              "
            >
              <Image
                src="/images/dholera-estates-logo.png"
                alt="Dholera Estates Logo"
                fill
                priority
                sizes="
                  (max-width: 640px) 128px,
                  (max-width: 768px) 144px,
                  (max-width: 1024px) 160px,
                  176px
                "
                className="object-contain object-left mix-blend-multiply"
              />
            </div>
          </Link>
        </motion.div>

        {/* =================================================
            DESKTOP NAVIGATION (CENTERED)
        ================================================= */}

        <nav
          className="
            mx-auto
            hidden
            items-center
            lg:flex
          "
        >
            {navLinks.map((link, index) => {
              const active = isActive(link.href);

              return (
                <motion.div
                  key={link.label}
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.12 + index * 0.06,
                    duration: 0.35,
                  }}
                  className={`
                    relative
                    px-4
                    first:pl-0
                    last:pr-0
                    xl:px-5

                    ${index === 0 ? "" : "before:absolute before:left-0 before:top-1/2 before:h-5 before:w-px before:-translate-y-1/2 before:bg-[#E5E7EB]"}
                  `}
                >
                  <Link
                    href={link.href}
                    className={`
                      group/nav
                      relative
                      inline-flex
                      items-center
                      py-2
                      text-[13px]
                      font-bold
                      tracking-wider
                      transition-all
                      duration-300
                      ease-out
                      hover:-translate-y-0.5
                      xl:text-[14px]

                      ${
                        active
                          ? "text-[#F90032]"
                          : "text-[#111111] hover:text-[#F90032]"
                      }
                    `}
                  >
                    {/* NAVIGATION WORD */}

                    {link.label}

                    {/* =========================================
                        SOLID ORANGE UNDERLINE
                    ========================================= */}

                    <span
                      className={`
                        absolute
                        -bottom-1
                        left-1/2
                        h-0.75
                        -translate-x-1/2
                        rounded-full
                        bg-[#F90032]
                        transition-all
                        duration-300
                        ease-out

                        ${
                          active
                            ? "w-full"
                            : "w-0 group-hover/nav:w-full"
                        }
                      `}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* =================================================
              DESKTOP PHONE BUTTON
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.4,
              duration: 0.45,
            }}
            className="hidden shrink-0 lg:block"
          >
            <Link
              href="tel:+919217104219"
              style={{
                background:
                  "linear-gradient(100deg, #ff7900 0%, #ff4c1f 48%, #f90032 100%)",
              }}
              className="
                group/phone
                relative
                flex
                items-center
                gap-2.5
                overflow-hidden
                rounded-full

                py-1
                pl-1
                pr-4

                shadow-[0_1px_3px_rgba(17,17,17,0.08)]

                transition-all
                duration-300

                hover:shadow-[0_4px_12px_rgba(17,17,17,0.08)]
              "
            >
              {/* BUTTON SHINE */}

              <span
                className="
                  pointer-events-none
                  absolute
                  left-[-80%]
                  top-0
                  h-full
                  w-[55%]
                  skew-x-[-20deg]
                  bg-[#FFFFFF]/25
                  transition-all
                  duration-700
                  group-hover/phone:left-[130%]
                "
              />

              {/* PHONE ICON */}

              <span
                className="
                  relative
                  z-10
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#FFFFFF]
                  text-[#FA7000]
                  shadow-sm
                  transition-all
                  duration-300
                  group-hover/phone:scale-105
                "
              >
                <FaPhoneAlt className="text-[11px]" />
              </span>

              {/* PHONE NUMBER */}

              <span
                className="
                  relative
                  z-10
                  whitespace-nowrap
                  text-[13px]
                  font-extrabold
                  tracking-[0.02em]
                  text-[#FFFFFF]
                "
              >
                +91 92171 04219
              </span>
            </Link>
        </motion.div>

        {/* =================================================
            MOBILE MENU BUTTON
        ================================================= */}

        <motion.button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          whileHover={{
            y: -2,
          }}
          whileTap={{
            y: 0,
          }}
          className="
            brand-button
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-lg

            sm:h-9
            sm:w-9
            sm:rounded-xl

            text-[#FFFFFF]

            shadow-[0_1px_3px_rgba(17,17,17,0.08)]

            transition-all
            duration-300

            lg:hidden
          "
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{
                  opacity: 0,
                  rotate: -90,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  rotate: 90,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <HiX size={26} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{
                  opacity: 0,
                  rotate: 90,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  rotate: -90,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <HiMenuAlt3 size={27} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* =====================================================
          MOBILE MENU
          PURE WHITE BACKGROUND
      ===================================================== */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mx-auto
              mt-2
              w-full
              max-w-7xl
              overflow-hidden
              rounded-xl
              border
              border-white/90
              bg-[#FFFFFF]
              shadow-[0_4px_12px_rgba(17,17,17,0.08)]
              lg:hidden
            "
          >
            <nav
              className="
                flex
                flex-col
                items-center
                justify-center
                bg-[#FFFFFF]
                px-5
                py-5
              "
            >
              {/* =================================================
                  MOBILE NAVIGATION LINKS
              ================================================= */}

              {navLinks.map((link, index) => {
                const active = isActive(link.href);

                return (
                  <motion.div
                    key={link.label}
                    initial={{
                      opacity: 0,
                      y: -8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.04 + index * 0.05,
                      duration: 0.25,
                    }}
                    className="w-full bg-[#FFFFFF]"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`
                        group/mobile
                        flex
                        w-full
                        items-center
                        justify-center
                        bg-[#FFFFFF]
                        py-4
                        text-center
                        text-[15px]
                        font-bold
                        tracking-[0.08em]
                        transition-all
                        duration-300

                        ${
                          active
                            ? "text-[#F90032]"
                            : "text-[#111111] hover:text-[#F90032]"
                        }
                      `}
                    >
                      <span className="relative">
                        {link.label}

                        {/* =====================================
                            MOBILE ORANGE UNDERLINE
                        ===================================== */}

                        <span
                          className={`
                            absolute
                            -bottom-2
                            left-1/2
                            h-0.75
                            -translate-x-1/2
                            rounded-full
                            bg-[#F90032]
                            transition-all
                            duration-300

                            ${
                              active
                                ? "w-full"
                                : "w-0 group-hover/mobile:w-full"
                            }
                          `}
                        />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              {/* =================================================
                  MOBILE PHONE BUTTON
              ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.28,
                  duration: 0.3,
                }}
                className="
                  mt-4
                  w-full
                  max-w-70
                "
              >
                <Link
                  href="tel:+919217104219"
                  onClick={() => setOpen(false)}
                  className="
                    brand-button
                    group/mobile-phone
                    relative
                    flex
                    items-center
                    justify-center
                    gap-3
                    overflow-hidden
                    rounded-full

                    px-3
                    py-1.5

                    shadow-[0_1px_3px_rgba(17,17,17,0.08)]

                    transition-all
                    duration-300

                  "
                >
                  {/* BUTTON SHINE */}

                  <span
                    className="
                      pointer-events-none
                      absolute
                      left-[-80%]
                      top-0
                      h-full
                      w-[55%]
                      skew-x-[-20deg]
                      bg-[#FFFFFF]/25
                      transition-all
                      duration-700
                      group-hover/mobile-phone:left-[130%]
                    "
                  />

                  {/* PHONE ICON */}

                  <span
                    className="
                      relative
                      z-10
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-[#FFFFFF]
                      text-[#FA7000]
                      shadow-sm
                      transition-all
                      duration-300
                      group-hover/mobile-phone:scale-105
                    "
                  >
                    <FaPhoneAlt className="text-[13px]" />
                  </span>

                  {/* PHONE NUMBER */}

                  <span
                    className="
                      relative
                      z-10
                      text-[15px]
                      font-extrabold
                      text-[#FFFFFF]
                    "
                  >
                    +91 92171 04219
                  </span>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.header>
  );
}
