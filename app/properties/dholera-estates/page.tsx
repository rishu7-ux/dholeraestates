"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBuilding,
  FaCheck,
  FaFileAlt,
  FaMapMarkerAlt,
  FaRoad,
  FaRulerCombined,
  FaShieldAlt,
  FaHome,
} from "react-icons/fa";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SideEnquiry from "@/components/SideEnquiry";
const projectSnapshot = [
  ["Project Name", "Dholera Estates"], ["Location", "Akru village, near Dholera SIR, Gujarat"],
  ["Land Type", "Residential Plot"], ["Legal Status", "NA-converted residential plots*"],
  ["Indicative Price", "Approximately ₹13–17 lakh onwards*"], ["Total Project Area", "Approximately 16 acres*"],
  ["Available Plot Sizes", "Approximately 170–235 sq. yards"], ["SIR Position", "Near / Outside Dholera SIR Boundary"],
];
const standoutFactors = [
  "Residential plots in Akru village, near—not inside—the Dholera SIR boundary.",
  "Approximately 170–235 sq. yd. plot options, subject to availability.",
  "A promoted township of approximately 16 acres.",
  "Clubhouse and proposed temple included in the project information; verify the current layout and status.",
];
const roadBenefits = [
  "Request the latest layout plan and exact plot coordinates.",
  "Confirm the current status of the clubhouse and proposed temple.",
  "Check access, sanctioned layout and applicable approvals independently.",
  "Obtain a written price sheet and current availability from the team.",
];
const locationAdvantages = [
  "Akru Village is located near the Dholera Special Investment Region.",
  "Near-SIR positioning can offer a more accessible entry point compared with land inside the SIR.",
  "The broader region is influenced by infrastructure development around Dholera.",
  "Buyers should clearly understand the distinction between inside-SIR and outside-SIR land.",
];
const connectivityPoints = [
  "Ahmedabad-Dholera Expressway connectivity.",
  "Proximity to the upcoming Dholera International Airport.",
  "Location near the wider Delhi-Mumbai Industrial Corridor growth region.",
];
const affordabilityPoints = [
  "Indicative pricing is approximately ₹13–17 lakh onwards, depending on size and availability.",
  "Confirm all charges and payment terms in a written price sheet.",
  "No land purchase guarantees appreciation or returns.",
];
const buyerProfiles = [
  {title: "First-Time Land Buyers", text: "Buyers seeking an accessible entry into the Dholera region who want to understand the location and documents."},
  {title: "NRI Buyers", text: "NRIs who want to research the location and documentation before purchasing remotely."},
  {title: "Residential Buyers", text: "Families considering long-term residential land in a planned township setting."},
  {title: "Researching Buyers", text: "Buyers evaluating plot dimensions, availability, pricing and boundaries before making a decision."},
];
const documentsToVerify = [
  "NA Conversion Certificate",
  "7/12 Land Record",
  "Clear Title Documents",
  "Applicable Land / Survey Records",
  "RERA applicability, where relevant",
  "Exact position relative to the notified Dholera SIR boundary",
];
const importantConsiderations = [
  "Verify all legal documentation independently through qualified legal counsel.",
  "Understand clearly whether the plot is inside or outside the officially notified Dholera SIR boundary.",
  "Confirm applicable regulatory registration status before making payment commitments.",
  "Do not rely on guaranteed return or appreciation claims.",
  "Visit the site personally or arrange an independent site inspection where possible.",
];
const faqs = [
  {
    "q": "What is Dholera Estates?",
    "a": "Dholera Estates is a residential plotted-development project promoted in Akru village, near the Dholera Special Investment Region in Gujarat."
  },
  {
    "q": "Is Dholera Estates inside Dholera SIR?",
    "a": "No. The project is described as being near the Dholera SIR boundary, not inside the separately notified SIR planning zone."
  },
  {
    "q": "What is the indicative starting price?",
    "a": "Current project information indicates approximately ₹13–17 lakh onwards, depending on plot size and availability. Obtain a written price sheet before deciding."
  },
  {
    "q": "Does buying a plot guarantee returns?",
    "a": "No. No land purchase guarantees appreciation or returns. Outcomes depend on infrastructure execution, market conditions and the specific location."
  },
  {
    "q": "Who may find the project suitable?",
    "a": "It may suit first-time land buyers, NRIs researching the Dholera region and families seeking a planned residential plot."
  }
];
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
function SectionHeading({
  small,
  title,
}: {
  small?: string;
  title: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      className="mb-7"
    >
      {small && (
        <div className="mb-3 flex items-center gap-3">
          <span className="h-0.5 w-8 bg-[#F90032]" />
          <span
            className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#F90032]"
          >
            {small}
          </span>
        </div>
      )}
      <h2
        className="text-3xl font-extrabold leading-tight text-[#F90032] md:text-4xl"
      >
        {title}
      </h2>
    </motion.div>
  );
}
function BulletCards({
  items,
}: {
  items: string[];
}) {
  return (
    <div className="mt-7 grid gap-4 sm:grid-cols-2">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{
            opacity: 0,
            y: 25,
            scale: 0.97,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            delay: index * 0.06,
            duration: 0.45,
          }}
          className="py-3"
        >
          <div className="flex items-start gap-4">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FA7000] text-sm text-white"
            >
              <FaCheck />
            </span>
            <p
              className="text-[15px] font-medium leading-7 text-[#4B5563]"
            >
              {item}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
function DataTable({
  rows,
  headers,
}: {
  rows: string[][];
  headers?: string[];
}) {
  return (
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
      className="mt-7 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_10px_28px_rgba(17,17,17,0.08)]"
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          {headers && (
            <thead>
              <tr className="bg-[#F90032] text-white">
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="px-5 py-4 text-sm font-bold"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className="group border-b border-[#F8FAFC] transition-colors duration-300 odd:bg-white even:bg-[#F8FAFC]"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`
                      px-5
                      py-4
                      text-sm
                      leading-6
                      md:text-[15px]
                      ${
                        cellIndex === 0
                          ? "font-bold text-[#F90032] transition-colors duration-300 group-hover:text-[#F90032]"
                          : "font-medium text-[#111111]"
                      }
                    `}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
export default function PropertyDetailPage() {
  return (
    <div className="property-detail-page">
      <Header />
      <section
        className="relative overflow-hidden brand-page-banner internal-page-hero property-detail-page-hero"
      >
        <Image
          src="/images/property-overview-background.png"
          alt="Dholera Estates entrance"
          fill
          priority
          sizes="100vw"
          className="pointer-events-none object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-white via-white/80 to-transparent" />
        <div
          className="pointer-events-none absolute -right-20 -top-32 h-[380px] w-[380px] rotate-12 border-[55px] border-white/10"
        />
        <div
          className="relative mx-auto flex min-h-50 max-w-7xl items-center px-5 py-8 sm:px-6 sm:min-h-[230px] lg:px-8"
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
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-4xl"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="h-0.5 w-10 bg-white" />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.24em] hero-title-gradient sm:text-xs"
              >
                Residential Plot Investment
              </span>
            </div>
            <h1
              className="text-[28px] font-extrabold leading-[1.1] text-white sm:text-4xl lg:text-[44px]"
            >
              <span className="hero-title-gradient">Dholera Estates</span>
              <span className="mt-2 block text-white">
                Residential Plots in Akru Village
              </span>
            </h1>
            <div
              className="mt-5 flex flex-wrap items-center gap-2 text-sm font-medium text-white"
            >
              <Link
                href="/"
                className="transition-colors duration-300 hover:text-white"
              >
                Home
              </Link>
              <span>/</span>
              <Link
                href="/properties"
                className="transition-colors duration-300 hover:text-white"
              >
                Properties
              </Link>
              <span>/</span>
              <span>Dholera Estates</span>
            </div>
          </motion.div>
        </div>
      </section>
      <section
        className="relative property-summary-premium bg-white pt-16 pb-28 md:pt-20 md:pb-32"
      >
        <div
          className="relative z-20 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8"
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
              scale: 0.98,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden rounded-[28px] border border-[#E5E7EB] bg-white shadow-[0_10px_28px_rgba(17,17,17,0.08)]"
          >
            <div
              className="flex flex-col gap-3 px-4 py-4 sm:gap-6 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:flex-row lg:items-center lg:justify-between lg:px-10"
            >
              <div>
                <div
                  className="flex items-center gap-2 text-[#101827]"
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F8FAFC] text-[#FA7000]"
                  >
                    <FaMapMarkerAlt className="text-xs" />
                  </span>
                  <span className="text-sm font-bold">
                    Akru Village, Dholera Region
                  </span>
                </div>
                <h2
                  className="mt-4 text-[22px] font-extrabold leading-[1.2] text-[#101827] sm:text-3xl md:text-[34px]"
                >
                  <span className="hero-title-gradient">Dholera Estates</span> Residential Plots
                </h2>
              </div>
              <motion.div
                whileHover={{
                  y: -3,
                }}
                className="shrink-0 rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] px-5 py-4 shadow-[0_4px_12px_rgba(17,17,17,0.08)] lg:text-right"
              >
                <p
                  className="text-[10px] font-extrabold uppercase tracking-[0.18em] brand-gradient-text"
                >
                  Property Type
                </p>
                <p
                  className="mt-1 text-2xl font-black text-[#101827]"
                >
                  Residential
                </p>
                <p
                  className="mt-1.5 text-xs font-semibold text-[#4B5563]"
                >
                  NA Converted Plots*
                </p>
              </motion.div>
            </div>
            <div className="mx-4 h-px bg-[#F8FAFC] sm:mx-6 md:mx-8 lg:mx-10" />
            <div
              className="px-4 pb-4 pt-4 sm:px-6 sm:py-6 md:px-8 lg:px-10"
            >
              <div
                className="grid grid-cols-2 gap-3 lg:grid-cols-5"
              >
                {[
                  {
                    icon: <FaHome />,
                    title: "Land Type",
                    value: "Residential",
                  },
                  {
                    icon: <FaRulerCombined />,
                    title: "Project Area",
                    value: "Approx. 16 Acres*",
                  },
                  {
                    icon: <FaBuilding />,
                    title: "Plot Sizes",
                    value: "170 - 235 Sq. Yd.",
                  },
                  {
                    icon: <FaRoad />,
                    title: "Price From",
                    value: "₹13 Lakh*",
                  },
                  {
                    icon: <FaMapMarkerAlt />,
                    title: "Location",
                    value: "Akru",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.04,
                      duration: 0.3,
                    }}
                    whileHover={{
                      y: -3,
                    }}
                    className="group rounded-2xl border border-[#E5E7EB] bg-white p-4 transition-all duration-300 hover:border-[#E5E7EB] hover:shadow-[0_4px_12px_rgba(17,17,17,0.08)]"
                  >
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff1eb] text-sm text-[#FA7000] transition-all duration-300 group-hover:bg-[#FA7000] group-hover:text-white"
                    >
                      {item.icon}
                    </span>
                    <p
                      className="mt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#60708B]"
                    >
                      {item.title}
                    </p>
                    <p
                      className="mt-1.5 text-[14px] font-extrabold text-[#101827]"
                    >
                      {item.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div
              className="flex flex-wrap gap-3 border-t border-[#F8FAFC] bg-[#F8FAFC] px-4 py-3 sm:px-6 md:px-8 lg:px-10"
            >
              <Link
                href="/contact-us"
                className="brand-button inline-flex items-center justify-center gap-2 rounded-xl bg-[#FA7000] px-6 py-3 text-sm font-bold text-white shadow-[0_1px_3px_rgba(17,17,17,0.08)] transition-all duration-300 hover:bg-[#F90032]"
              >
                Enquire Now
                <FaArrowRight />
              </Link>
              <Link
                href="/contact-us"
                className="brand-button-outline inline-flex items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-6 py-3 text-sm font-bold text-[#101827] transition-all duration-300 hover:text-[#FA7000]"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div
            className="grid items-start gap-10 lg:grid-cols-[1fr_360px]"
          >
            <main>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                }}
              >
                <p
                  className="text-lg font-medium leading-9 text-[#4B5563]"
                >
                  Gujarat&apos;s Dholera Special Investment Region has become
                  one of India&apos;s most discussed greenfield development
                  stories, and the surrounding villages are increasingly
                  attracting attention from investors and long-term land buyers.
                </p>
                <p
                  className="mt-6 text-lg font-medium leading-9 text-[#4B5563]"
                >
                  Dholera Estates is a residential land project located near—not inside—the Dholera SIR boundary. It promotes NA-converted residential plots of approximately 170 to 235 sq. yards within a planned township.
                </p>
              </motion.div>
              <section className="relative isolate mt-16 overflow-hidden rounded-[30px] border border-[#e8e8f2] bg-white px-5 py-8 shadow-[0_10px_28px_rgba(17,24,39,0.06)] sm:px-8 sm:py-10">
                <Image
                  src="/images/property-overview-background.png"
                  alt=""
                  fill
                  aria-hidden="true"
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  className="-z-20 object-cover object-center"
                />
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-white via-white/92 to-white/28" />
                <div className="relative">
                  <SectionHeading
                    small="Project Overview"
                    title="Understanding Dholera Estates"
                  />
                  <p className="max-w-4xl text-lg font-medium leading-9 text-[#4B5563]">
                    Buyers should confirm exact survey details, sanctioned layout, NA documentation, plot dimensions and position relative to the SIR boundary before purchasing.
                  </p>
                  <DataTable
                    rows={projectSnapshot}
                    headers={[
                      "Project at a Glance",
                      "Dholera Estates — Akru Village",
                    ]}
                  />
                </div>
              </section>
              <section className="mt-16">
                <SectionHeading
                  small="Project Features"
                  title="What Sets Dholera Estates Apart?"
                />
                <BulletCards items={standoutFactors} />
              </section>
              <section className="mt-16">
                <SectionHeading
                  small="Legal Status"
                  title="NA-Converted Residential Land"
                />
                <p className="text-lg font-medium leading-9 text-[#4B5563]">
                  The supplied project information describes the plots as
                  NA-converted. This means the land has been converted from
                  agricultural to non-agricultural residential use. Buyers
                  should independently verify the relevant conversion
                  documents before purchase.
                </p>
              </section>
              <section className="mt-16">
                <SectionHeading
                  small="Project Information"
                  title="Township Amenities and Layout"
                />
                <p className="text-lg font-medium leading-9 text-[#4B5563]">
                  The project information describes a promoted 16-acre township with a clubhouse and proposed temple. Request the current layout and confirm the status of each amenity directly with the team.
                </p>
                <BulletCards items={roadBenefits} />
              </section>
              <section className="mt-16">
                <SectionHeading
                  small="Plot Options"
                  title="Flexible Plot Sizes from 170 to 235 Sq. Yards"
                />
                <p className="text-lg font-medium leading-9 text-[#4B5563]">
                  The available size range gives buyers flexibility to evaluate
                  compact residential plots as well as larger parcels for
                  future residential development, subject to applicable local
                  permissions.
                </p>
              </section>
              <section className="mt-16">
                <SectionHeading
                  small="Location"
                  title="Why Akru Village?"
                />
                <p className="text-lg font-medium leading-9 text-[#4B5563]">
                  Akru is positioned near the Dholera Special Investment
                  Region. It is important to understand that the supplied
                  information places Akru outside the officially notified
                  SIR boundary, so its regulatory framework differs from land
                  located inside Dholera SIR.
                </p>
                <BulletCards items={locationAdvantages} />
              </section>
              <section className="mt-16">
                <SectionHeading
                  small="Connectivity"
                  title="Major Infrastructure Around the Dholera Region"
                />
                <BulletCards items={connectivityPoints} />
              </section>
              <section className="mt-16">
                <SectionHeading
                  small="Investment Positioning"
                  title="Pricing and Purchase Considerations"
                />
                <BulletCards items={affordabilityPoints} />
              </section>
              <section className="mt-16">
                <SectionHeading
                  small="Buyer Profiles"
                  title="Who Should Consider Dholera Estates?"
                />
                <div className="grid gap-4 md:grid-cols-2">
                  {buyerProfiles.map((buyer, index) => (
                    <motion.article
                      key={buyer.title}
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
                        delay: index * 0.07,
                        duration: 0.5,
                      }}
                      whileHover={{
                        y: -7,
                      }}
                      className="group rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_10px_28px_rgba(17,17,17,0.08)] transition-all duration-300 hover:border-[#E5E7EB] hover:shadow-[0_10px_28px_rgba(17,17,17,0.08)]"
                    >
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8FAFC] text-[#FA7000] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#F90032] group-hover:text-white"
                      >
                        <FaBuilding />
                      </span>
                      <h3
                        className="mt-3 text-lg font-extrabold text-[#F90032] transition-colors duration-300 group-hover:text-[#F90032]"
                      >
                        {buyer.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#4B5563]">
                        {buyer.text}
                      </p>
                    </motion.article>
                  ))}
                </div>
              </section>
              <section className="mt-16">
                <SectionHeading
                  small="Documentation"
                  title="Important Documents to Verify"
                />
                <div className="mt-10 flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F8FAFC] text-[#FA7000]"
                  >
                    <FaFileAlt />
                  </span>
                  <h3
                    className="text-2xl font-extrabold text-[#F90032]"
                  >
                    Buyer Due Diligence
                  </h3>
                </div>
                <BulletCards items={documentsToVerify} />
              </section>
              <section className="mt-16">
                <SectionHeading
                  small="Before Buying"
                  title="Important Considerations"
                />
                <BulletCards items={importantConsiderations} />
              </section>
              <section className="mt-16">
                <SectionHeading
                  title="Project Layout"
                />
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="overflow-hidden rounded-[28px] border border-[#E5E7EB] bg-white shadow-[0_10px_28px_rgba(17,17,17,0.08)]"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-white">
                    <Image
                      src="/images/projectlayout.jpeg"
                      alt="Dholera Estates project layout"
                      fill
                      sizes="(max-width: 1024px) 100vw, 900px"
                      className="object-contain object-center"
                    />
                  </div>
                </motion.div>
              </section>
              <motion.section
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
                className="mt-16 rounded-[28px] border border-[#E5E7EB] bg-[#F8FAFC] p-7 md:p-9"
              >
                <div
                  className="flex items-center gap-3 text-[#FA7000]"
                >
                  <FaShieldAlt />
                  <span
                    className="text-xs font-bold uppercase tracking-[0.18em]"
                  >
                    Final Thoughts
                  </span>
                </div>
                <h2
                  className="mt-4 text-3xl font-extrabold text-[#F90032]"
                >
                  Dholera Estates
                </h2>
                <p
                  className="mt-4 text-lg leading-8 text-[#4B5563]"
                >
                  No land purchase comes with guaranteed appreciation or a fixed return date. Market conditions, infrastructure timelines and the specific plot location all matter. Request the latest layout, price sheet and supporting documents, and have an independent property lawyer review the title chain and land-use paperwork before purchasing.
                </p>
                <Link
                  href="/contact-us"
                  className="brand-button mt-7 inline-flex items-center gap-3 rounded-xl bg-[#FA7000] px-7 py-4 font-bold text-white shadow-[0_4px_12px_rgba(17,17,17,0.08)] transition-all duration-300 hover:bg-[#F90032]"
                >
                  Enquire About Dholera Estates
                  <FaArrowRight />
                </Link>
              </motion.section>
              <section className="mt-16">
                <SectionHeading
                  small="Questions"
                  title="Frequently Asked Questions"
                />
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <motion.article
                      key={faq.q}
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
                        delay: index * 0.05,
                        duration: 0.45,
                      }}
                      whileHover={{
                        y: -3,
                      }}
                      className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_4px_12px_rgba(17,17,17,0.08)] transition-all duration-300 hover:border-[#E5E7EB]"
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className="flex h-9 min-w-9 items-center justify-center rounded-xl bg-[#FA7000] text-sm font-bold text-white"
                        >
                          {index + 1}
                        </span>
                        <div>
                          <h3
                            className="text-lg font-extrabold text-[#F90032]"
                          >
                            {faq.q}
                          </h3>
                          <p className="mt-3 leading-7 text-[#4B5563]">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </section>
            </main>
            <aside
              className="space-y-7 self-start lg:sticky lg:top-28"
            >
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
                className="relative overflow-hidden rounded-[26px] border border-[#E5E7EB] bg-[#F8FAFC] p-6 shadow-[0_10px_28px_rgba(17,17,17,0.08)]"
              >
                <span
                  className="absolute left-0 top-0 h-[4px] w-full bg-[#F90032]"
                />
                <span
                  className="text-xs font-black uppercase tracking-[0.18em] text-[#F90032]"
                >
                  Property Snapshot
                </span>
                <h3
                  className="mt-2 text-3xl font-extrabold text-[#F90032]"
                >
                  Dholera Estates
                </h3>
                <p
                  className="mt-3 text-sm leading-7 text-[#4B5563]"
                >
                  Residential plots in Akru Village near the Dholera SIR
                  growth region.
                </p>
                <div
                  className="mt-5 space-y-3 text-sm"
                >
                  <div className="flex justify-between gap-4">
                    <span className="text-[#111111]">Plot Size</span>
                    <span className="font-bold text-[#F90032]">
                      170 - 235 Sq. Yd.
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-[#111111]">Indicative Price</span>
                    <span className="font-bold text-[#F90032]">
                      ₹13–17 Lakh*
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-[#111111]">Land Type</span>
                    <span className="font-bold text-[#F90032]">
                      Residential
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-[#111111]">Legal Status*</span>
                    <span className="font-bold text-[#F90032]">
                      NA Converted
                    </span>
                  </div>
                </div>
                <Link
                  href="/contact-us"
                  className="brand-button mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-[#FA7000] py-4 font-bold text-white shadow-[0_4px_12px_rgba(17,17,17,0.08)] transition-all duration-300 hover:bg-[#F90032]"
                >
                  Enquire Now
                  <FaArrowRight />
                </Link>
              </motion.div>
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
                className="rounded-[26px] border border-[#E5E7EB] bg-white p-6 shadow-[0_10px_28px_rgba(17,17,17,0.08)]"
              >
                <span
                  className="text-xs font-bold uppercase tracking-[0.18em] text-[#F90032]"
                >
                  Buyer Note
                </span>
                <h3
                  className="mt-2 text-2xl font-extrabold text-[#F90032]"
                >
                  Near Dholera SIR
                </h3>
                <span
                  className="mt-3 block h-[3px] w-10 rounded-full bg-[#F90032]"
                />
                <p
                  className="mt-5 text-sm leading-7 text-[#4B5563]"
                >
                  Akru is described in the supplied project information as
                  being outside the officially notified Dholera SIR boundary.
                  Buyers should verify the exact survey location and applicable
                  local regulations independently.
                </p>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>
      <CTASection />
      <Footer />
      <SideEnquiry />
    </div>
  );
}
