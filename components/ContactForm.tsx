"use client";
import { useState } from "react";

export default function ContactForm() {
  const [state, setState] = useState<"idle"|"loading"|"success"|"error">("idle");
  async function submit(formData: FormData) {
    setState("loading");
    try {
      const response = await fetch("/api/contact-messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({...Object.fromEntries(formData), consent: formData.get("consent") === "on"}) });
      if (!response.ok) throw new Error();
      setState("success");
    } catch { setState("error"); }
  }
  if (state === "success") return <div className="form-message success"><strong>Thank you for contacting us.</strong><span>Our team will respond shortly.</span></div>;
  return <form action={submit} className="lead-form contact-form">
    <div className="form-row"><label>Full Name<input name="name" minLength={3} maxLength={80} required placeholder="Enter your full name" /></label><label>Phone Number<input name="phone" inputMode="numeric" pattern="[6-9][0-9]{9}" required placeholder="10-digit mobile number" /></label></div>
    <div className="form-row"><label>Email Address<input name="email" type="email" required placeholder="Enter your email" /></label><label>Property<select name="propertyType" required defaultValue="dholera-estates"><option value="dholera-estates">Dholera Estates Residential Plot</option></select></label></div>
    <label>Budget Range<select name="budget" required defaultValue=""><option value="" disabled>Select your budget</option><option value="below-20-lakhs">Below ₹20 Lakhs</option><option value="20-50-lakhs">₹20–₹50 Lakhs</option><option value="50-lakhs-1-crore">₹50 Lakhs–₹1 Crore</option><option value="above-1-crore">Above ₹1 Crore</option></select></label>
    <label>Message<textarea name="comments" maxLength={500} rows={5} placeholder="Tell us the plot size or information you need" /></label>
    <label className="consent"><input name="consent" type="checkbox" required /> <span>I agree to be contacted about Dholera Estates property enquiries.</span></label>
    <button className="btn" disabled={state === "loading"}>{state === "loading" ? "Submitting…" : "Submit Enquiry"}</button>
    {state === "error" && <p className="error">Submission failed. Please try again or call our team.</p>}
  </form>;
}
