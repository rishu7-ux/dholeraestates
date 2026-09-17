"use client";
import { useEffect } from "react";
import Link from "next/link";
import { plots } from "@/lib/site";

export default function AnimatedPropertySections() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.14 });
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return <>
    <section className="section pale featured-section"><div className="decor-circle circle-one"/><div className="decor-circle circle-two"/><div className="shell section-layer">
      <div className="section-head reveal-up" data-reveal><div><span className="eyebrow">Featured properties</span><h2>Find Your Dream Plot</h2><p>Explore the residential plot options currently promoted by Dholera Estates.</p></div><Link href="/properties" className="text-link arrow-link">View all properties <span>→</span></Link></div>
      <div className="cards">{plots.map((plot, i) => <article className="property-card animated-card reveal-up" data-reveal style={{transitionDelay:`${i*140}ms`}} key={plot.size}><div className={`property-image property-${i+1}`} style={{backgroundImage:"url('/images/p1.jpg')"}}><span>For Sale</span><div className="image-shade"/><Link href="/properties" className="quick-view">Quick View</Link></div><div className="card-body"><small>RESIDENTIAL PLOTS</small><h3>{plot.label}</h3><div className="meta"><span>◫ {plot.size}</span><span>Dholera, Gujarat</span></div><Link href="/contact-us" className="btn small">Get Details <b>→</b></Link></div></article>)}</div>
    </div></section>
    <section className="section why animated-why" style={{backgroundImage:"linear-gradient(120deg, rgba(23,20,18,.92), rgba(16,63,128,.88)), url('/images/p1.jpg')",backgroundPosition:"center",backgroundSize:"cover"}}><div className="why-glow"/><div className="shell split section-layer"><div className="reveal-left" data-reveal><span className="eyebrow light-text">Why choose us</span><h2>Welcome to Dholera Estates</h2><p>We help buyers explore residential plots through clear conversations around project location, plot sizes, pricing, availability and documents to review before making a decision.</p><div className="stats"><div><strong>2024</strong><span>Established</span></div><div><strong>1-to-1</strong><span>Buyer Support</span></div></div></div><div className="feature-list">{["Transparent project information","Assistance arranging site visits","Support throughout the enquiry process","Due-diligence-first buying guidance"].map((x,i)=><div className="reveal-right why-item" data-reveal style={{transitionDelay:`${i*110}ms`}} key={x}><b>0{i+1}</b><span>{x}</span><i>→</i></div>)}</div></div></section>
  </>;
}
