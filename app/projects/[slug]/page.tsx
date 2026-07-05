import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import TerminalWindow from "@/components/public/TerminalWindow";
import { getSkillIcon } from "@/lib/skillIcons";
import { FaGithub, FaExternalLinkAlt, FaCheckCircle } from "react-icons/fa";

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [project, profile] = await Promise.all([
    prisma.project.findUnique({ where: { slug } }),
    prisma.profile.findFirst(),
  ]);

  if (!project) notFound();

  return (
    <>
      <Navbar name={profile?.name || ""} resumeUrl={profile?.resumeUrl} />
      <main className="mx-auto max-w-6xl px-5 md:px-8 py-16">
        <Link
          href="/#projects"
          className="font-mono text-sm text-muted hover:text-signal transition-colors"
        >
          ← back to projects
        </Link>

        <div className="relative aspect-video w-full rounded-xl border border-editor-border overflow-hidden bg-editor-panel mt-6">
          {project.thumbnailUrl ? (
            <Image
              src={project.thumbnailUrl}
              alt={project.name}
              fill
              className="object-cover object-top"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center font-mono text-muted text-sm">
              preview.png
            </div>
          )}
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-bold text-paper mt-8">
          {project.name}
        </h1>

        <div className="grid lg:grid-cols-[1fr_300px] gap-8 mt-8">
          <div className="space-y-10">
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <div>
                <p className="font-mono text-sm text-teal mb-4">{"// key_features"}</p>
                <ul className="space-y-3">
                  {project.keyFeatures.map((feature: string) => (
                    <li key={feature} className="flex items-start gap-3 text-paper text-sm leading-relaxed">
                      <FaCheckCircle className="w-4 h-4 text-signal mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <p className="font-mono text-sm text-teal mb-4">{"// description"}</p>
              <TerminalWindow title="about.md">
                <p className="text-muted leading-relaxed whitespace-pre-line">
                  {project.fullDesc || project.shortDesc}
                </p>
              </TerminalWindow>
            </div>

            {project.challenges && (
              <div>
                <p className="font-mono text-sm text-teal mb-4">{"// challenges"}</p>
                <p className="text-muted leading-relaxed whitespace-pre-line">
                  {project.challenges}
                </p>
              </div>
            )}

            {project.futurePlans && (
              <div>
                <p className="font-mono text-sm text-teal mb-4">{"// future_plans"}</p>
                <p className="text-muted leading-relaxed whitespace-pre-line">
                  {project.futurePlans}
                </p>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-xl border border-editor-border bg-editor-panel p-6 space-y-6">
              <div>
                <p className="font-mono text-xs text-teal mb-3">tech_stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech: string) => {
                    const Icon = getSkillIcon(tech);
                    return (
                      <span
                        key={tech}
                        className="flex items-center gap-1.5 font-mono text-xs rounded-full border border-editor-border bg-editor-bg px-2.5 py-1 text-paper"
                      >
                        <Icon className="w-3 h-3 text-signal" />
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-editor-border pt-6 space-y-3">
                <p className="font-mono text-xs text-teal mb-1">links</p>
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-md bg-signal text-editor-bg font-mono text-sm font-medium px-4 py-2.5 hover:brightness-110 transition w-full"
                  >
                    <FaExternalLinkAlt /> live demo
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-md border border-editor-border text-paper font-mono text-sm font-medium px-4 py-2.5 hover:border-signal transition w-full"
                  >
                    <FaGithub /> source code
                  </a>
                )}
                {!project.liveLink && !project.githubLink && (
                  <p className="text-muted text-xs">No links added yet.</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer name={profile?.name || ""} />
    </>
  );
}