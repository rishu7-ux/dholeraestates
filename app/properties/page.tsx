import type { Metadata } from "next";

import Header from "@/components/Header";
import FeaturedProperties from "@/components/FeaturedProperties";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SideEnquiry from "@/components/SideEnquiry";

const title = "Residential Plots in Akru";
const description =
  "Browse residential plot options at Dholera Estates, Akru village, near Dholera SIR. Approximately 176–235 sq. yd. plots with documentation for buyer review.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://dholeraestates.com/properties",
  },
  openGraph: {
    title: `${title} | Dholera Estates`,
    description,
    type: "website",
    url: "/properties",
    siteName: "Dholera Estates",
    images: [{
      url: "/images/property-overview-background.png",
      width: 2172,
      height: 724,
      alt: "Residential plots at Dholera Estates in Akru",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Dholera Estates`,
    description,
    images: ["/images/property-overview-background.png"],
  },
};

export default function PropertiesPage() {
  return (
    <>
      <Header />
      <PageHero
        eyebrow="Curated opportunities"
        title={<>Residential Plots in <span className="brand-gradient-text">Akru</span></>}
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
