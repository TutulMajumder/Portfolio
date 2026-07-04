import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export async function GET() {
  const items = await prisma.education.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const item = await prisma.education.create({
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
  return NextResponse.json(item, { status: 201 });
}
