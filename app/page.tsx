import type { Metadata } from "next";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PopupForm from "@/components/PopupForm";
import SideEnquiry from "@/components/SideEnquiry";
import PropertyIntro from "@/components/PropertyType";
import PropertyCategories from "@/components/PropertyCategories";
import InfrastructureHighlights from "@/components/InfrastructureHighlights";
import Testimonial from "@/components/Testimonial";
import Blogsection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import { getBlogs } from "@/lib/blogs";

const title = "Dholera Estates | Residential Plots in Akru, Dholera";
const description =
  "Residential plots of 176–235 sq. yd. in Akru village, Cher Road, about 700 m from the Dholera SIR boundary. Site visits and document support.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "https://dholeraestates.com/",
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/",
    siteName: "Dholera Estates",
    images: [{
      url: "/images/dholera-estates-hero-v2.png",
      width: 2065,
      height: 761,
      alt: "Dholera Estates residential plots in Akru",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/dholera-estates-hero-v2.png"],
  },
};


export default async function Home() {
  const blogs = await getBlogs();
  return (
   <>

      <Header />
      <Hero />
      <SideEnquiry />
      <PopupForm />
      <PropertyIntro/>
      <PropertyCategories />
      <InfrastructureHighlights />
      <Testimonial/>
      <Blogsection blogs={blogs}/>
      <Footer/>


    </>
  );
}
