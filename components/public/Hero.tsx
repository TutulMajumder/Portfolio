"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import TerminalWindow from "./TerminalWindow";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaLink } from "react-icons/fa";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  facebook: FaFacebook,
};

interface HeroProps {
  name: string;
  designation: string;
  photoUrl?: string | null;
  resumeUrl?: string | null;
  availableForHire?: boolean;
  socialLinks: { id: string; platform: string; url: string }[];
}

function getResumeDownloadUrl(resumeUrl: string, filename: string) {
  const safeName = filename.replace(/[^a-zA-Z0-9_-]/g, "_");
  return resumeUrl.replace("/upload/", `/upload/fl_attachment:${safeName}/`);
}

const RESUME_BUTTON_CLASS =
  "inline-flex items-center gap-2 rounded-md bg-signal text-editor-bg font-mono text-sm font-medium px-5 py-3 hover:brightness-110 transition";

const SOCIAL_ICON_CLASS =
  "h-10 w-10 flex items-center justify-center rounded-md border border-editor-border text-muted hover:text-signal hover:border-signal transition-colors";

export default function Hero({
  name,
  designation,
  photoUrl,
  resumeUrl,
  availableForHire,
  socialLinks,
}: HeroProps) {
  const resumeHref = resumeUrl
    ? getResumeDownloadUrl(resumeUrl, `${name || "Resume"}_Resume`)
    : "#";

  return (
    <section
      id="home"
      className="mx-auto max-w-6xl px-5 md:px-8 pt-16 pb-24 md:pt-24 md:pb-32"
    >
      <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <TerminalWindow title="hello.ts">
            <p className="font-mono text-sm text-muted mb-2">
              <span className="text-teal">const</span> developer ={" "}
              <span className="text-signal">{"{"}</span>
            </p>
            <div className="pl-4">
              <p className="font-mono text-sm text-muted mb-1">
                name: <span className="text-paper">&quot;{name || "Your Name"}&quot;</span>,
              </p>
              <p className="font-mono text-sm text-muted">
                role:{" "}
                <span className="text-paper">
                  &quot;{designation || "Full Stack Developer"}&quot;
                </span>
                <span className="inline-block w-2 h-4 bg-signal ml-1 align-middle animate-pulse" />
              </p>
            </div>

            {availableForHire && (
              <div className="inline-flex items-center gap-2 rounded-full border border-teal/40 bg-teal/10 px-3 py-1.5 mt-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
                </span>
                <span className="font-mono text-xs text-teal">Available for hire</span>
              </div>
            )}
            <p className="font-mono text-sm text-signal mt-1">{"}"}</p>

            <h1 className="font-display text-3xl md:text-5xl font-bold text-paper mt-6 leading-tight">
              Building things for the web,
              <br />
              one commit at a time.
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <a href={resumeHref} aria-disabled={!resumeUrl} className={RESUME_BUTTON_CLASS}>
                $ download resume
              </a>

              <div className="flex items-center gap-3">
                {socialLinks.map((link) => {
                  const Icon = iconMap[link.platform] || FaLink;
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.platform}
                      className={SOCIAL_ICON_CLASS}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </TerminalWindow>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="justify-self-center"
        >
          <div className="relative h-64 w-64 md:h-80 md:w-80 rounded-2xl border border-editor-border bg-editor-panel overflow-hidden">
            {photoUrl ? (
              <Image src={photoUrl} alt={name} fill className="object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center font-mono text-muted text-sm">
                photo.jpg
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}