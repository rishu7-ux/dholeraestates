import type { Metadata } from "next";
import "./globals.css";
import GlobalMotion from "@/components/GlobalMotion";

export const metadata: Metadata = {
  title: { default: "Dholera Estates | Residential Plots in Dholera", template: "%s | Dholera Estates" },
  description: "Explore residential plot options and arrange a site visit with Dholera Estates.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><GlobalMotion />{children}</body></html>;
}
