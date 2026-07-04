import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await requireAdmin(req);
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const responsibilities = Array.isArray(body.responsibilities)
    ? body.responsibilities
    : typeof body.responsibilities === "string"
      ? body.responsibilities
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean)
      : [];

  const item = await prisma.experience.update({
    where: { id },
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
  await prisma.experience.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
