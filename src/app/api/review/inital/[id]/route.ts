import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  const productReview = await prisma.review.findMany({
    where: { product_id: id },
    take: 3,
  });

  return new NextResponse(JSON.stringify(productReview), {
    headers: { "content-type": "application/json" },
  });
}
