import SideEnquiry from "@/components/SideEnquiry";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <SideEnquiry />
    </>
  );
}
