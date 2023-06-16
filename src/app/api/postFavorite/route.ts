import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/db";
export async function POST(req: any) {
  //   const request = req;
  const data = await req.json();

  await prisma.favorite.create({
    data: {
      product_id: data.productId,
      user_id: parseInt(data.userId),
      sku_id: parseInt(data.skuId),
    },
  });

  return new NextResponse(JSON.stringify({ hello: "world" }), {
    headers: { "content-type": "application/json" },
  });
}
