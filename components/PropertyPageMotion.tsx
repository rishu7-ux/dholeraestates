"use client";
import { useEffect } from "react";

export default function PropertyPageMotion() {
  useEffect(() => {
    const groups: Array<[string, string]> = [
      [".property-banner-inner > *", "motion-rise"],
      [".property-list-heading > *", "motion-rise"],
      [".listing-card", "motion-rise"],
      [".listing-specs > div", "motion-scale"],
      [".property-article > h2, .property-article > p, .property-article > ul, .property-article > .fact-table, .property-article > .infrastructure-grid, .property-article > .returns-note", "motion-rise"],
      [".fact-table > div", "motion-slide"],
      [".infrastructure-grid > div", "motion-scale"],
      [".property-sidebar > div", "motion-right"],
      [".faq-layout > div:first-child", "motion-left"],
      [".faq-list > details", "motion-right"],
      [".property-cta .shell > *", "motion-rise"],
    ];
    const elements: HTMLElement[] = [];
    groups.forEach(([selector, animation]) => document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
      element.classList.add("property-motion", animation);
      element.style.setProperty("--motion-delay", `${Math.min(index * 75, 375)}ms`);
      elements.push(element);
    }));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("motion-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -35px" });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
}
