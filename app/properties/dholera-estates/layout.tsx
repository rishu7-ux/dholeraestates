import type { Metadata } from "next";

import { PROJECT_FAQS } from "@/lib/project-data";

const title = "Residential Plots in Akru Village";
const description =
  "Explore Dholera Estates residential plots of approximately 176–235 sq. yd. in Akru village near Dholera SIR, including location, documents and buyer checks.";
const canonicalPath = "/properties/dholera-estates";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: canonicalPath,
  },
  openGraph: {
    title: `${title} | Dholera Estates`,
    description,
    type: "website",
    url: canonicalPath,
    siteName: "Dholera Estates",
    images: [
      {
        url: "/images/dholera-estates-project.png",
        alt: "Dholera Estates residential plot project in Akru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Dholera Estates`,
    description,
    images: ["/images/dholera-estates-project.png"],
  },
};

const projectJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateListing",
      "@id": `https://dholeraestates.com${canonicalPath}#listing`,
      url: `https://dholeraestates.com${canonicalPath}`,
      name: title,
      description,
      image: "https://dholeraestates.com/images/dholera-estates-project.png",
      mainEntity: {
        "@type": "Product",
        name: "Dholera Estates residential plots",
        description: "Residential plots of approximately 176–235 sq. yd. in Akru village near Dholera SIR.",
        category: "Residential plots",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `https://dholeraestates.com${canonicalPath}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://dholeraestates.com/" },
        { "@type": "ListItem", position: 2, name: "Properties", item: "https://dholeraestates.com/properties" },
        { "@type": "ListItem", position: 3, name: "Dholera Estates", item: `https://dholeraestates.com${canonicalPath}` },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `https://dholeraestates.com${canonicalPath}#faq`,
      mainEntity: PROJECT_FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
  ],
};

export default function PropertyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {children}
    </>
  );
}
