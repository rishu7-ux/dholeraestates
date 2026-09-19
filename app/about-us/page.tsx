import type { Metadata } from "next";

import AboutPage from "@/components/AboutPage";

const title = "About Dholera Estates | Residential Plots in Akru";
const description =
  "Learn about Dholera Estates, our residential plot opportunities in Akru village, and the buyer support we provide near Dholera SIR.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://dholeraestates.com/about-us",
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

export default function AboutUsPage() {
  return <AboutPage />;
}
