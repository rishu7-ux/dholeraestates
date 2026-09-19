import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Dholera Estates",
  url: "https://dholeraestates.com",
  telephone: "+91-92171-04219",
  email: "customercare@omanaprojects.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "7th Floor, Plot No 56A/16, C Block, Phase-2, Sector-62",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    postalCode: "201309",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.facebook.com/share/14nw1ZfSqB3/?mibextid=wwXIfr",
    "https://www.instagram.com/omana_projects",
    "https://www.youtube.com/@omanaprojects",
    "https://www.linkedin.com/company/omana-projectss/",
  ],
};

export const metadata: Metadata = {
  title: { default: "Dholera Estates | Residential Plots in Dholera", template: "%s | Dholera Estates" },
  description: "Explore residential plot options and arrange a site visit with Dholera Estates.",
  icons: {
    icon: [{ url: "/images/dholera-estates-logo.png", type: "image/png" }],
    shortcut: "/images/dholera-estates-logo.png",
    apple: "/images/dholera-estates-logo.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}><head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }} /></head><body className="min-h-full flex flex-col">{children}</body></html>;
}
