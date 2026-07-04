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
  const item = await prisma.certification.update({
    where: { id },
    data: {
      name: body.name,
      issuer: body.issuer,
      issueDate: body.issueDate,
      credentialUrl: body.credentialUrl || null,
      imageUrl: body.imageUrl || null,
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
  await prisma.certification.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
