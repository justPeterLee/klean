import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/db";
export async function POST(req: any) {
  const data = await req.json();
  console.log(data);

  // Create one Review
  const Review = await prisma.review.create({
    data: {
      // ... data to create a Review
      product_id: data.productId,
      review_rate: data.starRating,
      review_message: data.message,
      user_name: data.name,
    },
  });
  return new NextResponse(JSON.stringify({ hello: "world" }), {
    headers: { "content-type": "application/json" },
  });
}
