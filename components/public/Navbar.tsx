"use client";

import { useState } from "react";
import { FaDownload } from "react-icons/fa";

const links = [
  { href: "#about", label: "about" },
  { href: "#skills", label: "skills" },
  { href: "#services", label: "services" },
  { href: "#projects", label: "projects" },
  { href: "#education", label: "education" },
  { href: "#experience", label: "experience" },
  { href: "#contact", label: "contact" },
];

function getResumeDownloadUrl(resumeUrl: string, filename: string) {
  const safeName = filename.replace(/[^a-zA-Z0-9_-]/g, "_");
  return resumeUrl.replace("/upload/", `/upload/fl_attachment:${safeName}/`);
}

interface NavbarProps {
  name: string;
  resumeUrl?: string | null;
}

export default function Navbar({ name, resumeUrl }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const resumeHref = resumeUrl ? getResumeDownloadUrl(resumeUrl, `${name || "Resume"}_Resume`) : null;

  return (
    <header className="sticky top-0 z-50 border-b border-editor-border bg-editor-bg/85 backdrop-blur">
      <nav className="mx-auto max-w-6xl px-5 md:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="font-display font-bold text-paper text-lg">
          {name || "portfolio"}
          <span className="text-signal">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 font-mono text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-muted hover:text-signal transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {resumeHref && (
            <a
              href={resumeHref}
              className="hidden md:inline-flex items-center gap-2 rounded-md bg-signal text-editor-bg font-mono text-xs font-medium px-3.5 py-2 hover:brightness-110 transition"
            >
              <FaDownload className="w-3 h-3" /> resume
            </a>
          )}

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span
              className={`block h-0.5 w-6 bg-paper transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-paper transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-paper transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav >
      
      {open && (
        <ul className="md:hidden flex flex-col border-t border-editor-border bg-editor-bg px-5 py-4 gap-1 font-mono text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-muted hover:text-signal transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          {resumeHref && (
            <li>
              <a
                href={resumeHref}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 py-2.5 text-signal"
              >
                <FaDownload className="w-3 h-3" /> download resume
              </a>
            </li>
          )}
        </ul>
      )}
    </header>
  );
}