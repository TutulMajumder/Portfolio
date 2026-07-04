import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export async function GET() {
  const profile = await prisma.profile.findFirst();
  return NextResponse.json(profile);
}

export async function PUT(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const existing = await prisma.profile.findFirst();

  const data = {
    name: body.name,
    designation: body.designation,
    photoUrl: body.photoUrl || null,
    resumeUrl: body.resumeUrl || null,
    aboutMe: body.aboutMe,
    hobbies: body.hobbies || null,
    availableForHire: !!body.availableForHire,
  };

  const profile = existing
    ? await prisma.profile.update({ where: { id: existing.id }, data })
    : await prisma.profile.create({ data });

  return NextResponse.json(profile);
}
