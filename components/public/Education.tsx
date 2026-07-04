import SectionLabel from "./SectionLabel";
import { FaGraduationCap } from "react-icons/fa";

interface EducationItem {
  id: string;
  institute: string;
  degree: string;
  fieldOfStudy?: string | null;
  startYear: string;
  endYear?: string | null;
  result?: string | null;
  description?: string | null;
}

export default function Education({ items }: { items: EducationItem[] }) {
  if (items.length === 0) return null;

  return (
    <section id="education" className="mx-auto max-w-6xl px-5 md:px-8 py-20">
      <SectionLabel text="education" />
      <h2 className="font-display text-2xl md:text-3xl font-bold text-paper mb-12">
        Academic background
      </h2>

      <div className="relative space-y-8 pl-14 md:pl-16">
        <div className="absolute left-5 md:left-6 top-2 bottom-2 w-px bg-editor-border" />

        {items.map((item) => {
          const isOngoing = !item.endYear;
          return (
            <div key={item.id} className="relative">
              <span
                className={`absolute -left-14 md:-left-16 top-0 flex h-10 w-10 rounded-full items-center justify-center border-4 border-editor-bg z-10 ${
                  isOngoing ? "bg-signal" : "bg-editor-panel border-2 border-editor-border"
                }`}
              >
                <FaGraduationCap
                  className={isOngoing ? "text-editor-bg w-4 h-4" : "text-signal w-4 h-4"}
                />
              </span>

              <div className="rounded-xl border border-editor-border bg-editor-panel p-7 hover:border-signal transition-colors">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs text-muted">
                    {item.startYear} — {item.endYear || "Present"}
                  </span>
                  {isOngoing && (
                    <span className="flex items-center gap-1.5 rounded-full bg-teal/10 border border-teal/40 px-2 py-0.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal" />
                      </span>
                      <span className="font-mono text-[10px] text-teal">In progress</span>
                    </span>
                  )}
                </div>

                <h3 className="font-display font-semibold text-paper text-lg md:text-xl mt-2">
                  {item.degree}
                  {item.fieldOfStudy ? ` in ${item.fieldOfStudy}` : ""}
                </h3>
                <p className="text-teal text-sm mt-1.5">{item.institute}</p>

                {item.result && (
                  <div className="inline-flex items-center gap-2 rounded-md bg-editor-bg border border-editor-border px-3 py-1.5 mt-4">
                    <span className="font-mono text-xs text-muted">Result</span>
                    <span className="font-mono text-xs text-signal font-medium">
                      {item.result}
                    </span>
                  </div>
                )}

                {item.description && (
                  <p className="text-muted text-sm mt-4 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}