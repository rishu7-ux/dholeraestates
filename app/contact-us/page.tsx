import type { Metadata } from "next";

import ContactUsPage from "@/components/ContactUsPage";

const title = "Contact Dholera Estates | Arrange a Site Visit";
const description =
  "Contact Dholera Estates for residential plot details, buyer support, and site-visit coordination near Dholera SIR.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://dholeraestates.com/contact-us",
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

export default function ContactPage() {
  return <ContactUsPage />;
}
