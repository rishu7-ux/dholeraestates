"use client";
import { useEffect } from "react";

export default function GlobalMotion() {
  useEffect(() => {
    const selectors = [
      "main:not(.property-page) > section",
      "main:not(.property-page) .section-head",
      "main:not(.property-page) .split > *",
      "main:not(.property-page) .cards > *",
      "main:not(.property-page) .info-grid > *",
      "main:not(.property-page) .testimonial-grid > *",
      "main:not(.property-page) .contact-grid > *",
      ".footer-grid > *",
    ];
    const elements: HTMLElement[] = [];
    selectors.forEach((selector) => document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        if (element.dataset.globalMotion) return;
        element.dataset.globalMotion = "true";
        element.classList.add("global-reveal");
        element.style.setProperty("--global-delay", `${Math.min((index % 4) * 90, 270)}ms`);
        elements.push(element);
    }));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("global-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.1, rootMargin: "0px 0px -30px" });
    elements.forEach((element) => observer.observe(element));
    document.body.classList.add("motion-enabled");
    return () => { observer.disconnect(); document.body.classList.remove("motion-enabled"); };
  }, []);
  return null;
}
