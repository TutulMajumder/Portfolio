import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export async function GET() {
  const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(skills);
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const skill = await prisma.skill.create({
    data: {
      name: body.name,
      category: body.category,
      level: Number(body.level) || 80,
      order: Number(body.order) || 0,
    },
  });
  return NextResponse.json(skill, { status: 201 });
}
