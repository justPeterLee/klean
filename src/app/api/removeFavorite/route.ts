import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/db";
export async function POST(req: any) {
  //   const request = req;
  const data = await req.json();

  await prisma.favorite.deleteMany({
    where: {
      product_id: data.productId,
      user_id: data.userId,
      sku_id: data.skuId,
    },
  });

  return new NextResponse(JSON.stringify(200), {
    headers: { "content-type": "application/json" },
  });
}
