"use client";

import { useState } from "react";
import SectionLabel from "./SectionLabel";
import ProjectCard from "./ProjectCard";

interface ProjectItem {
  id: string;
  name: string;
  slug: string;
  thumbnailUrl?: string | null;
  shortDesc: string;
  liveLink?: string | null;
  githubLink?: string | null;
}

const INITIAL_COUNT = 3;

export default function Projects({ items }: { items: ProjectItem[] }) {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? items : items.slice(0, INITIAL_COUNT);
  const hasMore = items.length > INITIAL_COUNT && !showAll;

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 md:px-8 py-20">
      <SectionLabel text="projects" />
      <h2 className="font-display text-2xl md:text-3xl font-bold text-paper mb-10">
        Things I&apos;ve built
      </h2>

      {items.length === 0 ? (
        <p className="text-muted">Projects coming soon.</p>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            {visibleItems.map((item) => (
              <ProjectCard key={item.id} {...item} />
            ))}
          </div>

          {items.length > INITIAL_COUNT && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-2 rounded-md border border-editor-border hover:border-signal text-paper font-mono text-sm px-5 py-3 transition-colors"
              >
                {showAll
                  ? "Show less ↑"
                  : `Load more projects (${items.length - INITIAL_COUNT} more)`}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}