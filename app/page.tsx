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
  "Explore Dholera Estates residential plots in Akru village near Dholera SIR, with site visits, project information and buyer support.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://dholeraestates.com/",
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
