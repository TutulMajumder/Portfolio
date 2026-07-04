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
  const item = await prisma.education.update({
    where: { id },
    data: {
      institute: body.institute,
      degree: body.degree,
      fieldOfStudy: body.fieldOfStudy || null,
      startYear: body.startYear,
      endYear: body.endYear || null,
      result: body.result || null,
      description: body.description || null,
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
  await prisma.education.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
