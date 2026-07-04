import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export async function GET() {
  const items = await prisma.experience.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const responsibilities = Array.isArray(body.responsibilities)
    ? body.responsibilities
    : typeof body.responsibilities === "string"
      ? body.responsibilities
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean)
      : [];

  const item = await prisma.experience.create({
    data: {
      company: body.company,
      role: body.role,
      companyLogoUrl: body.companyLogoUrl || null,
      location: body.location || null,
      startDate: body.startDate,
      endDate: body.endDate || null,
      description: body.description || null,
      responsibilities,
      order: Number(body.order) || 0,
    },
  });
  return NextResponse.json(item, { status: 201 });
}
