import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { error: "Name, email, and message are all required." },
      { status: 400 },
    );
  }

  const message = await prisma.contactMessage.create({
    data: {
      name: body.name,
      email: body.email,
      message: body.message,
    },
  });

  return NextResponse.json(message, { status: 201 });
}
