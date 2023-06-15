import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/db";
export async function POST(req: any) {
  const userId = await req.json();
  await prisma.$connect();

  const favorites = await prisma.favorite.findMany({
    where: {
      user_id: parseInt(userId),
    },
    include: {
      product_ref: true,
    },
  });
  await prisma.$disconnect();

  return new NextResponse(JSON.stringify(favorites), {
    headers: { "content-type": "application/json" },
  });
}
