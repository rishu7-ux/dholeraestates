import type { Metadata } from "next";

import Header from "@/components/Header";
import FeaturedProperties from "@/components/FeaturedProperties";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SideEnquiry from "@/components/SideEnquiry";

const title = "Dholera Estates Properties | Akru Village Plots";
const description =
  "Explore 176–235 sq. yd. plots at Dholera Estates in Akru village on Cher Road, with project information and documentation for buyer review.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "https://dholeraestates.com/properties",
  },
  openGraph: {
    title,
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
    title,
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
        title={<>Dholera Estates Properties | <span className="brand-gradient-text">Akru Village Plots</span></>}
        description="Explore 176–235 sq. yd. plots in Akru village on Cher Road, with clear project information and guidance from our team."
        backgroundImage="/images/property-overview-background.png"
      />
      <FeaturedProperties />
      <CTASection />
      <Footer />
      <SideEnquiry />
    </>
  );
}
