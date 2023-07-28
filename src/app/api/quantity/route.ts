import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/db";

export async function GET(request: any) {
  const ids = request.nextUrl.searchParams
    .getAll("ids")
    .map((id: string) => parseInt(id));

  const quantity = await getQuantity(ids);
  return new NextResponse(JSON.stringify(quantity), {
    headers: { "content-type": "application/json" },
  });
}

async function getQuantity(ids: number[]) {
  const quantity = await prisma.product_sku.findMany({
    where: {
      id: {
        in: ids,
      },
    },
    select: {
      id: true,
      quanity: true,
    },
  });

  let structureQuantity: any = {};

  quantity.map((item) => {
    structureQuantity[item.id] = item.quanity;
  });

  return structureQuantity;
}
