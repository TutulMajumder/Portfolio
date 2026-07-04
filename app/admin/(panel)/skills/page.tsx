"use client";

import { useEffect, useState } from "react";
import { FaCode, FaServer, FaDatabase, FaTools, FaLayerGroup, FaFileCode, FaTimes } from "react-icons/fa";
import { getSkillIcon } from "@/lib/skillIcons";

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  order: number;
}

const CATEGORIES = [
  { key: "Languages", icon: FaFileCode },
  { key: "Frontend", icon: FaCode },
  { key: "Backend", icon: FaServer },
  { key: "Database", icon: FaDatabase },
  { key: "Tools", icon: FaTools },
  { key: "Other", icon: FaLayerGroup },
];

export default function SkillsAdminPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Frontend");
  const [newSkillName, setNewSkillName] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadSkills() {
    setLoading(true);
    const res = await fetch("/api/skills");
    const data = await res.json();
    setSkills(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    loadSkills();
  }, []);

  const skillsInTab = skills.filter((s) => s.category === activeTab);

  async function handleAddSkill(e: React.FormEvent) {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    setAdding(true);
    setError(null);
    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newSkillName.trim(),
          category: activeTab,
          level: 80,
          order: skillsInTab.length,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add skill.");
      }
      setNewSkillName("");
      await loadSkills();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add skill.");
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/skills/${id}`, { method: "DELETE" });
    await loadSkills();
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-100 mb-2">Skills</h1>
      <p className="text-stone-500 mb-8">
        Pick a category tab, then add skills to it — they show up as cards in that category on your public site.
      </p>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-stone-800">
        {CATEGORIES.map(({ key, icon: Icon }) => {
          const count = skills.filter((s) => s.category === key).length;
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                isActive
                  ? "border-amber-500 text-amber-400"
                  : "border-transparent text-stone-500 hover:text-stone-300"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {key}
              <span
                className={`text-xs rounded-full px-1.5 py-0.5 ${
                  isActive ? "bg-amber-500 text-stone-950" : "bg-stone-800 text-stone-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Add skill form for the active tab */}
      <form onSubmit={handleAddSkill} className="flex gap-3 mb-8">
        <input
          type="text"
          value={newSkillName}
          onChange={(e) => setNewSkillName(e.target.value)}
          placeholder={`Add a ${activeTab} skill, e.g. ${
            activeTab === "Frontend" ? "JavaScript" : activeTab === "Backend" ? "Python" : activeTab === "Database" ? "MySQL" : "Git"
          }`}
          className="flex-1 rounded-md bg-stone-900 border border-stone-700 px-4 py-3 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <button
          type="submit"
          disabled={adding || !newSkillName.trim()}
          className="rounded-md bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-stone-950 font-medium px-5 py-3 transition-colors whitespace-nowrap"
        >
          {adding ? "Adding..." : "+ Add"}
        </button>
      </form>

      {error && (
        <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-md px-3 py-2 mb-6">
          {error}
        </p>
      )}

      {/* Skill cards for the active tab */}
      {loading ? (
        <p className="text-stone-500">Loading...</p>
      ) : skillsInTab.length === 0 ? (
        <p className="text-stone-500">
          No {activeTab} skills yet — add your first one above.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {skillsInTab.map((skill) => {
            const Icon = getSkillIcon(skill.name);
            return (
              <div
                key={skill.id}
                className="group relative flex flex-col items-center justify-center gap-3 rounded-xl bg-stone-900 border border-stone-700 hover:border-amber-500 p-5 text-center transition-colors"
              >
                <button
                  onClick={() => handleDelete(skill.id)}
                  aria-label={`Remove ${skill.name}`}
                  className="absolute top-2 right-2 h-6 w-6 flex items-center justify-center rounded-full text-stone-600 hover:text-red-400 hover:bg-red-950/40 opacity-0 group-hover:opacity-100 transition"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
                <Icon className="w-8 h-8 text-amber-400" />
                <span className="text-sm text-stone-100 font-medium">{skill.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}