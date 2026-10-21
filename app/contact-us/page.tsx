import type { Metadata } from "next";

import ContactUsPage from "@/components/ContactUsPage";

const title = "Contact Us | Arrange a Site Visit";
const description =
  "Contact Dholera Estates for residential plot details, buyer support, and site-visit coordination near Dholera SIR.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://dholeraestates.com/contact-us",
  },
  openGraph: {
    title: `${title} | Dholera Estates`,
    description,
    type: "website",
    url: "/contact-us",
    siteName: "Dholera Estates",
    images: [{
      url: "/images/contact.png",
      width: 2172,
      height: 724,
      alt: "Contact Dholera Estates to arrange a site visit",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Dholera Estates`,
    description,
    images: ["/images/contact.png"],
  },
};

export default function ContactPage() {
  return <ContactUsPage />;
}
