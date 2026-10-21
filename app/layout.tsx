import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/Geist-Variable.ttf",
  weight: "100 900",
  display: "swap",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMono-Variable.ttf",
  weight: "100 900",
  display: "swap",
  variable: "--font-geist-mono",
});

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
  metadataBase: new URL("https://dholeraestates.com"),
  title: { default: "Dholera Estates | Residential Plots in Dholera", template: "%s | Dholera Estates" },
  description: "Explore residential plot options and arrange a site visit with Dholera Estates.",
  openGraph: {
    siteName: "Dholera Estates",
    images: [
      {
        url: "/images/dholera-estates-hero-v2.png",
        width: 2065,
        height: 761,
        alt: "Dholera Estates residential plots in Akru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/dholera-estates-hero-v2.png"],
  },
  icons: {
    icon: [{ url: "/images/dholera-estates-logo.png", type: "image/png" }],
    shortcut: "/images/dholera-estates-logo.png",
    apple: "/images/dholera-estates-logo.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}><head><meta name="google-site-verification" content="bIE8tIMXz7ehshQU3llX8DxP36N_sijgJH84zq3eyQ0" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }} /></head><body className="min-h-full flex flex-col">{children}</body><Script src="https://www.googletagmanager.com/gtag/js?id=G-3MK4G913R3" strategy="afterInteractive" /><Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-3MK4G913R3');
  ` }} /></html>;
}
