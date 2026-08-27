"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import TopBar from "./TopBar";
import { FaPhoneAlt } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { site } from "@/lib/site";

const links=[{label:"Home",href:"/"},{label:"Properties",href:"/properties"},{label:"About Us",href:"/about-us"},{label:"Blog",href:"/blog"},{label:"Contact Us",href:"/contact-us"}];
export default function Header(){const[open,setOpen]=useState(false);return <><TopBar/><header className="header"><div className="shell nav"><Link href="/" className="logo header-logo" onClick={()=>setOpen(false)} aria-label="Omana Projects home"><Image src="/images/logo.png" alt="Omana Projects" width={1080} height={1080} className="header-logo-image" priority/></Link><nav aria-label="Main navigation">{links.map(link=><Link key={link.href} href={link.href}>{link.label}</Link>)}</nav><div className="nav-actions"><a href={`tel:${site.phoneHref}`} className="nav-phone" aria-label={`Call ${site.phone}`}><span><FaPhoneAlt/></span><strong>{site.phone}</strong></a><button type="button" className="menu-toggle" onClick={()=>setOpen(value=>!value)} aria-label={open?"Close navigation menu":"Open navigation menu"} aria-expanded={open}>{open?<HiX/>:<HiMenuAlt3/>}</button></div></div>{open&&<><button className="mobile-nav-backdrop" onClick={()=>setOpen(false)} aria-label="Close menu"/><nav className="mobile-nav" aria-label="Mobile navigation">{links.map((link,index)=><Link key={link.href} href={link.href} onClick={()=>setOpen(false)} style={{animationDelay:`${index*55}ms`}}>{link.label}</Link>)}<a href={`tel:${site.phoneHref}`} className="mobile-nav-call" onClick={()=>setOpen(false)}><FaPhoneAlt/>{site.phone}</a></nav></>}</header></>}
