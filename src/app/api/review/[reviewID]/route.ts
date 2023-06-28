import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/db";

export async function POST(request: Request) {
  const reviewData = await request.json();

  const reviews = await prisma.review.findMany({
    where: { product_id: reviewData.productId },
    take: 4,
    skip: 3 * (reviewData.pageNumber - 1),
  });
  console.log(reviews);
  return new NextResponse(JSON.stringify(reviews), {
    headers: { "content-type": "application/json" },
  });
}
