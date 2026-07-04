import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";
import { slugify } from "@/lib/api-auth";

export async function GET() {
  const items = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const baseSlug = slugify(body.name);
  let slug = baseSlug;
  let counter = 1;
  while (await prisma.project.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter++}`;
  }

  const techStack = Array.isArray(body.techStack)
    ? body.techStack
    : typeof body.techStack === "string"
      ? body.techStack
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean)
      : [];

  const keyFeatures = Array.isArray(body.keyFeatures)
    ? body.keyFeatures
    : typeof body.keyFeatures === "string"
      ? body.keyFeatures
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean)
      : [];

  const item = await prisma.project.create({
    data: {
      name: body.name,
      slug,
      thumbnailUrl: body.thumbnailUrl || null,
      shortDesc: body.shortDesc,
      fullDesc: body.fullDesc || null,
      keyFeatures,
      techStack,
      liveLink: body.liveLink || null,
      githubLink: body.githubLink || null,
      challenges: body.challenges || null,
      futurePlans: body.futurePlans || null,
      featured: !!body.featured,
      order: Number(body.order) || 0,
    },
  });
  return NextResponse.json(item, { status: 201 });
}
