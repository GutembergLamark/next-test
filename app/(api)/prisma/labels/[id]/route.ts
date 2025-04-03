import { prisma } from "@/utils/lib/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const label = await prisma.label.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return NextResponse.json(label);
}
