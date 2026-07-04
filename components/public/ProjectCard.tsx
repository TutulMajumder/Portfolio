import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

interface ProjectCardProps {
  name: string;
  slug: string;
  thumbnailUrl?: string | null;
  shortDesc: string;
  liveLink?: string | null;
  githubLink?: string | null;
}

export default function ProjectCard({
  name,
  slug,
  thumbnailUrl,
  shortDesc,
  liveLink,
  githubLink,
}: ProjectCardProps) {
  return (
    <div className="rounded-xl border border-editor-border bg-editor-panel overflow-hidden flex flex-col hover:border-signal transition-colors">
      <div className="relative h-48 w-full bg-black/20">
        {thumbnailUrl ? (
          <Image src={thumbnailUrl} alt={name} fill className="object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center font-mono text-muted text-sm">
            preview.png
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-paper text-lg mb-2">
          {name}
        </h3>
        <p className="text-muted text-sm leading-relaxed flex-1 line-clamp-3">
          {shortDesc}
        </p>

        <div className="flex items-center gap-2 mt-4 flex-wrap">
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-md bg-signal text-editor-bg font-mono text-xs font-medium px-3 py-1.5 hover:brightness-110 transition"
            >
              <FaExternalLinkAlt className="w-2.5 h-2.5" /> Demo
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-md border border-editor-border text-paper font-mono text-xs font-medium px-3 py-1.5 hover:border-signal transition"
            >
              <FaGithub className="w-3 h-3" /> Code
            </a>
          )}
        </div>

        <Link
          href={`/projects/${slug}`}
          className="mt-3 inline-flex items-center gap-1.5 font-mono text-sm text-signal hover:brightness-110 w-fit"
        >
          view details <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}