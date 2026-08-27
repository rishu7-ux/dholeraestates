"use client";
import Link from "next/link";
import { FaEnvelope, FaFacebookF, FaInstagram, FaPhoneAlt, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { site } from "@/lib/site";

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/share/14nw1ZfSqB3/?mibextid=wwXIfr", icon: FaFacebookF },
  { label: "Instagram", href: "https://www.instagram.com/omana_projects", icon: FaInstagram },
  { label: "YouTube", href: "https://www.youtube.com/@omanaprojects", icon: FaYoutube },
  { label: "WhatsApp", href: "https://wa.me/919217104219", icon: FaWhatsapp },
];

export default function TopBar() {
  return <div className="estate-topbar"><div className="topbar-glow glow-left"/><div className="topbar-glow glow-right"/><div className="topbar-shell">
    <div className="topbar-contact">
      <a href={`tel:${site.phoneHref}`} aria-label={`Call ${site.phone}`}><span className="topbar-icon"><FaPhoneAlt /></span><strong>{site.phone}</strong></a>
      <i />
      <a href={`mailto:${site.email}`} aria-label={`Email ${site.email}`}><span className="topbar-icon"><FaEnvelope /></span><strong>{site.email}</strong></a>
    </div>
    <div className="topbar-social"><span>Follow Us</span>{socials.map(({label,href,icon:Icon})=><Link key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}><Icon /></Link>)}</div>
  </div></div>;
}
