import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/db";
import fetchImage from "../../../../../serverComponents/fetchImage";
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const catId = parseInt(params.id);

  const res = await prisma.product.findMany({
    take: 11,
    where: {
      product_category: { some: { category_id: catId } },
    },
    include: {
      image: { where: { image_name: "thumbnail" } },
    },
  });

  const structureArr = await Promise.all(
    res.map(async (item) => {
      const image = await fetchImage(item.image[0].image_file!);
      return {
        id: item.id,
        name: item.product_name,
        image: image,
        price: item.product_price,
      };
    })
  );
  return new NextResponse(JSON.stringify(structureArr), {
    headers: { "content-type": "application/json" },
  });
}
