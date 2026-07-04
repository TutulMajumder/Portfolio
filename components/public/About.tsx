import SectionLabel from "./SectionLabel";

interface AboutProps {
  aboutMe: string;
  hobbies?: string | null;
}

export default function About({ aboutMe, hobbies }: AboutProps) {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 md:px-8 py-20">
      <SectionLabel text="about" />
      <h2 className="font-display text-2xl md:text-3xl font-bold text-paper mb-8">
        A little about me
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4 text-muted leading-relaxed whitespace-pre-line">
          {aboutMe}
        </div>
        {hobbies && (
          <div className="rounded-xl border border-editor-border bg-editor-panel p-5">
            <p className="font-mono text-xs text-teal mb-2">outside_of_code</p>
            <p className="text-paper text-sm leading-relaxed whitespace-pre-line">
              {hobbies}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
