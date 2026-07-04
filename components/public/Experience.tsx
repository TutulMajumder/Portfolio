import Image from "next/image";
import SectionLabel from "./SectionLabel";
import { FaBriefcase, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  companyLogoUrl?: string | null;
  location?: string | null;
  startDate: string;
  endDate?: string | null;
  description?: string | null;
  responsibilities?: string[];
}

export default function Experience({ items }: { items: ExperienceItem[] }) {
  if (items.length === 0) return null;

  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 md:px-8 py-20">
      <SectionLabel text="experience" />
      <h2 className="font-display text-2xl md:text-3xl font-bold text-paper mb-12">
        Where I&apos;ve worked
      </h2>

      <div className="relative space-y-8 pl-14 md:pl-16">
        <div className="absolute left-5 md:left-6 top-2 bottom-2 w-px bg-editor-border" />

        {items.map((item) => {
          const isOngoing = !item.endDate;
          return (
            <div key={item.id} className="relative">
              <span
                className={`absolute -left-14 md:-left-16 top-0 flex h-10 w-10 rounded-full items-center justify-center border-4 border-editor-bg z-10 overflow-hidden ${
                  isOngoing ? "bg-signal" : "bg-editor-panel border-2 border-editor-border"
                }`}
              >
                {item.companyLogoUrl ? (
                  <Image
                    src={item.companyLogoUrl}
                    alt={item.company}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <FaBriefcase
                    className={isOngoing ? "text-editor-bg w-4 h-4" : "text-signal w-4 h-4"}
                  />
                )}
              </span>

              <div className="rounded-xl border border-editor-border bg-editor-panel p-7 hover:border-signal transition-colors">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs text-muted">
                    {item.startDate} — {item.endDate || "Present"}
                  </span>
                  {isOngoing && (
                    <span className="flex items-center gap-1.5 rounded-full bg-teal/10 border border-teal/40 px-2 py-0.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal" />
                      </span>
                      <span className="font-mono text-[10px] text-teal">Currently working</span>
                    </span>
                  )}
                </div>

                <h3 className="font-display font-semibold text-paper text-lg md:text-xl mt-2">
                  {item.role} <span className="text-teal font-normal">@ {item.company}</span>
                </h3>

                {item.location && (
                  <p className="flex items-center gap-1.5 text-muted text-xs mt-1.5">
                    <FaMapMarkerAlt className="w-3 h-3" />
                    {item.location}
                  </p>
                )}

                {item.description && (
                  <p className="text-muted text-sm mt-4 leading-relaxed">
                    {item.description}
                  </p>
                )}

                {item.responsibilities && item.responsibilities.length > 0 && (
                  <ul className="space-y-2 mt-4">
                    {item.responsibilities.map((r) => (
                      <li key={r} className="flex items-start gap-2.5 text-paper text-sm leading-relaxed">
                        <FaCheckCircle className="w-3.5 h-3.5 text-signal mt-0.5 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}