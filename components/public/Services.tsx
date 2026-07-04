import SectionLabel from "./SectionLabel";
import {
  FaCode,
  FaPaintBrush,
  FaServer,
  FaDatabase,
  FaMobileAlt,
  FaRocket,
  FaBug,
  FaComments,
  FaLayerGroup,
} from "react-icons/fa";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon?: string | null;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  code: FaCode,
  design: FaPaintBrush,
  server: FaServer,
  database: FaDatabase,
  mobile: FaMobileAlt,
  rocket: FaRocket,
  bug: FaBug,
  chat: FaComments,
};

export default function Services({ items }: { items: ServiceItem[] }) {
  if (items.length === 0) return null;

  return (
    <section id="services" className="mx-auto max-w-6xl px-5 md:px-8 py-20">
      <SectionLabel text="services" />
      <h2 className="font-display text-2xl md:text-3xl font-bold text-paper mb-10">
        What I can help with
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {items.map((service) => {
          const Icon = (service.icon && iconMap[service.icon]) || FaLayerGroup;
          return (
            <div
              key={service.id}
              className="rounded-xl border border-editor-border bg-editor-panel p-6 hover:border-signal transition-colors"
            >
              <span className="h-11 w-11 rounded-md bg-editor-bg border border-editor-border flex items-center justify-center mb-4">
                <Icon className="text-signal w-4 h-4" />
              </span>
              <h3 className="font-display font-semibold text-paper text-lg">
                {service.title}
              </h3>
              <p className="text-muted text-sm mt-2 leading-relaxed">
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}