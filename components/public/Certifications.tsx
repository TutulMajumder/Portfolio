import Image from "next/image";
import Link from "next/link";
import SectionLabel from "./SectionLabel";
import { FaCertificate, FaExternalLinkAlt } from "react-icons/fa";

interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string | null;
  imageUrl?: string | null;
}

export default function Certifications({ items }: { items: CertificationItem[] }) {
  if (items.length === 0) return null;

  return (
    <section id="certifications" className="mx-auto max-w-6xl px-5 md:px-8 py-20">
      <SectionLabel text="certifications" />
      <h2 className="font-display text-2xl md:text-3xl font-bold text-paper mb-10">
        Certifications
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((cert) => (
          <div
            key={cert.id}
            className="rounded-xl border border-editor-border bg-editor-panel overflow-hidden hover:border-signal transition-colors flex flex-col"
          >
            <div className="relative aspect-video w-full bg-white p-3">
              {cert.imageUrl ? (
                <Image
                  src={cert.imageUrl}
                  alt={cert.name}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <FaCertificate className="text-muted w-8 h-8" />
                </div>
              )}
            </div>

            <div className="p-6 flex flex-col flex-1">
              <p className="font-mono text-xs text-muted mb-2">{cert.issueDate}</p>
              <h3 className="font-display font-semibold text-paper text-lg leading-snug">
                {cert.name}
              </h3>
              <p className="text-teal text-sm mt-2 flex-1">{cert.issuer}</p>
              {cert.credentialUrl && (
                <Link
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-signal hover:brightness-110 mt-3 w-fit"
                >
                  view credential <FaExternalLinkAlt className="w-2.5 h-2.5" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}