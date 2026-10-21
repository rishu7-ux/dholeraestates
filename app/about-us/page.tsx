import type { Metadata } from "next";

import AboutPage from "@/components/AboutPage";

const title = "About Us | Residential Plots in Akru";
const description =
  "Learn about Dholera Estates, our residential plot opportunities in Akru village, and the buyer support we provide near Dholera SIR.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://dholeraestates.com/about-us",
  },
  openGraph: {
    title: `${title} | Dholera Estates`,
    description,
    type: "website",
    url: "/about-us",
    siteName: "Dholera Estates",
    images: [{
      url: "/images/about-banner.png",
      width: 2172,
      height: 724,
      alt: "About Dholera Estates",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Dholera Estates`,
    description,
    images: ["/images/about-banner.png"],
  },
};

export default function AboutUsPage() {
  return <AboutPage />;
}
