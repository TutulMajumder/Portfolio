import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  const [skills, education, experience, projects, socialLinks, profile] =
    await Promise.all([
      prisma.skill.count(),
      prisma.education.count(),
      prisma.experience.count(),
      prisma.project.count(),
      prisma.socialLink.count(),
      prisma.profile.findFirst(),
    ]);

  const cards = [
    { label: "Skills", count: skills, href: "/admin/skills" },
    { label: "Education Entries", count: education, href: "/admin/education" },
    { label: "Experience Entries", count: experience, href: "/admin/experience" },
    { label: "Projects", count: projects, href: "/admin/projects" },
    { label: "Social Links", count: socialLinks, href: "/admin/social-contact" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-100 mb-2">
        Welcome{profile ? `, ${profile.name}` : ""}
      </h1>
      <p className="text-stone-500 mb-8">
        Manage every section of your public portfolio from here.
      </p>

      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-stone-900 border border-stone-800 rounded-lg p-5 hover:border-amber-600 transition-colors"
          >
            <p className="text-3xl font-semibold text-amber-400">{card.count}</p>
            <p className="text-stone-400 text-sm mt-1">{card.label}</p>
          </Link>
        ))}
      </div>

      {!profile && (
        <div className="mt-8 bg-amber-950/30 border border-amber-900 rounded-lg p-4">
          <p className="text-amber-300 text-sm">
            Your profile isn&apos;t set up yet.{" "}
            <Link href="/admin/profile" className="underline">
              Add your name, designation, and about-me
            </Link>{" "}
            to get your hero section live.
          </p>
        </div>
      )}
    </div>
  );
}
