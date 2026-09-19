import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { FaArrowRight, FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaYoutube } from "react-icons/fa";

const quickLinks = [
  { label: "Home", href: "/" }, { label: "Properties", href: "/properties" }, { label: "About Us", href: "/about-us" }, { label: "Blog", href: "/blog" }, { label: "Contact Us", href: "/contact-us" },
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/share/14nw1ZfSqB3/?mibextid=wwXIfr", icon: FaFacebookF, color: "#1877f2" },
  { label: "Instagram", href: "https://www.instagram.com/omana_projects", icon: FaInstagram, color: "linear-gradient(135deg,#833ab4,#e1306c,#fcaf45)" },
  { label: "YouTube", href: "https://www.youtube.com/@omanaprojects", icon: FaYoutube, color: "#ff0000" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/omana-projectss/", icon: FaLinkedinIn, color: "#0a66c2" },
  { label: "WhatsApp", href: "https://wa.me/919217104219", icon: FaWhatsapp, color: "#25d366" },
];

function FooterLabel({ children }: { children: ReactNode }) {
  return <div className="flex items-center gap-3"><span className="hidden h-[3px] w-12 bg-linear-to-r from-[#fa7000] via-[#f90032] to-[#960aaa] lg:block" /><p className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-[#18378a] sm:text-[11px] sm:tracking-[0.32em]">{children}</p></div>;
}

function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return <li><Link href={href} className="group flex min-w-0 items-start gap-2 text-[12px] font-medium leading-5 text-[#14203a] transition-colors hover:text-[#f90032] sm:gap-3 sm:text-[15px]"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#fff2ea,#f5efff)] text-[10px] text-[#f90032] transition-transform group-hover:translate-x-1 sm:h-8 sm:w-8 sm:text-xs"><FaArrowRight /></span><span className="min-w-0 break-words">{children}</span></Link></li>;
}

function ExternalArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return <li><a href={href} className="group flex min-w-0 items-start gap-2 text-[12px] font-medium leading-5 text-[#14203a] transition-colors hover:text-[#f90032] sm:gap-3 sm:text-[15px]"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#fff2ea,#f5efff)] text-[10px] text-[#f90032] transition-transform group-hover:translate-x-1 sm:h-8 sm:w-8 sm:text-xs"><FaArrowRight /></span><span className="min-w-0 break-words">{children}</span></a></li>;
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#fbfcff]">
      <section className="relative mx-auto max-w-[1600px] px-4 py-9 sm:px-10 lg:px-12 lg:py-11">
        <Image src="/images/dholera-estates-logo.png" alt="" width={260} height={260} aria-hidden="true" className="pointer-events-none absolute -bottom-16 right-4 hidden h-[180px] w-auto opacity-25 lg:block lg:right-8 lg:h-[220px]" />
        <div className="relative grid grid-cols-2 gap-x-4 gap-y-9 [&>div]:min-w-0 sm:gap-x-8 lg:grid-cols-[1.25fr_0.9fr_0.9fr_1.15fr] lg:gap-10">
          <div>
            <FooterLabel>Get in touch</FooterLabel>
            <h2 className="mt-3 text-[18px] font-black leading-tight tracking-[-0.04em] text-[#101827] sm:text-[22px] lg:text-[25px] lg:leading-none">Dholera <span className="brand-gradient-text">Estates</span></h2>
            <span className="mt-4 block h-[3px] w-12 bg-linear-to-r from-[#fa7000] via-[#f90032] to-[#960aaa] lg:hidden" />
            <div className="mt-6 space-y-3.5">
              <div className="flex items-start gap-2 sm:gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fff1eb] text-xs text-[#fa7000] sm:h-10 sm:w-10 sm:text-sm"><FaMapMarkerAlt /></span><p className="pt-1 text-[10px] leading-4 text-[#18243a] sm:text-[13px] sm:leading-5">7th Floor, Plot No 56A/16, C Block, Phase-2,<br />Sector-62, Noida, Uttar Pradesh - 201309</p></div>
              <a href="mailto:customercare@omanaprojects.com" className="flex min-w-0 items-center gap-2 text-[10px] text-[#18243a] hover:text-[#f90032] sm:gap-3 sm:text-[13px]"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f8efff] text-xs text-[#d000c9] sm:h-10 sm:w-10 sm:text-sm"><FaEnvelope /></span><span className="min-w-0 break-all">customercare@omanaprojects.com</span></a>
              <a href="tel:+919217104219" className="flex items-center gap-2 text-[12px] font-bold text-[#14203a] hover:text-[#f90032] sm:gap-3 sm:text-base"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#edf2ff] text-xs text-[#2855f5] sm:h-10 sm:w-10 sm:text-sm"><FaPhoneAlt /></span>+91 92171 04219</a>
            </div>
          </div>

          <div>
            <FooterLabel>Explore</FooterLabel>
            <h3 className="mt-3 text-[18px] font-extrabold tracking-[-0.04em] text-[#101827] sm:text-[24px]">Property</h3>
            <span className="mt-4 block h-[3px] w-12 bg-linear-to-r from-[#fa7000] via-[#f90032] to-[#960aaa]" />
            <ul className="mt-6 space-y-2">
              <ArrowLink href="/properties/dholera-estates">Dholera Estates</ArrowLink>
              <ArrowLink href="/properties/dholera-estate-1">Dholera Estates 1</ArrowLink>
              <ExternalArrowLink href="https://dholeraestate2.com">Dholera Estates 2</ExternalArrowLink>
              <ArrowLink href="/properties/dholera-estate-3">Dholera Estates 3</ArrowLink>
            </ul>
          </div>

          <div>
            <FooterLabel>Navigation</FooterLabel>
            <h3 className="mt-3 text-[18px] font-extrabold tracking-[-0.04em] text-[#101827] sm:text-[24px]">Quick Links</h3>
            <span className="mt-4 block h-[3px] w-12 bg-linear-to-r from-[#fa7000] via-[#f90032] to-[#960aaa]" />
            <ul className="mt-6 space-y-2">{quickLinks.map((link) => <ArrowLink key={link.label} href={link.href}>{link.label}</ArrowLink>)}</ul>
          </div>

          <div>
            <FooterLabel>Stay connected</FooterLabel>
            <h3 className="mt-3 text-[18px] font-extrabold tracking-[-0.04em] text-[#101827] sm:text-[24px]">Follow Us</h3>
            <span className="mt-4 block h-[3px] w-12 bg-linear-to-r from-[#fa7000] via-[#f90032] to-[#960aaa]" />
            <div className="mt-5 flex flex-wrap gap-2">{socialLinks.map(({ label, href, icon: Icon, color }) => <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg text-base text-white shadow-[0_4px_10px_rgba(17,17,17,0.12)] transition-transform hover:-translate-y-1 sm:h-12 sm:w-12 sm:rounded-xl sm:text-xl" style={{ background: color }}><Icon /></a>)}</div>
            <p className="mt-5 max-w-sm text-[10px] leading-4 text-[#64718a] sm:text-[13px] sm:leading-5">Follow us for <strong className="font-semibold text-[#18243a]">Dholera Estates</strong> property updates and investment information.</p>
          </div>
        </div>
      </section>
      <div className="h-px bg-[linear-gradient(90deg,#0082fa_0%,#960aaa_46%,#f90032_70%,#fa7000_100%)]" />
      <div className="mx-auto max-w-[1600px] px-6 py-5 text-sm text-[#18243a] sm:px-10 lg:px-12"><p><strong>© 2026 Dholera Estates.</strong> All Rights Reserved.</p></div>
    </footer>
  );
}
