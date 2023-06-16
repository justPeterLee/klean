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
      product_ref: {
        include: {
          product_category: { include: { category_ref: true } },
          image: { where: { image_name: "thumbnail" } },
        },
      },
      sku_ref: true,
    },
  });
  await prisma.$disconnect();

  const favoritesData = favorites.map((item) => {
    return {
      id: item.id,
      productId: item.product_id,
      skuId: item.sku_id,
      productData: {
        name: item.product_ref.product_name,
        price: item.product_ref.product_price,
        category:
          item.product_ref.product_category[0].category_ref
            .category_description,
        thumbnail: item.product_ref.image[0].image_file,
      },
      toBeDeleted: false,
    };
  });
  return new NextResponse(JSON.stringify(favoritesData), {
    headers: { "content-type": "application/json" },
  });
}
