import type { Metadata } from "next";

import Header from "@/components/Header";
import FeaturedProperties from "@/components/FeaturedProperties";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SideEnquiry from "@/components/SideEnquiry";

const title = "Residential Plots in Akru | Dholera Estates";
const description =
  "Browse residential plot options at Dholera Estates, Akru village, near Dholera SIR. Approximately 170–235 sq. yd. plots with indicative pricing and documentation for buyer review.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/properties",
  },
  openGraph: {
    title,
    description,
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function PropertiesPage() {
  return (
    <>
      <Header />
      <PageHero
        eyebrow="Curated opportunities"
        title={<>Find Your <span className="brand-gradient-text">Ideal Plot</span></>}
        description="Explore residential plot options at Dholera Estates, with clear project information and guidance from our team."
        backgroundImage="/images/property-overview-background.png"
      />
      <FeaturedProperties />
      <CTASection />
      <Footer />
      <SideEnquiry />
    </>
  );
}
