import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export async function GET() {
  const contact = await prisma.contactInfo.findFirst();
  return NextResponse.json(contact);
}

export async function PUT(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const existing = await prisma.contactInfo.findFirst();

  const data = {
    email: body.email,
    phone: body.phone || null,
    whatsapp: body.whatsapp || null,
  };

  const contact = existing
    ? await prisma.contactInfo.update({ where: { id: existing.id }, data })
    : await prisma.contactInfo.create({ data });

  return NextResponse.json(contact);
}
