import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

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
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}><body className="min-h-full flex flex-col">{children}</body></html>;
}
