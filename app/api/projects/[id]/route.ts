import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const item = await prisma.project.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await requireAdmin(req);
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

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

  const item = await prisma.project.update({
    where: { id },
    data: {
      name: body.name,
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
  return NextResponse.json(item);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await requireAdmin(req);
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
