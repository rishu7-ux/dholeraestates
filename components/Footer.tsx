import Link from "next/link";
import { site } from "@/lib/site";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/share/14nw1ZfSqB3/?mibextid=wwXIfr", icon: FaFacebookF },
  { label: "Instagram", href: "https://www.instagram.com/omana_projects", icon: FaInstagram },
  { label: "YouTube", href: "https://www.youtube.com/@omanaprojects", icon: FaYoutube },
  { label: "WhatsApp", href: "https://wa.me/919217104219", icon: FaWhatsapp },
];

export default function Footer() { return <footer className="footer"><div className="shell footer-grid"><div><div className="logo light"><span>DHOLERA</span><strong>ESTATES</strong></div><p>Guidance for residential plot buyers exploring opportunities in the wider Dholera region.</p><div className="footer-socials" aria-label="Social media links">{socials.map(({label,href,icon:Icon})=><Link key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}><Icon /></Link>)}</div></div><div><h3>Quick Links</h3><Link href="/">Home</Link><Link href="/properties">Properties</Link><Link href="/blog">Blog</Link><Link href="/contact-us">Contact Us</Link></div><div><h3>Contact</h3><a href={`tel:${site.phoneHref}`}>{site.phone}</a><a href={`mailto:${site.email}`}>{site.email}</a><p>{site.address}</p></div></div><div className="copyright">© {new Date().getFullYear()} Dholera Estates. All rights reserved. Property details are subject to verification and availability.</div></footer>; }
