"use client";
import { useState } from "react";

export default function LeadForm({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<"idle"|"loading"|"success"|"error">("idle");
  async function submit(formData: FormData) {
    setState("loading");
    const payload = Object.fromEntries(formData);
    try { const response = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); if (!response.ok) throw new Error(); setState("success"); }
    catch { setState("error"); }
  }
  if (state === "success") return <div className="form-message success"><strong>Thank you!</strong><span>Our property advisor will contact you shortly.</span></div>;
  return <form action={submit} className={compact ? "lead-form compact" : "lead-form"}>
    <label>Full Name<input name="name" minLength={3} required placeholder="Enter your name" /></label>
    <label>Phone Number<input name="phone" inputMode="numeric" pattern="[6-9][0-9]{9}" required placeholder="10-digit mobile number" /></label>
    <label>Email Address<input name="email" type="email" required placeholder="Enter your email" /></label>
    {!compact && <label>Your Message<textarea name="message" rows={3} placeholder="Plot size, budget or site-visit preference" /></label>}
    <button className="btn" disabled={state === "loading"}>{state === "loading" ? "Submitting…" : "Request a Call Back"}</button>
    {state === "error" && <p className="error">Could not submit right now. Please call us directly.</p>}
  </form>;
}
