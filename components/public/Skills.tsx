"use client";

import { useState } from "react";
import SectionLabel from "./SectionLabel";
import { getSkillIcon } from "@/lib/skillIcons";
import { FaCode, FaServer, FaDatabase, FaTools, FaLayerGroup, FaFileCode } from "react-icons/fa";

interface Skill {
  id: string;
  name: string;
  category: string;
}


const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Languages: FaFileCode,
  Frontend: FaCode,
  Backend: FaServer,
  Database: FaDatabase,
  Tools: FaTools,
};

export default function Skills({ skills }: { skills: Skill[] }) {
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    (acc[skill.category] ||= []).push(skill);
    return acc;
  }, {});

  const categories = Object.keys(grouped);
  const [activeTab, setActiveTab] = useState(categories[0] || "");

  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 md:px-8 py-20">
      <SectionLabel text="skills" />
      <h2 className="font-display text-2xl md:text-3xl font-bold text-paper mb-10">
        Tools of the trade
      </h2>

      {categories.length === 0 ? (
        <p className="text-muted">Skills coming soon.</p>
      ) : (
        <>
          {/* Category tab bar */}
          <div className="flex flex-wrap gap-2 mb-10 border-b border-editor-border pb-0">
            {categories.map((category) => {
              const Icon = categoryIcons[category] || FaLayerGroup;
              const isActive = activeTab === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`flex items-center gap-2 px-4 py-3 font-mono text-sm border-b-2 -mb-px transition-colors ${
                    isActive
                      ? "border-signal text-signal"
                      : "border-transparent text-muted hover:text-paper"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {category}
                  <span
                    className={`text-xs rounded-full px-1.5 py-0.5 ${
                      isActive
                        ? "bg-signal text-editor-bg"
                        : "bg-editor-panel text-muted border border-editor-border"
                    }`}
                  >
                    {grouped[category].length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Skill cards for the active category */}
          <div className="flex flex-wrap gap-5">
            {grouped[activeTab]?.map((skill) => {
              const Icon = getSkillIcon(skill.name);
              return (
                <div
                  key={skill.id}
                  className="flex flex-col items-center justify-center gap-4 rounded-xl border border-editor-border bg-editor-panel p-6 text-center hover:border-signal transition-colors w-40"
                >
                  <Icon className="w-10 h-10 text-signal" />
                  <span className="text-base text-paper font-medium">{skill.name}</span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}