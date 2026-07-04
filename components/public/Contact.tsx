"use client";

import { useState } from "react";
import SectionLabel from "./SectionLabel";
import { FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";

interface ContactProps {
  email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
}

export default function Contact({ email, phone, whatsapp }: ContactProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message.");
      }
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 md:px-8 py-20">
      <SectionLabel text="contact" />
      <h2 className="font-display text-2xl md:text-3xl font-bold text-paper mb-4">
        Let&apos;s work together
      </h2>
      <p className="text-muted max-w-xl mb-10">
        Have a project in mind, or just want to say hi? Send a message below, or reach out directly.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-muted mb-1.5 block">Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-md bg-editor-panel border border-editor-border px-4 py-3 text-paper focus:outline-none focus:ring-2 focus:ring-signal"
            />
          </div>
          <div>
            <label className="text-sm text-muted mb-1.5 block">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-md bg-editor-panel border border-editor-border px-4 py-3 text-paper focus:outline-none focus:ring-2 focus:ring-signal"
            />
          </div>
          <div>
            <label className="text-sm text-muted mb-1.5 block">Message</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-md bg-editor-panel border border-editor-border px-4 py-3 text-paper focus:outline-none focus:ring-2 focus:ring-signal"
            />
          </div>

          {status === "sent" && (
            <p className="text-sm text-teal bg-teal/10 border border-teal/40 rounded-md px-3 py-2">
              Message sent — thanks for reaching out, I&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && error && (
            <p className="text-sm text-rose bg-rose/10 border border-rose/40 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center gap-2 rounded-md bg-signal text-editor-bg font-mono text-sm font-medium px-5 py-3 hover:brightness-110 disabled:opacity-50 transition"
          >
            {status === "sending" ? "Sending..." : "Send message"}
          </button>
        </form>

        {/* Direct contact info */}
        <div className="space-y-4">
          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 rounded-xl border border-editor-border bg-editor-panel p-5 hover:border-signal transition-colors"
            >
              <FaEnvelope className="text-signal shrink-0" />
              <span className="text-paper text-sm break-all">{email}</span>
            </a>
          )}
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-3 rounded-xl border border-editor-border bg-editor-panel p-5 hover:border-signal transition-colors"
            >
              <FaPhone className="text-signal shrink-0" />
              <span className="text-paper text-sm">{phone}</span>
            </a>
          )}
          {whatsapp && (
            <a
              href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-editor-border bg-editor-panel p-5 hover:border-signal transition-colors"
            >
              <FaWhatsapp className="text-signal shrink-0" />
              <span className="text-paper text-sm">{whatsapp}</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}