import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export async function GET() {
  const items = await prisma.certification.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const item = await prisma.certification.create({
    data: {
      name: body.name,
      issuer: body.issuer,
      issueDate: body.issueDate,
      credentialUrl: body.credentialUrl || null,
      imageUrl: body.imageUrl || null,
      order: Number(body.order) || 0,
    },
  });
  return NextResponse.json(item, { status: 201 });
}
