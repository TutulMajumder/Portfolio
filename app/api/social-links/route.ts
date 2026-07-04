import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export async function GET() {
  const items = await prisma.socialLink.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const item = await prisma.socialLink.create({
    data: {
      platform: body.platform,
      url: body.url,
      order: Number(body.order) || 0,
    },
  });
  return NextResponse.json(item, { status: 201 });
}
